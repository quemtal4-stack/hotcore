"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import SecaoIngressosColecionaveis from "@/components/SecaoIngressosColecionaveis";
import SetasNavegacao from "@/components/SetasNavegacao";
import SecaoCalendario2027 from "@/components/SecaoCalendario2027";
import { TermometroImpacto } from "@/components/TermometroImpacto";
import { TermometroRacao } from "@/components/TermometroRacao";


const META_DOACAO_KG = 104000;
const ALIMENTOS_ARRECADADOS_ATUAL_KG = 0;


const CHECKOUT_ALIMENTO_URL = "/checkout/alimentos";
const CHECKOUT_RACAO_URL = "/checkout/racao";
const CHECKOUT_LIVROS_URL = "/checkout/livros";

const TOTAL_INGRESSOS_APRESENTACAO_DO_ECOSSISTEMA_HOT_DOGUERES = 23000;
const INGRESSOS_VENDIDOS_APRESENTACAO_DO_ECOSSISTEMA_HOT_DOGUERES = 0;
const VALOR_INGRESSO_APRESENTACAO_DO_ECOSSISTEMA_HOT_DOGUERES = 20;

const DATA_EVENTO = new Date("2026-12-12T17:00:00-03:00");

const DIA_ABERTURA_PREVENDA_LIVROS = 10;
const DIA_FECHAMENTO_PREVENDA_LIVROS = 20;
const DIA_ENTREGA_LIVROS = 12;

const ANO_PRIMEIRA_ENTREGA_LIVROS = 2027;
const MES_PRIMEIRA_ENTREGA_LIVROS = 0;

const LOGOS = [
  {
    nome: "Ecossistema Hot Dogueres",
    imagem: "/logo-ecossistema-hot-dogueres.png",
  },
];

const PATROCINADORES = [
  {
    nome: "Patrocinador 01",
    video: "/patrocinadores/patrocinador-01.mp4",
    contato: "Adicionar contato",
  },
  {
    nome: "Patrocinador 02",
    video: "/patrocinadores/patrocinador-02.mp4",
    contato: "Adicionar contato",
  },
  {
    nome: "Patrocinador 03",
    video: "/patrocinadores/patrocinador-03.mp4",
    contato: "Adicionar contato",
  },
];

const VALOR_CAMISA_EVENTO = 60;
const INGRESSOS_SIMBOLICOS_POR_CAMISA = 3;
const KG_ALIMENTOS_POR_CAMISA = 3;

type TamanhoCamisa = "P" | "M" | "G" | "GG";

type CamisaEvento = {
  id: string;
  titulo: string;
  descricao: string;
  imagem: string;
  valor?: number;
};

type CamisasSelecionadas = Record<
  string,
  {
    quantidade: number;
    tamanho: TamanhoCamisa;
  }
>;

const CAMISAS_EVENTOS: CamisaEvento[] = [
  {
    id: "camisa-ecossistema-hot-dogueres-apresentacao",
    titulo: "Camisa Ecossistema Hot Dogueres",
    descricao:
      "Camisa oficial do evento Apresentação do Ecossistema Hot Dogueres.",
    imagem: "/camisas/camisa-ecossistema-hot-dogueres-apresentacao.png",
  },
  {
    id: "camisa-gastronomia-que-salva-vidas",
    titulo: "Camisa Gastronomia que Salva Vidas",
    descricao: "Camisa do projeto Gastronomia que Salva Vidas.",
    imagem: "/camisas/camisa-gastronomia-que-salva-vidas.png",
  },
];

type KitSolidario = {
  id: string;
  titulo: string;
  descricao: string;
  imagem: string;
  valor: string;
  valorNumero: number;
  pesoKg: number;
  quantidade: string;
  href: string;
};

const KITS_ALIMENTOS: KitSolidario[] = [
  {
    id: "alimento-essencial-2kg",
    titulo: "Kit Alimento Essencial 2kg",
    descricao:
      "Ajuda na compra de alimentos básicos para famílias em situação de vulnerabilidade.",
    imagem: "/kits/alimento-essencial-2kg.png",
    valor: "R$ 22,00",
    valorNumero: 22,
    pesoKg: 2,
    quantidade: "2 kg de alimentos",
    href: CHECKOUT_ALIMENTO_URL,
  },
  {
    id: "cesta-solidaria-5kg",
    titulo: "Kit Cesta Solidária 5kg",
    descricao: "Contribuição para ampliar a compra de alimentos da campanha.",
    imagem: "/kits/cesta-solidaria-5kg.png",
    valor: "R$ 55,00",
    valorNumero: 55,
    pesoKg: 5,
    quantidade: "5 kg de alimentos",
    href: CHECKOUT_ALIMENTO_URL,
  },
  {
    id: "familia-protegida-10kg",
    titulo: "Kit Família Protegida 10kg",
    descricao: "Apoio maior para alimentos, logística, separação e entrega.",
    imagem: "/kits/familia-protegida-10kg.png",
    valor: "R$ 120,00",
    valorNumero: 120,
    pesoKg: 10,
    quantidade: "10 kg de alimentos",
    href: CHECKOUT_ALIMENTO_URL,
  },
  {
    id: "cesta-basica-14kg",
    titulo: "Kit Cesta Básica 14kg",
    descricao: "Apoio maior para alimentos, logística, separação e entrega.",
    imagem: "/kits/cesta-basica-14kg.png",
    valor: "R$ 150,00",
    valorNumero: 150,
    pesoKg: 14,
    quantidade: "14 kg de alimentos",
    href: CHECKOUT_ALIMENTO_URL,
  },
];

const KITS_RACAO: KitSolidario[] = [
  {
    id: "racao-solidaria-1kg",
    titulo: "Kit Ração Solidária 1kg",
    descricao:
      "Ajuda na compra de ração para cães e gatos em situação de abandono.",
    imagem: "/kits/racao-solidaria-1kg.png",
    valor: "R$ 25,00",
    valorNumero: 25,
    pesoKg: 1,
    quantidade: "1 kg de ração",
    href: CHECKOUT_RACAO_URL,
  },
  {
    id: "patinhas-felizes-5kg",
    titulo: "Kit Patinhas Felizes 5kg",
    descricao: "Contribuição para compra, transporte e entrega de ração.",
    imagem: "/kits/patinhas-felizes-5kg.png",
    valor: "R$ 75,00",
    valorNumero: 75,
    pesoKg: 5,
    quantidade: "5 kg de ração",
    href: CHECKOUT_RACAO_URL,
  },
  {
    id: "protetor-animal-10kg",
    titulo: "Kit Protetor Animal 10kg",
    descricao: "Apoio maior para protetores e ações de cuidado animal.",
    imagem: "/kits/protetor-animal-10kg.png",
    valor: "R$ 150,00",
    valorNumero: 150,
    pesoKg: 10,
    quantidade: "10 kg de ração",
    href: CHECKOUT_RACAO_URL,
  },
  {
    id: "ong-20kg",
    titulo: "Kit ONG 20kg",
    descricao: "Apoio maior para protetores e ações de cuidado animal.",
    imagem: "/kits/ong-20kg.png",
    valor: "R$ 285,00",
    valorNumero: 285,
    pesoKg: 20,
    quantidade: "20 kg de ração",
    href: CHECKOUT_RACAO_URL,
  },
];

type TempoRestante = {
  dias: number;
  horas: number;
  minutos: number;
  segundos: number;
};

type LivroPreVenda = {
  id: string;
  numero: number;
  titulo: string;
  subtitulo: string;
  imagem: string;
  descricao: string;
  inclui: string[];
  valor: number;
  valorMembro: number;
  valorPromocional?: number;
  bloqueado: boolean;
  destaque?: boolean;
  dataLiberacaoTexto: string;
  dataInicioPreVenda: Date;
  dataFimPreVenda: Date;
  dataEntrega: Date;
};

type LivroAmpliado = LivroPreVenda | null;

function calcularTempoRestante(dataAlvo: Date): TempoRestante {
  const agora = new Date();
  const diferenca = Math.max(dataAlvo.getTime() - agora.getTime(), 0);

  return {
    dias: Math.floor(diferenca / (1000 * 60 * 60 * 24)),
    horas: Math.floor((diferenca / (1000 * 60 * 60)) % 24),
    minutos: Math.floor((diferenca / (1000 * 60)) % 60),
    segundos: Math.floor((diferenca / 1000) % 60),
  };
}

function formatarMoeda(valor: number) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function montarLinkCheckout({
  href,
  kit,
  titulo,
  quantidade,
  valor,
  kg,
}: {
  href: string;
  kit: string;
  titulo: string;
  quantidade: number;
  valor: number;
  kg: number;
}) {
  const parametros = new URLSearchParams({
    kit,
    titulo,
    quantidade: String(quantidade),
    valor: String(valor),
    kg: String(kg),
  });

  return `${href}?${parametros.toString()}`;
}

