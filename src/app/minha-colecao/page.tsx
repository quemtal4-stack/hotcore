"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import SetasNavegacao from "@/components/SetasNavegacao";

type PedidoColecao = {
  id: string;
  externalReference?: string;
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  produto: string;
  tipo: string;
  quantidadeTotal: number;
  ingressos: number;
  sextoIngresso: boolean;
  kgAlimentos: number;
  valor: number;
  nomeIngressoEternizado?: string;
  status: "pendente" | "aprovado" | "cancelado";
  criadoEm: string;
};

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

function formatarMoeda(valor: number) {
  const valorSeguro = Number.isFinite(valor) ? valor : 0;

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valorSeguro);
}

function carregarPedidosLocal() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const dados = localStorage.getItem("hotdogueres_colecao_pedidos");

    if (!dados) {
      return [];
    }

    return JSON.parse(dados) as PedidoColecao[];
  } catch {
    return [];
  }
}

export default function MinhaColecaoPage() {
  const [cpfBusca, setCpfBusca] = useState("");
  const [buscou, setBuscou] = useState(false);
  const [pedidos, setPedidos] = useState<PedidoColecao[]>([]);

  const cpfLimpo = limparNumero(cpfBusca);

  const pedidosFiltrados = useMemo(() => {
    return pedidos.filter((pedido) => limparNumero(pedido.cpf) === cpfLimpo);
  }, [pedidos, cpfLimpo]);

  const totalIngressos = pedidosFiltrados.reduce(
    (total, pedido) => total + Number(pedido.quantidadeTotal || 0),
    0
  );

  const totalAprovados = pedidosFiltrados.filter(
    (pedido) => pedido.status === "aprovado"
  ).length;

  const totalPendentes = pedidosFiltrados.filter(
    (pedido) => pedido.status === "pendente"
  ).length;

  const temEternizado = pedidosFiltrados.some(
    (pedido) => pedido.sextoIngresso || pedido.nomeIngressoEternizado
  );

  function buscarColecao() {
    setPedidos(carregarPedidosLocal());
    setBuscou(true);
  }

  function imprimirColecao() {
    window.print();
  }

  return (
    <>
      <SetasNavegacao
        anterior="/area-do-colecionador"
        proxima="/clube-de-membros"
        labelAnterior="Voltar para Área do Colecionador"
        labelProxima="Ir para Clube de Membros"
      />

      <main className="min-h-screen bg-[#FFF8E7] text-[#000000]">
        <section className="relative overflow-hidden px-6 py-12 md:px-10 lg:px-16 print:bg-white">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#FFF1B8_0%,#FFE27A_32%,#FFB347_58%,#E11D2E_100%)] print:hidden" />
          <div className="absolute left-[-120px] top-[-120px] h-96 w-96 rounded-full bg-white/40 blur-3xl print:hidden" />
          <div className="absolute bottom-[-160px] right-[-120px] h-[460px] w-[460px] rounded-full bg-black/30 blur-3xl print:hidden" />

          <div className="relative mx-auto max-w-7xl">
            <Link
              href="/area-do-colecionador"
              className="inline-flex items-center rounded-full border border-[#E11D2E]/20 bg-[#FFF1B8] px-4 py-2 text-sm font-black text-[#000000] shadow-lg transition hover:bg-[#FFE99A] print:hidden"
            >
              ← Voltar para Área do Colecionador
            </Link>

            <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-center">
              <div>
                <p className="inline-flex rounded-full bg-black px-4 py-2 text-sm font-black uppercase tracking-[0.25em] text-[#FFE99A] shadow-xl">
                  Minha Pasta Digital
                </p>

                <h1 className="mt-6 text-4xl font-black leading-tight text-black drop-shadow-[0_4px_0_rgba(255,255,255,0.45)] md:text-6xl">
                  Minha Coleção Hot Dogueres
                </h1>

                <p className="mt-6 max-w-3xl text-lg font-bold leading-relaxed text-black/80 md:text-xl">
                  Digite o CPF usado na compra para consultar sua pasta de
                  ingressos colecionáveis, ver o ingresso eternizado e imprimir
                  seus registros.
                </p>
              </div>

              <div className="rounded-[2rem] border border-white/45 bg-black/60 p-6 text-white shadow-2xl backdrop-blur-md print:hidden">
                <div className="rounded-[1.5rem] bg-[#FFF1B8] p-6 text-black shadow-xl">
                  <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white text-5xl shadow-xl">
                    📁
                  </div>

                  <h2 className="mt-5 text-center text-2xl font-black">
                    Cofre do Colecionador
                  </h2>

                  <p className="mt-3 text-center text-sm font-bold leading-relaxed text-black/70">
                    Sua coleção é consultada pelo CPF informado no cadastro da
                    compra.
                  </p>

                  <div className="mt-6">
                    <label className="text-xs font-black uppercase tracking-wide text-black/70">
                      Digite seu CPF
                    </label>

                    <input
                      type="text"
                      value={cpfBusca}
                      onChange={(event) =>
                        setCpfBusca(formatarCpf(event.target.value))
                      }
                      placeholder="000.000.000-00"
                      className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-5 py-4 text-lg font-black text-black outline-none focus:border-[#E11D2E]"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={buscarColecao}
                    className="mt-5 w-full rounded-full bg-[#E11D2E] px-6 py-4 text-sm font-black uppercase tracking-wide text-white shadow-lg transition hover:scale-105 hover:bg-[#B11226]"
                  >
                    Buscar minha coleção
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="colecao" className="px-6 py-16 md:px-10 lg:px-16 print:px-0 print:py-6">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 text-center print:text-left">
              <p className="text-sm font-black uppercase tracking-[0.25em] text-[#E11D2E]">
                Painel
              </p>

              <h2 className="mt-3 text-3xl font-black md:text-5xl">
                Resumo da coleção
              </h2>

              <p className="mx-auto mt-5 max-w-3xl text-lg font-bold leading-relaxed text-black/70 print:mx-0">
                {buscou
                  ? pedidosFiltrados.length > 0
                    ? "Encontramos registros vinculados ao CPF informado."
                    : "Nenhum ingresso foi encontrado para este CPF neste navegador."
                  : "Faça a busca pelo CPF para carregar seus ingressos."}
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <article className="rounded-[1.5rem] border border-[#E11D2E]/20 bg-[#FFF1B8] p-6 text-center shadow-xl">
                <p className="text-sm font-black uppercase tracking-wide text-[#E11D2E]">
                  Ingressos na pasta
                </p>
                <p className="mt-4 text-5xl font-black">{totalIngressos}</p>
              </article>

              <article className="rounded-[1.5rem] border border-[#E11D2E]/20 bg-[#FFF1B8] p-6 text-center shadow-xl">
                <p className="text-sm font-black uppercase tracking-wide text-[#E11D2E]">
                  Pedidos aprovados
                </p>
                <p className="mt-4 text-5xl font-black">{totalAprovados}</p>
              </article>

              <article className="rounded-[1.5rem] border border-[#E11D2E]/20 bg-[#FFF1B8] p-6 text-center shadow-xl">
                <p className="text-sm font-black uppercase tracking-wide text-[#E11D2E]">
                  Pedidos pendentes
                </p>
                <p className="mt-4 text-5xl font-black">{totalPendentes}</p>
              </article>

              <article className="rounded-[1.5rem] border border-[#E11D2E]/20 bg-[#FFF1B8] p-6 text-center shadow-xl">
                <p className="text-sm font-black uppercase tracking-wide text-[#E11D2E]">
                  Eternizado
                </p>
                <p className="mt-4 text-5xl font-black">
                  {temEternizado ? "Sim" : "Não"}
                </p>
              </article>
            </div>

            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row print:hidden">
              <button
                type="button"
                onClick={imprimirColecao}
                className="rounded-full bg-black px-8 py-4 text-sm font-black uppercase tracking-wide text-[#FFE99A] shadow-xl transition hover:scale-105"
              >
                Imprimir minha coleção
              </button>

              <Link
                href="/area-do-colecionador"
                className="rounded-full bg-[#E11D2E] px-8 py-4 text-center text-sm font-black uppercase tracking-wide text-white shadow-xl transition hover:scale-105 hover:bg-[#B11226]"
              >
                Ver coleção 2028
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-[#FFF1B8] px-6 py-16 md:px-10 lg:px-16 print:bg-white print:px-0 print:py-6">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 text-center print:text-left">
              <p className="text-sm font-black uppercase tracking-[0.25em] text-[#E11D2E]">
                Meus ingressos
              </p>

              <h2 className="mt-3 text-3xl font-black md:text-5xl">
                Ingressos encontrados
              </h2>
            </div>

            {!buscou && (
              <div className="rounded-[2rem] bg-white p-8 text-center shadow-xl">
                <div className="text-6xl">🔎</div>
                <h3 className="mt-5 text-2xl font-black">
                  Busque sua coleção pelo CPF
                </h3>
                <p className="mt-3 font-bold text-black/70">
                  Os ingressos aparecerão aqui após a consulta.
                </p>
              </div>
            )}

            {buscou && pedidosFiltrados.length === 0 && (
              <div className="rounded-[2rem] bg-white p-8 text-center shadow-xl">
                <div className="text-6xl">📭</div>
                <h3 className="mt-5 text-2xl font-black">
                  Nenhum ingresso encontrado
                </h3>
                <p className="mx-auto mt-3 max-w-2xl font-bold text-black/70">
                  Se você acabou de comprar, aguarde a confirmação do pagamento.
                  Quando a integração com banco de dados estiver completa, esta
                  área mostrará automaticamente os ingressos aprovados.
                </p>
              </div>
            )}

            {pedidosFiltrados.length > 0 && (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {pedidosFiltrados.map((pedido) => (
                  <article
                    key={pedido.id}
                    className="relative overflow-hidden rounded-[2rem] border border-[#E11D2E]/20 bg-[#FFF8E7] p-6 shadow-xl"
                  >
                    <div className="absolute left-[-40px] top-[-40px] h-28 w-28 rounded-full bg-white/70 blur-2xl" />
                    <div className="absolute bottom-[-50px] right-[-50px] h-36 w-36 rounded-full bg-[#E11D2E]/20 blur-2xl" />

                    <div className="relative z-10">
                      <span
                        className={`inline-flex rounded-full px-4 py-2 text-xs font-black uppercase tracking-wide ${
                          pedido.status === "aprovado"
                            ? "bg-green-600 text-white"
                            : "bg-yellow-400 text-black"
                        }`}
                      >
                        {pedido.status === "aprovado"
                          ? "Aprovado"
                          : "Aguardando pagamento"}
                      </span>

                      <div className="mt-6 rounded-[1.5rem] border border-black/10 bg-white p-6 text-center shadow-inner">
                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#FFF1B8] text-5xl shadow-lg">
                          🎟️
                        </div>

                        <h3 className="mt-5 text-2xl font-black">
                          {pedido.produto}
                        </h3>

                        <p className="mt-2 text-sm font-bold text-black/60">
                          CPF: {pedido.cpf}
                        </p>

                        {pedido.nomeIngressoEternizado && (
                          <div className="mt-4 rounded-2xl bg-[#FFF1B8] p-4">
                            <p className="text-xs font-black uppercase tracking-wide text-[#E11D2E]">
                              Nome eternizado
                            </p>
                            <p className="mt-1 text-lg font-black">
                              {pedido.nomeIngressoEternizado}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="mt-5 space-y-3 text-sm font-bold text-black/75">
                        <div className="flex justify-between gap-4">
                          <span>Quantidade total</span>
                          <strong>{pedido.quantidadeTotal}</strong>
                        </div>

                        <div className="flex justify-between gap-4">
                          <span>Ingressos normais</span>
                          <strong>{pedido.ingressos}</strong>
                        </div>

                        <div className="flex justify-between gap-4">
                          <span>Ingresso especial</span>
                          <strong>{pedido.sextoIngresso ? "Sim" : "Não"}</strong>
                        </div>

                        <div className="flex justify-between gap-4">
                          <span>Doação abatida</span>
                          <strong>{pedido.kgAlimentos} kg</strong>
                        </div>

                        <div className="flex justify-between gap-4 border-t border-black/10 pt-3 text-base">
                          <span>Total</span>
                          <strong className="text-[#E11D2E]">
                            {formatarMoeda(pedido.valor)}
                          </strong>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={imprimirColecao}
                        className="mt-6 w-full rounded-full bg-black px-6 py-3 text-sm font-black uppercase tracking-wide text-[#FFE99A] transition hover:scale-105 print:hidden"
                      >
                        Imprimir ingresso
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="px-6 py-16 md:px-10 lg:px-16 print:hidden">
          <div className="mx-auto max-w-6xl rounded-[2rem] bg-black p-8 text-center text-white shadow-2xl md:p-12">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#FFE99A]">
              Importante
            </p>

            <h2 className="mt-4 text-3xl font-black md:text-5xl">
              Esta é a primeira versão da pasta por CPF
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-white/75">
              Nesta etapa, a coleção pode ser salva localmente no navegador após
              o checkout. A versão definitiva deve usar banco de dados e webhook
              do Mercado Pago para liberar apenas ingressos com pagamento
              aprovado.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/area-do-colecionador"
                className="rounded-full bg-[#FFE99A] px-7 py-3 text-sm font-black uppercase tracking-wide text-black transition hover:scale-105"
              >
                Ver Área do Colecionador
              </Link>

              <Link
                href="/clube-de-membros"
                className="rounded-full border border-white/25 bg-white/10 px-7 py-3 text-sm font-black uppercase tracking-wide text-white transition hover:scale-105 hover:bg-white/20"
              >
                Entrar para o Clube
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
