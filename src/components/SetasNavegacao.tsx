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
  if (!anterior && !proxima) {
    return null;
  }

  return (
    <nav
      className="setas-navegacao"
      aria-label="Navegação entre páginas"
    >
      {anterior && (
        <Link
          href={anterior}
          className="seta-nav seta-esquerda"
          aria-label={labelAnterior}
          title={labelAnterior}
          prefetch={false}
        >
          ←
        </Link>
      )}

      {proxima && (
        <Link
          href={proxima}
          className="seta-nav seta-direita"
          aria-label={labelProxima}
          title={labelProxima}
          prefetch={false}
        >
          →
        </Link>
      )}
    </nav>
  );
}
