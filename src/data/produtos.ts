import { ingressos } from "./ingressos";

export type Produto = {
  id: string;
  tipo: string;
  titulo: string;
  descricao?: string;
  imagem?: string;
  valor: number;
  valorMembro?: number;
  checkoutUrl: string;
  kg?: number;
  numero?: number;
  colecaoAno?: number;
  especial?: boolean;
};

const produtosIngressosColecionaveis: Produto[] = ingressos.map((ingresso) => ({
  id: ingresso.especial
    ? "ingresso-eternizados"
    : `ingresso-${String(ingresso.numero).padStart(2, "0")}`,
  tipo: ingresso.especial
    ? "ingresso-colecionavel-raro"
    : "ingresso-colecionavel",
  numero: ingresso.numero,
  titulo: ingresso.nome,
  descricao: ingresso.descricao,
  imagem: ingresso.imagem,
  valor: ingresso.preco,
  checkoutUrl: "/cadastro",
  kg: ingresso.alimentoKg,
  especial: ingresso.especial,
}));

export const produtos: Produto[] = [
  ...produtosIngressosColecionaveis,

  {
    id: "alimento-essencial-2kg",
    tipo: "kit-alimento",
    titulo: "Kit Alimento Essencial 2kg",
    descricao:
      "Ajuda na compra de alimentos básicos para famílias em situação de vulnerabilidade.",
    imagem: "/kits/alimento-essencial-2kg.png",
    valor: 22,
    checkoutUrl: "/checkout/alimentos",
    kg: 2,
  },
  {
    id: "cesta-solidaria-5kg",
    tipo: "kit-alimento",
    titulo: "Kit Cesta Solidária 5kg",
    descricao: "Contribuição para ampliar a compra de alimentos da campanha.",
    imagem: "/kits/cesta-solidaria-5kg.png",
    valor: 55,
    checkoutUrl: "/checkout/alimentos",
    kg: 5,
  },
  {
    id: "familia-protegida-10kg",
    tipo: "kit-alimento",
    titulo: "Kit Família Protegida 10kg",
    descricao: "Apoio maior para alimentos, logística, separação e entrega.",
    imagem: "/kits/familia-protegida-10kg.png",
    valor: 120,
    checkoutUrl: "/checkout/alimentos",
    kg: 10,
  },
  {
    id: "cesta-basica-12kg",
    tipo: "kit-alimento",
    titulo: "Kit Cesta Básica 12kg",
    descricao: "Apoio maior para alimentos, logística, separação e entrega.",
    imagem: "/kits/cesta-basica-12kg.png",
    valor: 150,
    checkoutUrl: "/checkout/alimentos",
    kg: 12,
  },

  {
    id: "racao-solidaria-1kg",
    tipo: "kit-racao",
    titulo: "Kit Ração Solidária 1kg",
    descricao:
      "Ajuda na compra de ração para cães e gatos em situação de abandono.",
    imagem: "/kits/racao-solidaria-1kg.png",
    valor: 25,
    checkoutUrl: "/checkout/racao",
    kg: 1,
  },
  {
    id: "patinhas-felizes-5kg",
    tipo: "kit-racao",
    titulo: "Kit Patinhas Felizes 5kg",
    descricao: "Contribuição para compra, transporte e entrega de ração.",
    imagem: "/kits/patinhas-felizes-5kg.png",
    valor: 75,
    checkoutUrl: "/checkout/racao",
    kg: 5,
  },
  {
    id: "protetor-animal-10kg",
    tipo: "kit-racao",
    titulo: "Kit Protetor Animal 10kg",
    descricao: "Apoio maior para protetores e ações de cuidado animal.",
    imagem: "/kits/protetor-animal-10kg.png",
    valor: 150,
    checkoutUrl: "/checkout/racao",
    kg: 10,
  },
  {
    id: "ong-20kg",
    tipo: "kit-racao",
    titulo: "Kit ONG 20kg",
    descricao: "Apoio maior para protetores e ações de cuidado animal.",
    imagem: "/kits/ong-20kg.png",
    valor: 285,
    checkoutUrl: "/checkout/racao",
    kg: 20,
  },

  {
    id: "camisa-ecossistema-hot-dogueres-apresentacao",
    tipo: "camisa-evento",
    titulo: "Camisa Ecossistema Hot Dogueres",
    descricao:
      "Camisa oficial do evento Apresentação do Ecossistema Hot Dogueres.",
    imagem: "/camisas/camisa-ecossistema-hot-dogueres-apresentacao.png",
    valor: 60,
    checkoutUrl: "/checkout/camisas",
    kg: 3,
  },
  {
    id: "camisa-gastronomia-que-salva-vidas",
    tipo: "camisa-evento",
    titulo: "Camisa Gastronomia que Salva Vidas",
    descricao: "Camisa do projeto Gastronomia que Salva Vidas.",
    imagem: "/camisas/camisa-gastronomia-que-salva-vidas.png",
    valor: 60,
    checkoutUrl: "/checkout/camisas",
    kg: 3,
  },

  {
    id: "kit-box-livro-01",
    tipo: "livro",
    titulo: "1ª edição - Kit Box + Livro 1",
    descricao:
      "Primeira edição da coleção A Jornada Hot Dogueres com caixa box colecionável.",
    imagem: "/livros/kit-box-livro-01.png",
    valor: 139.9,
    valorMembro: 130.9,
    checkoutUrl: "/checkout/livros",
  },
  {
    id: "livro-02",
    tipo: "livro",
    titulo: "2ª edição - Livro 2",
    descricao: "Livro 2 da coleção A Jornada Hot Dogueres.",
    imagem: "/livros/livro-02.png",
    valor: 99.9,
    valorMembro: 80.9,
    checkoutUrl: "/checkout/livros",
  },
];
