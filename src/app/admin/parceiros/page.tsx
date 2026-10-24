import AdminHeader from "../_components/AdminHeader";
import { verificarAdmin } from "@/app/admin/lib/auth";

const resumoParceiros = [
  {
    titulo: "Parceiros Anuais",
    valor: "12 meses",
    descricao:
      "Empresas com presença contínua no ecossistema Hot Dogueres durante o ano.",
    cor: "bg-red-100 text-red-800",
  },
  {
    titulo: "Patrocínio por Evento",
    valor: "Sob consulta",
    descricao:
      "Participação em eventos específicos, com valores definidos conforme o projeto.",
    cor: "bg-yellow-100 text-yellow-800",
  },
  {
    titulo: "Permutas",
    valor: "Negociável",
    descricao:
      "Fornecimento de produtos ou serviços em troca de presença institucional.",
    cor: "bg-green-100 text-green-800",
  },
  {
    titulo: "Programa de Pontos",
    valor: "Ranking anual",
    descricao:
      "Empresas acumulam pontos por participação, regularidade e impacto social.",
    cor: "bg-blue-100 text-blue-800",
  },
];

const modalidades = [
  {
    nome: "🥫 Parceiro Anual — Alimentação",
    vagas: "8 vagas",
    investimento: "R$ 10.000/mês",
    total: "R$ 120.000/ano",
    descricao:
      "Presença anual no ecossistema, participação nas ações e benefícios da categoria.",
  },
  {
    nome: "🍴 Patrocínio Especial — Alimentação",
    vagas: "1 vaga",
    investimento: "R$ 150.000",
    total: "Valor único",
    descricao:
      "Marca em destaque em ação, evento ou projeto específico de alimentação.",
  },
  {
    nome: "🏆 Vaga por Pontos — Alimentação",
    vagas: "1 vaga",
    investimento: "Conforme regulamento",
    total: "Bonificação por desempenho",
    descricao:
      "Oportunidade conquistada pela empresa com melhor desempenho no programa de pontos.",
  },
  {
    nome: "🐾 Parceiro Anual — Alimentação Animal",
    vagas: "12 vagas",
    investimento: "R$ 8.000/mês",
    total: "R$ 96.000/ano",
    descricao:
      "Parceria voltada às ações de proteção animal, ração e apoio a projetos relacionados.",
  },
  {
    nome: "🐶 Patrocínio Especial — Alimentação Animal",
    vagas: "1 vaga",
    investimento: "R$ 120.000",
    total: "Valor único",
    descricao:
      "Participação especial em uma ação ou campanha específica voltada aos animais.",
  },
  {
    nome: "🏆 Vaga por Pontos — Alimentação Animal",
    vagas: "1 vaga",
    investimento: "Conforme regulamento",
    total: "Bonificação por desempenho",
    descricao:
      "Reconhecimento para parceiro com maior participação dentro da categoria animal.",
  },
  {
    nome: "🔄 Parceiros por Permuta",
    vagas: "Limitado",
    investimento: "Conforme negociação",
    total: "Produto ou serviço",
    descricao:
      "Fornecimento de água, sucos, alimentos, brindes, serviços ou outros itens necessários.",
  },
];

