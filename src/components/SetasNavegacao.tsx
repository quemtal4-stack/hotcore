import Link from "next/link";

type SetasNavegacaoProps = {
  anterior?: string;
  proxima?: string;
  labelAnterior?: string;
  labelProxima?: string;
};

export default function SetasNavegacao({
  anterior,
  proxima,
  labelAnterior = "Voltar para a página anterior",
  labelProxima = "Ir para a próxima página",
}: SetasNavegacaoProps) {
  return (
    <div className="setas-navegacao">
      {anterior && (
        <Link
          href={anterior}
          className="seta-nav seta-esquerda"
          aria-label={labelAnterior}
        >
          ←
        </Link>
      )}

      {proxima && (
        <Link
          href={proxima}
          className="seta-nav seta-direita"
          aria-label={labelProxima}
        >
          →
        </Link>
      )}
    </div>
  );
}
