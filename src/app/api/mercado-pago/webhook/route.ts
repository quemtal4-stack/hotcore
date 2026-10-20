import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function extrairDetalheErro(error: unknown) {
  if (error instanceof Error) return error.message;
  try {
    return JSON.stringify(error);
  } catch {
    return "Erro desconhecido.";
  }
}

export async function POST(request: Request) {
  try {
    const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;

    if (!accessToken) {
      console.error("Webhook: token do Mercado Pago não configurado.");
      return NextResponse.json({ recebido: true });
    }

    const body = await request.json().catch(() => null);
    console.log("WEBHOOK RECEBIDO:", body);

    if (!body) {
      return NextResponse.json({ recebido: true });
    }

    const tipo = body.type || body.topic;
    const id = body.data?.id || body.resource;

    if (!tipo || !id) {
      // Mercado Pago envia pings de teste sem payload completo.
      return NextResponse.json({ recebido: true });
    }

    const { supabaseAdmin } = await import("@/lib/supabase-admin");

    // Notificação de ASSINATURA (Clube de Membros)
    if (tipo === "preapproval" || tipo === "subscription_preapproval") {
      const resposta = await fetch(
        `https://api.mercadopago.com/preapproval/${id}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      );

      const assinatura = await resposta.json();
      console.log("DETALHE ASSINATURA:", assinatura);

      if (assinatura?.id) {
        const statusMp = assinatura.status as string;

        const statusInterno =
          statusMp === "authorized"
            ? "ativo"
            : statusMp === "paused"
              ? "pausado"
              : statusMp === "cancelled"
                ? "cancelado"
                : "pendente";

        const { error: erroUpdate } = await supabaseAdmin
          .from("clube_membros")
          .update({
            status: statusInterno,
            mercado_pago_preapproval_id: assinatura.id,
            updated_at: new Date().toISOString(),
          })
          .eq("mercado_pago_preapproval_id", assinatura.id);

        if (erroUpdate) {
          console.error("Erro ao atualizar clube_membros via webhook:", erroUpdate);
        }
      }

      return NextResponse.json({ recebido: true });
    }

    // Notificação de PAGAMENTO ÚNICO (Loja, ingressos, etc.)
    if (tipo === "payment") {
      const resposta = await fetch(
        `https://api.mercadopago.com/v1/payments/${id}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      );

      const pagamento = await resposta.json();
      console.log("DETALHE PAGAMENTO:", pagamento);

      const externalReference = pagamento?.external_reference;

      if (externalReference) {
        const statusMp = pagamento.status as string;

        const statusInterno =
          statusMp === "approved"
            ? "pago"
            : statusMp === "rejected"
              ? "rejeitado"
              : statusMp === "cancelled"
                ? "cancelado"
                : "aguardando_pagamento";

        const { error: erroUpdatePedido } = await supabaseAdmin
          .from("pedidos")
          .update({
            status: statusInterno,
            updated_at: new Date().toISOString(),
          })
          .eq("external_reference", externalReference);

        if (erroUpdatePedido) {
          console.error("Erro ao atualizar pedidos via webhook:", erroUpdatePedido);
        }

        // Se for ingresso colecionável, atualiza também a pasta
        if (statusInterno === "pago") {
          await supabaseAdmin
            .from("colecionador_ingressos")
            .update({ status: "aprovado", updated_at: new Date().toISOString() })
            .eq("external_reference", externalReference);
        }
      }

      return NextResponse.json({ recebido: true });
    }

    return NextResponse.json({ recebido: true });
  } catch (error) {
    console.error("ERRO NO WEBHOOK MERCADO PAGO:", extrairDetalheErro(error));
    // Sempre responder 200 pro Mercado Pago não ficar reenviando infinitamente.
    return NextResponse.json({ recebido: true });
  }
}
