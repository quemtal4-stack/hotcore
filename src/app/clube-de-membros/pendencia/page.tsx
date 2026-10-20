import Link from "next/link";

export default function ClubeMembrosPendentePage() {
  return (
    <main className="min-h-screen bg-[#fff7e8] px-4 py-12 text-gray-950">
      <section className="mx-auto max-w-2xl rounded-[2rem] bg-white p-8 text-center shadow-xl">
        <p className="inline-flex rounded-full bg-yellow-400 px-5 py-2 text-xs font-black uppercase tracking-wide text-gray-950">
          Pagamento pendente
        </p>

        <h1 className="mt-5 text-3xl font-black">
          Seu pagamento está em análise ou aguardando confirmação
        </h1>

        <p className="mt-4 text-sm leading-relaxed text-gray-700">
          Se você escolheu Pix, boleto ou outro método, aguarde a confirmação do
          Mercado Pago.
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex rounded-full bg-red-600 px-6 py-3 text-xs font-black uppercase tracking-wide text-white shadow-lg transition hover:bg-red-700"
        >
          Voltar para o início
        </Link>
      </section>
    </main>
  );
}
