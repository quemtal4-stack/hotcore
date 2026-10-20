"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

const PLANOS_INFO = {
  apoiador: {
    nome: "Apoiador",
    valorTexto: "R$ 19,90/mês",
    valorNumero: 19.9,
    descricao: "Plano ideal para entrar no Clube Hot Dogueres e apoiar o projeto.",
  },
  lendario: {
    nome: "Lendário",
    valorTexto: "R$ 29,90/mês",
    valorNumero: 29.9,
    descricao: "Plano para quem quer se tornar uma lenda do Clube Hot Dogueres.",
  },
  fundador: {
    nome: "Fundador",
    valorTexto: "R$ 39,90/mês",
    valorNumero: 39.9,
    descricao: "Plano especial para quem quer apoiar ainda mais o Hot Dogueres.",
  },
  colecionador: {
    nome: "Colecionador",
    valorTexto: "R$ 59,90/mês",
    valorNumero: 59.9,
    descricao: "Plano para quem quer colecionar vantagens exclusivas do Clube.",
  },
  guardiao: {
    nome: "Guardião",
    valorTexto: "R$ 89,90/mês",
    valorNumero: 89.9,
    descricao: "Plano para os guardiões do Hot Dogueres, com os maiores benefícios.",
  },
  eternizado: {
    nome: "Eternizados",
    valorTexto: "R$ 497,00 ao ano",
    valorNumero: 497.0,
    descricao: "Plano premium para quem quer ficar marcado na história do Hot Dogueres.",
  },
} as const;

export default function PagamentoClubePage() {
  return (
    <Suspense
      fallback={
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
              background: "#ffffff",
              color: "#18181b",
              borderRadius: "24px",
              padding: "32px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
              fontWeight: 800,
            }}
          >
            Carregando pagamento...
          </section>
        </main>
      }
    >
      <PagamentoClubeConteudo />
    </Suspense>
  );
}

