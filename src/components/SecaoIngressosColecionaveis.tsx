"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const META_DOACAO_KG = 104000;

const VALOR_INGRESSO_COLECIONAVEL = 20;
const VALOR_SEXTO_INGRESSO = 80;

const MAX_INGRESSOS_COMUNS = 5;
const KG_POR_INGRESSO_COMUM = 1;
const KG_SEXTO_INGRESSO = 3;

const ANO_COLECAO = 2027;

const NOME_INGRESSO_ESPECIAL = `Eternizados ${ANO_COLECAO}`;
const IMAGEM_INGRESSO_ESPECIAL = `/ingressos/${ANO_COLECAO}/ingresso-eternizados-${ANO_COLECAO}.png`;

type IngressoInicial = {
  numero: number;
  nome: string;
  quantidade: string;
  imagem: string;
  descricao: string;
};

const INGRESSOS_INICIAIS: IngressoInicial[] = [
  {
    numero: 1,
    nome: `ingresso 01 ${ANO_COLECAO}`,
    quantidade: "15 mil unidades",
    imagem: `/ingressos/${ANO_COLECAO}/ingresso-01-${ANO_COLECAO}.png`,
    descricao:
      "Primeiro ingresso da Coleção Especial Hot Dogueres Solidário.",
  },
  {
    numero: 2,
    nome: `ingresso 02 ${ANO_COLECAO}`,
    quantidade: "15 mil unidades",
    imagem: `/ingressos/${ANO_COLECAO}/ingresso-02-${ANO_COLECAO}.png`,
    descricao:
      "Segundo ingresso da Coleção Especial Hot Dogueres Solidário.",
  },
  {
    numero: 3,
    nome: `ingresso 03 ${ANO_COLECAO}`,
    quantidade: "15 mil unidades",
    imagem: `/ingressos/${ANO_COLECAO}/ingresso-03-${ANO_COLECAO}.png`,
    descricao:
      "Terceiro ingresso da Coleção Especial Hot Dogueres Solidário.",
  },
  {
    numero: 4,
    nome: `ingresso 04 ${ANO_COLECAO}`,
    quantidade: "15 mil unidades",
    imagem: `/ingressos/${ANO_COLECAO}/ingresso-04-${ANO_COLECAO}.png`,
    descricao:
      "Quarto ingresso da Coleção Especial Hot Dogueres Solidário.",
  },
  {
    numero: 5,
    nome: `ingresso 05 ${ANO_COLECAO}`,
    quantidade: "15 mil unidades",
    imagem: `/ingressos/${ANO_COLECAO}/ingresso-05-${ANO_COLECAO}.png`,
    descricao:
      "Quinto ingresso da Coleção Especial Hot Dogueres Solidário.",
  },
];

type IngressoAmpliado = {
  numero: number;
  nome: string;
  imagem: string;
  especial?: boolean;
};

function formatarKg(valor: number) {
  return new Intl.NumberFormat("pt-BR").format(valor);
}

function formatarMoeda(valor: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
}

