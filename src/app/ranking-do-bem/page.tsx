import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import SetasNavegacao from "@/components/SetasNavegacao";

export const dynamic = "force-dynamic";

type CategoriaRanking = "pessoa-fisica" | "empresa";

type RegraPontuacao = {
  titulo: string;
  pontos: number | string;
  descricao: string;
};


type ParticipanteRanking = {
  id: string;
  nome: string;
  categoria: CategoriaRanking;
  tipo: "Pessoa física" | "Empresa";
  pontos: number;
  cidade?: string;
  destaque?: string;
  ultimaPontuacao?: string;
};

type CompraIngressoRankingDb = {
  quantidade: number | null;
  modelo_id: string | null;
  modelo_numero: number | null;
};

type PedidoCamisaRankingDb = {
  quantidade: number;
};

type PedidoKitRankingDb = {
  quantidade: number;
  valor_unitario: unknown;
};

type PedidoLivroRankingDb = {
  quantidade: number;
  livros: {
    numero_edicao: number;
    inclui_box: boolean | null;
  } | null;
};

type MembroClubeRankingDb = {
  id: string;
};

type UsuarioRankingDb = {
  id: string;
  nome: string;
  tipo: string | null;
  compras_ingressos: CompraIngressoRankingDb[];
  pedidos_camisa: PedidoCamisaRankingDb[];
  pedidos_kit_alimentacao: PedidoKitRankingDb[];
  pedidos_livro: PedidoLivroRankingDb[];
  membros_clube: MembroClubeRankingDb[];
};

const STATUS_APROVADOS = [
  "aprovado",
  "approved",
  "paid",
  "pago",
  "confirmado",
  "concluido",
  "concluído",
];

const STATUS_MEMBRO_ATIVO = ["ativo", "active"];

const REGRAS_PESSOA_FISICA: RegraPontuacao[] = [
  {
    titulo: "Compra de ingresso",
    pontos: 10,
    descricao: "Cada ingresso comprado e aprovado gera pontos.",
  },
  {
    titulo: "Clube de membros",
    pontos: 50,
    descricao: "Pontuação mensal para membros ativos do clube.",
  },
  {
    titulo: "Ingresso eternizado",
    pontos: 30,
    descricao: "Compra de ingresso colecionável ou eternizado.",
  },
  {
    titulo: "Compra de camisa",
    pontos: 25,
    descricao: "Cada camisa oficial comprada gera pontos.",
  },
  {
    titulo: "Kit solidário 01",
    pontos: 10,
    descricao: "Compra de kit de entrada de alimento ou ração.",
  },
  {
    titulo: "Kit solidário 02",
    pontos: 20,
    descricao: "Compra de kit intermediário de alimento ou ração.",
  },
  {
    titulo: "Kit solidário 03",
    pontos: 30,
    descricao: "Compra de kit avançado de alimento ou ração.",
  },
  {
    titulo: "Kit solidário 04",
    pontos: 50,
    descricao: "Compra do maior kit de alimento ou ração.",
  },
  {
    titulo: "Livro 1 / Box especial",
    pontos: 100,
    descricao: "Compra do primeiro livro ou kit box especial.",
  },
  {
    titulo: "Demais livros",
    pontos: 80,
    descricao: "Compra dos demais livros da coleção.",
  },
  {
    titulo: "Voluntário em evento",
    pontos: 100,
    descricao: "Participação confirmada como voluntário em ação social.",
  },
];

