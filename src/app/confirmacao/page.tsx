"use client";

import { useEffect, useMemo, useState } from "react";

type DadosCadastro = {
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  ingressos: number;
  sextoIngresso: boolean;
  quantidadeTotal: number;
  kgAlimentos: number;
  total: number;
  tipo: string;
  nomeProduto: string;
};

function formatarMoeda(valor: number) {
  const valorSeguro = Number.isFinite(valor) ? valor : 0;

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valorSeguro);
}

function gerarCodigoIngresso() {
  return `HDG-${Date.now().toString().slice(-8)}`;
}

export default function ConfirmacaoPage() {
  const [dados, setDados] = useState<DadosCadastro | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [codigoIngresso, setCodigoIngresso] = useState("");

  useEffect(() => {
    const cadastroSalvo = sessionStorage.getItem("hotdogueres_cadastro");

    if (cadastroSalvo) {
      const dadosCadastro = JSON.parse(cadastroSalvo) as DadosCadastro;
      setDados(dadosCadastro);
    }

    const codigoSalvo = sessionStorage.getItem("hotdogueres_codigo_ingresso");

    if (codigoSalvo) {
      setCodigoIngresso(codigoSalvo);
    } else {
      const novoCodigo = gerarCodigoIngresso();
      sessionStorage.setItem("hotdogueres_codigo_ingresso", novoCodigo);
      setCodigoIngresso(novoCodigo);
    }

    setCarregando(false);
  }, []);

  const statusPagamento = useMemo(() => {
    if (typeof window === "undefined") return "aprovado";

    const params = new URLSearchParams(window.location.search);

    const status =
      params.get("status") ||
      params.get("collection_status") ||
      params.get("payment_status");

    if (!status) return "aprovado";

    if (status === "approved" || status === "aprovado") {
      return "aprovado";
    }

    if (status === "pending" || status === "pendente") {
      return "pendente";
    }

    if (status === "rejected" || status === "recusado") {
      return "recusado";
    }

    return status;
  }, []);

  function voltarParaInicio() {
    window.location.href = "/";
  }

  function voltarParaCheckout() {
    window.location.href = "/checkout/ingressos";
  }

  function imprimirIngresso() {
    window.print();
  }

  if (carregando) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fff7d6] px-4">
        <div className="rounded-3xl bg-white p-8 text-center shadow-xl">
          <p className="text-lg font-black text-gray-900">
            Carregando confirmação...
          </p>
        </div>
      </main>
    );
  }

  if (!dados) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-[#fff7d6] to-white px-4 py-10">
        <section className="mx-auto max-w-2xl rounded-3xl bg-white p-8 text-center shadow-xl">
          <h1 className="text-3xl font-black text-red-600">
            Ingresso não encontrado
          </h1>

          <p className="mt-4 text-gray-700">
            Não encontramos os dados do cadastro nesta sessão. Volte para a
            página inicial e refaça o processo de compra.
          </p>

          <button
            type="button"
            onClick={voltarParaInicio}
            className="mt-6 rounded-full bg-red-600 px-6 py-4 font-black text-white shadow-lg hover:bg-red-700"
          >
            Voltar para início
          </button>
        </section>
      </main>
    );
  }

  if (statusPagamento !== "aprovado") {
    return (
      <main className="min-h-screen bg-gradient-to-br from-[#fff7d6] to-white px-4 py-10">
        <section className="mx-auto max-w-2xl rounded-3xl bg-white p-8 text-center shadow-xl">
          <h1 className="text-3xl font-black text-yellow-700">
            Pagamento ainda não aprovado
          </h1>

          <p className="mt-4 text-gray-700">
            Seu cadastro foi encontrado, mas o pagamento ainda não consta como
            aprovado.
          </p>

          <div className="mt-6 rounded-2xl bg-yellow-50 p-4 text-sm font-bold text-yellow-800">
            Status atual: {statusPagamento}
          </div>

          <button
            type="button"
            onClick={voltarParaCheckout}
            className="mt-6 rounded-full bg-red-600 px-6 py-4 font-black text-white shadow-lg hover:bg-red-700"
          >
            Voltar para pagamento
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#fff7d6] to-white px-4 py-10 text-gray-950">
      <header className="mx-auto mb-8 max-w-4xl text-center">
        <h1 className="text-4xl font-black text-red-600">Hot Dogueres</h1>
        <p className="mt-2 text-gray-700">Confirmação do ingresso</p>
      </header>

      <section className="mx-auto max-w-3xl rounded-[2rem] bg-white p-8 text-center shadow-xl">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-600 text-5xl font-black text-white">
          ✓
        </div>

        <h2 className="mt-6 text-3xl font-black text-green-600">
          Pagamento aprovado!
        </h2>

        <p className="mt-3 text-gray-600">
          Seu ingresso foi confirmado com sucesso. Guarde esta página ou imprima
          o comprovante.
        </p>

        <div
          id="areaIngresso"
          className="mt-8 rounded-3xl border-2 border-dashed border-red-600 bg-[#fffdf4] p-6 text-left"
        >
          <div className="mb-6 text-center">
            <strong className="block text-2xl font-black text-red-600">
              Festival Cultural Hot Dogueres
            </strong>
            <span className="text-sm text-gray-600">
              Ingresso digital oficial
            </span>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between gap-4 border-b border-gray-200 pb-3">
              <span className="text-gray-600">Nome</span>
              <strong className="text-right">{dados.nome}</strong>
            </div>

            <div className="flex justify-between gap-4 border-b border-gray-200 pb-3">
              <span className="text-gray-600">E-mail</span>
              <strong className="text-right">{dados.email}</strong>
            </div>

            <div className="flex justify-between gap-4 border-b border-gray-200 pb-3">
              <span className="text-gray-600">Telefone / WhatsApp</span>
              <strong className="text-right">{dados.telefone}</strong>
            </div>

            <div className="flex justify-between gap-4 border-b border-gray-200 pb-3">
              <span className="text-gray-600">Produto</span>
              <strong className="text-right">{dados.nomeProduto}</strong>
            </div>

            <div className="flex justify-between gap-4 border-b border-gray-200 pb-3">
              <span className="text-gray-600">Quantidade total</span>
              <strong className="text-right">{dados.quantidadeTotal}</strong>
            </div>

            {dados.tipo !== "hot-dog-day" && (
              <div className="flex justify-between gap-4 border-b border-gray-200 pb-3">
                <span className="text-gray-600">Doação abatida</span>
                <strong className="text-right">{dados.kgAlimentos} kg</strong>
              </div>
            )}

            <div className="flex justify-between gap-4 border-b border-gray-200 pb-3">
              <span className="text-gray-600">Valor pago</span>
              <strong className="text-right">{formatarMoeda(dados.total)}</strong>
            </div>

            <div className="flex justify-between gap-4 border-b border-gray-200 pb-3">
              <span className="text-gray-600">Status</span>
              <strong className="text-right text-green-600">Aprovado</strong>
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-gray-950 p-4 text-center text-xl font-black tracking-wider text-white">
            {codigoIngresso}
          </div>

          <div className="mx-auto mt-6 flex h-40 w-40 items-center justify-center rounded-xl border-4 border-white bg-gray-100 outline outline-2 outline-gray-300">
            <span className="text-center text-xs font-black text-gray-500">
              QR CODE
              <br />
              EM BREVE
            </span>
          </div>
        </div>

        <div className="mt-6 rounded-2xl bg-green-50 p-4 text-sm font-bold text-green-700">
          Apresente este ingresso na entrada do evento. Futuramente, este QR
          Code será validado automaticamente.
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row print:hidden">
          <button
            type="button"
            onClick={imprimirIngresso}
            className="flex-1 rounded-2xl bg-red-600 px-6 py-4 font-black text-white shadow-lg hover:bg-red-700"
          >
            Imprimir ingresso
          </button>

          <button
            type="button"
            onClick={voltarParaInicio}
            className="flex-1 rounded-2xl bg-yellow-400 px-6 py-4 font-black text-gray-950 shadow-lg hover:bg-yellow-500"
          >
            Voltar para início
          </button>
        </div>
      </section>

      <footer className="mt-8 text-center text-sm text-gray-600 print:hidden">
        © 2026 Hot Dogueres. Todos os direitos reservados.
      </footer>
    </main>
  );
}
