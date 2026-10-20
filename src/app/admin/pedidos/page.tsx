import AdminHeader from "../_components/AdminHeader";
import { verificarAdmin } from "../_lib/auth";

const pedidos = [
  {
    id: "pedido-teste-001",
    cliente: "Cliente Teste",
    produto: "Camisa Hot Dogueres",
    valor: "R$ 1,00",
    status: "Aguardando integração com webhook",
    data: "Em breve",
  },
];

export default async function AdminPedidosPage() {
  await verificarAdmin("/admin/pedidos");

  return (
    <main className="min-h-screen bg-[#FFF8E7] px-4 py-8 text-gray-950 md:px-8">
      <div className="mx-auto max-w-7xl">
        <AdminHeader
          titulo="Pedidos"
          descricao="Acompanhe os pedidos feitos na loja, pagamentos do Mercado Pago e confirmações futuras do webhook."
        />

        <section className="grid gap-5">
          {pedidos.map((pedido) => (
            <article
              key={pedido.id}
              className="rounded-3xl bg-white p-6 shadow-xl"
            >
              <div className="grid gap-4 md:grid-cols-5 md:items-center">
                <div>
                  <p className="text-xs font-black uppercase text-gray-500">
                    Pedido
                  </p>
                  <p className="mt-1 font-black text-gray-950">{pedido.id}</p>
                </div>

                <div>
                  <p className="text-xs font-black uppercase text-gray-500">
                    Cliente
                  </p>
                  <p className="mt-1 font-black text-gray-950">
                    {pedido.cliente}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-black uppercase text-gray-500">
                    Produto
                  </p>
                  <p className="mt-1 font-black text-gray-950">
                    {pedido.produto}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-black uppercase text-gray-500">
                    Valor
                  </p>
                  <p className="mt-1 font-black text-green-700">
                    {pedido.valor}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-black uppercase text-gray-500">
                    Status
                  </p>
                  <p className="mt-1 rounded-full bg-yellow-100 px-4 py-2 text-xs font-black text-yellow-900">
                    {pedido.status}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="mt-8 rounded-3xl border-4 border-yellow-300 bg-yellow-50 p-6 shadow-xl">
          <h2 className="text-2xl font-black text-yellow-900">
            Próximo passo
          </h2>

          <p className="mt-3 text-sm font-bold leading-relaxed text-yellow-900">
            Depois vamos fazer o webhook salvar automaticamente cada pedido
            aprovado pelo Mercado Pago. Hoje o webhook já consulta o pagamento,
            mas ainda não grava em banco de dados.
          </p>
        </section>
      </div>
    </main>
  );
}