const REGRAS_EMPRESAS: RegraPontuacao[] = [
  {
    titulo: "Patrocínio confirmado",
    pontos: 150,
    descricao:
      "Pontuação inicial para empresas que confirmam patrocínio ou cota de evento no prazo.",
  },
  {
    titulo: "Presença no evento",
    pontos: 100,
    descricao:
      "Empresa com representante presente em evento, ação social ou projeto oficial.",
  },
  {
    titulo: "Ativação da marca",
    pontos: 150,
    descricao:
      "Montagem de stand, ação promocional, experiência de marca ou participação ativa no evento.",
  },
  {
    titulo: "Doação de produto",
    pontos: "100 a 300",
    descricao:
      "Doação de produtos, brindes, alimentos, água, ração ou materiais para ações do ecossistema.",
  },
  {
    titulo: "Ação social, animal ou ambiental",
    pontos: 150,
    descricao:
      "Participação em ações com crianças, comunidades, animais, reciclagem ou meio ambiente.",
  },
  {
    titulo: "Parceiro anual ativo",
    pontos: 100,
    descricao:
      "Pontuação mensal para empresas parceiras anuais com compromisso ativo e pagamento em dia.",
  },
  {
    titulo: "Divulgação oficial",
    pontos: 40,
    descricao:
      "Publicação autorizada da parceria nas redes sociais ou canais oficiais da empresa.",
  },
  {
    titulo: "Permuta aprovada",
    pontos: "100 a 1.000+",
    descricao:
      "Pontuação para permutas validadas manualmente conforme tamanho, recorrência e importância da entrega.",
  },
];


const ITENS_CALCULO = [
  "Compra aprovada no Mercado Pago",
  "Compra de ingresso comum",
  "Compra de ingresso colecionável",
  "Compra de camisa oficial",
  "Compra de kit solidário",
  "Compra dos livros da coleção",
  "Clube de membros ativo",
  "Validação manual da equipe",
  "Participação como voluntário",
];

function paraNumero(valor: unknown) {
  if (typeof valor === "number") {
    return Number.isFinite(valor) ? valor : 0;
  }

  if (typeof valor === "string") {
    const numero = Number(valor);
    return Number.isFinite(numero) ? numero : 0;
  }

  if (
    valor &&
    typeof valor === "object" &&
    "toNumber" in valor &&
    typeof (valor as { toNumber: () => number }).toNumber === "function"
  ) {
    return (valor as { toNumber: () => number }).toNumber();
  }

  const numero = Number(valor);

  return Number.isFinite(numero) ? numero : 0;
}

function obterCategoriaUsuario(tipoUsuario: string | null): CategoriaRanking {
  const tipo = String(tipoUsuario || "").toLowerCase();

  if (
    tipo.includes("empresa") ||
    tipo.includes("patrocinador") ||
    tipo.includes("parceiro")
  ) {
    return "empresa";
  }

  return "pessoa-fisica";
}

function obterPontosKit(valorUnitario: number) {
  if (valorUnitario <= 25) {
    return 10;
  }

  if (valorUnitario <= 80) {
    return 20;
  }

  if (valorUnitario <= 150) {
    return 30;
  }

  return 50;
}

function calcularPontuacaoUsuario(usuario: UsuarioRankingDb) {
  const pontosIngressos = usuario.compras_ingressos.reduce((total, compra) => {
    return total + (compra.quantidade || 0) * 10;
  }, 0);

  const pontosIngressosEternizados = usuario.compras_ingressos.reduce(
    (total, compra) => {
      const temModeloColecionavel =
        Boolean(compra.modelo_id) || Boolean(compra.modelo_numero);

      if (!temModeloColecionavel) {
        return total;
      }

      return total + (compra.quantidade || 0) * 30;
    },
    0
  );

  const pontosCamisas = usuario.pedidos_camisa.reduce((total, pedido) => {
    return total + pedido.quantidade * 25;
  }, 0);

  const pontosKits = usuario.pedidos_kit_alimentacao.reduce((total, pedido) => {
    const valorUnitario = paraNumero(pedido.valor_unitario);
    const pontosPorKit = obterPontosKit(valorUnitario);

    return total + pedido.quantidade * pontosPorKit;
  }, 0);

  const pontosLivros = usuario.pedidos_livro.reduce((total, pedido) => {
    const livro = pedido.livros;

    if (!livro) {
      return total;
    }

    const pontosPorLivro =
      livro.numero_edicao === 1 || livro.inclui_box ? 100 : 80;

    return total + pedido.quantidade * pontosPorLivro;
  }, 0);

  const pontosClube = usuario.membros_clube.length * 50;

  const total =
    pontosIngressos +
    pontosIngressosEternizados +
    pontosCamisas +
    pontosKits +
    pontosLivros +
    pontosClube;

  const destaques = [
    { texto: "Compra de ingresso aprovada", pontos: pontosIngressos },
    {
      texto: "Ingresso colecionável / eternizado",
      pontos: pontosIngressosEternizados,
    },
    { texto: "Compra de camisa oficial", pontos: pontosCamisas },
    { texto: "Compra de kit solidário", pontos: pontosKits },
    { texto: "Compra de livro da coleção", pontos: pontosLivros },
    { texto: "Membro ativo do clube", pontos: pontosClube },
  ];

  const maiorDestaque = destaques
    .filter((item) => item.pontos > 0)
    .sort((a, b) => b.pontos - a.pontos)[0];

  return {
    total,
    destaque: maiorDestaque?.texto || "Participante cadastrado",
  };
}

