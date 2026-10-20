"use client";

const ingressos = [
  {
    nome: "Hotcore Starter",
    raridade: "Comum",
    lote: "Lote 001",
    descricao: "Ingresso inicial para acesso ao ecossistema Hotcore.",
    beneficios: ["Acesso básico", "Registro no ecossistema", "Identidade Hotcore"],
    cor: "#ffb703",
  },
  {
    nome: "Hotcore Collector",
    raridade: "Raro",
    lote: "Lote 001",
    descricao: "Ingresso colecionável com benefícios especiais para membros ativos.",
    beneficios: ["Acesso prioritário", "Badge colecionável", "Benefícios em eventos"],
    cor: "#fb5607",
  },
  {
    nome: "Hotcore Founder",
    raridade: "Lendário",
    lote: "Edição Fundador",
    descricao: "Ingresso exclusivo para participantes fundadores do ecossistema.",
    beneficios: ["Status fundador", "Benefícios vitalícios", "Prioridade em lançamentos"],
    cor: "#8338ec",
  },
];

export default function CadastroPage() {
  function selecionarIngresso(nome: string) {
    alert(`Você selecionou o ingresso: ${nome}`);
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #2b0000 0%, #090909 45%, #000000 100%)",
        color: "#ffffff",
        padding: "40px 20px",
      }}
    >
      <section
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <p
            style={{
              color: "#ffb703",
              fontWeight: "bold",
              letterSpacing: "2px",
              textTransform: "uppercase",
              marginBottom: "10px",
            }}
          >
            Ecossistema Hotcore
          </p>

          <h1
            style={{
              fontSize: "42px",
              margin: "0 0 14px",
            }}
          >
            Ingressos Colecionáveis
          </h1>

          <p
            style={{
              maxWidth: "680px",
              margin: "0 auto",
              color: "#d1d1d1",
              fontSize: "17px",
              lineHeight: "1.6",
            }}
          >
            Escolha seu ingresso digital colecionável e faça parte da base
            inicial do Hotcore. Cada ingresso representa acesso, identidade,
            raridade e participação dentro do ecossistema.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
          }}
        >
          {ingressos.map((ingresso) => (
            <article
              key={ingresso.nome}
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.10), rgba(255,255,255,0.03))",
                border: `1px solid ${ingresso.cor}`,
                borderRadius: "20px",
                padding: "24px",
                boxShadow: `0 0 28px ${ingresso.cor}33`,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-40px",
                  right: "-40px",
                  width: "120px",
                  height: "120px",
                  borderRadius: "999px",
                  background: ingresso.cor,
                  opacity: 0.18,
                }}
              />

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "18px",
                }}
              >
                <span
                  style={{
                    background: ingresso.cor,
                    color: "#000",
                    padding: "6px 10px",
                    borderRadius: "999px",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  {ingresso.raridade}
                </span>

                <span style={{ color: "#bbbbbb", fontSize: "13px" }}>
                  {ingresso.lote}
                </span>
              </div>

              <h2
                style={{
                  fontSize: "26px",
                  marginBottom: "12px",
                }}
              >
                {ingresso.nome}
              </h2>

              <p
                style={{
                  color: "#d6d6d6",
                  lineHeight: "1.5",
                  marginBottom: "20px",
                }}
              >
                {ingresso.descricao}
              </p>

              <ul
                style={{
                  paddingLeft: "18px",
                  marginBottom: "24px",
                  color: "#eeeeee",
                  lineHeight: "1.8",
                }}
              >
                {ingresso.beneficios.map((beneficio) => (
                  <li key={beneficio}>{beneficio}</li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => selecionarIngresso(ingresso.nome)}
                style={{
                  width: "100%",
                  padding: "14px",
                  border: "none",
                  borderRadius: "12px",
                  background: ingresso.cor,
                  color: "#000000",
                  fontWeight: "bold",
                  fontSize: "15px",
                  cursor: "pointer",
                }}
              >
                Selecionar ingresso
              </button>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
