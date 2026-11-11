"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

const VALOR_PADRAO_CAMISA_EVENTO = 69.90;
const INGRESSOS_SIMBOLICOS_POR_CAMISA = 3;
const KG_ALIMENTOS_POR_CAMISA = 3;

type TamanhoCamisa = "P" | "M" | "G" | "GG" | "XG";

type CamisaEvento = {
  id: string;
  titulo: string;
  projeto: string;
  descricao: string;
  imagem: string;
  valor: number;
  limite?: number;
  dataEvento: string;
  localRetirada: string;
  observacaoRetirada: string;
};

type FormularioCamisa = {
  quantidade: number;
  tamanho: TamanhoCamisa;
  nomeCompleto: string;
  cpf: string;
  telefone: string;
};

const CAMISAS_EVENTOS: CamisaEvento[] = [
  {
    id: "camisa-hot-dogueres-salva-vidas-2027",
    titulo: "Camisa Hot Dogueres Salva Vidas",
    projeto: "Projeto Hot Dogueres Salva Vidas",
    descricao:
      "Camisa oficial do projeto. A compra será feita pelo site e a retirada acontecerá no local do evento.",
    imagem: "/camisas/camisa-ecossistema-hot-dogueres-apresentacao.png",
    valor: VALOR_PADRAO_CAMISA_EVENTO,
    dataEvento: "2027-01-25T17:00:00-03:00",
    localRetirada: "Local do evento — endereço será confirmado na página oficial.",
    observacaoRetirada:
      "Retirada mediante conferência de nome completo, CPF, telefone e tamanho informado na compra.",
  },
  {
    id: "camisa-gastronomia-que-salva-vidas-hemose-2027",
    titulo: "Camisa Gastronomia que Salva Vidas",
    projeto: "HEMOSE",
    descricao:
      "Camisa oficial da ação Gastronomia que Salva Vidas. Entrega no evento, sem venda em dinheiro no local.",
    imagem: "/camisas/camisa-gastronomia-que-salva-vidas.png",
    valor: VALOR_PADRAO_CAMISA_EVENTO,
    dataEvento: "2027-03-30T17:00:00-03:00",
    localRetirada: "Local do evento HEMOSE — ponto de retirada será informado.",
    observacaoRetirada:
      "Leve documento com CPF para conferência. A retirada será feita pela lista gerada no site.",
  },
  {
    id: "camisa-corrida-apoiando-avosos-2027",
    titulo: "Camisa Corrida Apoiando AVOSOS",
    projeto: "Corrida Apoiando AVOSOS",
    descricao:
      "Camisa oficial da corrida. Poderá fazer parte do kit atleta, conforme autorização e organização do evento.",
    imagem: "/camisas/camisa-ecossistema-hot-dogueres-apresentacao.png",
    valor: 89.9,
    limite: 3000,
    dataEvento: "2027-05-25T06:00:00-03:00",
    localRetirada:
      "Retirada em local autorizado pela organização da corrida ou no dia do evento.",
    observacaoRetirada:
      "A retirada será feita por nome, CPF, telefone e tamanho. Não haverá venda em dinheiro na entrega.",
  },
  {
    id: "camisa-segunda-corrida-apoiando-avosos-2027",
    titulo: "Camisa Segunda Corrida Apoiando AVOSOS",
    projeto: "Segunda Corrida Apoiando AVOSOS",
    descricao:
      "Segundo modelo anual da corrida. Valor e limite poderão ser ajustados conforme o kit atleta.",
    imagem: "/camisas/camisa-gastronomia-que-salva-vidas.png",
    valor: 99.9,
    limite: 3000,
    dataEvento: "2027-08-25T06:00:00-03:00",
    localRetirada:
      "Retirada em local autorizado pela organização da corrida ou no dia do evento.",
    observacaoRetirada:
      "Compra somente pelo site. A entrega será organizada por lista com nome, CPF, telefone e tamanho.",
  },
  {
    id: "camisa-corrida-aventura-primeira-2027",
    titulo: "Camisa Corrida de Aventura",
    projeto: "Corrida de Aventura",
    descricao:
      "Camisa para participantes da corrida de aventura. Quantidade reduzida por causa da logística e deslocamento.",
    imagem: "/camisas/camisa-ecossistema-hot-dogueres-apresentacao.png",
    valor: 129.9,
    limite: 300,
    dataEvento: "2027-09-25T06:00:00-03:00",
    localRetirada:
      "Retirada no ponto de encontro oficial da corrida de aventura.",
    observacaoRetirada:
      "Produto limitado aos participantes. A conferência será feita por nome, CPF, telefone e tamanho.",
  },
  {
    id: "camisa-festival-250-metros-2027",
    titulo: "Camisa Festival 250 Metros",
    projeto: "Festival 250 Metros",
    descricao:
      "Camisa oficial do festival. Modelo, valor e tamanhos poderão ser atualizados conforme o evento.",
    imagem: "/camisas/camisa-gastronomia-que-salva-vidas.png",
    valor: 69.9,
    dataEvento: "2027-11-25T16:00:00-03:00",
    localRetirada: "Retirada no local oficial do Festival 250 Metros.",
    observacaoRetirada:
      "A retirada será feita no evento mediante conferência do cadastro realizado na compra.",
  },
];

