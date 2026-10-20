import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import SetasNavegacao from "@/components/SetasNavegacao";

export const metadata: Metadata = {
  title: "Nossa História | Hot Dogueres",
  description:
    "Conheça a história da Hot Dogueres, uma marca que nasceu do hot dog e carrega trabalho, família, solidariedade, dignidade, conhecimento e futuro.",
};

type Pilar = {
  titulo: string;
  imagem: string;
  descricao: string;
  link?: {
    href: string;
    texto: string;
  };
};

type Estatistica = {
  valor: string;
  titulo: string;
  descricao: string;
};

type Momento = {
  titulo: string;
  descricao: string;
};

type ValorMarca = {
  titulo: string;
  descricao: string;
  icone: string;
};

type MarcoJornada = {
  etapa: string;
  titulo: string;
  descricao: string;
};
type PilarEraldo = {
  numero: string;
  titulo: string;
  descricao: string;
};

const QUATRO_PILARES_ERALDO: PilarEraldo[] = [
  {
    numero: "01",
    titulo: "Famílias",
    descricao: "Apoio a quem precisa de alimento, atenção e dignidade.",
  },
  {
    numero: "02",
    titulo: "Animais",
    descricao:
      "Cuidado com vidas abandonadas que também precisam de proteção.",
  },
  {
    numero: "03",
    titulo: "Reciclagem",
    descricao:
      "Valorização de quem trabalha com o que muitos descartam.",
  },
  {
    numero: "04",
    titulo: "Meio ambiente",
    descricao: "Plantar futuro para as próximas gerações.",
  },
];

const PILARES: Pilar[] = [
  {
    titulo: "Alimento e dignidade",
    imagem: "/pilares/cesta-basica.png",
    descricao:
      "Cada contribuição ajuda na compra de alimentos para famílias que precisam de apoio. A meta principal é alcançar 106 toneladas de alimentos, com transparência sobre quantos quilos já foram conquistados.",
  },
  {
    titulo: "Proteção animal",
    imagem: "/pilares/animais-na-chuva.png",
    descricao:
      "Uma parte da campanha será destinada à compra de ração para cães e gatos em situação de abandono, ajudando protetores e ações de cuidado animal.",
  },
  {
    titulo: "Reciclagem e inclusão",
    imagem: "/pilares/catador-de-latinha.png",
    descricao:
      "Porque muitas pessoas sobrevivem do que a cidade descarta, e esse trabalho merece reconhecimento, dignidade e oportunidade.",
  },
  {
    titulo: "Tecnologia para um mundo sustentável",
    imagem: "/pilares/tecnologia-para-um-mundo-sustentavel.png",
    descricao:
      "A tecnologia servindo às pessoas, aos animais e ao planeta, criando soluções simples para transformar solidariedade em impacto real.",
  },
  {
    titulo: "Meio ambiente e futuro",
    imagem: "/pilares/crianca-plantando-arvore.png",
    descricao:
      "Porque plantar uma árvore também é plantar uma chance para as próximas gerações.",
  },
  {
    titulo: "Juntos transformamos vidas no festival",
    imagem: "/pilares/juntos-transformamos-vidas-no-festival.png",
    descricao:
      "O evento de final de ano também faz parte da missão. Além dos alimentos e da ração, uma parte da arrecadação ajudará na realização da grande celebração solidária.",
    link: {
      href: "/clube-de-membros",
      texto: "Conhecer o Clube de Membros",
    },
  },
];

const GRUPOS_PILARES = [
  {
    titulo: "Cuidado, dignidade e inclusão",
    descricao:
      "Ações voltadas para pessoas, animais e trabalhadores que fazem parte da realidade social da nossa comunidade.",
    pilares: PILARES.slice(0, 3),
  },
  {
    titulo: "Tecnologia, meio ambiente e futuro",
    descricao:
      "Projetos que conectam sustentabilidade, inovação, consciência ambiental e celebração solidária.",
    pilares: PILARES.slice(3, 6),
  },
];

const ESTATISTICAS: Estatistica[] = [
  {
    valor: "104t",
    titulo: "Meta de alimentos",
    descricao: "Um objetivo ousado para apoiar famílias e ações solidárias.",
  },
  {
    valor: "6",
    titulo: "Pilares sociais",
    descricao: "Causas que sustentam o ecossistema Hot Dogueres.",
  },
  {
    valor: "100%",
    titulo: "Propósito",
    descricao: "Uma marca construída com trabalho, memória e solidariedade.",
  },
];

