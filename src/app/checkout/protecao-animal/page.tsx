import { redirect } from "next/navigation";
import { buscarKitRacao } from "@/lib/kits-checkout";
import { criarPreferenciaMercadoPago } from "@/lib/mercado-pago";

type SearchParams = {
  kit?: string;
  produto?: string;
  quantidade?: string;
  valor?: string;
  admin?: string;
  teste?: string;
};

type PageProps = {
  searchParams: Promise<SearchParams>;
};

function numeroSeguro(valor: string | undefined, padrao = 0) {
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

export default async function CheckoutProtecaoAnimalPage({
  searchParams,
}: PageProps) {
  const params = await searchParams;

  const kitId = textoSeguro(params.kit || params.produto);

  if (!kitId) {
    redirect("/?erro=kit-nao-informado#kits-racao");
  }

  const kit = buscarKitRacao(kitId);

  if (!kit) {
    redirect("/?erro=kit-invalido#kits-racao");
  }

  const modoTeste = params.admin === "true" || params.teste === "true";

  const quantidade = Math.max(
    1,
    Math.floor(numeroSeguro(params.quantidade, 1)),
  );

  const valorParametro = numeroSeguro(params.valor, 0);

  const valorFinal =
    modoTeste && valorParametro > 0 ? valorParametro : kit.valorNumero;

  const valorPagamento = Number(valorFinal.toFixed(2));

  const kitPagamento = {
    ...kit,
    valorNumero: valorPagamento,
  };

  const linkPagamento = await criarPreferenciaMercadoPago({
    kit: kitPagamento,
    quantidade,
    valorUnitario: valorPagamento,

    metadata: {
      tipo: "protecao-animal",
      categoria: "protecao-animal",
      produto: kitId,
      kit: kitId,
      titulo: kit.titulo,
      quantidade,
      valorUnitario: valorPagamento,
      admin: modoTeste,
      teste: modoTeste,
    },
  });

  redirect(linkPagamento);
}
