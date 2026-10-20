// src/app/api/metas/racao/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const META_RACAO_KG = 50000;

type PedidoRacao = {
  tipo?: string | null;
  categoria?: string | null;
  quantidade?: number | string | null;
  metadata?: Record<string, unknown> | null;
};

function textoSeguro(valor: unknown, padrao = "") {
  if (typeof valor === "string") return valor.trim();
  if (typeof valor === "number" && Number.isFinite(valor)) return String(valor);
  return padrao;
}

function numeroSeguro(valor: unknown, padrao = 0) {
  if (typeof valor === "number" && Number.isFinite(valor)) return valor;
  if (typeof valor === "string") {
    const numero = Number(valor);
    if (Number.isFinite(numero)) return numero;
  }
  return padrao;
}

function normalizarTexto(valor: unknown) {
  return textoSeguro(valor)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function contemRacao(valor: unknown) {
  const texto = normalizarTexto(valor);
  return (
    texto.includes("racao") ||
    texto.includes("pet") ||
    texto.includes("animal") ||
    texto.includes("protecao animal")
  );
}

function contemKit(valor: unknown) {
  const texto = normalizarTexto(valor);
  return texto.includes("kit") || texto.includes("combo");
}

function temCampoDeRacao(metadata: Record<string, unknown>) {
  return (
    numeroSeguro(metadata.kg_racao) > 0 ||
    numeroSeguro(metadata.kgRacao) > 0 ||
    numeroSeguro(metadata.racao_kg) > 0 ||
    numeroSeguro(metadata.racaoKg) > 0
  );
}

function ehPedidoDeRacao(pedido: PedidoRacao) {
  const metadata = pedido.metadata || {};
  return (
    contemRacao(pedido.tipo) ||
    contemRacao(pedido.categoria) ||
    contemRacao(metadata.tipo) ||
    contemRacao(metadata.categoria) ||
    contemRacao(metadata.produto) ||
    contemRacao(metadata.titulo) ||
    contemRacao(metadata.nome) ||
    contemRacao(metadata.descricao) ||
    contemRacao(metadata.slug) ||
    contemRacao(metadata.item) ||
    contemRacao(metadata.plano) ||
    temCampoDeRacao(metadata)
  );
}

function ehKitDeRacao(pedido: PedidoRacao) {
  const metadata = pedido.metadata || {};
  return (
    ehPedidoDeRacao(pedido) &&
    (Boolean(metadata.kit_id) ||
      Boolean(metadata.kitId) ||
      contemKit(pedido.tipo) ||
      contemKit(pedido.categoria) ||
      contemKit(metadata.tipo) ||
      contemKit(metadata.categoria) ||
      contemKit(metadata.produto) ||
      contemKit(metadata.titulo) ||
      contemKit(metadata.nome) ||
      contemKit(metadata.descricao) ||
      contemKit(metadata.slug) ||
      contemKit(metadata.item))
  );
}

function obterQuantidade(pedido: PedidoRacao) {
  const metadata = pedido.metadata || {};
  const quantidade =
    numeroSeguro(pedido.quantidade) ||
    numeroSeguro(metadata.quantidade_total) ||
    numeroSeguro(metadata.quantidade) ||
    numeroSeguro(metadata.kits) ||
    0;
  return Math.max(0, Math.floor(quantidade));
}

function obterKgRacaoInformado(pedido: PedidoRacao) {
  const metadata = pedido.metadata || {};
  return Math.max(
    0,
    numeroSeguro(metadata.kg_racao) ||
      numeroSeguro(metadata.kgRacao) ||
      numeroSeguro(metadata.racao_kg) ||
      numeroSeguro(metadata.racaoKg) ||
      numeroSeguro(metadata.kg_total) ||
      numeroSeguro(metadata.kgTotal) ||
      numeroSeguro(metadata.peso_kg) ||
      numeroSeguro(metadata.pesoKg) ||
      0,
  );
}

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("pedidos")
      .select("tipo, categoria, quantidade, metadata")
      .eq("status", "pago");

    if (error) {
      console.error("ERRO AO BUSCAR PEDIDOS PARA META DE RAÇÃO:", error);
      return NextResponse.json(
        {
          error: "Erro ao buscar dados da meta de ração.",
          detalhe: error.message,
        },
        { status: 500 },
      );
    }

    const pedidos = (data || []) as PedidoRacao[];

    let kgRacao = 0;
    let kgPorKits = 0;
    let kgOutros = 0;
    let kitsVendidos = 0;

    for (const pedido of pedidos) {
      if (!ehPedidoDeRacao(pedido)) continue;

      const quantidade = obterQuantidade(pedido);
      const kgInformado = obterKgRacaoInformado(pedido);

      if (ehKitDeRacao(pedido)) {
        const kgFinal = kgInformado || quantidade;
        kgPorKits += kgFinal;
        kitsVendidos += quantidade;
        continue;
      }

      if (kgInformado > 0) {
        kgOutros += kgInformado;
      }
    }

    kgRacao = kgPorKits + kgOutros;

    const percentualRacao = Math.min((kgRacao / META_RACAO_KG) * 100, 100);
    const kgRestantes = Math.max(META_RACAO_KG - kgRacao, 0);

    return NextResponse.json({
      meta: {
        racao_kg: META_RACAO_KG,
        racao_toneladas: META_RACAO_KG / 1000,
      },
      racao: {
        kg: kgRacao,
        toneladas: Number((kgRacao / 1000).toFixed(3)),
        restantes_kg: kgRestantes,
        restantes_toneladas: Number((kgRestantes / 1000).toFixed(3)),
        percentual: Number(percentualRacao.toFixed(2)),
      },
      fontes: {
        kits_kg: kgPorKits,
        outros_kg: kgOutros,
      },
      kits: {
        vendidos: kitsVendidos,
      },
      regra: {
        meta_total: `${META_RACAO_KG / 1000} toneladas de ração`,
      },
    });
  } catch (error) {
    console.error("ERRO GERAL NA META DE RAÇÃO:", error);
    return NextResponse.json(
      {
        error: "Erro interno ao calcular meta de ração.",
        detalhe: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
