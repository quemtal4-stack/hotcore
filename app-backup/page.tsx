export default function HomePage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #facc15, #fb923c)',
        fontFamily: 'Arial, sans-serif',
        padding: '32px',
        color: '#18181b',
      }}
    >
      <section
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          minHeight: 'calc(100vh - 64px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '40px',
        }}
      >
        <div style={{ maxWidth: '560px' }}>
          <p
            style={{
              color: '#7c2d12',
              fontSize: '14px',
              fontWeight: 900,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginBottom: '12px',
            }}
          >
            Clube Hot Dogueres
          </p>

          <h1
            style={{
              fontSize: '56px',
              lineHeight: '60px',
              margin: '0 0 20px',
              color: '#111827',
              fontWeight: 900,
            }}
          >
            Entre para o clube mais saboroso da cidade
          </h1>

          <p
            style={{
              fontSize: '20px',
              lineHeight: '30px',
              color: '#3f3f46',
              marginBottom: '32px',
            }}
          >
            Faça parte do Clube Hot Dogueres e tenha benefícios exclusivos,
            promoções especiais e novidades em primeira mão.
          </p>

          <div
            style={{
              display: 'flex',
              gap: '16px',
              flexWrap: 'wrap',
            }}
          >
            <a
              href="/clube/cadastro?plano=apoiador"
              style={{
                background: '#18181b',
                color: '#ffffff',
                padding: '16px 24px',
                borderRadius: '14px',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: 800,
                boxShadow: '0 12px 30px rgba(0,0,0,0.25)',
              }}
            >
              Entrar no plano apoiador
            </a>

            <a
              href="#planos"
              style={{
                background: '#ffffff',
                color: '#18181b',
                padding: '16px 24px',
                borderRadius: '14px',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: 800,
                boxShadow: '0 12px 30px rgba(0,0,0,0.15)',
              }}
            >
              Ver planos
            </a>
          </div>
        </div>

        <div
          style={{
            position: 'relative',
            width: '420px',
            height: '520px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src="/mascote-esquerda.png"
            alt="Mascote Hot Dogueres"
            style={{
              width: '430px',
              maxWidth: '100%',
              filter: 'drop-shadow(0 20px 35px rgba(0,0,0,0.25))',
            }}
          />
        </div>
      </section>

      <section
        id="planos"
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '40px 0 80px',
        }}
      >
        <h2
          style={{
            fontSize: '38px',
            marginBottom: '24px',
            color: '#111827',
          }}
        >
          Escolha seu plano
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px',
          }}
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: '24px',
              padding: '28px',
              boxShadow: '0 20px 50px rgba(0,0,0,0.18)',
            }}
          >
            <h3
              style={{
                fontSize: '26px',
                margin: '0 0 12px',
              }}
            >
              Plano Apoiador
            </h3>

            <p
              style={{
                color: '#52525b',
                lineHeight: '24px',
                marginBottom: '24px',
              }}
            >
              Ideal para quem quer fazer parte do clube e receber benefícios
              exclusivos.
            </p>

            <a
              href="/clube/cadastro?plano=apoiador"
              style={{
                display: 'block',
                textAlign: 'center',
                background: '#18181b',
                color: '#ffffff',
                padding: '14px 18px',
                borderRadius: '12px',
                textDecoration: 'none',
                fontWeight: 800,
              }}
            >
              Quero esse plano
            </a>
          </div>

          <div
            style={{
              background: '#ffffff',
              borderRadius: '24px',
              padding: '28px',
              boxShadow: '0 20px 50px rgba(0,0,0,0.18)',
            }}
          >
            <h3
              style={{
                fontSize: '26px',
                margin: '0 0 12px',
              }}
            >
              Plano Fã
            </h3>

            <p
              style={{
                color: '#52525b',
                lineHeight: '24px',
                marginBottom: '24px',
              }}
            >
              Para quem ama Hot Dogueres e quer receber ainda mais vantagens.
            </p>

            <a
              href="/clube/cadastro?plano=fa"
              style={{
                display: 'block',
                textAlign: 'center',
                background: '#18181b',
                color: '#ffffff',
                padding: '14px 18px',
                borderRadius: '12px',
                textDecoration: 'none',
                fontWeight: 800,
              }}
            >
              Quero esse plano
            </a>
          </div>

          <div
            style={{
              background: '#ffffff',
              borderRadius: '24px',
              padding: '28px',
              boxShadow: '0 20px 50px rgba(0,0,0,0.18)',
            }}
          >
            <h3
              style={{
                fontSize: '26px',
                margin: '0 0 12px',
              }}
            >
              Plano Premium
            </h3>

            <p
              style={{
                color: '#52525b',
                lineHeight: '24px',
                marginBottom: '24px',
              }}
            >
              O plano completo para quem quer ter acesso aos melhores benefícios.
            </p>

            <a
              href="/clube/cadastro?plano=premium"
              style={{
                display: 'block',
                textAlign: 'center',
                background: '#18181b',
                color: '#ffffff',
                padding: '14px 18px',
                borderRadius: '12px',
                textDecoration: 'none',
                fontWeight: 800,
              }}
            >
              Quero esse plano
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
  