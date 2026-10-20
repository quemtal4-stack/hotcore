import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import SetasNavegacao from "@/components/SetasNavegacao";

export const metadata: Metadata = {
  title: "Cadastro de Parceiro | Hot Dogueres",
  description:
    "Cadastre sua empresa para participar do Programa de Parcerias Empresariais Hot Dogueres.",
};

const regrasParceria = [
  {
    titulo: "Abertura das parcerias",
    texto:
      "As parcerias empresariais terão início em janeiro, com vagas limitadas por modalidade e análise prévia da empresa interessada.",
    destaque: "Início em janeiro",
  },
  {
    titulo: "Dia de pagamento",
    texto:
      "O pagamento das parcelas mensais deverá ser realizado até o dia 5 de cada mês, mantendo a empresa ativa no programa.",
    destaque: "Vencimento dia 5",
  },
  {
    titulo: "Atrasos e negociação",
    texto:
      "Em caso de atraso, poderão ser aplicados multa e juros. Se o pagamento não for regularizado ou negociado até o dia 25, a parceria poderá ser cancelada automaticamente.",
    destaque: "Prazo limite dia 25",
  },
  {
    titulo: "Retirada da marca",
    texto:
      "Empresas com parceria cancelada terão suas logos retiradas dos materiais, páginas e ativações dos próximos eventos.",
    destaque: "Logo removida",
  },
];

const modalidades = [
  {
    titulo: "Plano Mensal",
    valor: "R$ 10.000/mês",
    texto:
      "Modalidade para empresas que desejam presença recorrente nas ações, campanhas e eventos Hot Dogueres.",
    itens: [
      "Vagas limitadas",
      "Participação mensal",
      "Presença em páginas e ativações",
      "Direito ao programa de bonificação",
    ],
  },
  {
    titulo: "Patrocínio por Evento",
    valor: "Sob proposta",
    texto:
      "Opção para empresas que desejam apoiar eventos específicos, com exposição vinculada à ação escolhida.",
    itens: [
      "Participação pontual",
      "Exposição no evento",
      "Associação direta ao projeto",
      "Ideal para campanhas estratégicas",
    ],
  },
  {
    titulo: "Bonificação Empresarial",
    valor: "Por desempenho",
    texto:
      "Empresas em dia poderão participar dos programas de bonificação alimentar e de ração, conforme regras do ranking.",
    itens: [
      "Ranking do Bem",
      "Ranking da Ração",
      "Bonificações para empresas adimplentes",
      "Possibilidade de destaque anual",
    ],
  },
];

const beneficios = [
  {
    titulo: "Impacto social visível",
    texto:
      "A empresa participa de ações reais de arrecadação de alimentos, ração, eventos solidários e campanhas públicas.",
  },
  {
    titulo: "Página de acompanhamento",
    texto:
      "As empresas poderão acompanhar a evolução das campanhas, metas e rankings diretamente pelo site.",
  },
  {
    titulo: "Associação de marca",
    texto:
      "A marca parceira aparece vinculada a projetos positivos, com foco em comunidade, animais, famílias e impacto local.",
  },
  {
    titulo: "Bonificação para quem paga em dia",
    texto:
      "Empresas adimplentes poderão participar das bonificações de alimentos e ração conforme o regulamento do programa.",
  },
];

