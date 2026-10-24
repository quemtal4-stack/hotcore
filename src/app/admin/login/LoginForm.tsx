"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setErro("");
    setCarregando(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErro("E-mail ou senha inválidos.");
      setCarregando(false);
      return;
    }

    window.location.href = "/admin/painel";
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-black text-gray-950"
        >
          E-mail
        </label>

        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm font-bold text-gray-950 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-black text-gray-950"
        >
          Senha
        </label>

        <input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm font-bold text-gray-950 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200"
        />
      </div>

      {erro && (
        <div className="rounded-xl bg-red-50 p-3 text-center text-sm font-bold text-red-700">
          {erro}
        </div>
      )}

      <button
        type="submit"
        disabled={carregando}
        className="w-full rounded-full bg-gray-950 py-3 text-sm font-black text-white transition hover:bg-red-700 disabled:opacity-60"
      >
        {carregando ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}