const MOMENTOS: Momento[] = [
  {
    titulo: "Onde tudo começou",
    descricao: "A origem simples, com vontade de trabalhar e crescer.",
  },
  {
    titulo: "Nossa raiz: o hot dog",
    descricao: "O alimento que deu início à identidade da Hot Dogueres.",
  },
  {
    titulo: "Clientes que fazem parte da história",
    descricao: "Pessoas que compraram, apoiaram, indicaram e acreditaram.",
  },
  {
    titulo: "Trabalho, fé e propósito",
    descricao: "A força que manteve a marca de pé nos dias difíceis.",
  },
  {
    titulo: "Bastidores da caminhada",
    descricao: "Cada preparação, cada tentativa, cada noite de esforço.",
  },
  {
    titulo: "Ações que carregam solidariedade",
    descricao: "Projetos sociais, campanhas e sonhos em construção.",
  },
  {
    titulo: "Construindo o futuro da marca",
    descricao: "O nascimento de um ecossistema maior que o ponto de venda.",
  },
  {
    titulo: "O futuro nos reserva",
    descricao:
      "Parque EcoTech Hot Dogueres: uma visão conceitual para unir natureza, tecnologia, educação, gastronomia e impacto social.",
  },
];

const GRUPOS_MOMENTOS = [
  {
    titulo: "Raízes da caminhada",
    descricao:
      "Os primeiros passos, a origem da marca, os clientes e a força para continuar.",
    momentos: MOMENTOS.slice(0, 4),
  },
  {
    titulo: "Construindo o amanhã",
    descricao:
      "Os bastidores, as ações solidárias, o crescimento do ecossistema e a visão de futuro.",
    momentos: MOMENTOS.slice(4, 8),
  },
];

const VALORES_DA_MARCA: ValorMarca[] = [
  {
    icone: "🌭",
    titulo: "Origem",
    descricao:
      "O hot dog é o começo da nossa história e continua sendo a raiz da marca.",
  },
  {
    icone: "🤝",
    titulo: "Comunidade",
    descricao:
      "A Hot Dogueres cresce junto com clientes, amigos, parceiros e apoiadores.",
  },
  {
    icone: "❤️",
    titulo: "Solidariedade",
    descricao:
      "A marca nasce com o compromisso de transformar vendas em impacto social.",
  },
  {
    icone: "📚",
    titulo: "Conhecimento",
    descricao:
      "Livros, tecnologia, educação e projetos criativos fazem parte do futuro.",
  },
  {
    icone: "🌱",
    titulo: "Futuro",
    descricao:
      "Cada ação de hoje planta uma possibilidade melhor para as próximas gerações.",
  },
  {
    icone: "🔥",
    titulo: "Resistência",
    descricao:
      "A caminhada teve desafios, perdas e dificuldades, mas a missão continua viva.",
  },
];

const LINHA_DO_TEMPO: MarcoJornada[] = [
  {
    etapa: "01",
    titulo: "O início pelo hot dog",
    descricao:
      "A Hot Dogueres nasceu de uma ideia simples: vender hot dog com dedicação, carinho e vontade de crescer.",
  },
  {
    etapa: "02",
    titulo: "A construção da identidade",
    descricao:
      "Com o tempo, a marca começou a ganhar nome, personalidade, clientes e uma história própria.",
  },
  {
    etapa: "03",
    titulo: "As dificuldades da caminhada",
    descricao:
      "Nem todos os dias foram fáceis. Houve falta de mercadoria, incerteza, dor, perda e vontade de desistir.",
  },
  {
    etapa: "04",
    titulo: "A decisão de continuar",
    descricao:
      "Mesmo nos momentos mais difíceis, a memória, a fé e o propósito deram força para seguir em frente.",
  },
  {
    etapa: "05",
    titulo: "O nascimento do ecossistema",
    descricao:
      "A Hot Dogueres começa a se transformar em uma marca-mãe, reunindo alimentação, livros, eventos, tecnologia e solidariedade.",
  },
];

