"use client";

const VALOR_APRESENTACAO_DO_ECOSSISTEMA_HOT_DOGUERES = 20;

function formatarMoeda(valor: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
}

export default function ApresentacaoDoEcossistemaHotDogueresPage() {
  function irParaCheckoutApresentacaoDoEcossistemaHotDogueres() {
    const params = new URLSearchParams({
      tipo: "apresentacao-do-ecossistema-hot-dogueres-10m.png",
      ingressos: "1",
    });

    window.location.href = `/checkout/alimentos?${params.toString()}`;
  }

  return (
    <main className="min-h-screen bg-[#fff7e8] px-4 py-10 text-gray-950">
      <section className="mx-auto max-w-5xl rounded-[2rem] bg-white p-8 shadow-xl md:p-10">
        <p className="inline-flex rounded-full bg-red-100 px-5 py-2 text-sm font-black uppercase tracking-wide text-red-600">
          Colecionável especial
        </p>

        <h1 className="mt-6 text-4xl font-black leading-tight md:text-6xl">
          Apresentação Do Ecossistema Hot Dogueres
        </h1>

        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-gray-700">
          Garanta seu ingresso colecionável especial da Apresentação Do
          Ecossistema Hot Dogueres e faça parte dessa experiência solidária.
        </p>

        <div className="mt-8 rounded-[2rem] bg-yellow-50 p-6">
          <p className="text-sm font-black uppercase tracking-wide text-yellow-700">
            Valor do ingresso
          </p>

          <p className="mt-2 text-5xl font-black text-red-600">
            {formatarMoeda(
              VALOR_APRESENTACAO_DO_ECOSSISTEMA_HOT_DOGUERES
            )}
          </p>

          <p className="mt-3 text-gray-700">
            Ingresso único especial vinculado ao Apresentação Do Ecossistema Hot
            Dogueres.
          </p>
        </div>

        <button
          type="button"
          onClick={irParaCheckoutApresentacaoDoEcossistemaHotDogueres}
          className="mt-8 rounded-full bg-red-600 px-8 py-4 text-lg font-black text-white shadow-lg transition hover:bg-red-700"
        >
          Comprar Apresentação Do Ecossistema Hot Dogueres
        </button>
      </section>
    </main>
  );
}
