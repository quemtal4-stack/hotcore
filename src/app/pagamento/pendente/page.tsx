"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

const WHATSAPP = "5579981314109";

function criarLinkWhatsapp(mensagem: string) {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensagem)}`;
}

function PagamentoPendenteConteudo() {
  const searchParams = useSearchParams();

  const paymentId =
    searchParams.get("payment_id") ||
    searchParams.get("collection_id") ||
    searchParams.get("id");

  const status = searchParams.get("status");
  const preferenceId = searchParams.get("preference_id");
  const collectionStatus = searchParams.get("collection_status");
  const merchantOrderId = searchParams.get("merchant_order_id");

  const statusExibido = status || collectionStatus || "Pendente";

  return (
    <main className="min-h-screen overflow-hidden bg-[#fff7e8] px-4 py-10 text-gray-950">
      <section className="relative mx-auto max-w-5xl">
        <div className="absolute left-[-120px] top-[-120px] h-72 w-72 rounded-full bg-yellow-300/30 blur-3xl" />
        <div className="absolute bottom-[-140px] right-[-120px] h-80 w-80 rounded-full bg-red-400/20 blur-3xl" />

        <div className="relative overflow-hidden rounded-[2rem] bg-white shadow-2xl ring-1 ring-yellow-100">
          <div className="bg-gradient-to-br from-yellow-300 via-yellow-400 to-red-500 px-6 py-10 text-center md:px-10 md:py-14">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white text-5xl shadow-xl">
              ⏳
            </div>

            <p className="mx-auto mt-6 inline-flex rounded-full bg-black px-5 py-2 text-xs font-black uppercase tracking-[0.25em] text-yellow-300 shadow-lg">
              Aguardando confirmação
            </p>

            <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-black leading-tight text-white drop-shadow-md md:text-6xl">
              Pagamento pendente
            </h1>

            <p className="mx-auto mt-5 max-w-3xl text-base font-bold leading-relaxed text-white/95 md:text-lg">
              Seu pagamento foi iniciado, mas ainda está em análise ou aguardando
              confirmação pelo Mercado Pago.
            </p>
          </div>

          <div className="grid gap-8 p-6 md:p-10 lg:grid-cols-[1fr_0.8fr]">
            <div>
              <div className="rounded-[1.5rem] border border-yellow-200 bg-yellow-50 p-6 shadow-md">
                <h2 className="text-2xl font-black text-yellow-800">
                  O que acontece agora?
                </h2>

                <div className="mt-5 space-y-4">
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-yellow-400 text-sm font-black text-gray-950">
                      1
                    </div>

                    <div>
                      <h3 className="font-black text-gray-950">
                        O Mercado Pago está analisando
                      </h3>

                      <p className="mt-1 text-sm font-semibold leading-relaxed text-gray-700">
                        Alguns pagamentos, como boleto, Pix em processamento ou
                        cartão em análise, podem levar um tempo para serem
                        confirmados.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-yellow-400 text-sm font-black text-gray-950">
                      2
                    </div>

                    <div>
                      <h3 className="font-black text-gray-950">
                        Aguarde a confirmação
                      </h3>

                      <p className="mt-1 text-sm font-semibold leading-relaxed text-gray-700">
                        Assim que o pagamento for confirmado, o pedido poderá
                        seguir para a próxima etapa.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-yellow-400 text-sm font-black text-gray-950">
                      3
                    </div>

                    <div>
                      <h3 className="font-black text-gray-950">
                        Em caso de dúvida, fale conosco
                      </h3>

                      <p className="mt-1 text-sm font-semibold leading-relaxed text-gray-700">
                        Se quiser confirmar alguma informação do pedido, você
                        pode chamar a Hot Dogueres pelo WhatsApp.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-[1.5rem] border border-red-100 bg-[#fff7e8] p-6 shadow-md">
                <h2 className="text-xl font-black text-red-700">
                  Importante
                </h2>

                <p className="mt-3 text-sm font-semibold leading-relaxed text-gray-700">
                  Não é necessário refazer o pagamento imediatamente. Primeiro,
                  aguarde a atualização do status pelo Mercado Pago. Caso o
                  pagamento seja recusado ou cancelado, você poderá tentar
                  novamente.
                </p>
              </div>
            </div>

            <aside>
              <div className="rounded-[1.5rem] bg-gray-950 p-6 text-white shadow-xl">
                <p className="text-sm font-black uppercase tracking-[0.25em] text-yellow-300">
                  Dados do pagamento
                </p>

                <div className="mt-6 space-y-4">
                  <div className="rounded-2xl bg-white/10 p-4">
                    <p className="text-xs font-black uppercase tracking-wide text-white/60">
                      Status
                    </p>

                    <p className="mt-1 text-lg font-black text-yellow-300">
                      {statusExibido}
                    </p>
                  </div>

                  {paymentId && (
                    <div className="rounded-2xl bg-white/10 p-4">
                      <p className="text-xs font-black uppercase tracking-wide text-white/60">
                        ID do pagamento
                      </p>

                      <p className="mt-1 break-all text-sm font-bold text-white">
                        {paymentId}
                      </p>
                    </div>
                  )}

                  {preferenceId && (
                    <div className="rounded-2xl bg-white/10 p-4">
                      <p className="text-xs font-black uppercase tracking-wide text-white/60">
                        Preferência
                      </p>

                      <p className="mt-1 break-all text-sm font-bold text-white">
                        {preferenceId}
                      </p>
                    </div>
                  )}

                  {merchantOrderId && (
                    <div className="rounded-2xl bg-white/10 p-4">
                      <p className="text-xs font-black uppercase tracking-wide text-white/60">
                        Pedido Mercado Pago
                      </p>

                      <p className="mt-1 break-all text-sm font-bold text-white">
                        {merchantOrderId}
                      </p>
                    </div>
                  )}

                  {!paymentId && !preferenceId && !merchantOrderId && (
                    <div className="rounded-2xl bg-white/10 p-4">
                      <p className="text-sm font-semibold leading-relaxed text-white/75">
                        Nenhum código adicional foi enviado pelo Mercado Pago
                        nesta tentativa.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 rounded-[1.5rem] border border-green-200 bg-green-50 p-6 shadow-md">
                <h2 className="text-xl font-black text-green-700">
                  Precisa de ajuda?
                </h2>

                <p className="mt-3 text-sm font-semibold leading-relaxed text-gray-700">
                  Se você acredita que já pagou, envie o comprovante ou informe
                  o ID do pagamento pelo WhatsApp.
                </p>

                <a
                  href={criarLinkWhatsapp(
                    `Olá! Meu pagamento ficou pendente na Hot Dogueres. Status: ${statusExibido}${
                      paymentId ? ` | ID do pagamento: ${paymentId}` : ""
                    }${preferenceId ? ` | Preferência: ${preferenceId}` : ""}`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 block rounded-full bg-green-600 px-6 py-3 text-center text-sm font-black text-white shadow-md transition hover:scale-105 hover:bg-green-700"
                >
                  Falar no WhatsApp
                </a>
              </div>
            </aside>
          </div>

          <div className="border-t border-gray-100 bg-gray-50 px-6 py-6 md:px-10">
            <div className="grid gap-4 md:grid-cols-3">
              <Link
                href="/loja-solidaria"
                className="rounded-full bg-red-600 px-6 py-4 text-center text-sm font-black text-white shadow-md transition hover:scale-105 hover:bg-red-700"
              >
                Voltar para a loja
              </Link>

              <Link
                href="/clube-de-membros"
                className="rounded-full bg-yellow-400 px-6 py-4 text-center text-sm font-black text-gray-950 shadow-md transition hover:scale-105 hover:bg-yellow-500"
              >
                Clube de Membros
              </Link>

              <Link
                href="/"
                className="rounded-full bg-gray-950 px-6 py-4 text-center text-sm font-black text-white shadow-md transition hover:scale-105 hover:bg-black"
              >
                Ir para o início
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function CarregandoPagamentoPendente() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fff7e8] px-4">
      <div className="rounded-[2rem] bg-white p-8 text-center shadow-xl">
        <div className="mx-auto mb-5 flex h-16 w-16 animate-pulse items-center justify-center rounded-full bg-yellow-100 text-3xl">
          ⏳
        </div>

        <p className="text-lg font-black text-gray-900">
          Carregando informações do pagamento...
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
