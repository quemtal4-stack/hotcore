import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const META_INGRESSOS = 102000;
const META_INGRESSOS_COMUNS = 100000;
const LIMITE_INGRESSOS_ETERNIZADOS = 2000;
const META_ALIMENTOS_KG = 106000;

type PedidoMeta = {
  status?: string | null;
  tipo?: string | null;
  categoria?: string | null;
  produto?: string | null;
  plano?: string | null;
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

function contem(valor: unknown, termos: string[]) {
  const texto = normalizarTexto(valor);

  return termos.some((termo) => texto.includes(normalizarTexto(termo)));
}

function ehStatusPago(status: unknown) {
  const texto = normalizarTexto(status);

  return (
    texto === "pago" ||
    texto === "approved" ||
    texto === "aprovado" ||
    texto === "accredited"
  );
}

function ehPedidoDeRacao(pedido: PedidoMeta) {
  const metadata = pedido.metadata || {};

  return (
    contem(pedido.tipo, ["racao", "ração", "pet", "animal"]) ||
    contem(pedido.categoria, ["racao", "ração", "pet", "animal"]) ||
    contem(pedido.produto, ["racao", "ração", "pet", "animal"]) ||
    contem(metadata.tipo, ["racao", "ração", "pet", "animal"]) ||
    contem(metadata.categoria, ["racao", "ração", "pet", "animal"]) ||
    contem(metadata.produto, ["racao", "ração", "pet", "animal"]) ||
    contem(metadata.titulo, ["racao", "ração", "pet", "animal"]) ||
    numeroSeguro(metadata.kg_racao) > 0 ||
    numeroSeguro(metadata.kgRacao) > 0 ||
    numeroSeguro(metadata.racao_kg) > 0 ||
    numeroSeguro(metadata.racaoKg) > 0
  );
}

function ehPedidoDeIngresso(pedido: PedidoMeta) {
  const metadata = pedido.metadata || {};

  return (
    contem(pedido.tipo, [
      "ingresso",
      "ingresso_evento",
      "ingresso-evento",
      "ingresso_fixo",
      "ingresso-fixo",
      "ingresso_historico",
      "ingresso-historico",
      "city quest",
      "hemose",
      "gastronomia que salva vidas",
    ]) ||
    contem(pedido.categoria, [
      "ingresso",
      "ingresso_evento",
      "ingresso-evento",
      "ingresso_fixo",
      "ingresso-fixo",
      "ingresso_historico",
      "ingresso-historico",
      "city quest",
      "hemose",
      "gastronomia que salva vidas",
    ]) ||
    contem(pedido.produto, [
      "ingresso",
      "city quest",
      "hemose",
      "gastronomia que salva vidas",
      "eternizado",
      "eternizados",
    ]) ||
    contem(metadata.tipo, [
      "ingresso",
      "ingresso_evento",
      "ingresso-evento",
      "ingresso_fixo",
      "ingresso-fixo",
      "ingresso_historico",
      "ingresso-historico",
    ]) ||
    contem(metadata.categoria, [
      "ingresso",
      "ingresso_evento",
      "ingresso-evento",
      "ingresso_fixo",
      "ingresso-fixo",
      "ingresso_historico",
      "ingresso-historico",
    ]) ||
    contem(metadata.produto, [
      "ingresso",
      "city quest",
      "hemose",
      "gastronomia que salva vidas",
      "eternizado",
      "eternizados",
    ]) ||
    contem(metadata.titulo, [
      "ingresso",
      "city quest",
      "hemose",
      "gastronomia que salva vidas",
      "eternizado",
      "eternizados",
    ]) ||
    contem(metadata.evento_id, [
      "city quest",
      "hemose",
      "gastronomia",
      "ingresso",
    ]) ||
    contem(metadata.eventoId, [
      "city quest",
      "hemose",
      "gastronomia",
      "ingresso",
    ]) ||
    contem(metadata.ingresso_modelo_id, [
      "ingresso",
      "eternizado",
      "eternizados",
    ]) ||
    contem(metadata.ingressoModeloId, [
      "ingresso",
      "eternizado",
      "eternizados",
    ])
  );
}

function ehIngressoEternizado(pedido: PedidoMeta) {
  const metadata = pedido.metadata || {};

  return (
    ehPedidoDeIngresso(pedido) &&
    (contem(pedido.tipo, ["eternizado", "eternizados"]) ||
      contem(pedido.categoria, ["eternizado", "eternizados"]) ||
      contem(pedido.produto, ["eternizado", "eternizados"]) ||
      contem(metadata.tipo, ["eternizado", "eternizados"]) ||
      contem(metadata.categoria, ["eternizado", "eternizados"]) ||
      contem(metadata.produto, ["eternizado", "eternizados"]) ||
      contem(metadata.titulo, ["eternizado", "eternizados"]) ||
      contem(metadata.ingresso_modelo_id, ["eternizado", "eternizados"]) ||
      contem(metadata.ingressoModeloId, ["eternizado", "eternizados"]) ||
      Boolean(metadata.nome_ingresso_eternizado) ||
      Boolean(metadata.nomeIngressoEternizado))
  );
}

function ehPedidoDeKitAlimentacao(pedido: PedidoMeta) {
  if (ehPedidoDeRacao(pedido)) {
    return false;
  }

  const metadata = pedido.metadata || {};

  const temKit =
    contem(pedido.tipo, ["kit", "combo"]) ||
    contem(pedido.categoria, ["kit", "combo"]) ||
    contem(pedido.produto, ["kit", "combo"]) ||
    contem(metadata.tipo, ["kit", "combo"]) ||
    contem(metadata.categoria, ["kit", "combo"]) ||
    contem(metadata.produto, ["kit", "combo"]) ||
    contem(metadata.titulo, ["kit", "combo"]);

  const temAlimento =
    contem(pedido.tipo, ["alimento", "alimentacao", "alimentação", "cesta"]) ||
    contem(pedido.categoria, [
      "alimento",
      "alimentacao",
      "alimentação",
      "cesta",
    ]) ||
    contem(pedido.produto, [
      "alimento",
      "alimentacao",
      "alimentação",
      "cesta",
    ]) ||
    contem(metadata.tipo, [
      "alimento",
      "alimentacao",
      "alimentação",
      "cesta",
    ]) ||
    contem(metadata.categoria, [
      "alimento",
      "alimentacao",
      "alimentação",
      "cesta",
    ]) ||
    contem(metadata.produto, [
      "alimento",
      "alimentacao",
      "alimentação",
      "cesta",
    ]) ||
    contem(metadata.titulo, [
      "alimento",
      "alimentacao",
      "alimentação",
      "cesta",
    ]);

  return temKit && temAlimento;
}

function obterQuantidade(pedido: PedidoMeta) {
  const metadata = pedido.metadata || {};

  const quantidade =
    numeroSeguro(pedido.quantidade) ||
    numeroSeguro(metadata.quantidade_total_compra) ||
    numeroSeguro(metadata.quantidadeTotalCompra) ||
    numeroSeguro(metadata.quantidade_total) ||
    numeroSeguro(metadata.quantidadeTotal) ||
    numeroSeguro(metadata.quantidade) ||
    numeroSeguro(metadata.ingressos) ||
    0;

  return Math.max(0, Math.floor(quantidade));
}

function obterQuantidadeIngressosComuns(pedido: PedidoMeta) {
  const metadata = pedido.metadata || {};

  const quantidade =
    numeroSeguro(metadata.ingressos) ||
    numeroSeguro(metadata.quantidade_ingressos) ||
    numeroSeguro(metadata.quantidadeIngressos) ||
    numeroSeguro(metadata.quantidade_total) ||
    numeroSeguro(metadata.quantidadeTotal) ||
    numeroSeguro(pedido.quantidade) ||
    0;

  return Math.max(0, Math.floor(quantidade));
}

function obterIngressosSimbolicos(pedido: PedidoMeta) {
  const metadata = pedido.metadata || {};

  const ingressos =
    numeroSeguro(metadata.ingressos_simbolicos) ||
    numeroSeguro(metadata.ingressosSimbolicos) ||
    numeroSeguro(metadata.ingressos_equivalentes) ||
    numeroSeguro(metadata.ingressosEquivalentes) ||
    0;

  return Math.max(0, Math.floor(ingressos));
}

function obterKgAlimentosInformado(pedido: PedidoMeta) {
  if (ehPedidoDeRacao(pedido)) {
    return 0;
  }

  const metadata = pedido.metadata || {};

  return Math.max(
    0,
    numeroSeguro(metadata.kg_alimentos) ||
      numeroSeguro(metadata.kgAlimentos) ||
      numeroSeguro(metadata.alimentos_kg) ||
      numeroSeguro(metadata.alimentosKg) ||
      numeroSeguro(metadata.kg) ||
      0,
  );
}

function calcularKgMembro(pedido: PedidoMeta) {
  if (ehPedidoDeRacao(pedido)) {
    return 0;
  }

  const metadata = pedido.metadata || {};
  const tipo = normalizarTexto(pedido.tipo || metadata.tipo);

  if (tipo !== "clube_membro" && tipo !== "clube-membro") {
    return 0;
  }

  const plano = normalizarTexto(
    pedido.plano ||
      metadata.plano ||
      metadata.produto ||
      metadata.titulo ||
      metadata.nome,
  );

  if (plano.includes("guardiao")) {
    return 3;
  }

  if (plano.includes("eternizado")) {
    return 14;
  }

  return 1;
}

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("pedidos")
      .select("status, tipo, categoria, produto, plano, quantidade, metadata")
      .in("status", ["pago", "approved", "aprovado", "accredited"]);

    if (error) {
      console.error("ERRO AO BUSCAR PEDIDOS PARA META DE IMPACTO:", error);

      return NextResponse.json(
        {
          error: "Erro ao buscar dados da meta de impacto.",
          detalhe: error.message,
        },
        { status: 500 },
      );
    }

    const pedidos = ((data || []) as PedidoMeta[]).filter((pedido) =>
      ehStatusPago(pedido.status),
    );

    let ingressosVendidosBruto = 0;
    let ingressosComunsVendidosBruto = 0;
    let ingressosEternizadosVendidosBruto = 0;

    let kgPorKits = 0;
    let kgPorMembros = 0;
    let kgOutros = 0;

    for (const pedido of pedidos) {
      if (ehPedidoDeRacao(pedido)) {
        continue;
      }

      const quantidade = obterQuantidade(pedido);
      const kgInformado = obterKgAlimentosInformado(pedido);

      if (ehPedidoDeIngresso(pedido)) {
        const eternizado = ehIngressoEternizado(pedido);

        if (eternizado) {
          const qtdEternizados = quantidade || 1;
          const kgFinal = kgInformado || qtdEternizados * 3;

          ingressosVendidosBruto += qtdEternizados;
          ingressosEternizadosVendidosBruto += qtdEternizados;
          kgOutros += Math.max(kgFinal, qtdEternizados * 3);

          continue;
        }

        const qtdComuns = obterQuantidadeIngressosComuns(pedido) || quantidade;
        const kgFinal = kgInformado || qtdComuns;

        ingressosVendidosBruto += qtdComuns;
        ingressosComunsVendidosBruto += qtdComuns;
        kgOutros += Math.max(kgFinal, qtdComuns);

        continue;
      }

      const ingressosSimbolicos = obterIngressosSimbolicos(pedido);

      if (ingressosSimbolicos > 0) {
        ingressosVendidosBruto += ingressosSimbolicos;
        ingressosComunsVendidosBruto += ingressosSimbolicos;
        kgOutros += Math.max(kgInformado, ingressosSimbolicos);
        continue;
      }

      const kgMembro = calcularKgMembro(pedido);

      if (kgMembro > 0) {
        kgPorMembros += Math.max(kgMembro, kgInformado);
        continue;
      }

      if (ehPedidoDeKitAlimentacao(pedido)) {
        kgPorKits += kgInformado || quantidade;
        continue;
      }

      if (kgInformado > 0) {
        kgOutros += kgInformado;
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

    const ingressosVendidosContabilizados =
      ingressosComunsContabilizados + ingressosEternizadosContabilizados;

    const ingressosComunsExcedentes = Math.max(
      ingressosComunsVendidosBruto - META_INGRESSOS_COMUNS,
      0,
    );

    const ingressosEternizadosExcedentes = Math.max(
      ingressosEternizadosVendidosBruto - LIMITE_INGRESSOS_ETERNIZADOS,
      0,
    );

    const ingressosExcedentes = Math.max(
      ingressosVendidosBruto - META_INGRESSOS,
      0,
    );

    const kgPorIngressos =
      ingressosComunsContabilizados + ingressosEternizadosContabilizados * 3;

    const kgAlimentos = kgPorIngressos + kgPorKits + kgPorMembros + kgOutros;
    const toneladasAlimentos = kgAlimentos / 1000;

    const percentualIngressos = Math.min(
      (ingressosVendidosContabilizados / META_INGRESSOS) * 100,
      100,
    );

    const percentualAlimentos = Math.min(
      (kgAlimentos / META_ALIMENTOS_KG) * 100,
      100,
    );

    return NextResponse.json({
      meta: {
        ingressos: META_INGRESSOS,
        ingressos_comuns: META_INGRESSOS_COMUNS,
        ingressos_eternizados: LIMITE_INGRESSOS_ETERNIZADOS,
        alimentos_kg: META_ALIMENTOS_KG,
        alimentos_toneladas: META_ALIMENTOS_KG / 1000,
      },

      ingressos: {
        vendidos: ingressosVendidosContabilizados,
        vendidos_bruto: ingressosVendidosBruto,
        comuns: ingressosComunsContabilizados,
        comuns_bruto: ingressosComunsVendidosBruto,
        eternizados: ingressosEternizadosContabilizados,
        eternizados_bruto: ingressosEternizadosVendidosBruto,
        restantes: Math.max(
          META_INGRESSOS - ingressosVendidosContabilizados,
          0,
        ),
        percentual: Number(percentualIngressos.toFixed(2)),
        excedentes: ingressosExcedentes,
      },

      comuns: {
        vendidos: ingressosComunsContabilizados,
        vendidos_bruto: ingressosComunsVendidosBruto,
        limite: META_INGRESSOS_COMUNS,
        restantes: Math.max(
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
        vendidos: ingressosEternizadosContabilizados,
        vendidos_bruto: ingressosEternizadosVendidosBruto,
        limite: LIMITE_INGRESSOS_ETERNIZADOS,
        restantes: Math.max(
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

      alimentos: {
        kg: kgAlimentos,
        toneladas: Number(toneladasAlimentos.toFixed(3)),
        restantes_kg: Math.max(META_ALIMENTOS_KG - kgAlimentos, 0),
        restantes_toneladas: Number(
          (Math.max(META_ALIMENTOS_KG - kgAlimentos, 0) / 1000).toFixed(3),
        ),
        percentual: Number(percentualAlimentos.toFixed(2)),
      },

      fontes: {
        ingressos_kg: kgPorIngressos,
        kits_kg: kgPorKits,
        membros_kg: kgPorMembros,
        outros_kg: kgOutros,
      },

      regra: {
        ingressos_comuns:
          "Cada ingresso comum pago conta 1 ingresso e 1 kg de alimento.",
        ingressos_eternizados:
          "Cada ingresso Eternizados pago conta 1 ingresso e 3 kg de alimento.",
        ingressos_historicos:
          "Ingressos históricos da Loja Solidária contam quando o pedido estiver com status pago.",
        nao_membro:
          "O valor de R$ 85,00 para não membro não altera a regra do termômetro; o que conta é quantidade e kg_alimentos.",
        kits_alimentacao:
          "Kits de alimentação contam somente em alimentos, não em ingressos.",
        kits_racao:
          "Kits de ração não entram neste termômetro; entram apenas no termômetro de ração.",
      },
    });
  } catch (error) {
    console.error("ERRO GERAL NA META DE IMPACTO:", error);

    return NextResponse.json(
      {
        error: "Erro interno ao calcular meta de impacto.",
      },
      { status: 500 },
    );
  }
}
