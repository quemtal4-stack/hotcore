import Link from 'next/link';

export default function ClubeMembrosErroPage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #facc15, #fb923c)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <section
        style={{
          width: '100%',
          maxWidth: '560px',
          background: '#ffffff',
          color: '#18181b',
          borderRadius: '24px',
          padding: '32px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            display: 'inline-flex',
            background: '#dc2626',
            color: '#ffffff',
            borderRadius: '999px',
            padding: '8px 16px',
            fontSize: '12px',
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginBottom: '18px',
          }}
        >
          Pagamento não concluído
        </p>

        <h1
          style={{
            fontSize: '32px',
            margin: '0 0 12px',
            color: '#111827',
          }}
        >
          Não conseguimos confirmar seu pagamento
        </h1>

        <p
          style={{
            color: '#52525b',
            fontSize: '16px',
            lineHeight: '24px',
            marginBottom: '24px',
          }}
        >
          O pagamento não foi finalizado ou ocorreu algum problema na tentativa
          pelo Mercado Pago. Você pode escolher o plano novamente e tentar outra
          vez.
        </p>

        <Link
          href="/clube-de-membros#planos"
          style={{
            display: 'block',
            width: '100%',
            boxSizing: 'border-box',
            textAlign: 'center',
            borderRadius: '12px',
            background: '#ea580c',
            color: '#ffffff',
            padding: '15px 18px',
            fontSize: '16px',
            fontWeight: 900,
            textDecoration: 'none',
            marginBottom: '14px',
          }}
        >
          Tentar novamente
        </Link>

        <Link
          href="/clube-de-membros"
          style={{
            display: 'block',
            textAlign: 'center',
            color: '#ea580c',
            fontSize: '14px',
            fontWeight: 800,
            textDecoration: 'none',
          }}
        >
          ← Voltar para o Clube
        </Link>
      </section>
    </main>
  );
}
