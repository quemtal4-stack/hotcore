export type KitCheckout = {
  id: string;
  titulo: string;
  descricao: string;
  valorNumero: number;
  kg: number;
  tipo: "alimento" | "racao";
};

export const KITS_ALIMENTOS_CHECKOUT: KitCheckout[] = [
  {
    id: "alimento-essencial-2kg",
    titulo: "Kit Alimento Essencial 2kg",
    descricao:
      "Ajuda na compra de alimentos básicos para famílias em situação de vulnerabilidade.",
    valorNumero: 22,
    kg: 2,
    tipo: "alimento",
  },
  {
    id: "cesta-solidaria-5kg",
    titulo: "Kit Cesta Solidária 5kg",
    descricao: "Contribuição para ampliar a compra de alimentos da campanha.",
    valorNumero: 55,
    kg: 5,
    tipo: "alimento",
  },
  {
    id: "familia-protegida-10kg",
    titulo: "Kit Família Protegida 10kg",
    descricao: "Apoio maior para alimentos, logística, separação e entrega.",
    valorNumero: 120,
    kg: 10,
    tipo: "alimento",
  },
  {
    id: "cesta-basica-12kg",
    titulo: "Kit Cesta Básica 12kg",
    descricao: "Apoio maior para alimentos, logística, separação e entrega.",
    valorNumero: 150,
    kg: 12,
    tipo: "alimento",
  },
];

export const KITS_RACAO_CHECKOUT: KitCheckout[] = [
  {
    id: "racao-solidaria-1kg",
    titulo: "Kit Ração Solidária 1kg",
    descricao:
      "Ajuda na compra de ração para cães e gatos em situação de abandono.",
    valorNumero: 20,
    kg: 1,
    tipo: "racao",
  },
  {
    id: "patinhas-felizes-5kg",
    titulo: "Kit Patinhas Felizes 5kg",
    descricao: "Contribuição para compra, transporte e entrega de ração.",
    valorNumero: 75,
    kg: 5,
    tipo: "racao",
  },
  {
    id: "protetor-animal-10kg",
    titulo: "Kit Protetor Animal 10kg",
    descricao: "Apoio maior para protetores e ações de cuidado animal.",
    valorNumero: 150,
    kg: 10,
    tipo: "racao",
  },
  {
    id: "ong-20kg",
    titulo: "Kit ONG 20kg",
    descricao: "Apoio maior para protetores e ações de cuidado animal.",
    valorNumero: 285,
    kg: 20,
    tipo: "racao",
  },
];

export const TODOS_KITS_CHECKOUT: KitCheckout[] = [
  ...KITS_ALIMENTOS_CHECKOUT,
  ...KITS_RACAO_CHECKOUT,
];

export function buscarKitAlimento(id: string) {
  return KITS_ALIMENTOS_CHECKOUT.find((kit) => kit.id === id);
}

export function buscarKitRacao(id: string) {
  return KITS_RACAO_CHECKOUT.find((kit) => kit.id === id);
}

export function buscarKitCheckout(id: string) {
  return TODOS_KITS_CHECKOUT.find((kit) => kit.id === id);
}
