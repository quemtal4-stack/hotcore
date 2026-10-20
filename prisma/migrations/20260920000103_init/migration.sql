-- CreateEnum
CREATE TYPE "CategoriaLivro" AS ENUM ('JORNADA_HOT_DOGUERES', 'INFANTIL', 'INFANTO_JUVENIL');
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CreateTable
CREATE TABLE "usuarios" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "auth_id" UUID,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT,
    "cpf" TEXT,
    "avatar_url" TEXT,
    "tipo" TEXT DEFAULT 'comprador',
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" TEXT NOT NULL,
    "name" TEXT,
    "avatar_url" TEXT,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "eventos" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "data_evento" TIMESTAMPTZ(6) NOT NULL,
    "local" TEXT NOT NULL,
    "endereco" TEXT,
    "cidade" TEXT DEFAULT 'Aracaju',
    "estado" TEXT DEFAULT 'SE',
    "imagem_url" TEXT,
    "capacidade" INTEGER DEFAULT 0,
    "status" TEXT DEFAULT 'ativo',
    "organizador_id" UUID,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "acao_solidaria" TEXT,
    "total_ingressos" INTEGER,
    "hora_evento" TIME(6),

    CONSTRAINT "eventos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lotes" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "evento_id" UUID,
    "numero_lote" INTEGER NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "preco" DECIMAL(10,2) NOT NULL,
    "quantidade_total" INTEGER NOT NULL,
    "quantidade_vendida" INTEGER DEFAULT 0,
    "is_especial" BOOLEAN DEFAULT false,
    "requer_colecao_completa" BOOLEAN DEFAULT false,
    "status" VARCHAR(20) DEFAULT 'fechado',
    "ordem_abertura" INTEGER,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "kg_doacao" DECIMAL(5,2) DEFAULT 1.00,

    CONSTRAINT "lotes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "modelos_ingresso" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "evento_id" UUID,
    "numero" INTEGER NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "descricao" TEXT,
    "imagem_url" TEXT,
    "preco" DECIMAL(10,2) NOT NULL,
    "quantidade_total" INTEGER NOT NULL,
    "quantidade_vendida" INTEGER DEFAULT 0,
    "tipo" VARCHAR(20) DEFAULT 'normal',
    "requer_colecao_completa" BOOLEAN DEFAULT false,
    "ativo" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "numero_modelo" INTEGER,

    CONSTRAINT "modelos_ingresso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ingressos" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "evento_id" UUID,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "preco" DECIMAL(10,2) NOT NULL,
    "quantidade_total" INTEGER NOT NULL,
    "quantidade_vendida" INTEGER DEFAULT 0,
    "status" TEXT DEFAULT 'disponivel',
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "lote_id" UUID,
    "modelo_id" UUID,
    "codigo" VARCHAR(20),
    "nome_comprador" VARCHAR(255),
    "cpf_comprador" VARCHAR(14),
    "email_comprador" VARCHAR(255),
    "telefone_comprador" VARCHAR(20),
    "preco_pago" DECIMAL(10,2),
    "qr_code_hash" TEXT,
    "data_compra" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "data_pagamento" TIMESTAMP(6),
    "data_uso" TIMESTAMP(6),
    "compra_ingresso_id" UUID,
    "usuario_id" UUID,
    "modelo_numero" INTEGER,

    CONSTRAINT "ingressos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "compras_ingressos" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "usuario_id" UUID NOT NULL,
    "lote_id" UUID NOT NULL,
    "quantidade" INTEGER NOT NULL DEFAULT 1,
    "valor_unitario" DECIMAL(10,2) NOT NULL,
    "valor_total" DECIMAL(10,2) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pendente',
    "payment_id" TEXT,
    "payment_method" TEXT,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "evento_id" UUID,
    "modelo_numero" INTEGER,
    "modelo_id" UUID,

    CONSTRAINT "compras_ingressos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "colecao_usuario" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "usuario_id" UUID,
    "evento_id" UUID,
    "tem_modelo_1" BOOLEAN DEFAULT false,
    "tem_modelo_2" BOOLEAN DEFAULT false,
    "tem_modelo_3" BOOLEAN DEFAULT false,
    "tem_modelo_4" BOOLEAN DEFAULT false,
    "tem_modelo_5" BOOLEAN DEFAULT false,
    "tem_modelo_6" BOOLEAN DEFAULT false,
    "total_modelos" INTEGER DEFAULT 0,
    "colecao_completa" BOOLEAN DEFAULT false,
    "acesso_area_vip" BOOLEAN DEFAULT false,
    "ingresso_especial_liberado" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "expor_publico" BOOLEAN DEFAULT false,
    "nome_eternizado" VARCHAR(100),
    "qtd_modelo_1" INTEGER DEFAULT 0,
    "qtd_modelo_2" INTEGER DEFAULT 0,
    "qtd_modelo_3" INTEGER DEFAULT 0,
    "qtd_modelo_4" INTEGER DEFAULT 0,
    "qtd_modelo_5" INTEGER DEFAULT 0,
    "qtd_modelo_6" INTEGER DEFAULT 0,
    "total_unidades" INTEGER DEFAULT 0,

    CONSTRAINT "colecao_usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuario_colecao" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "usuario_id" UUID,
    "evento_id" UUID,
    "tem_modelo_1" BOOLEAN DEFAULT false,
    "tem_modelo_2" BOOLEAN DEFAULT false,
    "tem_modelo_3" BOOLEAN DEFAULT false,
    "tem_modelo_4" BOOLEAN DEFAULT false,
    "tem_modelo_5" BOOLEAN DEFAULT false,
    "total_ingressos" INTEGER DEFAULT 0,
    "colecao_completa" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuario_colecao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuarios_colecao" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "usuario_id" UUID,
    "compra_id" UUID,
    "evento_id" UUID,
    "ingresso_id" UUID,
    "codigo_ingresso" TEXT,
    "qr_code" TEXT,
    "usado" BOOLEAN DEFAULT false,
    "data_uso" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuarios_colecao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pagamentos" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "ingresso_id" UUID,
    "usuario_id" UUID,
    "mp_payment_id" VARCHAR(100),
    "mp_preference_id" VARCHAR(100),
    "mp_external_reference" VARCHAR(100),
    "valor" DECIMAL(10,2) NOT NULL,
    "taxa_mp" DECIMAL(10,2),
    "valor_liquido" DECIMAL(10,2),
    "metodo_pagamento" VARCHAR(50),
    "status" VARCHAR(30) DEFAULT 'pending',
    "status_detail" VARCHAR(100),
    "data_criacao" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "data_aprovacao" TIMESTAMP(6),
    "data_atualizacao" TIMESTAMP(6),
    "compra_ingresso_id" UUID,
    "evento_id" UUID,

    CONSTRAINT "pagamentos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "camisas" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "evento_id" UUID,
    "nome" VARCHAR(150) NOT NULL,
    "descricao" TEXT,
    "tecido" VARCHAR(20) NOT NULL,
    "preco" DECIMAL(10,2) NOT NULL,
    "imagem_url" TEXT,
    "pre_venda_ini" TIMESTAMPTZ(6),
    "pre_venda_fim" TIMESTAMPTZ(6),
    "data_entrega" TIMESTAMPTZ(6),
    "ativo" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "camisas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "camisa_tamanhos" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "camisa_id" UUID NOT NULL,
    "tamanho" VARCHAR(10) NOT NULL,
    "quantidade_total" INTEGER NOT NULL DEFAULT 0,
    "quantidade_vendida" INTEGER DEFAULT 0,

    CONSTRAINT "camisa_tamanhos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pedidos_camisa" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "usuario_id" UUID NOT NULL,
    "camisa_id" UUID NOT NULL,
    "tamanho" VARCHAR(10) NOT NULL,
    "quantidade" INTEGER NOT NULL DEFAULT 1,
    "valor_unitario" DECIMAL(10,2) NOT NULL,
    "valor_total" DECIMAL(10,2) NOT NULL,
    "status" VARCHAR(20) DEFAULT 'pendente',
    "payment_id" TEXT,
    "payment_method" TEXT,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pedidos_camisa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "planos_clube" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nome" VARCHAR(100) NOT NULL,
    "descricao" TEXT,
    "preco" DECIMAL(10,2) NOT NULL,
    "ciclo" VARCHAR(20) NOT NULL,
    "beneficios" TEXT,
    "ativo" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "planos_clube_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "membros_clube" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "usuario_id" UUID NOT NULL,
    "plano_id" UUID NOT NULL,
    "status" VARCHAR(20) DEFAULT 'ativo',
    "data_inicio" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "data_proxima_cobranca" TIMESTAMPTZ(6),
    "data_cancelamento" TIMESTAMPTZ(6),
    "payment_id" TEXT,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "membros_clube_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kits_alimentacao" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nome" VARCHAR(100) NOT NULL,
    "descricao" TEXT,
    "preco" DECIMAL(10,2) NOT NULL,
    "kg_doacao" DECIMAL(5,2) DEFAULT 0,
    "categoria" VARCHAR(20),
    "imagem_url" TEXT,
    "ativo" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "kits_alimentacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pedidos_kit_alimentacao" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "usuario_id" UUID NOT NULL,
    "kit_id" UUID NOT NULL,
    "quantidade" INTEGER NOT NULL DEFAULT 1,
    "valor_unitario" DECIMAL(10,2) NOT NULL,
    "valor_total" DECIMAL(10,2) NOT NULL,
    "status" VARCHAR(20) DEFAULT 'pendente',
    "payment_id" TEXT,
    "payment_method" TEXT,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pedidos_kit_alimentacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "livros" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nome" VARCHAR(150) NOT NULL,
    "numero_edicao" INTEGER NOT NULL,
    "descricao" TEXT,
    "inclui_box" BOOLEAN DEFAULT false,
    "preco_nao_membro" DECIMAL(10,2) NOT NULL,
    "preco_membro" DECIMAL(10,2) NOT NULL,
    "imagem_url" TEXT,
    "ativo" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "categoria" "CategoriaLivro" NOT NULL DEFAULT 'JORNADA_HOT_DOGUERES',
    "data_lancamento" TIMESTAMPTZ(6),
    "disponivel" BOOLEAN NOT NULL DEFAULT true,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "livros_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pedidos_livro" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "usuario_id" UUID NOT NULL,
    "livro_id" UUID NOT NULL,
    "quantidade" INTEGER NOT NULL DEFAULT 1,
    "era_membro" BOOLEAN DEFAULT false,
    "valor_unitario" DECIMAL(10,2) NOT NULL,
    "valor_total" DECIMAL(10,2) NOT NULL,
    "status" VARCHAR(20) DEFAULT 'pendente',
    "payment_id" TEXT,
    "payment_method" TEXT,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pedidos_livro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "compras" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "nome_item" VARCHAR(255) NOT NULL,
    "categoria" VARCHAR(100),
    "quantidade" INTEGER DEFAULT 1,
    "valor_estimado" DECIMAL(10,2),
    "prioridade" VARCHAR(20) DEFAULT 'média',
    "status" VARCHAR(20) DEFAULT 'pendente',
    "data_limite" DATE,
    "observacoes" TEXT,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "compras_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notificacoes" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "usuario_id" UUID NOT NULL,
    "evento_id" UUID,
    "tipo" VARCHAR(50) NOT NULL,
    "titulo" VARCHAR(255) NOT NULL,
    "mensagem" TEXT,
    "lida" BOOLEAN DEFAULT false,
    "criado_em" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notificacoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vendas" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "evento_id" UUID,
    "compra_id" UUID,
    "vendedor_id" UUID,
    "valor_bruto" DECIMAL(10,2) NOT NULL,
    "taxa_plataforma" DECIMAL(10,2) DEFAULT 0,
    "valor_liquido" DECIMAL(10,2) NOT NULL,
    "status" TEXT DEFAULT 'pendente',
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "vendas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clube_membros" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "pessoa_id" UUID NOT NULL,
    "plano" TEXT NOT NULL,
    "valor" DECIMAL(10,2) NOT NULL,
    "periodicidade" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'iniciando',
    "mercado_pago_preapproval_id" TEXT,
    "mercado_pago_init_point" TEXT,
    "external_reference" TEXT,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "clube_membros_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pedidos" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "external_reference" TEXT NOT NULL,
    "preference_id" TEXT,
    "payment_id" TEXT,
    "status" TEXT NOT NULL DEFAULT 'aguardando_pagamento',
    "tipo" TEXT,
    "produto" TEXT,
    "categoria" TEXT,
    "tamanho" TEXT,
    "nome_comprador" TEXT,
    "email_comprador" TEXT,
    "whatsapp" TEXT,
    "quantidade" INTEGER NOT NULL DEFAULT 1,
    "valor_unitario" DECIMAL NOT NULL DEFAULT 0,
    "valor_frete" DECIMAL NOT NULL DEFAULT 0,
    "total_produtos" DECIMAL NOT NULL DEFAULT 0,
    "total_pedido" DECIMAL NOT NULL DEFAULT 0,
    "forma_entrega" TEXT DEFAULT 'retirada',
    "cep" TEXT,
    "servico_frete" TEXT,
    "prazo_frete" TEXT,
    "endereco_entrega" JSONB,
    "mercado_pago_metadata" JSONB,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pedidos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pessoas" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "whatsapp" TEXT,
    "origem" TEXT DEFAULT 'site',
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pessoas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_auth_id_key" ON "usuarios"("auth_id");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_cpf_key" ON "usuarios"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "idx_eventos_data" ON "eventos"("data_evento");

