import { redirect } from "next/navigation";
import { criarPreferenciaMercadoPago } from "@/lib/mercado-pago";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const kitsAlimentos = {
  "alimento-essencial-2kg": {
    id: "alimento-essencial-2kg",
    titulo: "Kit Alimento Essencial 2kg",
    descricao: "Doação de kit alimento essencial 2kg",
    valorNumero: 22,
    kg: 2,
    tipo: "kit-alimento",
  },
  "cesta-solidaria-5kg": {
    id: "cesta-solidaria-5kg",
    titulo: "Kit Cesta Solidária 5kg",
    descricao: "Doação de kit cesta solidária 5kg",
    valorNumero: 55,
    kg: 5,
    tipo: "kit-alimento",
  },
  "familia-protegida-10kg": {
    id: "familia-protegida-10kg",
    titulo: "Kit Família Protegida 10kg",
    descricao: "Doação de kit família protegida 10kg",
    valorNumero: 120,
    kg: 10,
    tipo: "kit-alimento",
  },
  "cesta-basica-14kg": {
    id: "cesta-basica-14kg",
    titulo: "Kit Cesta Básica 14kg",
    descricao: "Doação de kit cesta básica 14kg",
    valorNumero: 150,
    kg: 14,
    tipo: "kit-alimento",
  },
} as const;

type KitAlimentoKey = keyof typeof kitsAlimentos;

type SearchParams = {
  kit?: string | string[];
  quantidade?: string | string[];
  admin?: string | string[];
  teste?: string | string[];
};

function pegarPrimeiroValor(valor: string | string[] | undefined) {
  if (Array.isArray(valor)) {
    return valor[0];
  }

  return valor;
}

function normalizarQuantidade(valor: string | undefined) {
  const quantidade = Number(valor ?? 1);

  if (!Number.isFinite(quantidade) || quantidade <= 0) {
    return 1;
  }

  return Math.max(1, Math.floor(quantidade));
}

function normalizarKit(valor: string | undefined): KitAlimentoKey {
  if (valor && valor in kitsAlimentos) {
    return valor as KitAlimentoKey;
  }

  return "cesta-solidaria-5kg";
}

function parametroAtivo(valor: string | undefined) {
  return valor === "true" || valor === "1" || valor === "sim";
}

export default async function CheckoutAlimentosPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  const kitParam = pegarPrimeiroValor(params.kit);
  const quantidadeParam = pegarPrimeiroValor(params.quantidade);
  const adminParam = pegarPrimeiroValor(params.admin);
  const testeParam = pegarPrimeiroValor(params.teste);

  const kitSelecionado = normalizarKit(kitParam);
  const quantidade = normalizarQuantidade(quantidadeParam);

  const modoTeste = parametroAtivo(adminParam) || parametroAtivo(testeParam);

  const kit = kitsAlimentos[kitSelecionado];

  const linkPagamento = await criarPreferenciaMercadoPago({
    kit,
    quantidade,
    valorUnitario: kit.valorNumero,
    metadata: {
      tipo: "kit-alimento",
      kit: kitSelecionado,
      quantidade,
      kgPorKit: kit.kg,
      kgTotal: kit.kg * quantidade,
      admin: modoTeste,
      teste: modoTeste,
    },
  });

  redirect(linkPagamento);
}
