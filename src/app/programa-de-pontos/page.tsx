import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Programa de Pontos | Hot Dogueres",
  description:
    "Conheça o Pontos do Bem Hot Dogueres, o programa solidário que reconhece pessoas, voluntários, doadores, membros e empresas parceiras.",
};

type ItemPontuacao = {
  acao: string;
  pontos: string;
  destaque?: boolean;
};

const pontosPessoas: ItemPontuacao[] = [
  {
    acao: "Compra de ingresso",
    pontos: "10 pontos",
  },
  {
    acao: "Membro mensal",
    pontos: "50 pontos por mês",
    destaque: true,
  },
  {
    acao: "Ingresso Eternizados",
    pontos: "30 pontos",
  },
  {
    acao: "Compra de camisa",
    pontos: "25 pontos",
  },
  {
    acao: "Kit de alimentação ou ração 01",
    pontos: "10 pontos",
  },
  {
    acao: "Kit de alimentação ou ração 02",
    pontos: "20 pontos",
  },
  {
    acao: "Kit de alimentação ou ração 03",
    pontos: "30 pontos",
  },
  {
    acao: "Kit de alimentação ou ração 04",
    pontos: "50 pontos",
    destaque: true,
  },
  {
    acao: "Doação de livros",
    pontos: "100 pontos no primeiro livro e 80 pontos nos demais",
    destaque: true,
  },
  {
    acao: "Participação como voluntário",
    pontos: "100 pontos",
    destaque: true,
  },
];

const pontosEmpresas: ItemPontuacao[] = [
  {
    acao: "Patrocinador Master",
    pontos: "150 pontos por evento único",
    destaque: true,
  },
  {
    acao: "Cota Ouro",
    pontos: "100 pontos por evento único",
  },
  {
    acao: "Cota Prata",
    pontos: "80 pontos por evento único",
  },
  {
    acao: "Parceiro anual",
    pontos: "25 pontos por mês",
    destaque: true,
  },
];

const regras = [
  "Os pontos são registrados após confirmação da compra, doação, participação ou patrocínio.",
  "A pontuação pode ser usada para aparecer no Ranking Solidário da Hot Dogueres.",
  "O programa tem como objetivo reconhecer atitudes solidárias e incentivar novas ações do bem.",
  "A Hot Dogueres poderá atualizar regras, pontuações e categorias para melhorar o programa.",
];

const beneficios = [
  {
    titulo: "Reconhecimento público",
    descricao:
      "Seu nome, empresa ou projeto pode aparecer no Ranking Solidário conforme sua participação.",
  },
  {
    titulo: "Impacto social real",
    descricao:
      "Cada ponto representa uma ação que ajuda pessoas, animais, projetos, eventos e campanhas.",
  },
  {
    titulo: "Participação contínua",
    descricao:
      "Você pode acumular pontos ao longo do tempo comprando, doando, apoiando ou sendo voluntário.",
  },
];

function ItemPontuacaoCard({
  item,
  cor,
}: {
  item: ItemPontuacao;
  cor: "red" | "green";
}) {
  const corTexto = cor === "red" ? "text-red-600" : "text-green-600";
  const corFundo =
    cor === "red"
      ? "bg-red-50 ring-red-100"
      : "bg-green-50 ring-green-100";

  return (
    <div
      className={`flex flex-col gap-3 rounded-2xl p-4 ring-1 transition hover:-translate-y-1 hover:shadow-lg sm:flex-row sm:items-center sm:justify-between ${
        item.destaque ? corFundo : "bg-gray-50 ring-gray-100"
      }`}
    >
      <div>
        <p className="font-black text-gray-900">{item.acao}</p>

        {item.destaque && (
          <p className="mt-1 text-xs font-black uppercase tracking-wide text-gray-500">
            Destaque no programa
          </p>
        )}
      </div>

      <p className={`text-left text-sm font-black sm:text-right ${corTexto}`}>
        {item.pontos}
      </p>
    </div>
  );
}

