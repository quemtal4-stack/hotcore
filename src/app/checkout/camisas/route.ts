import { NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const VALOR_FRETE_SERGIPE = 20;
const DIAS_DISPONIVEL_RETIRADA = 15;

type ItemMercadoPago = {
  id: string;
  title: string;
  description: string;
  quantity: number;
  currency_id: "BRL";
  unit_price: number;
};

function calcularDataDisponivel() {
  const data = new Date();
  data.setDate(data.getDate() + DIAS_DISPONIVEL_RETIRADA);

  return data.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function transformarErroEmTexto(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "object" && error !== null) {
    return JSON.stringify(error);
  }

  return String(error);
}

function textoSeguro(valor: unknown, padrao = "") {
  if (typeof valor === "string") {
    return valor.trim();
  }

  if (typeof valor === "number" && Number.isFinite(valor)) {
    return String(valor);
  }

  return padrao;
}

function numeroSeguro(valor: unknown, padrao = 0) {
  const numero = Number(valor);

  if (!Number.isFinite(numero)) {
    return padrao;
  }

  return numero;
}

export async function POST(request: Request) {
  try {
    const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;

    if (!accessToken) {
      return NextResponse.json(
        {
          erro: "Token do Mercado Pago não configurado.",
        },
        {
          status: 500,
        }
      );
    }

    const body = await request.json();

    console.log("BODY RECEBIDO NO CHECKOUT DE CAMISAS:", body);

    const id = textoSeguro(body.id);
    const titulo = textoSeguro(body.titulo);
    const tamanho = textoSeguro(body.tamanho);

    const quantidade = Math.max(
      1,
      Math.floor(numeroSeguro(body.quantidade, 1))
    );

    const valorUnitario = numeroSeguro(body.valorUnitario, 0);

    const ingressosSimbolicos = numeroSeguro(body.ingressosSimbolicos, 0);
    const kgAlimentos = numeroSeguro(body.kgAlimentos, 0);

    const nomeComprador =
      textoSeguro(body.nomeComprador) ||
      textoSeguro(body.nome) ||
      textoSeguro(body.name) ||
      "Comprador";

    const emailComprador =
      textoSeguro(body.emailComprador) || textoSeguro(body.email);

    const whatsapp =
      textoSeguro(body.whatsappComprador) ||
      textoSeguro(body.whatsapp) ||
      textoSeguro(body.telefone) ||
      null;

    if (!id || !titulo || !quantidade || !tamanho || !valorUnitario) {
      return NextResponse.json(
        {
          erro: "Dados da camisa incompletos.",
        },
        {
          status: 400,
        }
      );
    }

    if (valorUnitario <= 0) {
      return NextResponse.json(
        {
          erro: "Valor unitário inválido.",
        },
        {
          status: 400,
        }
      );
    }

    const baseUrl = (
      process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000"
    ).replace(/\/$/, "");

    const usarAutoReturn = baseUrl.startsWith("https://");

    const dataDisponivel = calcularDataDisponivel();

    const modalidadeEntrega =
      textoSeguro(body.modalidadeEntrega) ||
      textoSeguro(body.tipoEntrega) ||
      "entrega_sergipe";

    const retiradaNoLocal =
      modalidadeEntrega === "retirada" ||
      modalidadeEntrega === "retirada_local" ||
      modalidadeEntrega === "Retirada no local";

    const valorFrete = retiradaNoLocal ? 0 : VALOR_FRETE_SERGIPE;

    const externalReference = `camisa-${Date.now()}`;

    const totalProdutos = Number((valorUnitario * quantidade).toFixed(2));
    const totalPedido = Number((totalProdutos + valorFrete).toFixed(2));

    const client = new MercadoPagoConfig({
      accessToken,
    });

    const preference = new Preference(client);

    const items: ItemMercadoPago[] = [
      {
        id,
        title: `${titulo} - Tamanho ${tamanho}`,
        description: `Camisa oficial Hot Dogueres. Disponível para retirada ou envio a partir de ${dataDisponivel}.`,
        quantity: quantidade,
        currency_id: "BRL",
        unit_price: Number(valorUnitario.toFixed(2)),
      },
    ];

    if (valorFrete > 0) {
      items.push({
        id: "frete-sergipe",
        title: "Entrega em Sergipe",
        description: "Entrega via Correios ou entrega local em Sergipe.",
        quantity: 1,
        currency_id: "BRL",
        unit_price: Number(valorFrete.toFixed(2)),
      });
    }

    const resposta = await preference.create({
      body: {
        items,

        payer: {
          name: nomeComprador,
          ...(emailComprador
            ? {
                email: emailComprador,
              }
            : {}),
        },

        notification_url: `${baseUrl}/api/mercado-pago/webhook`,

        back_urls: {
          success: `${baseUrl}/pagamento/sucesso?produto=camisa&data=${encodeURIComponent(
            dataDisponivel
          )}`,
          failure: `${baseUrl}/pagamento/erro`,
          pending: `${baseUrl}/pagamento/pendente`,
        },

        ...(usarAutoReturn
          ? {
              auto_return: "approved" as const,
            }
          : {}),

        external_reference: externalReference,

        metadata: {
          pedidoReferencia: externalReference,
          tipo: "camisa",
          categoria: "camisa",

          produto: id,
          titulo,
          tamanho,

          quantidade,
          valorUnitario: Number(valorUnitario.toFixed(2)),
          valorFrete: Number(valorFrete.toFixed(2)),
          totalProdutos,
          totalPedido,

          ingressosSimbolicos,
          kgAlimentos,
          dataDisponivel,

          nomeComprador,
          emailComprador,
          whatsapp,

          modalidadeEntrega,
          retiradaNoLocal,

          tipoEntrega: retiradaNoLocal
            ? "Retirada no local"
            : "Entrega em Sergipe",

          freteSergipe: Number(valorFrete.toFixed(2)),
        },

        statement_descriptor: "HOTDOGUERES",

        payment_methods: {
          installments: 12,
        },
      },
    });

    console.log("RESPOSTA MERCADO PAGO CAMISA:", resposta);

    const urlCheckout = resposta.init_point || resposta.sandbox_init_point;

    if (!urlCheckout) {
      return NextResponse.json(
        {
          erro: "Preferência criada, mas URL de pagamento não retornada.",
          preferenceId: resposta.id,
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      id: resposta.id,
      preferenceId: resposta.id,

      url: urlCheckout,
      initPoint: resposta.init_point,
      sandboxInitPoint: resposta.sandbox_init_point,
      init_point: resposta.init_point,
      sandbox_init_point: resposta.sandbox_init_point,

      external_reference: externalReference,

      produto: id,
      titulo,
      tamanho,

      quantidade,
      valor_unitario: Number(valorUnitario.toFixed(2)),
      valor_frete: Number(valorFrete.toFixed(2)),
      total_produtos: totalProdutos,
      total_pedido: totalPedido,

      dataDisponivel,
      modalidadeEntrega,
      retiradaNoLocal,
      usarAutoReturn,
    });
  } catch (error) {
    console.error("ERRO AO CRIAR PAGAMENTO DA CAMISA:", error);

    return NextResponse.json(
      {
        erro: "Erro ao criar pagamento da camisa.",
        detalhe: transformarErroEmTexto(error),
      },
      {
        status: 500,
      }
    );
  }
}