function ordenarRanking(participantes: ParticipanteRanking[]) {
  return [...participantes].sort((a, b) => b.pontos - a.pontos);
}

function filtrarRankingPorCategoria(
  participantes: ParticipanteRanking[],
  categoria: CategoriaRanking
) {
  return ordenarRanking(
    participantes.filter((participante) => participante.categoria === categoria)
  );
}

function somarPontos(participantes: ParticipanteRanking[]) {
  return participantes.reduce(
    (total, participante) => total + participante.pontos,
    0
  );
}

function obterClassePosicao(posicao: number) {
  if (posicao === 1) {
    return "bg-yellow-400 text-gray-950 ring-yellow-200";
  }

  if (posicao === 2) {
    return "bg-gray-300 text-gray-950 ring-gray-200";
  }

  if (posicao === 3) {
    return "bg-orange-500 text-white ring-orange-200";
  }

  return "bg-red-600 text-white ring-red-200";
}

function obterMedalha(posicao: number) {
  if (posicao === 1) {
    return "🥇";
  }

  if (posicao === 2) {
    return "🥈";
  }

  if (posicao === 3) {
    return "🥉";
  }

  return "⭐";
}

async function carregarParticipantesBanco(): Promise<ParticipanteRanking[]> {
  try {
    const usuarios = await prisma.usuarios.findMany({
      select: {
        id: true,
        nome: true,
        tipo: true,
        compras_ingressos: {
          where: {
            status: {
              in: STATUS_APROVADOS,
            },
          },
          select: {
            quantidade: true,
            modelo_id: true,
            modelo_numero: true,
          },
        },
        pedidos_camisa: {
          where: {
            status: {
              in: STATUS_APROVADOS,
            },
          },
          select: {
            quantidade: true,
          },
        },
        pedidos_kit_alimentacao: {
          where: {
            status: {
              in: STATUS_APROVADOS,
            },
          },
          select: {
            quantidade: true,
            valor_unitario: true,
          },
        },
        pedidos_livro: {
          where: {
            status: {
              in: STATUS_APROVADOS,
            },
          },
          select: {
            quantidade: true,
            livros: {
              select: {
                numero_edicao: true,
                inclui_box: true,
              },
            },
          },
        },
        membros_clube: {
          where: {
            status: {
              in: STATUS_MEMBRO_ATIVO,
            },
          },
          select: {
            id: true,
          },
        },
      },
    });

    return (usuarios as UsuarioRankingDb[])
      .map((usuario) => {
        const categoria = obterCategoriaUsuario(usuario.tipo);
        const pontuacao = calcularPontuacaoUsuario(usuario);

        const tipo: ParticipanteRanking["tipo"] =
          categoria === "empresa" ? "Empresa" : "Pessoa física";

        return {
          id: usuario.id,
          nome: usuario.nome,
          categoria,
          tipo,
          pontos: pontuacao.total,
          destaque: pontuacao.destaque,
          ultimaPontuacao: "Pontuação calculada automaticamente",
        };
      })
      .filter((participante) => participante.pontos > 0);
  } catch (erro) {
    console.error("Erro ao carregar Ranking do Bem:", erro);

    return [];
  }
}

function CardEstatistica({
  titulo,
  valor,
  detalhe,
  cor,
}: {
  titulo: string;
  valor: string | number;
  detalhe?: string;
  cor: string;
}) {
  return (
    <div className="rounded-[2rem] bg-white p-6 text-center shadow-xl ring-1 ring-red-100 transition hover:-translate-y-1 hover:shadow-2xl">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-500">
        {titulo}
      </p>

      <p className={`mt-3 text-4xl font-black md:text-5xl ${cor}`}>
        {valor}
      </p>

      {detalhe && (
        <p className="mt-2 text-sm font-bold text-gray-600">{detalhe}</p>
      )}
    </div>
  );
}


