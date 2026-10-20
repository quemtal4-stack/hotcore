import Link from 'next/link';

export default function PagamentoSucessoPage() {
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
        <h1
          style={{
            fontSize: '32px',
            marginBottom: '12px',
            color: '#16a34a',
          }}
        >
          Assinatura iniciada!
        </h1>

        <p
          style={{
            color: '#52525b',
            fontSize: '16px',
            lineHeight: '24px',
            marginBottom: '24px',
          }}
        >
          Obrigado por fazer parte do Clube Hot Dogueres. Sua contribuição será
          processada automaticamente pelo Mercado Pago conforme o plano
          escolhido.
        </p>

        <Link
          href="/clube-de-membros"
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
          }}
        >
          Voltar para o Clube
        </Link>
      </section>
    </main>
  );
}
