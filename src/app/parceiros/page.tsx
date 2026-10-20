import Link from "next/link";

const modalidades = [
  {
    titulo: "Parceiro Anual — Alimentação",
    vagas: "8 vagas",
    investimento: "R$ 10.000/mês",
    descricao:
      "Presença contínua durante o ano, participação no ecossistema e acesso aos benefícios previstos para a categoria.",
    emoji: "🥫",
  },
  {
    titulo: "Patrocínio Especial — Alimentação",
    vagas: "1 vaga",
    investimento: "R$ 150.000",
    descricao:
      "Participação concentrada em uma ação, evento ou projeto específico de grande impacto.",
    emoji: "🍴",
  },
  {
    titulo: "Parceiro Anual — Alimentação Animal",
    vagas: "10 vagas",
    investimento: "R$ 8.000/mês",
    descricao:
      "Parceria voltada às ações de proteção animal, aquisição de ração e projetos relacionados.",
    emoji: "🐾",
  },
  {
    titulo: "Patrocínio Especial — Alimentação Animal",
    vagas: "1 vaga",
    investimento: "R$ 120.000",
    descricao:
      "Patrocínio especial para ações voltadas aos animais, conforme planejamento e disponibilidade.",
    emoji: "🐶",
  },
  {
    titulo: "Parceiros por Permuta",
    vagas: "Limitado",
    investimento: "Conforme negociação",
    descricao:
      "Fornecimento de produtos ou serviços para eventos, projetos sociais, escolas ou ações específicas.",
    emoji: "🔄",
  },
  {
    titulo: "Vaga por Pontos",
    vagas: "Conforme regulamento",
    investimento: "Por desempenho",
    descricao:
      "Oportunidade conquistada pelo desempenho no Programa de Pontos Hot Dogueres.",
    emoji: "🏆",
  },
];

const pontos = [
  {
    titulo: "Participação",
    descricao: "Presença de representantes nos eventos e projetos.",
    emoji: "🤝",
  },
  {
    titulo: "Impacto Social",
    descricao: "Participação em ações sociais e solidárias.",
    emoji: "❤️",
  },
  {
    titulo: "Educação",
    descricao: "Apoio e participação em projetos educacionais.",
    emoji: "🎓",
  },
  {
    titulo: "Proteção Animal",
    descricao: "Envolvimento nas ações voltadas aos animais.",
    emoji: "🐾",
  },
  {
    titulo: "Meio Ambiente",
    descricao: "Participação em projetos ambientais e sustentáveis.",
    emoji: "🌱",
  },
  {
    titulo: "Tecnologia",
    descricao: "Apoio e participação em iniciativas de inovação.",
    emoji: "🤖",
  },
  {
    titulo: "Compromisso",
    descricao: "Cumprimento das obrigações e pagamentos dentro dos prazos.",
    emoji: "⏰",
  },
  {
    titulo: "Envolvimento",
    descricao: "Participação em diferentes projetos ao longo do ano.",
    emoji: "🚀",
  },
];

const passos = [
  {
    numero: "01",
    titulo: "Escolha sua modalidade",
    descricao:
      "Defina se sua empresa deseja uma parceria anual, patrocínio especial, patrocínio por evento ou participação por permuta.",
  },
  {
    numero: "02",
    titulo: "Conheça a proposta",
    descricao:
      "Nossa equipe apresenta detalhes da modalidade escolhida, benefícios, condições comerciais e regras de participação.",
  },
  {
    numero: "03",
    titulo: "Formalize a parceria",
    descricao:
      "Após aprovação, a parceria é formalizada por contrato, com assinatura digital ou assinatura em cartório, conforme o caso.",
  },
  {
    numero: "04",
    titulo: "Receba boletos e notas fiscais",
    descricao:
      "A empresa realiza seu cadastro para emissão de boletos, notas fiscais mensais e controle financeiro da parceria.",
  },
  {
    numero: "05",
    titulo: "Acompanhe sua empresa",
    descricao:
      "A empresa poderá acompanhar sua participação, pontuação e evolução dentro da Área do Parceiro HotCore.",
  },
];

