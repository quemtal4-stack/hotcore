"use client";

import { useMemo, useState } from "react";

const META_DOACAO_KG = 104000;

const VALOR_INGRESSO_COMUM = 20;
const VALOR_SEXTO_INGRESSO = 80;

const MIN_INGRESSOS_COMUNS = 1;
const MAX_INGRESSOS_COMUNS = 5;

function formatarKg(valor: number) {
  return new Intl.NumberFormat("pt-BR").format(valor);
}

function formatarMoeda(valor: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
}

export default function CarrinhoIngressosColecionaveis() {
  const [quantidadeComum, setQuantidadeComum] = useState(1);
  const [incluirSextoIngresso, setIncluirSextoIngresso] = useState(false);

  const sextoIngressoLiberado = quantidadeComum === MAX_INGRESSOS_COMUNS;

  const quantidadeTotal = quantidadeComum + (incluirSextoIngresso ? 1 : 0);

  const total =
    quantidadeComum * VALOR_INGRESSO_COMUM +
    (incluirSextoIngresso ? VALOR_SEXTO_INGRESSO : 0);

  const kgAbatidos = quantidadeComum + (incluirSextoIngresso ? 3 : 0);

  const kgRestantes = Math.max(META_DOACAO_KG - kgAbatidos, 0);

  const percentual = useMemo(() => {
    return Math.min((kgAbatidos / META_DOACAO_KG) * 100, 100);
  }, [kgAbatidos]);

  function diminuir() {
    setQuantidadeComum((valorAtual) => {
      const novoValor = Math.max(valorAtual - 1, MIN_INGRESSOS_COMUNS);

      if (novoValor < MAX_INGRESSOS_COMUNS) {
        setIncluirSextoIngresso(false);
      }

      return novoValor;
    });
  }

  function aumentar() {
    setQuantidadeComum((valorAtual) =>
      Math.min(valorAtual + 1, MAX_INGRESSOS_COMUNS)
    );
  }

  function alternarSextoIngresso() {
    if (!sextoIngressoLiberado) return;

    setIncluirSextoIngresso((valorAtual) => !valorAtual);
  }

  function continuarParaCadastro() {
    const params = new URLSearchParams({
      tipo: "ingresso-solidario-colecionavel",
      produto: "ingresso-solidario-colecionavel",
      titulo: "Ingresso Solidário Colecionável",
      ingressos: String(quantidadeComum),
      quantidade: String(quantidadeComum),
      quantidadeTotal: String(quantidadeTotal),
      sextoIngresso: incluirSextoIngresso ? "sim" : "nao",
      kgAlimentos: String(kgAbatidos),
      valor: String(total),
    });

    window.location.href = `/cadastro?${params.toString()}`;
  }

  return (
    <section className="mx-auto mt-12 max-w-6xl rounded-[2rem] bg-white p-6 shadow-xl md:p-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_390px]">
        <div>
          <p className="inline-flex rounded-full bg-red-100 px-4 py-2 text-sm font-black uppercase tracking-wide text-red-600">
            Ingressos solidários colecionáveis
          </p>

          <h2 className="mt-5 text-3xl font-black leading-tight text-gray-900 md:text-4xl">
            Monte sua coleção e ajude a reduzir a meta solidária
          </h2>

          <p className="mt-4 text-gray-600">
            Os ingressos colecionáveis do 1º ao 5º custam{" "}
            <strong>R$ 20,00</strong> cada. Ao completar 5 ingressos no mesmo
            CPF, o 6º ingresso colecionável especial é liberado por{" "}
            <strong>R$ 80,00</strong>.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl bg-red-100 p-5">
              <p className="text-sm font-bold text-red-700">
                Meta da campanha
              </p>
              <p className="mt-2 text-3xl font-black text-red-700">
                {formatarKg(META_DOACAO_KG)} kg
              </p>
            </div>

            <div className="rounded-3xl bg-green-100 p-5">
              <p className="text-sm font-bold text-green-700">
                Sua compra reduz
              </p>
              <p className="mt-2 text-3xl font-black text-green-700">
                {formatarKg(kgAbatidos)} kg
              </p>
            </div>

            <div className="rounded-3xl bg-yellow-100 p-5">
              <p className="text-sm font-bold text-yellow-800">
                Total da coleção
              </p>
              <p className="mt-2 text-3xl font-black text-yellow-900">
                {quantidadeTotal} ingresso(s)
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-gray-200 bg-gray-50 p-5">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-black uppercase tracking-wide text-gray-500">
                  Medidor de doação
                </p>

                <h3 className="mt-1 text-2xl font-black text-gray-900">
                  Faltam {formatarKg(kgRestantes)} kg
                </h3>
              </div>

              <p className="font-black text-green-700">
                -{formatarKg(kgAbatidos)} kg com seus colecionáveis
              </p>
            </div>

            <div className="mt-5 h-5 overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-green-500 transition-all duration-500"
                style={{ width: `${Math.max(percentual, 0.5)}%` }}
              />
            </div>

            <div className="mt-3 flex justify-between text-sm font-bold text-gray-500">
              <span>0 kg</span>
              <span>{formatarKg(META_DOACAO_KG)} kg</span>
            </div>
          </div>
        </div>

        <aside className="rounded-[2rem] border border-gray-200 bg-gray-50 p-6">
          <p className="text-sm font-black uppercase tracking-wide text-red-600">
            Seu carrinho
          </p>

          <h3 className="mt-2 text-2xl font-black text-gray-900">
            Colecionáveis selecionados
          </h3>

          <div className="mt-6 rounded-3xl bg-white p-5 shadow-sm">
            <p className="font-black text-gray-900">
              Ingressos colecionáveis 1º ao 5º
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Liberados para compra
            </p>

            <p className="mt-2 text-sm font-bold text-red-600">
              {formatarMoeda(VALOR_INGRESSO_COMUM)} por unidade
            </p>

            <div className="mt-5 flex items-center justify-between">
              <button
                type="button"
                onClick={diminuir}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-2xl font-black text-gray-700 hover:bg-gray-200"
              >
                -
              </button>

              <span className="text-3xl font-black text-gray-900">
                {quantidadeComum}
              </span>

              <button
                type="button"
                onClick={aumentar}
                disabled={quantidadeComum >= MAX_INGRESSOS_COMUNS}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-red-600 text-2xl font-black text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                +
              </button>
            </div>

            <p className="mt-4 text-center text-xs font-bold text-gray-500">
              Máximo de 5 ingressos comuns por CPF.
            </p>
          </div>

          <div
            className={`mt-5 rounded-3xl border p-5 ${
              sextoIngressoLiberado
                ? "border-yellow-300 bg-yellow-50"
                : "border-gray-200 bg-white opacity-70"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-black text-gray-900">
                  6º ingresso colecionável especial
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  {sextoIngressoLiberado
                    ? "Liberado porque você selecionou 5 ingressos."
                    : "Bloqueado até completar 5 ingressos no CPF."}
                </p>

                <p className="mt-2 text-sm font-bold text-yellow-700">
                  {formatarMoeda(VALOR_SEXTO_INGRESSO)}
                </p>
              </div>

              <button
                type="button"
                onClick={alternarSextoIngresso}
                disabled={!sextoIngressoLiberado}
                className={`rounded-full px-4 py-2 text-sm font-black ${
                  incluirSextoIngresso
                    ? "bg-green-600 text-white"
                    : "bg-gray-900 text-white"
                } disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500`}
              >
                {incluirSextoIngresso ? "Adicionado" : "Adicionar"}
              </button>
            </div>
          </div>

          <div className="mt-6 space-y-4 rounded-3xl bg-white p-5">
            <div className="flex justify-between text-gray-700">
              <span>Ingressos comuns</span>
              <strong>{quantidadeComum}</strong>
            </div>

            <div className="flex justify-between text-gray-700">
              <span>6º especial</span>
              <strong>{incluirSextoIngresso ? "Sim" : "Não"}</strong>
            </div>

            <div className="flex justify-between text-gray-700">
              <span>Total de ingressos</span>
              <strong>{quantidadeTotal}</strong>
            </div>

            <div className="flex justify-between text-gray-700">
              <span>Redução na meta</span>
              <strong>{formatarKg(kgAbatidos)} kg</strong>
            </div>

            <div className="flex justify-between border-t border-gray-200 pt-4 text-xl">
              <span className="font-black text-gray-900">Total</span>
              <span className="font-black text-red-600">
                {formatarMoeda(total)}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={continuarParaCadastro}
            className="mt-6 w-full rounded-full bg-red-600 px-6 py-4 text-lg font-black text-white shadow-lg transition hover:bg-red-700"
          >
            Continuar com meus colecionáveis
          </button>

          <p className="mt-4 text-center text-sm text-gray-500">
            O CPF será confirmado na próxima etapa.
          </p>
        </aside>
      </div>
    </section>
  );
}
