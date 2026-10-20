import Link from "next/link";

export default function ClubeMembrosSucessoPage() {
  return (
    <main className="min-h-screen bg-[#fff7e8] px-4 py-12 text-gray-950">
      <section className="mx-auto max-w-2xl rounded-[2rem] bg-white p-8 text-center shadow-xl">
        <p className="inline-flex rounded-full bg-green-600 px-5 py-2 text-xs font-black uppercase tracking-wide text-white">
          Pagamento confirmado
        </p>

        <h1 className="mt-5 text-3xl font-black">
          Bem-vindo ao Clube Hot Dogueres!
        </h1>

        <p className="mt-4 text-sm leading-relaxed text-gray-700">
          Sua assinatura foi registrada com sucesso. Em breve você receberá
          mais informações pelo e-mail cadastrado.
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex rounded-full bg-yellow-400 px-6 py-3 text-xs font-black uppercase tracking-wide text-gray-950 shadow-lg transition hover:bg-yellow-500"
        >
          Voltar para o site
        </Link>
      </section>
    </main>
  );
}
