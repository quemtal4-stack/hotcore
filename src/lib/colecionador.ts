import { supabaseAdmin } from "@/lib/supabase-admin";

export const ANO_COLECAO = 2028;

export type StatusIngressoColecionador = "pendente" | "aprovado" | "cancelado";

export type CriarPastaColecionadorParams = {
  cpf: string;
  nome?: string;
  email?: string;
  telefone?: string;
  tipo?: string;
  ingressos?: number;
  sextoIngresso?: boolean;
  quantidadeTotal?: number;
  externalReference?: string;
  status?: StatusIngressoColecionador;
  valor?: number;
};

export function limparNumero(valor: string) {
  return String(valor || "").replace(/\D/g, "");
}

export const ingressosColecaoBase = [
  {
    id: "ingresso-01",
    titulo: `Ingresso 01 ${ANO_COLECAO}`,
    descricao: `Primeiro ingresso da Coleção Especial ${ANO_COLECAO}.`,
    imagem: `/ingressos/${ANO_COLECAO}/ingresso-01-${ANO_COLECAO}.png`,
    tag: `Coleção ${ANO_COLECAO}`,
    especial: false,
  },
  {
    id: "ingresso-02",
    titulo: `Ingresso 02 ${ANO_COLECAO}`,
    descricao: `Segundo ingresso da Coleção Especial ${ANO_COLECAO}.`,
    imagem: `/ingressos/${ANO_COLECAO}/ingresso-02-${ANO_COLECAO}.png`,
    tag: `Coleção ${ANO_COLECAO}`,
    especial: false,
  },
  {
    id: "ingresso-03",
    titulo: `Ingresso 03 ${ANO_COLECAO}`,
    descricao: `Terceiro ingresso da Coleção Especial ${ANO_COLECAO}.`,
    imagem: `/ingressos/${ANO_COLECAO}/ingresso-03-${ANO_COLECAO}.png`,
    tag: `Coleção ${ANO_COLECAO}`,
    especial: false,
  },
  {
    id: "ingresso-04",
    titulo: `Ingresso 04 ${ANO_COLECAO}`,
    descricao: `Quarto ingresso da Coleção Especial ${ANO_COLECAO}.`,
    imagem: `/ingressos/${ANO_COLECAO}/ingresso-04-${ANO_COLECAO}.png`,
    tag: `Coleção ${ANO_COLECAO}`,
    especial: false,
  },
  {
    id: "ingresso-05",
    titulo: `Ingresso 05 ${ANO_COLECAO}`,
    descricao: `Quinto ingresso da Coleção Especial ${ANO_COLECAO}.`,
    imagem: `/ingressos/${ANO_COLECAO}/ingresso-05-${ANO_COLECAO}.png`,
    tag: `Coleção ${ANO_COLECAO}`,
    especial: false,
  },
  {
    id: "ingresso-06",
    titulo: `Ingresso 06 ${ANO_COLECAO}`,
    descricao: `Sexto ingresso da Coleção Especial ${ANO_COLECAO}.`,
    imagem: `/ingressos/${ANO_COLECAO}/ingresso-06-${ANO_COLECAO}.png`,
    tag: `Coleção ${ANO_COLECAO}`,
    especial: false,
  },
  {
    id: "ingresso-eternizados",
    titulo: `Eternizados ${ANO_COLECAO}`,
    descricao:
      "Ingresso especial para quem desbloqueia a peça mais exclusiva da coleção.",
    imagem: `/ingressos/${ANO_COLECAO}/ingresso-eternizados-${ANO_COLECAO}.png`,
    tag: `Ingresso oficial ${ANO_COLECAO}`,
    especial: true,
  },
];

function selecionarIngressosDaCompra(
  quantidadeIngressos: number,
  sextoIngresso: boolean
) {
  const quantidadeSegura = Math.min(
    Math.max(Math.floor(Number(quantidadeIngressos) || 1), 1),
    5
  );

  const selecionados = ingressosColecaoBase.slice(0, quantidadeSegura);

  if (sextoIngresso) {
    const eternizado = ingressosColecaoBase.find(
      (ingresso) => ingresso.id === "ingresso-eternizados"
    );

    if (eternizado) {
      selecionados.push(eternizado);
    }
  }

  return selecionados;
}