export default function ProgramaDePontosPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#dff6ff] text-gray-950">
      <section className="relative px-4 py-10 md:px-8 lg:px-12">
        <div className="absolute left-[-120px] top-[-120px] h-80 w-80 rounded-full bg-yellow-300/50 blur-3xl" />
        <div className="absolute right-[-120px] top-[240px] h-96 w-96 rounded-full bg-red-300/40 blur-3xl" />
        <div className="absolute bottom-[-160px] left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-green-300/30 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <Link
              href="/"
              className="inline-flex rounded-full bg-white px-5 py-3 text-sm font-black text-gray-800 shadow-md ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:bg-gray-50"
            >
              ← Voltar ao início
            </Link>

            <Link
              href="/ranking-solidario"
              className="inline-flex rounded-full bg-gray-950 px-5 py-3 text-sm font-black text-white shadow-md transition hover:-translate-y-0.5 hover:bg-black"
            >
              Ver Ranking Solidário →
            </Link>
          </div>

          <section className="overflow-hidden rounded-[2rem] bg-white shadow-2xl ring-1 ring-black/5">
            <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="p-6 md:p-10 lg:p-12">
                <p className="inline-flex rounded-full bg-red-100 px-5 py-2 text-xs font-black uppercase tracking-[0.2em] text-red-600">
                  Programa de Pontos
                </p>

                <h1 className="mt-5 text-4xl font-black leading-tight text-gray-950 md:text-6xl">
                  Pontos do Bem Hot Dogueres
                </h1>

                <p className="mt-6 max-w-3xl text-base font-semibold leading-relaxed text-gray-700 md:text-lg">
                  O Pontos do Bem é o programa solidário da Hot Dogueres.
                  Pessoas, voluntários, doadores, membros, compradores e
                  empresas parceiras acumulam pontos por cada contribuição feita
                  em nossos projetos, eventos e ações sociais.
                </p>

                <p className="mt-4 max-w-3xl text-base font-semibold leading-relaxed text-gray-700 md:text-lg">
                  Mais do que uma pontuação, cada ponto representa uma atitude
                  de apoio, solidariedade e compromisso com uma causa maior.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/programa-de-pontos/cadastro"
                    className="inline-flex justify-center rounded-full bg-red-600 px-7 py-4 text-sm font-black uppercase tracking-wide text-white shadow-lg shadow-red-500/20 transition hover:-translate-y-1 hover:bg-red-700"
                  >
                    Quero participar
                  </Link>

                  <Link
                    href="/ranking-solidario"
                    className="inline-flex justify-center rounded-full bg-green-600 px-7 py-4 text-sm font-black uppercase tracking-wide text-white shadow-lg shadow-green-500/20 transition hover:-translate-y-1 hover:bg-green-700"
                  >
                    Ver Ranking Solidário
                  </Link>
                </div>
              </div>

              <div className="bg-gradient-to-br from-red-600 via-orange-500 to-yellow-400 p-6 text-white md:p-10 lg:p-12">
                <div className="flex h-full flex-col justify-between rounded-[1.8rem] bg-black/20 p-6 shadow-2xl backdrop-blur-sm">
                  <div>
                    <p className="text-sm font-black uppercase tracking-[0.25em] text-yellow-100">
                      Solidariedade que pontua
                    </p>

                    <h2 className="mt-4 text-3xl font-black leading-tight md:text-4xl">
                      Cada compra, doação ou apoio pode virar reconhecimento.
                    </h2>

                    <p className="mt-5 text-base font-semibold leading-relaxed text-white/90">
                      O programa ajuda a valorizar quem participa da caminhada
                      da Hot Dogueres e fortalece o ecossistema de impacto
                      social da marca.
                    </p>
                  </div>

                  <div className="mt-8 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl bg-white/95 p-4 text-gray-950 shadow-lg">
                      <p className="text-3xl font-black text-red-600">10+</p>
                      <p className="mt-1 text-xs font-black uppercase tracking-wide">
                        formas de pontuar
                      </p>
                    </div>

                    <div className="rounded-2xl bg-white/95 p-4 text-gray-950 shadow-lg">
                      <p className="text-3xl font-black text-green-600">100</p>
                      <p className="mt-1 text-xs font-black uppercase tracking-wide">
                        pontos voluntário
                      </p>
                    </div>

                    <div className="rounded-2xl bg-white/95 p-4 text-gray-950 shadow-lg">
                      <p className="text-3xl font-black text-orange-600">
                        150
                      </p>
                      <p className="mt-1 text-xs font-black uppercase tracking-wide">
                        pontos master
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-8 grid gap-6 lg:grid-cols-3">
            {beneficios.map((beneficio) => (
              <article
                key={beneficio.titulo}
                className="rounded-3xl bg-white p-6 shadow-xl ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-100 text-2xl">
                  ⭐
                </div>

                <h2 className="text-xl font-black text-gray-950">
                  {beneficio.titulo}
                </h2>

                <p className="mt-3 text-sm font-semibold leading-relaxed text-gray-600">
                  {beneficio.descricao}
                </p>
              </article>
            ))}
          </section>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <section className="rounded-[2rem] bg-white p-6 shadow-xl ring-1 ring-black/5 md:p-8">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                  <p className="text-sm font-black uppercase tracking-wide text-red-600">
                    Pontuação
                  </p>

                  <h2 className="mt-2 text-3xl font-black text-gray-950">
                    Pessoas físicas
                  </h2>
                </div>

                <span className="inline-flex w-fit rounded-full bg-red-100 px-4 py-2 text-xs font-black uppercase tracking-wide text-red-600">
                  Doadores, membros e voluntários
                </span>
              </div>

              <p className="mt-4 text-sm font-semibold leading-relaxed text-gray-600 md:text-base">
                Você acumula pontos participando de eventos, comprando produtos,
                apoiando campanhas, doando itens ou atuando como voluntário.
              </p>

              <div className="mt-6 space-y-3">
                {pontosPessoas.map((item) => (
                  <ItemPontuacaoCard
                    key={item.acao}
                    item={item}
                    cor="red"
                  />
                ))}
              </div>
            </section>

            <section className="rounded-[2rem] bg-white p-6 shadow-xl ring-1 ring-black/5 md:p-8">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                  <p className="text-sm font-black uppercase tracking-wide text-green-600">
                    Pontuação
                  </p>

                  <h2 className="mt-2 text-3xl font-black text-gray-950">
                    Empresas parceiras
                  </h2>
                </div>

                <span className="inline-flex w-fit rounded-full bg-green-100 px-4 py-2 text-xs font-black uppercase tracking-wide text-green-600">
                  Patrocinadores e parceiros
                </span>
              </div>

              <p className="mt-4 text-sm font-semibold leading-relaxed text-gray-600 md:text-base">
                Empresas também podem participar do Ranking Solidário apoiando
                eventos, campanhas, projetos sociais e ações anuais.
              </p>

              <div className="mt-6 space-y-3">
                {pontosEmpresas.map((item) => (
                  <ItemPontuacaoCard
                    key={item.acao}
                    item={item}
                    cor="green"
                  />
                ))}
              </div>

              <div className="mt-6 rounded-3xl bg-green-50 p-5 ring-1 ring-green-100">
                <h3 className="text-lg font-black text-green-800">
                  Empresas também transformam vidas
                </h3>

                <p className="mt-2 text-sm font-semibold leading-relaxed text-green-900/80">
                  A participação de empresas fortalece campanhas, eventos,
                  doações, estrutura e ações sociais da Hot Dogueres.
                </p>
              </div>
            </section>
          </div>

          <section className="mt-8 rounded-[2rem] bg-yellow-50 p-6 shadow-xl ring-1 ring-yellow-100 md:p-8">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div>
                <p className="text-sm font-black uppercase tracking-wide text-yellow-700">
                  Como funciona?
                </p>

                <h2 className="mt-3 text-3xl font-black leading-tight text-yellow-950 md:text-4xl">
                  Participar é simples: cadastro, ação e reconhecimento.
                </h2>

                <p className="mt-4 text-sm font-semibold leading-relaxed text-yellow-900/80 md:text-base">
                  O programa foi criado para ser fácil de entender e simples de
                  acompanhar. Você participa das ações e a pontuação ajuda a
                  mostrar publicamente quem está contribuindo.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl bg-white p-5 shadow-md">
                  <p className="text-4xl font-black text-red-600">1</p>

                  <h3 className="mt-3 font-black text-gray-950">
                    Faça seu cadastro
                  </h3>

                  <p className="mt-2 text-sm font-semibold leading-relaxed text-gray-600">
                    A pessoa ou empresa se cadastra para participar do programa.
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-5 shadow-md">
                  <p className="text-4xl font-black text-red-600">2</p>

                  <h3 className="mt-3 font-black text-gray-950">
                    Participe das ações
                  </h3>

                  <p className="mt-2 text-sm font-semibold leading-relaxed text-gray-600">
                    Ao comprar, doar, ser voluntário ou patrocinar, os pontos
                    são registrados.
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-5 shadow-md">
                  <p className="text-4xl font-black text-red-600">3</p>

                  <h3 className="mt-3 font-black text-gray-950">
                    Apareça no ranking
                  </h3>

                  <p className="mt-2 text-sm font-semibold leading-relaxed text-gray-600">
                    Seu nome ou empresa aparece no Ranking Solidário conforme a
                    pontuação acumulada.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
            <div className="rounded-[2rem] bg-white p-6 shadow-xl ring-1 ring-black/5 md:p-8">
              <p className="text-sm font-black uppercase tracking-wide text-gray-500">
                Regras importantes
              </p>

              <h2 className="mt-3 text-3xl font-black text-gray-950">
                Transparência para todo mundo entender
              </h2>

              <div className="mt-6 space-y-3">
                {regras.map((regra, index) => (
                  <div
                    key={regra}
                    className="flex gap-4 rounded-2xl bg-gray-50 p-4 ring-1 ring-gray-100"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-950 text-sm font-black text-white">
                      {index + 1}
                    </span>

                    <p className="text-sm font-semibold leading-relaxed text-gray-700">
                      {regra}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] bg-gray-950 p-6 text-white shadow-xl md:p-8">
              <p className="text-sm font-black uppercase tracking-wide text-yellow-300">
                Por que existe?
              </p>

              <h2 className="mt-3 text-3xl font-black leading-tight">
                Cada ponto representa uma atitude solidária.
              </h2>

              <p className="mt-5 text-sm font-semibold leading-relaxed text-white/75 md:text-base">
                O objetivo do programa não é apenas criar uma competição, mas
                reconhecer quem ajuda a transformar vidas através da
                solidariedade, da participação e do compromisso social.
              </p>

              <div className="mt-6 rounded-3xl bg-white/10 p-5 ring-1 ring-white/10">
                <p className="text-lg font-black text-yellow-300">
                  Pontos do Bem
                </p>

                <p className="mt-2 text-sm font-semibold leading-relaxed text-white/75">
                  Uma forma simples de valorizar quem compra, doa, compartilha,
                  participa e acredita na construção da Hot Dogueres.
                </p>
              </div>

              <div className="mt-6 grid gap-3">
                <Link
                  href="/programa-de-pontos/cadastro"
                  className="rounded-full bg-yellow-400 px-6 py-4 text-center text-sm font-black uppercase tracking-wide text-gray-950 transition hover:-translate-y-1 hover:bg-yellow-300"
                >
                  Participar agora
                </Link>

                <Link
                  href="/ranking-solidario"
                  className="rounded-full bg-white px-6 py-4 text-center text-sm font-black uppercase tracking-wide text-gray-950 transition hover:-translate-y-1 hover:bg-gray-100"
                >
                  Ver ranking
                </Link>
              </div>
            </div>
          </section>

          <section className="mt-8 rounded-[2rem] bg-white p-6 text-center shadow-xl ring-1 ring-black/5 md:p-10">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-red-600">
              Faça parte dessa corrente
            </p>

            <h2 className="mx-auto mt-4 max-w-4xl text-3xl font-black leading-tight text-gray-950 md:text-5xl">
              A solidariedade cresce quando mais pessoas participam.
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-sm font-semibold leading-relaxed text-gray-600 md:text-base">
              Se você já apoia a Hot Dogueres, agora também pode acompanhar sua
              participação através dos pontos. Se ainda não participa, esse pode
              ser o primeiro passo para entrar nessa caminhada.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/programa-de-pontos/cadastro"
                className="inline-flex rounded-full bg-red-600 px-7 py-4 text-sm font-black uppercase tracking-wide text-white shadow-md transition hover:-translate-y-1 hover:bg-red-700"
              >
                Quero participar
              </Link>

              <Link
                href="/"
                className="inline-flex rounded-full bg-gray-100 px-7 py-4 text-sm font-black uppercase tracking-wide text-gray-800 shadow-md transition hover:-translate-y-1 hover:bg-gray-200"
              >
                Voltar ao início
              </Link>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
