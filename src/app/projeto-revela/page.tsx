import Link from "next/link";
import SetasNavegacao from "@/components/SetasNavegacao";
import Image from "next/image";

export const metadata = {
  title: "Projeto Hot Dogueres Revela | Instituto Hot Dogueres",
  description:
    "Projeto Hot Dogueres Revela — Adote um Talento. Aulas gratuitas de judô, dança e pintura para crianças de escolas públicas em Aracaju.",
};

const modalidades = [
  {
    nome: "Judô",
    subtitulo: "Disciplina, respeito e superação",
    descricao:
      "Aulas para desenvolver autocontrole, coordenação motora, confiança, respeito e espírito de equipe.",
    vagasGratuitas: 10,
    cor: "from-orange-500 to-red-500",
    emoji: "🥋",
  },
  {
    nome: "Dança",
    subtitulo: "Expressão, movimento e autoestima",
    descricao:
      "Atividades de expressão corporal, ritmo, criatividade, apresentações culturais e integração.",
    vagasGratuitas: 10,
    cor: "from-pink-500 to-purple-500",
    emoji: "💃",
  },
  {
    nome: "Pintura",
    subtitulo: "Arte, criatividade e descoberta",
    descricao:
      "Oficinas de pintura e artes visuais para estimular imaginação, expressão individual e produção artística.",
    vagasGratuitas: 10,
    cor: "from-blue-500 to-emerald-500",
    emoji: "🎨",
  },
];

const cotas = [
  {
    nome: "Semente de Talento",
    valor: 100,
    impacto: "Ajuda a manter materiais, lanches e estrutura de apoio.",
    destaque: false,
  },
  {
    nome: "Incentivador",
    valor: 200,
    impacto: "Fortalece a rotina das aulas e o acompanhamento das crianças.",
    destaque: false,
  },
  {
    nome: "Desenvolvedor",
    valor: 325,
    impacto: "Contribui com metade do custo mensal estimado de uma criança.",
    destaque: true,
  },
  {
    nome: "Adotante Integral",
    valor: 650,
    impacto: "Cobre o custo mensal estimado de uma criança no projeto.",
    destaque: true,
  },
];

const ingressos = [
  {
    nome: "Projeto Hot Dogueres Revela — Judô 2027",
    slug: "projeto-hot-dogueres-revela-judo-2027",
    modalidade: "Judô",
    descricao:
      "Ingresso comemorativo para apoiar a turma de judô do Projeto Hot Dogueres Revela.",
    emoji: "🥋",
    imagem: "/projeto-revela/ingressos/ingresso-judo-2027.png",
  },
  {
    nome: "Projeto Hot Dogueres Revela — Dança 2027",
    slug: "projeto-hot-dogueres-revela-danca-2027",
    modalidade: "Dança",
    descricao:
      "Ingresso comemorativo para apoiar a turma de dança do Projeto Hot Dogueres Revela.",
    emoji: "💃",
    imagem: "/projeto-revela/ingressos/ingresso-danca-2027.png",
  },
  {
    nome: "Projeto Hot Dogueres Revela — Pintura 2027",
    slug: "projeto-hot-dogueres-revela-pintura-2027",
    modalidade: "Pintura",
    descricao:
      "Ingresso comemorativo para apoiar a turma de pintura e artes visuais do Projeto Hot Dogueres Revela.",
    emoji: "🎨",
    imagem: "/projeto-revela/ingressos/ingresso-pintura-2027.png",
  },
];


const despesas = [
  ["Transporte das crianças", "R$ 4.800 a R$ 7.200/mês"],
  ["Professores de judô, dança e pintura", "R$ 3.900 a R$ 5.700/mês"],
  ["Monitores e equipe de apoio", "R$ 2.100 a R$ 3.100/mês"],
  ["Coordenação do projeto", "R$ 1.500 a R$ 2.500/mês"],
  ["Alimentação e hidratação", "R$ 1.500 a R$ 2.600/mês"],
  ["Reposição de materiais", "R$ 700 a R$ 1.200/mês"],
  ["Seguro, primeiros socorros e administração", "R$ 500 a R$ 1.000/mês"],
];

