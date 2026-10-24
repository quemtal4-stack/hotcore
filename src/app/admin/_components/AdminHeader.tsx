"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Menu, X, User, LogOut } from "lucide-react";

type AdminHeaderProps = {
  titulo?: string;
  subtitulo?: string;
  descricao?: string;
  usuario?: {
    nome?: string | null;
    email?: string | null;
    avatar_url?: string | null;
  } | null;
};

const links = [
  { href: "/admin/painel", label: "Painel" },
  { href: "/admin/pedidos", label: "Pedidos" },
  { href: "/admin/produtos", label: "Produtos" },
  { href: "/admin/impacto-social", label: "Impacto Social" },
  { href: "/admin/lives", label: "Lives" },
  { href: "/admin/testes-compra", label: "Teste Compra" },
];

export function AdminHeader({
  titulo = "Painel Administrativo",
  subtitulo,
  descricao,
  usuario,
}: AdminHeaderProps) {
  const pathname = usePathname();
  const [menuAberto, setMenuAberto] = useState(false);

  const textoSubtitulo =
    descricao ??
    subtitulo ??
    "Gerencie pedidos, produtos, impacto social e lives da Hot Dogueres.";

  async function handleLogout() {
    try {
      await supabase.auth.signOut();
      window.location.href = "/admin/login";
    } catch (error) {
      console.error("Erro ao sair:", error);
      window.location.href = "/admin/login";
    }
  }

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

        <div className="flex items-center gap-3">
          {usuario && (
            <div className="hidden items-center gap-3 rounded-full bg-gray-100 px-4 py-2 md:flex">
              {usuario.avatar_url ? (
                <img
                  src={usuario.avatar_url}
                  alt={usuario.nome || "Usuário"}
                  className="h-8 w-8 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-700">
                  <User size={16} />
                </div>
              )}

              <div className="text-left">
                <p className="text-xs font-black text-gray-950">
                  {usuario.nome || "Administrador"}
                </p>
                <p className="text-[10px] font-bold text-gray-500">
                  {usuario.email}
                </p>
              </div>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-full bg-gray-950 px-6 py-3 text-sm font-black text-white transition hover:bg-red-700"
          >
            <LogOut size={16} />
            Sair
          </button>
        </div>
      </div>

      {/* Menu desktop */}
      <nav className="mt-8 hidden flex-wrap gap-3 md:flex">
        {links.map((link) => {
          const ativo = pathname === link.href || pathname.startsWith(`${link.href}/`);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-full px-5 py-3 text-sm font-black transition ${
                ativo
                  ? "bg-red-600 text-white"
                  : "bg-red-100 text-red-700 hover:bg-red-600 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Menu mobile */}
      <div className="mt-6 md:hidden">
        <button
          onClick={() => setMenuAberto(!menuAberto)}
          className="flex w-full items-center justify-between rounded-2xl bg-red-100 px-5 py-3 text-sm font-black text-red-700"
        >
          Menu
          {menuAberto ? <X size={20} /> : <Menu size={20} />}
        </button>

        {menuAberto && (
          <nav className="mt-3 flex flex-col gap-2 rounded-2xl bg-gray-50 p-3">
            {links.map((link) => {
              const ativo =
                pathname === link.href || pathname.startsWith(`${link.href}/`);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuAberto(false)}
                  className={`rounded-xl px-4 py-3 text-sm font-black transition ${
                    ativo
                      ? "bg-red-600 text-white"
                      : "bg-white text-red-700 hover:bg-red-100"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        )}
      </div>
    </header>
  );
}

export default AdminHeader;
