import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PLANOS_CLUBE = {
  apoiador: {
    nome: "Apoiador",
    valor: 19.9,
    periodo: "mensal",
    frequency: 1,
    frequency_type: "months",
  },
  lendario: {
    nome: "Lendário",
    valor: 29.9,
    periodo: "mensal",
    frequency: 1,
    frequency_type: "months",
  },
  fundador: {
    nome: "Fundador",
    valor: 39.9,
    periodo: "mensal",
    frequency: 1,
    frequency_type: "months",
  },
  colecionador: {
    nome: "Colecionador",
    valor: 59.9,
    periodo: "mensal",
    frequency: 1,
    frequency_type: "months",
  },
  guardiao: {
    nome: "Guardião",
    valor: 89.9,
    periodo: "mensal",
    frequency: 1,
    frequency_type: "months",
  },
  eternizado: {
    nome: "Eternizados",
    valor: 497,
    periodo: "anual",
    frequency: 12,
    frequency_type: "months",
  },
} as const;

type PlanoClube = keyof typeof PLANOS_CLUBE;

function textoSeguro(valor: unknown) {
  return String(valor || "").trim();
}

function normalizarTexto(valor: unknown) {
  return textoSeguro(valor)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function normalizarPlano(valor: unknown): PlanoClube | null {
  const plano = normalizarTexto(valor || "apoiador");

  if (plano === "eternizados") {
    return "eternizado";
  }

  if (plano === "lenda") {
    return "lendario";
  }

  if (plano in PLANOS_CLUBE) {
    return plano as PlanoClube;
  }

  return null;
}

function extrairDetalheErro(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    return error.message;
  }

  if (
    typeof error === "object" &&
    error !== null &&
    "error" in error
  ) {
    const erroInterno = error.error;

    if (typeof erroInterno === "string") {
      return erroInterno;
    }

    try {
      return JSON.stringify(erroInterno);
    } catch {
      return "Erro desconhecido.";
    }
  }

  if (
    typeof error === "object" &&
    error !== null &&
    "cause" in error
  ) {
    try {
      return JSON.stringify(error.cause);
    } catch {
      return "Erro desconhecido.";
    }
  }

  try {
    return JSON.stringify(error);
  } catch {
    return "Erro desconhecido.";
  }
}

