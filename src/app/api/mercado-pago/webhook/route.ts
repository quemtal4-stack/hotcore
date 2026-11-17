import { NextResponse } from "next/server";
import { MercadoPagoConfig, Payment, PreApproval } from "mercadopago";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ANO_COLECAO = 2028;

const PLANOS_CLUBE = {
  apoiador: {
    nome: "Apoiador",
    valor: 19.9,
    periodicidade: "mensal",
    kgAlimentos: 1,
  },
  lendario: {
    nome: "Lendário",
    valor: 29.9,
    periodicidade: "mensal",
    kgAlimentos: 1,
  },
  fundador: {
    nome: "Fundador",
    valor: 39.9,
    periodicidade: "mensal",
    kgAlimentos: 1,
  },
  colecionador: {
    nome: "Colecionador",
    valor: 59.9,
    periodicidade: "mensal",
    kgAlimentos: 1,
  },
  guardiao: {
    nome: "Guardião",
    valor: 89.9,
    periodicidade: "mensal",
    kgAlimentos: 3,
  },
  eternizado: {
    nome: "Eternizados",
    valor: 499.9,
    periodicidade: "anual",
    kgAlimentos: 14,
  },
} as const;

type PlanoClube = keyof typeof PLANOS_CLUBE;

type WebhookBody = {
  topic?: string;
  type?: string;
  action?: string;
  id?: string | number;
  resource?: string;
  data?: {
    id?: string | number;
  };
};

type MetadataPagamento = {
  origem?: string;

  tipo?: string | null;
  categoria?: string | null;
  plano?: string | null;
  produto?: string | null;
  titulo?: string | null;

  nome?: string | null;
  nomeComprador?: string | null;

  email?: string | null;
  emailComprador?: string | null;

  telefone?: string | null;
  whatsapp?: string | null;

  cpf?: string | null;
  cpfComprador?: string | null;

  quantidade?: number | string | null;
  quantidade_total?: number | string | null;
  ingressos?: number | string | null;

  sexto_ingresso?: boolean | string | null;
  sextoIngresso?: boolean | string | null;

  nome_ingresso_eternizado?: string | null;
  nomeIngressoEternizado?: string | null;

  kg_alimentos?: number | string | null;

  evento_id?: string | null;
  eventoId?: string | null;

  nome_evento?: string | null;
  nomeEvento?: string | null;

  ano_colecao?: number | string | null;
  anoColecao?: number | string | null;

  ingresso_modelo_id?: string | null;
  ingressoModeloId?: string | null;

  eh_ingresso_colecionavel?: boolean | string | null;

  valor?: number | string | null;
  valorUnitario?: number | string | null;
  totalPedido?: number | string | null;

  external_reference?: string | null;
  externalReference?: string | null;
};

type IngressoColecao = {
  id: string;
  titulo: string;
  descricao: string;
  imagem: string;
  tag: string;
  especial?: boolean;
};

