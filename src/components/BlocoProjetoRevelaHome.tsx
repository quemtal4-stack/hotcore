"use client";

import Image from "next/image";
import Link from "next/link";

export default function BlocoProjetoRevelaHome() {
  return (
    <section className="w-full px-0 pb-8">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] border-4 border-purple-700 bg-white shadow-2xl">
        <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative min-h-[320px] overflow-hidden bg-gradient-to-br from-purple-900 via-purple-700 to-yellow-400 p-6 text-white md:p-8">
            <div className="absolute left-[-100px] top-[-100px] h-72 w-72 rounded-full bg-white/20 blur-3xl" />
            <div className="absolute bottom-[-120px] right-[-120px] h-80 w-80 rounded-full bg-black/25 blur-3xl" />

            <div className="relative z-10 flex h-full flex-col justify-center">
              <p className="inline-flex w-fit rounded-full bg-white px-5 py-2 text-xs font-black uppercase tracking-[0.2em] text-purple-800 shadow-lg">
                Projeto social e cultural
              </p>

              <h2 className="mt-5 text-4xl font-black leading-tight md:text-5xl">
                Projeto Hot Dogueres Revela
              </h2>

              <p className="mt-4 max-w-xl text-base font-bold leading-relaxed text-white/90">
                Uma frente do Instituto Hot Dogueres de Ação Social e Cultural
                para revelar talentos, fortalecer crianças e jovens e unir
                esporte, arte, cultura e solidariedade.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl bg-white/15 p-4 text-center backdrop-blur">
                  <p className="text-3xl">🥋</p>
                  <p className="mt-2 text-xs font-black uppercase tracking-wide">
                    Judô 2027
                  </p>
                </div>

                <div className="rounded-2xl bg-white/15 p-4 text-center backdrop-blur">
                  <p className="text-3xl">💃</p>
                  <p className="mt-2 text-xs font-black uppercase tracking-wide">
                    Dança 2027
                  </p>
                </div>

                <div className="rounded-2xl bg-white/15 p-4 text-center backdrop-blur">
                  <p className="text-3xl">🎨</p>
                  <p className="mt-2 text-xs font-black uppercase tracking-wide">
                    Pintura 2027
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center bg-[#FFF8E7] p-5 md:p-8">
            <div className="relative mx-auto h-64 w-full max-w-xl overflow-hidden rounded-[1.8rem] bg-white shadow-xl ring-1 ring-purple-100 md:h-80">
              <Image
                src="/projeto-revela/projeto-hot-dogueres-revela.png"
                alt="Projeto Hot Dogueres Revela"
                fill
                sizes="(max-width: 1024px) 100vw, 560px"
                className="object-contain p-3"
                unoptimized
              />
            </div>

            <div className="mt-6 text-center lg:text-left">
              <p className="inline-flex rounded-full bg-purple-100 px-4 py-2 text-xs font-black uppercase tracking-wide text-purple-700">
                Instituto Hot Dogueres
              </p>

              <h3 className="mt-4 text-2xl font-black leading-tight text-gray-950 md:text-3xl">
                Escolha uma modalidade e ajude a construir oportunidades.
              </h3>

              <p className="mt-3 text-sm font-bold leading-relaxed text-gray-700">
                A proposta é criar turmas, ações e experiências para revelar
                talentos em áreas como judô, dança e pintura, conectando o
                impacto social da Hot Dogueres com educação, cultura e
                desenvolvimento humano.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/projeto-revela"
                  className="flex flex-1 justify-center rounded-full bg-purple-700 px-6 py-4 text-sm font-black uppercase tracking-wide text-white shadow-lg transition hover:-translate-y-1 hover:bg-purple-800"
                >
                  Conhecer o projeto
                </Link>

                <Link
                  href="/projeto-revela#modalidades"
                  className="flex flex-1 justify-center rounded-full bg-yellow-400 px-6 py-4 text-sm font-black uppercase tracking-wide text-gray-950 shadow-lg transition hover:-translate-y-1 hover:bg-yellow-500"
                >
                  Ver modalidades
                </Link>
              </div>

              <p className="mt-4 text-center text-xs font-bold leading-relaxed text-gray-500 lg:text-left">
                Imagem esperada:{" "}
                <strong>/public/projeto-revela/projeto-hot-dogueres-revela.png</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
