import Link from 'next/link';
import { supabaseAdmin } from '@/lib/supabase-admin';

export default async function AdminClubeMembrosPage() {
  const { data: membros, error } = await supabaseAdmin
    .from('clube_membros')
    .select(
      `
      id,
      plano,
      valor,
      periodicidade,
      status,
      mercado_pago_preapproval_id,
      external_reference,
      created_at,
      pessoas (
        nome,
        email,
        whatsapp
      )
    `
    )
    .order('created_at', { ascending: false });

  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#f4f4f5',
        color: '#18181b',
        padding: '32px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <Link
          href="/"
          style={{
            display: 'inline-block',
            marginBottom: '24px',
            color: '#ea580c',
            fontWeight: 800,
            textDecoration: 'none',
          }}
        >
          ← Voltar para o site
        </Link>
<form action="/api/admin/logout" method="post" style={{ display: "inline-block", marginLeft: "12px" }}>
  <button
    type="submit"
    style={{
      background: "#18181b",
      color: "#fff",
      border: "0",
      borderRadius: "10px",
      padding: "10px 14px",
      fontWeight: 800,
      cursor: "pointer",
    }}
  >
    Sair do admin
  </button>
</form>

        <section
          style={{
            background: '#ffffff',
            borderRadius: '20px',
            padding: '28px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
          }}
        >
          <p
            style={{
              color: '#ea580c',
              fontSize: '13px',
              fontWeight: 900,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginBottom: '8px',
            }}
          >
            Administração
          </p>

          <h1
            style={{
              fontSize: '32px',
              margin: '0 0 8px',
            }}
          >
            Clube de Membros
          </h1>

          <p
            style={{
              color: '#52525b',
              marginBottom: '24px',
            }}
          >
            Lista de pessoas que iniciaram assinatura no Clube Hot Dogueres.
          </p>

          {error && (
            <div
              style={{
                background: '#fee2e2',
                color: '#991b1b',
                border: '1px solid #fecaca',
                borderRadius: '12px',
                padding: '14px',
                marginBottom: '20px',
                fontWeight: 700,
              }}
            >
              Erro ao carregar membros: {error.message}
            </div>
          )}

          <div
            style={{
              overflowX: 'auto',
            }}
          >
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '14px',
              }}
            >
              <thead>
                <tr
                  style={{
                    background: '#18181b',
                    color: '#ffffff',
                  }}
                >
                  <th style={th}>Nome</th>
                  <th style={th}>E-mail</th>
                  <th style={th}>WhatsApp</th>
                  <th style={th}>Plano</th>
                  <th style={th}>Valor</th>
                  <th style={th}>Período</th>
                  <th style={th}>Status</th>
                  <th style={th}>Data</th>
                </tr>
              </thead>

              <tbody>
                {(membros || []).map((membro: any) => {
                  const pessoa = membro.pessoas;

                  return (
                    <tr key={membro.id}>
                      <td style={td}>{pessoa?.nome || '-'}</td>
                      <td style={td}>{pessoa?.email || '-'}</td>
                      <td style={td}>{pessoa?.whatsapp || '-'}</td>
                      <td style={td}>{membro.plano}</td>
                      <td style={td}>
                        {Number(membro.valor).toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </td>
                      <td style={td}>{membro.periodicidade}</td>
                      <td style={td}>
                        <span
                          style={{
                            display: 'inline-block',
                            borderRadius: '999px',
                            padding: '6px 10px',
                            fontSize: '12px',
                            fontWeight: 900,
                            background:
                              membro.status === 'ativo'
                                ? '#dcfce7'
                                : membro.status === 'pendente'
                                  ? '#fef9c3'
                                  : '#e5e7eb',
                            color:
                              membro.status === 'ativo'
                                ? '#166534'
                                : membro.status === 'pendente'
                                  ? '#854d0e'
                                  : '#374151',
                          }}
                        >
                          {membro.status}
                        </span>
                      </td>
                      <td style={td}>
                        {new Date(membro.created_at).toLocaleDateString(
                          'pt-BR'
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {(!membros || membros.length === 0) && !error && (
            <p
              style={{
                textAlign: 'center',
                color: '#71717a',
                marginTop: '24px',
                fontWeight: 700,
              }}
            >
              Nenhum membro cadastrado ainda.
            </p>
          )}
        </section>
      </div>
    </main>
  );
}

const th = {
  padding: '12px',
  textAlign: 'left',
  borderBottom: '1px solid #e4e4e7',
} as const;

const td = {
  padding: '12px',
  borderBottom: '1px solid #e4e4e7',
  verticalAlign: 'top',
} as const;