const ingressosColecao: IngressoColecao[] = [
  {
    id: "ingresso-01",
    titulo: `Ingresso 01 ${ANO_COLECAO}`,
    descricao: `Primeiro ingresso da Coleção Especial ${ANO_COLECAO}.`,
    imagem: `/ingressos/${ANO_COLECAO}/ingresso-01-${ANO_COLECAO}.png`,
    tag: `Coleção ${ANO_COLECAO}`,
  },
  {
    id: "ingresso-02",
    titulo: `Ingresso 02 ${ANO_COLECAO}`,
    descricao: `Segundo ingresso da Coleção Especial ${ANO_COLECAO}.`,
    imagem: `/ingressos/${ANO_COLECAO}/ingresso-02-${ANO_COLECAO}.png`,
    tag: `Coleção ${ANO_COLECAO}`,
  },
  {
    id: "ingresso-03",
    titulo: `Ingresso 03 ${ANO_COLECAO}`,
    descricao: `Terceiro ingresso da Coleção Especial ${ANO_COLECAO}.`,
    imagem: `/ingressos/${ANO_COLECAO}/ingresso-03-${ANO_COLECAO}.png`,
    tag: `Coleção ${ANO_COLECAO}`,
  },
  {
    id: "ingresso-04",
    titulo: `Ingresso 04 ${ANO_COLECAO}`,
    descricao: `Quarto ingresso da Coleção Especial ${ANO_COLECAO}.`,
    imagem: `/ingressos/${ANO_COLECAO}/ingresso-04-${ANO_COLECAO}.png`,
    tag: `Coleção ${ANO_COLECAO}`,
  },
  {
    id: "ingresso-05",
    titulo: `Ingresso 05 ${ANO_COLECAO}`,
    descricao: `Quinto ingresso da Coleção Especial ${ANO_COLECAO}.`,
    imagem: `/ingressos/${ANO_COLECAO}/ingresso-05-${ANO_COLECAO}.png`,
    tag: `Coleção ${ANO_COLECAO}`,
  },
  {
    id: "ingresso-06",
    titulo: `Ingresso 06 ${ANO_COLECAO}`,
    descricao: `Sexto ingresso da Coleção Especial ${ANO_COLECAO}.`,
    imagem: `/ingressos/${ANO_COLECAO}/ingresso-06-${ANO_COLECAO}.png`,
    tag: `Coleção ${ANO_COLECAO}`,
  },
  {
    id: "ingresso-eternizados",
    titulo: `Eternizados ${ANO_COLECAO}`,
    descricao:
      "Ingresso especial para quem desbloqueia a peça mais exclusiva da coleção.",
    imagem: `/ingressos/${ANO_COLECAO}/ingresso-eternizados-${ANO_COLECAO}.png`,
    tag: `Ingresso oficial ${ANO_COLECAO}`,
    especial: true,
  },
];

function transformarErroEmTexto(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "object" && error !== null) {
    return JSON.stringify(error);
  }

  return String(error);
}

function textoSeguro(valor: unknown, padrao = "") {
  if (typeof valor === "string") {
    return valor.trim();
  }

  if (typeof valor === "number" && Number.isFinite(valor)) {
    return String(valor);
  }

  return padrao;
}

function numeroSeguro(valor: unknown, padrao = 0) {
  if (typeof valor === "number" && Number.isFinite(valor)) {
    return valor;
  }

  if (typeof valor === "string") {
    const numero = Number(valor);

    if (Number.isFinite(numero)) {
      return numero;
    }
  }

  return padrao;
}

function booleanoSeguro(valor: unknown) {
  if (typeof valor === "boolean") {
    return valor;
  }

  if (typeof valor === "string") {
    const texto = valor.trim().toLowerCase();

    return texto === "true" || texto === "1" || texto === "sim";
  }

  return false;
}

function limparNumero(valor: unknown) {
  return textoSeguro(valor).replace(/\D/g, "");
}

