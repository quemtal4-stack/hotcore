import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const META_INGRESSOS = 100000;
const META_INGRESSOS_COMUNS = 98000;
const LIMITE_INGRESSOS_ETERNIZADOS = 2000;
const META_ALIMENTOS_KG = 104000;
const META_EVENTO_ATUAL = 23000;

const TIPOS_INGRESSO = ["ingresso", "ingresso_evento", "ingresso_fixo"];

type PedidoMeta = {
  tipo?: string | null;
  categoria?: string | null;
  plano?: string | null;
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

function contemEternizado(valor: unknown) {
  return normalizarTexto(valor).includes("eternizado");
}

function contemKit(valor: unknown) {
  const texto = normalizarTexto(valor);
  return texto.includes("kit") || texto.includes("combo");
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

function contemRacao(valor: unknown) {
  const texto = normalizarTexto(valor);
  return (
    texto.includes("racao") ||
    texto.includes("pet") ||
    texto.includes("animal")
  );
}

function ehPedidoDeIngresso(pedido: PedidoMeta) {
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

function ehIngressoEternizado(pedido: PedidoMeta) {
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

function ehPedidoDeKit(pedido: PedidoMeta) {
  const metadata = pedido.metadata || {};
  return (
    Boolean(metadata.kit_id) ||
    Boolean(metadata.kitId) ||
    contemKit(pedido.tipo) ||
    contemKit(pedido.categoria) ||
    contemKit(metadata.tipo) ||
    contemKit(metadata.categoria) ||
    contemKit(metadata.produto) ||
    contemKit(metadata.titulo)
  );
}

function ehPedidoDeRacao(pedido: PedidoMeta) {
  const metadata = pedido.metadata || {};
  return (
    contemRacao(pedido.tipo) ||
    contemRacao(pedido.categoria) ||
    contemRacao(metadata.tipo) ||
    contemRacao(metadata.categoria) ||
    contemRacao(metadata.produto) ||
    contemRacao(metadata.titulo) ||
    contemRacao(metadata.kit_id) ||
    contemRacao(metadata.kitId)
  );
}

function obterQuantidade(pedido: PedidoMeta) {
  const metadata = pedido.metadata || {};
  const quantidade =
    numeroSeguro(pedido.quantidade) ||
    numeroSeguro(metadata.quantidade_total) ||
    numeroSeguro(metadata.quantidade) ||
    numeroSeguro(metadata.ingressos) ||
    0;
  return Math.max(0, Math.floor(quantidade));
}

function obterIngressosSimbolicosInformados(pedido: PedidoMeta) {
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
  const metadata = pedido.metadata || {};
  return Math.max(
    0,
    numeroSeguro(metadata.kg_alimentos) ||
      numeroSeguro(metadata.kgAlimentos) ||
      numeroSeguro(metadata.alimentos_kg) ||
      numeroSeguro(metadata.alimentosKg) ||
      0,
  );
}

function obterKgRacaoOuTotalInformado(pedido: PedidoMeta) {
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

function calcularKgMembro(pedido: PedidoMeta) {
  const metadata = pedido.metadata || {};
  const tipo = normalizarTexto(pedido.tipo || metadata.tipo);

  if (tipo !== "clube_membro") return 0;

  const plano = normalizarTexto(
    pedido.plano ||
      metadata.plano ||
      metadata.nome ||
      metadata.produto ||
      metadata.titulo,
  );

  if (
    plano === "apoiador" ||
    plano === "lendario" ||
    plano === "lenda" ||
    plano === "fundador" ||
    plano === "colecionador"
  ) {
    return 1;
  }

  if (plano === "guardiao") return 3;
  if (plano === "eternizados" || plano === "eternizado") return 14;

  return 1;
}

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("pedidos")
      .select("tipo, categoria, plano, quantidade, metadata")
      .eq("status", "pago");

    if (error) {
      console.error("ERRO AO BUSCAR PEDIDOS PARA META DE IMPACTO:", error);
      return NextResponse.json(
        {
          error: "Erro ao buscar dados da meta de impacto.",
          detalhe: error.message,
          hint: error.hint,
          code: error.code,
        },
        { status: 500 },
      );
    }

    const pedidos = (data || []) as PedidoMeta[];

    let ingressosVendidosBruto = 0;
    let ingressosComunsVendidosBruto = 0;
    let ingressosEternizadosVendidosBruto = 0;

    let kgPorKits = 0;
    let kgPorMembros = 0;
    let kgOutros = 0;
    let pedidosRacaoIgnorados = 0;
    let kgRacaoIgnoradoNesteTermometro = 0;

    for (const pedido of pedidos) {
      const quantidade = obterQuantidade(pedido);
      const kgInformado = obterKgAlimentosInformado(pedido);

      if (ehPedidoDeRacao(pedido)) {
        pedidosRacaoIgnorados += 1;
        kgRacaoIgnoradoNesteTermometro +=
          obterKgRacaoOuTotalInformado(pedido) || quantidade;
        continue;
      }

      if (ehPedidoDeIngresso(pedido)) {
        const eternizado = ehIngressoEternizado(pedido);
        ingressosVendidosBruto += quantidade;

        if (eternizado) {
          ingressosEternizadosVendidosBruto += quantidade;
        } else {
          ingressosComunsVendidosBruto += quantidade;
        }

        continue;
      }

      const ingressosSimbolicos = obterIngressosSimbolicosInformados(pedido);

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

      if (ehPedidoDeKit(pedido)) {
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

    const kgPorIngressosContabilizados =
      ingressosComunsContabilizados + ingressosEternizadosContabilizados * 3;

    const kgAlimentos =
      kgPorIngressosContabilizados + kgPorKits + kgPorMembros + kgOutros;

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
        evento_atual: META_EVENTO_ATUAL,
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
        ingressos_kg: kgPorIngressosContabilizados,
        kits_kg: kgPorKits,
        membros_kg: kgPorMembros,
        outros_kg: kgOutros,
        pedidos_racao_ignorados: pedidosRacaoIgnorados,
        kg_racao_ignorado_neste_termometro: kgRacaoIgnoradoNesteTermometro,
      },

      regra: {
        ingressos_comuns:
          "98.000 ingressos comuns x 1 kg = 98 toneladas de alimentos",
        ingressos_eternizados:
          "2.000 ingressos eternizados x 3 kg = 6 toneladas de alimentos",
        limite_eternizados:
          "Máximo de 2.000 ingressos eternizados na meta geral",
        ciclo_evento:
          "O evento atual pode ter controle próprio de 23.000 ingressos, mas o termômetro geral continua acumulando até 100.000 ingressos.",
        ingressos_simbolicos:
          "Ingressos simbólicos só somam no termômetro de alimentos quando o pedido não for de ração.",
        kits_alimentacao:
          "Somente kits de alimentação somam no termômetro de alimentos.",
        kits_racao:
          "Kits de ração nunca somam no termômetro de alimentos. Eles devem aparecer somente no termômetro exclusivo de ração.",
        clube_apoiador:
          "Apoiador: R$ 19,90 por mês = 1 kg de alimento por pagamento aprovado",
        clube_lendario:
          "Lendário: R$ 29,90 por mês = 1 kg de alimento por pagamento aprovado",
        clube_fundador:
          "Fundador: R$ 39,90 por mês = 1 kg de alimento por pagamento aprovado",
        clube_colecionador:
          "Colecionador: R$ 59,90 por mês = 1 kg de alimento por pagamento aprovado",
        clube_guardiao:
          "Guardião: R$ 89,90 por mês = 3 kg de alimento por pagamento aprovado",
        clube_eternizados:
          "Eternizados: R$ 497,00 por ano = 14 kg de alimentos ou uma cesta básica por pagamento aprovado",
        meta_total:
          "100.000 ingressos no total: 98.000 comuns + 2.000 eternizados = 104 toneladas de alimentos, separadas da meta de 50 toneladas de ração.",
      },
    });
  } catch (error) {
    console.error("ERRO GERAL NA META DE IMPACTO:", error);
    return NextResponse.json(
      {
        error: "Erro interno ao calcular meta de impacto.",
        detalhe: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