-- CreateIndex
CREATE INDEX "idx_modelos_evento" ON "modelos_ingresso"("evento_id");

-- CreateIndex
CREATE UNIQUE INDEX "ingressos_codigo_key" ON "ingressos"("codigo");

-- CreateIndex
CREATE INDEX "idx_ingressos_evento" ON "ingressos"("evento_id");

-- CreateIndex
CREATE INDEX "idx_compras_ingressos_lote" ON "compras_ingressos"("lote_id");

-- CreateIndex
CREATE INDEX "idx_compras_ingressos_status" ON "compras_ingressos"("status");

-- CreateIndex
CREATE INDEX "idx_compras_ingressos_usuario" ON "compras_ingressos"("usuario_id");

-- CreateIndex
CREATE UNIQUE INDEX "colecao_usuario_usuario_id_evento_id_key" ON "colecao_usuario"("usuario_id", "evento_id");

-- CreateIndex
CREATE INDEX "idx_colecao_usuario_evento" ON "usuario_colecao"("usuario_id", "evento_id");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_colecao_usuario_id_evento_id_key" ON "usuario_colecao"("usuario_id", "evento_id");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_colecao_codigo_ingresso_key" ON "usuarios_colecao"("codigo_ingresso");

-- CreateIndex
CREATE INDEX "idx_colecao_usuario" ON "usuarios_colecao"("usuario_id");

