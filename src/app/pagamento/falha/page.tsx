"use client";

import Link from "next/link";
import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

const WHATSAPP = "5579981314109";

function linkWhatsapp(texto: string) {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`;
}

function obterMensagemStatus(status?: string | null) {
  const statusNormalizado = status?.toLowerCase();

  if (!statusNormalizado) {
    return {
      titulo: "Pagamento não aprovado",
      descricao:
        "Não recebemos uma confirmação de pagamento aprovado para esta tentativa.",
      classe: "bg-red-100 text-red-700",
    };
  }

  if (
    statusNormalizado === "rejected" ||
    statusNormalizado === "failure" ||
    statusNormalizado === "failed"
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

  if (
    statusNormalizado === "pending" ||
    statusNormalizado === "in_process" ||
    statusNormalizado === "em_processamento"
  ) {
    return {
      titulo: "Pagamento pendente",
      descricao:
        "O pagamento ainda não foi confirmado. Dependendo do método escolhido, pode levar alguns minutos.",
      classe: "bg-yellow-100 text-yellow-800",
    };
  }

  return {
    titulo: "Pagamento não concluído",
    descricao:
      "Não conseguimos confirmar o pagamento desta tentativa.",
    classe: "bg-red-100 text-red-700",
  };
}

function PagamentoErroConteudo() {
  const searchParams = useSearchParams();
  const [copiado, setCopiado] = useState(false);

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
        label: "Status",
        value: status || "Não aprovado",
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
    [status, paymentId, preferenceId, merchantOrderId, externalReference]
  );

  const textoWhatsapp = [
    "Olá! Tive um problema ao tentar pagar meu pedido na Hot Dogueres.",
    "",
    `Status: ${status || "Não aprovado"}`,
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

    if (!texto) {
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
        <div className="absolute left-[-120px] top-[-120px] h-80 w-80 rounded-full bg-red-200/50 blur-3xl" />
        <div className="absolute bottom-[-140px] right-[-120px] h-96 w-96 rounded-full bg-yellow-300/40 blur-3xl" />

        <div className="relative mx-auto max-w-4xl">
          <Link
            href="/loja-solidaria"
            className="inline-flex rounded-full bg-white px-5 py-3 text-sm font-black text-red-700 shadow-md ring-1 ring-red-100 transition hover:bg-red-50"
          >
            ← Voltar para a Loja Solidária
          </Link>

          <div className="mt-8 overflow-hidden rounded-[2rem] bg-white shadow-2xl ring-1 ring-red-100">
            <div className="bg-gradient-to-br from-red-600 via-red-500 to-yellow-400 px-6 py-10 text-center text-white md:px-10">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white text-5xl shadow-xl">
                ❌
              </div>

              <p className="mt-6 inline-flex rounded-full bg-white/20 px-5 py-2 text-xs font-black uppercase tracking-[0.25em] text-white backdrop-blur">
                Pagamento não confirmado
              </p>

              <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-black leading-tight md:text-6xl">
                Seu pagamento não foi concluído
              </h1>

              <p className="mx-auto mt-5 max-w-2xl text-base font-bold leading-relaxed text-white/90 md:text-lg">
                Não se preocupe. Seu pedido não foi confirmado e você pode
                tentar novamente ou falar com a Hot Dogueres pelo WhatsApp.
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
                    <p className="text-sm font-black uppercase tracking-wide text-red-700">
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
                  href="/loja-solidaria"
                  className="rounded-full bg-red-600 px-6 py-4 text-center text-sm font-black uppercase tracking-wide text-white shadow-lg transition hover:scale-105 hover:bg-red-700"
                >
                  Tentar novamente
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
                  <li>• Conferir se os dados do cartão ou método de pagamento estão corretos.</li>
                  <li>• Tentar pagar novamente pela Loja Solidária.</li>
                  <li>• Usar outro cartão, Pix ou forma de pagamento disponível.</li>
                  <li>• Falar conosco no WhatsApp informando os dados da tentativa.</li>
                </ul>
              </div>

              <div className="mt-8 rounded-3xl bg-gray-950 p-6 text-center text-white">
                <p className="text-sm font-black uppercase tracking-[0.25em] text-yellow-300">
                  Hot Dogueres
                </p>

                <h3 className="mt-3 text-2xl font-black">
                  Sua compra só é confirmada após o pagamento aprovado.
                </h3>

                <p className="mx-auto mt-3 max-w-2xl text-sm font-semibold leading-relaxed text-white/80">
                  Caso o pagamento tenha sido descontado mesmo aparecendo como
                  falha, fale conosco pelo WhatsApp e envie o comprovante para
                  verificarmos com segurança.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function CarregandoPagamentoErro() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fff7e8] px-4 text-gray-950">
      <div className="rounded-3xl bg-white p-8 text-center shadow-xl">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-red-200 border-t-red-600" />

        <p className="mt-5 text-lg font-black">
          Carregando dados da tentativa...
        </p>
      </div>
    </main>
  );
}

export default function PagamentoErroPage() {
  return (
    <Suspense fallback={<CarregandoPagamentoErro />}>
      <PagamentoErroConteudo />
    </Suspense>
  );
}
