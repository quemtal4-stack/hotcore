import { verificarAdmin } from "../lib/auth";
import { AdminHeader } from "../_components/AdminHeader";

const proximasLives = [
  {
    titulo: "Live de lançamento do Ecossistema",
    data: "Em breve",
    status: "Planejamento",
  },
  {
    titulo: "Live com parceiros e apoiadores",
    data: "Em breve",
    status: "Planejamento",
  },
  {
    titulo: "Live de atualização de impacto social",
    data: "Em breve",
    status: "Planejamento",
  },
];

export default async function AdminLivesPage() {
  const usuario = await verificarAdmin("/admin/lives");

  return (
    <main className="min-h-screen bg-[#FFF8E7] px-4 py-8 text-gray-950 md:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <AdminHeader
          titulo="Lives"
          subtitulo="Gerencie transmissões ao vivo, agendas, links do YouTube e coberturas de eventos."
          usuario={usuario}
        />

        <section className="rounded-3xl bg-white p-6 shadow-xl">
          <h2 className="text-2xl font-black text-gray-950">
            Próximas lives
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {proximasLives.map((live) => (
              <article
                key={live.titulo}
                className="rounded-2xl border border-purple-200 bg-purple-50 p-5"
              >
                <h3 className="text-lg font-black text-purple-900">
                  {live.titulo}
                </h3>

                <p className="mt-2 text-sm font-bold text-gray-600">
                  {live.data}
                </p>

                <p className="mt-3 inline-block rounded-full bg-purple-700 px-4 py-2 text-xs font-black text-white">
                  {live.status}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border-4 border-purple-200 bg-purple-50 p-6 shadow-xl">
          <h2 className="text-2xl font-black text-purple-900">
            Próximo passo
          </h2>

          <p className="mt-3 text-sm font-bold leading-relaxed text-purple-900">
            Depois vamos criar uma área para cadastrar lives, salvar o link do
            YouTube Live, agendar data/hora e exibir a transmissão automaticamente
            no site.
          </p>
        </section>
      </div>
    </main>
  );
}
