export type StatusProdutoLoja =
  | "prevenda"
  | "aguardando"
  | "encerrado"
  | "disponivel"
  | "sob-consulta";

export type CategoriaLojaSolidaria =
  | "livro-infantil"
  | "livro-infantojuvenil"
  | "camisa-evento-oficial"
  | "camisa-esportiva"
  | "camisa-gamer"
  | "camisa-infantil-jornada";

export type TamanhoCamisaLoja = "P" | "M" | "G" | "GG";

export type ProdutoLojaSolidaria = {
  id: string;
  categoria: CategoriaLojaSolidaria;
  titulo: string;
  subtitulo?: string;
  descricao?: string;
  imagem: string;
  valor?: number;
  valorMembro?: number;
  numero?: number;
  status: StatusProdutoLoja;
  modalidade: "prevenda" | "venda-direta" | "projeto-institucional";
  geraAlimento: boolean;
  inicioPrevenda?: string;
  fimPrevenda?: string;
  entregaPrevista?: string;
  checkoutUrl?: string;
  whatsappTexto?: string;
  tamanhos?: TamanhoCamisaLoja[];
  alimentoKg?: number;
  ingressosSimbolicos?: number;
};

export const TAMANHOS_CAMISA_PADRAO: TamanhoCamisaLoja[] = [
  "P",
  "M",
  "G",
  "GG",
];

const BASE_ANO = 2026;
const BASE_MES = 11;

function doisDigitos(valor: number) {
  return String(valor).padStart(2, "0");
}

function somarMeses(anoInicial: number, mesInicial: number, quantidade: number) {
  const data = new Date(anoInicial, mesInicial - 1 + quantidade, 1);

  return {
    ano: data.getFullYear(),
    mes: data.getMonth() + 1,
  };
}

function criarDataISO(ano: number, mes: number, dia: number) {
  return `${ano}-${doisDigitos(mes)}-${doisDigitos(dia)}`;
}

function criarPeriodoLivro(numero: number) {
  const inicio = somarMeses(BASE_ANO, BASE_MES, numero - 1);
  const fim = somarMeses(BASE_ANO, BASE_MES, numero);
  const entrega = somarMeses(BASE_ANO, BASE_MES, numero + 2);

  return {
    inicioPrevenda: criarDataISO(inicio.ano, inicio.mes, 10),
    fimPrevenda: criarDataISO(fim.ano, fim.mes, 20),
    entregaPrevista: criarDataISO(entrega.ano, entrega.mes, 12),
  };
}

function calcularStatusPrevenda(inicio: string, fim: string): StatusProdutoLoja {
  const hoje = new Date();
  const dataInicio = new Date(`${inicio}T00:00:00-03:00`);
  const dataFim = new Date(`${fim}T23:59:59-03:00`);

  if (hoje < dataInicio) {
    return "aguardando";
  }

  if (hoje > dataFim) {
    return "disponivel";
  }

  return "prevenda";
}

export const livrosInfantis: ProdutoLojaSolidaria[] = Array.from(
  { length: 18 },
  (_, index) => {
    const numero = index + 1;
    const periodo = criarPeriodoLivro(numero);

    return {
      id: `livro-infantil-${doisDigitos(numero)}`,
      categoria: "livro-infantil",
      numero,
      titulo: `Livro Infantil ${doisDigitos(numero)}`,
      subtitulo: "A Jornada Hot Dogueres",
      descricao:
        "Livro infantil da primeira temporada da coleção A Jornada Hot Dogueres.",
      imagem: `/loja-solidaria/livros/infantil-${doisDigitos(numero)}.png`,
      valor: 99.9,
      valorMembro: 80.9,
      status: calcularStatusPrevenda(
        periodo.inicioPrevenda,
        periodo.fimPrevenda,
      ),
      modalidade: "prevenda",
      geraAlimento: false,
      inicioPrevenda: periodo.inicioPrevenda,
      fimPrevenda: periodo.fimPrevenda,
      entregaPrevista: periodo.entregaPrevista,
      checkoutUrl: "/checkout/livros",
    };
  },
);

export const livrosInfantoJuvenis: ProdutoLojaSolidaria[] = Array.from(
  { length: 15 },
  (_, index) => {
    const numero = index + 1;
    const periodo = criarPeriodoLivro(numero);

    return {
      id: `livro-infantojuvenil-${doisDigitos(numero)}`,
      categoria: "livro-infantojuvenil",
      numero,
      titulo: `Livro Infantojuvenil ${doisDigitos(numero)}`,
      subtitulo: "A Jornada Hot Dogueres",
      descricao: "Livro infantojuvenil da coleção A Jornada Hot Dogueres.",
      imagem: `/loja-solidaria/livros/infantojuvenil-${doisDigitos(
        numero,
      )}.png`,
      valor: 99.9,
      valorMembro: 80.9,
      status: calcularStatusPrevenda(
        periodo.inicioPrevenda,
        periodo.fimPrevenda,
      ),
      modalidade: "prevenda",
      geraAlimento: false,
      inicioPrevenda: periodo.inicioPrevenda,
      fimPrevenda: periodo.fimPrevenda,
      entregaPrevista: periodo.entregaPrevista,
      checkoutUrl: "/checkout/livros",
    };
  },
);

