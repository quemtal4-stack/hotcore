import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    // ✅ 1. VALIDAÇÃO DE AUTENTICAÇÃO ADMIN
    const cookieStore = await cookies();
    const adminSession = cookieStore.get("admin_session")?.value;

    if (!adminSession || adminSession !== process.env.ADMIN_SESSION_SECRET) {
      return NextResponse.json(
        { error: "Não autorizado. Faça login como administrador." },
        { status: 401 }
      );
    }

    const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;

    if (!accessToken) {
      return NextResponse.json(
        { error: "Token do Mercado Pago não configurado." },
        { status: 500 }
      );
    }

    const body = await request.json();

    const { preapprovalId } = body;

    if (!preapprovalId) {
      return NextResponse.json(
        { error: "ID da assinatura não informado." },
        { status: 400 }
      );
    }

    const resposta = await fetch(
      `https://api.mercadopago.com/preapproval/${preapprovalId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "cancelled",
        }),
      }
    );

    const dados = await resposta.json();

    if (!resposta.ok) {
      return NextResponse.json(
        {
          error: "Erro ao cancelar assinatura.",
          detalhe: dados,
        },
        { status: resposta.status }
      );
    }

    const { error: erroSupabase } = await supabaseAdmin
      .from("clube_membros")
      .update({
        status: "cancelado",
        updated_at: new Date().toISOString(),
      })
      .eq("mercado_pago_preapproval_id", preapprovalId);

    if (erroSupabase) {
      console.error("Erro ao atualizar assinatura no Supabase:", erroSupabase);

      return NextResponse.json(
        {
          error: "Assinatura cancelada no Mercado Pago, mas não atualizada no banco.",
          detalhe: erroSupabase.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      sucesso: true,
      mensagem: "Assinatura cancelada com sucesso.",
      assinatura: dados,
    });
  } catch (error) {
    console.error("Erro ao cancelar assinatura:", error);

    return NextResponse.json(
      { error: "Erro interno ao cancelar assinatura." },
      { status: 500 }
    );
  }
}
