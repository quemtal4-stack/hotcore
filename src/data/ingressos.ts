export type Ingresso = {
  id: number;
  numero: number;
  nome: string;
  subtitulo: string;
  descricao: string;
  quantidade: number;
  preco: number;
  alimentoKg: number;
  impacto: string;
  imagem: string;
  destaque?: boolean;
  detalheEspecial?: string;
  raro?: boolean;
  especial?: boolean;
  colecaoAno?: number;
};

export const ANO_COLECAO = 2028;

export const VALOR_INGRESSO_COMUM = 20;
export const VALOR_INGRESSO_ESPECIAL = 80;

export const KG_INGRESSO_COMUM = 1;
export const KG_INGRESSO_ESPECIAL = 3;

export const QUANTIDADE_INGRESSOS_COMUNS_PARA_ETERNIZADO = 5;

export const ingressos: Ingresso[] = [
  {
    id: 1,
    numero: 1,
    nome: `Ingresso 01 ${ANO_COLECAO}`,
    subtitulo: "Primeiro ingresso da coleção especial",
    descricao:
      "Primeiro ingresso da Coleção Especial Hot Dogueres Solidário.",
    quantidade: 15000,
    preco: VALOR_INGRESSO_COMUM,
    alimentoKg: KG_INGRESSO_COMUM,
    impacto: "Cada ingresso reduz 1 kg na meta solidária.",
    imagem: `/ingressos/${ANO_COLECAO}/ingresso-01-${ANO_COLECAO}.png`,
    destaque: true,
    colecaoAno: ANO_COLECAO,
  },
  {
    id: 2,
    numero: 2,
    nome: `Ingresso 02 ${ANO_COLECAO}`,
    subtitulo: "Segundo ingresso da coleção especial",
    descricao:
      "Segundo ingresso da Coleção Especial Hot Dogueres Solidário.",
    quantidade: 15000,
    preco: VALOR_INGRESSO_COMUM,
    alimentoKg: KG_INGRESSO_COMUM,
    impacto: "Cada ingresso reduz 1 kg na meta solidária.",
    imagem: `/ingressos/${ANO_COLECAO}/ingresso-02-${ANO_COLECAO}.png`,
    colecaoAno: ANO_COLECAO,
  },
  {
    id: 3,
    numero: 3,
    nome: `Ingresso 03 ${ANO_COLECAO}`,
    subtitulo: "Terceiro ingresso da coleção especial",
    descricao:
      "Terceiro ingresso da Coleção Especial Hot Dogueres Solidário.",
    quantidade: 15000,
    preco: VALOR_INGRESSO_COMUM,
    alimentoKg: KG_INGRESSO_COMUM,
    impacto: "Cada ingresso reduz 1 kg na meta solidária.",
    imagem: `/ingressos/${ANO_COLECAO}/ingresso-03-${ANO_COLECAO}.png`,
    colecaoAno: ANO_COLECAO,
  },
  {
    id: 4,
    numero: 4,
    nome: `Ingresso 04 ${ANO_COLECAO}`,
    subtitulo: "Quarto ingresso da coleção especial",
    descricao:
      "Quarto ingresso da Coleção Especial Hot Dogueres Solidário.",
    quantidade: 15000,
    preco: VALOR_INGRESSO_COMUM,
    alimentoKg: KG_INGRESSO_COMUM,
    impacto: "Cada ingresso reduz 1 kg na meta solidária.",
    imagem: `/ingressos/${ANO_COLECAO}/ingresso-04-${ANO_COLECAO}.png`,
    colecaoAno: ANO_COLECAO,
  },
  {
    id: 5,
    numero: 5,
    nome: `Ingresso 05 ${ANO_COLECAO}`,
    subtitulo: "Quinto ingresso da coleção especial",
    descricao:
      "Quinto ingresso da Coleção Especial Hot Dogueres Solidário.",
    quantidade: 15000,
    preco: VALOR_INGRESSO_COMUM,
    alimentoKg: KG_INGRESSO_COMUM,
    impacto: "Cada ingresso reduz 1 kg na meta solidária.",
    imagem: `/ingressos/${ANO_COLECAO}/ingresso-05-${ANO_COLECAO}.png`,
    colecaoAno: ANO_COLECAO,
  },
  {
    id: 6,
    numero: 6,
    nome: `Eternizados ${ANO_COLECAO}`,
    subtitulo: "Seu nome no ingresso e na história",
    descricao:
      "O ingresso especial da coleção. Ele representa a peça mais exclusiva e eterniza o apoiador na campanha Hot Dogueres Solidário.",
    quantidade: 2000,
    preco: VALOR_INGRESSO_ESPECIAL,
    alimentoKg: KG_INGRESSO_ESPECIAL,
    impacto: "Cada ingresso especial reduz 3 kg na meta solidária.",
    imagem: `/ingressos/${ANO_COLECAO}/ingresso-eternizados-${ANO_COLECAO}.png`,
    detalheEspecial:
      "Liberado somente para quem adquirir 5 ingressos comuns com o mesmo CPF.",
    raro: true,
    especial: true,
    colecaoAno: ANO_COLECAO,
  },
];

export const ingressosComuns = ingressos.filter(
  (ingresso) => !ingresso.especial,
);

export const ingressoEternizado = ingressos.find(
  (ingresso) => ingresso.especial,
);
