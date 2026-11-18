"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function ResetarSenhaPage() {
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    // Força o Supabase a processar o token da URL
    supabase.auth.onAuthStateChange(async (event) => {
      if (event === "PASSWORD_RECOVERY") {
        // usuário está pronto para redefinir a senha
      }
    });
  }, []);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setErro("");
    setMensagem("");

    if (novaSenha !== confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    if (novaSenha.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setCarregando(true);

    const { error } = await supabase.auth.updateUser({
      password: novaSenha,
    });

    if (error) {
      setErro("Erro ao redefinir senha. Tente novamente.");
    } else {
      setMensagem("Senha redefinida com sucesso! Redirecionando...");
      setTimeout(() => {
        window.location.href = "/admin/login";
      }, 2000);
    }

    setCarregando(false);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FFF8E7] p-4">
      <div className="w-full max-w-md rounded-[2rem] bg-white p-8 shadow-xl">
        <p className="text-center text-sm font-black uppercase tracking-[0.2em] text-red-700">
          Área Restrita
        </p>

        <h1 className="mt-4 text-center text-3xl font-black text-gray-950">
          Redefinir senha
        </h1>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="block text-sm font-black text-gray-950">
              Nova senha
            </label>
            <input
              type="password"
              required
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm font-bold text-gray-950 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200"
            />
          </div>

          <div>
            <label className="block text-sm font-black text-gray-950">
              Confirmar nova senha
            </label>
            <input
              type="password"
              required
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm font-bold text-gray-950 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200"
            />
          </div>

          {erro && (
            <div className="rounded-xl bg-red-50 p-3 text-center text-sm font-bold text-red-700">
              {erro}
            </div>
          )}

          {mensagem && (
            <div className="rounded-xl bg-green-50 p-3 text-center text-sm font-bold text-green-700">
              {mensagem}
            </div>
          )}

          <button
            type="submit"
            disabled={carregando}
            className="w-full rounded-full bg-gray-950 py-3 text-sm font-black text-white transition hover:bg-red-700 disabled:opacity-60"
          >
            {carregando ? "Salvando..." : "Salvar nova senha"}
          </button>
        </form>
      </div>
    </main>
  );
}