function criarDataBrasil(dataISO: string) {
  return new Date(dataISO);
}

function formatarMoeda(valor: number) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function formatarDataCompleta(dataISO: string) {
  return criarDataBrasil(dataISO).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function formatarDataCurta(data: Date) {
  return data.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function subtrairDias(data: Date, dias: number) {
  const novaData = new Date(data);
  novaData.setDate(novaData.getDate() - dias);

  return novaData;
}

function somenteNumeros(valor: string) {
  return valor.replace(/\D/g, "");
}

function formatarCpf(valor: string) {
  const numeros = somenteNumeros(valor).slice(0, 11);

  return numeros
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1-$2");
}

function formatarTelefone(valor: string) {
  const numeros = somenteNumeros(valor).slice(0, 11);

  if (numeros.length <= 10) {
    return numeros
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  }

  return numeros
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");
}

function obterPeriodoPreVenda(camisa: CamisaEvento) {
  const dataEvento = criarDataBrasil(camisa.dataEvento);
  const abertura = subtrairDias(dataEvento, 60);
  const fechamento = subtrairDias(dataEvento, 15);

  return {
    abertura,
    fechamento,
  };
}

function obterStatusPreVenda(camisa: CamisaEvento) {
  const hoje = new Date();
  const { abertura, fechamento } = obterPeriodoPreVenda(camisa);

  if (hoje < abertura) {
    return {
      status: "em-breve",
      texto: `Pré-venda abre em ${formatarDataCurta(abertura)}`,
      compraLiberada: false,
    };
  }

  if (hoje > fechamento) {
    return {
      status: "encerrada",
      texto: "Pré-venda encerrada",
      compraLiberada: false,
    };
  }

  return {
    status: "aberta",
    texto: `Pré-venda aberta até ${formatarDataCurta(fechamento)}`,
    compraLiberada: true,
  };
}

function ordenarCamisasParaHome(camisas: CamisaEvento[]) {
  return [...camisas]
    .sort((a, b) => {
      return (
        criarDataBrasil(a.dataEvento).getTime() -
        criarDataBrasil(b.dataEvento).getTime()
      );
    })
    .slice(0, 2);
}

export default function SecaoCamisasEventos() {
  const camisasHome = useMemo(() => ordenarCamisasParaHome(CAMISAS_EVENTOS), []);

  const [formularios, setFormularios] = useState<Record<string, FormularioCamisa>>(
    {},
  );

  const [carregando, setCarregando] = useState<string | null>(null);

  function obterFormulario(camisaId: string): FormularioCamisa {
    return (
      formularios[camisaId] || {
        quantidade: 1,
        tamanho: "M",
        nomeCompleto: "",
        cpf: "",
        telefone: "",
      }
    );
  }

  function atualizarFormulario(
    camisaId: string,
    dados: Partial<FormularioCamisa>,
  ) {
    setFormularios((estadoAtual) => {
      const formularioAtual = obterFormulario(camisaId);

      return {
        ...estadoAtual,
        [camisaId]: {
          ...formularioAtual,
          ...dados,
        },
      };
    });
  }

  function alterarQuantidade(camisaId: string, valor: number) {
    const formulario = obterFormulario(camisaId);
    const novaQuantidade = Math.max(1, formulario.quantidade + valor);

    atualizarFormulario(camisaId, {
      quantidade: novaQuantidade,
    });
  }

  async function comprarCamisa(camisa: CamisaEvento) {
    const formulario = obterFormulario(camisa.id);
    const cpfNumeros = somenteNumeros(formulario.cpf);
    const telefoneNumeros = somenteNumeros(formulario.telefone);
    const status = obterStatusPreVenda(camisa);

    if (!status.compraLiberada) {
      alert("A pré-venda desta camisa ainda não está aberta ou já foi encerrada.");
      return;
    }

    if (!formulario.nomeCompleto.trim()) {
      alert("Informe o nome completo para a retirada da camisa.");
      return;
    }

    if (cpfNumeros.length !== 11) {
      alert("Informe um CPF válido para a retirada da camisa.");
      return;
    }

    if (telefoneNumeros.length < 10) {
      alert("Informe um telefone/WhatsApp válido para contato.");
      return;
    }

    try {
      setCarregando(camisa.id);

      const resposta = await fetch("/api/checkout/camisas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: camisa.id,
          titulo: camisa.titulo,
          projeto: camisa.projeto,
          quantidade: formulario.quantidade,
          tamanho: formulario.tamanho,
          valorUnitario: camisa.valor,

          nomeComprador: formulario.nomeCompleto.trim(),
          cpfComprador: cpfNumeros,
          whatsappComprador: telefoneNumeros,

          modalidadeEntrega: "retirada_evento",
          tipoEntrega: "Retirada no local do evento",
          localRetirada: camisa.localRetirada,
          observacaoRetirada: camisa.observacaoRetirada,
          dataEvento: camisa.dataEvento,

          ingressosSimbolicos:
            formulario.quantidade * INGRESSOS_SIMBOLICOS_POR_CAMISA,
          kgAlimentos: formulario.quantidade * KG_ALIMENTOS_POR_CAMISA,
        }),
      });

      const textoResposta = await resposta.text();

      let dados: Record<string, unknown> | null = null;

      try {
        dados = JSON.parse(textoResposta) as Record<string, unknown>;
      } catch {
        console.error("Resposta não JSON no checkout de camisas:", textoResposta);

        alert(
          "O checkout de camisas retornou uma página HTML em vez de JSON. Verifique se a rota /api/checkout/camisas está publicada corretamente na Vercel.",
        );

        return;
      }

      console.log("Resposta checkout camisas:", dados);

      const linkPagamento =
        typeof dados.initPoint === "string"
          ? dados.initPoint
          : typeof dados.init_point === "string"
            ? dados.init_point
            : typeof dados.url === "string"
              ? dados.url
              : typeof dados.sandbox_init_point === "string"
                ? dados.sandbox_init_point
                : "";

      if (linkPagamento) {
        window.location.href = linkPagamento;
        return;
      }

      alert(
        typeof dados.error === "string"
          ? dados.error
          : "Não foi possível iniciar o pagamento. Link de pagamento não retornado.",
      );
    } catch (erro) {
      console.error("Erro ao comprar camisa:", erro);
      alert("Erro ao conectar com o pagamento. Tente novamente.");
    } finally {
      setCarregando(null);
    }
  }

  return (
    <>
      {camisasHome.map((camisa, index) => {
        const formulario = obterFormulario(camisa.id);
        const primeiraCamisa = index === 0;
        const status = obterStatusPreVenda(camisa);
        const { abertura, fechamento } = obterPeriodoPreVenda(camisa);

        const valorTotal = formulario.quantidade * camisa.valor;
        const ingressosTotal =
          formulario.quantidade * INGRESSOS_SIMBOLICOS_POR_CAMISA;
        const kgTotal = formulario.quantidade * KG_ALIMENTOS_POR_CAMISA;

        return (
          <article
            key={camisa.id}
            className={`rounded-[2rem] bg-white p-5 shadow-xl ring-1 ${
              primeiraCamisa ? "ring-red-100" : "ring-green-100"
            }`}
          >
            <p
              className={`inline-flex rounded-full px-4 py-2 text-xs font-black uppercase tracking-wide ${
                primeiraCamisa
                  ? "bg-gray-950 text-white"
                  : "bg-green-600 text-white"
              }`}
            >
              Camisa oficial de evento
            </p>

            <h2 className="mt-4 text-2xl font-black leading-tight text-gray-950">
              {camisa.titulo}
            </h2>

            <p className="mt-1 text-sm font-black uppercase tracking-wide text-red-600">
              {camisa.projeto}
            </p>

            <p className="mt-3 text-sm leading-relaxed text-gray-700">
              {camisa.descricao}
            </p>

            <div className="mt-4 rounded-2xl bg-yellow-50 p-4 text-sm font-bold leading-relaxed text-gray-800 ring-1 ring-yellow-200">
              <p className="font-black uppercase text-yellow-800">
                Como funciona a pré-venda
              </p>

              <p className="mt-2">
                A venda abre 60 dias antes do evento, fica disponível por 45
                dias e encerra 15 dias antes da entrega. Esse prazo permite
                confeccionar as camisas e organizar a lista de retirada.
              </p>

              <p className="mt-2">
                <strong>Pré-venda:</strong> {formatarDataCurta(abertura)} a{" "}
                {formatarDataCurta(fechamento)}
              </p>

              <p>
                <strong>Entrega:</strong> {formatarDataCompleta(camisa.dataEvento)}
              </p>

              <p>
                <strong>Retirada:</strong> {camisa.localRetirada}
              </p>
            </div>

            <div className="mt-4 rounded-2xl bg-red-50 p-4 text-center ring-1 ring-red-100">
              <p className="text-xs font-black uppercase tracking-wide text-red-600">
                Status
              </p>

              <p
                className={`mt-1 text-sm font-black ${
                  status.compraLiberada ? "text-green-700" : "text-gray-700"
                }`}
              >
                {status.texto}
              </p>
            </div>

            <div className="relative mt-5 h-72 overflow-hidden rounded-[1.5rem] bg-gray-50 shadow-inner">
              <Image
                src={camisa.imagem}
                alt={camisa.titulo}
                fill
                sizes="(max-width: 1024px) 100vw, 520px"
                className="object-contain p-3"
                unoptimized
              />
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-gray-50 p-4 text-center shadow-sm">
                <p className="text-[10px] font-black uppercase text-gray-500">
                  Valor
                </p>

                <p className="mt-1 text-2xl font-black text-red-600">
                  {formatarMoeda(camisa.valor)}
                </p>
              </div>

              <div className="rounded-2xl bg-yellow-50 p-4 text-center shadow-sm">
                <p className="text-[10px] font-black uppercase text-gray-500">
                  Ingressos
                </p>

                <p className="mt-1 text-2xl font-black text-gray-950">
                  +{ingressosTotal}
                </p>
              </div>

              <div className="rounded-2xl bg-green-50 p-4 text-center shadow-sm">
                <p className="text-[10px] font-black uppercase text-gray-500">
                  Alimentos
                </p>

                <p className="mt-1 text-2xl font-black text-green-700">
                  +{kgTotal} kg
                </p>
              </div>
            </div>

            {camisa.limite && (
              <div className="mt-4 rounded-2xl bg-gray-950 p-4 text-center text-white">
                <p className="text-xs font-black uppercase tracking-wide text-yellow-300">
                  Quantidade limitada
                </p>

                <p className="mt-1 text-sm font-bold">
                  Limite inicial: {camisa.limite.toLocaleString("pt-BR")} camisas.
                </p>
              </div>
            )}

            <div className="mt-5 rounded-2xl bg-gray-50 p-4 shadow-sm">
              <p className="text-[10px] font-black uppercase tracking-wide text-gray-500">
                Cadastro para retirada
              </p>

              <div className="mt-3 grid gap-3">
                <input
                  type="text"
                  value={formulario.nomeCompleto}
                  onChange={(evento) =>
                    atualizarFormulario(camisa.id, {
                      nomeCompleto: evento.target.value,
                    })
                  }
                  placeholder="Nome completo"
                  className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-gray-950 outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100"
                />

                <input
                  type="text"
                  value={formulario.cpf}
                  onChange={(evento) =>
                    atualizarFormulario(camisa.id, {
                      cpf: formatarCpf(evento.target.value),
                    })
                  }
                  placeholder="CPF"
                  inputMode="numeric"
                  className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-gray-950 outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100"
                />

                <input
                  type="text"
                  value={formulario.telefone}
                  onChange={(evento) =>
                    atualizarFormulario(camisa.id, {
                      telefone: formatarTelefone(evento.target.value),
                    })
                  }
                  placeholder="Telefone/WhatsApp"
                  inputMode="tel"
                  className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-gray-950 outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100"
                />
              </div>
            </div>

            <div className="mt-5 rounded-2xl bg-gray-50 p-4 shadow-sm">
              <p className="text-[10px] font-black uppercase tracking-wide text-gray-500">
                Escolha o tamanho
              </p>

              <div className="mt-3 grid grid-cols-5 gap-2">
                {(["P", "M", "G", "GG", "XG"] as TamanhoCamisa[]).map(
                  (tamanho) => (
                    <button
                      key={tamanho}
                      type="button"
                      onClick={() =>
                        atualizarFormulario(camisa.id, {
                          tamanho,
                        })
                      }
                      className={`rounded-full px-3 py-3 text-xs font-black transition ${
                        formulario.tamanho === tamanho
                          ? primeiraCamisa
                            ? "bg-red-600 text-white shadow-md"
                            : "bg-green-600 text-white shadow-md"
                          : "bg-white text-gray-950 hover:bg-red-50"
                      }`}
                    >
                      {tamanho}
                    </button>
                  ),
                )}
              </div>
            </div>

            <div className="mt-5 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => alterarQuantidade(camisa.id, -1)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl font-black text-red-600 shadow-md transition hover:bg-red-100"
              >
                -
              </button>

              <span className="min-w-10 text-center text-2xl font-black text-gray-950">
                {formulario.quantidade}
              </span>

              <button
                type="button"
                onClick={() => alterarQuantidade(camisa.id, 1)}
                className={`flex h-10 w-10 items-center justify-center rounded-full text-xl font-black text-white shadow-md transition ${
                  primeiraCamisa
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                +
              </button>
            </div>

            <div className="mt-5 rounded-2xl bg-gray-50 p-4 text-center shadow-sm">
              <p className="text-[10px] font-black uppercase text-gray-500">
                Total da compra
              </p>

              <p className="mt-1 text-2xl font-black text-gray-950">
                {formatarMoeda(valorTotal)}
              </p>

              <p className="mt-1 text-xs font-bold text-green-700">
                {ingressosTotal} ingressos simbólicos + {kgTotal} kg de alimentos
              </p>
            </div>

            <p className="mt-4 text-center text-xs font-bold leading-relaxed text-gray-500">
              {camisa.observacaoRetirada}
            </p>

            <button
              type="button"
              onClick={() => comprarCamisa(camisa)}
              disabled={carregando === camisa.id || !status.compraLiberada}
              className={`mt-5 flex w-full justify-center rounded-full px-5 py-3 text-xs font-black uppercase tracking-wide text-white shadow-lg transition disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-600 ${
                primeiraCamisa
                  ? "bg-gray-950 hover:bg-gray-800"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {carregando === camisa.id
                ? "Gerando pagamento..."
                : status.compraLiberada
                  ? "Comprar camisa no Mercado Pago"
                  : "Pré-venda indisponível"}
            </button>
          </article>
        );
      })}
    </>
  );
}
