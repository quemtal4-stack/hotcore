import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { config } from "dotenv";

config({ path: ".env.local", override: true });
config({ path: ".env" });

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL não encontrada. Verifique o arquivo .env.local.");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Iniciando seed...");

  // ===== EVENTO PRINCIPAL =====
  let evento = await prisma.eventos.findFirst({
    where: {
      nome: "Hot Dog Day - Dia das Crianças 2027",
    },
  });

  if (!evento) {
    evento = await prisma.eventos.create({
      data: {
        nome: "Hot Dog Day - Dia das Crianças 2027",
        descricao: "Evento solidário com ingressos colecionáveis.",
        data_evento: new Date("2027-10-12T14:00:00-03:00"),
        local: "Aracaju",
        endereco: "Aracaju/SE",
        cidade: "Aracaju",
        estado: "SE",
        acao_solidaria: "Doação de alimentos",
        capacidade: 26150,
        total_ingressos: 26150,
        status: "ativo",
      },
    });

    console.log("Evento criado:", evento.nome);
  } else {
    console.log("Evento já existe:", evento.nome);
  }

  // ===== LOTES DE INGRESSOS =====
  const lotes = [
    {
      numero_lote: 0,
      nome: "Hot Dog Day - Edição Dia das Crianças",
      preco: "20.00",
      quantidade_total: 150,
      kg_doacao: "1.00",
      ordem_abertura: 0,
      status: "aberto",
      is_especial: false,
      requer_colecao_completa: false,
    },
    {
      numero_lote: 1,
      nome: "Ingresso Fundador",
      preco: "20.00",
      quantidade_total: 3000,
      kg_doacao: "1.00",
      ordem_abertura: 1,
      status: "aberto",
      is_especial: true,
      requer_colecao_completa: false,
    },
    {
      numero_lote: 2,
      nome: "Ingresso 2",
      preco: "20.00",
      quantidade_total: 5000,
      kg_doacao: "1.00",
      ordem_abertura: 2,
      status: "fechado",
      is_especial: false,
      requer_colecao_completa: false,
    },
    {
      numero_lote: 3,
      nome: "Ingresso 3",
      preco: "20.00",
      quantidade_total: 5000,
      kg_doacao: "1.00",
      ordem_abertura: 3,
      status: "fechado",
      is_especial: false,
      requer_colecao_completa: false,
    },
    {
      numero_lote: 4,
      nome: "Ingresso 4",
      preco: "20.00",
      quantidade_total: 5000,
      kg_doacao: "1.00",
      ordem_abertura: 4,
      status: "fechado",
      is_especial: false,
      requer_colecao_completa: false,
    },
    {
      numero_lote: 5,
      nome: "Ingresso 5",
      preco: "20.00",
      quantidade_total: 5000,
      kg_doacao: "1.00",
      ordem_abertura: 5,
      status: "fechado",
      is_especial: false,
      requer_colecao_completa: false,
    },
    {
      numero_lote: 6,
      nome: "Eternizados 250 Metros 2026",
      preco: "80.00",
      quantidade_total: 2000,
      kg_doacao: "3.00",
      ordem_abertura: 6,
      status: "fechado",
      is_especial: true,
      requer_colecao_completa: true,
    },
  ];

  for (const lote of lotes) {
    const existente = await prisma.lotes.findFirst({
      where: {
        evento_id: evento.id,
        numero_lote: lote.numero_lote,
      },
    });

    if (existente) {
      await prisma.lotes.update({
        where: {
          id: existente.id,
        },
        data: lote,
      });
    } else {
      await prisma.lotes.create({
        data: {
          ...lote,
          evento_id: evento.id,
        },
      });
    }
  }

  console.log("Lotes atualizados.");

  // ===== CAMISAS =====
  const camisas = [
    {
      nome: "Camisa Oficial - Algodão",
      descricao: "Camisa oficial 100% algodão. Entrega no evento Dia das Crianças.",
      tecido: "ALGODAO",
      preco: "89.90",
      imagem_url: null,
    },
    {
      nome: "Camisa Game - Dry Fit",
      descricao: "Camisa Game em tecido Dry Fit. Entrega no evento Dia das Crianças.",
      tecido: "DRY_FIT",
      preco: "89.90",
      imagem_url: null,
    },
  ];

  const tamanhos = ["PP", "P", "M", "G", "GG", "XG"];

  for (const camisaData of camisas) {
    let camisa = await prisma.camisas.findFirst({
      where: {
        evento_id: evento.id,
        nome: camisaData.nome,
      },
    });

    if (camisa) {
      camisa = await prisma.camisas.update({
        where: {
          id: camisa.id,
        },
        data: {
          ...camisaData,
          pre_venda_ini: new Date(),
          pre_venda_fim: new Date("2026-09-25T23:59:59-03:00"),
          data_entrega: new Date("2026-10-12T00:00:00-03:00"),
          ativo: true,
        },
      });
    } else {
      camisa = await prisma.camisas.create({
        data: {
          ...camisaData,
          evento_id: evento.id,
          pre_venda_ini: new Date(),
          pre_venda_fim: new Date("2026-09-25T23:59:59-03:00"),
          data_entrega: new Date("2026-10-12T00:00:00-03:00"),
          ativo: true,
        },
      });
    }

    for (const tamanho of tamanhos) {
      await prisma.camisa_tamanhos.upsert({
        where: {
          camisa_id_tamanho: {
            camisa_id: camisa.id,
            tamanho,
          },
        },
        update: {
          quantidade_total: 100,
        },
        create: {
          camisa_id: camisa.id,
          tamanho,
          quantidade_total: 100,
        },
      });
    }
  }

  console.log("Camisas e tamanhos atualizados.");

  // ===== PLANOS DO CLUBE =====
  const planos = [
    {
      nome: "Básico",
      descricao: "Plano mensal básico com benefícios exclusivos.",
      preco: "19.90",
      ciclo: "MENSAL",
    },
    {
      nome: "Plus",
      descricao: "Plano mensal Plus com benefícios ampliados.",
      preco: "39.90",
      ciclo: "MENSAL",
    },
    {
      nome: "Anual",
      descricao: "Plano anual com todos os benefícios e maior economia.",
      preco: "497.90",
      ciclo: "ANUAL",
    },
  ];

  for (const plano of planos) {
    const existente = await prisma.planos_clube.findFirst({
      where: {
        nome: plano.nome,
      },
    });

    if (existente) {
      await prisma.planos_clube.update({
        where: {
          id: existente.id,
        },
        data: {
          ...plano,
          ativo: true,
        },
      });
    } else {
      await prisma.planos_clube.create({
        data: {
          ...plano,
          ativo: true,
        },
      });
    }
  }

  console.log("Planos do clube atualizados.");

  // ===== KITS DE ALIMENTAÇÃO =====
  const kits = [
    {
      nome: "Kit Esperança",
      categoria: "HUMANO",
      preco: "25.00",
      kg_doacao: "2.00",
    },
    {
      nome: "Kit Solidariedade",
      categoria: "HUMANO",
      preco: "55.00",
      kg_doacao: "5.00",
    },
    {
      nome: "Kit Comunidade",
      categoria: "HUMANO",
      preco: "120.00",
      kg_doacao: "10.00",
    },
    {
      nome: "Kit Família - Cesta Básica",
      categoria: "HUMANO",
      preco: "150.00",
      kg_doacao: "0.00",
    },
    {
      nome: "Kit Pet Solidário",
      categoria: "PET",
      preco: "25.00",
      kg_doacao: "1.00",
    },
    {
      nome: "Kit Pet Esperança",
      categoria: "PET",
      preco: "75.00",
      kg_doacao: "5.00",
    },
    {
      nome: "Kit Pet Comunidade",
      categoria: "PET",
      preco: "150.00",
      kg_doacao: "10.00",
    },
    {
      nome: "Kit Pet ONG",
      categoria: "PET",
      preco: "285.00",
      kg_doacao: "20.00",
    },
  ];

  for (const kit of kits) {
    const existente = await prisma.kits_alimentacao.findFirst({
      where: {
        nome: kit.nome,
      },
    });

    if (existente) {
      await prisma.kits_alimentacao.update({
        where: {
          id: existente.id,
        },
        data: {
          ...kit,
          ativo: true,
        },
      });
    } else {
      await prisma.kits_alimentacao.create({
        data: {
          ...kit,
          ativo: true,
        },
      });
    }
  }

  console.log("Kits de alimentação atualizados.");

  // ===== LIVROS =====
  const livros = [
    {
      nome: "Kit Jornada Hot Dogueres - 1ª Edição",
      categoria: "JORNADA_HOT_DOGUERES" as const,
      numero_edicao: 1,
      descricao: "Caixa Box + Livro 1ª Edição + Adesivos.",
      inclui_box: true,
      preco_nao_membro: "149.90",
      preco_membro: "139.90",
      disponivel: true,
      data_lancamento: null,
    },
    {
      nome: "Kit Jornada Hot Dogueres - 2ª Edição",
      categoria: "JORNADA_HOT_DOGUERES" as const,
      numero_edicao: 2,
      descricao: "Livro 2ª Edição.",
      inclui_box: false,
      preco_nao_membro: "99.90",
      preco_membro: "89.90",
      disponivel: true,
      data_lancamento: null,
    },
    {
      nome: "Livro Infantil - Edição 1",
      categoria: "INFANTIL" as const,
      numero_edicao: 1,
      descricao: "Primeira edição da coleção infantil.",
      inclui_box: false,
      preco_nao_membro: "39.90",
      preco_membro: "34.90",
      disponivel: false,
      data_lancamento: new Date("2026-10-01T00:00:00-03:00"),
    },
    {
      nome: "Livro Infantil - Edição 2",
      categoria: "INFANTIL" as const,
      numero_edicao: 2,
      descricao: "Segunda edição da coleção infantil.",
      inclui_box: false,
      preco_nao_membro: "39.90",
      preco_membro: "34.90",
      disponivel: false,
      data_lancamento: new Date("2026-11-01T00:00:00-03:00"),
    },
    {
      nome: "Livro Infantil - Edição 3",
      categoria: "INFANTIL" as const,
      numero_edicao: 3,
      descricao: "Terceira edição da coleção infantil.",
      inclui_box: false,
      preco_nao_membro: "39.90",
      preco_membro: "34.90",
      disponivel: false,
      data_lancamento: new Date("2026-12-01T00:00:00-03:00"),
    },
  ];

  for (const livro of livros) {
    const existente = await prisma.livros.findFirst({
      where: {
        categoria: livro.categoria,
        numero_edicao: livro.numero_edicao,
      },
    });

    if (existente) {
      await prisma.livros.update({
        where: {
          id: existente.id,
        },
        data: {
          ...livro,
          ativo: true,
        },
      });
    } else {
      await prisma.livros.create({
        data: {
          ...livro,
          ativo: true,
        },
      });
    }
  }

  console.log("Livros atualizados.");

  console.log("Seed finalizado com sucesso.");
}

main()
  .catch((error) => {
    console.error("Erro ao executar seed:");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
