import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const META_INGRESSOS = 100000;
const META_INGRESSOS_COMUNS = 98000;
const LIMITE_INGRESSOS_ETERNIZADOS = 2000;

const TIPOS_INGRESSO = ["ingresso", "ingresso_evento", "ingresso_fixo"];

type PedidoMetaIngresso = {
  tipo?: string | null;
  categoria?: string | null;
  quantidade?: number | string | null;
  metadata?: Record<string, unknown> | null;
};

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
  if (typeof valor === "number" && Number.isFinite(valor)) {
    return valor;
  }

  if (typeof valor === "string") {
    const numero = Number(valor);

    if (Number.isFinite(numero)) {
      return numero;
    }
  }

  return padrao;
}

function normalizarTexto(valor: unknown) {
  return textoSeguro(valor)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function contemEternizado(valor: unknown) {
  return normalizarTexto(valor).includes("eternizado");
}

function contemIngressoOficial(valor: unknown) {
  const texto = normalizarTexto(valor);

  return (
    texto.includes("ingresso") ||
    texto.includes("apresentacao-do-ecossistema-hot-dogueres") ||
    texto.includes("gastronomia-que-salva-vidas") ||
    texto.includes("hot-dogueres-pequenas-acoes")
  );
}

function ehPedidoDeIngresso(pedido: PedidoMetaIngresso) {
  const tipo = textoSeguro(pedido.tipo);
  const metadata = pedido.metadata || {};
  const tipoMetadata = textoSeguro(metadata.tipo);

  return (
    TIPOS_INGRESSO.includes(tipo) ||
    TIPOS_INGRESSO.includes(tipoMetadata) ||
    contemIngressoOficial(pedido.tipo) ||
    contemIngressoOficial(pedido.categoria) ||
    contemIngressoOficial(metadata.tipo) ||
    contemIngressoOficial(metadata.categoria) ||
    contemIngressoOficial(metadata.produto) ||
    contemIngressoOficial(metadata.titulo) ||
    contemIngressoOficial(metadata.evento_id) ||
    contemIngressoOficial(metadata.eventoId) ||
    contemIngressoOficial(metadata.ingresso_modelo_id) ||
    contemIngressoOficial(metadata.ingressoModeloId)
  );
}

function ehIngressoEternizado(pedido: PedidoMetaIngresso) {
  const metadata = pedido.metadata || {};

  return (
    ehPedidoDeIngresso(pedido) &&
    (contemEternizado(pedido.tipo) ||
      contemEternizado(pedido.categoria) ||
      contemEternizado(metadata.tipo) ||
      contemEternizado(metadata.categoria) ||
      contemEternizado(metadata.produto) ||
      contemEternizado(metadata.titulo) ||
      contemEternizado(metadata.ingresso_modelo_id) ||
      contemEternizado(metadata.ingressoModeloId) ||
      Boolean(metadata.nome_ingresso_eternizado) ||
      Boolean(metadata.nomeIngressoEternizado))
  );
}

function obterQuantidade(pedido: PedidoMetaIngresso) {
  const metadata = pedido.metadata || {};

  const quantidade =
    numeroSeguro(pedido.quantidade) ||
    numeroSeguro(metadata.quantidade_total) ||
    numeroSeguro(metadata.quantidade) ||
    numeroSeguro(metadata.ingressos) ||
    0;

  return Math.max(0, Math.floor(quantidade));
}

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("pedidos")
      .select("tipo, categoria, quantidade, metadata")
      .eq("status", "pago");

    if (error) {
      return NextResponse.json(
        {
          error: "Erro ao buscar meta de ingressos.",
          detalhe: error.message,
        },
        { status: 500 },
      );
    }

    const pedidos = (data || []) as PedidoMetaIngresso[];

    let ingressosVendidosBruto = 0;
    let ingressosComunsVendidosBruto = 0;
    let ingressosEternizadosVendidosBruto = 0;

    for (const pedido of pedidos) {
      if (!ehPedidoDeIngresso(pedido)) {
        continue;
      }

      const quantidade = obterQuantidade(pedido);

      if (quantidade <= 0) {
        continue;
      }

      ingressosVendidosBruto += quantidade;

      if (ehIngressoEternizado(pedido)) {
        ingressosEternizadosVendidosBruto += quantidade;
      } else {
        ingressosComunsVendidosBruto += quantidade;
      }
    }

    const ingressosComunsContabilizados = Math.min(
      ingressosComunsVendidosBruto,
      META_INGRESSOS_COMUNS,
    );

    const ingressosEternizadosContabilizados = Math.min(
      ingressosEternizadosVendidosBruto,
      LIMITE_INGRESSOS_ETERNIZADOS,
    );

    const vendidos =
      ingressosComunsContabilizados + ingressosEternizadosContabilizados;

    const restante = Math.max(META_INGRESSOS - vendidos, 0);

    const percentual = Math.min((vendidos / META_INGRESSOS) * 100, 100);

    const ingressosComunsExcedentes = Math.max(
      ingressosComunsVendidosBruto - META_INGRESSOS_COMUNS,
      0,
    );

    const ingressosEternizadosExcedentes = Math.max(
      ingressosEternizadosVendidosBruto - LIMITE_INGRESSOS_ETERNIZADOS,
      0,
    );

    const excedentes = Math.max(ingressosVendidosBruto - META_INGRESSOS, 0);

    const kgAlimentos =
      ingressosComunsContabilizados + ingressosEternizadosContabilizados * 3;

    return NextResponse.json({
      meta: META_INGRESSOS,
      vendidos,
      vendidos_bruto: ingressosVendidosBruto,
      restante,
      percentual: Number(percentual.toFixed(2)),
      kgAlimentos,

      comuns: {
        meta: META_INGRESSOS_COMUNS,
        vendidos: ingressosComunsContabilizados,
        vendidos_bruto: ingressosComunsVendidosBruto,
        restante: Math.max(
          META_INGRESSOS_COMUNS - ingressosComunsContabilizados,
          0,
        ),
        percentual: Number(
          Math.min(
            (ingressosComunsContabilizados / META_INGRESSOS_COMUNS) * 100,
            100,
          ).toFixed(2),
        ),
        excedentes: ingressosComunsExcedentes,
      },

      eternizados: {
        meta: LIMITE_INGRESSOS_ETERNIZADOS,
        vendidos: ingressosEternizadosContabilizados,
        vendidos_bruto: ingressosEternizadosVendidosBruto,
        restante: Math.max(
          LIMITE_INGRESSOS_ETERNIZADOS - ingressosEternizadosContabilizados,
          0,
        ),
        percentual: Number(
          Math.min(
            (ingressosEternizadosContabilizados /
              LIMITE_INGRESSOS_ETERNIZADOS) *
              100,
            100,
          ).toFixed(2),
        ),
        excedentes: ingressosEternizadosExcedentes,
      },

      excedentes,

      regra: {
        total: "Meta geral de 100.000 ingressos.",
        comuns: "Até 98.000 ingressos comuns entram na meta geral.",
        eternizados:
          "Até 2.000 ingressos eternizados entram na meta geral.",
        alimentos:
          "Ingresso comum representa 1 kg de alimento. Ingresso eternizado representa 3 kg de alimento.",
      },
    });
  } catch (error) {
    console.error("ERRO GERAL NA META DE INGRESSOS:", error);

    return NextResponse.json(
      {
        error: "Erro interno ao calcular meta de ingressos.",
      },
      { status: 500 },
    );
  }
}
