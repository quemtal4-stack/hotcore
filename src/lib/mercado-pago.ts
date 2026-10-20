import "server-only";

import { MercadoPagoConfig, Preference } from "mercadopago";

type ItemCheckoutMercadoPago = {
  id: string;
  titulo: string;
  descricao?: string;
  valorNumero?: number;
  valor?: number;
  kg?: number;
  tipo: string;
};

type MetadataMercadoPago = Record<string, string | number | boolean | null>;

type CriarPreferenciaMercadoPagoParams = {
  kit: ItemCheckoutMercadoPago;
  quantidade: number;
  valorUnitario?: number;
  metadata?: MetadataMercadoPago;
};

function obterUrlBase() {
  const url =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_URL ||
    "http://localhost:3000";

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url.replace(/\/$/, "");
  }

  return `https://${url}`.replace(/\/$/, "");
}

function isLocalhost(url: string) {
  return url.includes("localhost") || url.includes("127.0.0.1");
}

export async function criarPreferenciaMercadoPago({
  kit,
  quantidade,
  valorUnitario: valorUnitarioParametro,
  metadata = {},
}: CriarPreferenciaMercadoPagoParams) {
  const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;

  if (!accessToken) {
    throw new Error("MERCADO_PAGO_ACCESS_TOKEN não configurado.");
  }

  const quantidadeFinal = Math.max(1, Math.min(Number(quantidade) || 1, 99));

  const valorUnitario = Number(
    valorUnitarioParametro ?? kit.valorNumero ?? kit.valor ?? 0,
  );

  if (!Number.isFinite(valorUnitario) || valorUnitario <= 0) {
    throw new Error(
      `Valor inválido para o item "${kit.titulo}". Recebido: ${valorUnitario}`,
    );
  }

  const urlBase = obterUrlBase();

  const modoTeste =
    metadata.admin === true ||
    metadata.teste === true ||
    process.env.MERCADO_PAGO_TESTE_VALOR_1_REAL === "true";

  const externalReference = `${kit.tipo}-${kit.id}-${Date.now()}`;

  /**
   * Modo teste/admin:
   * Não cria pagamento real no Mercado Pago.
   * Serve para testar o fluxo sem pagar para a própria loja.
   */
  if (modoTeste) {
    const parametrosTeste = new URLSearchParams({
      teste: "true",
      external_reference: externalReference,
    });

    return `${urlBase}/pagamento/pendente?${parametrosTeste.toString()}`;
  }

  const client = new MercadoPagoConfig({
    accessToken,
  });

  const preference = new Preference(client);

  const resultado = await preference.create({
    body: {
      items: [
        {
          id: kit.id,
          title: kit.titulo,
          description: kit.descricao ?? kit.titulo,
          quantity: quantidadeFinal,
          unit_price: Number(valorUnitario.toFixed(2)),
          currency_id: "BRL",
        },
      ],

      external_reference: externalReference,

     metadata: {
  kit_id: kit.id,
  tipo: kit.tipo,
  quantidade: quantidadeFinal,
  kg_por_unidade: kit.kg ?? 0,
  kg_total: (kit.kg ?? 0) * quantidadeFinal,
  valor_unitario: Number(valorUnitario.toFixed(2)),
  valor_total: Number((valorUnitario * quantidadeFinal).toFixed(2)),
  ...metadata,

  ...(kit.tipo === "racao"
    ? {
        kg_racao: (kit.kg ?? 0) * quantidadeFinal,
        racao_kg: (kit.kg ?? 0) * quantidadeFinal,
      }
    : {
        kg_alimentos: (kit.kg ?? 0) * quantidadeFinal,
        alimentos_kg: (kit.kg ?? 0) * quantidadeFinal,
      }),
},


      back_urls: {
        success: `${urlBase}/pagamento/sucesso`,
        failure: `${urlBase}/pagamento/erro`,
        pending: `${urlBase}/pagamento/pendente`,
      },

      notification_url: `${urlBase}/api/mercado-pago/webhook`,

      ...(!isLocalhost(urlBase)
        ? {
            auto_return: "approved" as const,
          }
        : {}),

      statement_descriptor: "HOTDOGUERES",

      payment_methods: {
        installments: 12,
      },
    },
  });

  const linkPagamento = resultado.init_point || resultado.sandbox_init_point;

  if (!linkPagamento) {
    throw new Error("Link de pagamento não retornado pelo Mercado Pago.");
  }

  return linkPagamento;
}
