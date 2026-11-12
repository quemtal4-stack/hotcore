import { NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const VALOR_INGRESSO_COLECIONAVEL = 20;
const VALOR_SEXTO_INGRESSO = 80;
const VALOR_HOT_DOG_DAY = 20;

type TipoCompra =
  | "ingresso-solidario-colecionavel"
  | "ingresso-evento"
  | "ingresso_evento"
  | "hot-dog-day";

type DadosCheckoutIngressos = {
  tipo?: unknown;

  nome?: unknown;
  nomeComprador?: unknown;

  email?: unknown;
  emailComprador?: unknown;

  telefone?: unknown;
  whatsapp?: unknown;

  cpf?: unknown;
  cpfComprador?: unknown;

  produto?: unknown;
  produtoId?: unknown;

  evento?: unknown;
  eventoId?: unknown;
  evento_id?: unknown;

  municipio?: unknown;

  titulo?: unknown;

  ingressos?: unknown;
  quantidade?: unknown;
  quantidadeTotal?: unknown;

  sextoIngresso?: unknown;
  sexto_ingresso?: unknown;

  kgAlimentos?: unknown;
  kg_alimentos?: unknown;

  valor?: unknown;
  total?: unknown;

  ingressosSelecionados?: unknown;
  ingressos_selecionados?: unknown;

  nomeIngressoEternizado?: unknown;
  nome_ingresso_eternizado?: unknown;

  colecionarIngresso?: unknown;
  colecionar_ingresso?: unknown;
  enviarParaColecao?: unknown;
  enviar_para_colecao?: unknown;
  permitirResgateColecaoDepois?: unknown;
  permitir_resgate_colecao_depois?: unknown;

  admin?: unknown;
  teste?: unknown;
};

type ItemMercadoPago = {
  id: string;
  title: string;
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

function inteiroSeguro(valor: unknown, padrao = 1) {
  const numero = Math.floor(numeroSeguro(valor, padrao));

  if (!Number.isFinite(numero) || numero < 1) {
    return padrao;
  }

  return numero;
}

function limparNumero(valor: unknown) {
  return textoSeguro(valor).replace(/\D/g, "");
}

function normalizarTexto(valor: unknown) {
  return textoSeguro(valor)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function booleanoSeguro(valor: unknown) {
  if (typeof valor === "boolean") {
    return valor;
  }

  const texto = normalizarTexto(valor);

  return (
    texto === "sim" ||
    texto === "true" ||
    texto === "1" ||
    texto === "yes"
  );
}

function validarEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function criarExternalReference(tipo: string) {
  return `${tipo}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function obterTipoCompra(dados: DadosCheckoutIngressos): TipoCompra {
  const tipoRecebido = normalizarTexto(dados.tipo);

  const eventoId =
    textoSeguro(dados.eventoId) ||
    textoSeguro(dados.evento_id) ||
    textoSeguro(dados.evento);

  if (tipoRecebido === "hot-dog-day") {
    return "hot-dog-day";
  }

  if (
    tipoRecebido === "ingresso-evento" ||
    tipoRecebido === "ingresso_evento" ||
    Boolean(eventoId)
  ) {
    return "ingresso_evento";
  }

  return "ingresso-solidario-colecionavel";
}

function obterQuantidadeIngressos(params: {
  dados: DadosCheckoutIngressos;
  ehHotDogDay: boolean;
  ehIngressoEvento: boolean;
}) {
  const quantidadeRecebida =
    numeroSeguro(params.dados.ingressos) ||
    numeroSeguro(params.dados.quantidade) ||
    numeroSeguro(params.dados.quantidadeTotal) ||
    1;

  const quantidade = Math.max(1, Math.floor(quantidadeRecebida));

  if (params.ehHotDogDay || params.ehIngressoEvento) {
    return quantidade;
  }

  return Math.min(quantidade, 5);
}

function obterQuantidadeTotal(params: {
  dados: DadosCheckoutIngressos;
  ingressos: number;
  sextoIngresso: boolean;
  ehHotDogDay: boolean;
  ehIngressoEvento: boolean;
}) {
  const quantidadeTotalRecebida = numeroSeguro(params.dados.quantidadeTotal);

  if (quantidadeTotalRecebida > 0) {
    return Math.max(1, Math.floor(quantidadeTotalRecebida));
  }

  if (params.ehHotDogDay || params.ehIngressoEvento) {
    return params.ingressos;
  }

  return params.ingressos + (params.sextoIngresso ? 1 : 0);
}

function obterKgAlimentos(params: {
  dados: DadosCheckoutIngressos;
  ingressos: number;
  sextoIngresso: boolean;
  ehHotDogDay: boolean;
}) {
  const kgRecebido =
    numeroSeguro(params.dados.kgAlimentos) ||
    numeroSeguro(params.dados.kg_alimentos);

  if (kgRecebido > 0) {
    return kgRecebido;
  }

  if (params.ehHotDogDay) {
    return 0;
  }

  return params.ingressos + (params.sextoIngresso ? 3 : 0);
}

function obterTotal(params: {
  dados: DadosCheckoutIngressos;
  ingressos: number;
  sextoIngresso: boolean;
  quantidadeTotal: number;
  ehHotDogDay: boolean;
  ehIngressoEvento: boolean;
}) {
  const valorRecebido =
    numeroSeguro(params.dados.valor) || numeroSeguro(params.dados.total);

  if (valorRecebido > 0) {
    return Number(valorRecebido.toFixed(2));
  }

  if (params.ehHotDogDay) {
    return Number((params.ingressos * VALOR_HOT_DOG_DAY).toFixed(2));
  }

  if (params.ehIngressoEvento) {
    return Number((params.quantidadeTotal * VALOR_INGRESSO_COLECIONAVEL).toFixed(2));
  }

  return Number(
    (
      params.ingressos * VALOR_INGRESSO_COLECIONAVEL +
      (params.sextoIngresso ? VALOR_SEXTO_INGRESSO : 0)
    ).toFixed(2),
  );
}

function obterItemsMercadoPago(params: {
  tipo: TipoCompra;
  produto: string;
  titulo: string;
  ingressos: number;
  sextoIngresso: boolean;
  quantidadeTotal: number;
  total: number;
  modoAdmin: boolean;
  ehHotDogDay: boolean;
  ehIngressoEvento: boolean;
}) {
  const usarItemUnico =
    params.modoAdmin ||
    params.ehIngressoEvento ||
    params.ehHotDogDay ||
    params.total <= 0;

  if (usarItemUnico) {
    const quantidade = Math.max(1, params.quantidadeTotal);
    const valorUnitario = Number((params.total / quantidade).toFixed(2));

    return [
      {
        id: params.produto,
        title: params.titulo,
        quantity: quantidade,
        unit_price: valorUnitario,
        currency_id: "BRL" as const,
      },
    ];
  }

  const items: ItemMercadoPago[] = [
    {
      id: "ingresso-solidario-colecionavel",
      title: "Ingresso Solidário Colecionável",
      quantity: params.ingressos,
      unit_price: VALOR_INGRESSO_COLECIONAVEL,
      currency_id: "BRL",
    },
  ];

  if (params.sextoIngresso) {
    items.push({
      id: "ingresso-eternizados-250-metros",
      title: "Ingresso Especial Eternizados 250 Metros",
      quantity: 1,
      unit_price: VALOR_SEXTO_INGRESSO,
      currency_id: "BRL",
    });
  }

  return items;
}

async function criarCheckoutIngressos(dados: DadosCheckoutIngressos) {
  const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;

  if (!accessToken) {
    return NextResponse.json(
      {
        error: "Token do Mercado Pago não configurado.",
      },
      { status: 500 },
    );
  }

  const tipo = obterTipoCompra(dados);
  const ehHotDogDay = tipo === "hot-dog-day";
  const ehIngressoEvento = tipo === "ingresso_evento";

  const nome =
    textoSeguro(dados.nome) ||
    textoSeguro(dados.nomeComprador) ||
    "Comprador";

  const email =
    textoSeguro(dados.email) || textoSeguro(dados.emailComprador);

  const telefone =
    textoSeguro(dados.telefone) || textoSeguro(dados.whatsapp);

  const cpf =
    limparNumero(dados.cpf) || limparNumero(dados.cpfComprador);

  if (!nome.trim()) {
    return NextResponse.json(
      {
        error: "Nome do comprador é obrigatório.",
      },
      { status: 400 },
    );
  }

  if (!validarEmail(email)) {
    return NextResponse.json(
      {
        error: "E-mail do comprador é obrigatório e precisa ser válido.",
      },
      { status: 400 },
    );
  }

  if (limparNumero(telefone).length < 10) {
    return NextResponse.json(
      {
        error: "Telefone do comprador é obrigatório e precisa ser válido.",
      },
      { status: 400 },
    );
  }

  if (!ehHotDogDay && cpf.length !== 11) {
    return NextResponse.json(
      {
        error: "CPF do comprador é obrigatório para ingressos.",
      },
      { status: 400 },
    );
  }

  const eventoId =
    textoSeguro(dados.eventoId) ||
    textoSeguro(dados.evento_id) ||
    textoSeguro(dados.evento);

  const municipio = textoSeguro(dados.municipio);

  const produto =
    textoSeguro(dados.produtoId) ||
    textoSeguro(dados.produto) ||
    eventoId ||
    (ehHotDogDay
      ? "hot-dog-day"
      : ehIngressoEvento
        ? "ingresso-evento"
        : "ingresso-solidario-colecionavel");

  const titulo =
    textoSeguro(dados.titulo) ||
    (ehHotDogDay
      ? "Ingresso Hot Dog Day"
      : ehIngressoEvento
        ? "Ingresso de Evento Hot Dogueres"
        : "Ingresso Solidário Colecionável");

  const ingressos = obterQuantidadeIngressos({
    dados,
    ehHotDogDay,
    ehIngressoEvento,
  });

  const sextoIngresso =
    !ehHotDogDay &&
    !ehIngressoEvento &&
    ingressos >= 5 &&
    (booleanoSeguro(dados.sextoIngresso) ||
      booleanoSeguro(dados.sexto_ingresso));

  const quantidadeTotal = obterQuantidadeTotal({
    dados,
    ingressos,
    sextoIngresso,
    ehHotDogDay,
    ehIngressoEvento,
  });

  const kgAlimentos = obterKgAlimentos({
    dados,
    ingressos,
    sextoIngresso,
    ehHotDogDay,
  });

  const total = obterTotal({
    dados,
    ingressos,
    sextoIngresso,
    quantidadeTotal,
    ehHotDogDay,
    ehIngressoEvento,
  });

  if (!total || total <= 0) {
    return NextResponse.json(
      {
        error: "Valor inválido para gerar o pagamento.",
      },
      { status: 400 },
    );
  }

  const modoAdmin =
    booleanoSeguro(dados.admin) || booleanoSeguro(dados.teste);

  const colecionarIngresso =
    !ehHotDogDay &&
    (booleanoSeguro(dados.colecionarIngresso) ||
      booleanoSeguro(dados.colecionar_ingresso) ||
      booleanoSeguro(dados.enviarParaColecao) ||
      booleanoSeguro(dados.enviar_para_colecao));

  const permitirResgateColecaoDepois =
    !ehHotDogDay &&
    (booleanoSeguro(dados.permitirResgateColecaoDepois) ||
      booleanoSeguro(dados.permitir_resgate_colecao_depois) ||
      !colecionarIngresso);

  const ingressosSelecionados =
    textoSeguro(dados.ingressosSelecionados) ||
    textoSeguro(dados.ingressos_selecionados);

  const nomeIngressoEternizado =
    textoSeguro(dados.nomeIngressoEternizado) ||
    textoSeguro(dados.nome_ingresso_eternizado);

  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000"
  ).replace(/\/$/, "");

  const usarAutoReturn = siteUrl.startsWith("https://");

  const externalReference = criarExternalReference(tipo);

  const paramsSucesso = new URLSearchParams({
    tipo,
    produto,
    titulo,
    ingressos: String(ingressos),
    sextoIngresso: sextoIngresso ? "sim" : "nao",
    quantidadeTotal: String(quantidadeTotal),
    kgAlimentos: String(kgAlimentos),
    external_reference: externalReference,
    colecionar: colecionarIngresso ? "sim" : "nao",
  });

  if (eventoId) {
    paramsSucesso.set("evento", eventoId);
    paramsSucesso.set("eventoId", eventoId);
  }

  if (municipio) {
    paramsSucesso.set("municipio", municipio);
  }

  if (nomeIngressoEternizado) {
    paramsSucesso.set("nomeIngressoEternizado", nomeIngressoEternizado);
  }

  const metadata = {
    origem: "checkout-ingressos",

    external_reference: externalReference,
    externalReference,

    tipo,
    categoria: tipo,

    produto,
    produto_id: produto,
    produtoId: produto,

    titulo,

    evento_id: eventoId || null,
    eventoId: eventoId || null,

    municipio: municipio || null,
    nome_evento: municipio || null,
    nomeEvento: municipio || null,

    nome,
    nomeComprador: nome,

    email,
    emailComprador: email,

    telefone,
    whatsapp: telefone,

    cpf: cpf || null,
    cpfComprador: cpf || null,

    ingressos,
    quantidade: ingressos,

    quantidade_total: ingressos,
    quantidadeTotal: ingressos,

    quantidade_total_compra: quantidadeTotal,
    quantidadeTotalCompra: quantidadeTotal,

    sexto_ingresso: sextoIngresso,
    sextoIngresso,

    nome_ingresso_eternizado: nomeIngressoEternizado || null,
    nomeIngressoEternizado: nomeIngressoEternizado || null,

    kg_alimentos: kgAlimentos,
    kgAlimentos,

    valor: total,
    totalPedido: total,
    valor_total: total,

    ingressos_selecionados: ingressosSelecionados,
    ingressosSelecionados,

    colecionar_ingresso: colecionarIngresso,
    colecionarIngresso,

    enviar_para_colecao: colecionarIngresso,
    enviarParaColecao: colecionarIngresso,

    permitir_resgate_colecao_depois: permitirResgateColecaoDepois,
    permitirResgateColecaoDepois,

    /*
      Este campo controla somente se o webhook deve criar/atualizar
      automaticamente a Área do Colecionador.

      Mesmo quando false, a compra continua contando nos termômetros,
      porque tipo, quantidade, kg_alimentos e status pago ficam salvos no pedido.
    */
    eh_ingresso_colecionavel: colecionarIngresso,

    modo_admin: modoAdmin,
    modoAdmin,
  };

  const items = obterItemsMercadoPago({
    tipo,
    produto,
    titulo,
    ingressos,
    sextoIngresso,
    quantidadeTotal,
    total,
    modoAdmin,
    ehHotDogDay,
    ehIngressoEvento,
  });

  const client = new MercadoPagoConfig({
    accessToken,
  });

  const preference = new Preference(client);

  const result = await preference.create({
    body: {
      items,

      external_reference: externalReference,
      metadata,

      payer: {
        name: nome,
        email,
        phone: {
          number: telefone,
        },
        ...(cpf
          ? {
              identification: {
                type: "CPF",
                number: cpf,
              },
            }
          : {}),
      },

      back_urls: {
        success: `${siteUrl}/pagamento/sucesso?${paramsSucesso.toString()}`,
        failure: `${siteUrl}/pagamento/falha?tipo=${tipo}&external_reference=${externalReference}`,
        pending: `${siteUrl}/pagamento/pendente?tipo=${tipo}&external_reference=${externalReference}`,
      },

      notification_url: `${siteUrl}/api/mercado-pago/webhook`,

      ...(usarAutoReturn
        ? {
            auto_return: "approved" as const,
          }
        : {}),

      statement_descriptor: "HOTDOGUERES",
    },
  });

  const initPoint = result.init_point || result.sandbox_init_point;

  if (!initPoint) {
    return NextResponse.json(
      {
        error: "URL do checkout não encontrada.",
        preferenceId: result.id,
      },
      { status: 500 },
    );
  }

  const valorUnitarioMedio =
    quantidadeTotal > 0 ? Number((total / quantidadeTotal).toFixed(2)) : total;

  const agora = new Date().toISOString();

  const { error: erroPedido } = await supabaseAdmin.from("pedidos").insert({
    external_reference: externalReference,
    mercado_pago_preference_id: result.id ? String(result.id) : null,
    mercado_pago_init_point: initPoint,
    mercado_pago_payment_id: null,

    tipo,
    categoria: tipo,
    produto: titulo,

    nome_comprador: nome,
    email_comprador: email,
    whatsapp: telefone,
    cpf,

    quantidade: quantidadeTotal,
    valor_unitario: valorUnitarioMedio,
    valor_frete: 0,
    total_produtos: total,
    total_pedido: total,
    valor_total: total,

    modalidade_entrega: "retirada",
    retirada_no_local: true,
    servico_frete: "Retirada",
    prazo_frete: "Retirada conforme organização do evento",

    status: "aguardando_pagamento",

    metadata,

    created_at: agora,
    updated_at: agora,
  });

  if (erroPedido) {
    console.error("ERRO AO SALVAR PEDIDO NO SUPABASE:", erroPedido);

    return NextResponse.json(
      {
        error: "Pagamento criado, mas houve erro ao salvar o pedido no banco.",
        detalhe: erroPedido.message,
        codigo: erroPedido.code,
        hint: erroPedido.hint,
        details: erroPedido.details,

        initPoint,
        init_point: initPoint,
        sandbox_init_point: result.sandbox_init_point,
        url: initPoint,

        preferenceId: result.id,
        externalReference,
        external_reference: externalReference,
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    ok: true,

    initPoint,
    init_point: initPoint,
    sandbox_init_point: result.sandbox_init_point,
    url: initPoint,
    checkoutUrl: initPoint,

    preferenceId: result.id,
    externalReference,
    external_reference: externalReference,

    tipo,
    produto,
    titulo,

    eventoId,
    evento_id: eventoId,
    municipio,

    total,
    valor: total,
    quantidadeTotal,
    quantidade_total: quantidadeTotal,

    ingressos,
    sextoIngresso,
    sexto_ingresso: sextoIngresso,

    kgAlimentos,
    kg_alimentos: kgAlimentos,

    colecionarIngresso,
    colecionar_ingresso: colecionarIngresso,

    enviarParaColecao: colecionarIngresso,
    enviar_para_colecao: colecionarIngresso,

    permitirResgateColecaoDepois,
    permitir_resgate_colecao_depois: permitirResgateColecaoDepois,

    modoAdmin,
    modo_admin: modoAdmin,
  });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as DadosCheckoutIngressos;

    return await criarCheckoutIngressos(body);
  } catch (error) {
    console.error("ERRO AO CRIAR CHECKOUT DE INGRESSOS:", error);

    return NextResponse.json(
      {
        error: "Erro ao criar pagamento dos ingressos.",
        detalhe: transformarErroEmTexto(error),
      },
      { status: 500 },
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const dados = Object.fromEntries(searchParams.entries());

    return await criarCheckoutIngressos(dados);
  } catch (error) {
    console.error("ERRO AO CRIAR CHECKOUT DE INGRESSOS VIA GET:", error);

    return NextResponse.json(
      {
        error: "Erro ao criar pagamento dos ingressos.",
        detalhe: transformarErroEmTexto(error),
      },
      { status: 500 },
    );
  }
}
