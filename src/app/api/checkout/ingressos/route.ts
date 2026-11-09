import { NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const VALOR_INGRESSO_COLECIONAVEL = 20;
const VALOR_SEXTO_INGRESSO = 80;
const VALOR_HOT_DOG_DAY = 20;

type TipoCompra = "ingresso-solidario-colecionavel" | "hot-dog-day";

type DadosCheckoutIngressos = {
  tipo?: unknown;
  nome?: unknown;
  nomeComprador?: unknown;
  email?: unknown;
  emailComprador?: unknown;
  telefone?: unknown;
  whatsapp?: unknown;
  cpf?: unknown;
  ingressos?: unknown;
  quantidade?: unknown;
  quantidadeTotal?: unknown;
  sextoIngresso?: unknown;
  kgAlimentos?: unknown;
  valor?: unknown;
  total?: unknown;
  produto?: unknown;
  titulo?: unknown;
  ingressosSelecionados?: unknown;
  nomeIngressoEternizado?: unknown;
  admin?: unknown;
  teste?: unknown;
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

function limparNumero(valor: unknown) {
  return String(valor || "").replace(/\D/g, "");
}

function booleanoSeguro(valor: unknown) {
  if (typeof valor === "boolean") {
    return valor;
  }

  const texto = String(valor || "").toLowerCase().trim();

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

function limitarQuantidade(valor: unknown, minimo = 1, maximo = 999) {
  const numero = Math.floor(numeroSeguro(valor, minimo));

  if (!Number.isFinite(numero) || numero < minimo) {
    return minimo;
  }

  return Math.min(numero, maximo);
}

function criarExternalReference(tipo: TipoCompra) {
  return `${tipo}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
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

  const tipo: TipoCompra =
    textoSeguro(dados.tipo) === "hot-dog-day"
      ? "hot-dog-day"
      : "ingresso-solidario-colecionavel";

  const ehHotDogDay = tipo === "hot-dog-day";

  const nome =
    textoSeguro(dados.nome) ||
    textoSeguro(dados.nomeComprador) ||
    "Comprador";

  const email =
    textoSeguro(dados.email) || textoSeguro(dados.emailComprador);

  const telefone =
    textoSeguro(dados.telefone) || textoSeguro(dados.whatsapp);

  const cpf = limparNumero(dados.cpf);

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
        error: "CPF do comprador é obrigatório para ingressos colecionáveis.",
      },
      { status: 400 },
    );
  }

  const ingressos = limitarQuantidade(
    dados.ingressos || dados.quantidade || dados.quantidadeTotal || 1,
    1,
    ehHotDogDay ? 999 : 5,
  );

  const sextoIngresso =
    !ehHotDogDay && ingressos >= 5 && booleanoSeguro(dados.sextoIngresso);

  const quantidadeTotal = ehHotDogDay
    ? ingressos
    : ingressos + (sextoIngresso ? 1 : 0);

  const kgAlimentos = ehHotDogDay
    ? 0
    : numeroSeguro(dados.kgAlimentos) || ingressos + (sextoIngresso ? 3 : 0);

  const modoAdmin =
    booleanoSeguro(dados.admin) || booleanoSeguro(dados.teste);

  const valorParametro =
    numeroSeguro(dados.valor) || numeroSeguro(dados.total);

  const totalCalculado = ehHotDogDay
    ? ingressos * VALOR_HOT_DOG_DAY
    : ingressos * VALOR_INGRESSO_COLECIONAVEL +
      (sextoIngresso ? VALOR_SEXTO_INGRESSO : 0);

  const total = Number(
    (modoAdmin && valorParametro > 0
      ? valorParametro
      : totalCalculado
    ).toFixed(2),
  );

  if (total <= 0) {
    return NextResponse.json(
      {
        error: "Valor inválido para gerar o pagamento.",
      },
      { status: 400 },
    );
  }

  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000"
  ).replace(/\/$/, "");

  const usarAutoReturn = siteUrl.startsWith("https://");

  const externalReference = criarExternalReference(tipo);

  const tituloPadrao = ehHotDogDay
    ? "Ingresso Hot Dog Day"
    : sextoIngresso
      ? "Ingresso Solidário Colecionável + 6º Especial"
      : "Ingresso Solidário Colecionável";

  const titulo = textoSeguro(dados.titulo, tituloPadrao);

  const produto = textoSeguro(
    dados.produto,
    ehHotDogDay ? "hot-dog-day" : "ingresso-solidario-colecionavel",
  );

  const ingressosSelecionados = textoSeguro(dados.ingressosSelecionados);
  const nomeIngressoEternizado = textoSeguro(dados.nomeIngressoEternizado);

  const paramsSucesso = new URLSearchParams({
    tipo,
    produto,
    titulo,
    ingressos: String(ingressos),
    sextoIngresso: sextoIngresso ? "sim" : "nao",
    quantidadeTotal: String(quantidadeTotal),
    kgAlimentos: String(kgAlimentos),
    external_reference: externalReference,
  });

  if (nomeIngressoEternizado) {
    paramsSucesso.set("nomeIngressoEternizado", nomeIngressoEternizado);
  }

  const metadata = {
    origem: "checkout-ingressos",

    external_reference: externalReference,
    externalReference,

    tipo,
    produto,
    titulo,

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

    ingressos_selecionados: ingressosSelecionados,
    ingressosSelecionados,

    eh_ingresso_colecionavel: !ehHotDogDay,
    modo_admin: modoAdmin,
  };

  const items =
    modoAdmin && valorParametro > 0
      ? [
          {
            id: produto,
            title: `${titulo} - Teste Admin`,
            quantity: 1,
            unit_price: total,
            currency_id: "BRL" as const,
          },
        ]
      : ehHotDogDay
        ? [
            {
              id: "hot-dog-day",
              title: titulo,
              quantity: ingressos,
              unit_price: VALOR_HOT_DOG_DAY,
              currency_id: "BRL" as const,
            },
          ]
        : [
            {
              id: "ingresso-solidario-colecionavel",
              title: "Ingresso Solidário Colecionável",
              quantity: ingressos,
              unit_price: VALOR_INGRESSO_COLECIONAVEL,
              currency_id: "BRL" as const,
            },
            ...(sextoIngresso
              ? [
                  {
                    id: "ingresso-eternizados-250-metros",
                    title: "Ingresso Especial Eternizados 250 Metros",
                    quantity: 1,
                    unit_price: VALOR_SEXTO_INGRESSO,
                    currency_id: "BRL" as const,
                  },
                ]
              : []),
          ];

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

    preference_id: result.id ? String(result.id) : null,
    mercado_pago_preference_id: result.id ? String(result.id) : null,
    mercado_pago_init_point: initPoint,

    payment_id: null,
    mercado_pago_payment_id: null,

    status: "aguardando_pagamento",

    tipo,
    produto,
    categoria: tipo,

    nome_comprador: nome,
    email_comprador: email,
    whatsapp: telefone,

    cpf,
    cpf_comprador: cpf,

    quantidade: quantidadeTotal,
    valor_unitario: valorUnitarioMedio,
    valor_frete: 0,
    total_produtos: total,
    total_pedido: total,
    valor_total: total,

    forma_entrega: "retirada",
    modalidade_entrega: "retirada",
    retirada_no_local: true,

    kg_alimentos: kgAlimentos,

    plano: null,
    evento_id: null,
    nome_evento: null,
    ano_colecao: null,
    ingresso_modelo_id: null,

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

    preferenceId: result.id,
    externalReference,
    external_reference: externalReference,

    total,
    quantidadeTotal,
    quantidade_total: quantidadeTotal,

    ingressos,
    sextoIngresso,
    sexto_ingresso: sextoIngresso,

    kgAlimentos,
    kg_alimentos: kgAlimentos,

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
