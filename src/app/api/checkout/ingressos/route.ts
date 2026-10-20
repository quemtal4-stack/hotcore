import { NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;

const VALOR_INGRESSO_COLECIONAVEL = 20;
const VALOR_SEXTO_INGRESSO = 80;
const VALOR_HOT_DOG_DAY = 20;

type TipoCompra = "ingresso-solidario-colecionavel" | "hot-dog-day";

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
  const texto = String(valor || "").toLowerCase();

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

function criarExternalReference(tipo: TipoCompra) {
  return `${tipo}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

async function criarCheckoutIngressos(dados: {
  tipo?: unknown;
  nome?: unknown;
  email?: unknown;
  telefone?: unknown;
  cpf?: unknown;
  ingressos?: unknown;
  quantidade?: unknown;
  quantidadeTotal?: unknown;
  sextoIngresso?: unknown;
  kgAlimentos?: unknown;
  valor?: unknown;
  produto?: unknown;
  titulo?: unknown;
  ingressosSelecionados?: unknown;
  admin?: unknown;
  teste?: unknown;
}) {
  if (!accessToken) {
    return NextResponse.json(
      { error: "Token do Mercado Pago não configurado." },
      { status: 500 }
    );
  }

  const tipo: TipoCompra =
    dados.tipo === "hot-dog-day" ? "hot-dog-day" : "ingresso-solidario-colecionavel";

  const ehHotDogDay = tipo === "hot-dog-day";

  const nome = String(dados.nome || "").trim();
  const email = String(dados.email || "").trim();
  const telefone = String(dados.telefone || "").trim();
  const cpf = limparNumero(dados.cpf);

  const ingressos = limitarQuantidade(
    dados.ingressos || dados.quantidade || 1,
    1,
    ehHotDogDay ? 999 : 5
  );

  const sextoIngresso =
    !ehHotDogDay && ingressos >= 5 && normalizarBoolean(dados.sextoIngresso);

  const quantidadeTotal = ehHotDogDay
    ? ingressos
    : ingressos + (sextoIngresso ? 1 : 0);

  const kgAlimentos = ehHotDogDay
    ? 0
    : normalizarNumero(dados.kgAlimentos) || ingressos + (sextoIngresso ? 3 : 0);

  const modoAdmin =
    normalizarBoolean(dados.admin) || normalizarBoolean(dados.teste);

  const valorParametro = normalizarNumero(dados.valor);

  const totalCalculado = ehHotDogDay
    ? ingressos * VALOR_HOT_DOG_DAY
    : ingressos * VALOR_INGRESSO_COLECIONAVEL +
      (sextoIngresso ? VALOR_SEXTO_INGRESSO : 0);

  const total = modoAdmin && valorParametro > 0 ? valorParametro : totalCalculado;

  if (total <= 0) {
    return NextResponse.json(
      { error: "Valor inválido para gerar o pagamento." },
      { status: 400 }
    );
  }

  const siteUrlBase =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const siteUrl = siteUrlBase.replace(/\/$/, "");

  const externalReference = criarExternalReference(tipo);

  const tituloPadrao = ehHotDogDay
    ? "Ingresso Hot Dog Day"
    : "Ingresso Solidário Colecionável";

  const titulo = String(dados.titulo || tituloPadrao);

  const produto = String(
    dados.produto ||
      (ehHotDogDay ? "hot-dog-day" : "ingresso-solidario-colecionavel")
  );

  const ingressosSelecionados = String(dados.ingressosSelecionados || "");

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

  const client = new MercadoPagoConfig({
    accessToken,
  });

  const preference = new Preference(client);

  const items =
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
                    currency_id: "BRL",
                  },
                ]
              : []),
          ];

  const result = await preference.create({
    body: {
      items,
      external_reference: externalReference,
      metadata: {
        tipo,
        produto,
        titulo,
        nome,
        email,
        telefone,
        cpf,
        ingressos,
        quantidade_total: quantidadeTotal,
        sexto_ingresso: sextoIngresso,
        kg_alimentos: kgAlimentos,
        ingressos_selecionados: ingressosSelecionados,
        modo_admin: modoAdmin,
        origem: "checkout-ingressos",
      },
      payer: {
        name: nome || undefined,
        email: email || undefined,
        phone: telefone
          ? {
              number: telefone,
            }
          : undefined,
        identification: cpf
          ? {
              type: "CPF",
              number: cpf,
            }
          : undefined,
      },
      back_urls: {
        success: `${siteUrl}/pagamento/sucesso?${paramsSucesso.toString()}`,
        failure: `${siteUrl}/pagamento/erro`,
        pending: `${siteUrl}/pagamento/pendente`,
      },
      notification_url: `${siteUrl}/api/webhook`,
      auto_return: "approved",
      statement_descriptor: "HOTDOGUERES",
    },
  });

  const initPoint = result.init_point || result.sandbox_init_point;

  if (!initPoint) {
    return NextResponse.json(
      { error: "URL do checkout não encontrada." },
      { status: 500 }
    );
  }

  return NextResponse.json({
    initPoint,
    init_point: initPoint,
    sandbox_init_point: result.sandbox_init_point,
    url: initPoint,
    preferenceId: result.id,
    externalReference,
    total,
    quantidadeTotal,
    sextoIngresso,
    kgAlimentos,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    return await criarCheckoutIngressos(body);
  } catch (error) {
    console.error("Erro ao criar checkout de ingressos:", error);

    return NextResponse.json(
      { error: "Erro ao criar pagamento dos ingressos." },
      { status: 500 }
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
      { error: "Erro ao criar pagamento dos ingressos." },
      { status: 500 }
    );
  }
}
