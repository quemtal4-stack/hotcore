"use client";

import Image from "next/image";

type TermometroHotDogueresProps = {
  kgDoados: number;
  metaKg: number;
  ingressosVendidos?: number;
  camisasEventosVendidas?: number;
  kitsAlimentosKg?: number;
};

function formatarNumero(valor: number) {
  return new Intl.NumberFormat("pt-BR").format(valor);
}

export default function TermometroHotDogueres({
  kgDoados,
  metaKg,
  ingressosVendidos = 0,
  camisasEventosVendidas = 0,
  kitsAlimentosKg = 0,
}: TermometroHotDogueresProps) {
  const percentual = metaKg > 0 ? Math.min((kgDoados / metaKg) * 100, 100) : 0;
  const kgRestantes = Math.max(metaKg - kgDoados, 0);

  return (
    <section className="my-8 overflow-hidden rounded-[2rem] bg-gradient-to-br from-red-600 via-red-500 to-yellow-400 p-1 shadow-2xl">
      <div className="rounded-[1.8rem] bg-white p-5 md:p-7">
        <div className="text-center">
          <p className="inline-flex rounded-full bg-red-100 px-5 py-2 text-xs font-black uppercase tracking-wide text-red-600">
            Termômetro solidário dos alimentos
          </p>

          <h2 className="mt-4 text-3xl font-black leading-tight text-gray-950 md:text-5xl">
            104 toneladas de alimento
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-gray-700 md:text-base">
            Aqui entram os alimentos contabilizados pela venda dos ingressos,
            kits de alimentação e camisas oficiais dos eventos que equivalem a
            ingressos solidários.
          </p>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-[1.5rem] bg-red-50 p-4 text-center">
            <p className="text-xs font-black uppercase tracking-wide text-red-600">
              Já alcançado
            </p>

            <p className="mt-2 text-2xl font-black text-gray-950">
              {formatarNumero(kgDoados)} kg
            </p>
          </div>

          <div className="rounded-[1.5rem] bg-yellow-50 p-4 text-center">
            <p className="text-xs font-black uppercase tracking-wide text-yellow-700">
              Faltam
            </p>

            <p className="mt-2 text-2xl font-black text-gray-950">
              {formatarNumero(kgRestantes)} kg
            </p>
          </div>

          <div className="rounded-[1.5rem] bg-gray-950 p-4 text-center text-white">
            <p className="text-xs font-black uppercase tracking-wide text-yellow-300">
              Meta total
            </p>

            <p className="mt-2 text-2xl font-black">
              {formatarNumero(metaKg)} kg
            </p>
          </div>

          <div className="rounded-[1.5rem] bg-[#fff2cc] p-4 text-center">
            <p className="text-xs font-black uppercase tracking-wide text-yellow-800">
              Ingressos equivalentes
            </p>

            <p className="mt-2 text-2xl font-black text-gray-950">
              {formatarNumero(ingressosVendidos)}
            </p>
          </div>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-[1.5rem] bg-orange-50 p-4 text-center">
            <p className="text-xs font-black uppercase tracking-wide text-orange-700">
              Camisas de eventos vendidas
            </p>

            <p className="mt-2 text-2xl font-black text-gray-950">
              {formatarNumero(camisasEventosVendidas)}
            </p>
          </div>

          <div className="rounded-[1.5rem] bg-green-50 p-4 text-center">
            <p className="text-xs font-black uppercase tracking-wide text-green-700">
              Kits de alimentos
            </p>

            <p className="mt-2 text-2xl font-black text-gray-950">
              {formatarNumero(kitsAlimentosKg)} kg
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-[1.5rem] bg-[#fff2cc] p-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-yellow-800">
                Progresso da missão
              </p>

              <p className="mt-1 text-xl font-black text-red-600">
                {percentual.toFixed(1)}%
              </p>
            </div>

            <p className="text-sm font-bold text-gray-700 sm:text-right">
              O mascote sobe junto com a solidariedade.
            </p>
          </div>

          <div className="mt-4 h-4 overflow-hidden rounded-full bg-white">
            <div
              className="h-full rounded-full bg-gradient-to-r from-red-600 to-yellow-400 transition-all duration-700"
              style={{ width: `${percentual}%` }}
            />
          </div>
        </div>

        <div className="mt-7 overflow-hidden rounded-[2rem] bg-[#fff7e8] p-4 shadow-inner ring-1 ring-red-100 md:p-6">
          <div className="relative mx-auto h-[520px] w-full max-w-[420px] md:h-[680px] md:max-w-[520px]">
            <Image
              src="/mascote-termometro.png"
              alt="Mascote termômetro Hot Dogueres"
              fill
              sizes="(max-width: 768px) 100vw, 520px"
              className="object-contain opacity-25 grayscale"
              unoptimized
            />

            <div
              className="absolute bottom-0 left-0 right-0 overflow-hidden transition-all duration-700"
              style={{ height: `${percentual}%` }}
            >
              <div
                className="absolute bottom-0 left-0 h-[520px] w-full bg-gradient-to-t from-red-700 via-red-500 to-yellow-300 md:h-[680px]"
                style={{
                  WebkitMaskImage: "url('/mascote-termometro.png')",
                  WebkitMaskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                  WebkitMaskSize: "contain",
                  maskImage: "url('/mascote-termometro.png')",
                  maskRepeat: "no-repeat",
                  maskPosition: "center",
                  maskSize: "contain",
                }}
              />
            </div>

            <Image
              src="/mascote-termometro.png"
              alt="Mascote Hot Dogueres"
              fill
              sizes="(max-width: 768px) 100vw, 520px"
              className="object-contain"
              unoptimized
            />

            <div className="absolute left-4 top-4 rounded-full bg-white/95 px-4 py-2 text-sm font-black text-red-600 shadow">
              {percentual.toFixed(1)}%
            </div>

            <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/95 px-4 py-3 text-center shadow">
              <p className="text-[10px] font-black uppercase text-gray-500">
                Alcançado
              </p>

              <p className="text-lg font-black text-red-600">
                {formatarNumero(kgDoados)} kg
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
