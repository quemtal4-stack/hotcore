"use client";

import Image from "next/image";
import Link from "next/link";
import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import SetasNavegacao from "@/components/SetasNavegacao";

const ANO_COLECAO = 2028;

type IngressoColecao = {
  id: string;
  titulo: string;
  descricao: string;
  imagem: string;
  tag: string;
  especial?: boolean;
};

type IngressoNaPasta = IngressoColecao & {
  quantidade: number;
  status?: string;
  nomeEternizado?: string;
};

type ApiIngresso = {
  id?: string | number;
  ingresso_id?: string | null;
  titulo?: string | null;
  descricao?: string | null;
  imagem?: string | null;
  tag?: string | null;
  especial?: boolean | null;
  quantidade?: number | null;
  status?: string | null;
  nome_eternizado?: string | null;
};

type ApiColecionadorResponse = {
  pasta?: {
    id: string;
    cpf: string;
    nome?: string | null;
    email?: string | null;
    telefone?: string | null;
  } | null;
  ingressos?: ApiIngresso[];
  error?: string;
  detalhe?: string;
};

const ingressosColecao: IngressoColecao[] = [
  {
    id: "ingresso-01",
    titulo: `Ingresso 01 ${ANO_COLECAO}`,
    descricao: `Primeiro ingresso da Coleção Especial ${ANO_COLECAO}.`,
    imagem: `/ingressos/${ANO_COLECAO}/ingresso-01-${ANO_COLECAO}.png`,
    tag: `Coleção ${ANO_COLECAO}`,
  },
  {
    id: "ingresso-02",
    titulo: `Ingresso 02 ${ANO_COLECAO}`,
    descricao: `Segundo ingresso da Coleção Especial ${ANO_COLECAO}.`,
    imagem: `/ingressos/${ANO_COLECAO}/ingresso-02-${ANO_COLECAO}.png`,
    tag: `Coleção ${ANO_COLECAO}`,
  },
  {
    id: "ingresso-03",
    titulo: `Ingresso 03 ${ANO_COLECAO}`,
    descricao: `Terceiro ingresso da Coleção Especial ${ANO_COLECAO}.`,
    imagem: `/ingressos/${ANO_COLECAO}/ingresso-03-${ANO_COLECAO}.png`,
    tag: `Coleção ${ANO_COLECAO}`,
  },
  {
    id: "ingresso-04",
    titulo: `Ingresso 04 ${ANO_COLECAO}`,
    descricao: `Quarto ingresso da Coleção Especial ${ANO_COLECAO}.`,
    imagem: `/ingressos/${ANO_COLECAO}/ingresso-04-${ANO_COLECAO}.png`,
    tag: `Coleção ${ANO_COLECAO}`,
  },
  {
    id: "ingresso-05",
    titulo: `Ingresso 05 ${ANO_COLECAO}`,
    descricao: `Quinto ingresso da Coleção Especial ${ANO_COLECAO}.`,
    imagem: `/ingressos/${ANO_COLECAO}/ingresso-05-${ANO_COLECAO}.png`,
    tag: `Coleção ${ANO_COLECAO}`,
  },
  {
    id: "ingresso-06",
    titulo: `Ingresso 06 ${ANO_COLECAO}`,
    descricao: `Sexto ingresso da Coleção Especial ${ANO_COLECAO}.`,
    imagem: `/ingressos/${ANO_COLECAO}/ingresso-06-${ANO_COLECAO}.png`,
    tag: `Coleção ${ANO_COLECAO}`,
  },
  {
    id: "ingresso-eternizados",
    titulo: `Eternizados ${ANO_COLECAO}`,
    descricao:
      "Ingresso especial para quem desbloqueia a peça mais exclusiva da coleção.",
    imagem: `/ingressos/${ANO_COLECAO}/ingresso-eternizados-${ANO_COLECAO}.png`,
    tag: `Ingresso oficial ${ANO_COLECAO}`,
    especial: true,
  },
];

const ingressoDestaque: IngressoColecao =
  ingressosColecao.find((ingresso) => ingresso.especial) ?? ingressosColecao[0]!;