export default function SecaoIngressosColecionaveis() {
  const [quantidadesIngressos, setQuantidadesIngressos] = useState<
    Record<number, number>
  >({});

  const [incluirSextoIngresso, setIncluirSextoIngresso] = useState(false);

  const [ingressoAmpliado, setIngressoAmpliado] =
    useState<IngressoAmpliado | null>(null);

  const [mostrarTodosMobile, setMostrarTodosMobile] = useState(false);

  const quantidadeIngressos = useMemo(() => {
    return Object.values(quantidadesIngressos).reduce(
      (total, quantidade) => total + quantidade,
      0,
    );
  }, [quantidadesIngressos]);

  const atingiuLimiteIngressosComuns =
    quantidadeIngressos >= MAX_INGRESSOS_COMUNS;

  const sextoIngressoLiberado = quantidadeIngressos === MAX_INGRESSOS_COMUNS;

  const podeContinuar = quantidadeIngressos > 0;

  const quantidadeTotal =
    quantidadeIngressos + (incluirSextoIngresso ? 1 : 0);

  const subtotalIngressos =
    quantidadeIngressos * VALOR_INGRESSO_COLECIONAVEL;

  const total =
    subtotalIngressos + (incluirSextoIngresso ? VALOR_SEXTO_INGRESSO : 0);

  const doacaoSelecionada =
    quantidadeIngressos * KG_POR_INGRESSO_COMUM +
    (incluirSextoIngresso ? KG_SEXTO_INGRESSO : 0);

  const doacaoRestante = Math.max(META_DOACAO_KG - doacaoSelecionada, 0);

  const nomesIngressosSelecionados = INGRESSOS_INICIAIS.filter(
    (ingresso) => (quantidadesIngressos[ingresso.numero] ?? 0) > 0,
  ).map((ingresso) => {
    const quantidade = quantidadesIngressos[ingresso.numero] ?? 0;

    return `${ingresso.nome} (${quantidade}x)`;
  });

  const percentual = useMemo(() => {
    return Math.min((doacaoSelecionada / META_DOACAO_KG) * 100, 100);
  }, [doacaoSelecionada]);

  const larguraBarra =
    doacaoSelecionada > 0 ? Math.max(percentual, 0.5) : 0;

  function abrirIngressoAmpliado(ingresso: IngressoAmpliado) {
    setIngressoAmpliado(ingresso);
  }

  function fecharIngressoAmpliado() {
    setIngressoAmpliado(null);
  }

  useEffect(() => {
    function aoPressionarTecla(evento: KeyboardEvent) {
      if (evento.key === "Escape") {
        fecharIngressoAmpliado();
      }
    }

    if (ingressoAmpliado) {
      window.addEventListener("keydown", aoPressionarTecla);
    }

    return () => {
      window.removeEventListener("keydown", aoPressionarTecla);
    };
  }, [ingressoAmpliado]);

  useEffect(() => {
    if (!sextoIngressoLiberado && incluirSextoIngresso) {
      setIncluirSextoIngresso(false);
    }
  }, [sextoIngressoLiberado, incluirSextoIngresso]);

  function adicionarIngresso(numero: number) {
    setQuantidadesIngressos((valorAtual) => {
      const totalAtual = Object.values(valorAtual).reduce(
        (total, quantidade) => total + quantidade,
        0,
      );

      if (totalAtual >= MAX_INGRESSOS_COMUNS) {
        return valorAtual;
      }

      return {
        ...valorAtual,
        [numero]: (valorAtual[numero] ?? 0) + 1,
      };
    });
  }

  function removerIngresso(numero: number) {
    setQuantidadesIngressos((valorAtual) => {
      const quantidadeAtual = valorAtual[numero] ?? 0;
      const novaQuantidade = quantidadeAtual - 1;

      const novasQuantidades = { ...valorAtual };

      if (novaQuantidade <= 0) {
        delete novasQuantidades[numero];
      } else {
        novasQuantidades[numero] = novaQuantidade;
      }

      return novasQuantidades;
    });
  }

  function alternarSextoIngresso() {
    if (!sextoIngressoLiberado) return;

    setIncluirSextoIngresso((valorAtual) => !valorAtual);
  }

  function irParaCadastro() {
    if (!podeContinuar) return;

    const ingressosComQuantidade = Object.entries(quantidadesIngressos)
      .filter(([, quantidade]) => quantidade > 0)
      .map(([numero, quantidade]) => `${numero}:${quantidade}`)
      .join(",");

    const params = new URLSearchParams({
      tipo: "ingresso-solidario-colecionavel",
      produto: "ingresso-solidario-colecionavel",
      titulo: "Ingresso Solidário Colecionável",
      ingressos: String(quantidadeIngressos),
      ingressosSelecionados: ingressosComQuantidade,
      sextoIngresso: incluirSextoIngresso ? "sim" : "nao",
      quantidadeTotal: String(quantidadeTotal),
      kgAlimentos: String(doacaoSelecionada),
      valor: String(total),
    });

    window.location.href = `/cadastro?${params.toString()}`;
  }

  return (
    <>
      <section className="px-4 pb-12">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_390px]">
          <div className="space-y-8">
            <div className="rounded-[2.5rem] bg-white p-8 shadow-xl md:p-10">
              <p className="text-sm font-black uppercase tracking-wide text-red-600">
                Escolha seus ingressos
              </p>

              <h2 className="mt-3 text-4xl font-black leading-tight">
                Sua coleção solidária começa aqui
              </h2>

              <p className="mt-5 max-w-4xl text-lg leading-relaxed text-gray-700">
                Os 5 modelos principais estão disponíveis. Você pode combinar
                até 5 ingressos comuns por compra.
              </p>

              <p className="mt-4 max-w-4xl leading-relaxed text-gray-600">
                Ao somar 5 ingressos comuns, mesmo que sejam 5 do mesmo modelo,
                o <strong>6º ingresso especial</strong> será liberado. Ele será
                a peça mais exclusiva da coleção:{" "}
                <strong>{NOME_INGRESSO_ESPECIAL}</strong>.
              </p>
            </div>

            <div className="grid gap-8">
              {INGRESSOS_INICIAIS.map((ingresso, index) => {
                const quantidadeSelecionada =
                  quantidadesIngressos[ingresso.numero] ?? 0;

                const selecionado = quantidadeSelecionada > 0;

                const escondidoNoMobile = index > 0 && !mostrarTodosMobile;

                return (
                  <article
                    key={ingresso.numero}
                    className={`overflow-hidden rounded-[2.5rem] border-2 bg-white shadow-xl transition ${
                      escondidoNoMobile ? "hidden md:block" : ""
                    } ${
                      selecionado
                        ? "border-red-500"
                        : "border-transparent hover:border-red-200"
                    }`}
                  >
                    <div className="grid gap-0 lg:grid-cols-[1.35fr_0.65fr]">
                      <div
                        className={`min-h-[460px] p-6 text-left transition md:min-h-[620px] ${
                          selecionado
                            ? "bg-red-50"
                            : "bg-gradient-to-br from-[#fffaf0] to-white"
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() =>
                            abrirIngressoAmpliado({
                              numero: ingresso.numero,
                              nome: ingresso.nome,
                              imagem: ingresso.imagem,
                            })
                          }
                          className="group flex h-full w-full flex-col overflow-hidden rounded-[2rem] border-2 border-dashed border-gray-300 bg-white/70 text-left transition hover:border-red-300"
                        >
                          <div className="relative min-h-[420px] w-full flex-1 overflow-hidden rounded-[1.8rem] bg-[#fff7e8] md:min-h-[560px]">
                            <Image
                              src={ingresso.imagem}
                              alt={ingresso.nome}
                              fill
                              priority={ingresso.numero === 1}
                              sizes="(max-width: 768px) 100vw, 70vw"
                              className="object-contain p-2 transition duration-500 group-hover:scale-105"
                            />

                            <div className="absolute left-4 top-4 rounded-full bg-white/90 px-4 py-2 text-xs font-black uppercase tracking-wide text-red-600 shadow">
                              Ingresso #{ingresso.numero}
                            </div>

                            <div
                              className={`absolute right-4 top-4 rounded-full px-4 py-2 text-xs font-black uppercase tracking-wide shadow ${
                                selecionado
                                  ? "bg-red-600 text-white"
                                  : "bg-white/90 text-gray-700"
                              }`}
                            >
                              {selecionado
                                ? `${quantidadeSelecionada} selecionado${
                                    quantidadeSelecionada === 1 ? "" : "s"
                                  }`
                                : "Disponível"}
                            </div>

                            <div className="absolute bottom-4 right-4 rounded-full bg-gray-950 px-5 py-3 text-sm font-black uppercase tracking-wide text-white shadow-lg transition group-hover:bg-red-600">
                              Ver maior
                            </div>
                          </div>
                        </button>
                      </div>

                      <div className="flex flex-col justify-between gap-6 border-t border-gray-100 p-6 lg:border-l lg:border-t-0">
                        <div>
                          <p className="text-sm font-black uppercase tracking-wide text-red-600">
                            Ingresso solidário
                          </p>

                          <h4 className="mt-2 text-2xl font-black">
                            {ingresso.nome}
                          </h4>

                          <p className="mt-2 inline-flex rounded-full bg-red-50 px-4 py-2 text-sm font-black text-red-600">
                            {ingresso.quantidade}
                          </p>

                          <p className="mt-4 leading-relaxed text-gray-600">
                            {ingresso.descricao}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm font-bold text-gray-500">
                            Valor unitário
                          </p>

                          <p className="mt-1 text-4xl font-black text-red-600">
                            {formatarMoeda(VALOR_INGRESSO_COLECIONAVEL)}
                          </p>

                          <div className="mt-5 rounded-3xl bg-gray-50 p-4">
                            <p className="mb-3 text-center text-sm font-black uppercase tracking-wide text-gray-600">
                              Quantidade escolhida
                            </p>

                            <div className="grid grid-cols-[56px_1fr_56px] items-center gap-3">
                              <button
                                type="button"
                                onClick={() =>
                                  removerIngresso(ingresso.numero)
                                }
                                disabled={quantidadeSelecionada === 0}
                                className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-200 text-3xl font-black text-gray-700 transition hover:bg-red-600 hover:text-white disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
                                aria-label={`Remover um ingresso ${ingresso.nome}`}
                              >
                                -
                              </button>

                              <div className="rounded-2xl bg-white px-4 py-3 text-center shadow-sm">
                                <p className="text-4xl font-black text-red-600">
                                  {quantidadeSelecionada}
                                </p>
                                <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
                                  unidade
                                  {quantidadeSelecionada === 1 ? "" : "s"}
                                </p>
                              </div>

                              <button
                                type="button"
                                onClick={() =>
                                  adicionarIngresso(ingresso.numero)
                                }
                                disabled={atingiuLimiteIngressosComuns}
                                className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-3xl font-black text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
                                aria-label={`Adicionar um ingresso ${ingresso.nome}`}
                              >
                                +
                              </button>
                            </div>

                            <button
                              type="button"
                              onClick={() =>
                                adicionarIngresso(ingresso.numero)
                              }
                              disabled={atingiuLimiteIngressosComuns}
                              className="mt-4 w-full rounded-full bg-gray-900 px-6 py-4 text-sm font-black uppercase tracking-wide text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
                            >
                              {atingiuLimiteIngressosComuns
                                ? "Limite de 5 ingressos atingido"
                                : "Adicionar mais um"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}

              {!mostrarTodosMobile && (
                <button
                  type="button"
                  onClick={() => setMostrarTodosMobile(true)}
                  className="block w-full rounded-full bg-red-600 px-6 py-4 text-center text-sm font-black uppercase tracking-wide text-white shadow-lg transition hover:bg-red-700 md:hidden"
                >
                  Ver os outros ingressos
                </button>
              )}

              <article
                className={`overflow-hidden rounded-[2.5rem] border-2 bg-white shadow-xl transition ${
                  !mostrarTodosMobile ? "hidden md:block" : ""
                } ${
                  sextoIngressoLiberado
                    ? incluirSextoIngresso
                      ? "border-yellow-500"
                      : "border-yellow-300"
                    : "border-gray-200 opacity-85"
                }`}
              >
                <div className="grid gap-0 lg:grid-cols-[1.35fr_0.65fr]">
                  <div
                    className={`min-h-[460px] p-6 text-left transition md:min-h-[620px] ${
                      sextoIngressoLiberado
                        ? incluirSextoIngresso
                          ? "bg-yellow-50"
                          : "bg-gradient-to-br from-yellow-50 to-white"
                        : "bg-gray-100"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        abrirIngressoAmpliado({
                          numero: 6,
                          nome: NOME_INGRESSO_ESPECIAL,
                          imagem: IMAGEM_INGRESSO_ESPECIAL,
                          especial: true,
                        })
                      }
                      className="group flex h-full w-full flex-col overflow-hidden rounded-[2rem] border-2 border-dashed border-yellow-300 bg-white/70 text-left transition hover:border-yellow-500"
                    >
                      <div className="relative min-h-[420px] w-full flex-1 overflow-hidden rounded-[1.8rem] bg-[#fff7e8] md:min-h-[560px]">
                        <Image
                          src={IMAGEM_INGRESSO_ESPECIAL}
                          alt={NOME_INGRESSO_ESPECIAL}
                          fill
                          sizes="(max-width: 768px) 100vw, 70vw"
                          className="object-contain p-2 transition duration-500 group-hover:scale-105"
                        />

                        <div className="absolute left-4 top-4 rounded-full bg-yellow-400 px-4 py-2 text-xs font-black uppercase tracking-wide text-gray-950 shadow">
                          {NOME_INGRESSO_ESPECIAL}
                        </div>

                        <div
                          className={`absolute right-4 top-4 rounded-full px-4 py-2 text-xs font-black uppercase tracking-wide shadow ${
                            !sextoIngressoLiberado
                              ? "bg-gray-300 text-gray-600"
                              : incluirSextoIngresso
                                ? "bg-yellow-600 text-white"
                                : "bg-white/90 text-yellow-700"
                          }`}
                        >
                          {!sextoIngressoLiberado
                            ? "Bloqueado"
                            : incluirSextoIngresso
                              ? "Selecionado"
                              : "Liberado"}
                        </div>

                        <div className="absolute bottom-4 right-4 rounded-full bg-gray-950 px-5 py-3 text-sm font-black uppercase tracking-wide text-white shadow-lg transition group-hover:bg-yellow-600">
                          Ver maior
                        </div>
                      </div>
                    </button>
                  </div>

                  <div className="flex flex-col justify-between gap-6 border-t border-gray-100 p-6 lg:border-l lg:border-t-0">
                    <div>
                      <p className="text-sm font-black uppercase tracking-wide text-yellow-700">
                        Desbloqueio especial
                      </p>

                      <h4 className="mt-2 text-2xl font-black">
                        {NOME_INGRESSO_ESPECIAL}
                      </h4>

                      <p className="mt-4 leading-relaxed text-gray-600">
                        O 6º ingresso será liberado quando a compra somar
                        exatamente 5 ingressos comuns. Pode ser 1 de cada
                        modelo ou até 5 do mesmo ingresso.
                      </p>

                      <p className="mt-4 leading-relaxed text-gray-600">
                        Ele representa a peça mais exclusiva da coleção, com 2
                        mil unidades e a possibilidade de ter o nome em um
                        painel ao lado do hot dog gigante.
                      </p>

                      {!sextoIngressoLiberado && (
                        <p className="mt-4 rounded-2xl bg-gray-100 p-4 text-sm font-bold text-gray-600">
                          Adicione 5 ingressos comuns para desbloquear.
                        </p>
                      )}

                      {sextoIngressoLiberado && (
                        <p className="mt-4 rounded-2xl bg-yellow-50 p-4 text-sm font-bold text-yellow-800">
                          Ingresso especial liberado. Você já somou{" "}
                          {quantidadeIngressos} ingressos comuns.
                        </p>
                      )}
                    </div>

                    <div>
                      <p className="text-sm font-bold text-gray-500">Valor</p>

                      <p className="mt-1 text-4xl font-black text-yellow-700">
                        {formatarMoeda(VALOR_SEXTO_INGRESSO)}
                      </p>

                      <button
                        type="button"
                        onClick={alternarSextoIngresso}
                        disabled={!sextoIngressoLiberado}
                        className={`mt-5 w-full rounded-full px-6 py-4 text-sm font-black uppercase tracking-wide transition disabled:cursor-not-allowed ${
                          incluirSextoIngresso
                            ? "bg-yellow-600 text-white hover:bg-yellow-700"
                            : "bg-gray-900 text-white hover:bg-gray-800"
                        } disabled:bg-gray-300 disabled:text-gray-600`}
                      >
                        {incluirSextoIngresso
                          ? "Remover ingresso especial"
                          : "Adicionar ingresso especial"}
                      </button>
                    </div>
                  </div>
                </div>
              </article>

              {mostrarTodosMobile && (
                <button
                  type="button"
                  onClick={() => setMostrarTodosMobile(false)}
                  className="block w-full rounded-full border border-red-200 bg-white px-6 py-4 text-center text-sm font-black uppercase tracking-wide text-red-600 shadow-sm transition hover:bg-red-50 md:hidden"
                >
                  Mostrar menos
                </button>
              )}
            </div>
          </div>

          <aside className="h-fit rounded-[2.5rem] bg-white p-6 shadow-xl lg:sticky lg:top-8">
            <p className="text-sm font-black uppercase tracking-wide text-red-600">
              Resumo solidário
            </p>

            <h2 className="mt-2 text-3xl font-black">Sua contribuição</h2>

            <div className="mt-6 rounded-3xl bg-[#fff2cc] p-5">
              <p className="text-sm font-black uppercase tracking-wide text-yellow-800">
                Termômetro da campanha
              </p>

              <div className="mt-4">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-3xl font-black">
                      {formatarKg(doacaoSelecionada)} kg
                    </p>
                    <p className="text-sm text-gray-600">
                      impacto simbólico desta compra
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-black">
                      {formatarKg(META_DOACAO_KG)} kg
                    </p>
                    <p className="text-sm text-gray-600">meta</p>
                  </div>
                </div>

                <div className="mt-5 h-4 overflow-hidden rounded-full bg-white">
                  <div
                    className="h-full rounded-full bg-red-500 transition-all"
                    style={{ width: `${larguraBarra}%` }}
                  />
                </div>

                <p className="mt-3 text-sm leading-relaxed text-gray-700">
                  Ainda faltam{" "}
                  <strong>{formatarKg(doacaoRestante)} kg</strong> para atingir
                  a meta simbólica.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4 rounded-3xl bg-gray-50 p-5">
              <div className="flex justify-between gap-4 text-gray-700">
                <span>Ingressos escolhidos</span>
                <strong className="max-w-[190px] text-right">
                  {nomesIngressosSelecionados.length > 0
                    ? nomesIngressosSelecionados.join(", ")
                    : "Nenhum"}
                </strong>
              </div>

              <div className="flex justify-between gap-4 text-gray-700">
                <span>Ingressos comuns</span>
                <strong>{quantidadeIngressos}</strong>
              </div>

              <div className="flex justify-between gap-4 text-gray-700">
                <span>Valor unitário</span>
                <strong>{formatarMoeda(VALOR_INGRESSO_COLECIONAVEL)}</strong>
              </div>

              <div className="flex justify-between gap-4 text-gray-700">
                <span>Subtotal comuns</span>
                <strong>{formatarMoeda(subtotalIngressos)}</strong>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between gap-4 text-gray-700">
                  <span>6º ingresso</span>
                  <strong>{incluirSextoIngresso ? "Sim" : "Não"}</strong>
                </div>

                {incluirSextoIngresso && (
                  <>
                    <div className="mt-3 flex justify-between gap-4 text-gray-700">
                      <span>Valor do 6º</span>
                      <strong>{formatarMoeda(VALOR_SEXTO_INGRESSO)}</strong>
                    </div>

                    <div className="mt-3 flex justify-between gap-4 text-gray-700">
                      <span>Impacto do 6º</span>
                      <strong>{KG_SEXTO_INGRESSO} kg</strong>
                    </div>
                  </>
                )}
              </div>

              <div className="flex justify-between gap-4 border-t border-gray-200 pt-4 text-gray-700">
                <span>Total de ingressos</span>
                <strong>{quantidadeTotal}</strong>
              </div>

              <div className="flex justify-between gap-4 text-gray-700">
                <span>Doação abatida</span>
                <strong>{formatarKg(doacaoSelecionada)} kg</strong>
              </div>

              <div className="flex justify-between gap-4 border-t border-gray-200 pt-4 text-xl">
                <span className="font-black">Total</span>
                <span className="font-black text-red-600">
                  {formatarMoeda(total)}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={irParaCadastro}
              disabled={!podeContinuar}
              className="mt-6 w-full rounded-full bg-red-600 px-6 py-4 text-lg font-black text-white shadow-lg transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-600"
            >
              {podeContinuar
                ? "Continuar para cadastro"
                : "Selecione um ingresso"}
            </button>

            <p className="mt-4 text-center text-sm leading-relaxed text-gray-500">
              Depois do cadastro, o comprador seguirá para o pagamento via
              Mercado Pago.
            </p>

            <div className="mt-6 rounded-3xl bg-blue-50 p-5">
              <p className="text-sm font-black uppercase tracking-wide text-blue-700">
                Próximas etapas
              </p>

              <p className="mt-2 text-sm leading-relaxed text-gray-700">
                Após a compra, o comprador poderá acessar a área de
                colecionáveis pelo CPF, visualizar seus ingressos, personalizar
                o 6º ingresso e decidir se deseja aparecer na galeria pública.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {ingressoAmpliado && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={fecharIngressoAmpliado}
        >
          <div
            className="relative flex max-h-[95vh] w-full max-w-6xl flex-col overflow-hidden rounded-[2rem] bg-white shadow-2xl"
            onClick={(evento) => evento.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-gray-100 p-5 md:p-6">
              <div>
                <p
                  className={`text-sm font-black uppercase tracking-wide ${
                    ingressoAmpliado.especial
                      ? "text-yellow-700"
                      : "text-red-600"
                  }`}
                >
                  {ingressoAmpliado.especial
                    ? "Ingresso especial"
                    : `Ingresso #${ingressoAmpliado.numero}`}
                </p>

                <h2 className="mt-1 text-2xl font-black md:text-4xl">
                  {ingressoAmpliado.nome}
                </h2>
              </div>

              <button
                type="button"
                onClick={fecharIngressoAmpliado}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-100 text-2xl font-black text-gray-700 transition hover:bg-red-600 hover:text-white"
                aria-label="Fechar visualização do ingresso"
              >
                ×
              </button>
            </div>

            <div className="relative h-[75vh] w-full bg-[#fff7e8]">
              <Image
                src={ingressoAmpliado.imagem}
                alt={ingressoAmpliado.nome}
                fill
                sizes="100vw"
                className="object-contain p-4"
                priority
              />
            </div>

            <div className="flex flex-col gap-3 border-t border-gray-100 p-5 md:flex-row md:items-center md:justify-between md:p-6">
              <p className="text-sm font-bold text-gray-600">
                Clique fora da imagem ou pressione Esc para fechar.
              </p>

              <button
                type="button"
                onClick={fecharIngressoAmpliado}
                className={`rounded-full px-6 py-3 text-sm font-black uppercase tracking-wide text-white transition ${
                  ingressoAmpliado.especial
                    ? "bg-yellow-600 hover:bg-yellow-700"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