const regrasPontos = [
  {
    acao: "🤝 Participação em eventos",
    pontos: "+50 pontos",
    descricao:
      "Presença de representantes da empresa em eventos oficiais do ecossistema.",
  },
  {
    acao: "❤️ Impacto social",
    pontos: "+80 pontos",
    descricao:
      "Participação em ações sociais, campanhas solidárias e atividades comunitárias.",
  },
  {
    acao: "🎓 Educação",
    pontos: "+80 pontos",
    descricao:
      "Apoio ou participação em projetos educacionais, como Hot Dogueres na Escola.",
  },
  {
    acao: "🐾 Proteção animal",
    pontos: "+80 pontos",
    descricao:
      "Envolvimento em ações com foco em animais, ração, adoção ou campanhas de cuidado.",
  },
  {
    acao: "🌱 Meio ambiente",
    pontos: "+70 pontos",
    descricao:
      "Participação em ações ambientais, sustentabilidade, reciclagem ou conscientização.",
  },
  {
    acao: "🤖 Tecnologia e inovação",
    pontos: "+70 pontos",
    descricao:
      "Apoio em iniciativas tecnológicas, sistemas, inovação ou soluções digitais.",
  },
  {
    acao: "⏰ Pagamento em dia",
    pontos: "+100 pontos/mês",
    descricao:
      "Pontuação mensal para empresas com obrigações financeiras em dia.",
  },
  {
    acao: "🚀 Envolvimento em múltiplos projetos",
    pontos: "+120 pontos",
    descricao:
      "Bonificação para empresas que participarem de diferentes frentes do ecossistema.",
  },
  {
    acao: "🎁 Doações extras",
    pontos: "+40 pontos",
    descricao:
      "Doações adicionais em produtos, serviços ou recursos aprovados pelo programa.",
  },
  {
    acao: "🔄 Permuta cumprida",
    pontos: "+100 pontos",
    descricao:
      "Entrega correta da quantidade combinada em contrato ou termo de parceria.",
  },
];

const fluxoAdesao = [
  {
    etapa: "01",
    titulo: "Cadastro da empresa",
    descricao:
      "A empresa informa dados cadastrais para contato, contrato e emissão de notas fiscais.",
  },
  {
    etapa: "02",
    titulo: "Escolha da modalidade",
    descricao:
      "Define se deseja parceria anual, patrocínio por evento ou parceria por permuta.",
  },
  {
    etapa: "03",
    titulo: "Recebimento da proposta",
    descricao:
      "A equipe apresenta valores, benefícios, regras, contrapartidas e disponibilidade.",
  },
  {
    etapa: "04",
    titulo: "Formalização do contrato",
    descricao:
      "Contrato com assinatura digital via Gov.br, assinatura eletrônica ou cartório.",
  },
  {
    etapa: "05",
    titulo: "Pagamento ou entrega da permuta",
    descricao:
      "Emissão de boleto, acompanhamento de pagamentos mensais ou controle da entrega acordada.",
  },
  {
    etapa: "06",
    titulo: "Acesso à Área do Parceiro",
    descricao:
      "A empresa acompanha participação, pontos, documentos, notas fiscais e ranking.",
  },
];

const rankingExemplo = [
  {
    posicao: "🥇 1º lugar",
    empresa: "Empresa cadastrada primeiro",
    status: "Ranking público sem exibir pontos",
  },
  {
    posicao: "🥈 2º lugar",
    empresa: "Aguardando adesão",
    status: "Disponível",
  },
  {
    posicao: "🥉 3º lugar",
    empresa: "Aguardando adesão",
    status: "Disponível",
  },
];

const documentos = [
  "Contrato de parceria",
  "Assinatura digital via Gov.br",
  "Assinatura em cartório, se necessário",
  "Boletos mensais",
  "Notas fiscais mensais",
  "Comprovantes de permuta",
  "Regulamento do programa de pontos",
];

