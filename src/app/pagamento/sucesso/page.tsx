import Image from "next/image";
import Link from "next/link";

type SearchParams = {
  plano?: string;
  nome?: string;
  email?: string;
  whatsapp?: string;
  payment_id?: string;
  collection_id?: string;
  id?: string;
  status?: string;
  preference_id?: string;
  merchant_order_id?: string;
};

type PagamentoSucessoPageProps = {
  searchParams?: SearchParams;
};

function obterPlano(plano?: string) {
  if (plano === "fundador") {
    return {
      nome: "Fundador",
      valor: "R$ 39,90",
      recorrencia: "por mês",
      descricao:
        "Plano para quem quer apoiar ainda mais a Hot Dogueres todos os meses e fazer parte da construção do projeto.",
      selo: "Apoiador especial",
      cor: "bg-red-600",
    };
  }

  if (plano === "anual" || plano === "eternizado") {
    return {
      nome: "Anual",
      valor: "R$ 497,00",
      recorrencia: "por ano",
      descricao:
        "Plano anual para quem quer caminhar junto com a Hot Dogueres durante 12 meses.",
      selo: "Compromisso anual",
      cor: "bg-yellow-500",
    };
  }

  return {
    nome: "Apoiador",
    valor: "R$ 19,90",
    recorrencia: "por mês",
    descricao:
      "Plano ideal para entrar no Clube Hot Dogueres e apoiar o crescimento do projeto.",
    selo: "Entrada no clube",
    cor: "bg-orange-500",
  };
}

function formatarCampo(valor?: string) {
  return valor && valor.trim().length > 0 ? valor : "Não informado";
}