export default function CadastroParceiroPage() {
  return (
    <main className="min-h-screen bg-[#FFF8E7] px-6 py-12 text-[#111827] md:px-10 lg:px-16">
       <SetasNavegacao
  anterior="/parceiros-empresas"
  proxima="/calendario-2027"
  labelAnterior="Voltar para parceiros empresas"
  labelProxima="Ir para o Calendário 2027"
/>

      <section className="mx-auto max-w-6xl rounded-[2rem] border border-red-200 bg-white p-8 shadow-2xl md:p-12">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="inline-flex rounded-full bg-[#E11D2E] px-5 py-2 text-xs font-black uppercase tracking-wide text-white">
              Cadastro empresarial
            </p>

            <h1 className="mt-6 text-4xl font-black leading-tight text-[#111827] md:text-6xl">
              Cadastre sua empresa parceira
            </h1>

            <p className="mt-5 max-w-3xl text-lg font-semibold leading-relaxed text-gray-700">
              Preencha as informações da empresa para iniciar o processo de
              análise, proposta comercial, contrato e entrada no Programa de
              Parcerias Empresariais Hot Dogueres.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full bg-[#FFF1B8] px-4 py-2 text-xs font-black uppercase tracking-wide text-[#111827]">
                Empresas parceiras
              </span>

              <span className="rounded-full bg-red-100 px-4 py-2 text-xs font-black uppercase tracking-wide text-[#E11D2E]">
                Impacto social
              </span>

              <span className="rounded-full bg-gray-100 px-4 py-2 text-xs font-black uppercase tracking-wide text-gray-800">
                Contrato e análise
              </span>
            </div>
          </div>

          <div className="rounded-[2rem] border border-red-100 bg-[#FFF8E7] p-5 shadow-xl">
            <div className="overflow-hidden rounded-[1.5rem] bg-white">
              <Image
                src="/images/contrato-de-parceria.png"
                alt="Ilustração em estilo cartoon de uma empresa parceira apoiando o projeto Hot Dogueres"
                width={700}
                height={520}
                className="h-auto w-full object-cover"
                priority
              />
            </div>

            <div className="mt-5 rounded-3xl bg-[#E11D2E] p-5 text-white">
              <p className="text-xs font-black uppercase tracking-wide text-red-100">
                Programa de Parcerias
              </p>

              <h2 className="mt-2 text-2xl font-black">
                Sua empresa dentro de ações reais
              </h2>

              <p className="mt-3 text-sm font-semibold leading-relaxed text-red-50">
                Participe de campanhas, eventos, arrecadações e projetos com
                impacto direto na comunidade.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl bg-[#E11D2E] p-6 text-white shadow-lg">
            <p className="text-sm font-black uppercase tracking-wide">
              Etapa 1
            </p>

            <h2 className="mt-3 text-2xl font-black">Cadastro</h2>

            <p className="mt-3 text-sm font-semibold leading-relaxed text-red-50">
              A empresa informa seus dados, interesse de modalidade e contato
              responsável.
            </p>
          </div>

          <div className="rounded-3xl bg-[#FFF1B8] p-6 shadow-lg">
            <p className="text-sm font-black uppercase tracking-wide text-[#E11D2E]">
              Etapa 2
            </p>

            <h2 className="mt-3 text-2xl font-black">Análise</h2>

            <p className="mt-3 text-sm font-semibold leading-relaxed text-gray-700">
              A equipe Hot Dogueres avalia a disponibilidade de vaga,
              enquadramento e proposta comercial.
            </p>
          </div>

          <div className="rounded-3xl bg-gray-950 p-6 text-white shadow-lg">
            <p className="text-sm font-black uppercase tracking-wide text-yellow-300">
              Etapa 3
            </p>

            <h2 className="mt-3 text-2xl font-black">Contrato</h2>

            <p className="mt-3 text-sm font-semibold leading-relaxed text-gray-200">
              Após aprovação, a parceria é formalizada por contrato e a empresa
              entra no programa.
            </p>
          </div>
        </div>

        <section className="mt-12">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-wide text-[#E11D2E]">
                Regras comerciais
              </p>

              <h2 className="mt-2 text-3xl font-black text-[#111827] md:text-4xl">
                Como funcionam os pagamentos
              </h2>
            </div>

            <p className="max-w-xl text-sm font-semibold leading-relaxed text-gray-600">
              As regras abaixo ajudam a manter previsibilidade, organização dos
              eventos e segurança para todos os parceiros envolvidos.
            </p>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {regrasParceria.map((regra) => (
              <article
                key={regra.titulo}
                className="rounded-3xl border border-gray-200 bg-[#FFF8E7] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <span className="inline-flex rounded-full bg-white px-4 py-2 text-xs font-black uppercase tracking-wide text-[#E11D2E] shadow-sm">
                  {regra.destaque}
                </span>

                <h3 className="mt-4 text-xl font-black text-[#111827]">
                  {regra.titulo}
                </h3>

                <p className="mt-3 text-sm font-semibold leading-relaxed text-gray-700">
                  {regra.texto}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-[2rem] bg-gray-950 p-6 text-white md:p-8">
          <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-wide text-yellow-300">
                Assinatura durante o ano
              </p>

              <h2 className="mt-3 text-3xl font-black md:text-4xl">
                Entrada no plano mensal até agosto
              </h2>

              <p className="mt-4 text-base font-semibold leading-relaxed text-gray-200">
                O pacote mensal poderá ser assinado até agosto. Caso a empresa
                entre após janeiro, deverá quitar no ato da assinatura os meses
                correspondentes de janeiro até o mês de entrada, conforme regra
                comercial do programa.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-6 text-[#111827]">
              <p className="text-sm font-black uppercase tracking-wide text-[#E11D2E]">
                Importante
              </p>

              <p className="mt-3 text-2xl font-black">
                O valor da mensalidade permanece como referência comercial.
              </p>

              <p className="mt-3 text-sm font-semibold leading-relaxed text-gray-700">
                Isso evita desvalorização da parceria e mantém uma base justa
                para os próximos anos.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-12">
          <p className="text-sm font-black uppercase tracking-wide text-[#E11D2E]">
            Modalidades de parceria
          </p>

          <h2 className="mt-2 text-3xl font-black text-[#111827] md:text-4xl">
            Escolha a melhor forma de participar
          </h2>

          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            {modalidades.map((modalidade) => (
              <article
                key={modalidade.titulo}
                className="flex h-full flex-col rounded-[2rem] border border-red-100 bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl"
              >
                <h3 className="text-2xl font-black text-[#111827]">
                  {modalidade.titulo}
                </h3>

                <p className="mt-3 inline-flex w-fit rounded-full bg-[#E11D2E] px-4 py-2 text-sm font-black text-white">
                  {modalidade.valor}
                </p>

                <p className="mt-4 text-sm font-semibold leading-relaxed text-gray-700">
                  {modalidade.texto}
                </p>

                <ul className="mt-5 space-y-3">
                  {modalidade.itens.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-sm font-bold text-gray-700"
                    >
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#E11D2E]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <div className="rounded-[2rem] bg-[#FFF1B8] p-6 md:p-8">
            <p className="text-sm font-black uppercase tracking-wide text-[#E11D2E]">
              Benefícios para empresas em dia
            </p>

            <h2 className="mt-2 text-3xl font-black text-[#111827] md:text-4xl">
              Bonificação, ranking e impacto social
            </h2>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {beneficios.map((beneficio) => (
                <article
                  key={beneficio.titulo}
                  className="rounded-3xl bg-white p-6 shadow-md"
                >
                  <h3 className="text-xl font-black text-[#111827]">
                    {beneficio.titulo}
                  </h3>

                  <p className="mt-3 text-sm font-semibold leading-relaxed text-gray-700">
                    {beneficio.texto}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-12 rounded-[2rem] border-2 border-dashed border-red-300 bg-[#FFF8E7] p-6 md:p-8">
          <div className="grid gap-6 md:grid-cols-[1fr_0.8fr] md:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-wide text-[#E11D2E]">
                Próximo passo
              </p>

              <h2 className="mt-2 text-3xl font-black text-[#111827]">
                Formulário de cadastro
              </h2>

              <p className="mt-3 text-base font-semibold leading-relaxed text-gray-700">
                Aqui será criado o formulário com dados da empresa, CNPJ,
                contato, modalidade desejada, segmento, responsável e
                informações necessárias para elaboração da proposta e contrato.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-lg">
              <h3 className="text-xl font-black text-[#111827]">
                Dados que serão solicitados
              </h3>

              <ul className="mt-4 space-y-3 text-sm font-bold text-gray-700">
                <li>• Razão social e nome fantasia</li>
                <li>• CNPJ</li>
                <li>• Segmento da empresa</li>
                <li>• Nome do responsável</li>
                <li>• Telefone e e-mail</li>
                <li>• Modalidade de interesse</li>
              </ul>
            </div>
          </div>
        </section>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/parceiros-empresas"
            className="rounded-full bg-gray-950 px-7 py-4 text-center text-sm font-black uppercase tracking-wide text-white transition hover:bg-gray-800"
          >
            Voltar para parcerias
          </Link>

          <Link
            href="/impacto-social"
            className="rounded-full bg-[#E11D2E] px-7 py-4 text-center text-sm font-black uppercase tracking-wide text-white transition hover:bg-[#B11226]"
          >
            Ver impacto social
          </Link>
        </div>
      </section>
    </main>
  );
}
