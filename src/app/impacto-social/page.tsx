import Image from "next/image";
import Link from "next/link";
import SetasNavegacao from "@/components/SetasNavegacao";


type TipoMidia = "foto" | "video";

type MidiaImpacto = {
  tipo: TipoMidia;
  titulo: string;
  url?: string;
  descricao?: string;
};

type EscolaProjeto = {
  numero: number;
  nome: string;
  status: "A definir" | "Confirmada" | "Realizada";
};

type ProjetoImpacto = {
  titulo: string;
  mesAno: string;
  status: "Próximo evento" | "Em planejamento" | "Realizado";
  local?: string;
  descricao: string;
  destaque?: string;
  midias: MidiaImpacto[];
};

const ESCOLAS_HOT_DOGUERES: EscolaProjeto[] = [
  { numero: 1, nome: "Escola 01 - Nome a definir", status: "A definir" },
  { numero: 2, nome: "Escola 02 - Nome a definir", status: "A definir" },
  { numero: 3, nome: "Escola 03 - Nome a definir", status: "A definir" },
  { numero: 4, nome: "Escola 04 - Nome a definir", status: "A definir" },
  { numero: 5, nome: "Escola 05 - Nome a definir", status: "A definir" },
  { numero: 6, nome: "Escola 06 - Nome a definir", status: "A definir" },
  { numero: 7, nome: "Escola 07 - Nome a definir", status: "A definir" },
  { numero: 8, nome: "Escola 08 - Nome a definir", status: "A definir" },
  { numero: 9, nome: "Escola 09 - Nome a definir", status: "A definir" },
  { numero: 10, nome: "Escola 10 - Nome a definir", status: "A definir" },
];

const PROJETOS_IMPACTO: ProjetoImpacto[] = [
  {
    titulo: "Apresentação do Ecossistema Hot Dogueres",
    mesAno: "Dezembro 2026",
    status: "Próximo evento",
    local: "Aracaju/SE",
    destaque: "Lançamento oficial da visão social, gastronômica e cultural.",
    descricao:
      "Evento de apresentação do Ecossistema Hot Dogueres, mostrando os projetos sociais, ações solidárias, parcerias, produtos, eventos e a missão de transformar vidas através da gastronomia e da solidariedade.",
    midias: [
      {
        tipo: "foto",
        titulo: "Foto oficial do evento",
        url: "/impacto-social/apresentacao-ecossistema.jpg",
        descricao: "Espaço reservado para a foto principal do evento.",
      },
      {
        tipo: "video",
        titulo: "Vídeo de apresentação",
        url: "",
        descricao: "Espaço reservado para vídeo institucional ou cobertura.",
      },
    ],
  },
  {
    titulo: "Gastronomia que Salva Vidas - Hemose",
    mesAno: "Próximo evento",
    status: "Em planejamento",
    local: "Hemose - Sergipe",
    destaque: "Uma ação para incentivar doação de sangue e solidariedade.",
    descricao:
      "Projeto social voltado para mobilizar pessoas, empresas, voluntários e parceiros em uma ação de conscientização e incentivo à doação de sangue, unindo gastronomia, cuidado e impacto social.",
    midias: [
      {
        tipo: "foto",
        titulo: "Registro da ação no Hemose",
        url: "/impacto-social/hemose-gastronomia.jpg",
        descricao: "Espaço reservado para fotos da ação.",
      },
    ],
  },
  {
    titulo: "Hot Dogueres na Escola",
    mesAno: "Calendário especial",
    status: "Em planejamento",
    local: "10 escolas participantes",
    destaque:
      "Serão 10 escolas, com registros da equipe, alunos e professores.",
    descricao:
      "Projeto educacional e social que levará a Hot Dogueres para escolas, promovendo momentos de integração, alimentação, palestras, atividades e registros com alunos, professores e equipe Hot Dogueres.",
    midias: [
      {
        tipo: "foto",
        titulo: "Foto oficial com alunos, professores e equipe",
        url: "/impacto-social/hot-dogueres-na-escola.jpg",
        descricao: "Espaço reservado para a foto oficial de cada escola.",
      },
      {
        tipo: "video",
        titulo: "Vídeo da visita escolar",
        url: "",
        descricao: "Espaço reservado para vídeos das visitas.",
      },
    ],
  },
  {
    titulo: "Corrida do Bem Hot Dogueres",
    mesAno: "Duas edições por ano",
    status: "Em planejamento",
    local: "Aracaju/SE",
    destaque:
      "Fotos dos vencedores, vídeos da chegada e registros dos participantes.",
    descricao:
      "Evento esportivo e solidário realizado duas vezes por ano, reunindo atletas, famílias, apoiadores e parceiros em uma grande corrida em prol de causas sociais apoiadas pelo Ecossistema Hot Dogueres.",
    midias: [
      {
        tipo: "foto",
        titulo: "Pódio dos vencedores",
        url: "/impacto-social/corrida-do-bem-vencedores.jpg",
        descricao: "Espaço reservado para fotos dos vencedores.",
      },
      {
        tipo: "video",
        titulo: "Chegada dos participantes",
        url: "",
        descricao: "Espaço reservado para vídeo da chegada.",
      },
    ],
  },
];

