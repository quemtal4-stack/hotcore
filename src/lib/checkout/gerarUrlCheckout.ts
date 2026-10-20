import type { Produto } from "@/data/produtos";

type GerarUrlCheckoutParams = {
  produto: Produto;
  membro?: boolean;
  modoAdmin?: boolean;
};

export function gerarUrlCheckout({
  produto,
  membro = false,
  modoAdmin = false,
}: GerarUrlCheckoutParams) {
  const valorNormal = produto.valor;
  const valorMembro = produto.valorMembro ?? produto.valor;

  const valorFinal = modoAdmin ? 1 : membro ? valorMembro : valorNormal;

  const checkoutPath = modoAdmin ? "/checkout" : produto.checkoutUrl || "/checkout";

  const params = new URLSearchParams({
    produtoId: produto.id,
    titulo: produto.titulo,
    valor: String(valorFinal),
    membro: String(membro),
    modoAdmin: String(modoAdmin),
  });

  return `${checkoutPath}?${params.toString()}`;
}
