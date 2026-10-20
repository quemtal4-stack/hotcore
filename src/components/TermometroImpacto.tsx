"use client";

import { useMetaImpacto } from "@/hooks/useMetaImpacto";

function formatarNumero(valor: number) {
  return new Intl.NumberFormat("pt-BR").format(valor);
}

function formatarPercentual(valor: number) {
  return `${valor.toFixed(2).replace(".", ",")}%`;
}

function BarraProgresso({
  percentual,
  cor = "bg-red-600",
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

export function TermometroImpacto() {
  const { data, loading, error } = useMetaImpacto();

  if (loading) {
    return (
      <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm md:p-8">
        <p className="text-lg font-bold text-zinc-600 md:text-xl">
          Carregando metas...
        </p>
      </section>
    );
  }

  if (error || !data) {
    return (
      <section className="rounded-3xl border border-red-200 bg-red-50 p-6 md:p-8">
        <p className="text-lg font-bold text-red-700 md:text-xl">
          Não foi possível carregar os termômetros agora.
        </p>
      </section>
    );
  }

  return (
    <section className="grid gap-6 md:grid-cols-2">
      <article className="rounded-3xl border border-red-100 bg-white p-6 shadow-lg md:p-8">
        <div className="mb-5">
          <p className="text-base font-black uppercase tracking-wide text-red-600 md:text-lg">
            Meta de ingressos
          </p>

          <h2 className="mt-2 text-3xl font-black leading-tight text-zinc-950 md:text-4xl">
            {formatarNumero(data.ingressos.vendidos)} de{" "}
            {formatarNumero(data.meta.ingressos)} ingressos
          </h2>

          <p className="mt-3 text-lg font-bold leading-relaxed text-zinc-700 md:text-xl">
            Faltam{" "}
            <span className="font-black text-red-600">
              {formatarNumero(data.ingressos.restantes)}
            </span>{" "}
            ingressos para batermos a meta.
          </p>
        </div>

        <BarraProgresso
          percentual={data.ingressos.percentual}
          cor="bg-red-600"
        />

        <div className="mt-4 flex items-center justify-between gap-3 text-base font-black text-zinc-700 md:text-lg">
          <span className="rounded-full bg-red-50 px-4 py-2 text-red-600">
            {formatarPercentual(data.ingressos.percentual)}
          </span>

          <span className="rounded-full bg-zinc-100 px-4 py-2 text-zinc-800">
            Meta: {formatarNumero(data.meta.ingressos)}
          </span>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-zinc-50 p-4 shadow-sm">
            <p className="text-base font-bold text-zinc-600 md:text-lg">
              Ingressos comuns
            </p>

            <p className="mt-1 text-2xl font-black text-zinc-950 md:text-3xl">
              {formatarNumero(data.ingressos.comuns)}
            </p>
          </div>

          <div className="rounded-2xl bg-zinc-50 p-4 shadow-sm">
            <p className="text-base font-bold text-zinc-600 md:text-lg">
              Eternizados
            </p>

            <p className="mt-1 text-2xl font-black text-zinc-950 md:text-3xl">
              {formatarNumero(data.ingressos.eternizados)}
            </p>
          </div>
        </div>
      </article>

      <article className="rounded-3xl border border-green-100 bg-white p-6 shadow-lg md:p-8">
        <div className="mb-5">
          <p className="text-base font-black uppercase tracking-wide text-green-700 md:text-lg">
            Meta de alimentos
          </p>

          <h2 className="mt-2 text-3xl font-black leading-tight text-zinc-950 md:text-4xl">
            {formatarNumero(data.alimentos.kg)} kg de{" "}
            {formatarNumero(data.meta.alimentos_kg)} kg
          </h2>

          <p className="mt-3 text-lg font-bold leading-relaxed text-zinc-700 md:text-xl">
            Meta total:{" "}
            <span className="font-black text-green-700">
              {data.meta.alimentos_toneladas} toneladas
            </span>{" "}
            de alimentos não perecíveis.
          </p>
        </div>

        <BarraProgresso
          percentual={data.alimentos.percentual}
          cor="bg-green-600"
        />

        <div className="mt-4 flex items-center justify-between gap-3 text-base font-black text-zinc-700 md:text-lg">
          <span className="rounded-full bg-green-50 px-4 py-2 text-green-700">
            {formatarPercentual(data.alimentos.percentual)}
          </span>

          <span className="rounded-full bg-zinc-100 px-4 py-2 text-zinc-800">
            Faltam {formatarNumero(data.alimentos.restantes_kg)} kg
          </span>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-zinc-50 p-4 shadow-sm">
            <p className="text-base font-bold text-zinc-600 md:text-lg">
              Por ingressos
            </p>

            <p className="mt-1 text-2xl font-black text-zinc-950 md:text-3xl">
              {formatarNumero(data.fontes.ingressos_kg)} kg
            </p>
          </div>

          <div className="rounded-2xl bg-zinc-50 p-4 shadow-sm">
            <p className="text-base font-bold text-zinc-600 md:text-lg">
              Por kits
            </p>

            <p className="mt-1 text-2xl font-black text-zinc-950 md:text-3xl">
              {formatarNumero(data.fontes.kits_kg)} kg
            </p>
          </div>

          <div className="rounded-2xl bg-zinc-50 p-4 shadow-sm">
            <p className="text-base font-bold text-zinc-600 md:text-lg">
              Por membros
            </p>

            <p className="mt-1 text-2xl font-black text-zinc-950 md:text-3xl">
              {formatarNumero(data.fontes.membros_kg)} kg
            </p>
          </div>

          <div className="rounded-2xl bg-zinc-50 p-4 shadow-sm">
            <p className="text-base font-bold text-zinc-600 md:text-lg">
              Outros
            </p>

            <p className="mt-1 text-2xl font-black text-zinc-950 md:text-3xl">
              {formatarNumero(data.fontes.outros_kg)} kg
            </p>
          </div>
        </div>
      </article>
    </section>
  );
}