export async function POST(request: Request) {
  try {
    console.log("API ASSINATURA: início");

    const { MercadoPagoConfig, PreApproval } = await import("mercadopago");
    const { supabaseAdmin } = await import("@/lib/supabase-admin");

    const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;

    if (!accessToken) {
      return NextResponse.json(
        {
          error: "Token do Mercado Pago não configurado.",
          detalhe: "Verifique MERCADO_PAGO_ACCESS_TOKEN no .env.local.",
        },
        { status: 500 },
      );
    }

    const body = await request.json().catch(() => null);

    if (!body) {
      return NextResponse.json(
        { error: "Dados inválidos." },
        { status: 400 },
      );
    }

    console.log("BODY RECEBIDO:", body);

    const planoNormalizado = normalizarPlano(body.plano);

    if (!planoNormalizado) {
      return NextResponse.json(
        { error: "Plano inválido." },
        { status: 400 },
      );
    }

    const plano = PLANOS_CLUBE[planoNormalizado];

    // 🆕 Valor de teste admin: só é usado se vier explicitamente no body.
    // Fluxo normal do público nunca envia "valor", então sempre cai no valor fixo do plano.
    const valorBody = Number(body.valor);
    const valorFinal =
      Number.isFinite(valorBody) && valorBody > 0 ? valorBody : plano.valor;

    const nomeComprador = textoSeguro(
      body.nomeComprador || body.nome || body.name || "Comprador",
    );

    const emailNormalizado = textoSeguro(body.emailComprador || body.email)
      .toLowerCase();

    if (!emailNormalizado) {
      return NextResponse.json(
        { error: "E-mail do comprador é obrigatório." },
        { status: 400 },
      );
    }
// 🧪 Temporariamente desativado para testes com usuário de teste do Mercado Pago
// if (
//   emailNormalizado.includes("test_user") ||
//   emailNormalizado.includes("testuser")
// ) {
//   return NextResponse.json(
//     {
//       error: "E-mail de teste não permitido em produção.",
//       detalhe:
//         "Você está usando token APP_USR de produção. Use um e-mail real de comprador.",
//     },
//     { status: 400 },
//   );
// }


    const externalReference = `clube-${planoNormalizado}-${Date.now()}`;

    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "") ||
      "http://localhost:3000";

    console.log("Salvando pessoa no Supabase...");

    const { data: pessoa, error: erroPessoa } = await supabaseAdmin
      .from("pessoas")
      .upsert(
        {
          nome: nomeComprador,
          email: emailNormalizado,
          whatsapp: body.whatsapp || body.telefone || null,
          origem: "clube",
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "email",
        },
      )
      .select("id")
      .single();

    if (erroPessoa || !pessoa) {
      console.error("Erro ao salvar pessoa:", erroPessoa);

      return NextResponse.json(
        {
          error: "Erro ao salvar cadastro da pessoa.",
          detalhe: erroPessoa?.message,
        },
        { status: 500 },
      );
    }

    console.log("Pessoa salva:", pessoa.id);

    const periodicidade =
      planoNormalizado === "eternizado" ? "anual" : "mensal";

    console.log("Salvando membro no Supabase...");

    const { data: membro, error: erroMembro } = await supabaseAdmin
      .from("clube_membros")
      .insert({
        pessoa_id: pessoa.id,
        plano: planoNormalizado,
        valor: valorFinal,
        periodicidade,
        status: "iniciando",
        external_reference: externalReference,
      })
      .select("id")
      .single();

    if (erroMembro || !membro) {
      console.error("Erro ao salvar membro:", erroMembro);

      return NextResponse.json(
        {
          error: "Erro ao salvar membro do clube.",
          detalhe: erroMembro?.message,
        },
        { status: 500 },
      );
    }

    console.log("Membro salvo:", membro.id);

    const client = new MercadoPagoConfig({
      accessToken,
    });

    const preApproval = new PreApproval(client);

    console.log("Criando assinatura no Mercado Pago...");

    const result = await preApproval.create({
      body: {
        reason: `Clube de Membros Hot Dogueres - Plano ${plano.nome}`,
        payer_email: emailNormalizado,
        back_url: `${baseUrl}/clube-de-membros/sucesso`,
        notification_url: `${baseUrl}/api/mercado-pago/webhook`, // 🆕 adicionar esta linha
        auto_recurring: {
          frequency: plano.frequency,
          frequency_type: plano.frequency_type,
          transaction_amount: valorFinal,
          currency_id: "BRL",
        },
        status: "pending",
        external_reference: externalReference,
      } as any, // 🆕 "as any" necessário pois o SDK não tipa notification_url, mas a API aceita
    });

    console.log("ASSINATURA MERCADO PAGO:", result);

    const assinaturaCriada = result as {
      id?: string;
      init_point?: string;
      sandbox_init_point?: string;
      status?: string;
    };

    const urlMercadoPago =
      assinaturaCriada.init_point || assinaturaCriada.sandbox_init_point;

    if (!urlMercadoPago) {
      return NextResponse.json(
        {
          error:
            "Assinatura criada, mas URL de pagamento não foi retornada pelo Mercado Pago.",
          preapproval_id: assinaturaCriada.id,
        },
        { status: 500 },
      );
    }

    const { error: erroAtualizacao } = await supabaseAdmin
      .from("clube_membros")
      .update({
        status: "pendente",
        mercado_pago_preapproval_id: assinaturaCriada.id || null,
        mercado_pago_init_point: urlMercadoPago,
        updated_at: new Date().toISOString(),
      })
      .eq("id", membro.id);

    if (erroAtualizacao) {
      console.error("Erro ao atualizar membro:", erroAtualizacao);

      return NextResponse.json(
        {
          error: "Assinatura criada, mas houve erro ao atualizar o membro.",
          detalhe: erroAtualizacao.message,
          preapproval_id: assinaturaCriada.id,
          init_point: urlMercadoPago,
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      id: assinaturaCriada.id,
      preapproval_id: assinaturaCriada.id,
      url: urlMercadoPago,
      init_point: urlMercadoPago,
      status: assinaturaCriada.status,
      plano: planoNormalizado,
      nome_plano: plano.nome,
      valor: valorFinal,
      periodicidade,
      external_reference: externalReference,
    });
  } catch (error: unknown) {
    console.error("ERRO ASSINATURA MERCADO PAGO:", error);

    return NextResponse.json(
      {
        error: "Erro ao criar assinatura no Mercado Pago.",
        detalhe: extrairDetalheErro(error),
      },
      { status: 500 },
    );
  }
}
