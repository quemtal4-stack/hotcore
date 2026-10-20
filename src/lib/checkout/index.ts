import type { Produto } from "@/data/produtos";

type GerarUrlCheckoutParams = {
  produto: Produto;
  membro?: boolean;
  modoAdmin?: boolean;
  quantidade?: number;
};

export function gerarUrlCheckout({
  produto,
  membro = false,
  modoAdmin = false,
  quantidade = 1,
}: GerarUrlCheckoutParams) {
  const valorFinal =
    membro && produto.valorMembro ? produto.valorMembro : produto.valor;

  const params = new URLSearchParams({
    produto: produto.id,
    titulo: produto.titulo,
    tipo: produto.tipo,
    valor: String(valorFinal),
    quantidade: String(quantidade),
    membro: String(membro),
    modoAdmin: String(modoAdmin),
    modoTeste: String(modoAdmin),
    origem: "admin-testes-compra",
  });

  const checkoutUrl = produto.checkoutUrl || "/checkout";

  return `${checkoutUrl}?${params.toString()}`;
}
