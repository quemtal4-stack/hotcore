import { verificarAdmin } from "../lib/auth";
import { AdminHeader } from "../_components/AdminHeader";

const indicadores = [
  {
    titulo: "Famílias ajudadas",
    valor: "Em breve",
  },
  {
    titulo: "Cestas básicas destinadas",
    valor: "Em breve",
  },
  {
    titulo: "Animais de rua apoiados",
    valor: "Em breve",
  },
  {
    titulo: "Alimentos arrecadados",
    valor: "Em breve",
  },
];

const acoes = [
  {
    titulo: "Campanha de alimentos",
    status: "Planejamento",
  },
  {
    titulo: "Apoio a animais de rua",
    status: "Planejamento",
  },
  {
    titulo: "Doação vinculada ao Plano Eternizado",
    status: "Planejamento",
  },
];

export default async function AdminImpactoSocialPage() {
  const usuario = await verificarAdmin("/admin/impacto-social");

  return (
    <main className="min-h-screen bg-[#FFF8E7] px-4 py-8 text-gray-950 md:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <AdminHeader
          titulo="Impacto Social"
          subtitulo="Acompanhe números, ações solidárias, famílias ajudadas, alimentos arrecadados e impacto do projeto."
          usuario={usuario}
        />

        <section className="grid gap-5 md:grid-cols-4">
          {indicadores.map((indicador) => (
            <div
              key={indicador.titulo}
              className="rounded-3xl bg-white p-6 text-center shadow-xl"
            >
              <p className="text-sm font-black uppercase text-red-700">
                {indicador.titulo}
              </p>

              <p className="mt-4 text-3xl font-black text-gray-950">
                {indicador.valor}
              </p>
            </div>
          ))}
        </section>

        <section className="rounded-3xl bg-white p-6 shadow-xl">
          <h2 className="text-2xl font-black text-gray-950">
            Ações solidárias
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {acoes.map((acao) => (
              <article
                key={acao.titulo}
                className="rounded-2xl border border-green-200 bg-green-50 p-5"
              >
                <h3 className="text-lg font-black text-green-900">
                  {acao.titulo}
                </h3>

                <p className="mt-3 inline-block rounded-full bg-green-700 px-4 py-2 text-xs font-black text-white">
                  {acao.status}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border-4 border-green-200 bg-green-50 p-6 shadow-xl">
          <h2 className="text-2xl font-black text-green-900">
            Próximo passo
          </h2>

          <p className="mt-3 text-sm font-bold leading-relaxed text-green-900">
            Depois vamos permitir cadastrar ações reais, fotos, datas,
            quantidade de alimentos e atualizar automaticamente os números que
            aparecem no site.
          </p>
        </section>
      </div>
    </main>
  );
}