export async function criarOuAtualizarPastaColecionador({
  cpf,
  nome,
  email,
  telefone,
  tipo,
  ingressos = 1,
  sextoIngresso = false,
  quantidadeTotal,
  externalReference,
  status = "pendente",
  valor,
}: CriarPastaColecionadorParams) {
  const cpfLimpo = limparNumero(cpf);

  if (cpfLimpo.length !== 11) {
    throw new Error("CPF inválido para criar pasta do colecionador.");
  }

  if (tipo === "hot-dog-day") {
    return {
      pasta: null,
      ingressos: [],
      ignorado: true,
      motivo: "Hot Dog Day não gera pasta de ingressos colecionáveis.",
    };
  }

  const { data: pasta, error: erroPasta } = await supabaseAdmin
    .from("colecionador_pastas")
    .upsert(
      {
        cpf: cpfLimpo,
        nome: nome || null,
        email: email || null,
        telefone: telefone || null,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "cpf",
      }
    )
    .select("*")
    .single();

  if (erroPasta || !pasta) {
    throw new Error(
      erroPasta?.message || "Erro ao criar pasta do colecionador."
    );
  }

  const modelos = selecionarIngressosDaCompra(ingressos, sextoIngresso);

  const registros = modelos.map((ingresso) => ({
    pasta_id: pasta.id,
    external_reference: externalReference || `manual-${Date.now()}`,
    ingresso_id: ingresso.id,
    titulo: ingresso.titulo,
    descricao: ingresso.descricao,
    imagem: ingresso.imagem,
    tag: ingresso.tag,
    especial: ingresso.especial,
    quantidade: 1,
    status,
    metadata: {
      tipo: tipo || "ingresso-solidario-colecionavel",
      quantidadeTotal: quantidadeTotal || modelos.length,
      valor: valor || null,
      anoColecao: ANO_COLECAO,
    },
    updated_at: new Date().toISOString(),
  }));

  if (registros.length > 0) {
    const { error: erroIngressos } = await supabaseAdmin
      .from("colecionador_ingressos")
      .upsert(registros, {
        onConflict: "pasta_id,external_reference,ingresso_id",
      });

    if (erroIngressos) {
      throw new Error(
        erroIngressos.message || "Erro ao salvar ingressos na pasta."
      );
    }
  }

  return {
    pasta,
    ingressos: registros,
    ignorado: false,
  };
}

export async function buscarPastaColecionadorPorCpf(cpf: string) {
  const cpfLimpo = limparNumero(cpf);

  if (cpfLimpo.length !== 11) {
    throw new Error("CPF inválido.");
  }

  const { data: pasta, error: erroPasta } = await supabaseAdmin
    .from("colecionador_pastas")
    .select("*")
    .eq("cpf", cpfLimpo)
    .maybeSingle();

  if (erroPasta) {
    throw new Error(erroPasta.message || "Erro ao buscar pasta.");
  }

  if (!pasta) {
    return {
      pasta: null,
      ingressos: [],
    };
  }

  const { data: ingressos, error: erroIngressos } = await supabaseAdmin
    .from("colecionador_ingressos")
    .select("*")
    .eq("pasta_id", pasta.id)
    .order("created_at", { ascending: true });

  if (erroIngressos) {
    throw new Error(erroIngressos.message || "Erro ao buscar ingressos.");
  }

  return {
    pasta,
    ingressos: ingressos || [],
  };
}

export async function atualizarNomeEternizadoPorCpf(
  cpf: string,
  nomeEternizado: string
) {
  const cpfLimpo = limparNumero(cpf);

  if (cpfLimpo.length !== 11) {
    throw new Error("CPF inválido.");
  }

  const { data: pasta, error: erroPasta } = await supabaseAdmin
    .from("colecionador_pastas")
    .select("id")
    .eq("cpf", cpfLimpo)
    .maybeSingle();

  if (erroPasta || !pasta) {
    throw new Error(erroPasta?.message || "Pasta não encontrada.");
  }

  const { error } = await supabaseAdmin
    .from("colecionador_ingressos")
    .update({
      nome_eternizado: nomeEternizado.trim(),
      updated_at: new Date().toISOString(),
    })
    .eq("pasta_id", pasta.id)
    .eq("especial", true);

  if (error) {
    throw new Error(error.message || "Erro ao atualizar nome eternizado.");
  }

  return true;
}

export async function atualizarStatusColecaoPorReferencia(
  externalReference: string,
  status: StatusIngressoColecionador
) {
  if (!externalReference) {
    throw new Error("Referência externa não informada.");
  }

  const { error } = await supabaseAdmin
    .from("colecionador_ingressos")
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .eq("external_reference", externalReference);

  if (error) {
    throw new Error(error.message || "Erro ao atualizar status da coleção.");
  }

  return true;
}
