export type GerarUrlCheckoutLivroParams = {
  produto?: string;
  valor?: number;
  modoTeste?: boolean;
};

export function gerarUrlCheckoutLivro(
  params?: GerarUrlCheckoutLivroParams,
) {
  const baseUrl = "/checkout/livros";

  if (!params) {
    return baseUrl;
  }

  const searchParams = new URLSearchParams();

  if (params.produto) {
    searchParams.set("produto", params.produto);
  }

  if (typeof params.valor === "number") {
    searchParams.set("valor", String(params.valor));
  }

  if (typeof params.modoTeste === "boolean") {
    searchParams.set("modoTeste", String(params.modoTeste));
  }

  const queryString = searchParams.toString();

  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
}

export function gerarUrlCheckout({
  produto,
  valor,
  modoTeste = false,
}: {
  produto: string;
  valor: number;
  modoTeste?: boolean;
}) {
  return gerarUrlCheckoutLivro({
    produto,
    valor,
    modoTeste,
  });
}