function criarDataBrasil(
  ano: number,
  mesIndice: number,
  dia: number,
  hora = 0,
  minuto = 0,
  segundo = 0,
) {
  const mes = String(mesIndice + 1).padStart(2, "0");
  const diaFormatado = String(dia).padStart(2, "0");
  const horaFormatada = String(hora).padStart(2, "0");
  const minutoFormatado = String(minuto).padStart(2, "0");
  const segundoFormatado = String(segundo).padStart(2, "0");

  return new Date(
    `${ano}-${mes}-${diaFormatado}T${horaFormatada}:${minutoFormatado}:${segundoFormatado}-03:00`,
  );
}

function calcularAnoMesPorDeslocamento(
  anoBase: number,
  mesBase: number,
  deslocamentoMeses: number,
) {
  const totalMeses = anoBase * 12 + mesBase + deslocamentoMeses;

  return {
    ano: Math.floor(totalMeses / 12),
    mes: totalMeses % 12,
  };
}

function obterCronogramaLivro(numeroLivro: number) {
  const deslocamentoEntrega = numeroLivro - 1;

  const entrega = calcularAnoMesPorDeslocamento(
    ANO_PRIMEIRA_ENTREGA_LIVROS,
    MES_PRIMEIRA_ENTREGA_LIVROS,
    deslocamentoEntrega,
  );

  const abertura = calcularAnoMesPorDeslocamento(entrega.ano, entrega.mes, -2);

  const fechamento = calcularAnoMesPorDeslocamento(
    entrega.ano,
    entrega.mes,
    -1,
  );

  return {
    dataInicioPreVenda: criarDataBrasil(
      abertura.ano,
      abertura.mes,
      DIA_ABERTURA_PREVENDA_LIVROS,
      0,
      0,
      0,
    ),
    dataFimPreVenda: criarDataBrasil(
      fechamento.ano,
      fechamento.mes,
      DIA_FECHAMENTO_PREVENDA_LIVROS,
      23,
      59,
      59,
    ),
    dataEntrega: criarDataBrasil(
      entrega.ano,
      entrega.mes,
      DIA_ENTREGA_LIVROS,
      14,
      0,
      0,
    ),
  };
}

