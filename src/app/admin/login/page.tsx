import Link from "next/link";

type AdminLoginPageProps = {
  searchParams?: Promise<{
    erro?: string;
    next?: string;
  }>;
};

export default async function AdminLoginPage({
  searchParams,
}: AdminLoginPageProps) {
  const params = await searchParams;

  const erro = params?.erro || "";
  const next = params?.next || "/admin";

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FFF8E7] px-4 py-10 text-gray-950">
      <section className="w-full max-w-md rounded-[2rem] bg-white p-8 shadow-2xl">
        <Link
          href="/"
          className="inline-flex rounded-full bg-yellow-200 px-5 py-3 text-sm font-black text-gray-950 transition hover:bg-yellow-300"
        >
          ← Voltar para o site
        </Link>

        <p className="mt-8 text-sm font-black uppercase tracking-[0.25em] text-red-700">
          Admin Hot Dogueres
        </p>

        <h1 className="mt-3 text-3xl font-black text-gray-950">
          Entrar no painel
        </h1>

        <p className="mt-3 text-sm font-bold leading-relaxed text-gray-600">
          Acesse o painel administrativo para acompanhar pedidos, produtos,
          impacto social e lives.
        </p>

        {erro === "1" && (
          <div className="mt-6 rounded-2xl bg-red-100 p-4 text-sm font-black text-red-800">
            Senha incorreta. Tente novamente.
          </div>
        )}

        {erro === "config" && (
          <div className="mt-6 rounded-2xl bg-yellow-100 p-4 text-sm font-black text-yellow-900">
            ADMIN_PASSWORD ou ADMIN_SESSION_SECRET não configurado no ambiente.
          </div>
        )}

        <form method="post" action="/admin/login/entrar" className="mt-8">
          <input type="hidden" name="next" value={next} />

          <label className="block text-sm font-black text-gray-700">
            Senha do administrador
          </label>

          <input
            type="password"
            name="password"
            required
            placeholder="Digite a senha"
            className="mt-3 w-full rounded-full border border-gray-300 px-5 py-4 text-sm font-bold outline-none transition focus:border-red-600"
          />

          <button
            type="submit"
            className="mt-6 w-full rounded-full bg-red-600 px-6 py-4 text-sm font-black uppercase tracking-wide text-white shadow-lg transition hover:bg-red-700"
          >
            Entrar no painel
          </button>
        </form>
      </section>
    </main>
  );
}