export const camisasEventosOficiais: ProdutoLojaSolidaria[] = Array.from(
  { length: 3 },
  (_, index) => {
    const numero = index + 1;

    return {
      id: `camisa-evento-oficial-${doisDigitos(numero)}`,
      categoria: "camisa-evento-oficial",
      numero,
      titulo: `Camisa Evento Oficial ${doisDigitos(numero)}`,
      subtitulo: "Hot Dogueres",
      descricao:
        "Camisa oficial dos eventos Hot Dogueres em sistema de pré-venda. Cada unidade gera impacto solidário equivalente a 3 kg de alimento e 3 ingressos simbólicos.",
      imagem: `/loja-solidaria/camisas/evento-oficial-${doisDigitos(
        numero,
      )}.png`,
      valor: 99.9,
      valorMembro: 80.9,
      status: "prevenda",
      modalidade: "prevenda",
      geraAlimento: true,
      checkoutUrl: "/checkout/camisas",
      tamanhos: TAMANHOS_CAMISA_PADRAO,
      alimentoKg: 3,
      ingressosSimbolicos: 3,
    };
  },
);

export const camisasEsportivas: ProdutoLojaSolidaria[] = Array.from(
  { length: 2 },
  (_, index) => {
    const numero = index + 1;

    return {
      id: `camisa-esportiva-${doisDigitos(numero)}`,
      categoria: "camisa-esportiva",
      numero,
      titulo: `Camisa Esportiva Institucional ${doisDigitos(numero)}`,
      subtitulo: "Projeto com instituição beneficiada",
      descricao:
        "Modelo desenvolvido de acordo com a instituição apoiada. Pode envolver concurso de desenho, participação das crianças e ação solidária.",
      imagem: `/loja-solidaria/camisas/esportiva-${doisDigitos(numero)}.png`,
      status: "sob-consulta",
      modalidade: "projeto-institucional",
      geraAlimento: false,
      tamanhos: TAMANHOS_CAMISA_PADRAO,
      whatsappTexto:
        "Olá! Tenho interesse em saber mais sobre as camisas esportivas institucionais Hot Dogueres.",
    };
  },
);

export const camisasGamer: ProdutoLojaSolidaria[] = Array.from(
  { length: 8 },
  (_, index) => {
    const numero = index + 1;

    return {
      id: `camisa-gamer-${doisDigitos(numero)}`,
      categoria: "camisa-gamer",
      numero,
      titulo: `Camisa Gamer ${doisDigitos(numero)}`,
      subtitulo: "Linha Gamer Hot Dogueres",
      descricao: "Camisa gamer da coleção Hot Dogueres em sistema de pré-venda.",
      imagem: `/loja-solidaria/camisas/gamer-${doisDigitos(numero)}.png`,
      valor: 99.9,
      valorMembro: 80.9,
      status: "prevenda",
      modalidade: "prevenda",
      geraAlimento: false,
      checkoutUrl: "/checkout/camisas",
      tamanhos: TAMANHOS_CAMISA_PADRAO,
    };
  },
);

export const camisasInfantisJornada: ProdutoLojaSolidaria[] = Array.from(
  { length: 8 },
  (_, index) => {
    const numero = index + 1;

    return {
      id: `camisa-infantil-jornada-${doisDigitos(numero)}`,
      categoria: "camisa-infantil-jornada",
      numero,
      titulo: `Camisa Infantil A Jornada ${doisDigitos(numero)}`,
      subtitulo: "A Jornada Hot Dogueres",
      descricao:
        "Camisa infantil da coleção A Jornada Hot Dogueres em sistema de pré-venda.",
      imagem: `/loja-solidaria/camisas/infantil-jornada-${doisDigitos(
        numero,
      )}.png`,
      valor: 99.9,
      valorMembro: 80.9,
      status: "prevenda",
      modalidade: "prevenda",
      geraAlimento: false,
      checkoutUrl: "/checkout/camisas",
      tamanhos: TAMANHOS_CAMISA_PADRAO,
    };
  },
);

export const produtosLojaSolidaria: ProdutoLojaSolidaria[] = [
  ...livrosInfantis,
  ...livrosInfantoJuvenis,
  ...camisasEventosOficiais,
  ...camisasEsportivas,
  ...camisasGamer,
  ...camisasInfantisJornada,
];

export const regrasCorridas = {
  titulo: "Regra de repasse dos kits de corrida",
  descricao:
    "Nos projetos esportivos, parte do valor arrecadado será destinada à instituição beneficiada, ajuda humanitária e confecção dos kits.",
  instituicaoBeneficiada: 50,
  ajudaHumanitaria: 10,
  confeccaoKits: 40,
  doacoesExtras:
    "As pessoas também poderão doar brinquedos e livros durante a campanha.",
};
