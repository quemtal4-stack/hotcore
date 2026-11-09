import { NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const FRETE_LOCAL_SERGIPE = 12;
const DIAS_DISPONIVEL_RETIRADA = 7;
const DIAS_DISPONIVEL_ENTREGA = 10;
const ENTREGA_CAMISA_EVENTO_TEXTO =
  "Retirada no local do evento, mediante conferência de nome, CPF e tamanho.";

type ItemMercadoPago = {
  id: string;
  title: string;
  description?: string;
  quantity: number;
  unit_price: number;
  currency_id: "BRL";
};

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

function numeroOuNull(valor: unknown) {
  const numero = Number(valor);

  if (!Number.isFinite(numero)) {
    return null;
  }

  return numero;
}

function normalizarTexto(valor: unknown) {
  return textoSeguro(valor)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function somarDiasISO(dias: number) {
  const data = new Date();
  data.setDate(data.getDate() + dias);

  return data.toISOString().split("T")[0];
}

function formatarDataBrasil(dataISO: string) {
  const data = new Date(`${dataISO}T12:00:00-03:00`);

  return data.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function criarSlug(texto: string) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function obterModalidadeEntrega(body: Record<string, unknown>) {
  return (
    textoSeguro(body.modalidadeEntrega) ||
    textoSeguro(body.tipoEntrega) ||
    textoSeguro(body.entrega) ||
    "retirada"
  );
}

function ehRetiradaNoLocal(modalidadeEntrega: string) {
  const texto = normalizarTexto(modalidadeEntrega);

  return (
    texto === "retirada" ||
    texto === "retirada_local" ||
    texto === "retirada no local" ||
    texto.includes("retirada")
  );
}

export async function POST(request: Request) {
  try {
    const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;

    if (!accessToken) {
      return NextResponse.json(
        {
          error: "Token do Mercado Pago não configurado.",
        },
        { status: 500 },
      );
    }

    const body = (await request.json().catch(() => null)) as
      | Record<string, unknown>
      | null;

    if (!body) {
      return NextResponse.json(
        {
          error: "Dados inválidos para gerar pagamento da camisa.",
        },
        { status: 400 },
      );
    }

    console.log("BODY RECEBIDO NO CHECKOUT DE CAMISAS:", body);

    const titulo =
      textoSeguro(body.titulo) ||
      textoSeguro(body.camisa) ||
      textoSeguro(body.produto) ||
      "Camisa Hot Dogueres";

    const id =
      textoSeguro(body.id) ||
      textoSeguro(body.itemId) ||
      `camisa-${criarSlug(titulo)}-${Date.now()}`;

    const tamanho = textoSeguro(body.tamanho);

    const quantidade = Math.max(
      1,
      Math.floor(numeroSeguro(body.quantidade, 1)),
    );

    const valorUnitario =
      numeroSeguro(body.valorUnitario) ||
      numeroSeguro(body.preco) ||
      numeroSeguro(body.valor) ||
      numeroSeguro(body.price) ||
      numeroSeguro(body.unit_price);

    const nomeComprador =
      textoSeguro(body.nomeComprador) ||
      textoSeguro(body.nome) ||
      textoSeguro(body.name);

    const emailComprador =
      textoSeguro(body.emailComprador) || textoSeguro(body.email);

    const whatsapp =
      textoSeguro(body.whatsappComprador) ||
      textoSeguro(body.whatsapp) ||
      textoSeguro(body.telefone) ||
      null;

    const cpfComprador =
      textoSeguro(body.cpfComprador) ||
      textoSeguro(body.cpf) ||
      textoSeguro(body.documento);

    const cpfSomenteNumeros = cpfComprador.replace(/\D/g, "");

    if (!titulo) {
      return NextResponse.json(
        {
          error: "Título da camisa não informado.",
        },
        { status: 400 },
      );
    }

    if (!tamanho) {
      return NextResponse.json(
        {
          error: "Escolha o tamanho da camisa antes de continuar.",
        },
        { status: 400 },
      );
    }

    if (!valorUnitario || valorUnitario <= 0) {
      return NextResponse.json(
        {
          error: "Valor unitário inválido para gerar o pagamento da camisa.",
        },
        { status: 400 },
      );
    }

    if (!nomeComprador) {
      return NextResponse.json(
        {
          error: "Informe o nome do comprador para reservar a camisa.",
        },
        { status: 400 },
      );
    }

    if (cpfSomenteNumeros.length !== 11) {
      return NextResponse.json(
        {
          error: "Informe um CPF válido para retirada da camisa no evento.",
        },
        { status: 400 },
      );
    }

    const modalidadeEntrega = "retirada_evento";
    const retiradaNoLocal = true;

    const valorFrete = 0;

    const dataDisponivelISO = somarDiasISO(DIAS_DISPONIVEL_RETIRADA);

    const dataDisponivel = ENTREGA_CAMISA_EVENTO_TEXTO;

    const ingressosSimbolicos =
      numeroOuNull(body.ingressosSimbolicos) ??
      numeroOuNull(body.ingressos_simbolicos) ??
      0;

    const kgAlimentos =
      numeroOuNull(body.kgAlimentos) ??
      numeroOuNull(body.kg_alimentos) ??
      (ingressosSimbolicos > 0 ? ingressosSimbolicos : 0);

    const baseUrl = (
      process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000"
    ).replace(/\/$/, "");

    const usarAutoReturn = baseUrl.startsWith("https://");

    const externalReference = `camisa-${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 10)}`;

    const totalProdutos = Number((valorUnitario * quantidade).toFixed(2));
    const totalPedido = Number((totalProdutos + valorFrete).toFixed(2));

    const paramsSucesso = new URLSearchParams({
      produto: "camisa",
      titulo,
      tamanho,
      quantidade: String(quantidade),
      valor: String(totalPedido),
      valorFrete: String(valorFrete),
      dataDisponivel,
      external_reference: externalReference,
    });

    const metadataPedido = {
      origem: "checkout-camisas",

      pedidoReferencia: externalReference,
      pedido_referencia: externalReference,
      external_reference: externalReference,
      externalReference,

      tipo: "camisa_evento",
      categoria: "camisa-evento",

      produto: id,
      titulo,
      tamanho,

      nome: nomeComprador,
      nomeComprador,

      cpf: cpfComprador,
      cpfComprador,
      cpf_somente_numeros: cpfSomenteNumeros,

      email: emailComprador || null,
      emailComprador: emailComprador || null,

      telefone: whatsapp,
      whatsapp,

      quantidade,
      quantidade_total: quantidade,

      valor: Number(valorUnitario.toFixed(2)),
      valorUnitario: Number(valorUnitario.toFixed(2)),

      valor_frete: Number(valorFrete.toFixed(2)),
      valorFrete: Number(valorFrete.toFixed(2)),

      total_produtos: totalProdutos,
      totalProdutos,

      total_pedido: totalPedido,
      totalPedido,

      ingressos_simbolicos: ingressosSimbolicos,
      ingressosSimbolicos,

      kg_alimentos: kgAlimentos,
      kgAlimentos,

      data_disponivel: dataDisponivel,
      dataDisponivel,
      dataDisponivelISO,

      modalidade_entrega: modalidadeEntrega,
      modalidadeEntrega,

      retirada_no_local: retiradaNoLocal,
      retiradaNoLocal,

      tipoEntrega: "Retirada no local do evento",
      observacaoEntrega: ENTREGA_CAMISA_EVENTO_TEXTO,
      freteSergipe: Number(valorFrete.toFixed(2)),
    };

    const items: ItemMercadoPago[] = [
      {
        id,
        title: `${titulo} - Tamanho ${tamanho}`,
        description: `Camisa oficial Hot Dogueres. ${ENTREGA_CAMISA_EVENTO_TEXTO}`,
        quantity: quantidade,
        unit_price: Number(valorUnitario.toFixed(2)),
        currency_id: "BRL",
      },
    ];

    if (valorFrete > 0) {
      items.push({
        id: "frete-sergipe",
        title: "Entrega em Sergipe",
        description: "Entrega local em Sergipe.",
        quantity: 1,
        unit_price: Number(valorFrete.toFixed(2)),
        currency_id: "BRL",
      });
    }

    const client = new MercadoPagoConfig({
      accessToken,
    });

    const preference = new Preference(client);

    const result = await preference.create({
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
          success: `${baseUrl}/pagamento/sucesso?${paramsSucesso.toString()}`,
          failure: `${baseUrl}/pagamento/falha`,
          pending: `${baseUrl}/pagamento/pendente`,
        },

        ...(usarAutoReturn
          ? {
              auto_return: "approved" as const,
            }
          : {}),

        external_reference: externalReference,

        metadata: metadataPedido,

        statement_descriptor: "HOTDOGUERES",

        payment_methods: {
          installments: 12,
        },
      },
    });

    console.log("RESPOSTA MERCADO PAGO CAMISA:", result);

    const urlCheckout = result.init_point || result.sandbox_init_point;

    if (!urlCheckout) {
      return NextResponse.json(
        {
          error: "Preferência criada, mas URL de pagamento não retornada.",
          preferenceId: result.id,
          mercadoPago: result,
        },
        { status: 500 },
      );
    }

    const { error: erroPedido } = await supabaseAdmin.from("pedidos").insert({
      external_reference: externalReference,
      mercado_pago_preference_id: result.id,
      mercado_pago_init_point: urlCheckout,

      tipo: "camisa_evento",
      categoria: "camisa-evento",
      produto: titulo,

      nome_comprador: nomeComprador,
      cpf: cpfSomenteNumeros,
      email_comprador: emailComprador || null,
      whatsapp,

      quantidade,
      valor_unitario: Number(valorUnitario.toFixed(2)),
      valor_frete: Number(valorFrete.toFixed(2)),
      total_produtos: totalProdutos,
      total_pedido: totalPedido,

      tamanho,

      modalidade_entrega: modalidadeEntrega,
      retirada_no_local: retiradaNoLocal,
      servico_frete: "Retirada no local do evento",
      prazo_frete: ENTREGA_CAMISA_EVENTO_TEXTO,

      status: "aguardando_pagamento",

      metadata: metadataPedido,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    if (erroPedido) {
      console.error("ERRO AO SALVAR PEDIDO DE CAMISA NO SUPABASE:", erroPedido);

      return NextResponse.json({
        ok: true,
        aviso:
          "Pagamento criado, mas houve erro ao salvar o pedido no Supabase. O link de pagamento foi retornado mesmo assim.",
        detalhe_supabase: erroPedido.message,

        id: result.id,
        preferenceId: result.id,

        url: urlCheckout,
        initPoint: urlCheckout,
        init_point: urlCheckout,
        sandbox_init_point: result.sandbox_init_point,

        externalReference,
        external_reference: externalReference,

        produto: id,
        titulo,
        tamanho,

        quantidade,
        valor_unitario: Number(valorUnitario.toFixed(2)),
        valor_frete: Number(valorFrete.toFixed(2)),
        total_produtos: totalProdutos,
        total_pedido: totalPedido,

        ingressos_simbolicos: ingressosSimbolicos,
        kg_alimentos: kgAlimentos,

        dataDisponivel,
        dataDisponivelISO,
        modalidadeEntrega,
        retiradaNoLocal,
        usarAutoReturn,
      });
    }

    return NextResponse.json({
      ok: true,

      id: result.id,
      preferenceId: result.id,

      url: urlCheckout,
      initPoint: urlCheckout,
      init_point: urlCheckout,
      sandbox_init_point: result.sandbox_init_point,

      externalReference,
      external_reference: externalReference,

      produto: id,
      titulo,
      tamanho,

      quantidade,
      valor_unitario: Number(valorUnitario.toFixed(2)),
      valor_frete: Number(valorFrete.toFixed(2)),
      total_produtos: totalProdutos,
      total_pedido: totalPedido,

      ingressos_simbolicos: ingressosSimbolicos,
      kg_alimentos: kgAlimentos,

      dataDisponivel,
      dataDisponivelISO,
      modalidadeEntrega,
      retiradaNoLocal,
      usarAutoReturn,
    });
  } catch (error) {
    console.error("ERRO AO CRIAR PAGAMENTO DA CAMISA:", error);

    return NextResponse.json(
      {
        error: "Erro ao criar pagamento da camisa.",
        detalhe: transformarErroEmTexto(error),
      },
      { status: 500 },
    );
  }
}
