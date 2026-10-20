"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";

const WHATSAPP = "5579981314109";
const FRETE_LOCAL_SERGIPE = 12;

type FreteEstimado = {
  titulo: string;
  valorTexto: string;
  valorNumero: number | null;
  prazo: string;
  podePagarOnline: boolean;
};

function linkWhatsapp(texto: string) {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`;
}

function limparCep(cep: string) {
  return cep.replace(/\D/g, "");
}

function formatarMoeda(valor: number) {
  const valorSeguro = Number.isFinite(valor) ? valor : 0;

  return valorSeguro.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}


function calcularFreteEstimado(
  cep: string,
  tipoEntrega: "retirada" | "entrega",
): FreteEstimado {
  if (tipoEntrega === "retirada") {
    return {
      titulo: "Retirada no local",
      valorTexto: "R$ 0,00",
      valorNumero: 0,
      prazo: "Retirada conforme data combinada pela organização",
      podePagarOnline: true,
    };
  }

  const cepLimpo = limparCep(cep);

  if (cepLimpo.length !== 8) {
    return {
      titulo: "CEP não informado",
      valorTexto: "A confirmar",
      valorNumero: null,
      prazo: "Informe um CEP válido para estimativa.",
      podePagarOnline: false,
    };
  }

  if (cepLimpo.startsWith("49")) {
    return {
      titulo: "Entrega local / Sergipe",
      valorTexto: `R$ ${FRETE_LOCAL_SERGIPE.toFixed(2).replace(".", ",")}`,
      valorNumero: FRETE_LOCAL_SERGIPE,
      prazo: "até 5 dias úteis após a produção",
      podePagarOnline: true,
    };
  }

  return {
    titulo: "Envio pelos Correios",
    valorTexto: "A calcular",
    valorNumero: null,
    prazo: "prazo conforme Correios",
    podePagarOnline: false,
  };
}

function CheckoutConteudo() {
  const searchParams = useSearchParams();

  const produto = searchParams.get("produto") || "Produto não informado";
  const tamanho = searchParams.get("tamanho") || "";
  const cep = searchParams.get("cep") || "";
  const valor = Number(searchParams.get("valor") || 0);

  const [tipoEntrega, setTipoEntrega] = useState<"retirada" | "entrega">(
    "entrega",
  );

  const [nomeComprador, setNomeComprador] = useState("");
  const [emailComprador, setEmailComprador] = useState("");
  const [whatsappComprador, setWhatsappComprador] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  const frete = useMemo(
    () => calcularFreteEstimado(cep, tipoEntrega),
    [cep, tipoEntrega],
  );

  const totalPedido =
    valor + (frete.valorNumero !== null ? frete.valorNumero : 0);

  const mensagemPedido = `
Olá! Quero finalizar meu pedido na Loja Solidária Hot Dogueres.

Produto: ${produto}
Tamanho: ${tamanho || "Não informado"}
CEP: ${cep || "Não informado"}
Forma de recebimento: ${tipoEntrega === "retirada" ? "Retirada no local" : "Entrega"}

Valor do produto: ${formatarMoeda(valor)}
Frete: ${frete.titulo}
Valor do frete: ${frete.valorTexto}
Prazo: ${frete.prazo}

Total estimado: ${
    frete.valorNumero !== null ? formatarMoeda(totalPedido) : "A confirmar"
  }

Nome: ${nomeComprador || "Não informado"}
E-mail: ${emailComprador || "Não informado"}
WhatsApp: ${whatsappComprador || "Não informado"}

Aguardo as orientações para pagamento e confirmação.
`;

  async function pagarComMercadoPago() {
    try {
      setErro("");

      if (!nomeComprador.trim()) {
        setErro("Informe seu nome antes de continuar.");
        return;
      }

      if (!emailComprador.trim()) {
        setErro("Informe seu e-mail antes de continuar.");
        return;
      }

      if (!tamanho) {
        setErro("Tamanho da camisa não informado.");
        return;
      }

      if (!valor || valor <= 0) {
        setErro(
          "Este produto ainda não possui preço configurado para pagamento online.",
        );
        return;
      }

      if (!frete.podePagarOnline || frete.valorNumero === null) {
        setErro(
          "Para esse CEP, o frete precisa ser confirmado antes pelo WhatsApp.",
        );
        return;
      }

      setCarregando(true);

    const resposta = await fetch("/api/mercado-pago/checkout", {

        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tipo: "camisa",
          titulo: produto,
          title: produto,
          descricao: `Camisa Hot Dogueres - Tamanho ${tamanho} - ${frete.titulo}`,
          description: `Camisa Hot Dogueres - Tamanho ${tamanho} - ${frete.titulo}`,
          itemId: `camisa-${produto.toLowerCase().replace(/\s+/g, "-")}`,
          quantidade: 1,
          valor: totalPedido,
          total: totalPedido,
          nomeComprador,
          emailComprador,
          whatsapp: whatsappComprador,
          tamanho,
          cep,
          tipoEntrega,
          frete: {
            tipo: frete.titulo,
            valor: frete.valorNumero,
            prazo: frete.prazo,
          },
          produto,
        }),
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        throw new Error(dados.error || "Erro ao criar pagamento.");
      }

      if (!dados.url) {
        throw new Error("URL de pagamento não encontrada.");
      }

      window.location.href = dados.url;
    } catch (error) {
      if (error instanceof Error) {
        setErro(error.message);
      } else {
        setErro("Erro inesperado ao iniciar pagamento.");
      }
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#fff7e8] px-4 py-10 text-gray-950">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/loja-solidaria"
          className="mb-6 inline-flex rounded-full bg-white px-5 py-3 text-sm font-black text-red-700 shadow-md transition hover:bg-red-50"
        >
          ← Voltar para a loja
        </Link>

        <section className="rounded-3xl bg-white p-6 shadow-xl md:p-8">
          <span className="rounded-full bg-green-100 px-4 py-2 text-xs font-black text-green-700">
            Checkout Hot Dogueres
          </span>

          <h1 className="mt-5 text-3xl font-black text-red-700 md:text-5xl">
            Finalizar Pedido
          </h1>

          <p className="mt-4 text-base font-medium leading-relaxed text-gray-700 md:text-lg">
            Confira os dados do seu pedido antes de seguir para o pagamento.
          </p>

          <div className="mt-8 space-y-4 rounded-3xl bg-[#fff7e8] p-5">
            <div>
              <p className="text-sm font-black text-gray-600">Produto</p>
              <p className="mt-1 text-xl font-black text-red-700">{produto}</p>
            </div>

            {tamanho && (
              <div>
                <p className="text-sm font-black text-gray-600">Tamanho</p>
                <p className="mt-1 text-lg font-black text-gray-900">
                  {tamanho}
                </p>
              </div>
            )}

            <div>
              <p className="text-sm font-black text-gray-600">CEP</p>
              <p className="mt-1 text-lg font-black text-gray-900">
                {cep || "Não informado"}
              </p>
            </div>

            <div>
              <p className="text-sm font-black text-gray-600">
                Valor do produto
              </p>
              <p className="mt-1 text-lg font-black text-gray-900">
                {formatarMoeda(valor)}
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-3xl border-4 border-red-100 bg-white p-5">
            <h2 className="text-xl font-black text-red-700">
              Forma de recebimento
            </h2>

            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <button
                type="button"
                onClick={() => setTipoEntrega("entrega")}
                className={`rounded-2xl px-5 py-4 text-sm font-black transition ${
                  tipoEntrega === "entrega"
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                Receber por entrega
              </button>

              <button
                type="button"
                onClick={() => setTipoEntrega("retirada")}
                className={`rounded-2xl px-5 py-4 text-sm font-black transition ${
                  tipoEntrega === "retirada"
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                Retirar no local
              </button>
            </div>

            {tipoEntrega === "retirada" && (
              <p className="mt-4 rounded-2xl bg-green-100 p-4 text-sm font-bold leading-relaxed text-green-800">
                Na opção de retirada no local, não há cobrança de frete. A data,
                horário e local exato da retirada serão confirmados pela
                organização.
              </p>
            )}
          </div>

          <div className="mt-6 rounded-3xl border-4 border-yellow-400 bg-yellow-50 p-5">
            <h2 className="text-xl font-black text-yellow-800">
              Frete / retirada
            </h2>

            <div className="mt-4 space-y-2 text-sm font-bold text-gray-800">
              <p>
                <span className="font-black">Tipo:</span> {frete.titulo}
              </p>

              <p>
                <span className="font-black">Valor:</span> {frete.valorTexto}
              </p>

              <p>
                <span className="font-black">Prazo:</span> {frete.prazo}
              </p>
            </div>

            {tipoEntrega === "entrega" && (
              <p className="mt-4 text-xs font-semibold leading-relaxed text-gray-600">
                Para entregas fora de Sergipe, o frete será confirmado conforme
                cálculo dos Correios antes do pagamento online.
              </p>
            )}
          </div>

          <div className="mt-6 rounded-3xl bg-green-100 p-5">
            <h2 className="text-xl font-black text-green-800">
              Total do pedido
            </h2>

            <p className="mt-3 text-2xl font-black text-green-900">
              {frete.valorNumero !== null
                ? formatarMoeda(totalPedido)
                : "A confirmar"}
            </p>

            <p className="mt-3 text-sm font-bold leading-relaxed text-green-900">
              As camisas são feitas por pré-venda. Após o pagamento, você
              receberá a confirmação do pedido e a previsão de entrega conforme
              fechamento do lote de produção.
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <input
              value={nomeComprador}
              onChange={(event) => setNomeComprador(event.target.value)}
              placeholder="Seu nome"
              className="rounded-full border border-gray-300 px-5 py-3 text-sm font-bold outline-none focus:border-red-500"
            />

            <input
              value={emailComprador}
              onChange={(event) => setEmailComprador(event.target.value)}
              placeholder="Seu e-mail"
              type="email"
              className="rounded-full border border-gray-300 px-5 py-3 text-sm font-bold outline-none focus:border-red-500"
            />

            <input
              value={whatsappComprador}
              onChange={(event) => setWhatsappComprador(event.target.value)}
              placeholder="WhatsApp"
              className="rounded-full border border-gray-300 px-5 py-3 text-sm font-bold outline-none focus:border-red-500"
            />
          </div>

          {erro && (
            <div className="mt-5 rounded-2xl bg-red-100 p-4 text-sm font-bold text-red-800">
              {erro}
            </div>
          )}

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <a
              href={linkWhatsapp(mensagemPedido)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-green-600 px-6 py-4 text-center text-sm font-black text-white shadow-md transition hover:bg-green-700"
            >
              Confirmar pelo WhatsApp
            </a>

            <button
              type="button"
              onClick={pagarComMercadoPago}
              disabled={carregando || !frete.podePagarOnline}
              className={`rounded-full px-6 py-4 text-center text-sm font-black shadow-md transition ${
                frete.podePagarOnline
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "cursor-not-allowed bg-gray-300 text-gray-600"
              }`}
            >
              {carregando
                ? "Gerando pagamento..."
                : frete.podePagarOnline
                  ? "Pagar com Mercado Pago"
                  : "Frete precisa confirmar"}
            </button>
          </div>

          <p className="mt-5 text-center text-xs font-semibold leading-relaxed text-gray-500">
            O pagamento online fica liberado para retirada no local e entrega
            local em Sergipe. Para outros estados, confirme o frete dos Correios
            pelo WhatsApp.
          </p>
        </section>
      </div>
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#fff7e8] px-4">
          <div className="rounded-3xl bg-white p-8 text-center shadow-xl">
            <p className="text-lg font-black text-gray-900">
              Carregando checkout...
            </p>
          </div>
        </main>
      }
    >
      <CheckoutConteudo />
    </Suspense>
  );
}