-- CreateIndex
CREATE INDEX "idx_pagamentos_mp_id" ON "pagamentos"("mp_payment_id");

-- CreateIndex
CREATE INDEX "idx_pagamentos_status" ON "pagamentos"("status");

-- CreateIndex
CREATE INDEX "idx_camisas_evento" ON "camisas"("evento_id");

-- CreateIndex
CREATE UNIQUE INDEX "camisa_tamanhos_camisa_id_tamanho_key" ON "camisa_tamanhos"("camisa_id", "tamanho");

-- CreateIndex
CREATE INDEX "idx_pedidos_camisa_usuario" ON "pedidos_camisa"("usuario_id");

-- CreateIndex
CREATE INDEX "idx_pedidos_camisa_status" ON "pedidos_camisa"("status");

-- CreateIndex
CREATE INDEX "idx_membros_clube_usuario" ON "membros_clube"("usuario_id");

-- CreateIndex
CREATE INDEX "idx_membros_clube_status" ON "membros_clube"("status");

-- CreateIndex
CREATE INDEX "idx_pedidos_kit_usuario" ON "pedidos_kit_alimentacao"("usuario_id");

-- CreateIndex
CREATE INDEX "idx_pedidos_kit_status" ON "pedidos_kit_alimentacao"("status");

-- CreateIndex
CREATE INDEX "idx_pedidos_livro_usuario" ON "pedidos_livro"("usuario_id");

