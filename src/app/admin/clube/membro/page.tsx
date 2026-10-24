import Link from "next/link";
import { redirect } from "next/navigation";
import { verificarAdmin } from "@/app/admin/lib/auth";
import { AdminHeader } from "@/app/admin/_components/AdminHeader";
import { supabaseAdmin } from "@/lib/supabase-admin";

type MembroComPessoa = {
  id: string;
  plano: string;
  valor: number;
  periodicidade: string;
  status: string;
  mercado_pago_preapproval_id: string | null;
  external_reference: string | null;
  created_at: string;
  pessoas: {
    nome: string | null;
    email: string | null;
    whatsapp: string | null;
  } | null;
};

function badgeStatus(status: string) {
  const classes = {
    ativo: "bg-green-100 text-green-800",
    pendente: "bg-yellow-100 text-yellow-800",
    cancelado: "bg-red-100 text-red-800",
    iniciando: "bg-gray-100 text-gray-800",
  } as Record<string, string>;

  return classes[status] || "bg-gray-100 text-gray-800";
}

export default async function AdminClubeMembrosPage() {
  const usuario = await verificarAdmin("/admin/clube/membro");

  const { data: membros, error } = await supabaseAdmin
    .from("clube_membros")
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
    `,
    )
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <AdminHeader
          titulo="Clube de Membros"
          subtitulo="Assinaturas ativas, pendentes e histórico de membros."
          usuario={usuario}
        />

        <section className="rounded-[2rem] bg-white p-6 shadow-xl md:p-8">
          {error && (
            <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-800">
              Erro ao carregar membros: {error.message}
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-950 text-left text-white">
                  <th className="p-4 font-black">Nome</th>
                  <th className="p-4 font-black">E-mail</th>
                  <th className="p-4 font-black">WhatsApp</th>
                  <th className="p-4 font-black">Plano</th>
                  <th className="p-4 font-black">Valor</th>
                  <th className="p-4 font-black">Período</th>
                  <th className="p-4 font-black">Status</th>
                  <th className="p-4 font-black">ID Mercado Pago</th>
                  <th className="p-4 font-black">Data</th>
                </tr>
              </thead>

              <tbody>
                {(membros as MembroComPessoa[] | null)?.map((membro) => {
                  const pessoa = membro.pessoas;

                  return (
                    <tr
                      key={membro.id}
                      className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50"
                    >
                      <td className="p-4 font-bold">{pessoa?.nome || "-"}</td>
                      <td className="p-4 text-gray-600">
                        {pessoa?.email || "-"}
                      </td>
                      <td className="p-4 text-gray-600">
                        {pessoa?.whatsapp || "-"}
                      </td>
                      <td className="p-4 font-black capitalize">
                        {membro.plano}
                      </td>
                      <td className="p-4 font-black">
                        {Number(membro.valor).toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </td>
                      <td className="p-4 capitalize">
                        {membro.periodicidade}
                      </td>
                      <td className="p-4">
                        <span
                          className={`inline-block rounded-full px-3 py-1 text-xs font-black ${badgeStatus(membro.status)}`}
                        >
                          {membro.status}
                        </span>
                      </td>
                      <td className="p-4">
                        {membro.mercado_pago_preapproval_id ? (
                          <Link
                            href={`https://www.mercadopago.com.br/subscriptions/${membro.mercado_pago_preapproval_id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {membro.mercado_pago_preapproval_id}
                          </Link>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="p-4 text-gray-600">
                        {new Date(membro.created_at).toLocaleDateString(
                          "pt-BR",
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {(!membros || membros.length === 0) && !error && (
            <p className="mt-6 text-center font-bold text-gray-500">
              Nenhum membro cadastrado ainda.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