const DEPOIMENTOS = [
  {
    nome: "Participante",
    texto:
      "Participar de uma ação da Hot Dogueres foi emocionante. A gente sente que está fazendo parte de algo maior.",
  },
  {
    nome: "Voluntário",
    texto:
      "Cada evento mostra que gastronomia, solidariedade e comunidade podem caminhar juntas.",
  },
  {
    nome: "Parceiro",
    texto:
      "A Hot Dogueres tem um propósito forte e consegue transformar uma simples ação em impacto real.",
  },
];

function obterClasseStatus(status: ProjetoImpacto["status"]) {
  if (status === "Próximo evento") {
    return "bg-red-600 text-white";
  }

  if (status === "Realizado") {
    return "bg-green-600 text-white";
  }

  return "bg-yellow-400 text-gray-950";
}

function CardMidia({ midia }: { midia: MidiaImpacto }) {
  const temUrl = Boolean(midia.url && midia.url.trim().length > 0);

  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-gray-200">
      {midia.tipo === "foto" ? (
        temUrl ? (
          <div className="relative h-56 bg-gray-100">
            <Image
              src={midia.url as string}
              alt={midia.titulo}
              fill
              sizes="(max-width: 768px) 100vw, 600px"
              className="object-cover"
              unoptimized
            />
          </div>
        ) : (
          <div className="flex h-56 items-center justify-center bg-gray-100">
            <div className="px-6 text-center">
              <p className="text-sm font-black uppercase tracking-wide text-gray-500">
                Foto em breve
              </p>

              <p className="mt-2 text-lg font-black text-gray-950">
                {midia.titulo}
              </p>
            </div>
          </div>
        )
      ) : temUrl ? (
        <div className="aspect-video bg-gray-950">
          <iframe
            src={midia.url}
            title={midia.titulo}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      ) : (
        <div className="flex aspect-video items-center justify-center bg-gray-950">
          <div className="px-6 text-center">
            <p className="text-sm font-black uppercase tracking-wide text-yellow-300">
              Vídeo em breve
            </p>

            <p className="mt-2 text-lg font-black text-white">
              {midia.titulo}
            </p>
          </div>
        </div>
      )}

      <div className="p-5">
        <h4 className="text-lg font-black text-gray-950">{midia.titulo}</h4>

        {midia.descricao && (
          <p className="mt-2 text-sm font-semibold leading-relaxed text-gray-600">
            {midia.descricao}
          </p>
        )}
      </div>
    </div>
  );
}