function normalizarTexto(valor: unknown) {
  return textoSeguro(valor)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function extrairPaymentIdDaResource(resource: unknown) {
  const texto = textoSeguro(resource);

  if (!texto) {
    return "";
  }

  const match = texto.match(/payments\/(\d+)/);

  if (match?.[1]) {
    return match[1];
  }

  return "";
}

function converterStatusMercadoPago(status?: string) {
  if (status === "approved") {
    return "pago";
  }

  if (status === "pending" || status === "in_process") {
    return "aguardando_pagamento";
  }

  if (status === "rejected") {
    return "recusado";
  }

  if (status === "cancelled") {
    return "cancelado";
  }

  if (status === "refunded") {
    return "reembolsado";
  }

  if (status === "charged_back") {
    return "chargeback";
  }

  return status || "desconhecido";
}

function converterStatusAssinaturaMercadoPago(status?: string) {
  if (status === "authorized") {
    return "ativo";
  }

  if (status === "pending") {
    return "pendente";
  }

  if (status === "paused") {
    return "pausado";
  }

  if (status === "cancelled") {
    return "cancelado";
  }

  return status || "desconhecido";
}

function normalizarPlanoClube(valor: unknown): PlanoClube | null {
  const plano = normalizarTexto(valor);

  if (plano === "apoiador") {
    return "apoiador";
  }

  if (plano === "lendario" || plano === "lenda") {
    return "lendario";
  }

  if (plano === "fundador") {
    return "fundador";
  }

  if (plano === "colecionador") {
    return "colecionador";
  }

  if (plano === "guardiao") {
    return "guardiao";
  }

  if (plano === "eternizado" || plano === "eternizados") {
    return "eternizado";
  }

  return null;
}

function extrairPlanoDoExternalReference(externalReference: unknown) {
  const referencia = textoSeguro(externalReference);

  if (!referencia.startsWith("clube-")) {
    return null;
  }

  const partes = referencia.split("-");

  return normalizarPlanoClube(partes[1]);
}

function ehPagamentoDeClube(params: {
  externalReference: string;
  metadata: MetadataPagamento;
}) {
  const tipo = normalizarTexto(params.metadata.tipo);
  const origem = normalizarTexto(params.metadata.origem);
  const categoria = normalizarTexto(params.metadata.categoria);

  return (
    params.externalReference.startsWith("clube-") ||
    tipo === "clube_membro" ||
    origem.includes("clube") ||
    categoria.includes("clube")
  );
}

function ehIngressoColecionavel(metadata: MetadataPagamento) {
  const tipo = textoSeguro(metadata.tipo);

  return (
    tipo === "ingresso" ||
    tipo === "ingresso_evento" ||
    tipo === "ingresso_fixo" ||
    booleanoSeguro(metadata.eh_ingresso_colecionavel)
  );
}

function montarIngressosDaCompra(params: {
  quantidade: number;
  sextoIngresso: boolean;
  nomeIngressoEternizado: string;
}) {
  const quantidade = Math.max(1, Math.min(params.quantidade, 6));

  const ingressos = ingressosColecao.slice(0, quantidade).map((ingresso) => ({
    ingresso_id: ingresso.id,
    titulo: ingresso.titulo,
    descricao: ingresso.descricao,
    imagem: ingresso.imagem,
    tag: ingresso.tag,
    especial: Boolean(ingresso.especial),
    quantidade: 1,
    status: "aprovado",
    nome_eternizado: null as string | null,
    updated_at: new Date().toISOString(),
  }));

  if (
    params.sextoIngresso ||
    quantidade >= 6 ||
    params.nomeIngressoEternizado
  ) {
    const ingressoEternizado = ingressosColecao.find(
      (ingresso) => ingresso.especial,
    );

    if (ingressoEternizado) {
      ingressos.push({
        ingresso_id: ingressoEternizado.id,
        titulo: ingressoEternizado.titulo,
        descricao: ingressoEternizado.descricao,
        imagem: ingressoEternizado.imagem,
        tag: ingressoEternizado.tag,
        especial: true,
        quantidade: 1,
        status: "aprovado",
        nome_eternizado: params.nomeIngressoEternizado || null,
        updated_at: new Date().toISOString(),
      });
    }
  }

  return ingressos;
}

async function criarOuAtualizarPastaColecionador(params: {
  cpf: string;
  nome: string;
  email: string;
  telefone: string;
  quantidade: number;
  sextoIngresso: boolean;
  nomeIngressoEternizado: string;
}) {
  const cpf = limparNumero(params.cpf);

  if (cpf.length !== 11) {
    console.log("CPF inválido para criar pasta do colecionador:", params.cpf);
    return null;
  }

  const agora = new Date().toISOString();

  const { data: pasta, error: erroPasta } = await supabaseAdmin
    .from("colecionador_pastas")
    .upsert(
      {
        cpf,
        nome: params.nome || "Comprador",
        email: params.email || null,
        telefone: params.telefone || null,
        updated_at: agora,
      },
      {
        onConflict: "cpf",
      },
    )
    .select("id")
    .single();

  if (erroPasta || !pasta) {
    throw new Error(
      `Erro ao criar/atualizar pasta do colecionador: ${
        erroPasta?.message || "pasta não retornada"
      }`,
    );
  }

  const ingressos = montarIngressosDaCompra({
    quantidade: params.quantidade,
    sextoIngresso: params.sextoIngresso,
    nomeIngressoEternizado: params.nomeIngressoEternizado,
  });

  for (const ingresso of ingressos) {
    const { data: ingressoExistente, error: erroBuscaIngresso } =
      await supabaseAdmin
        .from("colecionador_ingressos")
        .select("id")
        .eq("pasta_id", pasta.id)
        .eq("ingresso_id", ingresso.ingresso_id)
        .maybeSingle();

    if (erroBuscaIngresso) {
      throw new Error(
        `Erro ao buscar ingresso existente: ${erroBuscaIngresso.message}`,
      );
    }

    if (ingressoExistente) {
      const { error: erroUpdateIngresso } = await supabaseAdmin
        .from("colecionador_ingressos")
        .update({
          titulo: ingresso.titulo,
          descricao: ingresso.descricao,
          imagem: ingresso.imagem,
          tag: ingresso.tag,
          especial: ingresso.especial,
          quantidade: ingresso.quantidade,
          status: ingresso.status,
          nome_eternizado: ingresso.nome_eternizado,
          updated_at: agora,
        })
        .eq("id", ingressoExistente.id);

      if (erroUpdateIngresso) {
        throw new Error(
          `Erro ao atualizar ingresso da pasta: ${erroUpdateIngresso.message}`,
        );
      }
    } else {
      const { error: erroInsertIngresso } = await supabaseAdmin
        .from("colecionador_ingressos")
        .insert({
          pasta_id: pasta.id,
          ...ingresso,
          created_at: agora,
          updated_at: agora,
        });

      if (erroInsertIngresso) {
        throw new Error(
          `Erro ao inserir ingresso na pasta: ${erroInsertIngresso.message}`,
        );
      }
    }
  }

  return {
    pastaId: pasta.id,
    ingressosCriadosOuAtualizados: ingressos.length,
  };
}

async function atualizarMembroClube(params: {
  externalReference: string;
  preapprovalId: string;
  status: string;
  plano: PlanoClube | null;
}) {
  const agora = new Date().toISOString();

  const atualizacao = {
    status: params.status,
    ...(params.plano ? { plano: params.plano } : {}),
    ...(params.preapprovalId
      ? { mercado_pago_preapproval_id: params.preapprovalId }
      : {}),
    updated_at: agora,
  };

  if (params.externalReference) {
    const { error } = await supabaseAdmin
      .from("clube_membros")
      .update(atualizacao)
      .eq("external_reference", params.externalReference);

    if (error) {
      throw new Error(
        `Erro ao atualizar membro por referência: ${error.message}`,
      );
    }
  }

  if (params.preapprovalId) {
    const { error } = await supabaseAdmin
      .from("clube_membros")
      .update(atualizacao)
      .eq("mercado_pago_preapproval_id", params.preapprovalId);

    if (error) {
      throw new Error(
        `Erro ao atualizar membro por preapproval: ${error.message}`,
      );
    }
  }
}

async function registrarPedidoClubeAprovado(params: {
  paymentId: string;
  externalReferenceMembro: string;
  preapprovalId: string;
  plano: PlanoClube;
  nome: string;
  email: string;
  telefone: string;
  statusPedido: string;
  transactionAmount: number;
  pagamentoJson: Record<string, unknown>;
}) {
  const dadosPlano = PLANOS_CLUBE[params.plano];
  const agora = new Date().toISOString();

  const externalReferencePedido = params.externalReferenceMembro
    ? `${params.externalReferenceMembro}-payment-${params.paymentId}`
    : `clube-${params.plano}-payment-${params.paymentId}`;

  const valor = params.transactionAmount || dadosPlano.valor;

  const metadataPedido = {
    origem: "clube",
    tipo: "clube_membro",
    categoria: "clube",
    plano: params.plano,
    produto: `Clube de Membros Hot Dogueres - Plano ${dadosPlano.nome}`,
    titulo: `Clube de Membros Hot Dogueres - Plano ${dadosPlano.nome}`,

    nome: params.nome || "Membro do Clube",
    nomeComprador: params.nome || "Membro do Clube",

    email: params.email || null,
    emailComprador: params.email || null,

    telefone: params.telefone || null,
    whatsapp: params.telefone || null,

    quantidade: 1,
    quantidade_total: 1,

    kg_alimentos: dadosPlano.kgAlimentos,
    kgAlimentos: dadosPlano.kgAlimentos,

    valor,
    valor_total: valor,
    totalPedido: valor,

    periodicidade: dadosPlano.periodicidade,

    external_reference_membro: params.externalReferenceMembro || null,
    mercado_pago_preapproval_id: params.preapprovalId || null,
    payment_id: params.paymentId,
  };

  const { data: pedidoExistente, error: erroBuscaPedido } = await supabaseAdmin
    .from("pedidos")
    .select("id")
    .eq("external_reference", externalReferencePedido)
    .maybeSingle();

  if (erroBuscaPedido) {
    throw new Error(
      `Erro ao buscar pedido do clube: ${erroBuscaPedido.message}`,
    );
  }

  if (pedidoExistente) {
    const { error: erroUpdatePedido } = await supabaseAdmin
      .from("pedidos")
      .update({
        payment_id: params.paymentId,
        status: params.statusPedido,
        tipo: "clube_membro",
        categoria: "clube",
        produto: metadataPedido.produto,
        plano: params.plano,

        nome_comprador: metadataPedido.nome,
        email_comprador: metadataPedido.email,
        whatsapp: params.telefone || null,

        quantidade: 1,
        valor_unitario: valor,
        valor_frete: 0,
        total_produtos: valor,
        total_pedido: valor,

        mercado_pago_metadata: params.pagamentoJson,
        metadata: metadataPedido,
        updated_at: agora,
      })
      .eq("id", pedidoExistente.id);

    if (erroUpdatePedido) {
      throw new Error(
        `Erro ao atualizar pedido do clube: ${erroUpdatePedido.message}`,
      );
    }

    return {
      externalReferencePedido,
      atualizado: true,
    };
  }

  const { error: erroInsertPedido } = await supabaseAdmin
    .from("pedidos")
    .insert({
      external_reference: externalReferencePedido,
      payment_id: params.paymentId,

      status: params.statusPedido,
      tipo: "clube_membro",
      categoria: "clube",
      produto: metadataPedido.produto,
      plano: params.plano,

      nome_comprador: metadataPedido.nome,
      email_comprador: metadataPedido.email,
      whatsapp: params.telefone || null,

      quantidade: 1,
      valor_unitario: valor,
      valor_frete: 0,
      total_produtos: valor,
      total_pedido: valor,

      mercado_pago_metadata: params.pagamentoJson,
      metadata: metadataPedido,
      created_at: agora,
      updated_at: agora,
    });

  if (erroInsertPedido) {
    throw new Error(
      `Erro ao inserir pedido do clube: ${erroInsertPedido.message}`,
    );
  }

  return {
    externalReferencePedido,
    criado: true,
  };
}

async function processarPreApproval(params: {
  client: MercadoPagoConfig;
  preapprovalId: string;
}) {
  const preApproval = new PreApproval(params.client);

  const assinatura = await preApproval.get({
    id: params.preapprovalId,
  });

  const assinaturaJson = JSON.parse(JSON.stringify(assinatura)) as Record<
    string,
    unknown
  >;

  const externalReference = textoSeguro(assinaturaJson.external_reference);
  const status = textoSeguro(assinaturaJson.status);
  const statusMembro = converterStatusAssinaturaMercadoPago(status);
  const plano = extrairPlanoDoExternalReference(externalReference);

  await atualizarMembroClube({
    externalReference,
    preapprovalId: params.preapprovalId,
    status: statusMembro,
    plano,
  });

  return NextResponse.json({
    received: true,
    tipo: "preapproval",
    preapprovalId: params.preapprovalId,
    externalReference,
    status,
    statusMembro,
    plano,
    assinatura: assinaturaJson,
  });
}

async function buscarPedidoPorReferenciaOuPaymentId(
  externalReference: string,
  notificationId: string,
) {
  if (externalReference) {
    const { data, error } = await supabaseAdmin
      .from("pedidos")
      .select("id, external_reference, payment_id, mercado_pago_payment_id")
      .eq("external_reference", externalReference)
      .maybeSingle();

    if (error) {
      throw new Error(`Erro ao buscar pedido por external_reference: ${error.message}`);
    }

    if (data) {
      return data;
    }
  }

  const { data, error } = await supabaseAdmin
    .from("pedidos")
    .select("id, external_reference, payment_id, mercado_pago_payment_id")
    .or(
      `payment_id.eq.${notificationId},mercado_pago_payment_id.eq.${notificationId}`,
    )
    .maybeSingle();

  if (error) {
    throw new Error(`Erro ao buscar pedido por payment_id: ${error.message}`);
  }

  return data;
}

async function processarNotificacao(request: Request) {
  try {
    const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;

    if (!accessToken) {
      console.error("MERCADO_PAGO_ACCESS_TOKEN não configurado no webhook.");

      return NextResponse.json(
        {
          error: "Token do Mercado Pago não configurado.",
        },
        { status: 500 },
      );
    }

    const url = new URL(request.url);

    let body: WebhookBody | null = null;

    if (request.method === "POST") {
      try {
        body = (await request.json()) as WebhookBody;
      } catch {
        body = null;
      }
    }

    console.log("WEBHOOK MERCADO PAGO RECEBIDO:", {
      method: request.method,
      query: Object.fromEntries(url.searchParams.entries()),
      body,
    });

    const topic =
      textoSeguro(url.searchParams.get("topic")) ||
      textoSeguro(url.searchParams.get("type")) ||
      textoSeguro(body?.topic) ||
      textoSeguro(body?.type);

    const notificationId =
      textoSeguro(url.searchParams.get("id")) ||
      textoSeguro(url.searchParams.get("data.id")) ||
      textoSeguro(body?.data?.id) ||
      textoSeguro(body?.id) ||
      extrairPaymentIdDaResource(body?.resource);

    if (!notificationId) {
      console.log("Webhook recebido sem ID.");

      return NextResponse.json({
        received: true,
        message: "Notificação recebida sem ID.",
      });
    }

    const client = new MercadoPagoConfig({
      accessToken,
    });

    const topicNormalizado = normalizarTexto(topic);
    const ehPreApproval =
      topicNormalizado.includes("preapproval") ||
      topicNormalizado.includes("pre_approval") ||
      topicNormalizado.includes("subscription");

    if (ehPreApproval) {
      return processarPreApproval({
        client,
        preapprovalId: notificationId,
      });
    }

    if (topic && topic !== "payment") {
      console.log("Webhook ignorado. Tipo recebido:", topic);

      return NextResponse.json({
        received: true,
        ignored: true,
        topic,
      });
    }

    const payment = new Payment(client);

    const pagamento = await payment.get({
      id: notificationId,
    });

    const pagamentoJson = JSON.parse(JSON.stringify(pagamento)) as Record<
      string,
      unknown
    >;

    console.log("PAGAMENTO CONSULTADO NO MERCADO PAGO:", pagamentoJson);

    const status = pagamento.status;
    const statusDetail = pagamento.status_detail;

    const metadata = (pagamento.metadata || {}) as MetadataPagamento;

    const externalReference =
      textoSeguro(pagamento.external_reference) ||
      textoSeguro(metadata.external_reference) ||
      textoSeguro(metadata.externalReference);

    const transactionAmount = numeroSeguro(pagamento.transaction_amount);
    const paymentMethodId = pagamento.payment_method_id;
    const paymentTypeId = pagamento.payment_type_id;
    const payerEmail = textoSeguro(pagamento.payer?.email);
    const payerCpf = textoSeguro(pagamento.payer?.identification?.number);
    const dateApproved = pagamento.date_approved;

    const preapprovalId =
      textoSeguro(pagamentoJson.preapproval_id) ||
      textoSeguro(pagamentoJson.preapproval) ||
      textoSeguro(
        (pagamentoJson.preapproval as Record<string, unknown>)?.id,
      );

    const statusPedido = converterStatusMercadoPago(status);

    console.log("RESUMO DO PAGAMENTO:", {
      paymentId: notificationId,
      status,
      statusPedido,
      statusDetail,
      externalReference,
      transactionAmount,
      paymentMethodId,
      paymentTypeId,
      payerEmail,
      payerCpf,
      dateApproved,
      preapprovalId,
      metadata,
    });

    let pedidoAtualizado = null;

    const pedidoEncontrado = await buscarPedidoPorReferenciaOuPaymentId(
      externalReference,
      notificationId,
    );

    if (pedidoEncontrado?.id) {
      const { data, error } = await supabaseAdmin
        .from("pedidos")
        .update({
          payment_id: String(notificationId),
          mercado_pago_payment_id: String(notificationId),
          status: statusPedido,
          mercado_pago_metadata: pagamentoJson,
          updated_at: new Date().toISOString(),
        })
        .eq("id", pedidoEncontrado.id)
        .select()
        .maybeSingle();

      if (error) {
        console.error("ERRO AO ATUALIZAR PEDIDO NO SUPABASE:", error);

        return NextResponse.json(
          {
            error: "Pagamento consultado, mas erro ao atualizar pedido.",
            detalhe: error.message,
            paymentId: notificationId,
            externalReference,
          },
          { status: 500 },
        );
      }

      pedidoAtualizado = data;
    } else {
      console.log("Nenhum pedido encontrado para:", {
        externalReference,
        paymentId: notificationId,
      });
    }

    let membroClube = null;

    if (
      ehPagamentoDeClube({
        externalReference,
        metadata,
      })
    ) {
      const plano =
        normalizarPlanoClube(metadata.plano) ||
        extrairPlanoDoExternalReference(externalReference);

      if (plano) {
        const statusMembro =
          status === "approved"
            ? "ativo"
            : statusPedido === "aguardando_pagamento"
              ? "pendente"
              : statusPedido;

        await atualizarMembroClube({
          externalReference,
          preapprovalId,
          status: statusMembro,
          plano,
        });

        if (status === "approved") {
          membroClube = await registrarPedidoClubeAprovado({
            paymentId: String(notificationId),
            externalReferenceMembro: externalReference,
            preapprovalId,
            plano,
            nome:
              textoSeguro(metadata.nome) ||
              textoSeguro(metadata.nomeComprador) ||
              "Membro do Clube",
            email:
              textoSeguro(metadata.email) ||
              textoSeguro(metadata.emailComprador) ||
              payerEmail,
            telefone:
              textoSeguro(metadata.telefone) ||
              textoSeguro(metadata.whatsapp),
            statusPedido,
            transactionAmount,
            pagamentoJson,
          });
        }
      } else {
        console.log("Pagamento de clube sem plano reconhecido:", {
          externalReference,
          metadata,
        });
      }
    }

    let pastaColecionador = null;

    if (status === "approved") {
      console.log("PAGAMENTO APROVADO.", {
        paymentId: notificationId,
        externalReference,
        transactionAmount,
        metadata,
      });

      if (ehIngressoColecionavel(metadata)) {
        const cpf = limparNumero(
          textoSeguro(metadata.cpf) ||
            textoSeguro(metadata.cpfComprador) ||
            textoSeguro(payerCpf),
        );

        const quantidade =
          numeroSeguro(metadata.quantidade_total) ||
          numeroSeguro(metadata.quantidade) ||
          numeroSeguro(metadata.ingressos) ||
          1;

        const nomeIngressoEternizado =
          textoSeguro(metadata.nome_ingresso_eternizado) ||
          textoSeguro(metadata.nomeIngressoEternizado);

        pastaColecionador = await criarOuAtualizarPastaColecionador({
          cpf,
          nome:
            textoSeguro(metadata.nome) ||
            textoSeguro(metadata.nomeComprador) ||
            "Comprador",
          email:
            textoSeguro(metadata.email) ||
            textoSeguro(metadata.emailComprador) ||
            payerEmail,
          telefone:
            textoSeguro(metadata.telefone) || textoSeguro(metadata.whatsapp),
          quantidade,
          sextoIngresso:
            booleanoSeguro(metadata.sexto_ingresso) ||
            booleanoSeguro(metadata.sextoIngresso),
          nomeIngressoEternizado,
        });

        console.log("PASTA DO COLECIONADOR CRIADA/ATUALIZADA:", {
          paymentId: notificationId,
          cpf,
          pastaColecionador,
        });
      } else {
        console.log("Pagamento aprovado, mas não é ingresso colecionável.", {
          paymentId: notificationId,
          tipo: metadata.tipo,
        });
      }
    }

    if (status === "pending" || status === "in_process") {
      console.log("PAGAMENTO PENDENTE OU EM ANÁLISE.", {
        paymentId: notificationId,
        status,
        statusDetail,
      });
    }

    if (status === "rejected" || status === "cancelled") {
      console.log("PAGAMENTO RECUSADO OU CANCELADO.", {
        paymentId: notificationId,
        status,
        statusDetail,
      });
    }

    return NextResponse.json({
      received: true,
      paymentId: notificationId,
      status,
      statusPedido,
      statusDetail,
      externalReference,
      transactionAmount,
      paymentMethodId,
      paymentTypeId,
      payerEmail,
      payerCpf,
      dateApproved,
      preapprovalId,
      metadata,
      pedidoAtualizado,
      membroClube,
      pastaColecionador,
    });
  } catch (error) {
    console.error("ERRO NO WEBHOOK MERCADO PAGO:", error);

    return NextResponse.json(
      {
        error: "Erro ao processar webhook do Mercado Pago.",
        detalhe: transformarErroEmTexto(error),
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  return processarNotificacao(request);
}

export async function GET(request: Request) {
  return processarNotificacao(request);
}
