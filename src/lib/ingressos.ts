import { ingressos } from "@/data/ingressos";

export { ingressos };

export {
  formatarMoeda,
  formatarNumero,
  formatarData,
  formatarDataHora,
} from "@/lib/formatters";

type Ingresso = (typeof ingressos)[number];
type IngressoId = Ingresso["id"];

export function buscarIngressoPorId(id: IngressoId) {
  return ingressos.find((ingresso) => ingresso.id === id);
}

export function calcularTotalIngressosDisponiveis() {
  return ingressos.reduce((total, ingresso) => total + ingresso.quantidade, 0);
}

export function calcularPotencialTotalAlimentosKg() {
  return ingressos.reduce(
    (total, ingresso) => total + ingresso.quantidade * ingresso.alimentoKg,
    0
  );
}