export default async function AdminParceirosPage() {
  await verificarAdmin("/admin/parceiros");

  return (
    <main className="min-h-screen bg-[#FFF8E7] px-4 py-8 text-gray-950 md:px-8">
      <div className="mx-auto max-w-7xl">
        <AdminHeader
          titulo="Parceiros Empresariais"
          descricao="Gerencie o Programa de Parcerias Hot Dogueres 2027, planos anuais, patrocínios por evento, permutas, contratos, notas fiscais e programa de pontos."
        />

        <section className="grid gap-6 md:grid-cols-4">
          {resumoParceiros.map((item) => (
            <article
              key={item.titulo}
              className="rounded-3xl bg-white p-6 shadow-xl"
            >
              <div
                className={`inline-flex rounded-full px-4 py-2 text-xs font-black uppercase ${item.cor}`}
              >
                {item.titulo}
              </div>

              <h2 className="mt-5 text-3xl font-black text-gray-950">
                {item.valor}
              </h2>

              <p className="mt-3 text-sm font-bold leading-relaxed text-gray-600">
                {item.descricao}
              </p>
            </article>
          ))}
        </section>

        <section className="mt-8 rounded-3xl bg-gradient-to-r from-red-700 to-red-500 p-8 text-white shadow-xl">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-yellow-200">
            Programa Empresarial Hot Dogueres 2027
          </p>

          <h2 className="mt-4 max-w-4xl text-3xl font-black leading-tight md:text-5xl">
            Faça parte dessa grande ação solidária. Seja parceiro dessa grande
            corrente do bem.
          </h2>

          <p className="mt-5 max-w-3xl text-base font-bold leading-relaxed text-red-50">
            Empresas, pessoas e projetos unidos para gerar impacto social,
            educacional, ambiental, cultural, tecnológico e de proteção animal
            durante todo o ano.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-white/15 p-5 backdrop-blur">
              <p className="text-xs font-black uppercase text-yellow-200">
                Adesão
              </p>
              <p className="mt-2 text-lg font-black">Janeiro a agosto/2027</p>
            </div>

            <div className="rounded-2xl bg-white/15 p-5 backdrop-blur">
              <p className="text-xs font-black uppercase text-yellow-200">
                Evento final
              </p>
              <p className="mt-2 text-lg font-black">
                Festival Cultural — 04/12/2027
              </p>
            </div>

            <div className="rounded-2xl bg-white/15 p-5 backdrop-blur">
              <p className="text-xs font-black uppercase text-yellow-200">
                Reconhecimento
              </p>
              <p className="mt-2 text-lg font-black">
                Ranking anual dos parceiros
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-red-700">
                Cotas e oportunidades
              </p>

              <h2 className="mt-2 text-3xl font-black text-gray-950">
                Modalidades de parceria
              </h2>
            </div>

            <p className="max-w-xl text-sm font-bold leading-relaxed text-gray-600">
              As vagas são limitadas. A disponibilidade poderá ser atualizada
              conforme as adesões realizadas.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {modalidades.map((modalidade) => (
              <article
                key={modalidade.nome}
                className="rounded-3xl bg-white p-6 shadow-xl"
              >
                <div className="flex flex-col justify-between gap-4 md:flex-row">
                  <div>
                    <h3 className="text-xl font-black text-gray-950">
                      {modalidade.nome}
                    </h3>

                    <p className="mt-3 text-sm font-bold leading-relaxed text-gray-600">
                      {modalidade.descricao}
                    </p>
                  </div>

                  <div className="shrink-0 rounded-2xl bg-red-100 p-4 text-red-800">
                    <p className="text-xs font-black uppercase">Vagas</p>
                    <p className="mt-1 text-lg font-black">
                      {modalidade.vagas}
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl bg-yellow-100 p-4">
                    <p className="text-xs font-black uppercase text-yellow-800">
                      Investimento
                    </p>

                    <p className="mt-1 text-lg font-black text-yellow-900">
                      {modalidade.investimento}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-green-100 p-4">
                    <p className="text-xs font-black uppercase text-green-800">
                      Total estimado
                    </p>

                    <p className="mt-1 text-lg font-black text-green-900">
                      {modalidade.total}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-3xl bg-white p-6 shadow-xl">
          <div className="mb-6">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-700">
              Programa de pontos
            </p>

            <h2 className="mt-2 text-3xl font-black text-gray-950">
              Como sua empresa pode ganhar pontos?
            </h2>

            <p className="mt-3 max-w-4xl text-sm font-bold leading-relaxed text-gray-600">
              O programa de pontos deve medir participação real, compromisso,
              impacto social e envolvimento da empresa com o ecossistema. No
              site público, podemos mostrar apenas o ranking por posição, sem
              revelar a pontuação individual.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {regrasPontos.map((regra) => (
              <div
                key={regra.acao}
                className="rounded-2xl border-2 border-blue-100 bg-blue-50 p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-base font-black text-gray-950">
                    {regra.acao}
                  </h3>

                  <span className="shrink-0 rounded-full bg-blue-700 px-3 py-1 text-xs font-black text-white">
                    {regra.pontos}
                  </span>
                </div>

                <p className="mt-3 text-sm font-bold leading-relaxed text-gray-600">
                  {regra.descricao}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl bg-yellow-100 p-5">
            <h3 className="text-lg font-black text-yellow-900">
              Sugestão importante
            </h3>

            <p className="mt-2 text-sm font-bold leading-relaxed text-yellow-900">
              A pontuação completa deve ficar visível apenas na área
              administrativa e na Área do Parceiro. No site público, o ideal é
              mostrar somente a posição no ranking: 1º, 2º, 3º e demais
              colocações. Assim a disputa continua saudável até o Festival
              Cultural Hot Dogueres.
            </p>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <article className="rounded-3xl bg-white p-6 shadow-xl">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-red-700">
              Adesão
            </p>

            <h2 className="mt-2 text-3xl font-black text-gray-950">
              Como fazer parte
            </h2>

            <div className="mt-6 space-y-4">
              {fluxoAdesao.map((item) => (
                <div
                  key={item.etapa}
                  className="flex gap-4 rounded-2xl bg-gray-50 p-4"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-700 text-sm font-black text-white">
                    {item.etapa}
                  </div>

                  <div>
                    <h3 className="font-black text-gray-950">{item.titulo}</h3>

                    <p className="mt-1 text-sm font-bold leading-relaxed text-gray-600">
                      {item.descricao}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-3xl bg-white p-6 shadow-xl">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-green-700">
              Documentos e financeiro
            </p>

            <h2 className="mt-2 text-3xl font-black text-gray-950">
              Controle necessário
            </h2>

            <p className="mt-3 text-sm font-bold leading-relaxed text-gray-600">
              Como a empresa precisará receber notas fiscais mensais, o cadastro
              deve guardar dados completos da empresa, contatos responsáveis,
              contrato, boletos, comprovantes e histórico de pagamentos.
            </p>

            <div className="mt-6 grid gap-3">
              {documentos.map((documento) => (
                <div
                  key={documento}
                  className="rounded-2xl border-2 border-green-100 bg-green-50 p-4"
                >
                  <p className="font-black text-green-900">✅ {documento}</p>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="mt-8 rounded-3xl bg-white p-6 shadow-xl">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-yellow-700">
                Ranking
              </p>

              <h2 className="mt-2 text-3xl font-black text-gray-950">
                Área dos patrocinadores
              </h2>
            </div>

            <p className="max-w-xl text-sm font-bold leading-relaxed text-gray-600">
              A empresa que se cadastrar primeiro pode aparecer inicialmente na
              primeira posição de patrocínio, respeitando as regras do programa.
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {rankingExemplo.map((item) => (
              <article
                key={item.posicao}
                className="rounded-2xl border-2 border-yellow-100 bg-yellow-50 p-5"
              >
                <p className="text-2xl font-black text-yellow-900">
                  {item.posicao}
                </p>

                <h3 className="mt-3 text-lg font-black text-gray-950">
                  {item.empresa}
                </h3>

                <p className="mt-2 text-sm font-bold leading-relaxed text-gray-600">
                  {item.status}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-3xl border-4 border-red-100 bg-white p-6 shadow-xl">
          <h2 className="text-2xl font-black text-red-700">
            Próximo passo técnico
          </h2>

          <p className="mt-3 text-sm font-bold leading-relaxed text-gray-700">
            Esta tela administrativa já organiza o conceito do programa. Depois
            podemos conectar com banco de dados para cadastrar empresas, CNPJ,
            responsável, modalidade, contrato, status, pagamentos, notas fiscais,
            permutas, pontuação e posição no ranking.
          </p>
        </section>
      </div>
    </main>
  );
}
