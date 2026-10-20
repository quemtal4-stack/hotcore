import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function limparNumero(valor: string) {
  return valor.replace(/\D/g, "");
}

function obterMensagemErro(error: unknown) {
  if (error instanceof Error) return error.message;

  try {
    return JSON.stringify(error);
  } catch {
    return "Erro desconhecido.";
  }
}

export async function GET(request: Request) {
  try {
    const { supabaseAdmin } = await import("@/lib/supabase-admin");

    const { searchParams } = new URL(request.url);
    const cpf = limparNumero(searchParams.get("cpf") || "");

    if (cpf.length !== 11) {
      return NextResponse.json(
        { error: "Informe um CPF válido." },
        { status: 400 }
      );
    }

    const { data: pasta, error: erroPasta } = await supabaseAdmin
      .from("colecionador_pastas")
      .select("id, cpf, nome, email, telefone")
      .eq("cpf", cpf)
      .maybeSingle();

    if (erroPasta) {
      return NextResponse.json(
        {
          error: "Erro ao buscar pasta do colecionador.",
          detalhe: erroPasta.message,
        },
        { status: 500 }
      );
    }

    if (!pasta) {
      return NextResponse.json({
        pasta: null,
        ingressos: [],
      });
    }

    const { data: ingressos, error: erroIngressos } = await supabaseAdmin
      .from("colecionador_ingressos")
      .select(
        "id, ingresso_id, titulo, descricao, imagem, tag, especial, quantidade, status, nome_eternizado"
      )
      .eq("pasta_id", pasta.id)
      .order("especial", { ascending: true })
      .order("ingresso_id", { ascending: true });

    if (erroIngressos) {
      return NextResponse.json(
        {
          error: "Erro ao buscar ingressos da pasta.",
          detalhe: erroIngressos.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      pasta,
      ingressos: ingressos || [],
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Erro inesperado ao acessar pasta.",
        detalhe: obterMensagemErro(error),
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const { supabaseAdmin } = await import("@/lib/supabase-admin");

    const body = (await request.json()) as {
      cpf?: string;
      nomeEternizado?: string;
    };

    const cpf = limparNumero(body.cpf || "");
    const nomeEternizado = String(body.nomeEternizado || "").trim();

    if (cpf.length !== 11) {
      return NextResponse.json(
        { error: "Informe um CPF válido." },
        { status: 400 }
      );
    }

    const { data: pasta, error: erroPasta } = await supabaseAdmin
      .from("colecionador_pastas")
      .select("id")
      .eq("cpf", cpf)
      .maybeSingle();

    if (erroPasta) {
      return NextResponse.json(
        {
          error: "Erro ao buscar pasta.",
          detalhe: erroPasta.message,
        },
        { status: 500 }
      );
    }

    if (!pasta) {
      return NextResponse.json(
        { error: "Pasta não encontrada para este CPF." },
        { status: 404 }
      );
    }

    const { error: erroUpdate } = await supabaseAdmin
      .from("colecionador_ingressos")
      .update({
        nome_eternizado: nomeEternizado,
        updated_at: new Date().toISOString(),
      })
      .eq("pasta_id", pasta.id)
      .eq("especial", true);

    if (erroUpdate) {
      return NextResponse.json(
        {
          error: "Erro ao salvar nome eternizado.",
          detalhe: erroUpdate.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      nomeEternizado,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Erro inesperado ao salvar nome.",
        detalhe: obterMensagemErro(error),
      },
      { status: 500 }
    );
  }
}