function corDoPilar(index: number) {
  const cores = [
    "bg-red-600",
    "bg-blue-600",
    "bg-orange-600",
    "bg-purple-700",
    "bg-green-700",
    "bg-yellow-600",
  ];

  return cores[index] || "bg-gray-950";
}
function CardImagemNossaHistoria() {
  return (
    <div className="mt-10 overflow-hidden rounded-[2.5rem] bg-[#000000] text-white shadow-2xl ring-1 ring-[#E11D2E]/30">
      <div className="grid lg:grid-cols-[1fr_0.95fr]">
        <div className="flex flex-col justify-center p-6 md:p-10">
          <p className="inline-flex w-fit rounded-full bg-[#FFE99A] px-5 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#000000]">
            Raízes da Hot Dogueres
          </p>

          <h2 className="mt-5 text-3xl font-black leading-tight md:text-5xl">
            Uma história que nasceu simples, mas carrega um propósito gigante.
          </h2>

          <p className="mt-5 text-base font-bold leading-relaxed text-white/80 md:text-lg">
            A Hot Dogueres começou pelo hot dog, mas cresceu como uma marca de
            família, trabalho, memória, solidariedade e futuro. Cada etapa dessa
            caminhada representa coragem, resistência e amor pelo que fazemos.
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {[
              "Origem no hot dog",
              "Família",
              "Trabalho",
              "Memória",
              "Solidariedade",
              "Futuro",
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

        <div className="relative min-h-[320px] bg-gradient-to-br from-[#E11D2E] via-[#FFB000] to-[#FFE99A] md:min-h-[430px]">
          <Image
            src="/images/nossa-historia-cartoon.png"
            alt="Imagem em cartoon representando a história da Hot Dogueres"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 560px"
            priority
          />

        </div>
      </div>
    </div>
  );
}


export default function NossaHistoriaPage() {
  return (
    <>
      <SetasNavegacao
        anterior="/"
        proxima="/ranking-do-bem"
        labelAnterior="Voltar para a página inicial"
        labelProxima="Ir para Ranking do Bem"
      />

      <main className="min-h-screen bg-[#FFF8E7] text-[#000000]">
        <section className="relative overflow-hidden px-6 py-20 md:px-10 lg:px-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#FFE99A_0%,transparent_32%),radial-gradient(circle_at_bottom_right,#E11D2E22_0%,transparent_34%)]" />
          <div className="absolute left-[-140px] top-[-140px] h-96 w-96 rounded-full bg-[#FFEFA3]/70 blur-3xl" />
          <div className="absolute bottom-[-180px] right-[-140px] h-[28rem] w-[28rem] rounded-full bg-[#E11D2E]/15 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">


  <CardImagemNossaHistoria />

  <div className="mt-12 grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">

              <div>
                <p className="mb-4 inline-flex rounded-full bg-[#E11D2E] px-5 py-2 text-sm font-black uppercase tracking-[0.22em] text-white shadow-lg">
                  Nossa História
                </p>

                <h1 className="text-4xl font-black leading-tight text-[#000000] md:text-6xl">
                  O sabor é só o começo da nossa história.
                </h1>

                <p className="mt-6 max-w-2xl text-lg font-semibold leading-relaxed text-[#000000]/80 md:text-xl">
                  A Hot Dogueres nasceu do hot dog, mas carrega uma missão
                  maior: construir uma marca feita de trabalho, família,
                  solidariedade, dignidade, conhecimento e futuro.
                </p>

                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#000000]/80">
                  Mais do que vender lanches, queremos criar uma história que
                  conecte pessoas, gere oportunidades e mostre que grandes
                  marcas também podem nascer de sonhos simples, com coragem, fé
                  e propósito.
                </p>

                <div className="mt-8 rounded-[2rem] border border-[#E11D2E]/20 bg-white/80 p-5 shadow-xl backdrop-blur">
                  <p className="text-xl font-black text-[#E11D2E]">
                    Hot Dogueres: uma marca-mãe em construção.
                  </p>

                  <p className="mt-2 text-sm font-bold leading-relaxed text-[#000000]/70">
                    Uma marca que começa no alimento, mas cresce para se tornar
                    movimento, comunidade, memória, cultura e impacto social.
                  </p>
                </div>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <a
                    href="#momentos-jornada"
                    className="rounded-full bg-[#E11D2E] px-7 py-4 text-center text-sm font-black uppercase tracking-wide text-white shadow-lg shadow-red-500/20 transition hover:scale-105 hover:bg-[#B11226]"
                  >
                    Acompanhe a evolução
                  </a>

                  <a
                    href="#caminhe-com-a-gente"
                    className="rounded-full border border-[#E11D2E]/30 bg-[#FFF1B8] px-7 py-4 text-center text-sm font-black uppercase tracking-wide text-[#000000] shadow-lg transition hover:scale-105 hover:bg-[#FFE99A]"
                  >
                    Faça parte da história
                  </a>
                </div>
              </div>

              <div className="rounded-[2rem] border border-[#E11D2E]/20 bg-[#FFF1B8] p-4 shadow-2xl md:p-6">
                <div className="rounded-[1.7rem] bg-[#E11D2E] p-1">
                  <div className="rounded-[1.55rem] bg-[#FFF8E7] p-7 text-center md:p-8">
                    <p className="text-sm font-black uppercase tracking-[0.25em] text-[#000000]">
                      Hot Dogueres
                    </p>

                    <div className="relative mx-auto mt-6 h-48 w-48 overflow-hidden rounded-full bg-white shadow-2xl ring-8 ring-[#FFE99A]">
                      <Image
                        src="/images/logo-hot-dogueres.png"
                        alt="Logo da Hot Dogueres"
                        fill
                        className="scale-110 object-cover"
                        sizes="192px"
                        priority
                      />
                    </div>

                    <h2 className="mt-7 text-3xl font-black leading-tight text-[#000000]">
                      Uma marca feita de sabor, memória e propósito.
                    </h2>

                    <p className="mt-5 font-semibold leading-relaxed text-[#000000]/75">
                      O hot dog é a nossa origem. A família é a nossa base. A
                      comunidade é a nossa força. E o futuro será construído com
                      solidariedade, dignidade e conhecimento.
                    </p>

                    <div className="mt-8 grid grid-cols-3 gap-3 text-center">
                      <div className="rounded-2xl bg-[#FFE99A] p-4 shadow-md">
                        <p className="text-2xl font-black text-[#E11D2E]">
                          01
                        </p>
                        <p className="mt-1 text-xs font-bold text-[#000000]">
                          Origem
                        </p>
                      </div>

                      <div className="rounded-2xl bg-[#FFE99A] p-4 shadow-md">
                        <p className="text-2xl font-black text-[#E11D2E]">
                          02
                        </p>
                        <p className="mt-1 text-xs font-bold text-[#000000]">
                          Família
                        </p>
                      </div>

                      <div className="rounded-2xl bg-[#FFE99A] p-4 shadow-md">
                        <p className="text-2xl font-black text-[#E11D2E]">
                          03
                        </p>
                        <p className="mt-1 text-xs font-bold text-[#000000]">
                          Futuro
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

  

               <section className="px-6 pb-16 md:px-10 lg:px-16">
          <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-[#E11D2E]/20 bg-white shadow-2xl">
            <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="relative overflow-hidden bg-[#000000] p-8 text-white md:p-10">
                <div className="absolute left-[-120px] top-[-120px] h-80 w-80 rounded-full bg-[#E11D2E]/45 blur-3xl" />
                <div className="absolute bottom-[-140px] right-[-120px] h-96 w-96 rounded-full bg-[#FFE99A]/25 blur-3xl" />

                <div className="relative">
                  <p className="inline-flex rounded-full bg-[#FFE99A] px-5 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#000000] shadow-lg">
                    Os 4 pilares
                  </p>

                  <h2 className="mt-5 text-3xl font-black leading-tight md:text-5xl">
                    O ERaldo vai administrar um ecossistema de eventos com alma.
                  </h2>

                  <p className="mt-6 text-lg font-semibold leading-relaxed text-white/80">
                    O projeto nasce com uma missão maior do que vender ingressos.
                    Ele será preparado para evoluir com o tempo, criando
                    campanhas, experiências, doações em tempo real, coleções
                    digitais e interação com o público.
                  </p>

                  <div className="mt-7 rounded-[1.5rem] border border-white/15 bg-white/10 p-5 backdrop-blur">
                    <p className="text-base font-bold leading-relaxed text-white/85">
                      O ERaldo será a inteligência do ecossistema: acompanhando
                      eventos, organizando informações, interagindo no telão,
                      apoiando campanhas e mantendo viva a memória de quem
                      inspirou esse nome.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#FFF1B8] p-5 md:p-8">
                <div className="grid h-full gap-4 sm:grid-cols-2">
                  {QUATRO_PILARES_ERALDO.map((pilar) => (
                    <article
                      key={pilar.titulo}
                      className="rounded-[1.7rem] border border-[#E11D2E]/15 bg-[#FFF8E7] p-6 shadow-xl transition hover:-translate-y-1 hover:shadow-2xl"
                    >
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E11D2E] text-xl font-black text-white shadow-lg">
                        {pilar.numero}
                      </div>

                      <h3 className="mt-5 text-2xl font-black text-[#000000]">
                        {pilar.titulo}
                      </h3>

                      <p className="mt-3 text-sm font-bold leading-relaxed text-[#000000]/70">
                        {pilar.descricao}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>


        <section className="px-6 pb-16 md:px-10 lg:px-16">
          <div className="mx-auto max-w-6xl rounded-[2rem] bg-white p-5 shadow-xl md:p-8">
            <div className="text-center">
              <p className="inline-flex rounded-full bg-red-100 px-5 py-2 text-xs font-black uppercase tracking-wide text-red-600">
                Os 6 pilares
              </p>

              <h2 className="mt-3 text-3xl font-black leading-tight text-[#000000] md:text-5xl">
                O ecossistema Hot Dogueres nasce com alma, causa e propósito.
              </h2>

              <p className="mx-auto mt-4 max-w-3xl text-base font-semibold leading-relaxed text-gray-700 md:text-lg">
                A nossa história não é apenas sobre vender hot dog. É sobre
                criar uma marca que une alimento, proteção animal, reciclagem,
                meio ambiente, tecnologia, memória e solidariedade.
              </p>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              {GRUPOS_PILARES.map((grupo, grupoIndex) => (
                <article
                  key={grupo.titulo}
                  className="rounded-[2rem] bg-[#fffaf0] p-5 shadow-xl ring-1 ring-red-100 transition hover:-translate-y-1 hover:shadow-2xl md:p-6"
                >
                  <div className="rounded-[1.5rem] bg-white p-5 text-center shadow-sm ring-1 ring-red-50">
                    <p className="inline-flex rounded-full bg-red-100 px-4 py-2 text-xs font-black uppercase tracking-wide text-red-600">
                      Box {grupoIndex + 1}
                    </p>

                    <h3 className="mt-3 text-2xl font-black leading-tight text-gray-950">
                      {grupo.titulo}
                    </h3>

                    <p className="mt-3 text-sm font-semibold leading-relaxed text-gray-600">
                      {grupo.descricao}
                    </p>
                  </div>

                  <div className="mt-5 grid gap-4">
                    {grupo.pilares.map((pilar, indexDentroGrupo) => {
                      const indexOriginal = grupoIndex * 3 + indexDentroGrupo;

                      return (
                        <div
                          key={pilar.titulo}
                          className="grid overflow-hidden rounded-[1.5rem] bg-white shadow-md ring-1 ring-gray-100 transition hover:-translate-y-1 hover:shadow-xl sm:grid-cols-[150px_1fr]"
                        >
                          <div className="relative min-h-[170px] bg-[#FFF8E7]">
                            <Image
                              src={pilar.imagem}
                              alt={pilar.titulo}
                              fill
                              priority={indexOriginal === 0}
                              sizes="(max-width: 640px) 100vw, 150px"
                              className="object-contain p-3"
                              unoptimized
                            />
                          </div>

                          <div className="flex flex-col justify-center p-5">
                            <div className="flex items-center gap-3">
                              <span
                                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-black text-white ${corDoPilar(
                                  indexOriginal,
                                )}`}
                              >
                                {String(indexOriginal + 1).padStart(2, "0")}
                              </span>

                              <h4 className="text-lg font-black leading-tight text-gray-950">
                                {pilar.titulo}
                              </h4>
                            </div>

                            <p className="mt-3 text-sm font-semibold leading-relaxed text-gray-600">
                              {pilar.descricao}
                            </p>

                            {pilar.link && (
                              <div className="mt-4">
                                <Link
                                  href={pilar.link.href}
                                  className="inline-flex rounded-full bg-yellow-400 px-4 py-2 text-xs font-black uppercase tracking-wide text-gray-950 shadow-md transition hover:scale-105 hover:bg-yellow-500"
                                >
                                  {pilar.link.texto}
                                </Link>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#FFF1B8] px-6 py-16 md:px-10 lg:px-16">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <p className="text-sm font-black uppercase tracking-[0.25em] text-[#E11D2E]">
                Linha do tempo
              </p>

              <h2 className="mt-3 text-3xl font-black text-[#000000] md:text-5xl">
                Uma caminhada que virou missão.
              </h2>

              <p className="mx-auto mt-5 max-w-3xl text-lg font-semibold leading-relaxed text-[#000000]/75">
                A Hot Dogueres não nasceu pronta. Ela está sendo construída
                passo a passo, com verdade, trabalho, dor, memória, fé e
                propósito.
              </p>
            </div>

            <div className="space-y-5">
              {LINHA_DO_TEMPO.map((marco) => (
                <article
                  key={marco.etapa}
                  className="grid gap-5 rounded-[2rem] border border-[#E11D2E]/20 bg-[#FFF8E7] p-6 shadow-xl md:grid-cols-[90px_1fr] md:items-center"
                >
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#E11D2E] text-2xl font-black text-white shadow-lg">
                    {marco.etapa}
                  </div>

                  <div>
                    <h3 className="text-2xl font-black text-[#000000]">
                      {marco.titulo}
                    </h3>

                    <p className="mt-2 text-base font-semibold leading-relaxed text-[#000000]/70">
                      {marco.descricao}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="momentos-jornada"
          className="px-6 py-16 text-[#000000] md:px-10 lg:px-16"
        >
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 text-center">
              <p className="text-sm font-black uppercase tracking-[0.25em] text-[#E11D2E]">
                Momentos da nossa jornada
              </p>

              <h2 className="mt-3 text-3xl font-black text-[#000000] md:text-5xl">
                Registros reais de uma caminhada em construção.
              </h2>

              <p className="mx-auto mt-5 max-w-3xl text-lg font-semibold leading-relaxed text-[#000000]/75">
                Aqui ficarão fotos e vídeos da Hot Dogueres: trabalho, família,
                clientes, comunidade, bastidores, ações e cada passo dessa
                evolução.
              </p>

              <p className="mt-4 text-sm font-black text-[#E11D2E]">
                Clique no painel para ampliar e ler melhor.
              </p>

              <div className="mx-auto mt-10 max-w-5xl overflow-hidden rounded-[2rem] border border-[#E11D2E]/20 bg-[#FFF8E7] p-3 shadow-2xl">
                <a
                  href="#painel-ampliado"
                  className="block"
                  aria-label="Clique para ampliar o painel da Hot Dogueres"
                >
                  <div className="relative flex h-[320px] w-full cursor-zoom-in items-center justify-center overflow-hidden rounded-[1.5rem] bg-[#FFF1B8] md:h-[520px]">
                    <Image
                      src="/images/painel-hot-dogueres.png"
                      alt="Painel da Hot Dogueres"
                      fill
                      className="object-contain p-3"
                      sizes="100vw"
                      priority
                    />

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-[#E11D2E] px-5 py-2 text-xs font-black uppercase tracking-wide text-white shadow-lg">
                      Clique para ampliar
                    </div>
                  </div>
                </a>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {GRUPOS_MOMENTOS.map((grupo, grupoIndex) => (
                <article
                  key={grupo.titulo}
                  className="rounded-[2rem] border border-[#E11D2E]/20 bg-[#FFF1B8] p-5 shadow-2xl md:p-6"
                >
                  <div className="rounded-[1.5rem] bg-white p-5 text-center shadow-md">
                    <p className="inline-flex rounded-full bg-[#E11D2E] px-4 py-2 text-xs font-black uppercase tracking-wide text-white">
                      Box {grupoIndex + 1}
                    </p>

                    <h3 className="mt-3 text-2xl font-black text-[#000000]">
                      {grupo.titulo}
                    </h3>

                    <p className="mt-3 text-sm font-semibold leading-relaxed text-[#000000]/70">
                      {grupo.descricao}
                    </p>
                  </div>

                  <div className="mt-5 grid gap-4">
                    {grupo.momentos.map((momento, indexDentroGrupo) => {
                      const indexOriginal = grupoIndex * 4 + indexDentroGrupo;

                      return (
                        <div
                          key={momento.titulo}
                          className="grid overflow-hidden rounded-[1.5rem] border border-[#E11D2E]/10 bg-[#FFF8E7] shadow-lg transition hover:-translate-y-1 hover:shadow-xl sm:grid-cols-[110px_1fr]"
                        >
                          <div className="flex min-h-[130px] items-center justify-center bg-gradient-to-br from-[#E11D2E] via-[#FFB000] to-[#FFE99A] p-4 text-center">
                            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-xl font-black text-[#E11D2E] shadow-lg">
                              {String(indexOriginal + 1).padStart(2, "0")}
                            </span>
                          </div>

                          <div className="flex flex-col justify-center p-5">
                            <p className="text-[10px] font-black uppercase tracking-wide text-[#E11D2E]">
                              Registro em breve
                            </p>

                            <h4 className="mt-2 text-xl font-black leading-tight text-[#000000]">
                              {momento.titulo}
                            </h4>

                            <p className="mt-2 text-sm font-semibold leading-relaxed text-[#000000]/70">
                              {momento.descricao}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <div
          id="painel-ampliado"
          className="fixed inset-0 z-50 hidden items-center justify-center bg-black/90 p-4 target:flex"
        >
          <a
            href="#momentos-jornada"
            className="absolute inset-0 cursor-zoom-out"
            aria-label="Fechar imagem ampliada"
          />

          <div className="relative z-10 flex h-[92vh] w-full max-w-7xl items-center justify-center rounded-3xl bg-[#111111] p-3 shadow-2xl">
            <a
              href="#momentos-jornada"
              className="absolute right-4 top-4 z-20 rounded-full bg-[#E11D2E] px-4 py-2 text-sm font-black text-white shadow-lg transition hover:bg-[#B11226]"
              aria-label="Fechar imagem ampliada"
            >
              Fechar ✕
            </a>

            <div className="relative h-full w-full">
              <Image
                src="/images/painel-hot-dogueres.png"
                alt="Painel da Hot Dogueres ampliado"
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
          </div>
        </div>

        <section className="bg-white px-6 py-16 md:px-10 lg:px-16">
          <div className="mx-auto max-w-5xl">
            <div className="mb-10 text-center">
              <p className="text-sm font-black uppercase tracking-[0.25em] text-[#E11D2E]">
                A Jornada da Hot Dogueres
              </p>

              <h2 className="mt-3 text-3xl font-black text-[#000000] md:text-5xl">
                Uma história feita com verdade, trabalho e propósito.
              </h2>
            </div>

            <div className="space-y-6 text-lg font-medium leading-relaxed text-[#000000]/85">
              <p>
                A Hot Dogueres nasceu de um sonho simples, mas com uma visão
                grande. Desde o começo, ela nunca foi apenas sobre vender hot
                dog. Sempre foi sobre construir algo com verdade, trabalho e
                propósito.
              </p>

              <div className="rounded-[2rem] border-l-8 border-[#E11D2E] bg-[#FFF1B8] p-8 text-xl font-black leading-relaxed text-[#000000] shadow-xl md:text-2xl">
                “A Hot Dogueres nasceu para ser grande, não em estrutura física,
                mas em solidariedade, dignidade e conhecimento. Faço o que amo,
                e essas doações são só mais uma forma de agradecer.”
              </div>

              <p>
                Essa frase resume muito do que a marca representa. A Hot
                Dogueres nasceu do alimento, mas também nasceu da vontade de
                servir, compartilhar, aprender e devolver para as pessoas um
                pouco do que a vida nos permite construir.
              </p>

              <p>
                Ao longo dessa caminhada rumo aos nossos 2 anos de inauguração,
                existiram momentos muito bons, mas também momentos muito
                difíceis. Houve dias de alegria, crescimento e esperança. Mas
                também houve dias de incerteza, poucas vendas, falta de
                mercadorias e escolhas difíceis sobre o que comprar para
                conseguir continuar.
              </p>

              <p>
                Uma das maiores dores dessa jornada foi o falecimento do meu
                pai, em fevereiro deste ano. Ele sempre esteve comigo, sempre me
                ajudou, acreditava em mim, no meu trabalho e tinha muito orgulho
                da Hot Dogueres. Construímos parte dessa história juntos.
              </p>

              <p>
                Em alguns momentos, pensei em fechar, parar e desistir. Mas
                então pensei nele. Pensei em tudo que construímos juntos, em
                tudo que ele acreditava, e entendi que desistir não seria o que
                ele iria querer.
              </p>

              <p className="text-2xl font-black text-[#E11D2E]">
                Por isso, continuei.
              </p>

              <p>
                A Hot Dogueres segue de pé não porque o caminho foi fácil, mas
                porque existe amor, memória, propósito e uma vontade sincera de
                transformar essa marca em algo maior do que um ponto de venda.
              </p>

              <p>
                O hot dog continua sendo nossa raiz. Mas a Hot Dogueres é também
                uma história de resistência, família, solidariedade, dignidade,
                conhecimento e futuro.
              </p>
            </div>
          </div>
        </section>

        <section className="px-6 py-16 md:px-10 lg:px-16">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 text-center">
              <p className="text-sm font-black uppercase tracking-[0.25em] text-[#E11D2E]">
                Valores da marca
              </p>

              <h2 className="mt-3 text-3xl font-black text-[#000000] md:text-5xl">
                O que sustenta a Hot Dogueres.
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {VALORES_DA_MARCA.map((valor) => (
                <article
                  key={valor.titulo}
                  className="rounded-[2rem] border border-[#E11D2E]/20 bg-[#FFF1B8] p-6 shadow-xl transition hover:-translate-y-1 hover:shadow-2xl"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-4xl shadow-md">
                    {valor.icone}
                  </div>

                  <h3 className="mt-5 text-2xl font-black text-[#000000]">
                    {valor.titulo}
                  </h3>

                  <p className="mt-3 text-sm font-bold leading-relaxed text-[#000000]/70">
                    {valor.descricao}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="caminhe-com-a-gente"
          className="px-6 py-16 md:px-10 lg:px-16"
        >
          <div className="mx-auto max-w-6xl rounded-[2rem] border border-[#E11D2E]/20 bg-[#FFF1B8] p-8 shadow-2xl md:p-12">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.25em] text-[#E11D2E]">
                  Caminhe com a gente
                </p>

                <h2 className="mt-3 text-3xl font-black text-[#000000] md:text-5xl">
                  Cada apoio faz parte dessa construção.
                </h2>
              </div>

              <div className="space-y-5 text-lg font-semibold leading-relaxed text-[#000000]/80">
                <p>
                  Cada cliente, cada amigo, cada pessoa que compra, compartilha,
                  indica ou acompanha a Hot Dogueres faz parte dessa construção.
                </p>

                <p>
                  Quando você apoia a Hot Dogueres, você não está apenas
                  comprando um lanche. Você está ajudando uma marca a continuar
                  viva, crescer com propósito e transformar dor, trabalho e
                  esperança em algo maior.
                </p>

                <p>
                  A Hot Dogueres ainda está sendo escrita. Cada venda, cada
                  conversa, cada apoio e cada passo fazem parte dessa caminhada.
                </p>
              </div>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-4">
              {["Trabalho", "Família", "Solidariedade", "Futuro"].map(
                (item) => (
                  <div
                    key={item}
                    className="rounded-2xl bg-[#FFE99A] p-5 text-center shadow-lg"
                  >
                    <p className="text-lg font-black text-[#000000]">
                      {item}
                    </p>
                  </div>
                ),
              )}
            </div>
          </div>
        </section>

        <section className="px-6 pb-24 pt-10 md:px-10 lg:px-16">
          <div className="mx-auto max-w-6xl">
            <div className="relative overflow-hidden rounded-[2rem] border border-[#E11D2E]/20 bg-[#000000] p-8 text-center text-white shadow-2xl md:p-12">
              <div className="absolute left-[-100px] top-[-100px] h-72 w-72 rounded-full bg-[#E11D2E]/40 blur-3xl" />
              <div className="absolute bottom-[-120px] right-[-100px] h-80 w-80 rounded-full bg-[#FFE99A]/25 blur-3xl" />

              <div className="relative">
                <p className="text-sm font-black uppercase tracking-[0.25em] text-[#FFE99A]">
                  Uma marca construída com propósito
                </p>

                <h2 className="mt-4 text-3xl font-black md:text-5xl">
                  O hot dog é a nossa origem. A marca é o nosso futuro.
                </h2>

                <div className="mx-auto mt-6 max-w-4xl space-y-5 text-lg leading-relaxed text-white/80">
                  <p>
                    A Hot Dogueres não nasceu pronta. Ela está sendo construída
                    dia após dia, com trabalho, memória, fé, coragem e gente que
                    acredita.
                  </p>

                  <p className="font-black text-white">
                    O nosso começo é o hot dog.
                    <br />
                    A nossa base é a família.
                    <br />
                    A nossa força vem da comunidade.
                    <br />
                    E o nosso futuro será construído com solidariedade,
                    dignidade e conhecimento.
                  </p>

                  <p>
                    A Hot Dogueres continuará vendendo hot dog, porque essa é a
                    nossa raiz. Mas ela também seguirá crescendo como marca,
                    como movimento e como símbolo de que é possível transformar
                    uma ideia simples em uma história grande.
                  </p>
                </div>

                <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                  <Link
                    href="/"
                    className="rounded-full bg-[#E11D2E] px-7 py-3 text-sm font-black uppercase tracking-wide text-white transition hover:scale-105 hover:bg-[#B11226]"
                  >
                    Voltar para o início
                  </Link>

                  <Link
                    href="/clube-de-membros"
                    className="rounded-full bg-[#FFE99A] px-7 py-3 text-sm font-black uppercase tracking-wide text-[#000000] transition hover:scale-105 hover:bg-[#FFE27A]"
                  >
                    Conhecer o Clube
                  </Link>

                  <Link
                    href="/impacto-social"
                    className="rounded-full border border-white/25 bg-white/10 px-7 py-3 text-sm font-black uppercase tracking-wide text-white transition hover:scale-105 hover:bg-white/20"
                  >
                    Ver Impacto Social
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
