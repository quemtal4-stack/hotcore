"use client";

import { useState } from "react";

type BotaoPagamentoProps = {
  title?: string;
  price?: number;
};

export default function BotaoPagamento({
  title = "Ingresso",
  price = 10,
}: BotaoPagamentoProps) {
  const [loading, setLoading] = useState(false);

  async function handlePagamento() {
    try {
      setLoading(true);

     const response = await fetch("/api/mercado-pago/preference", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          price,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao criar pagamento.");
      }

      const checkoutUrl = data.init_point || data.sandbox_init_point;

      if (!checkoutUrl) {
        throw new Error("Link de pagamento não encontrado.");
      }

      window.location.href = checkoutUrl;
    } catch (error) {
      console.error("Erro no pagamento:", error);
      alert("Não foi possível iniciar o pagamento. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handlePagamento}
      disabled={loading}
      className="w-full rounded-full bg-red-600 px-6 py-4 text-lg font-black text-white shadow-lg transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? "Gerando pagamento..." : "Comprar ingresso"}
    </button>
  );
}
