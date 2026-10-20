import Link from "next/link";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#fff7e8] px-4 py-10 text-gray-950">
      <section className="mx-auto max-w-5xl rounded-[2.5rem] bg-white p-8 shadow-xl md:p-10">
        <p className="text-sm font-black uppercase tracking-wide text-red-600">
          Área do comprador
        </p>

        <h1 className="mt-3 text-4xl font-black leading-tight md:text-5xl">
          Bem-vindo ao seu painel solidário
        </h1>

        <p className="mt-5 text-lg leading-relaxed text-gray-700">
          Aqui o comprador poderá visualizar seus ingressos colecionáveis,
          acompanhar a compra, personalizar o 6º ingresso e acessar as próximas
          etapas do Hot Dogueres Solidário.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl bg-red-50 p-5">
            <p className="text-2xl font-black text-red-600">Ingressos</p>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              Visualize os ingressos comprados.
            </p>
          </div>

          <div className="rounded-3xl bg-yellow-50 p-5">
            <p className="text-2xl font-black text-yellow-700">
              6º Especial
            </p>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              Personalize o ingresso Eternizados 250 Metros.
            </p>
          </div>

          <div className="rounded-3xl bg-blue-50 p-5">
            <p className="text-2xl font-black text-blue-700">Pagamento</p>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              Acompanhe o status da compra.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="rounded-full bg-gray-900 px-6 py-4 text-center text-sm font-black uppercase tracking-wide text-white transition hover:bg-gray-800"
          >
            Voltar para a página inicial
          </Link>

          <Link
            href="/login"
            className="rounded-full bg-red-600 px-6 py-4 text-center text-sm font-black uppercase tracking-wide text-white transition hover:bg-red-700"
          >
            Ir para login
          </Link>
        </div>
      </section>
    </main>
  );
}
