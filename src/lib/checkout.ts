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
  const valorFinal = modoAdmin
    ? 1
    : membro && produto.valorMembro
      ? produto.valorMembro
      : produto.valor;

  const tipoCheckout =
    produto.id === "hot-dog-day" ? "hot-dog-day" : produto.tipo;

  const parametros = new URLSearchParams({
    produto: produto.id,
    tipo: tipoCheckout,
    titulo: produto.titulo,
    quantidade: "1",
    valor: String(valorFinal),
  });

  if (produto.tipo === "kit-alimento" || produto.tipo === "kit-racao") {
    parametros.set("kit", produto.id);
  }

  if (produto.kg) {
    parametros.set("kg", String(produto.kg));
  }

  if (membro) {
    parametros.set("membro", "true");
  }

  if (modoAdmin) {
    parametros.set("admin", "true");
    parametros.set("teste", "true");
    parametros.set("modoAdmin", "true");
    parametros.set("modoTeste", "true");
  }

  if (produto.tipo === "ingresso" || produto.tipo === "ingresso-colecionavel") {
    parametros.set("ingresso", produto.titulo);
  }

  const checkoutUrl = produto.checkoutUrl || "/checkout";

  return `${checkoutUrl}?${parametros.toString()}`;
}
