"use client";

import { useEffect, useMemo, useState } from "react";

type DadosCadastro = {
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  ingressos: number;
  ingressosSelecionados?: string | null;
  sextoIngresso: boolean;
  quantidadeTotal: number;
  kgAlimentos: number;
  total: number;
  tipo: string;
  nomeProduto: string;
  nomeIngressoEternizado?: string;
  modoAdminTeste?: boolean;
};

function formatarMoeda(valor: number) {
  const valorSeguro = Number.isFinite(valor) ? valor : 0;

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valorSeguro);
}

function obterNumeroParametro(
  params: URLSearchParams,
  nome: string,
  padrao = 0,
) {
  const valor = Number(params.get(nome));

  if (!Number.isFinite(valor)) {
    return padrao;
  }

  return valor;
}

function parametroAtivo(params: URLSearchParams, nome: string) {
  const valor = params.get(nome)?.toLowerCase();

  return (
    valor === "sim" ||
    valor === "true" ||
    valor === "1" ||
    valor === "yes"
  );
}

function limparNumero(valor: string) {
  return valor.replace(/\D/g, "");
}

function validarEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function CheckoutIngressosPage() {
  const [dadosCadastro, setDadosCadastro] = useState<DadosCadastro | null>(null);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [processandoPagamento, setProcessandoPagamento] = useState(false);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const dadosSalvos = sessionStorage.getItem("hotdogueres_cadastro");

      const modoAdminTeste =
        parametroAtivo(params, "admin") || parametroAtivo(params, "teste");

      if (dadosSalvos) {
        const dados = JSON.parse(dadosSalvos) as DadosCadastro;

        const valorParametro = obterNumeroParametro(
          params,
          "valor",
          dados.total,
        );

        const quantidadeTotalParametro = obterNumeroParametro(
          params,
          "quantidadeTotal",
          dados.quantidadeTotal,
        );

        const kgAlimentosParametro = obterNumeroParametro(
          params,
          "kgAlimentos",
          dados.kgAlimentos,
        );

        setDadosCadastro({
          ...dados,
          total: valorParametro > 0 ? valorParametro : dados.total,
          quantidadeTotal:
            quantidadeTotalParametro > 0
              ? quantidadeTotalParametro
              : dados.quantidadeTotal,
          kgAlimentos:
            kgAlimentosParametro >= 0
              ? kgAlimentosParametro
              : dados.kgAlimentos,
          ingressosSelecionados:
            params.get("ingressosSelecionados") ||
            dados.ingressosSelecionados ||
            null,
          nomeIngressoEternizado:
            dados.nomeIngressoEternizado ||
            params.get("nomeIngressoEternizado") ||
            "",
          modoAdminTeste,
        });

        return;
      }

      const tipo = params.get("tipo") || "ingresso-solidario-colecionavel";

      const titulo =
        params.get("titulo") ||
        (tipo === "hot-dog-day"
          ? "Hot Dog Day"
          : "Ingresso Solidário Colecionável");

      const valor = obterNumeroParametro(params, "valor", 20);
      const ingressos = obterNumeroParametro(params, "ingressos", 1);
      const quantidadeTotal = obterNumeroParametro(
        params,
        "quantidadeTotal",
        ingressos,
      );
      const kgAlimentos = obterNumeroParametro(params, "kgAlimentos", 0);

      setDadosCadastro({
        nome: "",
        email: "",
        telefone: "",
        cpf: "",
        ingressos,
        ingressosSelecionados: params.get("ingressosSelecionados"),
        sextoIngresso: params.get("sextoIngresso") === "sim",
        quantidadeTotal,
        kgAlimentos,
        total: valor,
        tipo,
        nomeProduto: titulo,
        nomeIngressoEternizado: params.get("nomeIngressoEternizado") || "",
        modoAdminTeste,
      });
    } catch {
      setErro("Não foi possível carregar os dados do checkout.");
    } finally {
      setCarregando(false);
    }
  }, []);

  const ehHotDogDay = dadosCadastro?.tipo === "hot-dog-day";

  const resumoProduto = useMemo(() => {
    if (!dadosCadastro) {
      return "";
    }

    if (ehHotDogDay) {
      return "Ingresso Hot Dog Day";
    }

    return dadosCadastro.sextoIngresso
      ? "Ingresso Solidário Colecionável + 6º Especial"
      : "Ingresso Solidário Colecionável";
  }, [dadosCadastro, ehHotDogDay]);

  function voltarParaCadastro() {
    window.history.back();
  }

  function validarDadosAntesDoPagamento() {
    if (!dadosCadastro) {
      return "Dados do pedido não encontrados.";
    }

    if (!dadosCadastro.nome.trim()) {
      return "Nome do comprador não encontrado. Volte ao cadastro e preencha novamente.";
    }

    if (!validarEmail(dadosCadastro.email)) {
      return "E-mail do comprador inválido. Volte ao cadastro e corrija o e-mail.";
    }

    if (limparNumero(dadosCadastro.telefone).length < 10) {
      return "Telefone do comprador inválido. Volte ao cadastro e corrija o telefone.";
    }

    if (!ehHotDogDay && limparNumero(dadosCadastro.cpf).length !== 11) {
      return "CPF do comprador inválido. Volte ao cadastro e corrija o CPF.";
    }

    if (!dadosCadastro.quantidadeTotal || dadosCadastro.quantidadeTotal <= 0) {
      return "Quantidade inválida para gerar o pagamento.";
    }

    if (!dadosCadastro.total || dadosCadastro.total <= 0) {
      return "Valor inválido para gerar o pagamento.";
    }

    return "";
  }

  async function iniciarPagamento() {
    if (!dadosCadastro) {
      setErro("Dados do pedido não encontrados.");
      return;
    }

    const erroValidacao = validarDadosAntesDoPagamento();

    if (erroValidacao) {
      setErro(erroValidacao);
      return;
    }

    setErro("");
    setProcessandoPagamento(true);

    try {
      const resposta = await fetch("/api/checkout/ingressos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: dadosCadastro.nome,
          email: dadosCadastro.email,
          telefone: dadosCadastro.telefone,
          cpf: dadosCadastro.cpf,
          tipo: dadosCadastro.tipo,
          produto: dadosCadastro.nomeProduto,
          titulo: resumoProduto,
          quantidade: dadosCadastro.quantidadeTotal,
          ingressos: dadosCadastro.ingressos,
          ingressosSelecionados: dadosCadastro.ingressosSelecionados || "",
          sextoIngresso: dadosCadastro.sextoIngresso,
          kgAlimentos: dadosCadastro.kgAlimentos,
          valor: dadosCadastro.total,
          total: dadosCadastro.total,
          nomeIngressoEternizado: dadosCadastro.nomeIngressoEternizado || "",
          admin: dadosCadastro.modoAdminTeste ? "true" : "false",
          teste: dadosCadastro.modoAdminTeste ? "true" : "false",
        }),
      });

      const resultado = await resposta.json();

      if (!resposta.ok) {
        throw new Error(
          resultado?.erro ||
            resultado?.error ||
            "Não foi possível iniciar o pagamento.",
        );
      }

      const urlPagamento =
        resultado?.init_point ||
        resultado?.sandbox_init_point ||
        resultado?.url ||
        resultado?.checkoutUrl;

      if (!urlPagamento) {
        throw new Error("A API não retornou o link de pagamento.");
      }

      const pedidosAtuais = JSON.parse(
        localStorage.getItem("hotdogueres_colecao_pedidos") || "[]",
      );

      const novoPedido = {
        id: `pedido-${Date.now()}`,
        externalReference:
          resultado?.external_reference || resultado?.externalReference || "",
        nome: dadosCadastro.nome,
        email: dadosCadastro.email,
        telefone: dadosCadastro.telefone,
        cpf: dadosCadastro.cpf,
        produto: resumoProduto,
        tipo: dadosCadastro.tipo,
        quantidadeTotal: dadosCadastro.quantidadeTotal,
        ingressos: dadosCadastro.ingressos,
        ingressosSelecionados: dadosCadastro.ingressosSelecionados || "",
        sextoIngresso: dadosCadastro.sextoIngresso,
        kgAlimentos: dadosCadastro.kgAlimentos,
        valor: dadosCadastro.total,
        nomeIngressoEternizado: dadosCadastro.nomeIngressoEternizado || "",
        status: "pendente",
        criadoEm: new Date().toISOString(),
      };

      localStorage.setItem(
        "hotdogueres_colecao_pedidos",
        JSON.stringify([...pedidosAtuais, novoPedido]),
      );

      window.location.href = urlPagamento;
    } catch (error) {
      const mensagem =
        error instanceof Error
          ? error.message
          : "Erro inesperado ao iniciar pagamento.";

      setErro(mensagem);
      setProcessandoPagamento(false);
    }
  }

  if (carregando) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fff8e7] px-4">
        <div className="rounded-3xl bg-white p-8 text-center shadow-xl">
          <p className="text-lg font-black text-gray-900">
            Carregando checkout...
          </p>
        </div>
      </main>
    );
  }

  if (!dadosCadastro) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fff8e7] px-4">
        <div className="max-w-md rounded-3xl bg-white p-8 text-center shadow-xl">
          <h1 className="text-2xl font-black text-gray-900">
            Checkout não encontrado
          </h1>

          <p className="mt-3 text-gray-600">
            Não encontramos os dados do seu cadastro. Volte e preencha seus
            dados novamente.
          </p>

          <button
            type="button"
            onClick={() => {
              window.location.href = "/cadastro";
            }}
            className="mt-6 rounded-full bg-red-600 px-6 py-3 font-black text-white hover:bg-red-700"
          >
            Ir para cadastro
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fff8e7] px-4 py-8 text-gray-950">
      <section className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_0.75fr]">
        <div className="rounded-[2rem] bg-white p-8 shadow-xl">
          <button
            type="button"
            onClick={voltarParaCadastro}
            className="rounded-full bg-gray-100 px-4 py-2 text-sm font-black text-gray-700 hover:bg-gray-200"
          >
            Voltar
          </button>

          <p className="mt-6 inline-flex rounded-full bg-red-100 px-4 py-2 text-sm font-black uppercase tracking-wide text-red-600">
            Checkout Hot Dogueres
          </p>

          {dadosCadastro.modoAdminTeste && (
            <p className="mt-4 inline-flex rounded-full bg-yellow-100 px-4 py-2 text-sm font-black uppercase tracking-wide text-yellow-700">
              Modo teste admin ativo
            </p>
          )}

          <h1 className="mt-6 text-4xl font-black leading-tight text-gray-900 md:text-5xl">
            Confira seu pedido
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-gray-700">
            Revise os dados antes de seguir para o ambiente seguro de pagamento.
          </p>

          <div className="mt-8 rounded-3xl bg-gray-50 p-6">
            <h2 className="text-2xl font-black text-gray-900">
              Dados do comprador
            </h2>

            <div className="mt-5 space-y-4">
              <div className="flex flex-col gap-1 border-b border-gray-200 pb-3 sm:flex-row sm:justify-between">
                <span className="font-bold text-gray-500">Nome</span>
                <strong className="text-gray-900">
                  {dadosCadastro.nome || "Não informado"}
                </strong>
              </div>

              <div className="flex flex-col gap-1 border-b border-gray-200 pb-3 sm:flex-row sm:justify-between">
                <span className="font-bold text-gray-500">E-mail</span>
                <strong className="text-gray-900">
                  {dadosCadastro.email || "Não informado"}
                </strong>
              </div>

              <div className="flex flex-col gap-1 border-b border-gray-200 pb-3 sm:flex-row sm:justify-between">
                <span className="font-bold text-gray-500">
                  Telefone / WhatsApp
                </span>
                <strong className="text-gray-900">
                  {dadosCadastro.telefone || "Não informado"}
                </strong>
              </div>

              <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
                <span className="font-bold text-gray-500">CPF</span>
                <strong className="text-gray-900">
                  {dadosCadastro.cpf || "Não informado"}
                </strong>
              </div>
            </div>
          </div>

          {erro && (
            <div className="mt-6 rounded-2xl bg-red-50 p-4 text-sm font-bold text-red-600">
              {erro}
            </div>
          )}

          <button
            type="button"
            onClick={iniciarPagamento}
            disabled={processandoPagamento}
            className="mt-8 w-full rounded-full bg-red-600 px-6 py-4 text-lg font-black text-white shadow-lg transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {processandoPagamento
              ? "Gerando pagamento..."
              : "Pagar com Mercado Pago"}
          </button>

          <p className="mt-4 text-center text-sm text-gray-500">
            Você será redirecionado para concluir o pagamento com segurança.
          </p>
        </div>

        <aside className="rounded-[2rem] bg-white p-8 shadow-xl">
          <p className="text-sm font-black uppercase tracking-wide text-red-600">
            Resumo do pedido
          </p>

          <h2 className="mt-2 text-3xl font-black text-gray-900">
            {ehHotDogDay ? "Hot Dog Day" : "Ingresso Solidário"}
          </h2>

          <div className="mt-8 space-y-4 rounded-3xl bg-gray-50 p-5">
            <div className="flex justify-between gap-4 text-gray-700">
              <span>Produto</span>
              <strong className="text-right">{resumoProduto}</strong>
            </div>

            <div className="flex justify-between gap-4 text-gray-700">
              <span>Quantidade total</span>
              <strong>{dadosCadastro.quantidadeTotal}</strong>
            </div>

            {!ehHotDogDay && (
              <>
                <div className="flex justify-between gap-4 text-gray-700">
                  <span>Ingressos normais</span>
                  <strong>{dadosCadastro.ingressos}</strong>
                </div>

                <div className="flex justify-between gap-4 text-gray-700">
                  <span>6º especial</span>
                  <strong>{dadosCadastro.sextoIngresso ? "Sim" : "Não"}</strong>
                </div>

                {dadosCadastro.nomeIngressoEternizado && (
                  <div className="flex justify-between gap-4 text-gray-700">
                    <span>Nome eternizado</span>
                    <strong className="text-right">
                      {dadosCadastro.nomeIngressoEternizado}
                    </strong>
                  </div>
                )}

                <div className="flex justify-between gap-4 text-gray-700">
                  <span>Doação abatida</span>
                  <strong>{dadosCadastro.kgAlimentos} kg</strong>
                </div>
              </>
            )}

            {dadosCadastro.modoAdminTeste && (
              <div className="flex justify-between rounded-2xl bg-yellow-100 p-3 text-yellow-800">
                <span className="font-black">Teste admin</span>
                <strong>{formatarMoeda(dadosCadastro.total)}</strong>
              </div>
            )}

            <div className="flex justify-between border-t border-gray-200 pt-4 text-xl">
              <span className="font-black text-gray-900">Total</span>
              <span className="font-black text-red-600">
                {formatarMoeda(dadosCadastro.total)}
              </span>
            </div>
          </div>

          <div className="mt-6 rounded-3xl bg-yellow-50 p-5">
            <p className="text-sm font-black uppercase tracking-wide text-yellow-700">
              Compra segura
            </p>

            <p className="mt-2 text-sm text-gray-700">
              Após clicar em pagar, o pedido será enviado para o Mercado Pago.
              A confirmação final dependerá do retorno do pagamento aprovado.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}
