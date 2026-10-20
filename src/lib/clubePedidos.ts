import { supabase } from "./supabaseClient";

export type IngressoSelecionado = {
  numero: number;
  quantidade: number;
};

export type CriarPedidoClubeParams = {
  cpf: string;
  nome: string;
  email: string;
  ingressos: IngressoSelecionado[];
  incluirEspecial?: boolean;
};

export async function criarPedidoClube({
  cpf,
  nome,
  email,
  ingressos,
  incluirEspecial = false,
}: CriarPedidoClubeParams) {
  const cpfLimpo = cpf.replace(/\D/g, "");
  const nomeLimpo = nome.trim();
  const emailLimpo = email.trim().toLowerCase();

  const ingressosNormalizados = ingressos
    .filter((item) => Number(item.quantidade) > 0)
    .map((item) => ({
      numero: Number(item.numero),
      quantidade: Number(item.quantidade),
    }));

  if (!cpfLimpo) {
    throw new Error("CPF é obrigatório.");
  }

  if (!nomeLimpo) {
    throw new Error("Nome é obrigatório.");
  }

  if (!emailLimpo) {
    throw new Error("E-mail é obrigatório.");
  }

  if (ingressosNormalizados.length === 0 && !incluirEspecial) {
    throw new Error("Selecione pelo menos um ingresso.");
  }

  const { data, error } = await supabase.rpc("criar_pedido_clube" as never, {
    p_cpf: cpfLimpo,
    p_nome: nomeLimpo,
    p_email: emailLimpo,
    p_ingressos: ingressosNormalizados,
    p_incluir_especial: incluirEspecial,
  } as never);

  if (error) {
    throw new Error(error.message || "Erro ao criar pedido do clube.");
  }

  return data;
}
