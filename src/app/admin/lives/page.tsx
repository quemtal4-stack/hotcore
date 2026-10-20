import AdminHeader from "../_components/AdminHeader";
import { verificarAdmin } from "../_lib/auth";

const lives = [
  {
    titulo: "Live de apresentação do Clube de Membros",
    data: "Em breve",
    status: "Planejada",
  },
  {
    titulo: "Bastidores Hot Dogueres",
    data: "Em breve",
    status: "Planejada",
  },
  {
    titulo: "Evento online para membros",
    data: "Em breve",
    status: "Futuro",
  },
];

export default async function AdminLivesPage() {
  await verificarAdmin("/admin/lives");

  return (
    <main className="min-h-screen bg-[#FFF8E7] px-4 py-8 text-gray-950 md:px-8">
      <div className="mx-auto max-w-7xl">
        <AdminHeader
          titulo="Lives"
          descricao="Área para organizar transmissões, bastidores, eventos online e conteúdos exclusivos para membros."
        />

        <section className="grid gap-6 md:grid-cols-3">
          {lives.map((live) => (
            <article
              key={live.titulo}
              className="rounded-3xl bg-white p-6 shadow-xl"
            >
              <p className="rounded-full bg-purple-100 px-4 py-2 text-xs font-black text-purple-800">
                {live.status}
              </p>

              <h2 className="mt-5 text-2xl font-black text-gray-950">
                {live.titulo}
              </h2>

              <p className="mt-4 text-sm font-bold text-gray-600">
                Data: {live.data}
              </p>
            </article>
          ))}
        </section>

        <section className="mt-8 rounded-3xl border-4 border-purple-200 bg-purple-50 p-6 shadow-xl">
          <h2 className="text-2xl font-black text-purple-900">
            Área do Membro Online
          </h2>

          <p className="mt-3 text-sm font-bold leading-relaxed text-purple-900">
            Essa área será importante para o futuro acesso online dos membros,
            com transmissões, bastidores e conteúdos exclusivos quando houver
            estrutura disponível.
          </p>
        </section>
      </div>
    </main>
  );
}
