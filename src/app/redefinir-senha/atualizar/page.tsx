"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import Link from "next/link";

export default function AtualizarSenhaPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    async function validarSessaoRecuperacao() {
      // O Supabase pode enviar o token na hash (#) ou na query string (?)
      const hash = window.location.hash.substring(1);
      const search = window.location.search.substring(1);

      const hashParams = new URLSearchParams(hash);
      const searchParams = new URLSearchParams(search);

      const token =
        hashParams.get("access_token") || searchParams.get("access_token");
      const refresh =
        hashParams.get("refresh_token") || searchParams.get("refresh_token");
      const type =
        hashParams.get("type") || searchParams.get("type");

      // Se já houver uma sessão ativa de recuperação, podemos usar ela diretamente
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (session) {
        setAccessToken(session.access_token);
        setRefreshToken(session.refresh_token);
        return;
      }

      // Se não houver sessão, exige o token na URL
      if (!token) {
        setError("Link de recuperação inválido ou expirado.");
        return;
      }

      // Tenta estabelecer a sessão a partir do token da URL
      const { error: setSessionError } = await supabase.auth.setSession({
        access_token: token,
        refresh_token: refresh || "",
      });

      if (setSessionError) {
        setError(
          "Não foi possível validar o link de recuperação. Ele pode ter expirado."
        );
        return;
      }

      setAccessToken(token);
      setRefreshToken(refresh);
    }

    validarSessaoRecuperacao();
  }, []);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setSuccess(false);

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    setLoading(true);

    try {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      // Se não houver sessão ativa, tenta estabelecer com o token salvo
      if (accessToken) {
        await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken || "",
        });
      }

      // Atualiza a senha do usuário
      const { error: updateError } = await supabase.auth.updateUser({
        password,
      });

      if (updateError) {
        setError(updateError.message);
        return;
      }

      setSuccess(true);

      // Encerra a sessão temporária de recuperação e redireciona para o login
      await supabase.auth.signOut();

      setTimeout(() => {
        window.location.href = "/admin/login";
      }, 3000);
    } catch {
      setError("Ocorreu um erro inesperado. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FFF8E7] p-4">
      <div className="w-full max-w-md rounded-[2rem] bg-white p-8 shadow-xl">
        <p className="text-center text-sm font-black uppercase tracking-[0.2em] text-red-700">
          Redefinição de Senha
        </p>

        <h1 className="mt-4 text-center text-3xl font-black text-gray-950">
          Criar nova senha
        </h1>

        <p className="mt-3 text-center text-sm font-bold text-gray-600">
          Digite sua nova senha nos campos abaixo.
        </p>

        {error && (
          <div className="mt-5 rounded-xl bg-red-50 p-4 text-sm font-bold text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-5 rounded-xl bg-green-50 p-4 text-sm font-bold text-green-700">
            Senha atualizada com sucesso! Redirecionando para o login...
          </div>
        )}

        {!success && (
          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-black text-gray-950"
              >
                Nova senha
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                placeholder="Digite a nova senha"
                className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-950 outline-none transition focus:border-red-700 focus:ring-2 focus:ring-red-700/20"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-black text-gray-950"
              >
                Confirmar nova senha
              </label>

              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
                placeholder="Confirme a nova senha"
                className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-950 outline-none transition focus:border-red-700 focus:ring-2 focus:ring-red-700/20"
              />
            </div>

            <button
              type="submit"
              disabled={loading || (!accessToken && !success)}
              className="w-full rounded-xl bg-red-700 px-4 py-3 font-black text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Atualizando..." : "Atualizar senha"}
            </button>
          </form>
        )}

        <div className="mt-6 text-center">
          <Link
            href="/admin/login"
            className="text-sm font-bold text-red-700 hover:text-red-900"
          >
            Voltar para o login
          </Link>
        </div>
      </div>
    </main>
  );
}
