import { redirect } from "next/navigation";
import { produtos } from "@/data/produtos";
import { criarPreferenciaMercadoPago } from "@/lib/mercado-pago";

type SearchParams = {
  produto?: string;
  quantidade?: string;
  valor?: string;
  membro?: string;
  admin?: string;
  teste?: string;
  titulo?: string;
};

type PageProps = {
  searchParams: Promise<SearchParams>;
};

function numeroSeguro(valor: string | number | undefined, padrao = 0) {
  const numero = Number(valor);

  if (!Number.isFinite(numero)) {
    return padrao;
  }

  return numero;
}

function textoSeguro(valor: string | undefined, padrao = "") {
  if (!valor) {
    return padrao;
  }

  return valor.trim();
}

export default async function CheckoutLivrosPage({ searchParams }: PageProps) {
  const params = await searchParams;

  const produtoId = textoSeguro(params.produto);

  if (!produtoId) {
    redirect("/?erro=livro-nao-informado");
  }

  const produto = produtos.find((item) => item.id === produtoId);

  if (!produto || produto.tipo !== "livro") {
    redirect("/?erro=livro-invalido");
  }

  const modoTeste = params.admin === "true" || params.teste === "true";
  const ehMembro = params.membro === "true";

  const quantidade = Math.max(
    1,
    Math.floor(numeroSeguro(params.quantidade, 1)),
  );

  const valorParametro = numeroSeguro(params.valor, 0);

  const valorBase =
    ehMembro && produto.valorMembro
      ? numeroSeguro(produto.valorMembro, produto.valor)
      : numeroSeguro(produto.valor, 0);

  const valorFinal =
    modoTeste && valorParametro > 0 ? valorParametro : valorBase;

  const valorPagamento = Number(valorFinal.toFixed(2));

  const titulo = textoSeguro(params.titulo, produto.titulo);

  const itemPagamento = {
    ...produto,
    titulo,
    valor: valorPagamento,
    valorNumero: valorPagamento,
  };

  const linkPagamento = await criarPreferenciaMercadoPago({
    kit: itemPagamento,
    quantidade,
    valorUnitario: valorPagamento,

    metadata: {
      tipo: "livro",
      categoria: "livros",
      produto: produtoId,
      titulo,
      quantidade,
      valorUnitario: valorPagamento,
      membro: ehMembro,
      admin: modoTeste,
      teste: modoTeste,
    },
  });

  redirect(linkPagamento);
}