function formatarDataCompleta(data: Date) {
  return data.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function formatarPeriodoPreVenda(livro: LivroPreVenda) {
  return `${formatarDataCompleta(
    livro.dataInicioPreVenda,
  )} a ${formatarDataCompleta(livro.dataFimPreVenda)}`;
}

function obterProximaEntregaMensal() {
  const agora = new Date();

  const ano = agora.getFullYear();
  const mes = agora.getMonth();

  let proximaEntrega = criarDataBrasil(ano, mes, DIA_ENTREGA_LIVROS, 14, 0, 0);

  if (agora.getTime() > proximaEntrega.getTime()) {
    const proximoMes = calcularAnoMesPorDeslocamento(ano, mes, 1);

    proximaEntrega = criarDataBrasil(
      proximoMes.ano,
      proximoMes.mes,
      DIA_ENTREGA_LIVROS,
      14,
      0,
      0,
    );
  }

  return proximaEntrega;
}

function livroAindaNaoLiberado(livro: LivroPreVenda) {
  const agora = new Date();

  return agora < livro.dataInicioPreVenda;
}

function livroEstaEmPreVenda(livro: LivroPreVenda) {
  const agora = new Date();

  return agora >= livro.dataInicioPreVenda && agora <= livro.dataFimPreVenda;
}

function livroEstaSobEncomenda(livro: LivroPreVenda) {
  const agora = new Date();

  return agora > livro.dataFimPreVenda;
}

function livroEstaLiberadoParaCompra(livro: LivroPreVenda) {
  const agora = new Date();

  return agora >= livro.dataInicioPreVenda;
}

function obterDataEntregaCompraLivro(livro: LivroPreVenda) {
  const agora = new Date();

  if (agora <= livro.dataEntrega) {
    return livro.dataEntrega;
  }

  return obterProximaEntregaMensal();
}

function textoStatusLivro(livro: LivroPreVenda) {
  if (livroAindaNaoLiberado(livro)) {
    return `Bloqueado - abre em ${formatarDataCompleta(
      livro.dataInicioPreVenda,
    )}`;
  }

  if (livroEstaEmPreVenda(livro)) {
    return "Pré-venda aberta";
  }

  return "Pedido sob encomenda";
}

function textoEntregaLivro(livro: LivroPreVenda) {
  const dataEntregaCompra = obterDataEntregaCompraLivro(livro);

  if (livroEstaSobEncomenda(livro)) {
    return `Entrega no próximo ciclo mensal: ${formatarDataCompleta(
      dataEntregaCompra,
    )}`;
  }

  return `Entrega prevista: ${formatarDataCompleta(dataEntregaCompra)}`;
}

function valorPrincipalLivro(livro: LivroPreVenda) {
  return livro.valorPromocional || livro.valor;
}

const LIVROS_PREVENDA: LivroPreVenda[] = [
  {
    id: "kit-box-livro-01",
    numero: 1,
    titulo: "1ª edição - Kit Box + Livro 1",
    subtitulo: "A Jornada Hot Dogueres",
    imagem: "/livros/kit-box-livro-01.png",
    descricao:
      "A primeira edição acompanha a caixa box colecionável, o Livro 1 e adesivos especiais da Jornada Hot Dogueres. A entrega inicial será realizada no Dia das Crianças.",
    inclui: [
      "Caixa box colecionável",
      "Livro 1 impresso",
      "Adesivos especiais",
      "Pré-venda de 10 de novembro a 20 de dezembro de 2026",
      "Entrega inicial prevista para 12 de janeiro de 2027",
    ],
    valor: 149.9,
    valorPromocional: 139.9,
    valorMembro: 130.9,
    bloqueado: false,
    destaque: true,
    dataLiberacaoTexto: "Pré-venda inicial automática",
    ...obterCronogramaLivro(1),
  },
  ...Array.from({ length: 17 }, (_, index) => {
    const numero = index + 2;
    const numeroFormatado = String(numero).padStart(2, "0");
    const cronograma = obterCronogramaLivro(numero);

    return {
      id: `livro-${numeroFormatado}`,
      numero,
      titulo: `${numero}ª edição - Livro ${numero}`,
      subtitulo: "A Jornada Hot Dogueres",
      imagem: `/livros/livro-${numeroFormatado}.png`,
      descricao:
        "Edição individual da coleção A Jornada Hot Dogueres. Cada livro será vendido por pré-venda ou encomenda, conforme o calendário mensal de produção e entrega.",
      inclui: [
        `Livro ${numero} impresso`,
        "Brindes colecionáveis",
        `Entrega prevista para ${formatarDataCompleta(cronograma.dataEntrega)}`,
      ],
      valor: 99.9,
      valorMembro: 80.9,
      bloqueado: false,
      destaque: false,
      dataLiberacaoTexto: "Liberação automática mensal",
      ...cronograma,
    };
  }),
];

function montarLinkCompraLivro({
  livro,
  valor,
}: {
  livro: LivroPreVenda;
  valor: number;
}) {
  const dataEntregaCompra = obterDataEntregaCompraLivro(livro);

  const parametros = new URLSearchParams({
    produto: livro.id,
    titulo: livro.titulo,
    valor: String(valor),
    tipo: livroEstaEmPreVenda(livro) ? "pre-venda-livro" : "encomenda-livro",
    livro: String(livro.numero),
    periodoPreVenda: formatarPeriodoPreVenda(livro),
    entrega: formatarDataCompleta(dataEntregaCompra),
  });

  return `${CHECKOUT_LIVROS_URL}?${parametros.toString()}`;
}

type SecaoIngressoApresentacaoDoEcossistemaHotDogueresProps = {
  kgDoados: number;
  metaKg: number;
  ingressosVendidos: number;
};

function SecaoIngressoApresentacaoDoEcossistemaHotDogueres({
  kgDoados,
  metaKg,
  ingressosVendidos,
}: SecaoIngressoApresentacaoDoEcossistemaHotDogueresProps) {
  const percentualMeta =
    metaKg > 0 ? Math.min((kgDoados / metaKg) * 100, 100) : 0;

  const ingressosRestantes = Math.max(
    TOTAL_INGRESSOS_APRESENTACAO_DO_ECOSSISTEMA_HOT_DOGUERES -
      ingressosVendidos,
    0,
  );

  const totalArrecadado =
    ingressosVendidos *
    VALOR_INGRESSO_APRESENTACAO_DO_ECOSSISTEMA_HOT_DOGUERES;

  const porcentagemVendida = Math.min(
    (ingressosVendidos /
      TOTAL_INGRESSOS_APRESENTACAO_DO_ECOSSISTEMA_HOT_DOGUERES) *
      100,
    100,
  );

  const linkCadastro = `/cadastro?${new URLSearchParams({
    tipo: "apresentacao-do-ecossistema-hot-dogueres",
    ingressos: "1",
  }).toString()}`;

  return (
    <section className="mx-auto max-w-6xl rounded-[2rem] bg-white p-5 shadow-xl ring-1 ring-red-100 md:p-6">
      <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-center">
        <div>
          <p className="inline-flex rounded-full bg-red-600 px-5 py-2 text-xs font-black uppercase tracking-wide text-white">
            Ingresso oficial
          </p>

          <h2 className="mt-4 text-3xl font-black leading-tight text-gray-950 md:text-4xl">
            Apresentação do Ecossistema Hot Dogueres
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-gray-700">
            Garanta seu ingresso para o primeiro grande encontro do Ecossistema
            Hot Dogueres. Cada ingresso fortalece a campanha solidária e ajuda a
            movimentar a meta de alimentos.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-red-50 p-4 text-center">
              <p className="text-[10px] font-black uppercase text-gray-500">
                Valor
              </p>

              <p className="mt-1 text-2xl font-black text-red-600">
                {formatarMoeda(
                  VALOR_INGRESSO_APRESENTACAO_DO_ECOSSISTEMA_HOT_DOGUERES,
                )}
              </p>
            </div>

            <div className="rounded-2xl bg-yellow-50 p-4 text-center">
              <p className="text-[10px] font-black uppercase text-gray-500">
                Restantes
              </p>

              <p className="mt-1 text-2xl font-black text-gray-950">
                {ingressosRestantes.toLocaleString("pt-BR")}
              </p>
            </div>

            <div className="rounded-2xl bg-green-50 p-4 text-center">
              <p className="text-[10px] font-black uppercase text-gray-500">
                Arrecadado
              </p>

              <p className="mt-1 text-2xl font-black text-green-700">
                {formatarMoeda(totalArrecadado)}
              </p>
            </div>
          </div>

          <div className="mt-5">
            <div className="mb-2 flex items-center justify-between text-[10px] font-black uppercase text-gray-500">
              <span>Ingressos vendidos</span>
              <span>{porcentagemVendida.toFixed(0)}%</span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-red-50">
              <div
                className="h-full rounded-full bg-red-600 transition-all"
                style={{
                  width: `${porcentagemVendida}%`,
                }}
              />
            </div>

            <p className="mt-2 text-xs font-bold text-gray-600">
              {ingressosVendidos.toLocaleString("pt-BR")} ingressos
              contabilizados
            </p>
          </div>

          <div className="mt-5">
            <div className="mb-2 flex items-center justify-between text-[10px] font-black uppercase text-gray-500">
              <span>Meta solidária</span>
              <span>{percentualMeta.toFixed(0)}%</span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-yellow-50">
              <div
                className="h-full rounded-full bg-yellow-400 transition-all"
                style={{
                  width: `${percentualMeta}%`,
                }}
              />
            </div>

            <p className="mt-2 text-xs font-bold text-gray-600">
              {kgDoados.toLocaleString("pt-BR")} kg de{" "}
              {metaKg.toLocaleString("pt-BR")} kg
            </p>
          </div>

          <Link
            href={linkCadastro}
            className="mt-6 flex w-full justify-center rounded-full bg-red-600 px-6 py-4 text-sm font-black uppercase tracking-wide text-white shadow-lg transition hover:bg-red-700"
          >
            Comprar ingresso
          </Link>
        </div>

        <div className="relative h-96 overflow-hidden rounded-[1.5rem] bg-gray-50 shadow-inner">
          <Image
            src="/ingressos/apresentacao-do-ecossistema-hot-dogueres-2026.png"
            alt="Ingresso Apresentação do Ecossistema Hot Dogueres 2026"
            fill
            sizes="(max-width: 1024px) 100vw, 480px"
            className="object-contain p-3"
            unoptimized
          />
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const [camisasSelecionadas, setCamisasSelecionadas] =
    useState<CamisasSelecionadas>({});

  const [contadorCarregado, setContadorCarregado] = useState(false);

  const [tempoRestante, setTempoRestante] = useState<TempoRestante>({
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0,
  });

  const [patrocinadorAtual, setPatrocinadorAtual] = useState(0);
  const [livroAmpliado, setLivroAmpliado] = useState<LivroAmpliado>(null);

  const [ingressosVendidos] = useState(
    INGRESSOS_VENDIDOS_APRESENTACAO_DO_ECOSSISTEMA_HOT_DOGUERES,
  );

  const [quantidadesAlimentos, setQuantidadesAlimentos] = useState<
    Record<string, number>
  >({});

  const [quantidadesRacao, setQuantidadesRacao] = useState<
    Record<string, number>
  >({});

  const kgAlimentosSelecionados = KITS_ALIMENTOS.reduce((total, kit) => {
    return total + (quantidadesAlimentos[kit.id] || 0) * kit.pesoKg;
  }, 0);


  const totalCamisasSelecionadas = CAMISAS_EVENTOS.reduce((total, camisa) => {
    return total + (camisasSelecionadas[camisa.id]?.quantidade || 0);
  }, 0);

  const ingressosSimbolicosCamisasSelecionadas =
    totalCamisasSelecionadas * INGRESSOS_SIMBOLICOS_POR_CAMISA;

  const kgCamisasSelecionadas =
    totalCamisasSelecionadas * KG_ALIMENTOS_POR_CAMISA;

  const ingressosVendidosParaExibicao =
    ingressosVendidos + ingressosSimbolicosCamisasSelecionadas;

  const kgAlimentosTermometro =
    ALIMENTOS_ARRECADADOS_ATUAL_KG +
    ingressosVendidos +
    kgAlimentosSelecionados +
    kgCamisasSelecionadas;


  const patrocinador = PATROCINADORES[patrocinadorAtual];

  function mostrarTempo(valor: number) {
    return contadorCarregado ? valor : "--";
  }

  function alterarQuantidadeAlimento(id: string, valor: number) {
    setQuantidadesAlimentos((estadoAtual) => {
      const quantidadeAtual = estadoAtual[id] || 0;
      const novaQuantidade = Math.max(0, quantidadeAtual + valor);

      return {
        ...estadoAtual,
        [id]: novaQuantidade,
      };
    });
  }

  function alterarQuantidadeRacao(id: string, valor: number) {
    setQuantidadesRacao((estadoAtual) => {
      const quantidadeAtual = estadoAtual[id] || 0;
      const novaQuantidade = Math.max(0, quantidadeAtual + valor);

      return {
        ...estadoAtual,
        [id]: novaQuantidade,
      };
    });
  }

  function alterarQuantidadeCamisa(id: string, valor: number) {
    setCamisasSelecionadas((estadoAtual) => {
      const camisaAtual = estadoAtual[id] || {
        quantidade: 0,
        tamanho: "M" as TamanhoCamisa,
      };

      const novaQuantidade = Math.max(0, camisaAtual.quantidade + valor);

      return {
        ...estadoAtual,
        [id]: {
          ...camisaAtual,
          quantidade: novaQuantidade,
        },
      };
    });
  }

  function alterarTamanhoCamisa(id: string, tamanho: TamanhoCamisa) {
    setCamisasSelecionadas((estadoAtual) => {
      const camisaAtual = estadoAtual[id] || {
        quantidade: 1,
        tamanho,
      };

      return {
        ...estadoAtual,
        [id]: {
          ...camisaAtual,
          tamanho,
        },
      };
    });
  }

  async function comprarCamisa(camisa: CamisaEvento) {
    const selecao = camisasSelecionadas[camisa.id];

    const quantidade = selecao?.quantidade || 1;
    const tamanho = selecao?.tamanho || "M";

    try {
      const resposta = await fetch("/api/checkout/camisas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: camisa.id,
          titulo: camisa.titulo,
          quantidade,
          tamanho,
          valorUnitario: VALOR_CAMISA_EVENTO,
          ingressosSimbolicos: quantidade * INGRESSOS_SIMBOLICOS_POR_CAMISA,
          kgAlimentos: quantidade * KG_ALIMENTOS_POR_CAMISA,
        }),
      });

      const dados = await resposta.json();

      console.log("Resposta checkout camisas:", dados);

      const linkPagamento =
        dados.initPoint || dados.init_point || dados.sandbox_init_point;

      if (linkPagamento) {
        window.location.href = linkPagamento;
        return;
      }

      alert("Não foi possível iniciar o pagamento. Link de pagamento não retornado.");
    } catch (erro) {
      console.error("Erro ao comprar camisa:", erro);
      alert("Erro ao conectar com o pagamento. Tente novamente.");
    }
  }

  useEffect(() => {
    setContadorCarregado(true);
    setTempoRestante(calcularTempoRestante(DATA_EVENTO));

    const intervalo = window.setInterval(() => {
      setTempoRestante(calcularTempoRestante(DATA_EVENTO));
    }, 1000);

    return () => {
      window.clearInterval(intervalo);
    };
  }, []);

  useEffect(() => {
    const intervalo = window.setInterval(() => {
      setPatrocinadorAtual((valorAtual) => {
        return (valorAtual + 1) % PATROCINADORES.length;
      });
    }, 5000);

    return () => {
      window.clearInterval(intervalo);
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#fff7e8] text-gray-950">
      <SetasNavegacao
        proxima="/nossa-historia"
        labelProxima="Ir para Nossa História"
      />

      <header className="sticky top-0 z-40 border-b border-red-100 bg-white/90 px-4 py-4 shadow-sm backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <Link
            href="/"
            className="flex w-full items-center justify-center gap-2 overflow-hidden lg:w-auto lg:justify-start"
          >
            {LOGOS.map((logo) => (
              <div
                key={logo.nome}
                className="relative h-16 w-48 shrink-0 overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-gray-100 sm:h-20 sm:w-64 md:h-24 md:w-80 lg:h-28 lg:w-96 xl:h-32 xl:w-[420px]"
              >
                <Image
                  src={logo.imagem}
                  alt={logo.nome}
                  fill
                  sizes="(max-width: 640px) 192px, (max-width: 768px) 256px, (max-width: 1024px) 320px, 420px"
                  className="object-contain p-1"
                  priority
                  unoptimized
                />
              </div>
            ))}
          </Link>

         <nav className="flex w-full flex-wrap items-center justify-center gap-3 text-center text-xs font-black uppercase tracking-wide md:grid md:grid-cols-4">
  {/* Sempre visíveis, inclusive no celular */}
  <Link
    href="/clube-de-membros"
    className="w-full max-w-xs rounded-2xl bg-red-600 px-4 py-3 text-center text-white shadow-sm transition hover:bg-red-700"
  >
    Clube de Membros
  </Link>
{/* Menu "Mais" — some no desktop, aparece como dropdown no mobile */}
  <details className="group relative w-full max-w-xs md:hidden">
    <summary className="flex w-full cursor-pointer list-none items-center justify-center gap-1 rounded-2xl bg-gray-950 px-4 py-3 text-center text-white shadow-sm">
      Mais ▾
    </summary>

  <Link
    href="/ranking-do-bem"
    className="w-full max-w-xs rounded-2xl bg-yellow-400 px-4 py-3 text-center text-gray-950 shadow-sm transition hover:bg-yellow-500"
  >
    Ranking do Bem
  </Link>

  <Link
    href="/loja-solidaria"
    className="w-full max-w-xs rounded-2xl border border-red-200 bg-white px-4 py-3 text-center text-red-600 shadow-sm transition hover:bg-red-50"
  >
    Loja Solidária
  </Link>

    <div className="absolute left-0 right-0 z-30 mt-2 flex flex-col gap-2 rounded-2xl bg-white p-3 text-center shadow-xl ring-1 ring-gray-100">
      <Link href="/nossa-historia" className="rounded-2xl border border-red-200 px-4 py-3 text-center leading-tight text-red-600 hover:bg-red-50">
        Nossa História
      </Link>
      <Link href="/area-do-colecionador" className="rounded-2xl bg-gray-950 px-4 py-3 text-center leading-tight text-white hover:bg-gray-800">
        Área do Colecionador
      </Link>
      <Link href="/impacto-social" className="rounded-2xl bg-green-600 px-4 py-3 text-center leading-tight text-white hover:bg-green-700">
        Impacto Social
      </Link>
      <Link href="/parceiros-empresas" className="rounded-2xl bg-blue-700 px-4 py-3 text-center leading-tight text-white hover:bg-blue-800">
        Área do Parceiro
      </Link>
      <Link href="/calendario-2027" className="rounded-2xl bg-purple-700 px-4 py-3 text-center leading-tight text-white hover:bg-purple-800">
        Calendário 2027
      </Link>
    </div>
  </details>

  {/* No desktop, mostra todos os botões direto (sem o "Mais") */}
  <Link href="/ranking-do-bem" className="hidden rounded-full bg-yellow-400 px-4 py-3 text-gray-950 shadow-sm transition hover:bg-yellow-500 md:block">
    Ranking do Bem
  </Link>
  <Link href="/loja-solidaria" className="hidden rounded-full border border-red-200 bg-white px-4 py-3 text-red-600 shadow-sm transition hover:bg-red-50 md:block">
    Loja Solidária
  </Link>
  <Link href="/nossa-historia" className="hidden rounded-full border border-red-200 bg-white px-4 py-3 text-red-600 shadow-sm transition hover:bg-red-50 md:block">
    Nossa História
  </Link>

  <Link href="/area-do-colecionador" className="hidden rounded-full bg-gray-950 px-4 py-3 text-white shadow-sm transition hover:bg-gray-800 md:block">
    Área do Colecionador
  </Link>
  <Link href="/impacto-social" className="hidden rounded-full bg-green-600 px-4 py-3 text-white shadow-sm transition hover:bg-green-700 md:block">
    Impacto Social
  </Link>
  <Link href="/parceiros-empresas" className="hidden rounded-full bg-blue-700 px-4 py-3 text-white shadow-sm transition hover:bg-blue-800 md:block">
    Área do Parceiro
  </Link>
  <Link href="/calendario-2027" className="hidden rounded-full bg-purple-700 px-4 py-3 text-white shadow-sm transition hover:bg-purple-800 md:block">
    Calendário 2027
  </Link>
</nav>

        </div>
      </header>

      <section className="relative overflow-hidden px-4 py-8 md:py-10">
        <div className="absolute left-[-180px] top-[-180px] h-[360px] w-[360px] rounded-full bg-red-200/40 blur-3xl" />
        <div className="absolute bottom-[-200px] right-[-150px] h-[420px] w-[420px] rounded-full bg-yellow-200/60 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">
          <div className="rounded-[2rem] bg-white p-5 text-center shadow-xl md:p-8">
            <p className="inline-flex rounded-full bg-red-600 px-5 py-2 text-xs font-black uppercase tracking-wide text-white">
              Seja bem-vindo
            </p>

            <h1 className="mt-4 text-3xl font-black leading-tight text-gray-950 md:text-5xl">
              Seja bem-vindo ao Ecossistema Hot Dogueres
            </h1>

            <p className="mx-auto mt-4 max-w-3xl text-base font-bold leading-relaxed text-gray-700 md:text-lg">
              Onde todos os dias é dia de fazer o bem. Fique atento aos novos
              eventos e participe dessa grande família solidária.
            </p>
          </div>

          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/parceiros-empresas#fazer-parte"
              className="rounded-full border border-blue-200 bg-white px-7 py-4 text-sm font-black uppercase tracking-wide text-blue-700 shadow-sm transition hover:-translate-y-1 hover:bg-blue-50 hover:shadow-md"
            >
              Cadastrar Empresa
            </Link>
          </div>

          <p className="mx-auto mt-3 max-w-2xl text-xs font-bold leading-relaxed text-gray-500">
            Espaço para empresas parceiras acessarem cadastro, boletos, notas
            fiscais e informações da parceria.
          </p>

          <SecaoCalendario2027 />

        <div className="mt-6 space-y-6">
  <TermometroImpacto />
  <TermometroRacao />
</div>

          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <article className="rounded-[2rem] bg-white p-5 shadow-xl ring-1 ring-red-100">
              <p className="inline-flex rounded-full bg-red-600 px-4 py-2 text-xs font-black uppercase tracking-wide text-white">
                Primeiro evento
              </p>

              <h2 className="mt-4 text-2xl font-black leading-tight text-gray-950">
                Projeto: Apresentação do Ecossistema Hot Dogueres
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-gray-700">
                O primeiro grande encontro para apresentar o ecossistema, os
                projetos sociais e a força da comunidade Hot Dogueres.
              </p>

              <div className="relative mt-5 h-72 overflow-hidden rounded-[1.5rem] bg-gray-50 shadow-inner">
                <Image
                  src="/ingressos/apresentacao-do-ecossistema-hot-dogueres-2026.png"
                  alt="Ingresso Apresentação do Ecossistema Hot Dogueres"
                  fill
                  sizes="(max-width: 1024px) 100vw, 520px"
                  className="object-contain p-3"
                  unoptimized
                />
              </div>

              <Link
                href="#ingressos"
                className="mt-5 flex w-full justify-center rounded-full bg-red-600 px-5 py-3 text-xs font-black uppercase tracking-wide text-white shadow-lg transition hover:bg-red-700"
              >
                Comprar ingresso
              </Link>
            </article>

            <article className="rounded-[2rem] bg-white p-5 shadow-xl ring-1 ring-yellow-200">
              <p className="inline-flex rounded-full bg-yellow-400 px-4 py-2 text-xs font-black uppercase tracking-wide text-gray-950">
                Próximo evento
              </p>

              <h2 className="mt-4 text-2xl font-black leading-tight text-gray-950">
                Ingresso do Ecossistema Hot Dogueres
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-gray-700">
                Projeto Gastronomia que Salva Vidas — HEMOSE. Um evento para
                unir solidariedade, alimento, cultura e amor ao próximo.
              </p>

              <div className="relative mt-5 h-72 overflow-hidden rounded-[1.5rem] bg-gray-50 shadow-inner">
                <Image
                  src="/ingressos/gastronomia-que-salva-vidas-hemose.png"
                  alt="Ingresso Gastronomia que Salva Vidas HEMOSE"
                  fill
                  sizes="(max-width: 1024px) 100vw, 520px"
                  className="object-contain p-3"
                  unoptimized
                />
              </div>

              <Link
                href="#ingressos"
                className="mt-5 flex w-full justify-center rounded-full bg-yellow-400 px-5 py-3 text-xs font-black uppercase tracking-wide text-gray-950 shadow-lg transition hover:bg-yellow-500"
              >
                Ver ingresso
              </Link>
            </article>

            {CAMISAS_EVENTOS.map((camisa, index) => {
              const selecao = camisasSelecionadas[camisa.id];
              const quantidadeSelecionada = selecao?.quantidade || 1;
              const quantidadeCompra = quantidadeSelecionada;
              const tamanhoSelecionado = selecao?.tamanho || "M";

              const valorTotal = quantidadeCompra * VALOR_CAMISA_EVENTO;
              const ingressosTotal =
                quantidadeCompra * INGRESSOS_SIMBOLICOS_POR_CAMISA;
              const kgTotal = quantidadeCompra * KG_ALIMENTOS_POR_CAMISA;

              const primeiraCamisa = index === 0;

              return (
                <article
                  key={camisa.id}
                  className={`rounded-[2rem] bg-white p-5 shadow-xl ring-1 ${
                    primeiraCamisa ? "ring-red-100" : "ring-green-100"
                  }`}
                >
                  <p
                    className={`inline-flex rounded-full px-4 py-2 text-xs font-black uppercase tracking-wide ${
                      primeiraCamisa
                        ? "bg-gray-950 text-white"
                        : "bg-green-600 text-white"
                    }`}
                  >
                    Camisa oficial do evento
                  </p>

                  <h2 className="mt-4 text-2xl font-black leading-tight text-gray-950">
                    {camisa.titulo}
                  </h2>

                  <p className="mt-3 text-sm leading-relaxed text-gray-700">
                    {camisa.descricao}
                  </p>

                  <div className="relative mt-5 h-72 overflow-hidden rounded-[1.5rem] bg-gray-50 shadow-inner">
                    <Image
                      src={camisa.imagem}
                      alt={camisa.titulo}
                      fill
                      sizes="(max-width: 1024px) 100vw, 520px"
                      className="object-contain p-3"
                      unoptimized
                    />
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl bg-gray-50 p-4 text-center shadow-sm">
                      <p className="text-[10px] font-black uppercase text-gray-500">
                        Valor
                      </p>

                      <p className="mt-1 text-2xl font-black text-red-600">
                        {formatarMoeda(VALOR_CAMISA_EVENTO)}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-yellow-50 p-4 text-center shadow-sm">
                      <p className="text-[10px] font-black uppercase text-gray-500">
                        Ingressos
                      </p>

                      <p className="mt-1 text-2xl font-black text-gray-950">
                        +{ingressosTotal}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-green-50 p-4 text-center shadow-sm">
                      <p className="text-[10px] font-black uppercase text-gray-500">
                        Alimentos
                      </p>

                      <p className="mt-1 text-2xl font-black text-green-700">
                        +{kgTotal} kg
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 rounded-2xl bg-gray-50 p-4 shadow-sm">
                    <p className="text-[10px] font-black uppercase tracking-wide text-gray-500">
                      Escolha o tamanho
                    </p>

                    <div className="mt-3 grid grid-cols-4 gap-2">
                      {(["P", "M", "G", "GG"] as TamanhoCamisa[]).map(
                        (tamanho) => (
                          <button
                            key={tamanho}
                            type="button"
                            onClick={() =>
                              alterarTamanhoCamisa(camisa.id, tamanho)
                            }
                            className={`rounded-full px-4 py-3 text-sm font-black transition ${
                              tamanhoSelecionado === tamanho
                                ? primeiraCamisa
                                  ? "bg-red-600 text-white shadow-md"
                                  : "bg-green-600 text-white shadow-md"
                                : "bg-white text-gray-950 hover:bg-red-50"
                            }`}
                          >
                            {tamanho}
                          </button>
                        ),
                      )}
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => alterarQuantidadeCamisa(camisa.id, -1)}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl font-black text-red-600 shadow-md transition hover:bg-red-100"
                    >
                      -
                    </button>

                    <span className="min-w-10 text-center text-2xl font-black text-gray-950">
                      {quantidadeSelecionada}
                    </span>

                    <button
                      type="button"
                      onClick={() => alterarQuantidadeCamisa(camisa.id, 1)}
                      className={`flex h-10 w-10 items-center justify-center rounded-full text-xl font-black text-white shadow-md transition ${
                        primeiraCamisa
                          ? "bg-red-600 hover:bg-red-700"
                          : "bg-green-600 hover:bg-green-700"
                      }`}
                    >
                      +
                    </button>
                  </div>

                  <div className="mt-5 rounded-2xl bg-gray-50 p-4 text-center shadow-sm">
                    <p className="text-[10px] font-black uppercase text-gray-500">
                      Total da compra
                    </p>

                    <p className="mt-1 text-2xl font-black text-gray-950">
                      {formatarMoeda(valorTotal)}
                    </p>

                    <p className="mt-1 text-xs font-bold text-green-700">
                      {ingressosTotal} ingressos simbólicos + {kgTotal} kg de
                      alimentos
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => comprarCamisa(camisa)}
                    className={`mt-5 flex w-full justify-center rounded-full px-5 py-3 text-xs font-black uppercase tracking-wide text-white shadow-lg transition ${
                      primeiraCamisa
                        ? "bg-gray-950 hover:bg-gray-800"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    Comprar camisa no Mercado Pago
                  </button>
                </article>
              );
            })}
          </div>

          <div className="mt-6 rounded-[2rem] bg-gray-950 p-5 text-white shadow-xl md:p-8">
            <div className="text-center">
              <p className="inline-flex rounded-full bg-yellow-400 px-4 py-2 text-xs font-black uppercase tracking-wide text-gray-950">
                Contagem regressiva
              </p>

              <h2 className="mt-4 text-3xl font-black leading-tight">
                Próximo evento: 12 de dezembro de 2026
              </h2>

              <p className="mx-auto mt-3 max-w-3xl text-sm font-bold leading-relaxed text-gray-300">
                Apresentação do Ecossistema Hot Dogueres, no Parque da
                Sementeira, em Aracaju.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
              <div className="rounded-2xl bg-white p-4 text-center text-gray-950">
                <p className="text-4xl font-black text-red-600">
                  {mostrarTempo(tempoRestante.dias)}
                </p>
                <p className="text-[10px] font-black uppercase text-gray-500">
                  dias
                </p>
              </div>

              <div className="rounded-2xl bg-white p-4 text-center text-gray-950">
                <p className="text-4xl font-black text-red-600">
                  {mostrarTempo(tempoRestante.horas)}
                </p>
                <p className="text-[10px] font-black uppercase text-gray-500">
                  horas
                </p>
              </div>

              <div className="rounded-2xl bg-white p-4 text-center text-gray-950">
                <p className="text-4xl font-black text-red-600">
                  {mostrarTempo(tempoRestante.minutos)}
                </p>
                <p className="text-[10px] font-black uppercase text-gray-500">
                  minutos
                </p>
              </div>

              <div className="rounded-2xl bg-white p-4 text-center text-gray-950">
                <p className="text-4xl font-black text-red-600">
                  {mostrarTempo(tempoRestante.segundos)}
                </p>
                <p className="text-[10px] font-black uppercase text-gray-500">
                  segundos
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div id="ingressos" className="scroll-mt-28 space-y-8 px-4 pb-8">
        <SecaoIngressoApresentacaoDoEcossistemaHotDogueres
          kgDoados={kgAlimentosTermometro}
          metaKg={META_DOACAO_KG}
          ingressosVendidos={ingressosVendidosParaExibicao}
        />

        <SecaoIngressosColecionaveis />
      </div>

      <section id="livros" className="scroll-mt-28 px-4 pb-8">
        <div className="mx-auto max-w-6xl rounded-[2rem] bg-white p-5 shadow-xl md:p-6">
          <div className="text-center">
            <p className="inline-flex rounded-full bg-purple-700 px-5 py-2 text-xs font-black uppercase tracking-wide text-white">
              Livros colecionáveis
            </p>

            <h2 className="mt-3 text-2xl font-black leading-tight md:text-3xl">
              A Jornada Hot Dogueres em pré-venda
            </h2>

            <p className="mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-gray-700">
              A coleção terá 18 edições. A primeira edição acompanha a caixa box
              colecionável, o Livro 1 e adesivos especiais. Do segundo livro em
              diante, cada edição será liberada mensalmente para pré-venda.
            </p>

            <div className="mx-auto mt-5 max-w-4xl rounded-[1.5rem] bg-yellow-50 p-5 text-left ring-1 ring-yellow-200">
              <p className="text-xs font-black uppercase tracking-wide text-yellow-700">
                Como funciona a produção dos livros
              </p>

              <h3 className="mt-2 text-xl font-black text-gray-950">
                Pré-venda, produção por encomenda e entrega mensal
              </h3>

              <div className="mt-3 space-y-3 text-sm leading-relaxed text-gray-700">
                <p>
                  A coleção será produzida de forma planejada, sem estoque
                  parado. Cada edição terá um período automático de pré-venda e
                  a entrega acontecerá mensalmente, sempre no dia{" "}
                  <strong>12</strong>.
                </p>

                <p>
                  Em Janeiro será entregue o <strong>Box + Livro 1</strong>. Em
                  fevereiro será entregue o <strong>Livro 2</strong>. Em março
                  será entregue o <strong>Livro 3</strong>, e assim
                  sucessivamente até completar as 18 edições.
                </p>

                <p>
                  Depois que a pré-venda de uma edição terminar, ela continuará
                  disponível como <strong>pedido sob encomenda</strong>.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
  <input type="checkbox" id="toggle-livros-mobile" className="peer hidden" />
  {LIVROS_PREVENDA.map((livro, index) => {

              const compraLiberada = livroEstaLiberadoParaCompra(livro);
              const statusLivro = textoStatusLivro(livro);
              const valorCompra = valorPrincipalLivro(livro);
              const livroFuturo = livroAindaNaoLiberado(livro);
              const textoEntrega = textoEntregaLivro(livro);

              return (
               <article
                  key={livro.id}
                  className={`group relative z-0 flex flex-col rounded-[2rem] p-5 shadow-md ring-1 transition-all duration-300 ease-out hover:z-20 hover:-translate-y-2 hover:scale-[1.03] hover:shadow-2xl ${
                    index > 0 ? "hidden md:flex peer-checked:flex" : ""
                  } ${
                    livro.destaque
                      ? "bg-yellow-50 ring-yellow-200 hover:ring-yellow-400"
                      : "bg-purple-50 ring-purple-100 hover:ring-purple-300"
                  }`}
                >

                  {livro.destaque && (
                    <div className="absolute left-5 top-5 z-10 rounded-full bg-yellow-400 px-4 py-2 text-[10px] font-black uppercase tracking-wide text-gray-950 shadow-lg">
                      Edição especial
                    </div>
                  )}

                  {livroFuturo && (
                    <div className="absolute right-5 top-5 z-10 rounded-full bg-gray-950 px-4 py-2 text-[10px] font-black uppercase tracking-wide text-white shadow-lg">
                      Bloqueado
                    </div>
                  )}

                  <div className="relative h-80 overflow-hidden rounded-[1.5rem] bg-white shadow-sm">
                    <Image
                      src={livro.imagem}
                      alt={livro.titulo}
                      fill
                      sizes="(max-width: 768px) 100vw, 360px"
                      className="object-contain p-2 transition-transform duration-300 ease-out group-hover:scale-105"
                      unoptimized
                    />

                    <button
                      type="button"
                      onClick={() => setLivroAmpliado(livro)}
                      className="absolute bottom-4 right-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-red-600 text-xl font-black text-white shadow-lg transition hover:scale-110 hover:bg-red-700"
                      aria-label={`Ampliar ${livro.titulo}`}
                      title="Ver detalhes"
                    >
                      🔍
                    </button>
                  </div>

                  <p
                    className={`mt-4 text-xs font-black uppercase tracking-wide ${
                      livro.destaque ? "text-yellow-700" : "text-purple-700"
                    }`}
                  >
                    {livro.subtitulo}
                  </p>

                  <h3 className="mt-3 text-2xl font-black leading-tight text-gray-950">
                    {livro.titulo}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-gray-700">
                    {livro.descricao}
                  </p>

                  <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
                    <p className="text-[10px] font-black uppercase tracking-wide text-gray-500">
                      Inclui
                    </p>

                    <ul className="mt-3 space-y-2">
                      {livro.inclui.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2 text-sm font-bold text-gray-700"
                        >
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-xs text-green-700">
                            ✓
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 grid gap-3">
                    <div className="rounded-2xl bg-white p-4 text-center shadow-sm">
                      <p className="text-[10px] font-black uppercase text-gray-500">
                        Valor normal
                      </p>

                      <p className="mt-1 text-2xl font-black text-gray-950">
                        {formatarMoeda(livro.valor)}
                      </p>
                    </div>

                    {livro.valorPromocional !== undefined && (
                      <div className="rounded-2xl bg-yellow-400 p-4 text-center shadow-sm">
                        <p className="text-[10px] font-black uppercase text-gray-800">
                          Valor promocional
                        </p>

                        <p className="mt-1 text-3xl font-black text-gray-950">
                          {formatarMoeda(livro.valorPromocional)}
                        </p>
                      </div>
                    )}

                    <div className="rounded-2xl bg-purple-700 p-4 text-center shadow-sm">
                      <p className="text-[10px] font-black uppercase text-purple-100">
                        Valor para membro
                      </p>

                      <p className="mt-1 text-2xl font-black text-white">
                        {formatarMoeda(livro.valorMembro)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 rounded-2xl bg-white p-4 text-center shadow-sm">
                    <p className="text-[10px] font-black uppercase tracking-wide text-gray-500">
                      Status
                    </p>

                    <p
                      className={`mt-1 text-sm font-black ${
                        compraLiberada ? "text-green-700" : "text-red-600"
                      }`}
                    >
                      {statusLivro}
                    </p>

                    <p className="mt-1 text-xs font-bold text-gray-500">
                      Pré-venda: {formatarPeriodoPreVenda(livro)}
                    </p>

                    <p className="mt-1 text-xs font-bold text-gray-500">
                      {textoEntrega}
                    </p>
                  </div>

                  <div className="mt-5 grid gap-3">
                    <button
                      type="button"
                      onClick={() => setLivroAmpliado(livro)}
                      className="flex w-full justify-center rounded-full border border-red-200 bg-white px-5 py-3 text-xs font-black uppercase tracking-wide text-red-600 shadow-sm transition hover:bg-red-50"
                    >
                      Ver detalhes
                    </button>

                    {compraLiberada ? (
                      <Link
                        href={montarLinkCompraLivro({
                          livro,
                          valor: valorCompra,
                        })}
                        
                        className="flex w-full justify-center rounded-full bg-red-600 px-5 py-3 text-xs font-black uppercase tracking-wide text-white shadow-lg transition hover:bg-red-700"
                      >
                        {livroEstaEmPreVenda(livro)
                          ? "Comprar na pré-venda"
                          : "Comprar sob encomenda"}
                      </Link>
                    ) : (
                      <button
                        type="button"
                        disabled
                        className="flex w-full cursor-not-allowed justify-center rounded-full bg-gray-300 px-5 py-3 text-xs font-black uppercase tracking-wide text-gray-600 shadow-sm"
                      >
                        Compra bloqueada
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
            <label htmlFor="toggle-livros-mobile" className="col-span-full block cursor-pointer rounded-full bg-purple-700 px-6 py-4 text-center text-sm font-black uppercase tracking-wide text-white shadow-lg peer-checked:hidden md:hidden">
  Ver os outros 17 livros
</label>

          </div>
        </div>
      </section>

      <section id="kits-alimentos" className="scroll-mt-28 px-4 pb-8">
        <div className="mx-auto max-w-6xl rounded-[2rem] bg-white p-5 shadow-xl md:p-6">
          <div className="text-center">
            <p className="inline-flex rounded-full bg-red-600 px-5 py-2 text-xs font-black uppercase tracking-wide text-white">
              Kits de alimentos
            </p>

            <h2 className="mt-3 text-2xl font-black leading-tight md:text-3xl">
              Compre um kit solidário sem cadastro
            </h2>
          </div>

                    <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <input type="checkbox" id="toggle-kits-alimentos-mobile" className="peer hidden" />
            {KITS_ALIMENTOS.map((kit, index) => {
              const quantidadeSelecionada = quantidadesAlimentos[kit.id] || 1;

              const quantidadeCompra = quantidadeSelecionada || 1;
              const totalValorSelecionado =
                quantidadeSelecionada * kit.valorNumero;
              const totalKgSelecionado = quantidadeSelecionada * kit.pesoKg;

                            return (
                <article
                  key={kit.id}
                  className={`group relative z-0 flex flex-col rounded-[2rem] bg-red-50 p-5 shadow-md ring-1 ring-red-100 transition-all duration-300 ease-out hover:z-20 hover:-translate-y-2 hover:scale-[1.04] hover:shadow-2xl hover:ring-red-300 ${
                    index !== 1 ? "hidden md:flex peer-checked:flex" : ""
                  }`}
                >

                  <div className="relative h-72 overflow-hidden rounded-[1.5rem] bg-white shadow-sm">
                    <Image
                      src={kit.imagem}
                      alt={kit.titulo}
                      fill
                      sizes="(max-width: 768px) 100vw, 260px"
                      className="object-contain p-1 transition-transform duration-300 ease-out group-hover:scale-110"
                      unoptimized
                    />
                  </div>

                  <p className="mt-4 text-xs font-black uppercase tracking-wide text-red-600">
                    Alimento e dignidade
                  </p>

                  <h3 className="mt-3 text-xl font-black text-gray-950">
                    {kit.titulo}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-gray-700">
                    {kit.descricao}
                  </p>

                  <div className="mt-4 rounded-2xl bg-white p-4 text-center shadow-sm">
                    <p className="text-[10px] font-black uppercase text-gray-500">
                      Valor do kit
                    </p>

                    <p className="mt-1 text-3xl font-black text-red-600">
                      {kit.valor}
                    </p>

                    <p className="mt-1 text-xs font-bold text-gray-600">
                      {kit.quantidade}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => alterarQuantidadeAlimento(kit.id, -1)}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl font-black text-red-600 shadow-md transition hover:bg-red-100"
                    >
                      -
                    </button>

                    <span className="min-w-10 text-center text-2xl font-black text-gray-950">
                      {quantidadeSelecionada}
                    </span>

                    <button
                      type="button"
                      onClick={() => alterarQuantidadeAlimento(kit.id, 1)}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-xl font-black text-white shadow-md transition hover:bg-red-700"
                    >
                      +
                    </button>
                  </div>

                  <div className="mt-4 rounded-2xl bg-white p-4 text-center shadow-sm">
                    <p className="text-[10px] font-black uppercase text-gray-500">
                      Total selecionado
                    </p>

                    <p className="mt-1 text-lg font-black text-gray-950">
                      {formatarMoeda(totalValorSelecionado)}
                    </p>

                    <p className="mt-1 text-xs font-bold text-green-700">
                      {totalKgSelecionado.toLocaleString("pt-BR")} kg de
                      alimentos
                    </p>
                  </div>

                  <Link
                    href={montarLinkCheckout({
                      href: kit.href,
                      kit: kit.id,
                      titulo: kit.titulo,
                      quantidade: quantidadeCompra,
                      valor: quantidadeCompra * kit.valorNumero,
                      kg: quantidadeCompra * kit.pesoKg,
                    })}
                    className="mt-5 flex w-full justify-center rounded-full bg-red-600 px-5 py-3 text-xs font-black uppercase tracking-wide text-white shadow-lg transition hover:bg-red-700"
                  >
                    Comprar agora
                  </Link>
                </article>
              );
                        })}
            <label htmlFor="toggle-kits-alimentos-mobile" className="col-span-full block cursor-pointer rounded-full bg-red-600 px-6 py-4 text-center text-sm font-black uppercase tracking-wide text-white shadow-lg peer-checked:hidden md:hidden">
              Ver outras opções de kits
            </label>
          </div>
        </div>
      </section>

      <section id="kits-racao" className="scroll-mt-28 px-4 pb-8">
        <div className="mx-auto max-w-6xl rounded-[2rem] bg-white p-5 shadow-xl md:p-6">
          <div className="text-center">
            <p className="inline-flex rounded-full bg-blue-600 px-5 py-2 text-xs font-black uppercase tracking-wide text-white">
              Kits de ração
            </p>

            <h2 className="mt-3 text-2xl font-black leading-tight md:text-3xl">
              Ajude cães e gatos em situação de vulnerabilidade
            </h2>
          </div>

                   <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <input type="checkbox" id="toggle-kits-racao-mobile" className="peer hidden" />
            {KITS_RACAO.map((kit, index) => {
              const quantidadeSelecionada = quantidadesRacao[kit.id] || 1;

              const quantidadeCompra = quantidadeSelecionada || 1;
              const totalValorSelecionado =
                quantidadeSelecionada * kit.valorNumero;
              const totalKgSelecionado = quantidadeSelecionada * kit.pesoKg;

                         return (
                <article
                  key={kit.id}
                  className={`group relative z-0 flex flex-col rounded-[2rem] bg-blue-50 p-5 shadow-md ring-1 ring-blue-100 transition-all duration-300 ease-out hover:z-20 hover:-translate-y-2 hover:scale-[1.04] hover:shadow-2xl hover:ring-blue-300 ${
                    index !== 0 ? "hidden md:flex peer-checked:flex" : ""
                  }`}
                >

                  <div className="relative h-72 overflow-hidden rounded-[1.5rem] bg-white shadow-sm">
                    <Image
                      src={kit.imagem}
                      alt={kit.titulo}
                      fill
                      sizes="(max-width: 768px) 100vw, 260px"
                      className="object-contain p-1 transition-transform duration-300 ease-out group-hover:scale-110"
                      unoptimized
                    />
                  </div>

                  <p className="mt-4 text-xs font-black uppercase tracking-wide text-blue-600">
                    Proteção animal
                  </p>

                  <h3 className="mt-3 text-xl font-black text-gray-950">
                    {kit.titulo}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-gray-700">
                    {kit.descricao}
                  </p>

                  <div className="mt-4 rounded-2xl bg-white p-4 text-center shadow-sm">
                    <p className="text-[10px] font-black uppercase text-gray-500">
                      Valor do kit
                    </p>

                    <p className="mt-1 text-3xl font-black text-blue-600">
                      {kit.valor}
                    </p>

                    <p className="mt-1 text-xs font-bold text-gray-600">
                      {kit.quantidade}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => alterarQuantidadeRacao(kit.id, -1)}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl font-black text-blue-600 shadow-md transition hover:bg-blue-100"
                    >
                      -
                    </button>

                    <span className="min-w-10 text-center text-2xl font-black text-gray-950">
                      {quantidadeSelecionada}
                    </span>

                    <button
                      type="button"
                      onClick={() => alterarQuantidadeRacao(kit.id, 1)}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-xl font-black text-white shadow-md transition hover:bg-blue-700"
                    >
                      +
                    </button>
                  </div>

                  <div className="mt-4 rounded-2xl bg-white p-4 text-center shadow-sm">
                    <p className="text-[10px] font-black uppercase text-gray-500">
                      Total selecionado
                    </p>

                    <p className="mt-1 text-lg font-black text-gray-950">
                      {formatarMoeda(totalValorSelecionado)}
                    </p>

                    <p className="mt-1 text-xs font-bold text-green-700">
                      {totalKgSelecionado.toLocaleString("pt-BR")} kg de ração
                    </p>
                  </div>

                  <Link
                    href={montarLinkCheckout({
                      href: kit.href,
                      kit: kit.id,
                      titulo: kit.titulo,
                      quantidade: quantidadeCompra,
                      valor: quantidadeCompra * kit.valorNumero,
                      kg: quantidadeCompra * kit.pesoKg,
                    })}
                    className="mt-5 flex w-full justify-center rounded-full bg-blue-600 px-5 py-3 text-xs font-black uppercase tracking-wide text-white shadow-lg transition hover:bg-blue-700"
                  >
                    Comprar agora
                  </Link>
                </article>
              );
                  })}
            <label htmlFor="toggle-kits-racao-mobile" className="col-span-full block cursor-pointer rounded-full bg-blue-600 px-6 py-4 text-center text-sm font-black uppercase tracking-wide text-white shadow-lg peer-checked:hidden md:hidden">
              Ver outras opções de kits
            </label>
          </div>
        </div>
      </section>

      <section className="px-4 pb-12">
        <div className="mx-auto max-w-6xl rounded-[2rem] bg-red-600 p-6 text-center text-white shadow-xl md:p-10">

          <p className="inline-flex rounded-full bg-white px-5 py-2 text-xs font-black uppercase tracking-wide text-red-600">
            Faça parte dessa missão
          </p>

          <h2 className="mt-5 text-3xl font-black leading-tight md:text-5xl">
            Cada ingresso, camisa, livro ou kit comprado ajuda a transformar
            essa meta em realidade.
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-base font-bold leading-relaxed text-red-50 md:text-lg">
            O Ecossistema Hot Dogueres nasceu para unir cultura, alimento,
            solidariedade, proteção animal e participação da comunidade. A sua
            compra fortalece os eventos, ajuda na arrecadação de alimentos,
            apoia a compra de ração e aproxima empresas, famílias e pessoas de
            uma causa maior.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl bg-white p-5 text-gray-950 shadow-lg">
              <p className="text-3xl">🎟️</p>
              <h3 className="mt-3 text-xl font-black">Compre seu ingresso</h3>
              <p className="mt-2 text-sm font-bold leading-relaxed text-gray-600">
                Participe dos eventos e ajude a movimentar a meta solidária.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-5 text-gray-950 shadow-lg">
              <p className="text-3xl">📚</p>
              <h3 className="mt-3 text-xl font-black">Garanta os livros</h3>
              <p className="mt-2 text-sm font-bold leading-relaxed text-gray-600">
                Colecione a Jornada Hot Dogueres e apoie a construção do
                projeto.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-5 text-gray-950 shadow-lg">
              <p className="text-3xl">❤️</p>
              <h3 className="mt-3 text-xl font-black">
                Doe alimentos ou ração
              </h3>
              <p className="mt-2 text-sm font-bold leading-relaxed text-gray-600">
                Escolha um kit solidário e acompanhe sua ajuda no termômetro.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="#ingressos"
              className="rounded-full bg-white px-7 py-4 text-sm font-black uppercase tracking-wide text-red-600 shadow-lg transition hover:-translate-y-1 hover:bg-red-50"
            >
              Ver ingressos
            </Link>

            <Link
              href="#kits-alimentos"
              className="rounded-full bg-yellow-400 px-7 py-4 text-sm font-black uppercase tracking-wide text-gray-950 shadow-lg transition hover:-translate-y-1 hover:bg-yellow-500"
            >
              Comprar kit solidário
            </Link>

            <Link
              href="/parceiros-empresas"
              className="rounded-full bg-gray-950 px-7 py-4 text-sm font-black uppercase tracking-wide text-white shadow-lg transition hover:-translate-y-1 hover:bg-gray-800"
            >
              Seja patrocinador
            </Link>
          </div>

          <p className="mx-auto mt-6 max-w-3xl text-xs font-bold leading-relaxed text-red-100">
            Transparência, organização e impacto social serão acompanhados pelo
            site. Esta página será o principal instrumento de divulgação, venda
            e mobilização do Ecossistema Hot Dogueres.
          </p>
        </div>
      </section>

      <section className="px-4 pb-12">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[2.2rem] bg-gray-950 shadow-xl">
          <div className="grid lg:grid-cols-[1fr_0.8fr]">
            <div className="relative min-h-[230px] bg-black md:min-h-[300px]">
              <video
                key={patrocinador.video}
                src={patrocinador.video}
                className="absolute inset-0 h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-2xl font-black text-white">
                  {patrocinador.nome}
                </p>

                <p className="mt-1 text-xs font-black uppercase tracking-wide text-yellow-300">
                  Patrocinador oficial
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-center p-6 text-white">
              <p className="inline-flex w-fit rounded-full bg-yellow-400/20 px-4 py-2 text-xs font-black uppercase tracking-wide text-yellow-300">
                Patrocinadores
              </p>

              <h2 className="mt-4 text-2xl font-black leading-tight">
                Quem fortalece essa causa
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-gray-300">
                Espaço para vídeos curtos, rodando automaticamente, sem som e em
                loop.
              </p>

              <div className="mt-5 rounded-2xl bg-white p-4 text-gray-950">
                <p className="text-xs font-black uppercase tracking-wide text-red-600">
                  Contato
                </p>

                <p className="mt-2 text-sm font-bold text-gray-700">
                  {patrocinador.contato}
                </p>
              </div>

              <div className="mt-5 flex gap-2">
                {PATROCINADORES.map((item, index) => (
                  <button
                    key={item.nome}
                    type="button"
                    onClick={() => setPatrocinadorAtual(index)}
                    className={`h-3 rounded-full transition ${
                      patrocinadorAtual === index
                        ? "w-10 bg-yellow-400"
                        : "w-3 bg-white/40 hover:bg-white/70"
                    }`}
                    aria-label={`Ir para patrocinador ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-red-100 bg-white px-4 py-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-center md:flex-row md:items-center md:justify-between md:text-left">
          <div>
            <p className="font-black text-gray-950">Hot Dogueres Solidário</p>

            <p className="mt-1 text-sm text-gray-500">
              Cultura, alimento, solidariedade e memória.
            </p>
          </div>

          <div className="text-sm font-bold text-gray-600">
            <p>Contato: (79) 98131 4109</p>
            <p>Email: contato@hotdogueres.com.br</p>
          </div>
        </div>
      </footer>

      {livroAmpliado && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-2 md:p-4"
          onClick={() => setLivroAmpliado(null)}
        >
          <div
            className="relative grid max-h-[96vh] w-full max-w-[96vw] overflow-hidden rounded-[2rem] bg-white shadow-2xl lg:grid-cols-[1.35fr_0.65fr]"
            onClick={(evento) => evento.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLivroAmpliado(null)}
              className="absolute right-4 top-4 z-30 rounded-full bg-red-600 px-4 py-2 text-xs font-black uppercase tracking-wide text-white shadow-lg transition hover:bg-red-700"
            >
              Fechar
            </button>

            <div className="relative min-h-[68vh] bg-gray-100 lg:min-h-[92vh]">
              <Image
                src={livroAmpliado.imagem}
                alt={livroAmpliado.titulo}
                fill
                sizes="100vw"
                className="object-contain p-1 md:p-2"
                unoptimized
                priority
              />
            </div>

            <div className="max-h-[92vh] overflow-y-auto p-5 md:p-7">
              <p className="inline-flex rounded-full bg-purple-700 px-4 py-2 text-xs font-black uppercase tracking-wide text-white">
                Livro colecionável
              </p>

              <h2 className="mt-4 text-2xl font-black leading-tight text-gray-950 md:text-4xl">
                {livroAmpliado.titulo}
              </h2>

              <p className="mt-3 text-sm font-black uppercase tracking-wide text-purple-700">
                {livroAmpliado.subtitulo}
              </p>

              <p className="mt-5 text-base leading-relaxed text-gray-700">
                {livroAmpliado.descricao}
              </p>

              <div className="mt-6 rounded-2xl bg-gray-50 p-5">
                <p className="text-xs font-black uppercase tracking-wide text-gray-500">
                  O que acompanha
                </p>

                <ul className="mt-4 space-y-3">
                  {livroAmpliado.inclui.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-sm font-bold text-gray-700"
                    >
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-xs text-green-700">
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-gray-50 p-4 text-center">
                  <p className="text-[10px] font-black uppercase text-gray-500">
                    Valor normal
                  </p>

                  <p className="mt-1 text-2xl font-black text-gray-950">
                    {formatarMoeda(livroAmpliado.valor)}
                  </p>
                </div>

                <div className="rounded-2xl bg-purple-700 p-4 text-center">
                  <p className="text-[10px] font-black uppercase text-purple-100">
                    Valor membro
                  </p>

                  <p className="mt-1 text-2xl font-black text-white">
                    {formatarMoeda(livroAmpliado.valorMembro)}
                  </p>
                </div>

                {livroAmpliado.valorPromocional !== undefined && (
                  <div className="rounded-2xl bg-yellow-400 p-4 text-center sm:col-span-2">
                    <p className="text-[10px] font-black uppercase text-gray-800">
                      Valor promocional
                    </p>

                    <p className="mt-1 text-3xl font-black text-gray-950">
                      {formatarMoeda(livroAmpliado.valorPromocional)}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-6 rounded-2xl bg-red-50 p-5 text-center ring-1 ring-red-100">
                <p className="text-xs font-black uppercase tracking-wide text-red-600">
                  Status da compra
                </p>

                <p className="mt-2 text-lg font-black text-gray-950">
                  {textoStatusLivro(livroAmpliado)}
                </p>

                <p className="mt-1 text-xs font-bold text-gray-600">
                  {livroAmpliado.dataLiberacaoTexto}
                </p>
              </div>

              <div className="mt-6">
                {livroEstaLiberadoParaCompra(livroAmpliado) ? (
                  <Link
                    href={montarLinkCompraLivro({
                      livro: livroAmpliado,
                      valor: valorPrincipalLivro(livroAmpliado),
                    })}
                    className="flex w-full justify-center rounded-full bg-red-600 px-6 py-4 text-sm font-black uppercase tracking-wide text-white shadow-lg transition hover:bg-red-700"
                  >
                    {livroEstaEmPreVenda(livroAmpliado)
                      ? "Comprar na pré-venda"
                      : "Comprar sob encomenda"}
                  </Link>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="flex w-full cursor-not-allowed justify-center rounded-full bg-gray-300 px-6 py-4 text-sm font-black uppercase tracking-wide text-gray-600"
                  >
                    Compra bloqueada
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}