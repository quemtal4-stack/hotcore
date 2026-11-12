import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type MetadataPedido = Record<string, unknown>;

function extrairDetalheErro(error: unknown) {
  if (error instanceof Error) return error.message;

  try {
    return JSON.stringify(error);
  } catch {
    return "Erro desconhecido.";
  }
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

function booleanoSeguro(valor: unknown) {
  if (typeof valor === "boolean") {
    return valor;
  }

  if (typeof valor === "number") {
    return valor === 1;
  }

  if (typeof valor === "string") {
    const texto = valor.trim().toLowerCase();

    return (
      texto === "sim" ||
      texto === "true" ||
      texto === "1" ||
      texto === "yes"
    );
  }

  return false;
}

function obterIdNotificacao(body: Record<string, unknown>) {
  const data = body.data as { id?: string | number } | undefined;

  return textoSeguro(data?.id) || textoSeguro(body.resource);
}

function obterStatusInternoPagamento(statusMp: string) {
  if (statusMp === "approved") {
    return "pago";
  }

  if (statusMp === "rejected") {
    return "rejeitado";
  }

  if (statusMp === "cancelled") {
    return "cancelado";
  }

  if (statusMp === "refunded") {
    return "reembolsado";
  }

  if (statusMp === "charged_back") {
    return "chargeback";
  }

  return "aguardando_pagamento";
}

function obterStatusInternoAssinatura(statusMp: string) {
  if (statusMp === "authorized") {
    return "ativo";
  }

  if (statusMp === "paused") {
    return "pausado";
  }

  if (statusMp === "cancelled") {
    return "cancelado";
  }

  return "pendente";
}

function obterMetadataPagamento(pagamento: Record<string, unknown>) {
  const metadata = pagamento.metadata;

  if (metadata && typeof metadata === "object") {
    return metadata as MetadataPedido;
  }

  return {};
}

function obterMetadataPedido(pedido: Record<string, unknown> | null) {
  const metadata = pedido?.metadata;

  if (metadata && typeof metadata === "object") {
    return metadata as MetadataPedido;
  }

  return {};
}

function deveEnviarParaColecao(metadata: MetadataPedido) {
  return (
    booleanoSeguro(metadata.colecionar_ingresso) ||
    booleanoSeguro(metadata.colecionarIngresso) ||
    booleanoSeguro(metadata.enviar_para_colecao) ||
    booleanoSeguro(metadata.enviarParaColecao) ||
    booleanoSeguro(metadata.eh_ingresso_colecionavel)
  );
}

function permiteResgateDepois(metadata: MetadataPedido) {
  return (
    booleanoSeguro(metadata.permitir_resgate_colecao_depois) ||
    booleanoSeguro(metadata.permitirResgateColecaoDepois)
  );
}

function obterStatusColecionadorPorPagamento(statusInterno: string) {
  if (statusInterno === "pago") {
    return "aprovado";
  }

  if (
    statusInterno === "rejeitado" ||
    statusInterno === "cancelado" ||
    statusInterno === "reembolsado" ||
    statusInterno === "chargeback"
  ) {
    return "cancelado";
  }

  return "pendente";
}

export async function POST(request: Request) {
  try {
    const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;

    if (!accessToken) {
      console.error("Webhook: token do Mercado Pago não configurado.");
      return NextResponse.json({ recebido: true });
    }

    const body = (await request.json().catch(() => null)) as
      | Record<string, unknown>
      | null;

    console.log("WEBHOOK RECEBIDO:", body);

    if (!body) {
      return NextResponse.json({ recebido: true });
    }

    const tipo = textoSeguro(body.type) || textoSeguro(body.topic);
    const id = obterIdNotificacao(body);

    if (!tipo || !id) {
      return NextResponse.json({ recebido: true });
    }

    const { supabaseAdmin } = await import("@/lib/supabase-admin");

    if (tipo === "preapproval" || tipo === "subscription_preapproval") {
      const resposta = await fetch(
        `https://api.mercadopago.com/preapproval/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      const assinatura = await resposta.json();
      console.log("DETALHE ASSINATURA:", assinatura);

      if (assinatura?.id) {
        const statusMp = textoSeguro(assinatura.status);
        const statusInterno = obterStatusInternoAssinatura(statusMp);

        const { error: erroUpdate } = await supabaseAdmin
          .from("clube_membros")
          .update({
            status: statusInterno,
            mercado_pago_preapproval_id: assinatura.id,
            updated_at: new Date().toISOString(),
          })
          .eq("mercado_pago_preapproval_id", assinatura.id);

        if (erroUpdate) {
          console.error(
            "Erro ao atualizar clube_membros via webhook:",
            erroUpdate,
          );
        }
      }

      return NextResponse.json({ recebido: true });
    }

    if (tipo === "payment") {
      const resposta = await fetch(
        `https://api.mercadopago.com/v1/payments/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      const pagamento = await resposta.json();
      console.log("DETALHE PAGAMENTO:", pagamento);

      const externalReference = textoSeguro(pagamento?.external_reference);

      if (externalReference) {
        const statusMp = textoSeguro(pagamento.status);
        const statusInterno = obterStatusInternoPagamento(statusMp);
        const metadataPagamento = obterMetadataPagamento(pagamento);

        const { data: pedidoAtualizado, error: erroUpdatePedido } =
          await supabaseAdmin
            .from("pedidos")
            .update({
              status: statusInterno,
              mercado_pago_payment_id: textoSeguro(pagamento.id) || id,
              mercado_pago_metadata: pagamento,
              updated_at: new Date().toISOString(),
            })
            .eq("external_reference", externalReference)
            .select("id, metadata")
            .maybeSingle();

        if (erroUpdatePedido) {
          console.error(
            "Erro ao atualizar pedidos via webhook:",
            erroUpdatePedido,
          );
        }

        const metadataPedido = obterMetadataPedido(pedidoAtualizado);

        const metadataFinal: MetadataPedido = {
          ...metadataPedido,
          ...metadataPagamento,
        };

        const enviarParaColecao = deveEnviarParaColecao(metadataFinal);
        const permitirResgateFuturo = permiteResgateDepois(metadataFinal);

        console.log("REGRA COLECIONADOR:", {
          externalReference,
          statusInterno,
          enviarParaColecao,
          permitirResgateFuturo,
          colecionar_ingresso: metadataFinal.colecionar_ingresso,
          colecionarIngresso: metadataFinal.colecionarIngresso,
          enviar_para_colecao: metadataFinal.enviar_para_colecao,
          eh_ingresso_colecionavel: metadataFinal.eh_ingresso_colecionavel,
        });

        if (enviarParaColecao) {
          const statusColecionador =
            obterStatusColecionadorPorPagamento(statusInterno);

          const { data: ingressosAtualizados, error: erroColecionador } =
            await supabaseAdmin
              .from("colecionador_ingressos")
              .update({
                status: statusColecionador,
                updated_at: new Date().toISOString(),
              })
              .eq("external_reference", externalReference)
              .select("id, pasta_id, ingresso_id, status");

          if (erroColecionador) {
            console.error(
              "Erro ao atualizar ingresso na Área do Colecionador:",
              erroColecionador,
            );
          } else {
            console.log("INGRESSOS DO COLECIONADOR ATUALIZADOS:", {
              externalReference,
              statusColecionador,
              total: ingressosAtualizados?.length || 0,
              ingressosAtualizados,
            });
          }
        }

        if (statusInterno === "pago" && !enviarParaColecao) {
          console.log(
            "Pagamento aprovado, mas comprador escolheu não enviar automaticamente para a coleção.",
            {
              externalReference,
              permitirResgateFuturo,
            },
          );
        }
      }

      return NextResponse.json({ recebido: true });
    }

    return NextResponse.json({ recebido: true });
  } catch (error) {
    console.error("ERRO NO WEBHOOK MERCADO PAGO:", extrairDetalheErro(error));

    return NextResponse.json({ recebido: true });
  }
}