function PagamentoClubeConteudo() {
  const searchParams = useSearchParams();

  const plano = searchParams.get("plano") ?? "apoiador";
  const nome = searchParams.get("nome") ?? "";
  const email = searchParams.get("email") ?? "";
  const whatsapp = searchParams.get("whatsapp") ?? "";

  // Modo admin de teste: ?admin=true&valor=1
  const modoAdminTeste =
    searchParams.get("admin") === "true" || searchParams.get("teste") === "true";
  const valorAdminParam = Number(searchParams.get("valor"));
  const valorAdminTeste =
    modoAdminTeste && Number.isFinite(valorAdminParam) && valorAdminParam > 0
      ? valorAdminParam
      : null;

  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  const planoChave = (plano in PLANOS_INFO ? plano : "apoiador") as keyof typeof PLANOS_INFO;
  const dadosPlano = PLANOS_INFO[planoChave];

  const valorParaCobranca =
    modoAdminTeste && valorAdminTeste !== null ? valorAdminTeste : dadosPlano.valorNumero;

  async function pagarComMercadoPago() {
    try {
      setCarregando(true);
      setErro("");

      if (!email) {
        throw new Error("E-mail do comprador é obrigatório.");
      }

      const resposta = await fetch("/api/mercado-pago/assinatura", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tipo: "clube_membro_assinatura",
          plano,
          nomeComprador: nome,
          emailComprador: email,
          whatsapp,
          quantidade: 1,
          valor: valorParaCobranca,
          total: valorParaCobranca,
          titulo: `Clube Hot Dogueres - Plano ${dadosPlano.nome}`,
          descricao: dadosPlano.descricao,
          itemId: `clube-${plano}`,
        }),
      });

      const texto = await resposta.text();

      console.log("STATUS API:", resposta.status);
      console.log("RESPOSTA BRUTA API:", texto);

      let dados: {
        url?: string;
        error?: unknown;
        detalhe?: unknown;
      } = {};

      try {
        dados = texto ? JSON.parse(texto) : {};
      } catch {
        throw new Error(
          `A API não retornou JSON. Status: ${resposta.status}. Veja o console para a resposta bruta.`
        );
      }

      if (!resposta.ok) {
        const mensagemErro =
          typeof dados.detalhe === "string"
            ? dados.detalhe
            : dados.detalhe
              ? JSON.stringify(dados.detalhe, null, 2)
              : typeof dados.error === "string"
                ? dados.error
                : dados.error
                  ? JSON.stringify(dados.error, null, 2)
                  : "Erro ao criar assinatura.";

        throw new Error(mensagemErro);
      }

      if (!dados.url) {
        throw new Error("URL do Mercado Pago não encontrada.");
      }

      window.location.href = dados.url;
    } catch (error) {
      console.error("Erro Mercado Pago Clube:", error);

      setErro(
        error instanceof Error ? error.message : "Erro ao conectar com o Mercado Pago."
      );
    } finally {
      setCarregando(false);
    }
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
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Link
        href="/clube-de-membros#planos"
        style={{
          position: "absolute",
          top: "24px",
          left: "24px",
          zIndex: 10,
          background: "#ffffff",
          color: "#18181b",
          textDecoration: "none",
          padding: "12px 18px",
          borderRadius: "999px",
          fontSize: "14px",
          fontWeight: 800,
          boxShadow: "0 10px 30px rgba(0,0,0,0.20)",
          border: "2px solid rgba(0,0,0,0.08)",
        }}
      >
        ← Voltar para os planos
      </Link>

      <Image
        src="/mascote-esquerda.png"
        alt="Mascote Hot Dogueres"
        width={500}
        height={500}
        priority
        style={{
          position: "absolute",
          left: "120px",
          bottom: "20px",
          width: "500px",
          maxWidth: "34vw",
          height: "auto",
          zIndex: 1,
        }}
      />

      <Image
        src="/mascote-direita.png"
        alt="Mascote Hot Dogueres"
        width={500}
        height={500}
        priority
        style={{
          position: "absolute",
          right: "120px",
          bottom: "20px",
          width: "500px",
          maxWidth: "34vw",
          height: "auto",
          zIndex: 1,
        }}
      />

      <section
        style={{
          width: "100%",
          maxWidth: "560px",
          background: "#ffffff",
          color: "#18181b",
          borderRadius: "24px",
          padding: "32px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
          position: "relative",
          zIndex: 2,
        }}
      >
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
          Pagamento
        </p>

        <h1
          style={{
            fontSize: "30px",
            margin: "0 0 12px",
            color: "#111827",
          }}
        >
          Finalizar plano {dadosPlano.nome}
        </h1>

        <p
          style={{
            color: "#52525b",
            fontSize: "16px",
            lineHeight: "24px",
            marginBottom: "24px",
          }}
        >
          {dadosPlano.descricao}
        </p>

        {modoAdminTeste && (
          <div
            style={{
              background: "#fef3c7",
              color: "#92400e",
              borderRadius: "10px",
              padding: "10px",
              fontSize: "13px",
              fontWeight: 800,
              textAlign: "center",
              marginBottom: "16px",
            }}
          >
            ⚠️ Modo teste admin ativo — cobrança de R$ {valorParaCobranca.toFixed(2)} em
            vez do valor real do plano
          </div>
        )}

        <div
          style={{
            background: "#f9fafb",
            border: "1px solid #e4e4e7",
            borderRadius: "18px",
            padding: "20px",
            marginBottom: "22px",
          }}
        >
          <div style={linhaResumo}>
            <strong>Nome:</strong>
            <span>{nome || "Não informado"}</span>
          </div>

          <div style={linhaResumo}>
            <strong>E-mail:</strong>
            <span>{email || "Não informado"}</span>
          </div>

          <div style={linhaResumo}>
            <strong>Plano:</strong>
            <span>{dadosPlano.nome}</span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "16px",
              borderTop: "1px solid #e4e4e7",
              paddingTop: "14px",
              marginTop: "14px",
              fontSize: "22px",
              fontWeight: 900,
              color: "#ea580c",
            }}
          >
            <strong>{plano === "eternizado" ? "Anuidade:" : "Mensalidade:"}</strong>
            <span>
              {modoAdminTeste
                ? `R$ ${valorParaCobranca.toFixed(2)}`
                : dadosPlano.valorTexto}
            </span>
          </div>
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
              marginBottom: "14px",
              textAlign: "center",
              whiteSpace: "pre-wrap",
            }}
          >
            {erro}
          </div>
        )}

        <button
          type="button"
          onClick={pagarComMercadoPago}
          disabled={carregando}
          style={{
            display: "block",
            width: "100%",
            boxSizing: "border-box",
            textAlign: "center",
            borderRadius: "12px",
            background: carregando ? "#71717a" : "#009ee3",
            color: "#ffffff",
            padding: "15px 18px",
            fontSize: "16px",
            fontWeight: 900,
            border: "none",
            cursor: carregando ? "not-allowed" : "pointer",
            marginBottom: "14px",
          }}
        >
          {carregando
            ? "Abrindo assinatura no Mercado Pago..."
            : "Assinar com cobrança automática"}
        </button>

        <Link
          href={`/cadastro?plano=${plano}`}
          style={{
            display: "block",
            width: "100%",
            boxSizing: "border-box",
            textAlign: "center",
            borderRadius: "12px",
            background: "#18181b",
            color: "#ffffff",
            padding: "15px 18px",
            fontSize: "16px",
            fontWeight: 900,
            textDecoration: "none",
            marginBottom: "14px",
          }}
        >
          Corrigir cadastro
        </Link>

        <Link
          href="/clube-de-membros#planos"
          style={{
            display: "block",
            textAlign: "center",
            color: "#ea580c",
            fontSize: "14px",
            fontWeight: 800,
            textDecoration: "none",
          }}
        >
          ← Escolher outro plano
        </Link>
      </section>
    </main>
  );
}

const linhaResumo = {
  display: "flex",
  justifyContent: "space-between",
  gap: "16px",
  marginBottom: "12px",
} as const;
