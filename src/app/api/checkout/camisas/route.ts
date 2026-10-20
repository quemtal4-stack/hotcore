import { NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;

const FRETE_LOCAL_SERGIPE = 12;

function somarDias(dias: number) {
  const data = new Date();
  data.setDate(data.getDate() + dias);

  return data.toISOString().split("T")[0];
}

function normalizarNumero(valor: unknown) {
  const numero = Number(valor);

  if (!Number.isFinite(numero)) {
    return 0;
  }

  return numero;
}

export async function POST(request: Request) {
  try {
    if (!accessToken) {
      return NextResponse.json(
        { error: "Token do Mercado Pago não configurado." },
        { status: 500 }
      );
    }

    const body = await request.json();

    const camisa = body.camisa || "Camisa Hot Dogueres";
    const tamanho = body.tamanho || "Não informado";
    const preco = normalizarNumero(body.preco);
    const tipoEntrega = body.tipoEntrega || "retirada";
    const endereco = body.endereco || "";

    if (!preco || preco <= 0) {
      return NextResponse.json(
        { error: "Preço inválido para gerar o pagamento." },
        { status: 400 }
      );
    }

    const frete = tipoEntrega === "correios" ? FRETE_LOCAL_SERGIPE : 0;

    const dataDisponivel =
      tipoEntrega === "correios" ? somarDias(10) : somarDias(7);

    const siteUrlBase =
      process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const siteUrl = siteUrlBase.replace(/\/$/, "");

    const externalReference = `camisa-${Date.now()}`;

    const paramsSucesso = new URLSearchParams({
      camisa,
      tamanho,
      tipoEntrega,
      frete: String(frete),
      dataDisponivel,
      external_reference: externalReference,
    });

    if (endereco) {
      paramsSucesso.set("endereco", endereco);
    }

    const client = new MercadoPagoConfig({
      accessToken,
    });

    const preference = new Preference(client);

    const items = [
      {
        id: "camisa-hot-dogueres",
        title: `${camisa} - Tamanho ${tamanho}`,
        quantity: 1,
        unit_price: preco,
        currency_id: "BRL",
      },
    ];

    if (frete > 0) {
      items.push({
        id: "frete-sergipe",
        title: "Frete local / Sergipe",
        quantity: 1,
        unit_price: frete,
        currency_id: "BRL",
      });
    }

    const result = await preference.create({
      body: {
        items,
        external_reference: externalReference,
        metadata: {
          tipo: "camisa",
          camisa,
          tamanho,
          tipoEntrega,
          frete,
          endereco,
          dataDisponivel,
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
      url: initPoint,
      preferenceId: result.id,
      externalReference,
    });
  } catch (error) {
    console.error("Erro ao criar checkout da camisa:", error);

    return NextResponse.json(
      { error: "Erro ao criar pagamento da camisa." },
      { status: 500 }
    );
  }
}
