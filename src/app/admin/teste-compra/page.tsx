import Image from "next/image";
import Link from "next/link";
import { produtos } from "@/data/produtos";
import { gerarUrlCheckout } from "@/lib/checkout";
import { verificarAdmin } from "@/app/admin/lib/auth";

export default async function TestesCompraAdminPage() {
  await verificarAdmin("/admin/teste-compra");

  const produtosTesteAdmin = produtos.map((produto) => ({
    ...produto,
    valor: 1,
    valorMembro: produto.valorMembro ? 1 : undefined,
  }));

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-10 text-white">
      <section className="mx-auto max-w-6xl">
        <div className="mb-8 rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-5">
          <h1 className="mb-3 text-3xl font-bold text-yellow-400">
            Modo Teste/Admin de Compras
          </h1>

          <p className="text-zinc-300">
            Área exclusiva para testar compras no site. Todos os produtos nesta
            tela estão com valor de teste de <strong>R$ 1,00</strong>.
          </p>

          <p className="mt-2 text-sm text-zinc-400">
            Essa alteração vale somente para esta página administrativa e não
            altera os valores reais exibidos no site.
          </p>

          <div className="mt-5">
            <Link
              href="/"
              className="inline-flex rounded-xl bg-white px-4 py-3 text-sm font-bold text-black transition hover:bg-zinc-200"
            >
              Voltar para o site
            </Link>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {produtosTesteAdmin.map((produto) => {
            const urlCompraNormal = gerarUrlCheckout({
              produto,
              membro: false,
              modoAdmin: true,
            });

            const urlCompraMembro = gerarUrlCheckout({
              produto,
              membro: true,
              modoAdmin: true,
            });

            return (
              <div
                key={produto.id}
                className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 shadow-lg"
              >
                {produto.imagem && (
                  <div className="relative mb-4 h-56 w-full overflow-hidden rounded-xl bg-white p-2">
                    <Image
                      src={produto.imagem}
                      alt={produto.titulo}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-contain p-2"
                      unoptimized
                    />
                  </div>
                )}

                <span className="mb-2 inline-block rounded-full bg-yellow-500 px-3 py-1 text-xs font-bold uppercase text-black">
                  {produto.tipo}
                </span>

                <h2 className="text-xl font-bold">{produto.titulo}</h2>

                {produto.descricao && (
                  <p className="mt-2 text-sm text-zinc-400">
                    {produto.descricao}
                  </p>
                )}

                <div className="mt-4 rounded-xl bg-zinc-950 p-4">
                  <p className="text-sm text-zinc-400">Valor de teste:</p>

                  <p className="text-2xl font-bold text-yellow-400">
                    R$ {produto.valor.toFixed(2).replace(".", ",")}
                  </p>

                  {produto.valorMembro && (
                    <p className="mt-2 text-sm text-zinc-300">
                      Valor membro teste:{" "}
                      <strong>
                        R$ {produto.valorMembro.toFixed(2).replace(".", ",")}
                      </strong>
                    </p>
                  )}
                </div>

                <div className="mt-5 flex flex-col gap-3">
                  <Link
                    href={urlCompraNormal}
                    className="rounded-xl bg-white px-4 py-3 text-center font-bold text-black transition hover:bg-zinc-200"
                  >
                    Testar compra normal por R$ 1,00
                  </Link>

                  {produto.valorMembro && (
                    <Link
                      href={urlCompraMembro}
                      className="rounded-xl bg-yellow-500 px-4 py-3 text-center font-bold text-black transition hover:bg-yellow-400"
                    >
                      Testar compra membro por R$ 1,00
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
