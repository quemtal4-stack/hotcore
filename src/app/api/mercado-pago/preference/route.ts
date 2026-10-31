import { NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const KG_ALIMENTOS_POR_CAMISA = 3;
const INGRESSOS_SIMBOLICOS_POR_CAMISA = 3;

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

  if (!Number.isFinite(numero)) {
    return padrao;
  }

  return numero;
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

function normalizarTexto(valor: unknown) {
  return textoSeguro(valor)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function normalizarEmail(valor: unknown) {
  return textoSeguro(valor).toLowerCase().trim();
}

function validarEmailProducao(email: string) {
  const permitirEmailTeste =
    process.env.MERCADO_PAGO_PERMITIR_EMAIL_TESTE === "true";

  if (permitirEmailTeste) {
    return true;
  }

  return !(email.includes("test_user") || email.includes("testuser"));
}

function booleanoSeguro(valor: unknown) {
  if (typeof valor === "boolean") {
    return valor;
  }

  const texto = textoSeguro(valor).toLowerCase();

  return (
    texto === "true" ||
    texto === "1" ||
    texto === "sim" ||
    texto === "yes"
  );
}

function ehTipoCamisa(tipo: string, categoria: string | null) {
  const tipoNormalizado = normalizarTexto(tipo);
  const categoriaNormalizada = normalizarTexto(categoria);

  return (
    tipoNormalizado.includes("camisa") ||
    categoriaNormalizada.includes("camisa")
  );
}

function ehTipoRacao(tipo: string, categoria: string | null, produto: string) {
  const texto = `${normalizarTexto(tipo)} ${normalizarTexto(
    categoria,
  )} ${normalizarTexto(produto)}`;

  return (
    texto.includes("racao") ||
    texto.includes("ração") ||
    texto.includes("pet") ||
    texto.includes("animal")
  );
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

    const tipo = textoSeguro(body.tipo, "produto");

    const categoria = textoSeguro(body.categoria) || null;

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
            "Se estiver usando comprador de teste do Mercado Pago, defina MERCADO_PAGO_PERMITIR_EMAIL_TESTE=true nas variáveis de ambiente.",
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
      booleanoSeguro(body.sextoIngresso) ||
      booleanoSeguro(body.sexto_ingresso);

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

    let titulo =
      textoSeguro(body.title) ||
      textoSeguro(body.titulo) ||
      textoSeguro(body.produto) ||
      "Produto Hot Dogueres";

    let descricao =
      textoSeguro(body.description) ||
      textoSeguro(body.descricao) ||
      `Pedido Loja Solidária Hot Dogueres - ${titulo}`;

    let itemId =
      textoSeguro(body.itemId) ||
      textoSeguro(body.id) ||
      `produto-hot-dogueres-${gerarItemId(titulo)}-${Date.now()}`;

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

    const ehCamisa = ehTipoCamisa(tipo, categoria);

    if (ehCamisa && !tamanho) {
      return NextResponse.json(
        {
          error: "Escolha o tamanho da camisa antes de continuar.",
        },
        { status: 400 },
      );
    }

    const produtoTexto = textoSeguro(body.produto) || titulo;
    const ehRacao = ehTipoRacao(tipo, categoria, produtoTexto);

    const totalRecebido = numeroSeguro(
      body.total || body.totalPedido || body.valorTotal,
      0,
    );

    const valorRecebido =
      numeroSeguro(body.valor, 0) ||
      numeroSeguro(body.price, 0) ||
      numeroSeguro(body.valorUnitario, 0) ||
      numeroSeguro(body.unit_price, 0);

    let valorUnitario = 0;

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

    if (modoTesteUmReal) {
      valorUnitario = 1;
      valorFrete = 0;
    }

    if (!valorUnitario || valorUnitario <= 0) {
      return NextResponse.json(
        {
          error: "Valor inválido.",
          detalhe:
            "Envie valor, valorUnitario, price, total, totalPedido ou valorTotal maior que zero.",
        },
        { status: 400 },
      );
    }

    const pedidoReferencia = `${tipo}-${Date.now()}`;

    const totalProdutos = Number((valorUnitario * quantidade).toFixed(2));
    const totalPedido = Number((totalProdutos + valorFrete).toFixed(2));

    const ingressosSimbolicos =
      numeroSeguro(body.ingressosSimbolicos) ||
      numeroSeguro(body.ingressos_simbolicos) ||
      (ehCamisa ? quantidade * INGRESSOS_SIMBOLICOS_POR_CAMISA : 0);

    let kgAlimentos =
      numeroSeguro(body.kgAlimentos) ||
      numeroSeguro(body.kg_alimentos) ||
      (ehIngressoColecionavel ? quantidade : 0);

    if (ehCamisa && kgAlimentos <= 0) {
      kgAlimentos = quantidade * KG_ALIMENTOS_POR_CAMISA;
    }

    if (ehRacao) {
      kgAlimentos = 0;
    }

    const kgRacao =
      numeroSeguro(body.kgRacao) ||
      numeroSeguro(body.kg_racao) ||
      numeroSeguro(body.racaoKg) ||
      numeroSeguro(body.racao_kg) ||
      (ehRacao ? quantidade : 0);

    const metadataPedido = {
      origem: "hotdogueres",

      pedidoReferencia,
      pedido_referencia: pedidoReferencia,

      tipo,
      categoria,

      produto: produtoTexto,
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
      ingressos_simbolicos: ingressosSimbolicos,
      ingressosSimbolicos,

      kg_alimentos: kgAlimentos,
      kgAlimentos,

      kg_racao: kgRacao,
      kgRacao,

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

    if (!urlCheckout) {
      return NextResponse.json(
        {
          error: "Preferência criada, mas o Mercado Pago não retornou link.",
          detalhe:
            "Confira no retorno/logs se existe init_point ou sandbox_init_point.",
          preferenceId: result.id,
          mercadoPago: result,
        },
        { status: 500 },
      );
    }

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
          preferenceId: result.id,
          url: urlCheckout,
          initPoint: urlCheckout,
          init_point: urlCheckout,
          checkoutUrl: urlCheckout,
          sandbox_init_point: result.sandbox_init_point,
          external_reference: pedidoReferencia,
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      ok: true,

      id: result.id,
      preferenceId: result.id,

      url: urlCheckout,
      initPoint: urlCheckout,
      init_point: urlCheckout,
      checkoutUrl: urlCheckout,
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
      ingressos_simbolicos: ingressosSimbolicos,
      kg_alimentos: kgAlimentos,
      kg_racao: kgRacao,

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
