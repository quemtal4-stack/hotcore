import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST() {
  try {
    const { data, error } = await supabaseAdmin
      .from("pessoas")
      .select("*")
      .limit(10);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erro interno desconhecido.";

    return NextResponse.json(
      { error: message },
      { status: 500 },
    );
  }
}