function ListaRanking({
  titulo,
  descricao,
  participantes,
  vazioTitulo,
  vazioDescricao,
}: {
  titulo: string;
  descricao: string;
  participantes: ParticipanteRanking[];
  vazioTitulo: string;
  vazioDescricao: string;
}) {
  return (
    <div className="rounded-[2rem] bg-white p-6 shadow-xl ring-1 ring-red-100 md:p-8">
      <div className="text-center">
        <p className="inline-flex rounded-full bg-yellow-400 px-5 py-2 text-xs font-black uppercase tracking-[0.2em] text-gray-950 shadow-sm">
          Classificação
        </p>

        <h2 className="mt-4 text-3xl font-black text-gray-950 md:text-4xl">
          {titulo}
        </h2>

        <p className="mx-auto mt-3 max-w-3xl text-sm font-bold leading-relaxed text-gray-600">
          {descricao}
        </p>
      </div>

      <div className="mt-8 space-y-4">
        {participantes.length > 0 ? (
          participantes.map((participante, index) => {
            const posicao = index + 1;

            return (
              <article
                key={participante.id}
                className="group flex flex-col gap-4 rounded-[1.5rem] bg-gradient-to-br from-gray-50 to-white p-5 shadow-sm ring-1 ring-gray-200 transition hover:-translate-y-1 hover:shadow-lg md:flex-row md:items-center md:justify-between"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-xl font-black shadow-sm ring-4 ${obterClassePosicao(
                      posicao
                    )}`}
                  >
                    {posicao}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-xl font-black text-gray-950">
                        {participante.nome}
                      </h3>

                      <span className="text-xl">{obterMedalha(posicao)}</span>
                    </div>

                    <p className="mt-1 text-sm font-bold text-gray-600">
                      {participante.tipo}
                      {participante.cidade ? ` • ${participante.cidade}` : ""}
                    </p>

                    {participante.destaque && (
                      <p className="mt-2 inline-flex rounded-full bg-red-50 px-3 py-1 text-xs font-black text-red-600">
                        {participante.destaque}
                      </p>
                    )}

                    {participante.ultimaPontuacao && (
                      <p className="mt-2 text-xs font-bold text-gray-500">
                        {participante.ultimaPontuacao}
                      </p>
                    )}
                  </div>
                </div>

                <div className="rounded-2xl bg-white px-6 py-4 text-center shadow-sm ring-1 ring-gray-100">
                  <p className="text-xs font-black uppercase tracking-wide text-gray-500">
                    Pontos
                  </p>

                  <p className="text-3xl font-black text-green-600">
                    {participante.pontos.toLocaleString("pt-BR")}
                  </p>
                </div>
              </article>
            );
          })
        ) : (
          <div className="rounded-[1.5rem] bg-gray-50 p-8 text-center ring-1 ring-gray-200">
            <p className="text-2xl font-black text-gray-950">{vazioTitulo}</p>

            <p className="mx-auto mt-3 max-w-2xl text-sm font-bold leading-relaxed text-gray-600">
              {vazioDescricao}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}


function CardRegraPontuacao({
  regra,
  variante,
}: {
  regra: RegraPontuacao;
  variante: "pessoa" | "empresa";
}) {
  const classes =
    variante === "pessoa"
      ? {
          fundo: "bg-red-50 ring-red-100",
          pontos: "bg-red-600 text-white",
        }
      : {
          fundo: "bg-gray-50 ring-gray-200",
          pontos: "bg-gray-950 text-white",
        };

  return (
    <div
      className={`rounded-2xl p-4 shadow-sm ring-1 transition hover:-translate-y-1 hover:shadow-md ${classes.fundo}`}
    >
      <div className="flex items-center justify-between gap-4">
        <h3 className="font-black text-gray-950">{regra.titulo}</h3>

        <span
          className={`shrink-0 rounded-full px-4 py-2 text-xs font-black shadow-sm ${classes.pontos}`}
        >
          +{regra.pontos} pts
        </span>
      </div>

      <p className="mt-2 text-sm font-semibold leading-relaxed text-gray-600">
        {regra.descricao}
      </p>
    </div>
  );
}
function CardImagemRanking() {
  return (
    <section className="px-4 py-10 md:py-14">

      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[2.5rem] bg-gray-950 text-white shadow-2xl ring-1 ring-gray-800 lg:grid-cols-[1fr_0.95fr]">
        <div className="flex flex-col justify-center p-6 md:p-10">
          <p className="inline-flex w-fit rounded-full bg-yellow-400 px-5 py-2 text-xs font-black uppercase tracking-[0.2em] text-gray-950">
            Reconhecimento solidário
          </p>

          <h2 className="mt-5 text-3xl font-black leading-tight md:text-5xl">
            Cada ponto conta uma atitude de bem.
          </h2>

          <p className="mt-5 text-base font-bold leading-relaxed text-white/80 md:text-lg">
            O Ranking do Bem reconhece pessoas, empresas, parceiros e
            patrocinadores que participam de ações sociais, ambientais,
            educacionais, solidárias e de proteção animal dentro do Ecossistema
            Hot Dogueres.
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {[
              "Compras solidárias",
              "Patrocínios",
              "Doações",
              "Voluntariado",
              "Proteção animal",
              "Meio ambiente",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl bg-white/10 p-4 text-sm font-black text-white ring-1 ring-white/10"
              >
                ✓ {item}
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[320px] bg-gradient-to-br from-red-600 via-yellow-400 to-green-500 md:min-h-[420px]">
          <Image
            src="/images/ranking-do-bem-cartoon.png"
            alt="Imagem representando o Ranking do Bem Hot Dogueres"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 560px"
            priority
          />

                  <div className="relative min-h-[320px] bg-gradient-to-br from-red-600 via-yellow-400 to-green-500 md:min-h-[420px]">
          <Image
            src="/images/ranking-do-bem-cartoon.png"
            alt="Imagem representando o Ranking do Bem Hot Dogueres"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 560px"
            priority
          />
        </div>

        </div>
      </div>
    </section>
  );
}

export default async function RankingDoBemPage({
  searchParams,
}: {
  searchParams?: Promise<{
    cadastro?: string;
  }>;
}) {
  const parametros = await searchParams;
  const cadastroSucesso = parametros?.cadastro === "sucesso";

  const participantes = await carregarParticipantesBanco();

  const rankingGeral = ordenarRanking(participantes);

  const rankingPessoaFisica = filtrarRankingPorCategoria(
    participantes,
    "pessoa-fisica"
  );


  const rankingEmpresas = filtrarRankingPorCategoria(participantes, "empresa");

  const totalParticipantes = rankingGeral.length;
  const totalPontos = somarPontos(rankingGeral);
  const totalPessoasFisicas = rankingPessoaFisica.length;
  const totalEmpresas = rankingEmpresas.length;

return (
  <main className="min-h-screen bg-[#fff7e8] text-gray-950">
    <CardImagemRanking />

  
    <section className="relative overflow-hidden px-4 pb-10 md:pb-14">
      <div className="absolute left-[-180px] top-[-180px] h-[360px] w-[360px] rounded-full bg-red-200/50 blur-3xl" />
      <div className="absolute right-[-180px] top-[120px] h-[420px] w-[420px] rounded-full bg-yellow-200/70 blur-3xl" />
      <div className="absolute bottom-[-200px] left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-green-200/30 blur-3xl" />

      <div className="relative mx-auto max-w-6xl rounded-[2.5rem] bg-white p-6 text-center shadow-2xl ring-1 ring-red-100 md:p-12">
        <p className="inline-flex rounded-full bg-red-600 px-5 py-2 text-xs font-black uppercase tracking-[0.2em] text-white shadow-md">
          Programa de pontuação solidária
        </p>

        <h1 className="mt-6 text-4xl font-black leading-tight text-gray-950 md:text-7xl">
          Ranking do Bem
        </h1>

        <p className="mx-auto mt-5 max-w-3xl text-base font-bold leading-relaxed text-gray-700 md:text-lg">
          Cada compra aprovada, participação, voluntariado ou parceria ajuda a
          fortalecer o Ecossistema Hot Dogueres e gera pontos para reconhecer
          quem transforma solidariedade em ação.
        </p>

        {cadastroSucesso && (
          <div className="mx-auto mt-6 max-w-3xl rounded-[1.5rem] bg-green-50 p-5 text-left ring-1 ring-green-200">
            <p className="text-sm font-black uppercase tracking-wide text-green-700">
              Cadastro recebido com sucesso
            </p>

            <p className="mt-2 text-sm font-bold leading-relaxed text-gray-700">
              Seu cadastro foi registrado. A pontuação será exibida quando
              existir uma ação aprovada no banco de dados.
            </p>
          </div>
        )}

        <div className="mx-auto mt-6 max-w-3xl rounded-[1.5rem] bg-yellow-50 p-5 ring-1 ring-yellow-200">
          <p className="text-sm font-black uppercase tracking-wide text-yellow-700">
            Ranking automático
          </p>

          <p className="mt-2 text-sm font-bold leading-relaxed text-gray-700">
            O sistema calcula os pontos diretamente pelo banco de dados,
            considerando apenas compras, assinaturas e ações aprovadas.
          </p>
        </div>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/cadastro?tipo=ranking-do-bem&perfil=pessoa-fisica"
            className="rounded-full bg-red-600 px-7 py-4 text-sm font-black uppercase tracking-wide text-white shadow-lg transition hover:-translate-y-1 hover:bg-red-700 hover:shadow-xl"
          >
            Participar como pessoa física
          </Link>

          <Link
            href="/cadastro?tipo=ranking-do-bem&perfil=empresa"
            className="rounded-full bg-gray-950 px-7 py-4 text-sm font-black uppercase tracking-wide text-white shadow-lg transition hover:-translate-y-1 hover:bg-gray-800 hover:shadow-xl"
          >
            Participar como empresa
          </Link>
        </div>
      </div>
    </section>


      <section className="px-4 pb-10">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-4">
          <CardEstatistica
            titulo="Participantes"
            valor={totalParticipantes}
            detalhe="Com pontos aprovados"
            cor="text-red-600"
          />

          <CardEstatistica
            titulo="Pontos distribuídos"
            valor={totalPontos.toLocaleString("pt-BR")}
            detalhe="Calculado pelo banco"
            cor="text-yellow-500"
          />

          <CardEstatistica
            titulo="Pessoas físicas"
            valor={totalPessoasFisicas}
            detalhe="Participantes individuais"
            cor="text-green-600"
          />

          <CardEstatistica
            titulo="Empresas"
            valor={totalEmpresas}
            detalhe="Parceiros e patrocinadores"
            cor="text-gray-950"
          />
        </div>
      </section>

      <section className="px-4 pb-10">
        <div className="mx-auto max-w-6xl">
          <ListaRanking
            titulo="Ranking geral"
            descricao="A classificação geral reúne pessoas físicas, empresas, patrocinadores, voluntários, membros e apoiadores."
            participantes={rankingGeral}
            vazioTitulo="O Ranking do Bem ainda vai começar"
            vazioDescricao="Assim que as primeiras compras, doações, participações ou parcerias forem aprovadas no banco de dados, os nomes aparecerão aqui automaticamente."
          />
        </div>
      </section>

      <section className="px-4 pb-10">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
          <ListaRanking
            titulo="Pessoa física"
            descricao="Ranking exclusivo para participantes individuais do Ecossistema Hot Dogueres."
            participantes={rankingPessoaFisica}
            vazioTitulo="Nenhuma pessoa física pontuada ainda"
            vazioDescricao="Os primeiros participantes aparecerão aqui após compras aprovadas, doações confirmadas ou participação validada em ações."
          />

          <ListaRanking
            titulo="Empresas"
            descricao="Ranking exclusivo para empresas, patrocinadores e parceiros."
            participantes={rankingEmpresas}
            vazioTitulo="Nenhuma empresa pontuada ainda"
            vazioDescricao="As empresas parceiras aparecerão aqui após confirmação de patrocínio, cota, apoio ou parceria anual."
          />
        </div>
      </section>

      <section className="px-4 pb-10">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
          <div className="rounded-[2rem] bg-white p-6 shadow-xl ring-1 ring-red-100 md:p-8">
            <p className="inline-flex rounded-full bg-red-600 px-5 py-2 text-xs font-black uppercase tracking-[0.2em] text-white">
              Pessoa física
            </p>

            <h2 className="mt-4 text-2xl font-black text-gray-950 md:text-3xl">
              Como ganhar pontos
            </h2>

            <p className="mt-3 text-sm font-bold leading-relaxed text-gray-600">
              Pontuação destinada aos participantes individuais: compradores,
              membros, doadores, voluntários e apoiadores.
            </p>

            <div className="mt-6 space-y-3">
              {REGRAS_PESSOA_FISICA.map((regra) => (
                <CardRegraPontuacao
                  key={regra.titulo}
                  regra={regra}
                  variante="pessoa"
                />
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] bg-white p-6 shadow-xl ring-1 ring-gray-200 md:p-8">
            <p className="inline-flex rounded-full bg-gray-950 px-5 py-2 text-xs font-black uppercase tracking-[0.2em] text-white">
              Empresas
            </p>

            <h2 className="mt-4 text-2xl font-black text-gray-950 md:text-3xl">
              Pontuação para parceiros
            </h2>

            <p className="mt-3 text-sm font-bold leading-relaxed text-gray-600">
              Pontuação destinada a empresas, patrocinadores, apoiadores e
              parceiros institucionais.
            </p>

            <div className="mt-6 space-y-3">
              {REGRAS_EMPRESAS.map((regra) => (
                <CardRegraPontuacao
                  key={regra.titulo}
                  regra={regra}
                  variante="empresa"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-10">
        <div className="mx-auto max-w-6xl rounded-[2rem] bg-white p-6 shadow-xl ring-1 ring-green-100 md:p-8">
          <div className="text-center">
            <p className="inline-flex rounded-full bg-green-600 px-5 py-2 text-xs font-black uppercase tracking-[0.2em] text-white">
              Automação pelo banco
            </p>

            <h2 className="mt-4 text-3xl font-black text-gray-950 md:text-4xl">
              Como os pontos são calculados
            </h2>

            <p className="mx-auto mt-3 max-w-3xl text-sm font-bold leading-relaxed text-gray-600">
              O sistema soma automaticamente as pontuações de compras,
              assinaturas e ações aprovadas no banco de dados usando Prisma.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {ITENS_CALCULO.map((item) => (
              <div
                key={item}
                className="rounded-2xl bg-green-50 p-4 ring-1 ring-green-100"
              >
                <p className="text-sm font-black text-green-700">✓ {item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-12">
        <div className="mx-auto max-w-6xl rounded-[2.5rem] bg-gray-950 p-6 text-center text-white shadow-2xl md:p-10">
          <p className="inline-flex rounded-full bg-yellow-400 px-5 py-2 text-xs font-black uppercase tracking-[0.2em] text-gray-950">
            Importante
          </p>

          <h2 className="mt-5 text-3xl font-black md:text-5xl">
            Os pontos aparecem após aprovação
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-sm font-bold leading-relaxed text-gray-300 md:text-base">
            Compras feitas pelo Mercado Pago devem pontuar somente após o
            pagamento aprovado. Voluntariado, patrocínio e ações presenciais
            podem ser confirmados manualmente pela equipe Hot Dogueres.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/cadastro?tipo=ranking-do-bem"
              className="rounded-full bg-red-600 px-7 py-4 text-sm font-black uppercase tracking-wide text-white shadow-lg transition hover:-translate-y-1 hover:bg-red-700"
            >
              Quero participar
            </Link>

            <Link
              href="/"
              className="rounded-full bg-white px-7 py-4 text-sm font-black uppercase tracking-wide text-gray-950 shadow-lg transition hover:-translate-y-1 hover:bg-gray-100"
            >
              Voltar ao início
            </Link>
          </div>
        </div>
      </section>
            <SetasNavegacao
        anterior="/nossa-historia"
        proxima="/clube-de-membros"
        labelAnterior="Voltar para Nossa História"
        labelProxima="Ir para Clube de Membros"
      />
    </main>

  );
}
