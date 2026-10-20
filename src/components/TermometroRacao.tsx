"use client";

import { useMetaRacao } from "@/hooks/useMetaRacao";

function formatarNumero(valor: number) {
  return new Intl.NumberFormat("pt-BR").format(valor);
}

function formatarPercentual(valor: number) {
  return `${valor.toFixed(2).replace(".", ",")}%`;
}

function BarraProgresso({
  percentual,
  cor = "bg-amber-600",
}: {
  percentual: number;
  cor?: string;
}) {
  const largura = Math.min(Math.max(percentual, 0), 100);

  return (
    <div className="h-5 w-full overflow-hidden rounded-full bg-zinc-200 md:h-6">
      <div
        className={`h-full rounded-full ${cor} transition-all duration-700`}
        style={{
          width: `${largura}%`,
        }}
      />
    </div>
  );
}

export function TermometroRacao() {
  const { data, loading, error } = useMetaRacao();

  if (loading) {
    return (
      <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm md:p-8">
        <p className="text-lg font-bold text-zinc-600 md:text-xl">
          Carregando meta de proteção animal...
        </p>
      </section>
    );
  }

  if (error || !data) {
    return (
      <section className="rounded-3xl border border-red-200 bg-red-50 p-6 md:p-8">
        <p className="text-lg font-bold text-red-700 md:text-xl">
          Não foi possível carregar o termômetro de proteção animal agora.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-3xl border border-amber-100 bg-white p-6 shadow-lg md:p-8">
      <div className="mb-5">
        <p className="text-base font-black uppercase tracking-wide text-amber-700 md:text-lg">
          Proteção animal
        </p>

        <h2 className="mt-2 text-3xl font-black leading-tight text-zinc-950 md:text-4xl">
          {formatarNumero(data.racao.kg)} kg de{" "}
          {formatarNumero(data.meta.racao_kg)} kg
        </h2>

        <p className="mt-3 text-lg font-bold leading-relaxed text-zinc-700 md:text-xl">
          Meta total:{" "}
          <span className="font-black text-amber-700">
            {formatarNumero(data.meta.racao_toneladas)} toneladas
          </span>{" "}
          de ração para animais.
        </p>
      </div>

      <BarraProgresso percentual={data.racao.percentual} cor="bg-amber-600" />

      <div className="mt-4 flex items-center justify-between gap-3 text-base font-black text-zinc-700 md:text-lg">
        <span className="rounded-full bg-amber-50 px-4 py-2 text-amber-700">
          {formatarPercentual(data.racao.percentual)}
        </span>

        <span className="rounded-full bg-zinc-100 px-4 py-2 text-zinc-800">
          Faltam {formatarNumero(data.racao.restantes_kg)} kg
        </span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-zinc-50 p-4 shadow-sm">
          <p className="text-base font-bold text-zinc-600 md:text-lg">
            Por kits de ração
          </p>

          <p className="mt-1 text-2xl font-black text-zinc-950 md:text-3xl">
            {formatarNumero(data.fontes.kits_kg)} kg
          </p>
        </div>

        <div className="rounded-2xl bg-zinc-50 p-4 shadow-sm">
          <p className="text-base font-bold text-zinc-600 md:text-lg">
            Kits vendidos
          </p>

          <p className="mt-1 text-2xl font-black text-zinc-950 md:text-3xl">
            {formatarNumero(data.kits.vendidos)}
          </p>
        </div>
      </div>
    </section>
  );
}