function limparNumero(valor: string) {
  return valor.replace(/\D/g, "");
}

function formatarCpf(valor: string) {
  const numeros = limparNumero(valor).slice(0, 11);

  return numeros
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1-$2");
}

function normalizarIngresso(apiIngresso: ApiIngresso): IngressoNaPasta {
  const ingressoId =
    apiIngresso.ingresso_id || String(apiIngresso.id || "ingresso");

  const ingressoBase = ingressosColecao.find(
    (ingresso) => ingresso.id === ingressoId
  );

  return {
    id: ingressoId,
    titulo: apiIngresso.titulo || ingressoBase?.titulo || "Ingresso",
    descricao:
      apiIngresso.descricao ||
      ingressoBase?.descricao ||
      "Ingresso da coleção especial.",
    imagem:
      apiIngresso.imagem ||
      ingressoBase?.imagem ||
      `/ingressos/${ANO_COLECAO}/ingresso-01-${ANO_COLECAO}.png`,
    tag: apiIngresso.tag || ingressoBase?.tag || `Coleção ${ANO_COLECAO}`,
    especial: Boolean(apiIngresso.especial || ingressoBase?.especial),
    quantidade: Number(apiIngresso.quantidade || 1),
    status: apiIngresso.status || "aprovado",
    nomeEternizado: apiIngresso.nome_eternizado || "",
  };
}

