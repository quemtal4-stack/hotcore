import { redirect } from "next/navigation";
import { buscarKitRacao } from "@/lib/kits-checkout";
import { criarPreferenciaMercadoPago } from "@/lib/mercado-pago";

type PageProps = {
  searchParams: Promise<{
    kit?: string;
    produto?: string;
    quantidade?: string;
    valor?: string;
    kg?: string;
    admin?: string;
    teste?: string;
  }>;
};

export default async function CheckoutRacaoPage({ searchParams }: PageProps) {
  const params = await searchParams;

  const kitId = params.kit || params.produto;
  const quantidadeParametro = Number(params.quantidade || 1);

  const quantidade =
    Number.isFinite(quantidadeParametro) && quantidadeParametro > 0
      ? quantidadeParametro
      : 1;

  if (!kitId) {
    redirect("/?erro=kit-racao-nao-informado#kits-racao");
  }

  const kit = buscarKitRacao(kitId);

  if (!kit) {
    redirect("/?erro=kit-racao-invalido#kits-racao");
  }

  const modoAdmin = params.admin === "true" || params.teste === "true";
  const valorParametro = Number(params.valor);

  const valorUnitario =
    modoAdmin && Number.isFinite(valorParametro) && valorParametro > 0
      ? valorParametro
      : kit.valorNumero;

  const kitPagamento = {
    id: kit.id,
    tipo: kit.tipo,
    titulo: kit.titulo,
    descricao: kit.descricao || kit.titulo,
    valor: valorUnitario,
    kg: kit.kg,
  };

  const linkPagamento = await criarPreferenciaMercadoPago({
    kit: kitPagamento,
    quantidade,
  });

  redirect(linkPagamento);
}
