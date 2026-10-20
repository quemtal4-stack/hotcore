"use client";

import { useRouter } from "next/navigation";

export default function BotaoCadastro() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push("/cadastro")}
    >
      Ir para cadastro
    </button>
  );
}
