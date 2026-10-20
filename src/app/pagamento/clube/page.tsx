"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type DadosClube = {
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  plano?: string;
  nomeProduto?: string;
  total: number;
  tipo?: string;
};

function formatarMoeda(valor: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
}

function mascararCPF(cpf: string) {
  const apenasNumeros = cpf.replace(/\D/g, "");

  if (apenasNumeros.length !== 11) {
    return cpf;
  }

  return `${apenasNumeros.slice(0, 3)}.${apenasNumeros.slice(
    3,
    6,
  )}.${apenasNumeros.slice(6, 9)}-${apenasNumeros.slice(9)}`;
}

function mascararTelefone(telefone: string) {
  const apenasNumeros = telefone.replace(/\D/g, "");

  if (apenasNumeros.length === 11) {
    return `(${apenasNumeros.slice(0, 2)}) ${apenasNumeros.slice(
      2,
      7,
    )}-${apenasNumeros.slice(7)}`;
  }

  if (apenasNumeros.length === 10) {
    return `(${apenasNumeros.slice(0, 2)}) ${apenasNumeros.slice(
      2,
      6,
    )}-${apenasNumeros.slice(6)}`;
  }

  return telefone;
}

export default function PagamentoClubePage() {
  const [dadosClube, setDadosClube] = useState<DadosClube | null>(null);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [carregandoDados, setCarregandoDados] = useState(true);

  useEffect(() => {
    try {
      const dadosSalvos = sessionStorage.getItem("hotdogueres_clube_cadastro");

      if (!dadosSalvos) {
        setErro(
          "Dados do cadastro do clube não encontrados. Volte e preencha o cadastro.",
        );
        setCarregandoDados(false);
        return;
      }

      const dados = JSON.parse(dadosSalvos) as DadosClube;

      if (
        !dados.nome ||
        !dados.email ||
        !dados.telefone ||
        !dados.cpf ||
        !Number.isFinite(Number(dados.total))
      ) {
        setErro(
          "Os dados do cadastro estão incompletos. Volte e preencha novamente.",
        );
        setCarregandoDados(false);
        return;
      }

      setDadosClube({
        ...dados,
        total: Number(dados.total),
      });
    } catch (error) {
      console.error("Erro ao carregar dados do clube:", error);
      setErro("Erro ao carregar os dados do cadastro do clube.");
    } finally {
      setCarregandoDados(false);
    }
  }, []);

  const nomeProduto = useMemo(() => {
    if (!dadosClube) {
      return "Clube de Membros Hot Dogueres";
    }

    return (
      dadosClube.nomeProduto ||
      dadosClube.plano ||
      "Clube de Membros Hot Dogueres"
    );
  }, [dadosClube]);

  function voltarParaCadastroClube() {
    window.location.href = "/clube-de-membros";
  }

  async function finalizarPagamentoClube() {
    if (!dadosClube) {
      setErro("Dados do cadastro do clube não encontrados.");
      return;
    }

    if (dadosClube.total <= 0) {
      setErro("O valor da assinatura está inválido.");
      return;
    }

    try {
      setErro("");
      setCarregando(true);

      const resposta = await fetch("/api/mercado-pago/preference", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: `Hot Dogueres - ${nomeProduto}`,
          price: dadosClube.total,
          quantidade: 1,
          nomeComprador: dadosClube.nome,
          emailComprador: dadosClube.email,
          telefoneComprador: dadosClube.telefone,
          cpfComprador: dadosClube.cpf,
          tipo: "clube-membros",
          nomeProduto,
        }),
      });

      const dados = await resposta.json();

      console.log("RESPOSTA DO CHECKOUT CLUBE:", dados);

      if (!resposta.ok) {
        setErro(dados.error || "Erro ao criar pagamento no Mercado Pago.");
        setCarregando(false);
        return;
      }

      const checkoutUrl = dados.init_point || dados.sandbox_init_point;

      if (!checkoutUrl) {
        setErro("O link de pagamento não foi gerado.");
        setCarregando(false);
        return;
      }

      window.location.href = checkoutUrl;
    } catch (error) {
      console.error("Erro ao conectar com Mercado Pago:", error);
      setErro("Erro ao conectar com o Mercado Pago.");
      setCarregando(false);
    }
  }

  if (carregandoDados) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FFF8E7] px-4 text-[#000000]">
        <section className="w-full max-w-md rounded-[2rem] border border-yellow-200 bg-white p-8 text-center shadow-2xl">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-yellow-100 text-4xl">
            🌭
          </div>

          <h1 className="mt-6 text-2xl font-black text-gray-950">
            Carregando pagamento
          </h1>

          <p className="mt-3 text-sm font-bold leading-relaxed text-gray-600">
            Estamos preparando os dados da sua assinatura do Clube de Membros
            Hot Dogueres.
          </p>

          <div className="mx-auto mt-6 h-3 w-full overflow-hidden rounded-full bg-gray-100">
            <div className="h-full w-1/2 animate-pulse rounded-full bg-red-600" />
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#FFF8E7] text-[#000000]">
      <section className="relative px-4 py-10 md:px-8 md:py-14">
        <div className="absolute left-[-120px] top-[-120px] h-80 w-80 rounded-full bg-yellow-200/60 blur-3xl" />
        <div className="absolute bottom-[-140px] right-[-120px] h-96 w-96 rounded-full bg-red-500/15 blur-3xl" />
        <div className="absolute right-[12%] top-[12%] h-44 w-44 rounded-full bg-blue-300/30 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <button
              type="button"
              onClick={voltarParaCadastroClube}
              className="rounded-full border border-red-100 bg-white px-5 py-3 text-sm font-black text-gray-800 shadow-md transition hover:-translate-x-1 hover:bg-red-50"
            >
              ← Voltar para o cadastro
            </button>

            <Link
              href="/"
              className="rounded-full bg-gray-950 px-5 py-3 text-sm font-black text-white shadow-md transition hover:bg-gray-800"
            >
              Página inicial
            </Link>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-start">
            <section className="rounded-[2rem] border border-red-100 bg-white p-6 shadow-2xl md:p-10">
              <p className="inline-flex rounded-full bg-red-100 px-5 py-2 text-xs font-black uppercase tracking-[0.2em] text-red-600">
                Clube de Membros
              </p>

              <h1 className="mt-6 text-4xl font-black leading-tight text-gray-950 md:text-6xl">
                Finalizar assinatura
              </h1>

              <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-gray-700">
                Confira seus dados e finalize o pagamento com segurança pelo
                Mercado Pago. Depois da confirmação, sua participação no Clube
                de Membros Hot Dogueres poderá ser ativada.
              </p>

              {erro && (
                <div className="mt-8 rounded-[1.5rem] border border-red-200 bg-red-50 p-5 text-sm font-bold leading-relaxed text-red-700">
                  <p className="font-black">Atenção</p>
                  <p className="mt-1">{erro}</p>

                  <button
                    type="button"
                    onClick={voltarParaCadastroClube}
                    className="mt-4 rounded-full bg-red-600 px-5 py-3 text-xs font-black uppercase tracking-wide text-white transition hover:bg-red-700"
                  >
                    Voltar e preencher cadastro
                  </button>
                </div>
              )}

              {dadosClube && (
                <div className="mt-8 grid gap-5">
                  <div className="rounded-[1.8rem] border border-gray-100 bg-[#FFF8E7] p-6 shadow-md">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-red-600">
                          Dados do membro
                        </p>

                        <h2 className="mt-2 text-2xl font-black text-gray-950">
                          {dadosClube.nome}
                        </h2>
                      </div>

                      <span className="rounded-full bg-green-100 px-4 py-2 text-xs font-black uppercase tracking-wide text-green-700">
                        Cadastro localizado
                      </span>
                    </div>

                    <div className="mt-6 grid gap-4 md:grid-cols-2">
                      <div className="rounded-2xl bg-white p-4 shadow-sm">
                        <p className="text-xs font-black uppercase tracking-wide text-gray-500">
                          E-mail
                        </p>
                        <p className="mt-1 break-words text-sm font-bold text-gray-800">
                          {dadosClube.email}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-white p-4 shadow-sm">
                        <p className="text-xs font-black uppercase tracking-wide text-gray-500">
                          Telefone
                        </p>
                        <p className="mt-1 text-sm font-bold text-gray-800">
                          {mascararTelefone(dadosClube.telefone)}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-white p-4 shadow-sm md:col-span-2">
                        <p className="text-xs font-black uppercase tracking-wide text-gray-500">
                          CPF
                        </p>
                        <p className="mt-1 text-sm font-bold text-gray-800">
                          {mascararCPF(dadosClube.cpf)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[1.8rem] border border-yellow-200 bg-yellow-50 p-6 shadow-md">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-700">
                      Resumo da assinatura
                    </p>

                    <div className="mt-5 space-y-4">
                      <div className="flex items-start justify-between gap-5 rounded-2xl bg-white p-4 shadow-sm">
                        <span className="text-sm font-bold text-gray-600">
                          Produto
                        </span>

                        <strong className="text-right text-sm font-black text-gray-950">
                          {nomeProduto}
                        </strong>
                      </div>

                      <div className="flex items-center justify-between gap-5 rounded-2xl bg-white p-4 shadow-sm">
                        <span className="text-sm font-bold text-gray-600">
                          Quantidade
                        </span>

                        <strong className="text-sm font-black text-gray-950">
                          1
                        </strong>
                      </div>

                      <div className="flex items-center justify-between gap-5 rounded-2xl bg-gray-950 p-5 text-white shadow-md">
                        <span className="text-lg font-black">Total</span>

                        <strong className="text-2xl font-black text-yellow-300">
                          {formatarMoeda(dadosClube.total)}
                        </strong>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={finalizarPagamentoClube}
                    disabled={carregando}
                    className="rounded-full bg-red-600 px-6 py-4 text-lg font-black text-white shadow-xl transition hover:scale-[1.02] hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-red-300"
                  >
                    {carregando
                      ? "Gerando pagamento..."
                      : "Finalizar pagamento no Mercado Pago"}
                  </button>

                  <p className="text-center text-xs font-bold leading-relaxed text-gray-500">
                    Você será redirecionado para o ambiente seguro do Mercado
                    Pago para concluir a compra.
                  </p>
                </div>
              )}
            </section>

            <aside className="space-y-5">
              <div className="rounded-[2rem] bg-gray-950 p-6 text-white shadow-2xl md:p-8">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-yellow-300 text-4xl shadow-xl">
                  🏆
                </div>

                <h2 className="mt-6 text-3xl font-black">
                  Clube de Membros Hot Dogueres
                </h2>

                <p className="mt-4 text-sm font-medium leading-relaxed text-white/75">
                  Ao fazer parte do clube, você entra no ecossistema Hot
                  Dogueres e poderá acompanhar novidades, benefícios, campanhas,
                  colecionáveis e futuras recompensas.
                </p>

                <div className="mt-6 grid gap-3">
                  <div className="rounded-2xl bg-white/10 p-4">
                    <p className="text-sm font-black text-yellow-300">
                      Pagamento seguro
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-white/70">
                      Processado pelo Mercado Pago.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white/10 p-4">
                    <p className="text-sm font-black text-yellow-300">
                      Cadastro do membro
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-white/70">
                      Seus dados serão usados para identificar sua assinatura.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white/10 p-4">
                    <p className="text-sm font-black text-yellow-300">
                      Ativação
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-white/70">
                      Após a confirmação do pagamento, a assinatura poderá ser
                      validada no sistema.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[2rem] border border-green-200 bg-green-50 p-6 shadow-xl">
                <p className="text-sm font-black uppercase tracking-wide text-green-700">
                  Importante
                </p>

                <p className="mt-3 text-sm font-bold leading-relaxed text-green-900">
                  Se o pagamento for aprovado, guarde o comprovante. Ele poderá
                  ajudar na conferência da assinatura, caso seja necessário.
                </p>
              </div>

              <div className="rounded-[2rem] border border-red-100 bg-white p-6 shadow-xl">
                <p className="text-sm font-black uppercase tracking-wide text-red-600">
                  Precisa corrigir algo?
                </p>

                <p className="mt-3 text-sm font-bold leading-relaxed text-gray-700">
                  Se algum dado estiver errado, volte para o cadastro antes de
                  finalizar o pagamento.
                </p>

                <button
                  type="button"
                  onClick={voltarParaCadastroClube}
                  className="mt-5 w-full rounded-full bg-gray-950 px-5 py-3 text-sm font-black text-white transition hover:bg-gray-800"
                >
                  Corrigir cadastro
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
