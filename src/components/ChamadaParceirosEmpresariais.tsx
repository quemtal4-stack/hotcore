import Link from "next/link";

export default function ChamadaParceirosEmpresariais() {
  return (
    <section className="bg-[#FFF8E7] px-4 py-12 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 overflow-hidden rounded-[2rem] bg-white p-6 shadow-2xl md:grid-cols-2 md:p-10">
        <div className="flex flex-col justify-center">
          <p className="w-fit rounded-full bg-red-100 px-4 py-2 text-xs font-black uppercase text-red-700">
            Programa Empresarial 2027
          </p>

          <h2 className="mt-5 text-3xl font-black leading-tight text-gray-950 md:text-5xl">
            Faça parte dessa grande ação solidária
          </h2>

          <p className="mt-5 text-lg font-bold leading-relaxed text-gray-700">
            Seja sua empresa parceira dessa grande corrente do bem. Juntos,
            podemos fortalecer projetos sociais, educacionais, ambientais,
            culturais e de proteção animal dentro do Ecossistema Hot Dogueres.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/parceiros"
              className="rounded-full bg-red-600 px-7 py-4 text-center text-sm font-black uppercase text-white shadow-lg transition hover:bg-red-700"
            >
              Conhecer Programa Empresarial
            </Link>

            <Link
              href="/parceiros#como-participar"
              className="rounded-full border-2 border-red-600 px-7 py-4 text-center text-sm font-black uppercase text-red-700 transition hover:bg-red-50"
            >
              Como participar
            </Link>
          </div>
        </div>

        <div className="relative min-h-[280px] overflow-hidden rounded-[2rem] bg-gradient-to-br from-red-600 via-yellow-400 to-green-500 p-6">
          <div className="absolute inset-0 bg-black/10" />

          <div className="relative z-10 flex h-full flex-col justify-end rounded-[1.5rem] bg-white/90 p-6 shadow-xl">
            <p className="text-5xl">🤝</p>

            <h3 className="mt-4 text-2xl font-black text-gray-950">
              Empresas, pessoas e projetos unidos por um bem maior.
            </h3>

            <p className="mt-3 text-sm font-bold leading-relaxed text-gray-700">
              Parceria anual, patrocínio por evento, permuta, programa de pontos
              e acompanhamento pela Área do Parceiro HotCore.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
