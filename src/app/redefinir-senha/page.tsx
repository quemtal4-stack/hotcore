"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";


export default function RedefinirSenhaPage() {
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMensagem(null);
    setErro(null);
    setEnviando(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/redefinir-senha/atualizar`,
    });

    setEnviando(false);

    if (error) {
      setErro(error.message);
      return;
    }

    setMensagem(
      "Enviamos um link de redefinição para o seu e-mail. Verifique sua caixa de entrada."
    );
    setEmail("");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FFF8E7] p-4">
      <div className="w-full max-w-md rounded-[2rem] bg-white p-8 shadow-xl">
        <p className="text-center text-sm font-black uppercase tracking-[0.2em] text-red-700">
          Recuperação de Acesso
        </p>

        <h1 className="mt-4 text-center text-3xl font-black text-gray-950">
          Redefinir senha
        </h1>

        <p className="mt-3 text-center text-sm font-bold text-gray-600">
          Digite seu e-mail cadastrado e enviaremos um link para criar uma nova
          senha.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-black text-gray-700"
            >
              E-mail
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="seu@email.com"
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-950 outline-none transition focus:border-red-700 focus:ring-2 focus:ring-red-200"
            />
          </div>

          {erro && (
            <div className="rounded-xl bg-red-100 p-3 text-sm font-bold text-red-800">
              {erro}
            </div>
          )}

          {mensagem && (
            <div className="rounded-xl bg-green-100 p-3 text-sm font-bold text-green-800">
              {mensagem}
            </div>
          )}

          <button
            type="submit"
            disabled={enviando}
            className="w-full rounded-xl bg-red-700 px-4 py-3 font-black text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {enviando ? "Enviando..." : "Enviar link de redefinição"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/admin/login"
            className="text-sm font-black text-red-700 hover:text-red-900"
          >
            ← Voltar para o login
          </Link>
        </div>
      </div>
    </main>
  );
}
