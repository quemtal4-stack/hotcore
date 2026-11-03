"use client";

import Link from "next/link";
import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

const WHATSAPP = "5579981314109";

type ContextoPagamento = {
  origem: string;
  tituloOrigem: string;
  hrefRetorno: string;
  textoRetorno: string;
};

type ParametrosBusca = {
  get: (name: string) => string | null;
};

function linkWhatsapp(texto: string) {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`;
}

function normalizarTexto(valor?: string | null) {
  return String(valor || "")
    .trim()
    .toLowerCase();
}

function obterMensagemStatus(status?: string | null) {
  const statusNormalizado = normalizarTexto(status);

  if (!statusNormalizado) {
    return {
      titulo: "Pagamento pendente",
      descricao:
        "Ainda não recebemos a confirmação final do pagamento. Dependendo do método escolhido, isso pode levar alguns minutos.",
      classe: "bg-yellow-100 text-yellow-800",
    };
  }

  if (
    statusNormalizado === "pending" ||
    statusNormalizado === "in_process" ||
    statusNormalizado === "in_mediation" ||
    statusNormalizado === "em_processamento" ||
    statusNormalizado === "pendente"
  ) {
    return {
      titulo: "Pagamento em processamento",
      descricao:
        "Seu pagamento foi iniciado e está sendo processado. Aguarde a confirmação antes de tentar pagar novamente.",
      classe: "bg-yellow-100 text-yellow-800",
    };
  }

  if (
    statusNormalizado === "approved" ||
    statusNormalizado === "accredited" ||
    statusNormalizado === "aprovado" ||
    statusNormalizado === "pago"
  ) {
    return {
      titulo: "Pagamento aprovado",
      descricao:
        "O pagamento aparece como aprovado. Se sua página de confirmação ainda não abriu, aguarde alguns instantes ou fale conosco pelo WhatsApp.",
      classe: "bg-green-100 text-green-700",
    };
  }

  if (
    statusNormalizado === "rejected" ||
    statusNormalizado === "failure" ||
    statusNormalizado === "failed" ||
    statusNormalizado === "recusado" ||
    statusNormalizado === "rejeitado"
  ) {
    return {
      titulo: "Pagamento recusado",
      descricao:
        "O pagamento foi recusado pela operadora, banco, cartão ou meio de pagamento utilizado.",
      classe: "bg-red-100 text-red-700",
    };
  }

  if (
    statusNormalizado === "cancelled" ||
    statusNormalizado === "canceled" ||
    statusNormalizado === "cancelado"
  ) {
    return {
      titulo: "Pagamento cancelado",
      descricao:
        "A tentativa de pagamento foi cancelada antes da confirmação.",
      classe: "bg-orange-100 text-orange-700",
    };
  }

  return {
    titulo: "Pagamento aguardando confirmação",
    descricao:
      "Não recebemos ainda uma resposta final sobre esta tentativa de pagamento.",
    classe: "bg-yellow-100 text-yellow-800",
  };
}

function obterContextoPagamento(params: ParametrosBusca): ContextoPagamento {
  const tipo = normalizarTexto(params.get("tipo"));
  const produto = normalizarTexto(params.get("produto"));
  const origem = normalizarTexto(params.get("origem"));

  if (
    tipo === "clube-membros" ||
    produto === "clube-membros" ||
    origem === "clube-membros" ||
    origem === "clube"
  ) {
    return {
      origem: "clube-membros",
      tituloOrigem: "Clube de Membros",
      hrefRetorno: "/clube-de-membros#planos",
      textoRetorno: "← Voltar para os planos",
    };
  }

  if (
    tipo === "ingresso-solidario-colecionavel" ||
    tipo === "hot-dog-day" ||
    produto === "ingresso-solidario-colecionavel" ||
    produto === "hot-dog-day" ||
    origem === "checkout-ingressos" ||
    origem === "ingressos"
  ) {
    return {
      origem: "ingressos",
      tituloOrigem: "Ingressos Solidários",
      hrefRetorno: "/#ingressos",
      textoRetorno: "← Voltar para os ingressos",
    };
  }

  return {
    origem: "loja-solidaria",
    tituloOrigem: "Loja Solidária",
    hrefRetorno: "/loja-solidaria",
    textoRetorno: "← Voltar para a Loja Solidária",
  };
}

function PagamentoPendenteConteudo() {
  const searchParams = useSearchParams();
  const [copiado, setCopiado] = useState(false);

  const contextoPagamento = useMemo(() => {
    return obterContextoPagamento(searchParams);
  }, [searchParams]);

  const paymentId =
    searchParams.get("payment_id") ||
    searchParams.get("collection_id") ||
    searchParams.get("id");

  const status =
    searchParams.get("status") ||
    searchParams.get("collection_status") ||
    searchParams.get("payment_status");

  const preferenceId = searchParams.get("preference_id");
  const merchantOrderId = searchParams.get("merchant_order_id");
  const externalReference = searchParams.get("external_reference");

  const statusInfo = obterMensagemStatus(status);

  const dadosTentativa = useMemo(
    () => [
      {
        label: "Origem",
        value: contextoPagamento.tituloOrigem,
      },
      {
        label: "Status",
        value: status || "Pendente",
      },
      {
        label: "Pagamento",
        value: paymentId,
      },
      {
        label: "Preferência",
        value: preferenceId,
      },
      {
        label: "Pedido Mercado Pago",
        value: merchantOrderId,
      },
      {
        label: "Referência",
        value: externalReference,
      },
    ],
    [
      contextoPagamento.tituloOrigem,
      status,
      paymentId,
      preferenceId,
      merchantOrderId,
      externalReference,
    ],
  );

  const textoWhatsapp = [
    "Olá! Meu pagamento na Hot Dogueres está pendente ou aguardando confirmação.",
    "",
    `Origem: ${contextoPagamento.tituloOrigem}`,
    `Status: ${status || "Pendente"}`,
    paymentId ? `Pagamento: ${paymentId}` : "",
    preferenceId ? `Preferência: ${preferenceId}` : "",
    merchantOrderId ? `Pedido Mercado Pago: ${merchantOrderId}` : "",
    externalReference ? `Referência: ${externalReference}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  async function copiarDadosTentativa() {
    const texto = dadosTentativa
      .filter((item) => item.value)
      .map((item) => `${item.label}: ${item.value}`)
      .join("\n");

    if (!texto || !navigator.clipboard) {
      return;
    }

    try {
      await navigator.clipboard.writeText(texto);
      setCopiado(true);

      window.setTimeout(() => {
        setCopiado(false);
      }, 2500);
    } catch {
      setCopiado(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#fff7e8] text-gray-950">
      <section className="relative overflow-hidden px-4 py-10 md:py-14">
        <div className="absolute left-[-120px] top-[-120px] h-80 w-80 rounded-full bg-yellow-200/60 blur-3xl" />
        <div className="absolute bottom-[-140px] right-[-120px] h-96 w-96 rounded-full bg-orange-300/40 blur-3xl" />

        <div className="relative mx-auto max-w-4xl">
          <Link
            href={contextoPagamento.hrefRetorno}
            className="inline-flex rounded-full bg-white px-5 py-3 text-sm font-black text-yellow-800 shadow-md ring-1 ring-yellow-200 transition hover:bg-yellow-50"
          >
            {contextoPagamento.textoRetorno}
          </Link>

          <div className="mt-8 overflow-hidden rounded-[2rem] bg-white shadow-2xl ring-1 ring-yellow-200">
            <div className="bg-gradient-to-br from-yellow-400 via-orange-400 to-red-500 px-6 py-10 text-center text-white md:px-10">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white text-5xl shadow-xl">
                ⏳
              </div>

              <p className="mt-6 inline-flex rounded-full bg-white/20 px-5 py-2 text-xs font-black uppercase tracking-[0.25em] text-white backdrop-blur">
                Pagamento pendente
              </p>

              <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-black leading-tight md:text-6xl">
                Seu pagamento está aguardando confirmação
              </h1>

              <p className="mx-auto mt-5 max-w-2xl text-base font-bold leading-relaxed text-white/90 md:text-lg">
                Não se preocupe. Alguns métodos de pagamento podem levar alguns
                minutos para serem confirmados pelo Mercado Pago.
              </p>
            </div>

            <div className="p-6 md:p-10">
              <div className={`rounded-3xl p-5 ${statusInfo.classe}`}>
                <h2 className="text-xl font-black">{statusInfo.titulo}</h2>

                <p className="mt-2 text-sm font-bold leading-relaxed">
                  {statusInfo.descricao}
                </p>
              </div>

              <div className="mt-6 rounded-3xl bg-[#fff7e8] p-5 shadow-inner">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm font-black uppercase tracking-wide text-yellow-800">
                      Dados da tentativa
                    </p>

                    <p className="mt-1 text-sm font-semibold text-gray-700">
                      Use essas informações caso precise falar com o atendimento.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={copiarDadosTentativa}
                    className="rounded-full bg-gray-950 px-5 py-3 text-xs font-black uppercase tracking-wide text-white shadow-md transition hover:bg-gray-800"
                  >
                    {copiado ? "Dados copiados" : "Copiar dados"}
                  </button>
                </div>

                <div className="mt-5 grid gap-3">
                  {dadosTentativa.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl bg-white p-4 shadow-sm"
                    >
                      <p className="text-xs font-black uppercase tracking-wide text-gray-500">
                        {item.label}
                      </p>

                      <p className="mt-1 break-words text-sm font-black text-gray-900">
                        {item.value || "Não informado"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <Link
                  href={contextoPagamento.hrefRetorno}
                  className="rounded-full bg-yellow-500 px-6 py-4 text-center text-sm font-black uppercase tracking-wide text-gray-950 shadow-lg transition hover:scale-105 hover:bg-yellow-400"
                >
                  Voltar para {contextoPagamento.tituloOrigem}
                </Link>

                <a
                  href={linkWhatsapp(textoWhatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-green-600 px-6 py-4 text-center text-sm font-black uppercase tracking-wide text-white shadow-lg transition hover:scale-105 hover:bg-green-700"
                >
                  Falar no WhatsApp
                </a>
              </div>

              <div className="mt-8 rounded-3xl border border-yellow-300 bg-yellow-50 p-5">
                <h3 className="text-lg font-black text-yellow-800">
                  O que você pode fazer agora?
                </h3>

                <ul className="mt-4 space-y-3 text-sm font-bold leading-relaxed text-gray-800">
                  <li>
                    • Aguarde alguns minutos para o Mercado Pago concluir a
                    confirmação.
                  </li>
                  <li>
                    • Verifique seu e-mail, aplicativo do banco ou conta do
                    Mercado Pago.
                  </li>
                  <li>
                    • Evite pagar novamente de imediato se o valor já saiu da
                    sua conta.
                  </li>
                  <li>
                    • Se tiver dúvida, fale conosco no WhatsApp com os dados da
                    tentativa.
                  </li>
                </ul>
              </div>

              <div className="mt-8 rounded-3xl bg-gray-950 p-6 text-center text-white">
                <p className="text-sm font-black uppercase tracking-[0.25em] text-yellow-300">
                  Hot Dogueres
                </p>

                <h3 className="mt-3 text-2xl font-black">
                  Sua compra será considerada confirmada após o pagamento
                  aprovado.
                </h3>

                <p className="mx-auto mt-3 max-w-2xl text-sm font-semibold leading-relaxed text-white/80">
                  Assim que o Mercado Pago confirmar o pagamento, o sistema
                  poderá atualizar o pedido automaticamente. Se a confirmação
                  demorar, envie os dados pelo WhatsApp para conferência.
                </p>
              </div>

              <div className="mt-6 flex justify-center">
                <Link
                  href="/"
                  className="rounded-full border border-gray-200 bg-white px-6 py-3 text-sm font-black text-gray-800 shadow-sm transition hover:bg-gray-50"
                >
                  Ir para a página inicial
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function CarregandoPagamentoPendente() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fff7e8] px-4 text-gray-950">
      <div className="rounded-3xl bg-white p-8 text-center shadow-xl">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-yellow-200 border-t-yellow-500" />

        <p className="mt-5 text-lg font-black">
          Carregando dados do pagamento...
        </p>
      </div>
    </main>
  );
}

export default function PagamentoPendentePage() {
  return (
    <Suspense fallback={<CarregandoPagamentoPendente />}>
      <PagamentoPendenteConteudo />
    </Suspense>
  );
}
