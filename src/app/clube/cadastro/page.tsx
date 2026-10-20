"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";

function limparNumero(valor: string) {
  return valor.replace(/\D/g, "");
}

function formatarCpf(valor: string) {
  const numeros = limparNumero(valor).slice(0, 11);

  return numeros
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1-$2");
}

function formatarTelefone(valor: string) {
  const numeros = limparNumero(valor).slice(0, 11);

  if (numeros.length <= 10) {
    return numeros
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  }

  return numeros
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");
}

function validarCpf(cpf: string) {
  const numeros = limparNumero(cpf);

  if (numeros.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(numeros)) return false;

  let soma = 0;
  for (let i = 0; i < 9; i++) soma += Number(numeros[i]) * (10 - i);
  let primeiroDigito = 11 - (soma % 11);
  if (primeiroDigito >= 10) primeiroDigito = 0;
  if (primeiroDigito !== Number(numeros[9])) return false;

  soma = 0;
  for (let i = 0; i < 10; i++) soma += Number(numeros[i]) * (11 - i);
  let segundoDigito = 11 - (soma % 11);
  if (segundoDigito >= 10) segundoDigito = 0;

  return segundoDigito === Number(numeros[10]);
}

function validarEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const NOMES_PLANOS: Record<string, string> = {
  apoiador: "Apoiador",
  lendario: "Lendário",
  fundador: "Fundador",
  colecionador: "Colecionador",
  guardiao: "Guardião",
  eternizado: "Eternizados",
};

export default function CadastroClubePage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#FFF8E7]">
          <p className="text-lg font-black text-gray-900">Carregando cadastro...</p>
        </main>
      }
    >
      <CadastroClubeConteudo />
    </Suspense>
  );
}

function CadastroClubeConteudo() {
  const searchParams = useSearchParams();
  const plano = searchParams.get("plano") || "apoiador";
  const nomePlano = NOMES_PLANOS[plano] || "Apoiador";

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [cpf, setCpf] = useState("");
  const [erro, setErro] = useState("");

  function continuarParaPagamento(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErro("");

    if (!nome.trim()) {
      setErro("Informe seu nome completo.");
      return;
    }

    if (!validarEmail(email)) {
      setErro("Informe um e-mail válido.");
      return;
    }

    if (limparNumero(whatsapp).length < 10) {
      setErro("Informe um WhatsApp válido.");
      return;
    }

    if (!validarCpf(cpf)) {
      setErro("Informe um CPF válido.");
      return;
    }

    const params = new URLSearchParams({
      plano,
      nome: nome.trim(),
      email: email.trim(),
      whatsapp,
      cpf,
    });

    window.location.href = `/clube/pagamento?${params.toString()}`;
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #facc15, #fb923c)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: "560px",
          background: "#ffffff",
          color: "#18181b",
          borderRadius: "24px",
          padding: "32px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
        }}
      >
        <Link
          href="/clube-de-membros#planos"
          style={{
            display: "inline-flex",
            marginBottom: "20px",
            background: "#f4f4f5",
            color: "#18181b",
            textDecoration: "none",
            padding: "10px 16px",
            borderRadius: "999px",
            fontSize: "14px",
            fontWeight: 800,
          }}
        >
          ← Voltar para os planos
        </Link>

        <p
          style={{
            color: "#ea580c",
            fontSize: "13px",
            fontWeight: 800,
            letterSpacing: "2px",
            textTransform: "uppercase",
            marginBottom: "10px",
          }}
        >
          Cadastro do Clube de Membros
        </p>

        <h1 style={{ fontSize: "28px", margin: "0 0 10px", color: "#111827" }}>
          Plano {nomePlano}
        </h1>

        <p style={{ color: "#52525b", fontSize: "15px", lineHeight: "22px", marginBottom: "24px" }}>
          Preencha seus dados para continuar. Esses dados serão usados para
          identificar o titular da cobrança recorrente no cartão de crédito.
        </p>

        <form onSubmit={continuarParaPagamento}>
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Nome completo</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Digite seu nome completo"
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seuemail@exemplo.com"
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>WhatsApp</label>
            <input
              type="tel"
              value={whatsapp}
              onChange={(e) => setWhatsapp(formatarTelefone(e.target.value))}
              placeholder="(79) 99999-9999"
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: "22px" }}>
            <label style={labelStyle}>CPF</label>
            <input
              type="text"
              value={cpf}
              onChange={(e) => setCpf(formatarCpf(e.target.value))}
              placeholder="000.000.000-00"
              style={inputStyle}
            />
            <p style={{ marginTop: "6px", fontSize: "13px", color: "#71717a" }}>
              Usado para identificar o titular da assinatura recorrente.
            </p>
          </div>

          {erro && (
            <div
              style={{
                background: "#fee2e2",
                color: "#991b1b",
                border: "1px solid #fecaca",
                borderRadius: "12px",
                padding: "12px",
                fontSize: "14px",
                fontWeight: 700,
                marginBottom: "16px",
                textAlign: "center",
              }}
            >
              {erro}
            </div>
          )}

          <button
            type="submit"
            style={{
              display: "block",
              width: "100%",
              boxSizing: "border-box",
              textAlign: "center",
              borderRadius: "12px",
              background: "#ea580c",
              color: "#ffffff",
              padding: "15px 18px",
              fontSize: "16px",
              fontWeight: 900,
              border: "none",
              cursor: "pointer",
            }}
          >
            Continuar para pagamento
          </button>
        </form>
      </section>
    </main>
  );
}

const labelStyle = {
  display: "block",
  fontSize: "13px",
  fontWeight: 800,
  textTransform: "uppercase" as const,
  letterSpacing: "0.5px",
  color: "#52525b",
  marginBottom: "6px",
};

const inputStyle = {
  width: "100%",
  boxSizing: "border-box" as const,
  padding: "14px 16px",
  borderRadius: "12px",
  border: "1px solid #e4e4e7",
  fontSize: "15px",
  color: "#18181b",
  outline: "none",
};