export default function ImpactoSocialPage() {
  return (
    <main className="min-h-screen bg-[#fff7e8] text-gray-950">
      <SetasNavegacao
        anterior="/loja-solidaria"
        proxima="/parceiros-empresas"
        labelAnterior="Voltar para Loja Solidária"
        labelProxima="Ir para Área do Parceiro"
      />

      <section className="relative overflow-hidden px-4 py-10">
        <div className="absolute left-[-180px] top-[-180px] h-[360px] w-[360px] rounded-full bg-red-200/50 blur-3xl" />
        <div className="absolute bottom-[-200px] right-[-150px] h-[420px] w-[420px] rounded-full bg-green-200/60 blur-3xl" />

        <div className="relative mx-auto max-w-6xl rounded-[2rem] bg-white p-6 text-center shadow-xl md:p-10">
          <p className="inline-flex rounded-full bg-green-600 px-5 py-2 text-xs font-black uppercase tracking-wide text-white">
            Projetos, ações, fotos, vídeos e vidas impactadas
          </p>

          <h1 className="mt-5 text-4xl font-black leading-tight text-gray-950 md:text-6xl">
            Impacto Social Hot Dogueres
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-base font-bold leading-relaxed text-gray-700 md:text-lg">
            Um espaço para registrar cada ação, evento, escola, corrida, live,
            depoimento e projeto social realizado pelo Ecossistema Hot Dogueres.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl bg-red-50 p-5 ring-1 ring-red-100">
              <p className="text-4xl font-black text-red-600">
                {PROJETOS_IMPACTO.length}
              </p>
              <p className="mt-1 text-sm font-black uppercase text-gray-600">
                Projetos iniciais
              </p>
            </div>

            <div className="rounded-3xl bg-yellow-50 p-5 ring-1 ring-yellow-100">
              <p className="text-4xl font-black text-yellow-600">10</p>
              <p className="mt-1 text-sm font-black uppercase text-gray-600">
                Escolas planejadas
              </p>
            </div>

            <div className="rounded-3xl bg-green-50 p-5 ring-1 ring-green-100">
              <p className="text-4xl font-black text-green-600">2</p>
              <p className="mt-1 text-sm font-black uppercase text-gray-600">
                Corridas por ano
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="#projetos"
              className="rounded-full bg-red-600 px-7 py-4 text-sm font-black uppercase tracking-wide text-white shadow-lg transition hover:bg-red-700"
            >
              Ver projetos
            </a>

            <Link
              href="/parceiros-empresas#fazer-parte"
              className="rounded-full bg-green-600 px-7 py-4 text-sm font-black uppercase tracking-wide text-white shadow-lg transition hover:bg-green-700"
            >
              Quero apoiar como empresa
            </Link>

            <Link
              href="/clube-de-membros"
              className="rounded-full bg-yellow-400 px-7 py-4 text-sm font-black uppercase tracking-wide text-gray-950 shadow-lg transition hover:bg-yellow-500"
            >
              Entrar no Clube
            </Link>
          </div>
        </div>
      </section>

      <section id="projetos" className="px-4 pb-10">

        <div className="mx-auto max-w-6xl rounded-[2rem] bg-gray-950 p-6 text-white shadow-xl md:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <p className="inline-flex rounded-full bg-red-600 px-5 py-2 text-xs font-black uppercase tracking-wide text-white">
                Lives Hot Dogueres
              </p>

              <h2 className="mt-5 text-3xl font-black md:text-4xl">
                Transmissões ao vivo pelo site
              </h2>

              <p className="mt-4 text-sm font-bold leading-relaxed text-gray-300 md:text-base">
                A forma mais simples e segura é transmitir pelo YouTube Live e
                incorporar a live aqui no site. Quando o canal da TV Hot Dogueres
                estiver criado, basta trocar o link do vídeo ao vivo.
              </p>

              <div className="mt-6 rounded-3xl bg-white/10 p-5">
                <p className="text-sm font-black uppercase tracking-wide text-yellow-300">
                  Futuramente
                </p>

                <p className="mt-2 text-sm font-semibold leading-relaxed text-gray-300">
                  Também podemos criar uma área administrativa para cadastrar
                  lives, fotos, vídeos, depoimentos e projetos sem mexer no
                  código.
                </p>
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl bg-black shadow-xl ring-1 ring-white/10">
              <div className="flex aspect-video w-full items-center justify-center bg-black">
  <div className="px-6 text-center">
    <p className="text-sm font-black uppercase tracking-wide text-yellow-300">
      TV Hot Dogueres
    </p>

    <h3 className="mt-3 text-2xl font-black text-white">
      Live em breve
    </h3>

    <p className="mx-auto mt-3 max-w-md text-sm font-semibold leading-relaxed text-gray-300">
      Quando a transmissão oficial estiver disponível, o vídeo ao vivo será
      exibido aqui.
    </p>
  </div>
</div>

            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-10">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="inline-flex rounded-full bg-red-600 px-5 py-2 text-xs font-black uppercase tracking-wide text-white">
              Linha do tempo social
            </p>

            <h2 className="mt-4 text-3xl font-black text-gray-950 md:text-4xl">
              Projetos por mês e evento
            </h2>

            <p className="mx-auto mt-3 max-w-3xl text-sm font-bold leading-relaxed text-gray-600">
              Cada projeto poderá ter sua própria galeria de fotos, vídeos,
              depoimentos e registros oficiais.
            </p>
          </div>

          <div className="mt-8 space-y-8">
            {PROJETOS_IMPACTO.map((projeto) => (
              <article
                key={projeto.titulo}
                className="rounded-[2rem] bg-white p-6 shadow-xl md:p-8"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <span
                      className={`inline-flex rounded-full px-5 py-2 text-xs font-black uppercase tracking-wide ${obterClasseStatus(
                        projeto.status
                      )}`}
                    >
                      {projeto.status}
                    </span>

                    <h3 className="mt-4 text-3xl font-black text-gray-950">
                      {projeto.titulo}
                    </h3>

                    <p className="mt-2 text-sm font-black uppercase tracking-wide text-red-600">
                      {projeto.mesAno}
                      {projeto.local ? ` • ${projeto.local}` : ""}
                    </p>

                    <p className="mt-4 max-w-4xl text-sm font-bold leading-relaxed text-gray-600 md:text-base">
                      {projeto.descricao}
                    </p>

                    {projeto.destaque && (
                      <p className="mt-4 rounded-2xl bg-yellow-50 p-4 text-sm font-black leading-relaxed text-yellow-800 ring-1 ring-yellow-100">
                        {projeto.destaque}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  {projeto.midias.map((midia) => (
                    <CardMidia key={`${projeto.titulo}-${midia.titulo}`} midia={midia} />
                  ))}
                </div>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
  <Link
    href="/parceiros-empresas#fazer-parte"
    className="rounded-full bg-green-600 px-6 py-3 text-center text-sm font-black uppercase tracking-wide text-white shadow-md transition hover:bg-green-700"
  >
    Apoiar este projeto
  </Link>

  <Link
    href="/loja-solidaria"
    className="rounded-full bg-red-600 px-6 py-3 text-center text-sm font-black uppercase tracking-wide text-white shadow-md transition hover:bg-red-700"
  >
    Ver Loja Solidária
  </Link>

  <Link
    href="/ranking-do-bem"
    className="rounded-full bg-yellow-400 px-6 py-3 text-center text-sm font-black uppercase tracking-wide text-gray-950 shadow-md transition hover:bg-yellow-500"
  >
    Ver Ranking do Bem
  </Link>
</div>

              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-10">
        <div className="mx-auto max-w-6xl rounded-[2rem] bg-white p-6 shadow-xl md:p-8">
          <div className="text-center">
            <p className="inline-flex rounded-full bg-yellow-400 px-5 py-2 text-xs font-black uppercase tracking-wide text-gray-950">
              Hot Dogueres na Escola
            </p>

            <h2 className="mt-4 text-3xl font-black text-gray-950">
              10 escolas participantes
            </h2>

            <p className="mx-auto mt-3 max-w-3xl text-sm font-bold leading-relaxed text-gray-600">
              Cada escola poderá ter uma página ou seção própria com foto da
              equipe, alunos, professores, vídeos e depoimentos.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {ESCOLAS_HOT_DOGUERES.map((escola) => (
              <div
                key={escola.numero}
                className="rounded-2xl bg-gray-50 p-5 ring-1 ring-gray-200"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-wide text-red-600">
                      Escola {String(escola.numero).padStart(2, "0")}
                    </p>

                    <h3 className="mt-1 text-lg font-black text-gray-950">
                      {escola.nome}
                    </h3>
                  </div>

                  <span className="rounded-full bg-white px-4 py-2 text-xs font-black text-gray-700 shadow-sm">
                    {escola.status}
                  </span>
                </div>

                <div className="mt-4 rounded-2xl bg-white p-4 text-center ring-1 ring-gray-100">
                  <p className="text-sm font-bold text-gray-500">
                    Espaço reservado para foto oficial da escola com alunos,
                    professores e equipe Hot Dogueres.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-10">
        <div className="mx-auto max-w-6xl rounded-[2rem] bg-white p-6 shadow-xl md:p-8">
          <div className="text-center">
            <p className="inline-flex rounded-full bg-green-600 px-5 py-2 text-xs font-black uppercase tracking-wide text-white">
              Depoimentos
            </p>

            <h2 className="mt-4 text-3xl font-black text-gray-950">
              Vozes do impacto
            </h2>

            <p className="mx-auto mt-3 max-w-3xl text-sm font-bold leading-relaxed text-gray-600">
              Aqui entrarão falas de alunos, voluntários, parceiros, professores,
              atletas e pessoas impactadas pelas ações.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {DEPOIMENTOS.map((depoimento) => (
              <div
                key={depoimento.nome}
                className="rounded-3xl bg-green-50 p-6 ring-1 ring-green-100"
              >
                <p className="text-4xl font-black text-green-600">“</p>

                <p className="mt-2 text-sm font-bold leading-relaxed text-gray-700">
                  {depoimento.texto}
                </p>

                <p className="mt-4 text-sm font-black text-gray-950">
                  {depoimento.nome}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-12">
        <div className="mx-auto max-w-6xl rounded-[2rem] bg-red-600 p-6 text-center text-white shadow-xl md:p-10">
          <p className="inline-flex rounded-full bg-white px-5 py-2 text-xs font-black uppercase tracking-wide text-red-600">
            Próximo passo
          </p>

          <h2 className="mt-5 text-3xl font-black">
            Transformar essa página em um acervo vivo
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-sm font-bold leading-relaxed text-red-50">
            Depois podemos criar uma área administrativa para adicionar fotos,
            vídeos, lives, escolas, depoimentos e eventos separados por projeto,
            mês e ano.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/loja-solidaria"
              className="rounded-full bg-gray-950 px-7 py-4 text-sm font-black uppercase tracking-wide text-white shadow-lg transition hover:bg-gray-800"
            >
              Ver Loja Solidária
            </Link>

            <Link
              href="/ranking-do-bem"
              className="rounded-full bg-yellow-400 px-7 py-4 text-sm font-black uppercase tracking-wide text-gray-950 shadow-lg transition hover:bg-yellow-500"
            >
              Ver Ranking do Bem
            </Link>
            <Link
    href="/parceiros-empresas#fazer-parte"
    className="rounded-full bg-white px-7 py-4 text-sm font-black uppercase tracking-wide text-red-600 shadow-lg transition hover:bg-red-50"
  >
    Quero ser parceiro
  </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
