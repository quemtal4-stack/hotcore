import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabaseServer";
import Link from "next/link";
import AdminHeader from "../_components/AdminHeader";


const cards = [
  {
    titulo: "Pedidos",
    descricao:
      "Acompanhe pedidos da loja, pagamentos aprovados e futuras integrações com webhook.",
    href: "/admin/pedidos",
    destaque: "Pedido teste ativo",
    cor: "bg-red-600",
  },
  {
    titulo: "Produtos",
    descricao:
      "Gerencie livros, ingressos, camisas, kits, clube de membros e programas mensais.",
    href: "/admin/produtos",
    destaque: "Catálogo em expansão",
    cor: "bg-yellow-500",
  },
  {
    titulo: "Impacto Social",
    descricao:
      "Controle ações sociais, doações, projetos de alimentação e campanhas solidárias.",
    href: "/admin/impacto-social",
    destaque: "Área estratégica",
    cor: "bg-green-600",
  },
  {
    titulo: "Lives",
    descricao:
      "Organize transmissões, bastidores, eventos online e conteúdos exclusivos.",
    href: "/admin/lives",
    destaque: "Conteúdo para membros",
    cor: "bg-purple-600",
  },
  {
    titulo: "Teste Compra",
    descricao:
      "Simule compras de produtos, kits, assinaturas e ofertas antes de liberar no site.",
    href: "/admin/teste-compra",
    destaque: "Ambiente de teste",
    cor: "bg-gray-950",
  },
];

const indicadores = [
  {
    label: "Pedidos",
    valor: "1",
    descricao: "Pedido teste cadastrado",
  },
  {
    label: "Produtos",
    valor: "8+",
    descricao: "Tipos de produtos planejados",
  },
  {
    label: "Assinaturas",
    valor: "2",
    descricao: "Clube e parceiros mensais",
  },
  {
    label: "Status",
    valor: "Teste",
    descricao: "Ambiente administrativo em preparação",
  },
];

export default async function AdminPainelPage() {
  const supabase = await createClient();
const { data } = await supabase.auth.getUser();

if (!data.user) {
  redirect("/admin/login");
}


  return (
    <main className="min-h-screen bg-[#FFF8E7] px-4 py-8 text-gray-950 md:px-8">
      <div className="mx-auto max-w-7xl">
        <AdminHeader
          titulo="Painel Administrativo"
          descricao="Visão geral da Hot Dogueres: pedidos, produtos, impacto social, lives, clube de membros e programas mensais."
        />

        <section className="mt-8 grid gap-4 md:grid-cols-4">
          {indicadores.map((item) => (
            <article
              key={item.label}
              className="rounded-3xl bg-white p-6 shadow-xl"
            >
              <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-500">
                {item.label}
              </p>

              <p className="mt-3 text-3xl font-black text-red-700">
                {item.valor}
              </p>

              <p className="mt-2 text-sm font-bold text-gray-600">
                {item.descricao}
              </p>
            </article>
          ))}
        </section>

        <section className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {cards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group rounded-3xl bg-white p-6 shadow-xl transition hover:-translate-y-1 hover:shadow-2xl"
            >
              <div
                className={`inline-flex rounded-full ${card.cor} px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-white`}
              >
                {card.destaque}
              </div>

              <h2 className="mt-5 text-2xl font-black text-gray-950">
                {card.titulo}
              </h2>

              <p className="mt-3 text-sm font-bold leading-relaxed text-gray-600">
                {card.descricao}
              </p>

              <p className="mt-6 text-sm font-black text-red-700 group-hover:text-red-900">
                Acessar área →
              </p>
            </Link>
          ))}
        </section>

        <section className="mt-8 rounded-3xl border-4 border-yellow-300 bg-yellow-50 p-6 shadow-xl">
          <h2 className="text-2xl font-black text-yellow-900">
            Organização recomendada
          </h2>

          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-white p-5">
              <h3 className="font-black text-gray-950">1. Produtos</h3>
              <p className="mt-2 text-sm font-bold text-gray-600">
                Cadastrar livros, ingressos, camisas, kits, clube de membros,
                programa de parceiros e plano de ração.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5">
              <h3 className="font-black text-gray-950">2. Teste de compra</h3>
              <p className="mt-2 text-sm font-bold text-gray-600">
                Simular compra dos principais produtos antes de liberar o fluxo
                oficial.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5">
              <h3 className="font-black text-gray-950">3. Webhook</h3>
              <p className="mt-2 text-sm font-bold text-gray-600">
                Depois conectar pagamentos aprovados do Mercado Pago com gravação
                automática dos pedidos.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
