import { NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function transformarErroEmTexto(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "object" && error !== null) {
    return JSON.stringify(error);
  }

  return String(error);
}

function numeroSeguro(valor: unknown, padrao = 0) {
  const numero = Number(valor);

  if (Number.isNaN(numero)) {
    return padrao;
  }

  return numero;
}

function textoSeguro(valor: unknown, padrao = "") {
  if (typeof valor !== "string") {
    return padrao;
  }

  return valor.trim();
}

function objetoSeguro(valor: unknown) {
  if (typeof valor === "object" && valor !== null) {
    return valor as Record<string, unknown>;
  }

  return {};
}

function gerarItemId(texto: string) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function normalizarEmail(valor: unknown) {
  return textoSeguro(String(valor || ""))
    .toLowerCase()
    .trim();
}

function validarEmailProducao(email: string) {
  return !(email.includes("test_user") || email.includes("testuser"));
}

export async function POST(request: Request) {
  try {
    const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;

    if (!accessToken) {
      console.error("MERCADO_PAGO_ACCESS_TOKEN não configurado.");

      return NextResponse.json(
        {
          error: "Token do Mercado Pago não configurado.",
        },
        { status: 500 },
      );
    }

    const body = await request.json();

    console.log("BODY RECEBIDO NO CHECKOUT:", body);

    const baseUrl = (
      process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000"
    ).replace(/\/$/, "");

    const usarAutoReturn = baseUrl.startsWith("https://");

    const modoTesteUmReal =
      process.env.MERCADO_PAGO_TESTE_VALOR_1_REAL === "true";

    const tipo = textoSeguro(body.tipo, "ingresso");

    const nomeComprador =
      textoSeguro(body.nomeComprador) ||
      textoSeguro(body.nome) ||
      textoSeguro(body.name) ||
      "Comprador";

    const emailComprador = normalizarEmail(
      textoSeguro(body.emailComprador) || textoSeguro(body.email),
    );

    if (!emailComprador) {
      return NextResponse.json(
        {
          error: "E-mail do comprador é obrigatório.",
        },
        { status: 400 },
      );
    }

    if (!validarEmailProducao(emailComprador)) {
      return NextResponse.json(
        {
          error: "E-mail de teste não permitido em produção.",
          detalhe:
            "Você está usando token APP_USR de produção. Use um e-mail real de comprador.",
        },
        { status: 400 },
      );
    }

    const whatsapp =
      textoSeguro(body.whatsappComprador) ||
      textoSeguro(body.whatsapp) ||
      textoSeguro(body.telefone) ||
      null;

    const cpfComprador =
      textoSeguro(body.cpfComprador) || textoSeguro(body.cpf) || "";

    const cpfLimpo = cpfComprador.replace(/\D/g, "");

    const quantidade = Math.max(
      1,
      Math.floor(numeroSeguro(body.quantidade || body.quantity, 1)),
    );

    if (!quantidade || quantidade <= 0) {
      return NextResponse.json(
        {
          error: "Quantidade inválida.",
        },
        { status: 400 },
      );
    }

    const eventoId =
      textoSeguro(body.eventoId) || textoSeguro(body.evento_id) || null;

    const nomeEvento =
      textoSeguro(body.nomeEvento) ||
      textoSeguro(body.evento) ||
      textoSeguro(body.nome_evento) ||
      null;

    const anoColecao = numeroSeguro(body.anoColecao || body.ano_colecao, 2027);

    const ingressoModeloId =
      textoSeguro(body.ingressoModeloId) ||
      textoSeguro(body.ingresso_modelo_id) ||
      textoSeguro(body.itemId) ||
      null;

    const nomeIngressoEternizado =
      textoSeguro(body.nomeIngressoEternizado) ||
      textoSeguro(body.nome_ingresso_eternizado) ||
      null;

    const sextoIngresso =
      body.sextoIngresso === true ||
      body.sexto_ingresso === true ||
      body.sextoIngresso === "true" ||
      body.sexto_ingresso === "true";

    const ehIngressoColecionavel =
      tipo === "ingresso" ||
      tipo === "ingresso_evento" ||
      tipo === "ingresso_fixo";

    if (ehIngressoColecionavel && cpfLimpo.length !== 11) {
      return NextResponse.json(
        {
          error: "CPF do comprador é obrigatório para ingressos colecionáveis.",
        },
        { status: 400 },
      );
    }

    let valorUnitario = 0;
    let titulo = "";
    let descricao = "";
    let itemId = "";
    let kgAlimentos = ehIngressoColecionavel ? quantidade : 0;

    const categoria = textoSeguro(body.categoria) || null;
    const tamanho = textoSeguro(body.tamanho) || null;
    const cep = textoSeguro(body.cep) || null;

    const freteBody = objetoSeguro(body.frete);

    const modalidadeEntrega =
      textoSeguro(body.modalidadeEntrega) ||
      textoSeguro(body.entrega) ||
      textoSeguro(body.tipoEntrega) ||
      textoSeguro(freteBody.modalidade) ||
      textoSeguro(freteBody.tipo) ||
      null;

    const retiradaNoLocal =
      modalidadeEntrega === "retirada" ||
      modalidadeEntrega === "retirada_local" ||
      modalidadeEntrega === "Retirada no local";

    const servicoFrete =
      textoSeguro(body.servicoFrete) ||
      textoSeguro(body.freteServico) ||
      textoSeguro(freteBody.servico) ||
      textoSeguro(freteBody.titulo) ||
      textoSeguro(freteBody.tipo) ||
      (retiradaNoLocal ? "Retirada no local" : null);

    const prazoFrete =
      textoSeguro(body.prazoFrete) ||
      textoSeguro(body.fretePrazo) ||
      textoSeguro(freteBody.prazo) ||
      (retiradaNoLocal ? "Combinar retirada após confirmação do pedido" : null);

    let valorFrete =
      numeroSeguro(body.valorFrete, -1) >= 0
        ? numeroSeguro(body.valorFrete, 0)
        : numeroSeguro(body.freteValor, -1) >= 0
          ? numeroSeguro(body.freteValor, 0)
          : numeroSeguro(freteBody.valor, 0);

    if (retiradaNoLocal) {
      valorFrete = 0;
    }

    if (valorFrete < 0) {
      valorFrete = 0;
    }

    const totalRecebido = numeroSeguro(body.total || body.totalPedido, 0);
    const valorRecebido = numeroSeguro(body.valor || body.price, 0);

    titulo =
      textoSeguro(body.title) ||
      textoSeguro(body.titulo) ||
      textoSeguro(body.produto) ||
      "Produto Hot Dogueres";

    descricao =
      textoSeguro(body.description) ||
      textoSeguro(body.descricao) ||
      `Pedido Loja Solidária Hot Dogueres - ${titulo}`;

    itemId =
      textoSeguro(body.itemId) ||
      textoSeguro(body.id) ||
      `produto-hot-dogueres-${gerarItemId(titulo)}-${Date.now()}`;

    const valorRecebidoEhTotal =
      totalRecebido > 0 &&
      valorRecebido > 0 &&
      Math.abs(totalRecebido - valorRecebido) < 0.01;

    if (totalRecebido > 0 && valorFrete > 0 && valorRecebidoEhTotal) {
      valorUnitario = (totalRecebido - valorFrete) / quantidade;
    } else if (totalRecebido > 0 && valorRecebido <= 0) {
      valorUnitario = (totalRecebido - valorFrete) / quantidade;
    } else if (valorRecebido > 0) {
      valorUnitario = valorRecebido;
    } else if (totalRecebido > 0) {
      valorUnitario = totalRecebido / quantidade;
    } else {
      valorUnitario = 0;
    }

    if (ehIngressoColecionavel) {
      titulo =
        textoSeguro(body.title) ||
        textoSeguro(body.titulo) ||
        nomeEvento ||
        `Ingresso Solidário Hot Dogueres ${anoColecao}`;

      descricao =
        textoSeguro(body.description) ||
        textoSeguro(body.descricao) ||
        "Ingresso colecionável solidário. Cada ingresso vendido representa 1kg de alimento não perecível.";

      itemId =
        ingressoModeloId ||
        `ingresso-solidario-${anoColecao}-${gerarItemId(titulo)}-${Date.now()}`;
    }

    const ehCamisa =
      tipo === "camisa" ||
      tipo === "camisa_pre_venda" ||
      categoria === "camisa";

    if (ehCamisa && !tamanho) {
      return NextResponse.json(
        {
          error: "Escolha o tamanho da camisa antes de continuar.",
        },
        { status: 400 },
      );
    }

    if (modoTesteUmReal) {
      valorUnitario = 1;
      valorFrete = 0;
    }

    if (!valorUnitario || valorUnitario <= 0) {
      return NextResponse.json(
        {
          error: "Valor inválido.",
        },
        { status: 400 },
      );
    }

    const pedidoReferencia = `${tipo}-${Date.now()}`;

    const totalProdutos = Number((valorUnitario * quantidade).toFixed(2));
    const totalPedido = Number((totalProdutos + valorFrete).toFixed(2));

    const metadataPedido = {
      origem: "hotdogueres",

      pedidoReferencia,
      pedido_referencia: pedidoReferencia,

      tipo,
      categoria,

      produto: body.produto || titulo,
      titulo,
      descricao,

      nome: nomeComprador,
      nomeComprador,

      email: emailComprador,
      emailComprador,

      telefone: whatsapp,
      whatsapp,

      cpf: cpfLimpo || null,
      cpfComprador: cpfLimpo || null,

      quantidade,
      quantidade_total: quantidade,

      ingressos: ehIngressoColecionavel ? quantidade : 0,
      kg_alimentos: kgAlimentos,
      kgAlimentos,

      eh_ingresso_colecionavel: ehIngressoColecionavel,

      evento_id: eventoId,
      eventoId,

      nome_evento: nomeEvento,
      nomeEvento,

      ano_colecao: anoColecao,
      anoColecao,

      ingresso_modelo_id: ingressoModeloId,
      ingressoModeloId,

      sexto_ingresso: sextoIngresso,
      sextoIngresso,

      nome_ingresso_eternizado: nomeIngressoEternizado,
      nomeIngressoEternizado,

      valor: Number(valorUnitario.toFixed(2)),
      valorUnitario: Number(valorUnitario.toFixed(2)),

      totalProdutos,
      valorFrete: Number(valorFrete.toFixed(2)),
      totalPedido,

      modoTesteUmReal,

      tamanho,
      cep,

      modalidadeEntrega,
      retiradaNoLocal,
      servicoFrete,
      prazoFrete,

      frete: {
        modalidadeEntrega,
        retiradaNoLocal,
        servico: servicoFrete,
        valor: Number(valorFrete.toFixed(2)),
        prazo: prazoFrete,
      },
    };

    const client = new MercadoPagoConfig({
      accessToken,
    });

    const preference = new Preference(client);

    const items = [
      {
        id: itemId,
        title: titulo,
        description: descricao,
        quantity: quantidade,
        unit_price: Number(valorUnitario.toFixed(2)),
        currency_id: "BRL" as const,
      },
    ];

    if (valorFrete > 0) {
      items.push({
        id: "frete-entrega",
        title: servicoFrete ? `Frete - ${servicoFrete}` : "Frete",
        description: prazoFrete
          ? `Entrega estimada: ${prazoFrete}`
          : "Frete de entrega do produto",
        quantity: 1,
        unit_price: Number(valorFrete.toFixed(2)),
        currency_id: "BRL" as const,
      });
    }

    const result = await preference.create({
      body: {
        items,

        payer: {
          name: nomeComprador,
          email: emailComprador,
        },

        notification_url: `${baseUrl}/api/mercado-pago/webhook`,

        back_urls: {
          success: `${baseUrl}/pagamento/sucesso`,
          failure: `${baseUrl}/pagamento/falha`,
          pending: `${baseUrl}/pagamento/pendente`,
        },

        ...(usarAutoReturn
          ? {
              auto_return: "approved" as const,
            }
          : {}),

        external_reference: pedidoReferencia,

        metadata: metadataPedido,

        statement_descriptor: "HOTDOGUERES",

        payment_methods: {
          installments: 12,
        },
      },
    });

    console.log("RESPOSTA MERCADO PAGO:", result);

    const urlCheckout = result.init_point || result.sandbox_init_point;

    const { error: erroPedido } = await supabaseAdmin.from("pedidos").insert({
      external_reference: pedidoReferencia,
      mercado_pago_preference_id: result.id,
      mercado_pago_init_point: urlCheckout,

      tipo,
      categoria,
      produto: titulo,

      nome_comprador: nomeComprador,
      email_comprador: emailComprador,
      whatsapp,

      quantidade,
      valor_unitario: Number(valorUnitario.toFixed(2)),
      valor_frete: Number(valorFrete.toFixed(2)),
      total_produtos: totalProdutos,
      total_pedido: totalPedido,

      tamanho,
      cep,

      modalidade_entrega: modalidadeEntrega,
      retirada_no_local: retiradaNoLocal,
      servico_frete: servicoFrete,
      prazo_frete: prazoFrete,

      status: "aguardando_pagamento",

      metadata: metadataPedido,
    });

    if (erroPedido) {
      console.error("ERRO AO SALVAR PEDIDO NO SUPABASE:", erroPedido);

      return NextResponse.json(
        {
          error: "Preferência criada, mas erro ao salvar pedido no banco.",
          detalhe: erroPedido.message,
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      id: result.id,
      preferenceId: result.id,
      url: urlCheckout,
      init_point: result.init_point,
      sandbox_init_point: result.sandbox_init_point,

      quantidade,
      valor_unitario: Number(valorUnitario.toFixed(2)),
      total_produtos: totalProdutos,
      valor_frete: Number(valorFrete.toFixed(2)),
      total_pedido: totalPedido,

      modo_teste_um_real: modoTesteUmReal,
      external_reference: pedidoReferencia,

      tipo,
      categoria,

      produto: titulo,
      descricao,

      eh_ingresso_colecionavel: ehIngressoColecionavel,
      kg_alimentos: kgAlimentos,

      evento_id: eventoId,
      nome_evento: nomeEvento,
      ano_colecao: anoColecao,
      ingresso_modelo_id: ingressoModeloId,

      tamanho,
      cep,

      modalidadeEntrega,
      retiradaNoLocal,
      servicoFrete,
      prazoFrete,

      baseUrl,
      usarAutoReturn,
    });
  } catch (error) {
    console.error("ERRO MERCADO PAGO:", error);

    return NextResponse.json(
      {
        error: "Erro ao conectar com o Mercado Pago.",
        detalhe: transformarErroEmTexto(error),
      },
      { status: 500 },
    );
  }
}
