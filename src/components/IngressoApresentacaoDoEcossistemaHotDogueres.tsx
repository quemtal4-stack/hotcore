"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type SecaoIngressoApresentacaoDoEcossistemaHotDogueresProps = {
  kgDoados: number;
  metaKg: number;
};

function formatarMoeda(valor: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
}

function formatarNumero(valor: number) {
  return new Intl.NumberFormat("pt-BR").format(valor);
}

export default function IngressoHotDogDay({
  kgDoados,
  metaKg,
}: SecaoIngressoApresentacaoDoEcossistemaHotDogueresProps) {
  const [quantidade, setQuantidade] = useState(0);
  const [ampliado, setAmpliado] = useState(false);

  const valorUnitario = 20;
  const kgPorIngresso = 1;

  const kgComCompra = useMemo(() => {
    return kgDoados + quantidade * kgPorIngresso;
  }, [kgDoados, quantidade]);

  const kgRestantes = useMemo(() => {
    return Math.max(metaKg - kgComCompra, 0);
  }, [metaKg, kgComCompra]);

  const percentual = useMemo(() => {
    return Math.min((kgComCompra / metaKg) * 100, 100);
  }, [kgComCompra, metaKg]);

  const valorTotal = quantidade * valorUnitario;

  function adicionar() {
    setQuantidade((atual) => atual + 1);
  }

  function remover() {
    setQuantidade((atual) => {
      if (atual <= 0) return 0;
      return atual - 1;
    });
  }

  function irParaCadastro() {
    if (quantidade <= 0) return;

    const params = new URLSearchParams({
      tipo: "hot-dog-day",
      ingresso: "Hot Dog Day",
      quantidade: String(quantidade),
      valor: String(valorTotal),
      kg: String(quantidade * kgPorIngresso),
    });

    window.location.href = `/cadastro?${params.toString()}`;
  }

  useEffect(() => {
    function fecharComEsc(evento: KeyboardEvent) {
      if (evento.key === "Escape") {
        setAmpliado(false);
      }
    }

    window.addEventListener("keydown", fecharComEsc);

    return () => {
      window.removeEventListener("keydown", fecharComEsc);
    };
  }, []);

  return (
  <section className="px-4 py-8">
    <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-white p-4 shadow-2xl md:p-8">
      <div className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-center">
        <button
          type="button"
          onClick={() => setAmpliado(true)}
          className="relative h-[340px] w-full overflow-hidden rounded-[2rem] bg-[#fffaf0] ring-1 ring-red-100 md:h-[520px] lg:h-[620px]"
          aria-label="Ampliar ingresso Apresentação do Ecossistema Hot Dogueres"
        >
          <Image
            src="/ingressos/apresentacao-do-ecossistema-hot-dogueres-2026.png"
            alt="Ingresso Apresentação do Ecossistema Hot Dogueres"
            fill
            sizes="(max-width: 1024px) 100vw, 850px"
            className="object-contain p-2 md:p-4"
            unoptimized
          />
        </button>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-red-600 px-4 py-2 text-xs font-black uppercase tracking-wide text-white">
                Ingresso oficial
              </span>

              <span className="rounded-full bg-yellow-300 px-4 py-2 text-xs font-black uppercase tracking-wide text-gray-950">
                Apresentação do Ecossistema Hot Dogueres
              </span>
            </div>

            <h2 className="mt-4 text-3xl font-black leading-tight text-gray-950 md:text-4xl">
              Ingresso Apresentação do Ecossistema hot Dogueres
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-gray-700">
              Garanta seu ingresso oficial da Apresentção do Ecossistema Hot Dogueres e participe dessa
              corrente solidária. Cada ingresso representa alimento, impacto
              social e contribuição direta para a meta de 106 toneladas.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-[#fff2cc] p-4">
                <p className="text-xs font-black uppercase tracking-wide text-yellow-800">
                  Valor
                </p>

                <p className="mt-1 text-2xl font-black text-gray-950">
                  {formatarMoeda(valorUnitario)}
                </p>
              </div>

              <div className="rounded-2xl bg-red-50 p-4">
                <p className="text-xs font-black uppercase tracking-wide text-red-600">
                  Selecionados
                </p>

                <p className="mt-1 text-2xl font-black text-gray-950">
                  {String(quantidade).padStart(2, "0")}
                </p>
              </div>

              <div className="rounded-2xl bg-green-50 p-4">
                <p className="text-xs font-black uppercase tracking-wide text-green-700">
                  Impacto
                </p>

                <p className="mt-1 text-2xl font-black text-gray-950">
                  {quantidade * kgPorIngresso} kg
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-[1.5rem] bg-gray-950 p-4 text-white">
              <p className="text-xs font-black uppercase tracking-wide text-yellow-300">
                Contagem regressiva das 106 toneladas
              </p>

              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-white/10 p-3">
                  <p className="text-xs font-bold uppercase text-gray-300">
                    Já alcançado
                  </p>

                  <p className="mt-1 text-2xl font-black">
                    {formatarNumero(kgComCompra)} kg
                  </p>
                </div>

                <div className="rounded-2xl bg-white/10 p-3">
                  <p className="text-xs font-bold uppercase text-gray-300">
                    Faltam
                  </p>

                  <p className="mt-1 text-2xl font-black text-yellow-300">
                    {formatarNumero(kgRestantes)} kg
                  </p>
                </div>
              </div>

              <div className="mt-4 h-4 overflow-hidden rounded-full bg-white/20">
                <div
                  className="h-full rounded-full bg-red-600 transition-all"
                  style={{ width: `${percentual}%` }}
                />
              </div>

              <p className="mt-2 text-xs font-bold text-gray-300">
                Meta total: {formatarNumero(metaKg)} kg de alimentos.
              </p>
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={remover}
                disabled={quantidade <= 0}
                className="rounded-full bg-white px-5 py-3 text-lg font-black text-gray-950 ring-1 ring-gray-200 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                -
              </button>

              <button
                type="button"
                onClick={adicionar}
                className="flex-1 rounded-full bg-red-600 px-5 py-3 text-xs font-black uppercase tracking-wide text-white shadow-lg transition hover:bg-red-700"
              >
                Adicionar ingresso
              </button>

              <button
                type="button"
                onClick={() => setAmpliado(true)}
                className="flex-1 rounded-full bg-gray-950 px-5 py-3 text-xs font-black uppercase tracking-wide text-white transition hover:bg-gray-800"
              >
                Ampliar
              </button>
            </div>

            <button
              type="button"
              onClick={irParaCadastro}
              disabled={quantidade <= 0}
              className="mt-3 w-full rounded-full bg-yellow-400 px-5 py-3 text-xs font-black uppercase tracking-wide text-gray-950 transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-600"
            >
              Continuar para cadastro — {formatarMoeda(valorTotal)}
            </button>
          </div>
        </div>
      </div>

      {ampliado && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-7xl rounded-[2rem] bg-white p-4 shadow-2xl">
            <button
              type="button"
              onClick={() => setAmpliado(false)}
              className="absolute right-4 top-4 z-20 rounded-full bg-red-600 px-5 py-3 text-xs font-black uppercase tracking-wide text-white shadow-lg transition hover:bg-red-700"
            >
              Fechar
            </button>

            <div className="relative min-h-[82vh] overflow-hidden rounded-[1.5rem] bg-gray-100">
              <Image
                src="/ingressos/apresentacao-do-ecossistema-hot-dogueres-2026.png"
                alt="Ingresso Apresentação do Ecossistema Hot Dogueres ampliado"
                fill
                sizes="100vw"
                className="object-contain p-4"
                unoptimized
              />
            </div>

            <div className="mt-4 pr-24">
              <h3 className="text-2xl font-black text-gray-950">
                Ingresso Apresentação do Ecossistema Hot Dogueres
              </h3>

              <p className="mt-1 text-sm font-bold text-gray-600">
                {formatarMoeda(valorUnitario)} por ingresso
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