export default function PagamentoSucessoPage({
  searchParams,
}: PagamentoSucessoPageProps) {
  const plano = searchParams?.plano ?? "apoiador";
  const nome = searchParams?.nome ?? "";
  const email = searchParams?.email ?? "";
  const whatsapp = searchParams?.whatsapp ?? "";

  const paymentId =
    searchParams?.payment_id || searchParams?.collection_id || searchParams?.id;

  const status = searchParams?.status || "approved";
  const preferenceId = searchParams?.preference_id;
  const merchantOrderId = searchParams?.merchant_order_id;

  const dadosPlano = obterPlano(plano);

  const mensagemWhatsApp = encodeURIComponent(
    `Olá! Meu pagamento no Clube Hot Dogueres foi finalizado.

Nome: ${formatarCampo(nome)}
E-mail: ${formatarCampo(email)}
WhatsApp: ${formatarCampo(whatsapp)}
Plano: ${dadosPlano.nome}
Valor: ${dadosPlano.valor} ${dadosPlano.recorrencia}
Status: ${status}
Pagamento: ${paymentId || "Não informado"}
Preferência: ${preferenceId || "Não informada"}

Quero confirmar minha entrada no Clube Hot Dogueres.`
  );

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FFF8E7] px-4 py-8 text-[#000000] md:px-8 md:py-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#FFE99A_0%,transparent_35%),radial-gradient(circle_at_bottom_right,#E11D2E_0%,transparent_28%)] opacity-70" />
      <div className="absolute left-[-120px] top-[-120px] h-80 w-80 rounded-full bg-[#FFE27A]/60 blur-3xl" />
      <div className="absolute bottom-[-160px] right-[-140px] h-96 w-96 rounded-full bg-[#E11D2E]/25 blur-3xl" />

      <Link
        href="/clube-de-membros#planos"
        className="relative z-20 inline-flex rounded-full border border-[#E11D2E]/20 bg-white px-5 py-3 text-sm font-black text-[#000000] shadow-xl transition hover:scale-105 hover:bg-[#FFF1B8]"
      >
        ← Voltar para os planos
      </Link>

      <div className="relative z-10 mx-auto mt-8 grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <section className="order-2 lg:order-1">
          <div className="relative mx-auto hidden max-w-md lg:block">
            <div className="absolute inset-0 rounded-full bg-[#FFE99A] blur-3xl" />

            <div className="relative rounded-[2rem] border border-[#E11D2E]/20 bg-white/80 p-6 shadow-2xl backdrop-blur">
              <div className="relative h-[420px] w-full">
                <Image
                  src="/mascote-esquerda.png"
                  alt="Mascote da Hot Dogueres comemorando"
                  fill
                  className="object-contain"
                  sizes="420px"
                  priority
                />
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-[2rem] border border-[#E11D2E]/20 bg-white p-6 shadow-xl lg:mt-8">
            <p className="inline-flex rounded-full bg-green-100 px-4 py-2 text-xs font-black uppercase tracking-wide text-green-700">
              Próximos passos
            </p>

            <h2 className="mt-4 text-2xl font-black text-[#000000]">
              O que acontece agora?
            </h2>

            <div className="mt-5 space-y-4">
              <div className="flex gap-4 rounded-2xl bg-[#FFF1B8] p-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E11D2E] text-sm font-black text-white">
                  1
                </span>
                <div>
                  <h3 className="font-black">Confirmação do pagamento</h3>
                  <p className="mt-1 text-sm font-semibold leading-relaxed text-[#000000]/70">
                    Seu pagamento foi recebido ou retornou como aprovado pela
                    plataforma de pagamento.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 rounded-2xl bg-[#FFF1B8] p-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E11D2E] text-sm font-black text-white">
                  2
                </span>
                <div>
                  <h3 className="font-black">Ativação do clube</h3>
                  <p className="mt-1 text-sm font-semibold leading-relaxed text-[#000000]/70">
                    A equipe da Hot Dogueres poderá conferir seus dados e
                    organizar sua entrada no Clube de Membros.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 rounded-2xl bg-[#FFF1B8] p-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E11D2E] text-sm font-black text-white">
                  3
                </span>
                <div>
                  <h3 className="font-black">Benefícios e coleção</h3>
                  <p className="mt-1 text-sm font-semibold leading-relaxed text-[#000000]/70">
                    Conforme o clube evoluir, seus itens, recompensas e
                    colecionáveis poderão aparecer na sua área de coleção.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="order-1 rounded-[2rem] border border-white/60 bg-white p-6 shadow-2xl md:p-9 lg:order-2">
          <div className="text-center">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-100 text-5xl shadow-xl">
              ✅
            </div>

            <p className="mt-6 inline-flex rounded-full bg-[#FFF1B8] px-5 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#E11D2E]">
              Pagamento confirmado
            </p>

            <h1 className="mt-5 text-4xl font-black leading-tight text-[#000000] md:text-5xl">
              Obrigado por apoiar a Hot Dogueres!
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base font-bold leading-relaxed text-[#000000]/70 md:text-lg">
              Seu apoio ajuda a Hot Dogueres a continuar crescendo com trabalho,
              propósito, solidariedade e futuro.
            </p>
          </div>

          <div className="mt-8 rounded-[2rem] border border-[#E11D2E]/15 bg-[#FFF8E7] p-5 shadow-inner">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-wide text-[#E11D2E]">
                  Plano escolhido
                </p>

                <h2 className="mt-1 text-3xl font-black text-[#000000]">
                  {dadosPlano.nome}
                </h2>

                <p className="mt-2 text-sm font-bold leading-relaxed text-[#000000]/70">
                  {dadosPlano.descricao}
                </p>
              </div>

              <div className="rounded-2xl bg-white p-4 text-center shadow-md">
                <p className="text-3xl font-black text-[#E11D2E]">
                  {dadosPlano.valor}
                </p>
                <p className="text-xs font-black uppercase tracking-wide text-[#000000]/60">
                  {dadosPlano.recorrencia}
                </p>
              </div>
            </div>

            <span
              className={`mt-5 inline-flex rounded-full px-4 py-2 text-xs font-black uppercase tracking-wide text-white ${dadosPlano.cor}`}
            >
              {dadosPlano.selo}
            </span>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl bg-gray-50 p-5">
              <p className="text-sm font-black uppercase tracking-wide text-gray-500">
                Dados do membro
              </p>

              <div className="mt-4 space-y-3 text-sm font-bold text-gray-800">
                <p className="flex justify-between gap-4">
                  <span className="text-gray-500">Nome</span>
                  <strong className="text-right">{formatarCampo(nome)}</strong>
                </p>

                <p className="flex justify-between gap-4">
                  <span className="text-gray-500">E-mail</span>
                  <strong className="text-right">{formatarCampo(email)}</strong>
                </p>

                <p className="flex justify-between gap-4">
                  <span className="text-gray-500">WhatsApp</span>
                  <strong className="text-right">
                    {formatarCampo(whatsapp)}
                  </strong>
                </p>
              </div>
            </div>

            <div className="rounded-3xl bg-gray-50 p-5">
              <p className="text-sm font-black uppercase tracking-wide text-gray-500">
                Dados do pagamento
              </p>

              <div className="mt-4 space-y-3 text-sm font-bold text-gray-800">
                <p className="flex justify-between gap-4">
                  <span className="text-gray-500">Status</span>
                  <strong className="text-right">{status}</strong>
                </p>

                <p className="flex justify-between gap-4">
                  <span className="text-gray-500">Pagamento</span>
                  <strong className="text-right">
                    {paymentId || "Não informado"}
                  </strong>
                </p>

                {preferenceId && (
                  <p className="flex justify-between gap-4">
                    <span className="text-gray-500">Preferência</span>
                    <strong className="text-right">{preferenceId}</strong>
                  </p>
                )}

                {merchantOrderId && (
                  <p className="flex justify-between gap-4">
                    <span className="text-gray-500">Pedido</span>
                    <strong className="text-right">{merchantOrderId}</strong>
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-[2rem] border-2 border-dashed border-green-300 bg-green-50 p-5 text-center">
            <p className="text-sm font-black uppercase tracking-wide text-green-700">
              Quer agilizar sua ativação?
            </p>

            <p className="mx-auto mt-3 max-w-2xl text-sm font-bold leading-relaxed text-green-900/80">
              Envie uma mensagem no WhatsApp com os dados do pagamento para a
              equipe da Hot Dogueres conferir sua entrada no clube.
            </p>
          </div>

          <div className="mt-7 grid gap-4 md:grid-cols-2">
            <a
              href={`https://wa.me/5579981314109?text=${mensagemWhatsApp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-green-600 px-6 py-4 text-center text-sm font-black uppercase tracking-wide text-white shadow-lg transition hover:scale-105 hover:bg-green-700"
            >
              Confirmar no WhatsApp
            </a>

            <Link
              href="/minha-colecao"
              className="rounded-full bg-[#E11D2E] px-6 py-4 text-center text-sm font-black uppercase tracking-wide text-white shadow-lg transition hover:scale-105 hover:bg-[#B11226]"
            >
              Ver minha coleção
            </Link>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <Link
              href="/clube-de-membros"
              className="rounded-full border border-[#E11D2E]/20 bg-[#FFF1B8] px-6 py-4 text-center text-sm font-black uppercase tracking-wide text-[#000000] shadow-md transition hover:scale-105 hover:bg-[#FFE99A]"
            >
              Voltar ao clube
            </Link>

            <Link
              href="/"
              className="rounded-full border border-[#000000]/10 bg-[#000000] px-6 py-4 text-center text-sm font-black uppercase tracking-wide text-white shadow-md transition hover:scale-105 hover:bg-gray-900"
            >
              Ir para o início
            </Link>
          </div>

          <p className="mt-6 text-center text-xs font-bold leading-relaxed text-gray-500">
            Guarde esta página ou tire um print dos dados do pagamento, caso
            precise confirmar sua participação depois.
          </p>
        </section>
      </div>
    </main>
  );
}
