import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const FRETE_LOCAL_SERGIPE = 20;

function limparCep(cep: string) {
  return cep.replace(/\D/g, "");
}

function formatarMoeda(valor: number) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);

    const cep = limparCep(String(body?.cep || ""));

    if (cep.length !== 8) {
      return NextResponse.json(
        {
          error: "CEP inválido.",
        },
        { status: 400 }
      );
    }

    if (cep.startsWith("49")) {
      return NextResponse.json({
        titulo: "Entrega local / Sergipe",
        valorTexto: formatarMoeda(FRETE_LOCAL_SERGIPE),
        valorNumero: FRETE_LOCAL_SERGIPE,
        prazo: "até 5 dias úteis após a produção",
        podePagarOnline: true,
      });
    }

    return NextResponse.json({
      titulo: "Envio pelos Correios",
      valorTexto: "A calcular",
      valorNumero: null,
      prazo: "prazo conforme Correios",
      podePagarOnline: false,
      mensagem:
        "Para entregas fora de Sergipe, o frete precisa ser confirmado pelo WhatsApp.",
    });
  } catch (error) {
    console.error("ERRO AO CALCULAR FRETE:", error);

    return NextResponse.json(
      {
        error: "Erro ao calcular frete.",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    rota: "/api/correios/frete",
  });
}
