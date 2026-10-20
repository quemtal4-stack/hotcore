import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const META_INGRESSOS = 104000;

const TIPOS_INGRESSO = ["ingresso", "ingresso_evento", "ingresso_fixo"];

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("pedidos")
      .select("quantidade")
      .eq("status", "pago")
      .in("tipo", TIPOS_INGRESSO);

    if (error) {
      console.error("ERRO AO BUSCAR CONTADOR DE INGRESSOS:", error);

      return NextResponse.json(
        {
          error: "Erro ao buscar contador de ingressos.",
          detalhe: error.message,
        },
        { status: 500 },
      );
    }

    const vendidos = (data || []).reduce((total, pedido) => {
      return total + Number(pedido.quantidade || 0);
    }, 0);

    const restantes = Math.max(META_INGRESSOS - vendidos, 0);
    const kgAlimentos = vendidos;
    const percentual = Math.min((vendidos / META_INGRESSOS) * 100, 100);

    return NextResponse.json({
      meta: META_INGRESSOS,
      vendidos,
      restantes,
      kg_alimentos: kgAlimentos,
      percentual: Number(percentual.toFixed(2)),
    });
  } catch (error) {
    console.error("ERRO GERAL NO CONTADOR DE INGRESSOS:", error);

    return NextResponse.json(
      {
        error: "Erro interno ao calcular contador.",
      },
      { status: 500 },
    );
  }
}