function formatarReal(valor: number) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function linkCota(valor: number, nome: string) {
  const params = new URLSearchParams({
    tipo: "cota-projeto-revela",
    projeto: "hot-dogueres-revela",
    plano: nome,
    valor: String(valor),
    ciclo: "mensal",
  });

  return `/cadastro?${params.toString()}`;
}

function linkIngresso(nome: string, slug: string, colecionar = false) {
  const params = new URLSearchParams({
    tipo: "ingresso-projeto-revela",
    produto: slug,
    titulo: nome,
    valor: "100",
    quantidadeTotal: "1",
    projeto: "hot-dogueres-revela",
    colecionar: colecionar ? "sim" : "nao",
    rankingPontos: "100",
  });

  return `/cadastro?${params.toString()}`;
}

export default function ProjetoRevelaPage() {
const metaInicial = 60000;
const metaMensalRecorrente = 25000;
const custoPorAluno = 650;
const alunosGratuitos = 30;
const alunosPagantes = 60;
const valorAlunoPagante = 90;
const receitaPagantes = alunosPagantes * valorAlunoPagante;

  return (
    <>
      <SetasNavegacao
        anterior="/nossa-historia"
        proxima="/ranking-do-bem"
        labelAnterior="Voltar para Nossa História"
        labelProxima="Ir para Ranking do Bem"
      />

      <main className="min-h-screen bg-[#fff7e8] text-gray-950">
      <section className="relative overflow-hidden bg-gradient-to-br from-yellow-300 via-orange-200 to-amber-100 px-3 py-10 sm:px-4 md:py-20">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-orange-500 blur-3xl" />
        </div>

        <div className="relative mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">

          <div>
            <p className="inline-flex rounded-full bg-white/80 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-orange-700 shadow-sm">
              Instituto Hot Dogueres de Ação Social e Cultural
            </p>

            <h1 className="mt-5 text-3xl font-black leading-tight tracking-tight text-gray-950 sm:text-4xl md:text-6xl">

              Projeto Hot Dogueres Revela
            </h1>

            <p className="mt-3 text-2xl font-black text-orange-700 md:text-3xl">
              Adote um Talento
            </p>

            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-gray-800">
              Um projeto social para revelar talentos de crianças de escolas
              públicas por meio de aulas gratuitas de judô, dança e pintura,
              com transporte, fardamento, equipamentos, acompanhamento e lanche.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#apoie"
                className="rounded-full bg-gray-950 px-6 py-4 text-center text-sm font-black uppercase tracking-wide text-white shadow-xl transition hover:-translate-y-0.5 hover:bg-gray-800"
              >
                Apoiar o projeto
              </Link>

              <Link
                href="#ingressos"
                className="rounded-full bg-white px-6 py-4 text-center text-sm font-black uppercase tracking-wide text-gray-950 shadow-xl ring-1 ring-orange-200 transition hover:-translate-y-0.5 hover:bg-orange-50"
              >
                Ver ingressos comemorativos
              </Link>
            </div>
          </div>

          <div className="w-full min-w-0 rounded-[1.5rem] bg-white/85 p-3 shadow-2xl ring-1 ring-white/70 backdrop-blur sm:rounded-[2rem] sm:p-5">

            <div className="min-w-0 rounded-[1.25rem] bg-gray-950 p-4 text-white sm:rounded-[1.5rem] sm:p-6">

         <p className="text-sm font-bold uppercase tracking-[0.2em] text-yellow-300">
  Primeira meta de implantação
</p>

<p className="mt-3 break-words text-4xl font-black sm:text-5xl">

  {formatarReal(metaInicial)}
</p>

<p className="mt-4 text-sm leading-relaxed text-gray-200">
  A primeira meta precisa ser maior porque será usada para colocar o
  projeto de pé: compra de tatames, kimonos, camisas personalizadas para
  as crianças, materiais de pintura, estrutura para dança, caixa de som,
  armazenamento, além de ajudar nos primeiros custos com espaço,
  professores, lanche e organização.
</p>

<p className="mt-4 rounded-2xl bg-yellow-300/15 p-4 text-sm font-bold leading-relaxed text-yellow-100 ring-1 ring-yellow-300/30">
  Depois da implantação inicial, a meta pública passa a ser de{" "}
  <span className="text-yellow-300">
    {formatarReal(metaMensalRecorrente)} por mês
  </span>{" "}
  para manter transporte, professores, alimentação, reposição de materiais,
  coordenação e acompanhamento das crianças.
</p>
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">

  <div className="rounded-2xl bg-white/10 p-4">
    <p className="text-3xl font-black">{alunosGratuitos}</p>
    <p className="mt-1 text-xs font-bold uppercase text-gray-300">
      crianças gratuitas
    </p>
  </div>

  <div className="rounded-2xl bg-white/10 p-4">
    <p className="text-3xl font-black">
      {formatarReal(metaMensalRecorrente)}
    </p>
    <p className="mt-1 text-xs font-bold uppercase text-gray-300">
      meta mensal após implantação
    </p>
  </div>
</div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-5 md:grid-cols-3">
            {modalidades.map((modalidade) => (
              <article
                key={modalidade.nome}
                className="overflow-hidden rounded-[2rem] bg-white shadow-xl ring-1 ring-orange-100"
              >
                <div
                  className={`h-36 bg-gradient-to-br ${modalidade.cor} p-5 text-white`}
                >
                  <div className="text-5xl">{modalidade.emoji}</div>
                  <p className="mt-3 text-xs font-black uppercase tracking-[0.2em] text-white/80">
                    {modalidade.vagasGratuitas} vagas gratuitas
                  </p>
                </div>

                <div className="p-6">
                  <h2 className="text-2xl font-black">{modalidade.nome}</h2>
                  <p className="mt-1 text-sm font-bold text-orange-700">
                    {modalidade.subtitulo}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-gray-700">
                    {modalidade.descricao}
                  </p>

                  <div className="mt-5 rounded-2xl border-2 border-dashed border-orange-200 bg-orange-50 p-5 text-center">
                    <p className="text-sm font-black uppercase text-orange-700">
                      Espaço para imagem
                    </p>
                    <p className="mt-2 text-xs text-gray-600">
                      Aqui poderá entrar uma foto autorizada das crianças da
                      modalidade {modalidade.nome}.
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-orange-700">
              Como vai funcionar
            </p>

            <h2 className="mt-3 text-3xl font-black md:text-4xl">
              Aulas gratuitas, transporte, lanche e acompanhamento
            </h2>

            <p className="mt-4 text-base leading-relaxed text-gray-700">
              A primeira etapa atenderá crianças de 7 a 10 anos, estudantes da
              rede pública, preferencialmente em situação de vulnerabilidade
              social. As atividades acontecerão às terças e quintas-feiras, no
              período da tarde, com proposta inicial para o Parque da Sementeira,
              em Aracaju.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-[1.5rem] bg-yellow-50 p-5 ring-1 ring-yellow-200">
              <p className="text-3xl font-black">2027</p>
              <p className="mt-2 text-sm font-bold text-gray-700">
                Início previsto em março, com aulas inaugurais e implantação
                progressiva.
              </p>
            </div>

            <div className="rounded-[1.5rem] bg-orange-50 p-5 ring-1 ring-orange-200">
              <p className="text-3xl font-black">Terças e quintas</p>
              <p className="mt-2 text-sm font-bold text-gray-700">
                Aulas regulares no período da tarde, com turmas organizadas por
                modalidade.
              </p>
            </div>

            <div className="rounded-[1.5rem] bg-emerald-50 p-5 ring-1 ring-emerald-200">
              <p className="text-3xl font-black">30 crianças</p>
              <p className="mt-2 text-sm font-bold text-gray-700">
                10 no judô, 10 na dança e 10 na pintura e artes visuais.
              </p>
            </div>

            <div className="rounded-[1.5rem] bg-blue-50 p-5 ring-1 ring-blue-200">
              <p className="text-3xl font-black">Parque</p>
              <p className="mt-2 text-sm font-bold text-gray-700">
                Atividades em espaço aberto, mediante autorização dos órgãos
                responsáveis.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="rounded-[2rem] bg-gray-950 p-6 text-white shadow-xl">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-yellow-300">
                Histórias reais
              </p>

              <h2 className="mt-3 text-3xl font-black">
                Espaço para vídeos das crianças
              </h2>

              <p className="mt-4 text-sm leading-relaxed text-gray-300">
                A página poderá destacar 3 vídeos, um de cada área, com crianças
                participantes falando sobre seus sonhos, sempre mediante
                autorização formal dos responsáveis.
              </p>

              <div className="mt-6 rounded-2xl bg-white/10 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-gray-300">
                  Importante
                </p>
                <p className="mt-2 text-sm leading-relaxed text-gray-200">
                  O uso de imagem deve ser feito com autorização dos
                  responsáveis, respeitando privacidade, dignidade e segurança
                  das crianças.
                </p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {modalidades.map((modalidade) => (
                <div
                  key={`video-${modalidade.nome}`}
                  className="rounded-[2rem] bg-white p-4 shadow-xl ring-1 ring-orange-100"
                >
                  <div className="flex aspect-video items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-gray-900 to-gray-700 text-white">
                    <div className="text-center">
                      <div className="text-4xl">{modalidade.emoji}</div>
                      <p className="mt-3 text-xs font-black uppercase tracking-wide">
                        Vídeo {modalidade.nome}
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 text-sm font-black">
                    Sonho de uma criança da {modalidade.nome}
                  </p>

                  <p className="mt-2 text-xs leading-relaxed text-gray-600">
                    Espaço reservado para depoimento em vídeo.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
<section className="bg-white px-4 py-12">
  <div className="mx-auto max-w-6xl">
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
      <div>
        <p className="text-sm font-black uppercase tracking-[0.2em] text-orange-700">
          Primeira meta do projeto
        </p>

        <h2 className="mt-3 text-3xl font-black md:text-4xl">
          Por que a primeira meta será de R$ 60 mil?
        </h2>

        <p className="mt-4 text-base leading-relaxed text-gray-700">
          Antes de manter as aulas mensalmente, o Projeto Hot Dogueres Revela
          precisa montar a estrutura inicial. Essa primeira arrecadação será
          destinada à compra dos equipamentos, materiais e itens essenciais
          para que as crianças possam começar as atividades com segurança,
          identificação e qualidade.
        </p>

        <p className="mt-4 text-base leading-relaxed text-gray-700">
          Depois dessa implantação, a meta volta para{" "}
          <strong>{formatarReal(metaMensalRecorrente)} por mês</strong>,
          valor pensado para manter transporte, professores, lanche,
          reposição de materiais, coordenação e acompanhamento das crianças.
        </p>
      </div>

      <div className="rounded-[2rem] bg-[#fff7e8] p-6 shadow-xl ring-1 ring-orange-100">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-orange-700">
          O que entra nessa primeira etapa
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {[
            "Tatames para as aulas de judô",
            "Kimonos para as crianças",
            "Duas camisas personalizadas por criança",
            "Tripés, tintas, pincéis e quadros",
            "Cadeiras e caixas para armazenamento",
            "Tablado para a equipe de dança",
            "Caixa de som para as aulas e ensaios",
            "Aluguel, professores, lanches e primeiros custos",
          ].map((item) => (
            <div
              key={item}
              className="rounded-2xl bg-white p-4 text-sm font-bold leading-relaxed text-gray-800 shadow-sm ring-1 ring-orange-100"
            >
              ✓ {item}
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl bg-gray-950 p-5 text-white">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-300">
            Comunicação transparente
          </p>

          <p className="mt-3 text-sm leading-relaxed text-gray-200">
            A meta inicial de {formatarReal(metaInicial)} é uma etapa de
            implantação. Ela não substitui a meta mensal do projeto: ela permite
            que o projeto comece com estrutura mínima para funcionar.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

      <section id="apoie" className="bg-white px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-orange-700">
              Plano de cotas mensais
            </p>

            <h2 className="mt-3 text-3xl font-black md:text-4xl">
              Adote um talento e ajude a manter o projeto vivo
            </h2>

            <p className="mt-4 text-base leading-relaxed text-gray-700">
              Pessoas físicas e empresas poderão contribuir mensalmente com o
              mesmo valor de cota. Cada contribuição ajudará a manter transporte,
              alimentação, professores, materiais, equipamentos e acompanhamento
              das crianças.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {cotas.map((cota) => (
              <article
                key={cota.nome}
                className={`rounded-[2rem] p-6 shadow-xl ${
                  cota.destaque
                    ? "bg-gray-950 text-white ring-4 ring-yellow-300"
                    : "bg-[#fff7e8] text-gray-950 ring-1 ring-orange-100"
                }`}
              >
                <p
                  className={`text-xs font-black uppercase tracking-[0.2em] ${
                    cota.destaque ? "text-yellow-300" : "text-orange-700"
                  }`}
                >
                  Cota mensal
                </p>

                <h3 className="mt-3 text-2xl font-black">{cota.nome}</h3>

                <p className="mt-4 text-4xl font-black">
                  {formatarReal(cota.valor)}
                </p>

                <p
                  className={`mt-4 text-sm leading-relaxed ${
                    cota.destaque ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {cota.impacto}
                </p>

                <Link
                  href={linkCota(cota.valor, cota.nome)}
                  className={`mt-6 flex w-full justify-center rounded-full px-5 py-3 text-center text-xs font-black uppercase tracking-wide transition ${
                    cota.destaque
                      ? "bg-yellow-300 text-gray-950 hover:bg-yellow-400"
                      : "bg-gray-950 text-white hover:bg-gray-800"
                  }`}
                >
                  Apoiar mensalmente
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="ingressos" className="px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-orange-700">
                Ingressos comemorativos
              </p>

              <h2 className="mt-3 text-3xl font-black md:text-4xl">
                Três ingressos para apoiar diretamente a meta mensal
              </h2>

              <p className="mt-4 text-base leading-relaxed text-gray-700">
                Os ingressos comemorativos do Projeto Hot Dogueres Revela serão
                separados das metas de alimentos e proteção animal. O valor
                arrecadado aqui será direcionado para a meta mensal do projeto.
              </p>
            </div>

            <div className="rounded-[2rem] bg-yellow-300 p-6 shadow-xl">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-gray-800">
                Valor sugerido
              </p>
              <p className="mt-2 text-5xl font-black">R$ 100</p>
              <p className="mt-3 text-sm font-bold text-gray-800">
                Valor mínimo por ingresso comemorativo, acima dos ingressos
                solidários anteriores, por se tratar de apoio direto a um projeto
                educacional, esportivo e cultural.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {ingressos.map((ingresso) => (
              <article
                key={ingresso.slug}
                className="rounded-[2rem] bg-white p-6 shadow-xl ring-1 ring-orange-100"
              >
                <div className="flex h-48 items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-orange-100 to-yellow-100">
                  <div className="text-center">
                    <div className="text-6xl">{ingresso.emoji}</div>
                    <p className="mt-3 text-xs font-black uppercase tracking-[0.2em] text-orange-700">
                      Arte do ingresso
                    </p>
                  </div>
                </div>

                <h3 className="mt-5 text-xl font-black">{ingresso.nome}</h3>

                <p className="mt-3 text-sm leading-relaxed text-gray-700">
                  {ingresso.descricao}
                </p>

                <p className="mt-4 text-3xl font-black">R$ 100</p>

                <div className="mt-5 grid gap-3">
                  <Link
  
                href={linkIngresso(ingresso.nome, ingresso.slug, false)}
                className="flex justify-center rounded-full bg-gray-950 px-5 py-3 text-center text-xs font-black uppercase tracking-wide text-white transition hover:bg-gray-800"
>
  Comprar para apoiar
</Link>

<Link
  href={linkIngresso(
    `${ingresso.nome} — Colecionador`,
    `${ingresso.slug}-colecionador`,
    true,
  )}
  className="flex justify-center rounded-full bg-yellow-300 px-5 py-3 text-center text-xs font-black uppercase tracking-wide text-gray-950 transition hover:bg-yellow-400"
>
  Quero colecionar
</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[2rem] bg-[#fff7e8] p-6 shadow-xl ring-1 ring-orange-100">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-orange-700">
                Turmas pagantes
              </p>

              <h2 className="mt-3 text-3xl font-black">
                Uma forma de ajudar a sustentar o projeto
              </h2>

              <p className="mt-4 text-sm leading-relaxed text-gray-700">
                Além das vagas gratuitas, o Instituto poderá abrir turmas com
                contribuição mensal acessível para crianças e adolescentes,
                ajudando a manter parte da estrutura do projeto social.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl bg-white p-4">
                  <p className="text-3xl font-black">{alunosPagantes}</p>
                  <p className="mt-1 text-xs font-bold uppercase text-gray-600">
                    vagas pagantes futuras
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-4">
                  <p className="text-3xl font-black">
                    {formatarReal(valorAlunoPagante)}
                  </p>
                  <p className="mt-1 text-xs font-bold uppercase text-gray-600">
                    mensalidade sugerida
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-4">
                  <p className="text-3xl font-black">
                    {formatarReal(receitaPagantes)}
                  </p>
                  <p className="mt-1 text-xs font-bold uppercase text-gray-600">
                    receita mensal estimada
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] bg-gray-950 p-6 text-white shadow-xl">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-yellow-300">
                Organização das turmas
              </p>

              <h2 className="mt-3 text-3xl font-black">
                Duas faixas etárias
              </h2>

              <div className="mt-6 space-y-4">
                <div className="rounded-2xl bg-white/10 p-5">
                  <p className="text-xl font-black">7 a 10 anos</p>
                  <p className="mt-2 text-sm leading-relaxed text-gray-300">
                    Turma infantil, com atividades adaptadas à idade,
                    segurança, acolhimento e desenvolvimento básico.
                  </p>
                </div>

                <div className="rounded-2xl bg-white/10 p-5">
                  <p className="text-xl font-black">11 a 16 anos</p>
                  <p className="mt-2 text-sm leading-relaxed text-gray-300">
                    Turma infantojuvenil, permitindo expansão do alcance do
                    Instituto e continuidade das atividades.
                  </p>
                </div>
              </div>

              <p className="mt-5 text-sm leading-relaxed text-gray-300">
                Planejamento futuro: 20 alunos no judô, 20 na dança e 20 na
                pintura, totalizando 60 crianças e adolescentes nas turmas com
                contribuição.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-orange-700">
              Para onde vai o recurso
            </p>

            <h2 className="mt-3 text-3xl font-black md:text-4xl">
              Transparência desde o primeiro passo
            </h2>

            <p className="mt-4 text-base leading-relaxed text-gray-700">
              A arrecadação do projeto será usada para manter as atividades,
              respeitando a autonomia financeira e contábil do Instituto
              Hot Dogueres de Ação Social e Cultural.
            </p>
          </div>

          <div className="mt-8 overflow-hidden rounded-[2rem] bg-white shadow-xl ring-1 ring-orange-100">
            <div className="grid bg-gray-950 px-5 py-4 text-sm font-black uppercase tracking-wide text-white md:grid-cols-2">
              <p>Despesa</p>
              <p className="hidden md:block">Estimativa</p>
            </div>

            <div className="divide-y divide-orange-100">
              {despesas.map(([despesa, valor]) => (
                <div
                  key={despesa}
                  className="grid gap-2 px-5 py-4 text-sm md:grid-cols-2"
                >
                  <p className="font-bold text-gray-950">{despesa}</p>
                  <p className="font-black text-orange-700">{valor}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-[2rem] bg-yellow-100 p-6 ring-1 ring-yellow-300">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-yellow-800">
              Referência do projeto
            </p>

            <p className="mt-3 text-sm leading-relaxed text-gray-800">
             O planejamento financeiro prevê uma primeira meta de implantação de
R$ 60.000 para compra de equipamentos, materiais, uniformes, estrutura
inicial e primeiros custos de funcionamento. Após essa etapa inicial, a
meta mensal pública será de R$ 25.000 para manter transporte, professores,
alimentação, reposição de materiais, coordenação e acompanhamento das
crianças.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gray-950 px-4 py-14 text-white">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-yellow-300">
            Uma oportunidade pode mudar uma história
          </p>

          <h2 className="mx-auto mt-4 max-w-4xl text-3xl font-black leading-tight md:text-5xl">
            Ajude o Instituto Hot Dogueres a revelar talentos e construir um
            amanhã melhor.
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-gray-300">
            O Projeto Hot Dogueres Revela nasce para transformar solidariedade
            em oportunidade, unindo esporte, arte, cultura, educação e
            desenvolvimento humano.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="#apoie"
              className="rounded-full bg-yellow-300 px-6 py-4 text-center text-sm font-black uppercase tracking-wide text-gray-950 transition hover:bg-yellow-400"
            >
              Escolher uma cota
            </Link>

            <Link
              href="#ingressos"
              className="rounded-full bg-white px-6 py-4 text-center text-sm font-black uppercase tracking-wide text-gray-950 transition hover:bg-gray-100"
            >
              Comprar ingresso comemorativo
            </Link>
          </div>
        </div>
      </section>
      </main>
    </>
  );
}