export default function ParceirosPage() {
  return (
    <main className="min-h-screen bg-[#FFF8E7] text-gray-950">
      <section className="px-4 py-10 md:px-8 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 md:items-center">
          <div>
            <p className="w-fit rounded-full bg-red-100 px-4 py-2 text-xs font-black uppercase text-red-700">
              Programa de Parcerias Hot Dogueres 2027
            </p>

            <h1 className="mt-6 text-4xl font-black leading-tight md:text-6xl">
              Empresas e pessoas unidas por um bem maior.
            </h1>

            <p className="mt-6 text-lg font-bold leading-relaxed text-gray-700">
              Faça parte dessa grande ação solidária. Seja você também parceiro
              dessa grande corrente do bem e ajude a construir um ecossistema de
              impacto social, educação, cultura, meio ambiente, tecnologia e
              proteção animal.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#como-participar"
                className="rounded-full bg-red-600 px-7 py-4 text-center text-sm font-black uppercase text-white shadow-lg transition hover:bg-red-700"
              >
                Quero ser parceiro
              </a>

              <a
                href="#modalidades"
                className="rounded-full border-2 border-red-600 px-7 py-4 text-center text-sm font-black uppercase text-red-700 transition hover:bg-red-50"
              >
                Ver modalidades
              </a>
            </div>
          </div>

          <div className="min-h-[360px] rounded-[2rem] bg-gradient-to-br from-red-600 via-yellow-400 to-green-500 p-6 shadow-2xl">
            <div className="flex h-full min-h-[360px] flex-col justify-end rounded-[1.5rem] bg-white/90 p-6 shadow-xl">
              <p className="text-6xl">🤝</p>

              <h2 className="mt-4 text-3xl font-black">
                Uma parceria que vai além de mídia.
              </h2>

              <p className="mt-4 text-sm font-bold leading-relaxed text-gray-700">
                A empresa participa do ecossistema, acompanha sua evolução,
                acumula pontos, fortalece projetos e pode estar presente nas
                grandes ações do Hot Dogueres durante o ano.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 md:px-8">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-white p-6 shadow-xl md:p-10">
          <p className="text-sm font-black uppercase text-red-600">
            Como funciona
          </p>

          <h2 className="mt-3 text-3xl font-black md:text-5xl">
            A parceria empresarial é uma participação contínua no ecossistema.
          </h2>

          <p className="mt-5 max-w-4xl text-base font-bold leading-relaxed text-gray-700">
            A empresa pode participar por meio de parceria anual, patrocínio por
            evento ou permuta. Cada modalidade possui regras, benefícios,
            disponibilidade de vagas e condições específicas. A participação pode
            gerar presença institucional, acompanhamento na Área do Parceiro,
            programa de pontos e possibilidades comerciais futuras conforme os
            resultados do projeto.
          </p>
        </div>
      </section>

      <section id="modalidades" className="px-4 py-10 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <p className="text-sm font-black uppercase text-red-600">
              Cotas e oportunidades
            </p>

            <h2 className="mt-3 text-3xl font-black md:text-5xl">
              Escolha como sua marca quer fazer parte.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {modalidades.map((modalidade) => (
              <article
                key={modalidade.titulo}
                className="rounded-[2rem] bg-white p-6 shadow-xl"
              >
                <p className="text-5xl">{modalidade.emoji}</p>

                <h3 className="mt-5 text-2xl font-black">
                  {modalidade.titulo}
                </h3>

                <div className="mt-5 grid gap-3">
                  <div className="rounded-2xl bg-yellow-100 p-4">
                    <p className="text-xs font-black uppercase text-yellow-900">
                      Vagas
                    </p>
                    <p className="mt-1 font-black text-yellow-950">
                      {modalidade.vagas}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-green-100 p-4">
                    <p className="text-xs font-black uppercase text-green-900">
                      Investimento
                    </p>
                    <p className="mt-1 font-black text-green-950">
                      {modalidade.investimento}
                    </p>
                  </div>
                </div>

                <p className="mt-5 text-sm font-bold leading-relaxed text-gray-700">
                  {modalidade.descricao}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-10 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <p className="text-sm font-black uppercase text-red-600">
              Programa de Pontos
            </p>

            <h2 className="mt-3 text-3xl font-black md:text-5xl">
              Como sua empresa pode ganhar pontos?
            </h2>

            <p className="mt-4 max-w-4xl text-base font-bold leading-relaxed text-gray-700">
              Cada empresa poderá acompanhar sua própria evolução por meio da
              Área do Parceiro HotCore. O ranking público poderá apresentar as
              primeiras posições, mas os pontos individuais não precisam ser
              divulgados publicamente.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-4">
            {pontos.map((item) => (
              <article
                key={item.titulo}
                className="rounded-[2rem] bg-white p-6 shadow-xl"
              >
                <p className="text-4xl">{item.emoji}</p>

                <h3 className="mt-4 text-xl font-black">{item.titulo}</h3>

                <p className="mt-3 text-sm font-bold leading-relaxed text-gray-700">
                  {item.descricao}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-10 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
          <article className="rounded-[2rem] bg-red-600 p-8 text-white shadow-xl">
            <p className="text-sm font-black uppercase text-yellow-200">
              Grande momento
            </p>

            <h2 className="mt-3 text-3xl font-black">
              Festival Cultural Hot Dogueres
            </h2>

            <p className="mt-4 text-base font-bold leading-relaxed text-red-50">
              O resultado do programa de pontos será revelado no grande momento
              do ecossistema, com previsão para 04 de dezembro de 2027. O melhor
              desempenho poderá ser reconhecido conforme as regras do programa.
            </p>
          </article>

          <article className="rounded-[2rem] bg-white p-8 shadow-xl">
            <p className="text-sm font-black uppercase text-green-700">
              Bonificação em compras
            </p>

            <h2 className="mt-3 text-3xl font-black">
              Novas oportunidades comerciais.
            </h2>

            <p className="mt-4 text-base font-bold leading-relaxed text-gray-700">
              Quando houver recursos efetivamente destinados à aquisição de
              alimentos ou ração, poderão ser realizadas compras comerciais
              independentes junto aos parceiros habilitados, conforme as regras
              da categoria.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-yellow-100 p-4">
                <p className="text-xs font-black uppercase text-yellow-900">
                  Alimentação
                </p>
                <p className="mt-1 text-2xl font-black text-yellow-950">
                  Até 10%
                </p>
              </div>

              <div className="rounded-2xl bg-green-100 p-4">
                <p className="text-xs font-black uppercase text-green-900">
                  Ração
                </p>
                <p className="mt-1 text-2xl font-black text-green-950">
                  Até 16,67%
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section id="como-participar" className="px-4 py-10 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <p className="text-sm font-black uppercase text-red-600">
              Próximos passos
            </p>

            <h2 className="mt-3 text-3xl font-black md:text-5xl">
              Como fazer parte?
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-5">
            {passos.map((passo) => (
              <article
                key={passo.numero}
                className="rounded-[2rem] bg-white p-6 shadow-xl"
              >
                <p className="text-4xl font-black text-red-600">
                  {passo.numero}
                </p>

                <h3 className="mt-5 text-xl font-black">{passo.titulo}</h3>

                <p className="mt-3 text-sm font-bold leading-relaxed text-gray-700">
                  {passo.descricao}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-8 rounded-[2rem] border-4 border-yellow-300 bg-yellow-50 p-6 shadow-xl md:p-8">
            <h3 className="text-2xl font-black text-yellow-950">
              Área dos patrocinadores
            </h3>

            <p className="mt-4 text-sm font-bold leading-relaxed text-yellow-900">
              As empresas parceiras poderão aparecer na área de patrocinadores
              conforme disponibilidade, categoria contratada, data de
              formalização, assinatura do contrato e confirmação do primeiro
              pagamento. A ordem e os benefícios seguirão as regras comerciais do
              programa.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contato"
                className="rounded-full bg-red-600 px-7 py-4 text-center text-sm font-black uppercase text-white shadow-lg transition hover:bg-red-700"
              >
                Solicitar proposta
              </Link>

              <Link
                href="/"
                className="rounded-full border-2 border-red-600 px-7 py-4 text-center text-sm font-black uppercase text-red-700 transition hover:bg-red-50"
              >
                Voltar para início
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
