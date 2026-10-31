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

function normalizarNumero(valor: unknown) {
  const numero = Number(valor);

  if (!Number.isFinite(numero)) {
    return 0;
  }

  return numero;
}

function limparNumero(valor: unknown) {
  return String(valor || "").replace(/\D/g, "");
}

function normalizarBoolean(valor: unknown) {
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

function limitarQuantidade(valor: unknown, minimo = 1, maximo = 999) {
  const numero = Math.floor(normalizarNumero(valor));

  if (!Number.isFinite(numero) || numero < minimo) {
    return minimo;
  }

  return Math.min(numero, maximo);
}

function validarEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function criarExternalReference(tipo: TipoCompra) {
  return `${tipo}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

async function salvarPedidoPendente(params: {
  externalReference: string;
  preferenceId?: string | number;
  initPoint: string;
  tipo: TipoCompra;
  produto: string;
  titulo: string;
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  ingressos: number;
  quantidadeTotal: number;
  sextoIngresso: boolean;
  kgAlimentos: number;
  total: number;
  metadata: Record<string, unknown>;
}) {
  const agora = new Date().toISOString();
  const valorUnitarioMedio =
    params.quantidadeTotal > 0 ? params.total / params.quantidadeTotal : params.total;

  const { error } = await supabaseAdmin.from("pedidos").insert({
    external_reference: params.externalReference,
    mercado_pago_preference_id: params.preferenceId
      ? String(params.preferenceId)
      : null,
    mercado_pago_init_point: params.initPoint,

    tipo: params.tipo,
    categoria: params.tipo,
    produto: params.titulo,

    nome_comprador: params.nome,
    email_comprador: params.email,
    whatsapp: params.telefone,

    quantidade: params.quantidadeTotal,
    valor_unitario: Number(valorUnitarioMedio.toFixed(2)),
    valor_frete: 0,
    total_produtos: Number(params.total.toFixed(2)),
    total_pedido: Number(params.total.toFixed(2)),

    status: "aguardando_pagamento",

    metadata: params.metadata,
    created_at: agora,
    updated_at: agora,
  });

  if (error) {
    throw new Error(`Erro ao salvar pedido pendente: ${error.message}`);
  }
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
    dados.tipo === "hot-dog-day"
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
    !ehHotDogDay && ingressos >= 5 && normalizarBoolean(dados.sextoIngresso);

  const quantidadeTotal = ehHotDogDay
    ? ingressos
    : ingressos + (sextoIngresso ? 1 : 0);

  const kgAlimentos = ehHotDogDay
    ? 0
    : normalizarNumero(dados.kgAlimentos) ||
      ingressos + (sextoIngresso ? 3 : 0);

  const modoAdmin =
    normalizarBoolean(dados.admin) || normalizarBoolean(dados.teste);

  const valorParametro =
    normalizarNumero(dados.valor) || normalizarNumero(dados.total);

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

  const siteUrlBase =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000";

  const siteUrl = siteUrlBase.replace(/\/$/, "");
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

    /*
      Importante:
      Para o webhook montar corretamente a pasta do colecionador,
      quantidade_total fica com a quantidade de ingressos comuns.
      O total da compra com o especial fica em quantidade_total_compra.
    */
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

  const client = new MercadoPagoConfig({
    accessToken,
  });

  const preference = new Preference(client);

  const items: Array<{
    id: string;
    title: string;
    quantity: number;
    unit_price: number;
    currency_id: "BRL";
  }> =
    modoAdmin && valorParametro > 0
      ? [
          {
            id: produto,
            title: `${titulo} - Teste Admin`,
            quantity: 1,
            unit_price: total,
            currency_id: "BRL",
          },
        ]
      : ehHotDogDay
        ? [
            {
              id: "hot-dog-day",
              title: titulo,
              quantity: ingressos,
              unit_price: VALOR_HOT_DOG_DAY,
              currency_id: "BRL",
            },
          ]
        : [
            {
              id: "ingresso-solidario-colecionavel",
              title: "Ingresso Solidário Colecionável",
              quantity: ingressos,
              unit_price: VALOR_INGRESSO_COLECIONAVEL,
              currency_id: "BRL",
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
        failure: `${siteUrl}/pagamento/erro`,
        pending: `${siteUrl}/pagamento/pendente`,
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

  try {
    await salvarPedidoPendente({
      externalReference,
      preferenceId: result.id,
      initPoint,
      tipo,
      produto,
      titulo,
      nome,
      email,
      telefone,
      cpf,
      ingressos,
      quantidadeTotal,
      sextoIngresso,
      kgAlimentos,
      total,
      metadata,
    });
  } catch (error) {
    console.error("Pedido criado no Mercado Pago, mas não salvo no Supabase:", error);

    return NextResponse.json(
      {
        error: "Pagamento criado, mas houve erro ao salvar o pedido no banco.",
        detalhe: transformarErroEmTexto(error),
        initPoint,
        init_point: initPoint,
        sandbox_init_point: result.sandbox_init_point,
        url: initPoint,
        preferenceId: result.id,
        externalReference,
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
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
    console.error("Erro ao criar checkout de ingressos:", error);

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
    console.error("Erro ao criar checkout de ingressos via GET:", error);

    return NextResponse.json(
      {
        error: "Erro ao criar pagamento dos ingressos.",
        detalhe: transformarErroEmTexto(error),
      },
      { status: 500 },
    );
  }
}