export default function AreaDoColecionadorPage() {
  const [cpf, setCpf] = useState("");
  const [cpfAcessado, setCpfAcessado] = useState("");
  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [salvandoNome, setSalvandoNome] = useState(false);
  const [colecaoCpf, setColecaoCpf] = useState<IngressoNaPasta[]>([]);
  const [ingressoAmpliado, setIngressoAmpliado] =
    useState<IngressoColecao | null>(null);
  const [nomeEternizado, setNomeEternizado] = useState("");

  const totalIngressosNaPasta = useMemo(() => {
    return colecaoCpf.reduce(
      (total, ingresso) => total + ingresso.quantidade,
      0
    );
  }, [colecaoCpf]);

  const possuiEternizado = useMemo(() => {
    return colecaoCpf.some((ingresso) => ingresso.especial);
  }, [colecaoCpf]);

  const totalComuns = useMemo(() => {
    return colecaoCpf
      .filter((ingresso) => !ingresso.especial)
      .reduce((total, ingresso) => total + ingresso.quantidade, 0);
  }, [colecaoCpf]);

  async function acessarPasta(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErro("");
    setMensagem("");
    setCarregando(true);

    try {
      const cpfLimpo = limparNumero(cpf);

      if (cpfLimpo.length !== 11) {
        setErro("Informe um CPF válido para acessar sua pasta.");
        return;
      }

      const resposta = await fetch(`/api/colecionador?cpf=${cpfLimpo}`, {
        method: "GET",
        cache: "no-store",
      });

      const dados = (await resposta.json()) as ApiColecionadorResponse;

      if (!resposta.ok) {
        setErro(dados.error || "Erro ao acessar a pasta do colecionador.");
        return;
      }

      const ingressos = (dados.ingressos || []).map(normalizarIngresso);

      setCpfAcessado(cpfLimpo);
      setColecaoCpf(ingressos);

      const ingressoEternizado = ingressos.find(
        (ingresso) => ingresso.especial
      );

      setNomeEternizado(ingressoEternizado?.nomeEternizado || "");
    } catch {
      setErro("Não foi possível acessar a pasta agora. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  }

  async function salvarNomeEternizado() {
    if (!cpfAcessado) return;

    setErro("");
    setMensagem("");
    setSalvandoNome(true);

    try {
      const resposta = await fetch("/api/colecionador", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cpf: cpfAcessado,
          nomeEternizado,
        }),
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        setErro(dados.error || "Erro ao salvar nome eternizado.");
        return;
      }

      const novaColecao = colecaoCpf.map((ingresso) => {
        if (!ingresso.especial) return ingresso;

        return {
          ...ingresso,
          nomeEternizado: nomeEternizado.trim(),
        };
      });

      setColecaoCpf(novaColecao);
      setMensagem("Nome eternizado salvo com sucesso.");
    } catch {
      setErro("Não foi possível salvar o nome agora. Tente novamente.");
    } finally {
      setSalvandoNome(false);
    }
  }

  function imprimirColecao() {
    window.print();
  }

  return (
    <>
      <SetasNavegacao
        anterior="/clube-de-membros"
        proxima="/loja-solidaria"
        labelAnterior="Voltar para Clube de Membros"
        labelProxima="Ir para Loja Solidária"
      />

      <main className="min-h-screen bg-[#fff7e8] text-gray-950">
        
        <section className="relative overflow-hidden px-4 py-10 md:py-14 print:hidden">
          <div className="absolute left-[-180px] top-[-180px] h-[360px] w-[360px] rounded-full bg-red-200/50 blur-3xl" />
          <div className="absolute bottom-[-200px] right-[-150px] h-[420px] w-[420px] rounded-full bg-yellow-200/70 blur-3xl" />

          <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div className="rounded-[2.5rem] bg-white p-6 shadow-xl ring-1 ring-red-100 md:p-10">
              <p className="inline-flex rounded-full bg-red-600 px-5 py-2 text-xs font-black uppercase tracking-wide text-white">
                Área do Colecionador
              </p>

              <h1 className="mt-5 text-4xl font-black leading-tight md:text-6xl">
                Seus ingressos.
                <br />
                Sua pasta.
                <br />
                Sua história.
              </h1>

              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-gray-700">
                Acesse sua coleção pelo CPF, visualize seus ingressos
                colecionáveis, personalize o ingresso Eternizados e imprima sua
                lembrança da Hot Dogueres Solidária.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                <div className="rounded-3xl bg-red-50 p-5 text-center">
                  <p className="text-3xl font-black text-red-600">CPF</p>
                  <p className="mt-1 text-sm font-bold text-gray-600">
                    Acesso à pasta
                  </p>
                </div>

                <div className="rounded-3xl bg-yellow-50 p-5 text-center">
                  <p className="text-3xl font-black text-yellow-700">2028</p>
                  <p className="mt-1 text-sm font-bold text-gray-600">
                    Coleção oficial
                  </p>
                </div>

                <div className="rounded-3xl bg-green-50 p-5 text-center">
                  <p className="text-3xl font-black text-green-700">Print</p>
                  <p className="mt-1 text-sm font-bold text-gray-600">
                    Imprimir ingresso
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#minha-pasta"
                  className="rounded-full bg-red-600 px-7 py-4 text-center text-sm font-black uppercase tracking-wide text-white shadow-lg transition hover:-translate-y-1 hover:bg-red-700"
                >
                  Acessar minha pasta
                </a>

                <a
                  href="#colecao"
                  className="rounded-full border border-red-200 bg-white px-7 py-4 text-center text-sm font-black uppercase tracking-wide text-red-600 shadow-sm transition hover:-translate-y-1 hover:bg-red-50"
                >
                  Ver coleção {ANO_COLECAO}
                </a>
              </div>
            </div>

            <div className="rounded-[2.5rem] bg-gray-950 p-5 text-white shadow-xl">
              <div className="rounded-[2rem] bg-white p-4">
                <button
                  type="button"
                  onClick={() => setIngressoAmpliado(ingressoDestaque)}
                  className="relative block h-[520px] w-full overflow-hidden rounded-[1.5rem] bg-[#fff7e8] transition hover:scale-[1.02]"
                  aria-label={`Ampliar ${ingressoDestaque.titulo}`}
                >
                  <Image
                    src={ingressoDestaque.imagem}
                    alt={ingressoDestaque.titulo}
                    fill
                    sizes="(max-width: 1024px) 100vw, 520px"
                    className="object-contain p-2"
                    priority
                    unoptimized
                  />
                </button>
              </div>

              <div className="mt-5 text-center">
                <p className="text-xs font-black uppercase tracking-wide text-yellow-300">
                  Ingresso especial
                </p>

                <h2 className="mt-2 text-3xl font-black">
                  Eternizados {ANO_COLECAO}
                </h2>

                <p className="mt-2 text-sm leading-relaxed text-gray-300">
                  A peça mais exclusiva da coleção, com possibilidade de nome
                  personalizado na pasta do colecionador.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="minha-pasta" className="scroll-mt-28 px-4 pb-10">
          <div className="mx-auto max-w-7xl rounded-[2.5rem] bg-white p-6 shadow-xl ring-1 ring-red-100 md:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
              <div>
                <p className="inline-flex rounded-full bg-yellow-400 px-5 py-2 text-xs font-black uppercase tracking-wide text-gray-950">
                  Pasta do CPF
                </p>

                <h2 className="mt-4 text-3xl font-black leading-tight md:text-5xl">
                  Acesse seus colecionáveis
                </h2>

                <p className="mt-4 text-lg leading-relaxed text-gray-700">
                  Digite o CPF usado na compra para abrir sua pasta de
                  ingressos. Aqui ficarão guardados os ingressos aprovados e
                  personalizados.
                </p>

                <form onSubmit={acessarPasta} className="mt-6 space-y-4">
                  <div>
                    <label className="text-sm font-black uppercase tracking-wide text-gray-600">
                      CPF do comprador
                    </label>

                    <input
                      type="text"
                      value={cpf}
                      onChange={(event) =>
                        setCpf(formatarCpf(event.target.value))
                      }
                      placeholder="000.000.000-00"
                      className="mt-2 w-full rounded-2xl border border-gray-200 px-5 py-4 text-gray-900 outline-none transition focus:border-red-500"
                    />
                  </div>

                  {erro && (
                    <div className="rounded-2xl bg-red-50 p-4 text-sm font-bold text-red-600">
                      {erro}
                    </div>
                  )}

                  {mensagem && (
                    <div className="rounded-2xl bg-green-50 p-4 text-sm font-bold text-green-700">
                      {mensagem}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={carregando}
                    className="w-full rounded-full bg-red-600 px-6 py-4 text-sm font-black uppercase tracking-wide text-white shadow-lg transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                  >
                    {carregando ? "Abrindo pasta..." : "Abrir minha pasta"}
                  </button>
                </form>

                <p className="mt-4 text-sm leading-relaxed text-gray-500">
                  Os ingressos aparecem automaticamente após a aprovação da
                  compra vinculada ao CPF informado.
                </p>
              </div>

              <div className="rounded-[2rem] bg-gray-50 p-5">
                {cpfAcessado ? (
                  <>
                    <div className="grid gap-3 sm:grid-cols-3">
                      <div className="rounded-3xl bg-white p-5 text-center shadow-sm">
                        <p className="text-3xl font-black text-red-600">
                          {totalIngressosNaPasta}
                        </p>
                        <p className="mt-1 text-xs font-black uppercase text-gray-500">
                          ingressos
                        </p>
                      </div>

                      <div className="rounded-3xl bg-white p-5 text-center shadow-sm">
                        <p className="text-3xl font-black text-gray-950">
                          {totalComuns}
                        </p>
                        <p className="mt-1 text-xs font-black uppercase text-gray-500">
                          comuns
                        </p>
                      </div>

                      <div className="rounded-3xl bg-white p-5 text-center shadow-sm">
                        <p className="text-3xl font-black text-yellow-700">
                          {possuiEternizado ? "Sim" : "Não"}
                        </p>
                        <p className="mt-1 text-xs font-black uppercase text-gray-500">
                          eternizado
                        </p>
                      </div>
                    </div>

                    {colecaoCpf.length === 0 ? (
                      <div className="mt-6 rounded-3xl bg-white p-6 text-center shadow-sm">
                        <p className="text-xl font-black text-gray-950">
                          Nenhum ingresso encontrado para este CPF.
                        </p>

                        <p className="mt-2 text-sm leading-relaxed text-gray-600">
                          Quando a compra for aprovada, os ingressos aparecerão
                          aqui automaticamente.
                        </p>

                        <Link
                          href="/#ingressos"
                          className="mt-5 inline-flex rounded-full bg-red-600 px-6 py-3 text-sm font-black uppercase tracking-wide text-white transition hover:bg-red-700"
                        >
                          Comprar ingressos
                        </Link>
                      </div>
                    ) : (
                      <>
                        {possuiEternizado && (
                          <div className="mt-6 rounded-3xl bg-yellow-50 p-5 ring-1 ring-yellow-200">
                            <p className="text-sm font-black uppercase tracking-wide text-yellow-800">
                              Nome no ingresso Eternizados
                            </p>

                            <h3 className="mt-2 text-2xl font-black text-gray-950">
                              Personalize sua lembrança
                            </h3>

                            <p className="mt-2 text-sm leading-relaxed text-gray-700">
                              Digite o nome que deverá aparecer no ingresso
                              Eternizados. Essa informação ficará salva na sua
                              pasta.
                            </p>

                            <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto]">
                              <input
                                type="text"
                                value={nomeEternizado}
                                onChange={(event) =>
                                  setNomeEternizado(event.target.value)
                                }
                                placeholder="Nome para eternizar"
                                className="rounded-2xl border border-yellow-200 px-5 py-4 text-gray-900 outline-none focus:border-yellow-500"
                              />

                              <button
                                type="button"
                                onClick={salvarNomeEternizado}
                                disabled={salvandoNome}
                                className="rounded-full bg-yellow-500 px-6 py-4 text-sm font-black uppercase tracking-wide text-gray-950 transition hover:bg-yellow-600 disabled:cursor-not-allowed disabled:bg-gray-300"
                              >
                                {salvandoNome ? "Salvando..." : "Salvar nome"}
                              </button>
                            </div>
                          </div>
                        )}

                        <div className="mt-6 grid gap-5 md:grid-cols-2">
                          {colecaoCpf.map((ingresso) => (
                            <article
                              key={ingresso.id}
                              className={`overflow-hidden rounded-[2rem] bg-white shadow-md ring-1 ${
                                ingresso.especial
                                  ? "ring-yellow-300"
                                  : "ring-red-100"
                              }`}
                            >
                              <button
                                type="button"
                                onClick={() => setIngressoAmpliado(ingresso)}
                                className="relative h-96 w-full bg-[#fff7e8]"
                              >
                                <Image
                                  src={ingresso.imagem}
                                  alt={ingresso.titulo}
                                  fill
                                  sizes="(max-width: 768px) 100vw, 420px"
                                  className="object-contain p-2"
                                  unoptimized
                                />
                              </button>

                              <div className="p-5">
                                <p
                                  className={`inline-flex rounded-full px-4 py-2 text-xs font-black uppercase tracking-wide ${
                                    ingresso.especial
                                      ? "bg-yellow-400 text-gray-950"
                                      : "bg-red-600 text-white"
                                  }`}
                                >
                                  {ingresso.tag}
                                </p>

                                <h3 className="mt-3 text-2xl font-black text-gray-950">
                                  {ingresso.titulo}
                                </h3>

                                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                                  {ingresso.descricao}
                                </p>

                                {ingresso.especial &&
                                  ingresso.nomeEternizado && (
                                    <p className="mt-3 rounded-2xl bg-yellow-50 p-3 text-sm font-black text-yellow-800">
                                      Nome eternizado:{" "}
                                      {ingresso.nomeEternizado}
                                    </p>
                                  )}

                                <div className="mt-4 flex items-center justify-between rounded-2xl bg-gray-50 p-4">
                                  <span className="text-sm font-bold text-gray-600">
                                    Quantidade
                                  </span>

                                  <strong className="text-xl text-gray-950">
                                    {ingresso.quantidade}
                                  </strong>
                                </div>
                              </div>
                            </article>
                          ))}
                        </div>

                        <button
                          type="button"
                          onClick={imprimirColecao}
                          className="mt-6 w-full rounded-full bg-gray-950 px-6 py-4 text-sm font-black uppercase tracking-wide text-white shadow-lg transition hover:bg-gray-800 print:hidden"
                        >
                          Imprimir minha coleção
                        </button>
                      </>
                    )}
                  </>
                ) : (
                  <div className="flex min-h-[420px] items-center justify-center rounded-[2rem] bg-white p-8 text-center shadow-sm">
                    <div>
                      <p className="text-5xl">🎟️</p>

                      <h3 className="mt-4 text-2xl font-black text-gray-950">
                        Sua pasta aparecerá aqui
                      </h3>

                      <p className="mt-2 max-w-md text-sm leading-relaxed text-gray-600">
                        Informe o CPF usado na compra para visualizar os
                        ingressos colecionáveis, personalizar o Eternizados e
                        imprimir sua coleção.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 pb-10 print:hidden">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-5 md:grid-cols-4">
              <div className="rounded-[2rem] bg-white p-6 shadow-xl ring-1 ring-red-100">
                <p className="text-4xl">🗂️</p>
                <h3 className="mt-4 text-xl font-black">Pasta por CPF</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  Cada comprador acessa seus ingressos usando o CPF informado na
                  compra.
                </p>
              </div>

              <div className="rounded-[2rem] bg-white p-6 shadow-xl ring-1 ring-yellow-200">
                <p className="text-4xl">⭐</p>
                <h3 className="mt-4 text-xl font-black">Nome Eternizado</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  Quem desbloquear o ingresso especial poderá salvar o nome na
                  pasta.
                </p>
              </div>

              <div className="rounded-[2rem] bg-white p-6 shadow-xl ring-1 ring-green-100">
                <p className="text-4xl">🖨️</p>
                <h3 className="mt-4 text-xl font-black">Impressão</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  O colecionador poderá imprimir sua coleção ou salvar em PDF.
                </p>
              </div>

              <div className="rounded-[2rem] bg-white p-6 shadow-xl ring-1 ring-blue-100">
                <p className="text-4xl">🏆</p>
                <h3 className="mt-4 text-xl font-black">Ranking</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  A coleção poderá se conectar ao Ranking do Bem futuramente.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="colecao" className="scroll-mt-28 px-4 pb-12 print:hidden">
          <div className="mx-auto max-w-7xl rounded-[2.5rem] bg-white p-6 shadow-xl md:p-10">
            <div className="text-center">
              <p className="inline-flex rounded-full bg-red-600 px-5 py-2 text-xs font-black uppercase tracking-wide text-white">
                Coleção Especial {ANO_COLECAO}
              </p>

              <h2 className="mt-4 text-3xl font-black leading-tight md:text-5xl">
                Os ingressos oficiais da campanha
              </h2>

              <p className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-gray-700">
                Conheça os modelos da coleção e acompanhe sua jornada como
                colecionador da Hot Dogueres Solidária.
              </p>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {ingressosColecao.map((ingresso) => (
                <article
                  key={ingresso.id}
                  className={`group overflow-hidden rounded-[2rem] bg-white shadow-xl ring-1 transition hover:-translate-y-2 hover:shadow-2xl ${
                    ingresso.especial
                      ? "ring-yellow-300"
                      : "ring-red-100 hover:ring-red-300"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setIngressoAmpliado(ingresso)}
                    className="relative h-[520px] w-full bg-[#fff7e8]"
                  >
                    <Image
                      src={ingresso.imagem}
                      alt={ingresso.titulo}
                      fill
                      sizes="(max-width: 768px) 100vw, 420px"
                      className="object-contain p-2 transition duration-500 group-hover:scale-105"
                      unoptimized
                    />

                    <span className="absolute bottom-4 right-4 rounded-full bg-gray-950 px-5 py-3 text-xs font-black uppercase tracking-wide text-white shadow-lg">
                      Ver maior
                    </span>
                  </button>

                  <div className="p-5">
                    <p
                      className={`inline-flex rounded-full px-4 py-2 text-xs font-black uppercase tracking-wide ${
                        ingresso.especial
                          ? "bg-yellow-400 text-gray-950"
                          : "bg-red-600 text-white"
                      }`}
                    >
                      {ingresso.tag}
                    </p>

                    <h3 className="mt-3 text-2xl font-black">
                      {ingresso.titulo}
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-gray-600">
                      {ingresso.descricao}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="ranking" className="px-4 pb-12 print:hidden">
          <div className="mx-auto max-w-7xl rounded-[2.5rem] bg-gray-950 p-6 text-white shadow-xl md:p-10">
            <div className="text-center">
              <p className="inline-flex rounded-full bg-yellow-400 px-5 py-2 text-xs font-black uppercase tracking-wide text-gray-950">
                Ranking dos colecionadores
              </p>

              <h2 className="mt-4 text-3xl font-black md:text-5xl">
                Top Colecionadores da Solidariedade
              </h2>

              <p className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-gray-300">
                Em breve, os colecionadores poderão aparecer no ranking conforme
                suas compras aprovadas e participação nas campanhas.
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-3xl bg-white p-5 text-gray-950">
                <p className="text-3xl font-black text-red-600">1º</p>
                <p className="mt-2 font-black">Em breve</p>
                <p className="mt-1 text-sm text-gray-500">
                  Lenda da Coleção
                </p>
              </div>

              <div className="rounded-3xl bg-white p-5 text-gray-950">
                <p className="text-3xl font-black text-yellow-700">2º</p>
                <p className="mt-2 font-black">Em breve</p>
                <p className="mt-1 text-sm text-gray-500">Diamante</p>
              </div>

              <div className="rounded-3xl bg-white p-5 text-gray-950">
                <p className="text-3xl font-black text-green-700">3º</p>
                <p className="mt-2 font-black">Em breve</p>
                <p className="mt-1 text-sm text-gray-500">Guardião</p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 pb-16 print:hidden">
          <div className="mx-auto max-w-7xl rounded-[2.5rem] bg-white p-8 text-center shadow-xl ring-1 ring-red-100">
            <h2 className="text-3xl font-black md:text-5xl">
              Já faz parte da coleção?
            </h2>

            <p className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-gray-700">
              Acesse sua pasta pelo CPF, confira seus ingressos, personalize seu
              Eternizados e guarde sua história.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="#minha-pasta"
                className="rounded-full bg-red-600 px-7 py-4 text-sm font-black uppercase tracking-wide text-white shadow-lg transition hover:bg-red-700"
              >
                Abrir minha pasta
              </a>

              <Link
                href="/#ingressos"
                className="rounded-full border border-red-200 bg-white px-7 py-4 text-sm font-black uppercase tracking-wide text-red-600 shadow-sm transition hover:bg-red-50"
              >
                Comprar ingressos
              </Link>
            </div>
          </div>
        </section>

        <footer className="border-t border-red-100 bg-white px-4 py-8 print:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 text-center md:flex-row md:items-center md:justify-between md:text-left">
            <div>
              <p className="font-black text-gray-950">
                Hot Dogueres Solidária
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Transformando solidariedade em história.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 text-sm font-bold text-gray-600 md:justify-end">
              <Link href="/">Página inicial</Link>
              <Link href="/loja-solidaria">Loja Solidária</Link>
              <Link href="/ranking-do-bem">Ranking do Bem</Link>
            </div>
          </div>
        </footer>

        {ingressoAmpliado && (
          
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-3 backdrop-blur-sm print:hidden"
            onClick={() => setIngressoAmpliado(null)}
          >
            <div
              className="relative max-h-[95vh] w-full max-w-6xl overflow-hidden rounded-[2rem] bg-white shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4 border-b border-gray-100 p-5">
                <div>
                  <p
                    className={`text-sm font-black uppercase tracking-wide ${
                      ingressoAmpliado.especial
                        ? "text-yellow-700"
                        : "text-red-600"
                    }`}
                  >
                    {ingressoAmpliado.tag}
                  </p>

                  <h2 className="mt-1 text-2xl font-black md:text-4xl">
                    {ingressoAmpliado.titulo}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => setIngressoAmpliado(null)}
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-600 text-2xl font-black text-white transition hover:bg-red-700"
                  aria-label="Fechar ingresso ampliado"
                >
                  ×
                </button>
              </div>

              <div className="relative h-[78vh] bg-[#fff7e8]">
                <Image
                  src={ingressoAmpliado.imagem}
                  alt={ingressoAmpliado.titulo}
                  fill
                  sizes="100vw"
                  className="object-contain p-3"
                  unoptimized
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
