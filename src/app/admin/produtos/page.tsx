import AdminHeader from "../_components/AdminHeader";
import { verificarAdmin } from "../_lib/auth";

const produtos = [
  {
    nome: "Camisa Hot Dogueres",
    tipo: "Loja Solidária",
    status: "Ativo",
    observacao: "Produto usado no checkout atual para o primeiro teste de compra.",
    destaque: "Checkout atual",
  },
  {
    nome: "Livro Hot Dogueres",
    tipo: "Livro / Produto Solidário",
    status: "Em preparação",
    observacao:
      "Produto editorial para contar a história, fortalecer a marca e gerar arrecadação para o projeto.",
    destaque: "Adicionar ao site",
  },
  {
    nome: "Ingressos Colecionáveis 2027",
    tipo: "Área do Colecionador",
    status: "Em preparação",
    observacao:
      "Coleção com ingressos oficiais para apoiadores, membros e colecionadores.",
    destaque: "Coleção especial",
  },
  {
    nome: "Kit Alimentação",
    tipo: "Doação Solidária",
    status: "Em preparação",
    observacao:
      "Kit voltado para arrecadação de alimentos e apoio às ações sociais da Hot Dogueres.",
    destaque: "Impacto social",
  },
  {
    nome: "Kit Ração",
    tipo: "Doação Animal",
    status: "Em preparação",
    observacao:
      "Kit para apoiar animais em situação de vulnerabilidade com compra ou doação de ração.",
    destaque: "Projeto ração",
  },
  {
    nome: "Clube de Membros",
    tipo: "Assinatura",
    status: "Em preparação",
    observacao:
      "Planos para apoiadores recorrentes, com benefícios, bastidores e acesso futuro à área online.",
    destaque: "Receita recorrente",
  },
  {
    nome: "Programa de Parceiros Empresa",
    tipo: "Assinatura Empresarial",
    status: "Planejado",
    observacao:
      "Plano mensal para empresas parceiras, com contribuição recorrente entre R$ 8.000 e R$ 10.000 por mês.",
    destaque: "Parceria mensal",
  },
  {
    nome: "Projeto Ração",
    tipo: "Campanha Permanente",
    status: "Planejado",
    observacao:
      "Campanha fixa para arrecadar, comprar e distribuir ração através das ações da Hot Dogueres.",
    destaque: "Nova área no site",
  },
];

export default async function AdminProdutosPage() {
  await verificarAdmin("/admin/produtos");

  return (
    <main className="min-h-screen bg-[#FFF8E7] px-4 py-8 text-gray-950 md:px-8">
      <div className="mx-auto max-w-7xl">
        <AdminHeader
          titulo="Produtos"
          descricao="Gerencie produtos da loja, livros, ingressos, kits solidários, clube de membros, projeto ração e programa de parceiros."
        />

        <section className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {produtos.map((produto) => (
            <article
              key={produto.nome}
              className="flex flex-col rounded-3xl bg-white p-6 shadow-xl"
            >
              <div className="flex flex-wrap gap-2">
                <p className="rounded-full bg-red-100 px-4 py-2 text-xs font-black text-red-700">
                  {produto.tipo}
                </p>

                <p className="rounded-full bg-yellow-100 px-4 py-2 text-xs font-black text-yellow-900">
                  {produto.destaque}
                </p>
              </div>

              <h2 className="mt-5 text-2xl font-black text-gray-950">
                {produto.nome}
              </h2>

              <p className="mt-4 flex-1 text-sm font-bold leading-relaxed text-gray-600">
                {produto.observacao}
              </p>

              <div className="mt-6 rounded-2xl bg-green-100 p-4">
                <p className="text-xs font-black uppercase text-green-800">
                  Status
                </p>

                <p className="mt-1 font-black text-green-900">
                  {produto.status}
                </p>
              </div>
            </article>
          ))}
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <article className="rounded-3xl border-4 border-red-100 bg-white p-6 shadow-xl">
            <h2 className="text-2xl font-black text-red-700">
              Cadastro real de produtos
            </h2>

            <p className="mt-3 text-sm font-bold leading-relaxed text-gray-700">
              Essa tela já organiza todos os produtos e programas da Hot
              Dogueres. Depois podemos conectar com banco de dados para cadastrar
              preço, estoque, imagem, descrição, status, categoria e link de
              checkout.
            </p>
          </article>

          <article className="rounded-3xl border-4 border-yellow-300 bg-yellow-50 p-6 shadow-xl">
            <h2 className="text-2xl font-black text-yellow-900">
              Itens que precisam entrar no site
            </h2>

            <ul className="mt-4 grid gap-3 text-sm font-black text-yellow-950">
              <li>Livro Hot Dogueres.</li>
              <li>Kit Alimentação.</li>
              <li>Kit Ração.</li>
              <li>Projeto Ração.</li>
              <li>Programa de Parceiros Empresa.</li>
              <li>Clube de Membros com assinatura recorrente.</li>
            </ul>
          </article>
        </section>
      </div>
    </main>
  );
}
