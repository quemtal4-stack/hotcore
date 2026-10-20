import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import SetasNavegacao from "@/components/SetasNavegacao";

export const metadata: Metadata = {
  title: "Clube de Membros | Hot Dogueres",
  description:
    "Faça parte do Clube de Membros Hot Dogueres. Benefícios para você, apoio a famílias em vulnerabilidade, animais de rua e força para nossos eventos.",
};

export default function ClubeDeMembrosPage() {
 const planos = [
  {
    nome: "Apoiador",
    preco: "R$ 19,90",
    periodo: "/mês",
    destaque: false,
    descricao:
      "Para quem quer apoiar a Hot Dogueres, receber benefícios básicos e ajudar quem mais precisa.",
    impacto: "A Hot Dogueres doa 1 kg de alimento por mês em nome deste membro.",
    beneficios: [
      "Participação no Clube de Membros Hot Dogueres.",
      "Desconto exclusivo na Hot Dogueres.",
      "Desconto no livro infantil.",
      "Desconto na trilogia A História do Hot Dog.",
      "Participação em sorteios e campanhas.",
      "Acesso a novidades e bastidores da marca.",
      "Nome na lista de apoiadores, mediante autorização.",
      "Contribui para a meta anual de 104 toneladas de alimentos.",
      "Também ajuda ações voltadas a famílias em vulnerabilidade e animais de rua.",
    ],
    botao: "Quero ser Apoiador",
    href: "/clube/cadastro?plano=apoiador",
  },
  {
    nome: "Lenda Solidária",
    preco: "R$ 29,90",
    periodo: "/mês",
    destaque: false,
    descricao:
      "Para quem gosta de estar presente nos eventos, participar da comunidade e viver a experiência Hot Dogueres de perto.",
    impacto: "A Hot Dogueres doa 1 kg de alimento por mês em nome deste membro.",
    beneficios: [
      "Todos os benefícios do Plano Apoiador.",
      "Crachá digital de Membro Lenda Solidária.",
      "Identificação especial como membro presente nos eventos.",
      "Prioridade em informações sobre calendário, ações e campanhas.",
      "Participação em grupos, listas ou comunicações exclusivas do clube, quando disponíveis.",
      "Prioridade em experiências presenciais gratuitas, quando houver limite de vagas.",
      "Reconhecimento como membro ativo da comunidade Hot Dogueres.",
      "Benefícios voltados para quem acompanha os eventos de perto.",
      "Contribui para a meta anual de 104 toneladas de alimentos.",
    ],
    botao: "Quero ser Lenda Solidária",
    href: "/clube/cadastro?plano=lendario",

  },
  {
    nome: "Fundador",
    preco: "R$ 39,90",
    periodo: "/mês",
    destaque: true,
    descricao:
      "Para quem quer participar mais de perto da construção da Hot Dogueres e ter acesso a benefícios especiais.",
    impacto: "A Hot Dogueres doa 1 kg de alimento por mês em nome deste membro.",
    beneficios: [
      "Todos os benefícios do Plano Apoiador.",
      "Desconto maior na Hot Dogueres.",
      "Jogo A História do Hot Dog liberado gratuitamente para jogar.",
      "Ingresso colecionável em eventos selecionados.",
      "Hot dog do evento, quando disponível.",
      "Prioridade em campanhas, novidades e eventos.",
      "Participação em sorteios exclusivos.",
      "Acesso a conteúdos especiais da marca.",
      "Participação em enquetes e decisões simbólicas do ecossistema, quando houver.",
      "Futuramente, acesso online a transmissões e bastidores dos eventos, quando houver estrutura disponível.",
      "Contribui para a meta anual de 104 toneladas de alimentos.",
    ],
    botao: "Quero ser Fundador",
    href: "/clube/cadastro?plano=fundador",
  },
  {
    nome: "Colecionador",
    preco: "R$ 59,90",
    periodo: "/mês",
    destaque: false,
    descricao:
      "Para quem ama o universo Hot Dogueres e quer colecionar ingressos digitais especiais da marca.",
    impacto: "A Hot Dogueres doa 1 kg de alimento por mês em nome deste membro.",
    beneficios: [
      "Todos os benefícios do Plano Fundador.",
      "Recebe os ingressos colecionáveis digitais dos eventos Hot Dogueres.",
      "Recebe um ingresso colecionável super especial exclusivo para membros Colecionadores.",
      "Ingresso especial personalizado com o nome do membro, quando aplicável.",
      "Acesso antecipado a novidades de colecionáveis.",
      "Participação em campanhas especiais ligadas à Área do Colecionador.",
      "Nome na lista de membros colecionadores, mediante autorização.",
      "Benefícios pensados para quem acompanha a história e quer guardar cada fase da marca.",
      "Contribui para a meta anual de 104 toneladas de alimentos.",
    ],
    botao: "Quero ser Colecionador",
    href: "/clube/cadastro?plano=colecionador",
  },
  {
    nome: "Guardião",
    preco: "R$ 89,90",
    periodo: "/mês",
    destaque: false,
    descricao:
      "Para quem quer gerar um impacto social maior todos os meses e fortalecer diretamente as ações solidárias.",
    impacto: "A Hot Dogueres doa 3 kg de alimentos por mês em nome deste membro.",
    beneficios: [
      "Todos os benefícios do Plano Fundador.",
      "Impacto solidário ampliado com 3 kg de alimentos por mês.",
      "Reconhecimento como Guardião da campanha de alimentos.",
      "Nome em destaque nas ações solidárias, mediante autorização.",
      "Prioridade em campanhas sociais e convites especiais.",
      "Participação em sorteios exclusivos do Clube.",
      "Ingresso colecionável em eventos selecionados.",
      "Acesso a conteúdos especiais sobre o impacto social da Hot Dogueres.",
      "Plano ideal para quem quer ajudar mais famílias ao longo do ano.",
      "Contribui de forma reforçada para a meta anual de 104 toneladas de alimentos.",
    ],
    botao: "Quero ser Guardião",
    href: "/clube/cadastro?plano=guardiao",
  },
  {
    nome: "Eternizado",
    preco: "R$ 497,00",
    periodo: "/ano",
    destaque: false,
    descricao:
      "Para quem quer deixar seu nome marcado na história da Hot Dogueres e apoiar uma causa com propósito.",
    impacto:
      "No plano anual, a Hot Dogueres viabiliza 1 cesta básica em nome deste membro.",
    beneficios: [
      "Todos os benefícios do Plano Fundador.",
      "Jogo A História do Hot Dog liberado gratuitamente para jogar.",
      "Livro digital gratuito.",
      "Desconto especial no livro físico.",
      "Desconto especial na trilogia A História do Hot Dog.",
      "Camisa oficial do evento ou da Hot Dogueres.",
      "Ingresso colecionável especial.",
      "Certificado de Membro Eternizado.",
      "Nome na galeria de membros eternizados, mediante autorização.",
      "Hot dog do evento, quando disponível.",
      "Prioridade máxima em campanhas, novidades e eventos.",
      "Futuramente, acesso online a transmissões e bastidores dos eventos, quando houver estrutura disponível.",
      "Uma cesta básica anual será destinada a uma família em situação de vulnerabilidade.",
      "Parte da assinatura também contribui com ações voltadas a animais de rua.",
    ],
    botao: "Quero ser Eternizado",
    href: "/clube/cadastro?plano=eternizado",
  },
];


  const impactos = [
  "Meta anual: 104 toneladas de alimentos",
  "Apoiador: 1 kg de alimento por mês",
  "Lenda Solidária: 1 kg de alimento por mês",
  "Fundador: 1 kg de alimento por mês",
  "Colecionador: 1 kg de alimento por mês",
  "Guardião: 3 kg de alimentos por mês",
  "Eternizado: 1 cesta básica anual",
  "Feiras de Tecnologia: entrada solidária de 1 kg de alimento",
  "Famílias ajudadas: em breve",
  "Animais de rua apoiados: em breve",
];


const beneficiosGerais = [
  "Descontos na Hot Dogueres",
  "Sorteios exclusivos",
  "Acesso a novidades",
  "Bastidores da marca",
  "Ingresso colecionável",
  "Ingresso colecionável especial para membros Colecionadores",
  "Crachá digital de membro",
  "Reconhecimento na comunidade, mediante autorização",
  "Hot dog do evento, quando disponível",
  "Jogo liberado a partir do Plano Fundador",
  "Livro digital gratuito no Plano Eternizado",
  "Desconto no livro físico",
  "Camisa oficial em plano especial",
  "Certificado de membro",
  "Apoio mensal com alimentos",
  "Apoio a famílias vulneráveis",
  "Apoio a animais de rua",
  "Futuro acesso online aos eventos",
  "Participação em campanhas e ações especiais",
  "Contribuição para a meta de 104 toneladas",
];

  const destaquesClube = [
  {
    icone: "🥫",
    titulo: "Alimento todo mês",
    texto: "Cada plano contribui com alimentos que entram na meta solidária anual.",
  },
  {
    icone: "🎟️",
    titulo: "Colecionáveis",
    texto: "Ingressos digitais, itens especiais e experiências ligadas ao universo Hot Dogueres.",
  },
  {
    icone: "🎮",
    titulo: "Universo exclusivo",
    texto: "Jogo, livros, bastidores, novidades e conteúdos especiais para membros.",
  },
  {
    icone: "❤️",
    titulo: "Impacto real",
    texto: "O clube fortalece ações para famílias, crianças, animais e projetos sociais.",
  },
];

  return (
    <>
      <style>
        {`
          @keyframes clubeCarousel {
            0%, 16% {
              opacity: 1;
              transform: translateX(0) scale(1);
              z-index: 5;
            }

            20%, 100% {
              opacity: 0;
              transform: translateX(-35px) scale(0.94);
              z-index: 1;
            }
          }

          @keyframes clubeDot {
            0%, 16% {
              width: 34px;
              background: #FFE99A;
              opacity: 1;
            }

            20%, 100% {
              width: 10px;
              background: rgba(255, 233, 154, 0.35);
              opacity: 0.7;
            }
          }

          @keyframes clubeBrilho {
            0%, 100% {
              transform: translateX(-120%) rotate(15deg);
              opacity: 0;
            }

            10%, 20% {
              opacity: 0.45;
            }

            35% {
              transform: translateX(120%) rotate(15deg);
              opacity: 0;
            }
          }

          .clube-carousel-card {
            opacity: 0;
            animation: clubeCarousel 25s infinite ease-in-out;
          }

          .clube-carousel-card:nth-of-type(1) {
            animation-delay: 0s;
          }

          .clube-carousel-card:nth-of-type(2) {
            animation-delay: 5s;
          }

          .clube-carousel-card:nth-of-type(3) {
            animation-delay: 10s;
          }

          .clube-carousel-card:nth-of-type(4) {
            animation-delay: 15s;
          }

          .clube-carousel-card:nth-of-type(5) {
            animation-delay: 20s;
          }

          .clube-carousel-dot {
            animation: clubeDot 25s infinite ease-in-out;
          }

          .clube-carousel-dot:nth-of-type(1) {
            animation-delay: 0s;
          }

          .clube-carousel-dot:nth-of-type(2) {
            animation-delay: 5s;
          }

          .clube-carousel-dot:nth-of-type(3) {
            animation-delay: 10s;
          }

          .clube-carousel-dot:nth-of-type(4) {
            animation-delay: 15s;
          }

          .clube-carousel-dot:nth-of-type(5) {
            animation-delay: 20s;
          }

          .clube-brilho-card::before {
            content: "";
            position: absolute;
            inset: -40%;
            background: linear-gradient(
              90deg,
              transparent,
              rgba(255, 255, 255, 0.75),
              transparent
            );
            animation: clubeBrilho 5s infinite ease-in-out;
            pointer-events: none;
          }

          @media (prefers-reduced-motion: reduce) {
            .clube-carousel-card,
            .clube-carousel-dot,
            .clube-brilho-card::before {
              animation: none;
            }

            .clube-carousel-card:first-of-type {
              opacity: 1;
              transform: translateX(0) scale(1);
              z-index: 5;
            }

            .clube-carousel-dot:first-of-type {
              width: 34px;
              background: #FFE99A;
              opacity: 1;
            }
          }
        `}
      </style>

      <SetasNavegacao
  anterior="/ranking-do-bem"
  proxima="/area-do-colecionador"
  labelAnterior="Voltar para Ranking do Bem"
  labelProxima="Ir para Área do Colecionador"
/>

      <main className="min-h-screen overflow-x-hidden bg-[#FFF8E7] text-[#000000]">

        <section className="relative overflow-hidden px-6 py-10 md:px-10 lg:px-16">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#FFE27A_0%,#FFF1B8_30%,#FFB347_48%,#291B43_62%,#080A1F_100%)]" />

          <div className="absolute left-1/2 top-0 h-full w-56 -translate-x-1/2 bg-[#FF7A1A]/35 blur-3xl" />

          <div className="absolute left-[2%] top-[115px] h-60 w-60 rounded-full bg-[#FFD21F] shadow-[0_0_110px_45px_rgba(255,210,31,0.72)] md:h-80 md:w-80 lg:left-[4%] lg:top-[150px] lg:h-96 lg:w-96" />
          <div className="absolute left-[8%] top-[180px] h-36 w-36 rounded-full bg-[#FFF4A8]/80 blur-xl md:h-48 md:w-48 lg:left-[10%] lg:top-[230px]" />

          <div className="absolute right-[2%] top-[90px] h-60 w-60 rounded-full bg-[#F5F0D8] shadow-[0_0_110px_35px_rgba(245,240,216,0.55)] md:h-80 md:w-80 lg:right-[4%] lg:top-[135px] lg:h-96 lg:w-96" />
          <div className="absolute right-[8%] top-[105px] h-56 w-56 rounded-full bg-[#080A1F]/80 md:h-72 md:w-72 lg:right-[10%] lg:top-[155px] lg:h-[22rem] lg:w-[22rem]" />

          <div className="absolute right-[10%] top-[80px] h-2 w-2 rounded-full bg-white/80 shadow-[60px_50px_0_rgba(255,255,255,0.7),120px_10px_0_rgba(255,255,255,0.5),180px_90px_0_rgba(255,255,255,0.6),90px_150px_0_rgba(255,255,255,0.4),240px_170px_0_rgba(255,255,255,0.5),300px_80px_0_rgba(255,255,255,0.45)]" />

          <div className="absolute bottom-8 right-[-8%] h-44 w-[760px] rounded-full bg-black/45 blur-2xl" />
          <div className="absolute bottom-28 right-[2%] h-28 w-72 rounded-full bg-white/15 blur-2xl" />
          <div className="absolute bottom-44 right-[14%] h-24 w-56 rounded-full bg-orange-500/25 blur-xl" />
          <div className="absolute bottom-20 right-[24%] h-28 w-72 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute bottom-0 right-[5%] h-32 w-[700px] rounded-full bg-[#E11D2E]/25 blur-3xl" />

          <div className="absolute bottom-0 right-[0%] h-[520px] w-[520px] rounded-full bg-[#E11D2E]/35 blur-3xl" />
          <div className="absolute right-[22%] top-[35%] h-52 w-52 rounded-full bg-[#FF6A00]/25 blur-3xl" />

          <div className="relative mx-auto max-w-[1500px]">
          

            <div className="relative mt-10 min-h-[1000px] md:min-h-[940px] lg:min-h-[850px]">
              <div className="pointer-events-auto absolute left-[-70px] top-[500px] z-10 hidden sm:block sm:left-[-50px] sm:top-[440px] md:left-[-20px] md:top-[360px] lg:left-[-60px] lg:top-[170px] xl:left-[-80px]">

                <button
                  type="button"
                  aria-label="Ampliar herói Hot Dogueres"
                  className="group relative cursor-pointer rounded-[2rem] outline-none transition duration-300 hover:scale-110 focus:scale-110 active:scale-110"
                >
                  <div className="absolute inset-x-8 bottom-6 h-16 rounded-full bg-black/40 blur-xl transition group-hover:bg-black/50" />

                  <Image
                    src="/images/personagens/mestre-dogueiro-heroi-sem-fundo.png"
                    alt="Herói aventureiro da Hot Dogueres"
                    width={900}
                    height={1100}
                    priority
                    unoptimized
                    className="relative z-10 h-auto w-[300px] object-contain drop-shadow-[0_32px_28px_rgba(0,0,0,0.38)] transition duration-300 sm:w-[390px] md:w-[500px] lg:w-[600px] xl:w-[500px]"
                  />

                  <span className="absolute -bottom-4 left-1/2 z-20 w-max -translate-x-1/2 rounded-full bg-[#FFF1B8] px-4 py-2 text-xs font-black uppercase tracking-wide text-[#000000] shadow-lg opacity-0 transition group-hover:opacity-100 group-focus:opacity-100">
                    Guardião do sabor
                  </span>
                </button>
              </div>

             <div className="pointer-events-auto absolute right-[-120px] top-[560px] z-10 hidden sm:block sm:right-[-140px] sm:top-[470px] md:right-[-150px] md:top-[380px] lg:right-[-250px] lg:top-[150px] xl:right-[-330px] xl:top-[150px] 2xl:right-[-390px]">

                <button
                  type="button"
                  aria-label="Ampliar vilão robô Hot Dogueres"
                  className="group relative cursor-pointer rounded-[2rem] outline-none transition duration-300 hover:scale-110 focus:scale-110 active:scale-110"
                >
                  <div className="absolute inset-x-6 bottom-6 h-24 rounded-full bg-black/75 blur-2xl transition group-hover:bg-black/85" />

                  <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E11D2E]/25 blur-3xl transition group-hover:bg-[#E11D2E]/45" />

                  <Image
                    src="/images/personagens/robo-vilao-hotdog.png"
                    alt="Vilão robótico da Hot Dogueres"
                    width={1200}
                    height={1200}
                    priority
                    unoptimized
                    className="relative z-10 h-auto w-[360px] object-contain drop-shadow-[0_40px_35px_rgba(0,0,0,0.7)] transition duration-300 sm:w-[480px] md:w-[640px] lg:w-[820px] xl:w-[980px]"
                  />

                  <span className="absolute -bottom-4 left-1/2 z-20 w-max -translate-x-1/2 rounded-full bg-[#11142E] px-4 py-2 text-xs font-black uppercase tracking-wide text-[#FFE99A] shadow-lg opacity-0 transition group-hover:opacity-100 group-focus:opacity-100">
                    Parece invencível, mas esconde solidão
                  </span>
                </button>
              </div>

              <div className="relative z-20 mx-auto max-w-2xl pt-4 text-center lg:pt-8">
                <p className="mx-auto mb-4 inline-flex rounded-full bg-[#FFF1B8] px-4 py-2 text-sm font-black uppercase tracking-wide text-[#000000] shadow-md">
                  Clube de Membros Hot Dogueres
                </p>

                <div className="rounded-[2rem] border border-white/25 bg-black/50 p-5 shadow-2xl backdrop-blur-md md:p-7">
                  <h1 className="text-3xl font-black leading-tight text-[#FFF1B8] drop-shadow-[0_5px_0_rgba(0,0,0,0.35)] md:text-5xl">
                    Benefícios para você. Impacto real para quem precisa.
                  </h1>

                  <p className="mt-5 text-base leading-relaxed text-white md:text-lg">
                    Faça parte de uma comunidade que apoia a Hot Dogueres,
                    fortalece projetos culturais, ajuda famílias em estado de
                    vulnerabilidade e contribui com ações voltadas aos animais
                    de rua.
                  </p>

                  <p className="mt-5 text-lg font-black text-[#FFE99A] md:text-xl">
                    Toda aventura tem um herói. Todo herói tem um desafio.
                  </p>

             <div className="mt-7 rounded-[1.8rem] border border-[#FFE99A]/40 bg-white/10 p-4 shadow-2xl backdrop-blur-md md:p-5">
  <div className="rounded-[1.5rem] bg-[#FFF1B8] p-5 text-[#000000] shadow-xl md:p-6">
    <p className="text-xs font-black uppercase tracking-[0.25em] text-[#E11D2E]">
      O que o clube movimenta
    </p>

    <h2 className="mt-3 text-2xl font-black leading-tight md:text-3xl">
      Benefícios para membros e alimento para quem precisa.
    </h2>

    <p className="mt-3 text-sm font-bold leading-relaxed text-[#000000]/75 md:text-base">
      Ao entrar para o Clube de Membros Hot Dogueres, você participa de uma
      comunidade que ajuda a construir eventos, histórias, jogos, livros,
      colecionáveis e ações sociais.
    </p>

    <div className="mt-6 grid gap-3 sm:grid-cols-2">
      {destaquesClube.map((item) => (
        <div
          key={item.titulo}
          className="rounded-2xl border border-[#E11D2E]/15 bg-white p-4 text-left shadow-md transition hover:-translate-y-1 hover:shadow-xl"
        >
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FFE99A] text-3xl shadow">
              {item.icone}
            </div>

            <div>
              <h3 className="text-base font-black text-[#000000]">
                {item.titulo}
              </h3>

              <p className="mt-1 text-xs font-bold leading-relaxed text-[#000000]/70">
                {item.texto}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>

    <div className="mt-6 grid gap-3 md:grid-cols-3">
      <div className="rounded-2xl bg-[#E11D2E] p-4 text-center text-white shadow-lg">
        <p className="text-2xl font-black">104t</p>
        <p className="mt-1 text-xs font-black uppercase tracking-wide">
          Meta anual
        </p>
      </div>

      <div className="rounded-2xl bg-[#000000] p-4 text-center text-[#FFE99A] shadow-lg">
        <p className="text-2xl font-black">Todo mês</p>
        <p className="mt-1 text-xs font-black uppercase tracking-wide">
          Apoio recorrente
        </p>
      </div>

      <div className="rounded-2xl bg-[#FFE99A] p-4 text-center text-[#000000] shadow-lg">
        <p className="text-2xl font-black">Comunidade</p>
        <p className="mt-1 text-xs font-black uppercase tracking-wide">
          Membros com propósito
        </p>
      </div>
    </div>
  </div>
</div>


                  <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row">
                    <a
                      href="#planos"
                      className="rounded-full bg-[#E11D2E] px-6 py-3 text-center text-sm font-black uppercase tracking-wide text-white shadow-lg shadow-red-500/30 transition hover:scale-105 hover:bg-[#B11226]"
                    >
                      Ver planos
                    </a>

                    <a
                      href="#proposito"
                      className="rounded-full border border-[#FFE99A]/40 bg-[#FFF1B8] px-6 py-3 text-center text-sm font-black uppercase tracking-wide text-[#000000] shadow-lg transition hover:scale-105 hover:bg-[#FFE99A]"
                    >
                      Entender o propósito
                    </a>
                  </div>
                </div>

                <p className="mx-auto mt-5 max-w-2xl text-sm font-bold text-white/90">
                  Toque nos personagens para ampliar.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="proposito"
          className="bg-[#FFF1B8] px-6 py-16 text-[#000000] md:px-10 lg:px-16"
        >
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.25em] text-[#E11D2E]">
                  Mais que um clube
                </p>

                <h2 className="mt-3 text-3xl font-black text-[#000000] md:text-5xl">
                  Uma causa construída com alimento, cuidado e comunidade.
                </h2>
              </div>

              <div className="space-y-5 text-lg leading-relaxed text-[#000000]">
                <p>
                  Ao assinar o Clube de Membros Hot Dogueres, você recebe
                  benefícios exclusivos e também participa de uma corrente do
                  bem.
                </p>

                <p>
                  Cada assinatura ajuda famílias em estado de vulnerabilidade,
                  animais de rua e contribui para que a Hot Dogueres continue
                  criando eventos, livros, jogos e experiências para a
                  comunidade.
                </p>

                <p className="font-black text-[#E11D2E]">
                  Na Hot Dogueres, o apoio de cada membro ajuda a transformar
                  uma ideia simples em uma história grande.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="planos" className="px-6 py-16 md:px-10 lg:px-16">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <p className="text-sm font-black uppercase tracking-[0.25em] text-[#E11D2E]">
                Escolha seu plano
              </p>

              <h2 className="mt-3 text-3xl font-black text-[#000000] md:text-5xl">
                Faça parte do Clube de Membros Hot Dogueres.
              </h2>

              <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-[#000000]/80">
                Todos os planos ajudam a fortalecer a Hot Dogueres, apoiar ações
                sociais e construir uma comunidade com propósito.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

              {planos.map((plano) => (
                <article
                  key={plano.nome}
                  className={`relative flex flex-col rounded-[2rem] border p-6 shadow-2xl ${
                    plano.destaque
                      ? "border-[#E11D2E] bg-[#E11D2E] text-white"
                      : "border-[#E11D2E]/20 bg-[#FFF1B8] text-[#000000]"
                  }`}
                >
                  {plano.destaque && (
                    <div className="absolute right-6 top-6 rounded-full bg-[#FFE99A] px-4 py-2 text-xs font-black uppercase tracking-wide text-[#000000] shadow-lg">
                      Mais escolhido
                    </div>
                  )}

                  <div className="pt-10">
                    <h3
                      className={`text-3xl font-black ${
                        plano.destaque ? "text-white" : "text-[#000000]"
                      }`}
                    >
                      {plano.nome}
                    </h3>

                    <p
                      className={`mt-4 text-sm leading-relaxed ${
                        plano.destaque ? "text-white/90" : "text-[#000000]/80"
                      }`}
                    >
                      {plano.descricao}
                    </p>

                    <div className="mt-6 flex items-end gap-1">
                      <span
                        className={`text-4xl font-black ${
                          plano.destaque ? "text-[#FFE99A]" : "text-[#E11D2E]"
                        }`}
                      >
                        {plano.preco}
                      </span>

                      <span
                        className={`mb-1 text-sm font-bold ${
                          plano.destaque
                            ? "text-white/90"
                            : "text-[#000000]/70"
                        }`}
                      >
                        {plano.periodo}
                      </span>
                    </div>
<div
  className={`mt-5 rounded-2xl p-4 text-sm font-black leading-relaxed ${
    plano.destaque
      ? "bg-white/15 text-[#FFE99A]"
      : "bg-white text-[#E11D2E]"
  }`}
>
  {plano.impacto}
</div>

                    <ul className="mt-8 space-y-3">
                      {plano.beneficios.map((beneficio) => (
                        <li
                          key={beneficio}
                          className={`flex gap-3 text-sm leading-relaxed ${
                            plano.destaque ? "text-white" : "text-[#000000]"
                          }`}
                        >
                          <span
                            className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-black ${
                              plano.destaque
                                ? "bg-[#FFE99A] text-[#000000]"
                                : "bg-[#E11D2E] text-white"
                            }`}
                          >
                            ✓
                          </span>

                          <span>{beneficio}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

               <Link
  href={plano.href}
  className={`mt-8 rounded-full px-6 py-3 text-center text-sm font-black uppercase tracking-wide shadow-lg transition hover:scale-105 ${
    plano.destaque
      ? "bg-[#FFE99A] text-[#000000] hover:bg-[#FFE27A]"
      : "bg-[#E11D2E] text-white hover:bg-[#B11226]"
  }`}
>
  {plano.botao}
</Link>

                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#FFF1B8] px-6 py-16 md:px-10 lg:px-16">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 text-center">
              <p className="text-sm font-black uppercase tracking-[0.25em] text-[#E11D2E]">
                Impacto social
              </p>

              <h2 className="mt-3 text-3xl font-black text-[#000000] md:text-5xl">
                Sua assinatura transforma histórias.
              </h2>

              <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-[#000000]/80">
                Cada membro ajuda a Hot Dogueres a levar alimento, cuidado e
                esperança para quem precisa. Parte dos recursos arrecadados será
                destinada a ações solidárias com famílias em estado de
                vulnerabilidade e também a iniciativas voltadas ao cuidado de
                animais de rua.
              </p>
            </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">

              {impactos.map((impacto) => (
                <div
                  key={impacto}
                  className="rounded-2xl border border-[#E11D2E]/20 bg-[#FFF8E7] p-5 text-center shadow-xl"
                >
                  <p className="text-sm font-black text-[#000000]">
                    {impacto}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-6 text-center text-sm font-bold text-[#E11D2E]">
              Os números serão atualizados conforme as ações forem realizadas
              pelo Clube de Membros Hot Dogueres.
            </p>
          </div>
        </section>

        <section className="px-6 py-16 md:px-10 lg:px-16">
          <div className="mx-auto max-w-6xl rounded-[2rem] border border-[#E11D2E]/20 bg-[#FFF1B8] p-8 shadow-2xl md:p-12">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.25em] text-[#000000]">
                  Experiências exclusivas
                </p>

                <h2 className="mt-3 text-3xl font-black text-[#000000] md:text-5xl">
                  Futuramente, acesso online aos eventos.
                </h2>
              </div>

              <div className="space-y-5 text-lg leading-relaxed text-[#000000]">
                <p>
                  Futuramente, os membros poderão ter acesso online a conteúdos
                  exclusivos, bastidores e transmissões dos eventos da Hot
                  Dogueres, quando houver estrutura técnica disponível.
                </p>

                <p>
                  Essa experiência será oferecida dentro da{" "}
                  <strong>Área do Membro Online</strong>, sem vínculo com espaço
                  físico exclusivo no local do evento.
                </p>

                <p className="font-black text-[#E11D2E]">
                  Não será uma área VIP física. Será uma experiência digital
                  exclusiva para membros, quando disponível.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-16 md:px-10 lg:px-16">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 text-center">
              <p className="text-sm font-black uppercase tracking-[0.25em] text-[#E11D2E]">
                Benefícios do clube
              </p>

              <h2 className="mt-3 text-3xl font-black text-[#000000] md:text-5xl">
                O que você encontra no Clube.
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {beneficiosGerais.map((beneficio) => (
                <div
                  key={beneficio}
                  className="rounded-2xl border border-[#E11D2E]/20 bg-[#FFF1B8] p-5 shadow-lg"
                >
                  <p className="text-sm font-black leading-relaxed text-[#000000]">
                    {beneficio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="entrar-para-o-clube"
          className="px-6 pb-24 pt-10 md:px-10 lg:px-16"
        >
          <div className="mx-auto max-w-6xl">
            <div className="rounded-[2rem] border border-[#E11D2E]/20 bg-[#FFF1B8] p-8 text-center shadow-2xl md:p-12">
              <p className="text-sm font-black uppercase tracking-[0.25em] text-[#000000]">
                Entre para o Clube
              </p>

              <h2 className="mt-4 text-3xl font-black text-[#000000] md:text-5xl">
                Escolha seu plano e faça parte dessa construção.
              </h2>

              <div className="mx-auto mt-6 max-w-4xl space-y-5 text-lg leading-relaxed text-[#000000]">
                <p>
                  Ao entrar para o Clube de Membros Hot Dogueres, você recebe
                  benefícios exclusivos e ajuda uma marca local a crescer com
                  propósito, solidariedade e compromisso com a comunidade.
                </p>

                <p className="font-black">
                  Benefícios para você.
                  <br />
                  Alimento para famílias.
                  <br />
                  Cuidado para animais de rua.
                  <br />
                  Força para nossos eventos e projetos.
                </p>
              </div>

              <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                <a
                  href="#planos"
                  className="rounded-full bg-[#E11D2E] px-7 py-3 text-sm font-black uppercase tracking-wide text-white transition hover:scale-105 hover:bg-[#B11226]"
                >
                  Escolher meu plano
                </a>

                <Link
                  href="/nossa-historia"
                  className="rounded-full border border-[#E11D2E]/30 bg-[#FFE99A] px-7 py-3 text-sm font-black uppercase tracking-wide text-[#000000] transition hover:scale-105 hover:bg-[#FFE27A]"
                >
                  Conhecer nossa história
                </Link>
              </div>

              <p className="mt-6 text-sm font-bold text-[#E11D2E]">
                Os botões dos planos já levam ao cadastro do Clube de Membros.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
