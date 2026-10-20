// src/app/api/criar-pedido/route.ts

import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

type CriarPedidoBody = {
  nome: string;
  email: string;
  whatsapp?: string;
  produto?: string;
  categoria?: string;
  tamanho?: string;
  quantidade?: number;
  valor_unitario?: number;
  valor_frete?: number;
  forma_entrega?: string;
  endereco_entrega?: Record<string, unknown> | null;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CriarPedidoBody;

    const {
      nome,
      email,
      whatsapp,
      produto,
      categoria,
      tamanho,
      quantidade = 1,
      valor_unitario = 0,
      valor_frete = 0,
      forma_entrega = "retirada",
      endereco_entrega = null,
    } = body;

    if (!nome || !email) {
      return NextResponse.json(
        { error: "Nome e email são obrigatórios." },
        { status: 400 }
      );
    }

    const totalProdutos = Number(quantidade) * Number(valor_unitario);
    const totalPedido = totalProdutos + Number(valor_frete || 0);

    const externalReference = crypto.randomUUID();

    const { data: pessoaExistente, error: erroBuscarPessoa } =
      await supabaseAdmin
        .from("pessoas")
        .select("*")
        .eq("email", email)
        .maybeSingle();

    if (erroBuscarPessoa) {
      return NextResponse.json(
        { error: erroBuscarPessoa.message },
        { status: 400 }
      );
    }

    let pessoa = pessoaExistente;

    if (!pessoaExistente) {
      const { data: novaPessoa, error: erroPessoa } = await supabaseAdmin
        .from("pessoas")
        .insert({
          nome,
          email,
          whatsapp,
          origem: "site",
        })
        .select()
        .single();

      if (erroPessoa) {
        return NextResponse.json(
          { error: erroPessoa.message },
          { status: 400 }
        );
      }

      pessoa = novaPessoa;
    }

    if (!pessoa?.id) {
      return NextResponse.json(
        { error: "Não foi possível identificar a pessoa do pedido." },
        { status: 400 }
      );
    }

    const { data: pedido, error: erroPedido } = await supabaseAdmin
      .from("pedidos")
      .insert({
        pessoa_id: pessoa.id,
        external_reference: externalReference,
        status: "aguardando_pagamento",
        tipo: "produto",
        produto,
        categoria,
        tamanho,
        nome_comprador: nome,
        email_comprador: email,
        whatsapp,
        quantidade,
        valor_unitario,
        valor_frete: valor_frete || 0,
        total_produtos: totalProdutos,
        total_pedido: totalPedido,
        forma_entrega,
        endereco_entrega,
      })
      .select()
      .single();

    if (erroPedido) {
      return NextResponse.json(
        { error: erroPedido.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      pessoa,
      pedido,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erro interno no servidor.";

    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
