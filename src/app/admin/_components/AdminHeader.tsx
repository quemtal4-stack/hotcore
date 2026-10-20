import Link from "next/link";

type AdminHeaderProps = {
  titulo?: string;
  subtitulo?: string;
  descricao?: string;
};

const links = [
  {
    href: "/admin/painel",
    label: "Painel",
  },

  {
    href: "/admin/pedidos",
    label: "Pedidos",
  },
  {
    href: "/admin/produtos",
    label: "Produtos",
  },
  {
    href: "/admin/impacto-social",
    label: "Impacto Social",
  },
  {
    href: "/admin/lives",
    label: "Lives",
  },
  {
    href: "/admin/testes-compra",
    label: "Teste Compra",
  },
];

export function AdminHeader({
  titulo = "Painel Administrativo",
  subtitulo,
  descricao,
}: AdminHeaderProps) {
  const textoSubtitulo =
    descricao ??
    subtitulo ??
    "Gerencie pedidos, produtos, impacto social e lives da Hot Dogueres.";

  return (
    <header className="rounded-[2rem] bg-white p-6 shadow-xl">
      <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
        <div>
          <Link
            href="/"
            className="inline-flex rounded-full bg-yellow-200 px-5 py-3 text-sm font-black text-gray-950 transition hover:bg-yellow-300"
          >
            ← Voltar para o site
          </Link>

          <p className="mt-6 text-sm font-black uppercase tracking-[0.25em] text-red-700">
            Admin Hot Dogueres
          </p>

          <h1 className="mt-3 text-3xl font-black text-gray-950 md:text-5xl">
            {titulo}
          </h1>

          <p className="mt-3 max-w-2xl text-sm font-bold leading-relaxed text-gray-600 md:text-base">
            {textoSubtitulo}
          </p>
        </div>

        <form method="post" action="/admin/login/logout">
          <button
            type="submit"
            className="rounded-full bg-gray-950 px-6 py-3 text-sm font-black text-white transition hover:bg-red-700"
          >
            Sair
          </button>
        </form>
      </div>

      <nav className="mt-8 flex flex-wrap gap-3">
        {links.map((link) => (
          <Link
            key={link.href + link.label}
            href={link.href}
            className="rounded-full bg-red-100 px-5 py-3 text-sm font-black text-red-700 transition hover:bg-red-600 hover:text-white"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export default AdminHeader;