-- CreateIndex
CREATE UNIQUE INDEX "clube_membros_external_reference_key" ON "clube_membros"("external_reference");

-- CreateIndex
CREATE INDEX "idx_clube_membros_pessoa_id" ON "clube_membros"("pessoa_id");

-- CreateIndex
CREATE INDEX "idx_clube_membros_plano" ON "clube_membros"("plano");

-- CreateIndex
CREATE INDEX "idx_clube_membros_status" ON "clube_membros"("status");

-- CreateIndex
CREATE UNIQUE INDEX "pedidos_external_reference_key" ON "pedidos"("external_reference");

-- CreateIndex
CREATE INDEX "pedidos_created_at_idx" ON "pedidos"("created_at" DESC);

-- CreateIndex
CREATE INDEX "pedidos_external_reference_idx" ON "pedidos"("external_reference");

-- CreateIndex
CREATE INDEX "pedidos_status_idx" ON "pedidos"("status");

-- CreateIndex
CREATE UNIQUE INDEX "pessoas_email_key" ON "pessoas"("email");

-- AddForeignKey
ALTER TABLE "eventos" ADD CONSTRAINT "eventos_organizador_id_fkey" FOREIGN KEY ("organizador_id") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "lotes" ADD CONSTRAINT "lotes_evento_id_fkey" FOREIGN KEY ("evento_id") REFERENCES "eventos"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ingressos" ADD CONSTRAINT "ingressos_evento_id_fkey" FOREIGN KEY ("evento_id") REFERENCES "eventos"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ingressos" ADD CONSTRAINT "ingressos_lote_id_fkey" FOREIGN KEY ("lote_id") REFERENCES "lotes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ingressos" ADD CONSTRAINT "ingressos_modelo_id_fkey" FOREIGN KEY ("modelo_id") REFERENCES "modelos_ingresso"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "compras_ingressos" ADD CONSTRAINT "compras_ingressos_lote_id_fkey" FOREIGN KEY ("lote_id") REFERENCES "lotes"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "compras_ingressos" ADD CONSTRAINT "compras_ingressos_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "colecao_usuario" ADD CONSTRAINT "colecao_usuario_evento_id_fkey" FOREIGN KEY ("evento_id") REFERENCES "eventos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "colecao_usuario" ADD CONSTRAINT "colecao_usuario_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "usuarios_colecao" ADD CONSTRAINT "usuarios_colecao_evento_id_fkey" FOREIGN KEY ("evento_id") REFERENCES "eventos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "usuarios_colecao" ADD CONSTRAINT "usuarios_colecao_ingresso_id_fkey" FOREIGN KEY ("ingresso_id") REFERENCES "ingressos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "usuarios_colecao" ADD CONSTRAINT "usuarios_colecao_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pagamentos" ADD CONSTRAINT "pagamentos_ingresso_id_fkey" FOREIGN KEY ("ingresso_id") REFERENCES "ingressos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pagamentos" ADD CONSTRAINT "pagamentos_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "camisas" ADD CONSTRAINT "camisas_evento_id_fkey" FOREIGN KEY ("evento_id") REFERENCES "eventos"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "camisa_tamanhos" ADD CONSTRAINT "camisa_tamanhos_camisa_id_fkey" FOREIGN KEY ("camisa_id") REFERENCES "camisas"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pedidos_camisa" ADD CONSTRAINT "pedidos_camisa_camisa_id_fkey" FOREIGN KEY ("camisa_id") REFERENCES "camisas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pedidos_camisa" ADD CONSTRAINT "pedidos_camisa_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "membros_clube" ADD CONSTRAINT "membros_clube_plano_id_fkey" FOREIGN KEY ("plano_id") REFERENCES "planos_clube"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "membros_clube" ADD CONSTRAINT "membros_clube_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pedidos_kit_alimentacao" ADD CONSTRAINT "pedidos_kit_alimentacao_kit_id_fkey" FOREIGN KEY ("kit_id") REFERENCES "kits_alimentacao"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pedidos_kit_alimentacao" ADD CONSTRAINT "pedidos_kit_alimentacao_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pedidos_livro" ADD CONSTRAINT "pedidos_livro_livro_id_fkey" FOREIGN KEY ("livro_id") REFERENCES "livros"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pedidos_livro" ADD CONSTRAINT "pedidos_livro_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "vendas" ADD CONSTRAINT "vendas_evento_id_fkey" FOREIGN KEY ("evento_id") REFERENCES "eventos"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "vendas" ADD CONSTRAINT "vendas_vendedor_id_fkey" FOREIGN KEY ("vendedor_id") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "clube_membros" ADD CONSTRAINT "clube_membros_pessoa_id_fkey" FOREIGN KEY ("pessoa_id") REFERENCES "pessoas"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
