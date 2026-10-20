import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, CategoriaLivro } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const categoria = searchParams.get("categoria");
    const somenteDisponiveis = searchParams.get("disponivel") !== "false";

    if (categoria && !Object.values(CategoriaLivro).includes(categoria as CategoriaLivro)) {
      return NextResponse.json(
        { error: `Categoria inválida. Use: ${Object.values(CategoriaLivro).join(", ")}` },
        { status: 400 }
      );
    }

    const livros = await prisma.livros.findMany({
      where: {
        ...(categoria && { categoria: categoria as CategoriaLivro }),
        ...(somenteDisponiveis && {
          OR: [
            { disponivel: true },
            { data_lancamento: { lte: new Date() } },
          ],
        }),
      },
      orderBy: [{ categoria: "asc" }, { numero_edicao: "asc" }],
    });

    return NextResponse.json({ livros, total: livros.length });
  } catch (error) {
    console.error("Erro ao buscar livros:", error);
    return NextResponse.json({ error: "Erro interno ao buscar livros" }, { status: 500 });
  }
}
