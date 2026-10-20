"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import SetasNavegacao from "@/components/SetasNavegacao";

const IMAGENS_INGRESSOS = [
  { titulo: "Ingresso Colecionável 01", imagem: "/loja-solidaria/ingressos/ingresso-01.png" },
  { titulo: "Ingresso Colecionável 02", imagem: "/loja-solidaria/ingressos/ingresso-02.png" },
  { titulo: "Ingresso Colecionável 03", imagem: "/loja-solidaria/ingressos/ingresso-03.png" },
  { titulo: "Ingresso Colecionável 04", imagem: "/loja-solidaria/ingressos/ingresso-04.png" },
  { titulo: "Ingresso Colecionável 05", imagem: "/loja-solidaria/ingressos/ingresso-05.png" },
  { titulo: "Ingresso Colecionável 06", imagem: "/loja-solidaria/ingressos/ingresso-06.png" },
  { titulo: "Ingresso Colecionável 07", imagem: "/loja-solidaria/ingressos/ingresso-07.png" },
];

const INGRESSO_APRESENTACAO_DO_ECOSSISTEMA_HOT_DOGUERES = {
  titulo: "Apresentação Do Ecossistema Hot Dogueres 2026",
  imagem: "/loja-solidaria/ingressos/apresentacao-do-ecossistema-hot-dogueres-2026.png",
};

const CHECKOUT_ALIMENTO_URL = "/checkout/alimentos";
const CHECKOUT_RACAO_URL = "/checkout/racao";

type KitSolidario = {
  id: string;
  titulo: string;
  descricao: string;
  imagem: string;
  valor: string;
  valorNumero: number;
  pesoKg: number;
  quantidade: string;
  href: string;
};

const KITS_ALIMENTOS: KitSolidario[] = [
  {
    id: "alimento-essencial-2kg",
    titulo: "Kit Alimento Essencial 2kg",
    descricao: "Ajuda na compra de alimentos básicos para famílias em situação de vulnerabilidade.",
    imagem: "/kits/alimento-essencial-2kg.png",
    valor: "R$ 22,00",
    valorNumero: 22,
    pesoKg: 2,
    quantidade: "2 kg de alimentos",
    href: CHECKOUT_ALIMENTO_URL,
  },
  {
    id: "cesta-solidaria-5kg",
    titulo: "Kit Cesta Solidária 5kg",
    descricao: "Contribuição para ampliar a compra de alimentos da campanha.",
    imagem: "/kits/cesta-solidaria-5kg.png",
    valor: "R$ 55,00",
    valorNumero: 55,
    pesoKg: 5,
    quantidade: "5 kg de alimentos",
    href: CHECKOUT_ALIMENTO_URL,
  },
  {
    id: "familia-protegida-10kg",
    titulo: "Kit Família Protegida 10kg",
    descricao: "Apoio maior para alimentos, logística, separação e entrega.",
    imagem: "/kits/familia-protegida-10kg.png",
    valor: "R$ 120,00",
    valorNumero: 120,
    pesoKg: 10,
    quantidade: "10 kg de alimentos",
    href: CHECKOUT_ALIMENTO_URL,
  },
  {
    id: "cesta-basica-14kg",
    titulo: "Kit Cesta Básica 14kg",
    descricao: "Apoio maior para alimentos, logística, separação e entrega.",
    imagem: "/kits/cesta-basica-14kg.png",
    valor: "R$ 150,00",
    valorNumero: 150,
    pesoKg: 14,
    quantidade: "14 kg de alimentos",
    href: CHECKOUT_ALIMENTO_URL,
  },
];

const KITS_RACAO: KitSolidario[] = [
  {
    id: "racao-solidaria-1kg",
    titulo: "Kit Ração Solidária 1kg",
    descricao: "Ajuda na compra de ração para cães e gatos em situação de abandono.",
    imagem: "/kits/racao-solidaria-1kg.png",
    valor: "R$ 25,00",
    valorNumero: 25,
    pesoKg: 1,
    quantidade: "1 kg de ração",
    href: CHECKOUT_RACAO_URL,
  },
  {
    id: "patinhas-felizes-5kg",
    titulo: "Kit Patinhas Felizes 5kg",
    descricao: "Contribuição para compra, transporte e entrega de ração.",
    imagem: "/kits/patinhas-felizes-5kg.png",
    valor: "R$ 75,00",
    valorNumero: 75,
    pesoKg: 5,
    quantidade: "5 kg de ração",
    href: CHECKOUT_RACAO_URL,
  },
  {
    id: "protetor-animal-10kg",
    titulo: "Kit Protetor Animal 10kg",
    descricao: "Apoio maior para protetores e ações de cuidado animal.",
    imagem: "/kits/protetor-animal-10kg.png",
    valor: "R$ 150,00",
    valorNumero: 150,
    pesoKg: 10,
    quantidade: "10 kg de ração",
    href: CHECKOUT_RACAO_URL,
  },
  {
    id: "ong-20kg",
    titulo: "Kit ONG 20kg",
    descricao: "Apoio maior para protetores e ações de cuidado animal.",
    imagem: "/kits/ong-20kg.png",
    valor: "R$ 285,00",
    valorNumero: 285,
    pesoKg: 20,
    quantidade: "20 kg de ração",
    href: CHECKOUT_RACAO_URL,
  },
];

function montarLinkCheckout({
  href,
  kit,
  titulo,
  quantidade,
  valor,
  kg,
}: {
  href: string;
  kit: string;
  titulo: string;
  quantidade: number;
  valor: number;
  kg: number;
}) {
  const parametros = new URLSearchParams({
    kit,
    titulo,
    quantidade: String(quantidade),
    valor: String(valor),
    kg: String(kg),
  });

  return `${href}?${parametros.toString()}`;
}

function formatarMoeda(valor: number) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

const CORES_KIT = {
  red: {
    valor: "text-red-600",
    botaoMenos: "text-red-600 hover:bg-red-100",
    botaoMais: "bg-red-600 hover:bg-red-700",
    comprar: "bg-red-600 hover:bg-red-700",
  },
  blue: {
    valor: "text-blue-600",
    botaoMenos: "text-blue-600 hover:bg-blue-100",
    botaoMais: "bg-blue-600 hover:bg-blue-700",
    comprar: "bg-blue-600 hover:bg-blue-700",
  },
} as const;

function CardKitComQuantidade({
  kit,
  quantidade,
  onAlterarQuantidade,
  destaque = "red",
}: {
  kit: KitSolidario;
  quantidade: number;
  onAlterarQuantidade: (id: string, valor: number) => void;
  destaque?: "red" | "blue";
}) {
  const quantidadeAtual = quantidade || 1;
  const totalValor = quantidadeAtual * kit.valorNumero;
  const totalKg = quantidadeAtual * kit.pesoKg;
  const cores = CORES_KIT[destaque];

  return (
    <div className="flex h-full flex-col rounded-3xl border-2 border-red-100 bg-white p-4 shadow-lg transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-72 overflow-hidden rounded-2xl bg-[#fff7e8]">
        <Image
          src={kit.imagem}
          alt={kit.titulo}
          fill
          sizes="(max-width: 768px) 100vw, 320px"
          className="object-contain p-3"
          unoptimized
        />
      </div>

      <h3 className="mt-4 text-center text-lg font-black text-red-700">
        {kit.titulo}
      </h3>

      <p className="mt-2 text-center text-sm font-semibold leading-relaxed text-gray-700">
        {kit.descricao}
      </p>

      <div className="mt-4 rounded-2xl bg-[#fff7e8] p-4 text-center">
        <p className="text-[10px] font-black uppercase text-gray-500">Valor do kit</p>
        <p className={`mt-1 text-2xl font-black ${cores.valor}`}>{kit.valor}</p>
        <p className="mt-1 text-xs font-bold text-gray-600">{kit.quantidade}</p>
      </div>

      <div className="mt-4 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => onAlterarQuantidade(kit.id, -1)}
          className={`flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-xl font-black shadow-md transition ${cores.botaoMenos}`}
        >
          -
        </button>

        <span className="min-w-10 text-center text-2xl font-black text-gray-950">
          {quantidadeAtual}
        </span>

        <button
          type="button"
          onClick={() => onAlterarQuantidade(kit.id, 1)}
          className={`flex h-10 w-10 items-center justify-center rounded-full text-xl font-black text-white shadow-md transition ${cores.botaoMais}`}
        >
          +
        </button>
      </div>

      <div className="mt-4 rounded-2xl bg-gray-50 p-4 text-center">
        <p className="text-[10px] font-black uppercase text-gray-500">Total selecionado</p>
        <p className="mt-1 text-lg font-black text-gray-950">{formatarMoeda(totalValor)}</p>
        <p className="mt-1 text-xs font-bold text-green-700">{totalKg} kg</p>
      </div>

      <Link
        href={montarLinkCheckout({
          href: kit.href,
          kit: kit.id,
          titulo: kit.titulo,
          quantidade: quantidadeAtual,
          valor: totalValor,
          kg: totalKg,
        })}
        className={`mt-5 flex w-full justify-center rounded-full px-5 py-3 text-center text-sm font-black text-white shadow-md transition ${cores.comprar}`}
      >
        Comprar agora
      </Link>
    </div>
  );
}

const CAMISAS_EVENTOS_OFICIAIS = Array.from({ length: 3 }, (_, index) => ({
  titulo: `Camisa Evento Oficial ${String(index + 1).padStart(2, "0")}`,
  imagem: `/loja-solidaria/camisas/eventos-oficiais-${String(index + 1).padStart(2, "0")}.png`,
}));

const CAMISAS_ESPORTIVAS = Array.from({ length: 2 }, (_, index) => ({
  titulo: `Camisa Evento Esportivo ${String(index + 1).padStart(2, "0")}`,
  imagem: `/loja-solidaria/camisas/esportiva-${String(index + 1).padStart(2, "0")}.png`,
}));

const CAMISAS_GAMER = Array.from({ length: 8 }, (_, index) => ({
  titulo: `Camisa Gamer ${String(index + 1).padStart(2, "0")}`,
  imagem: `/loja-solidaria/camisas/gamer-${String(index + 1).padStart(2, "0")}.png`,
}));

const CAMISAS_INFANTIS_JORNADA = Array.from({ length: 8 }, (_, index) => ({
  titulo: `Camisa Infantil A Jornada Hot Dogueres ${String(index + 1).padStart(2, "0")}`,
  imagem: `/loja-solidaria/camisas/jornada-infantil-${String(index + 1).padStart(2, "0")}.png`,
}));

type ItemCarrossel = {
  titulo: string;
  imagem: string;
};

type ProdutoImagem = {
  titulo: string;
  imagem: string;
};

type LivroPreVenda = {
  numero: number;
  titulo: string;
  imagem: string;
  inicio: Date;
  fechamento: Date;
  entrega: Date;
};

const TAMANHOS_CAMISA = ["PP", "P", "M", "G", "GG", "XG", "G1", "G2"];

function formatarData(data: Date) {
  return data.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function criarData(ano: number, mes: number, dia: number, fimDoDia = false) {
  return new Date(
    ano,
    mes - 1,
    dia,
    fimDoDia ? 23 : 0,
    fimDoDia ? 59 : 0,
    fimDoDia ? 59 : 0,
  );
}

function gerarLivrosPreVenda({
  quantidade,
  prefixoTitulo,
  pasta,
  baseAno = 2026,
  baseMes = 7,
}: {
  quantidade: number;
  prefixoTitulo: string;
  pasta: string;
  baseAno?: number;
  baseMes?: number;
}) {
  return Array.from({ length: quantidade }, (_, index) => {
    const numero = index + 1;
    const mesInicio = baseMes + index;

    return {
      numero,
      titulo: `${prefixoTitulo} ${String(numero).padStart(2, "0")}`,
      imagem: `/loja-solidaria/livros/${pasta}-${String(numero).padStart(2, "0")}.png`,
      inicio: criarData(baseAno, mesInicio, 10),
      fechamento: criarData(baseAno, mesInicio + 1, 20, true),
      entrega: criarData(baseAno, mesInicio + 2, 12),
    };
  });
}

function statusPreVenda(livro: LivroPreVenda, hoje: Date) {
  if (hoje < livro.inicio) {
    return "futura";
  }

  if (hoje > livro.fechamento) {
    return "encerrada";
  }

  return "ativa";
}

function CarrosselImagens({
  itens,
  altura = "h-[380px]",
  corAtiva = "bg-red-600",
}: {
  itens: ItemCarrossel[];
  altura?: string;
  corAtiva?: string;
}) {
  const [indiceAtual, setIndiceAtual] = useState(0);

  const itemAtual = itens[indiceAtual];

  useEffect(() => {
    const intervalo = window.setInterval(() => {
      setIndiceAtual((valorAtual) => {
        return (valorAtual + 1) % itens.length;
      });
    }, 5000);

    return () => {
      window.clearInterval(intervalo);
    };
  }, [itens.length]);

  return (
    <div className="w-full">
      <div className={`relative ${altura} overflow-hidden rounded-[2rem] bg-white shadow-xl ring-1 ring-red-100`}>
        <Image
          key={itemAtual.imagem}
          src={itemAtual.imagem}
          alt={itemAtual.titulo}
          fill
          sizes="(max-width: 768px) 100vw, 700px"
          className="object-contain p-4 transition-all duration-500"
          unoptimized
        />
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {itens.map((item, index) => (
          <button
            key={item.imagem}
            type="button"
            onClick={() => setIndiceAtual(index)}
            className={`h-3 rounded-full transition ${
              indiceAtual === index ? `w-10 ${corAtiva}` : "w-3 bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Ir para ${item.titulo}`}
          />
        ))}
      </div>
    </div>
  );
}

function CardCamisa({
  produto,
  observacao,
  destaque = "red",
}: {
  produto: ProdutoImagem;
  observacao?: string;
  destaque?: "red" | "yellow" | "green";
}) {
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState("");
  const [cep, setCep] = useState("");
  const [freteCalculado, setFreteCalculado] = useState<{
    titulo: string;
    valor: string;
    prazo: string;
  } | null>(null);

  const corBotao =
    destaque === "yellow"
      ? "bg-yellow-400 text-gray-950 hover:bg-yellow-500"
      : destaque === "green"
        ? "bg-green-600 text-white hover:bg-green-700"
        : "bg-red-600 text-white hover:bg-red-700";

  function calcularFrete() {
    const cepLimpo = cep.replace(/\D/g, "");

    if (cepLimpo.length !== 8) {
      alert("Digite um CEP válido com 8 números.");
      return;
    }

    const cepSergipe = cepLimpo.startsWith("49");

    if (cepSergipe) {
      setFreteCalculado({
        titulo: "Entrega local / Sergipe",
        valor: "R$ 12,00",
        prazo: "até 5 dias úteis após a produção",
      });

      return;
    }

    setFreteCalculado({
      titulo: "Envio nacional estimado",
      valor: "A calcular no checkout",
      prazo: "prazo conforme Correios, transportadora ou Mercado Livre",
    });
  }

  const PRECO_CAMISA = 99.9;
  const checkoutUrl = `/checkout?produto=${encodeURIComponent(
    produto.titulo,
  )}&tamanho=${encodeURIComponent(tamanhoSelecionado)}&cep=${encodeURIComponent(cep)}&valor=${PRECO_CAMISA}`;

  return (
    <div className="flex h-full flex-col rounded-3xl border-2 border-red-100 bg-white p-4 shadow-lg transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-72 overflow-hidden rounded-2xl bg-[#fff7e8]">
        <Image
          src={produto.imagem}
          alt={produto.titulo}
          fill
          sizes="(max-width: 768px) 100vw, 320px"
          className="object-contain p-3"
          unoptimized
        />

        <div className="absolute left-3 top-3 rounded-full bg-yellow-400 px-3 py-1 text-xs font-black text-gray-950 shadow">
          Pré-venda
        </div>
      </div>

      <div className="flex flex-1 flex-col">
        <h3 className="mt-4 text-center text-lg font-black text-red-700">{produto.titulo}</h3>

        {observacao && (
          <p className="mt-2 text-center text-sm font-semibold leading-relaxed text-gray-700">
            {observacao}
          </p>
        )}

        <div className="mt-5">
          <p className="mb-3 text-sm font-black text-gray-800">Escolha o tamanho:</p>

          <div className="flex flex-wrap gap-2">
            {TAMANHOS_CAMISA.map((tamanho) => (
              <button
                key={tamanho}
                type="button"
                onClick={() => setTamanhoSelecionado(tamanho)}
                className={`rounded-full px-4 py-2 text-sm font-black transition ${
                  tamanhoSelecionado === tamanho
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                {tamanho}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 rounded-2xl bg-[#fff7e8] p-4">
          <p className="text-sm font-black text-gray-800">Calcular frete:</p>

          <div className="mt-3 flex gap-2">
            <input
              value={cep}
              onChange={(event) => setCep(event.target.value)}
              placeholder="Digite seu CEP"
              className="min-w-0 flex-1 rounded-full border border-gray-300 px-4 py-2 text-sm font-bold outline-none focus:border-red-500"
            />

            <button
              type="button"
              onClick={calcularFrete}
              className="rounded-full bg-gray-950 px-4 py-2 text-sm font-black text-white transition hover:bg-gray-800"
            >
              Frete
            </button>
          </div>

          {freteCalculado && (
            <div className="mt-3 rounded-xl bg-white p-3 text-sm font-bold text-gray-800">
              <p>{freteCalculado.titulo}</p>
              <p>Valor: {freteCalculado.valor}</p>
              <p>Prazo: {freteCalculado.prazo}</p>
            </div>
          )}
        </div>

        <div className="mt-5 rounded-2xl bg-green-100 p-4 text-sm font-bold text-green-800">
          Após o pagamento, você receberá a confirmação do pedido e a previsão de entrega da camisa.
        </div>

        {tamanhoSelecionado ? (
          <Link
            href={checkoutUrl}
            className={`mt-5 rounded-full px-5 py-3 text-center text-sm font-black shadow-md transition ${corBotao}`}
          >
            Ir para pagamento
          </Link>
        ) : (
          <button
            type="button"
            disabled
            className="mt-5 cursor-not-allowed rounded-full bg-gray-300 px-5 py-3 text-center text-sm font-black text-gray-600"
          >
            Escolha um tamanho
          </button>
        )}
      </div>
    </div>
  );
}

function GradeCamisas({
  produtos,
  observacao,
  destaque = "red",
}: {
  produtos: ProdutoImagem[];
  observacao?: string;
  destaque?: "red" | "yellow" | "green";
}) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {produtos.map((produto) => (
        <CardCamisa key={produto.imagem} produto={produto} observacao={observacao} destaque={destaque} />
      ))}
    </div>
  );
}

function CardLivro({ livro, hoje }: { livro: LivroPreVenda; hoje: Date }) {
  const status = statusPreVenda(livro, hoje);

  const statusTexto =
    status === "ativa"
      ? "Pré-venda aberta"
      : status === "futura"
        ? "Pré-venda programada"
        : "Pré-venda encerrada";

  const statusClasse =
    status === "ativa"
      ? "bg-green-100 text-green-800"
      : status === "futura"
        ? "bg-yellow-100 text-yellow-800"
        : "bg-gray-200 text-gray-700";

  return (
    <div className="rounded-3xl border-2 border-red-100 bg-white p-4 shadow-lg">
      <div className="relative h-72 overflow-hidden rounded-2xl bg-[#fff7e8]">
        <Image
          src={livro.imagem}
          alt={livro.titulo}
          fill
          sizes="(max-width: 768px) 100vw, 320px"
          className="object-contain p-3"
          unoptimized
        />
      </div>

      <div className={`mx-auto mt-4 w-fit rounded-full px-4 py-2 text-xs font-black ${statusClasse}`}>
        {statusTexto}
      </div>

      <h3 className="mt-3 text-center text-lg font-black text-red-700">{livro.titulo}</h3>

      <div className="mt-4 space-y-2 rounded-2xl bg-[#fff7e8] p-4 text-sm font-semibold text-gray-800">
        <p>
          <span className="font-black text-red-700">Abre:</span> {formatarData(livro.inicio)}
        </p>

        <p>
          <span className="font-black text-red-700">Fecha:</span> {formatarData(livro.fechamento)}
        </p>

        <p>
          <span className="font-black text-red-700">Entrega:</span> {formatarData(livro.entrega)}
        </p>
      </div>

      <p className="mt-3 text-center text-xs font-semibold leading-relaxed text-gray-600">
        Produto em pré-venda. Livros não incluem doação de alimentos, pois o custo de produção é alto e o lucro é mínimo.
      </p>

      <button
        type="button"
        disabled
        className="mt-4 block w-full cursor-not-allowed rounded-full bg-yellow-300 px-5 py-3 text-center text-sm font-black text-gray-800"
      >
        Compra online dos livros em breve
      </button>
    </div>
  );
}

function SecaoLivros({
  titulo,
  descricao,
  livros,
  hoje,
}: {
  titulo: string;
  descricao: string;
  livros: LivroPreVenda[];
  hoje: Date;
}) {
  return (
    <div className="mt-10">
      <div className="mb-8 text-center">
        <h3 className="text-2xl font-black text-red-700 md:text-4xl">{titulo}</h3>

        <p className="mx-auto mt-3 max-w-3xl font-medium leading-relaxed text-gray-800">{descricao}</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {livros.map((livro) => (
          <CardLivro key={livro.imagem} livro={livro} hoje={hoje} />
        ))}
      </div>
    </div>
  );
}

function FormularioProjetoEspecial() {
  const [nome, setNome] = useState("");
  const [contato, setContato] = useState("");
  const [mensagem, setMensagem] = useState("");

  function enviar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const assunto = encodeURIComponent("Interesse em Projeto Especial Hot Dogueres");
    const corpo = encodeURIComponent(`Nome: ${nome}\nContato: ${contato}\n\nMensagem:\n${mensagem}`);

    window.location.href = `mailto:contato@hotdogueres.com.br?subject=${assunto}&body=${corpo}`;
  }

  return (
    <form onSubmit={enviar} className="mx-auto mt-8 max-w-xl space-y-3 rounded-2xl bg-white/15 p-5 text-left">
      <input
        value={nome}
        onChange={(event) => setNome(event.target.value)}
        placeholder="Seu nome"
        required
        className="w-full rounded-full px-5 py-3 text-sm font-bold text-gray-900 outline-none"
      />
      <input
        value={contato}
        onChange={(event) => setContato(event.target.value)}
        placeholder="E-mail ou telefone"
        required
        className="w-full rounded-full px-5 py-3 text-sm font-bold text-gray-900 outline-none"
      />
      <textarea
        value={mensagem}
        onChange={(event) => setMensagem(event.target.value)}
        placeholder="Conte um pouco sobre o projeto ou instituição"
        required
        rows={4}
        className="w-full rounded-2xl px-5 py-3 text-sm font-bold text-gray-900 outline-none"
      />
      <button
        type="submit"
        className="w-full rounded-full bg-yellow-400 px-6 py-3 text-sm font-black text-gray-950 shadow-md transition hover:bg-yellow-500"
      >
        Enviar interesse
      </button>
    </form>
  );
}

function CardCartoonLojaSolidaria() {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-10">
      <div className="relative overflow-hidden rounded-[2.5rem] border-4 border-red-600 bg-gradient-to-br from-yellow-100 via-white to-red-50 p-6 shadow-2xl md:p-10">
        <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-yellow-300/50 blur-2xl" />
        <div className="absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-red-300/40 blur-2xl" />

        <div className="relative grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <div className="mx-auto w-full max-w-xs sm:max-w-md">
  <div className="relative mx-auto rounded-[2rem] border-4 border-gray-950 bg-white p-5 shadow-xl">
    <div className="absolute left-1/2 -top-5 -translate-x-1/2 rotate-0 rounded-2xl bg-red-600 px-4 py-2 text-sm font-black text-white shadow-lg">
      Loja Solidária
    </div>

    <div className="mx-auto rounded-[1.5rem] bg-[#fff7e8] p-5">
      <div className="mx-auto grid max-w-xs grid-cols-2 justify-center gap-4 sm:max-w-none">

                  <div className="rounded-3xl border-4 border-red-500 bg-white p-5 text-center shadow-md">
                    <p className="text-5xl">🎟️</p>
                    <p className="mt-2 text-sm font-black text-red-700">Ingressos</p>
                  </div>

                  <div className="rounded-3xl border-4 border-yellow-400 bg-white p-5 text-center shadow-md">
                    <p className="text-5xl">📚</p>
                    <p className="mt-2 text-sm font-black text-yellow-700">Livros</p>
                  </div>

                  <div className="rounded-3xl border-4 border-green-500 bg-white p-5 text-center shadow-md">
                    <p className="text-5xl">👕</p>
                    <p className="mt-2 text-sm font-black text-green-700">Camisas</p>
                  </div>

                  <div className="rounded-3xl border-4 border-orange-400 bg-white p-5 text-center shadow-md">
                    <p className="text-5xl">🥫</p>
                    <p className="mt-2 text-sm font-black text-orange-700">Kits</p>
                  </div>
                </div>

                <div className="mt-5 rounded-3xl bg-gray-950 p-4 text-center text-white shadow-lg">
                  <p className="text-sm font-black uppercase tracking-wide text-yellow-300">
                    Cada compra ajuda uma causa
                  </p>
                  <p className="mt-1 text-2xl font-black">Comprar também é doar</p>
                </div>
              </div>

              <div className="absolute -bottom-5 right-6 rounded-full border-4 border-gray-950 bg-yellow-400 px-5 py-3 text-sm font-black text-gray-950 shadow-lg">
                ❤️ Solidariedade
              </div>
            </div>
          </div>

          <div className="text-center md:text-left">
            <span className="inline-flex rounded-full bg-green-100 px-5 py-2 text-sm font-black uppercase tracking-wide text-green-700">
              Universo Hot Dogueres
            </span>

            <h2 className="mt-5 text-4xl font-black leading-tight text-red-700 md:text-6xl">Loja Solidária</h2>

            <p className="mt-5 text-lg font-semibold leading-relaxed text-gray-800 md:text-xl">
              Ingressos colecionáveis, livros em pré-venda, camisas especiais e kits solidários reunidos em uma
              experiência divertida, colorida e com impacto social.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <div className="rounded-3xl bg-white p-4 text-center shadow-md ring-1 ring-red-100">
                <p className="text-3xl font-black text-red-600">🎟️</p>
                <p className="mt-1 text-xs font-black uppercase text-gray-600">Colecionáveis</p>
              </div>

              <div className="rounded-3xl bg-white p-4 text-center shadow-md ring-1 ring-yellow-100">
                <p className="text-3xl font-black text-yellow-600">📦</p>
                <p className="mt-1 text-xs font-black uppercase text-gray-600">Pré-venda</p>
              </div>

              <div className="rounded-3xl bg-white p-4 text-center shadow-md ring-1 ring-green-100">
                <p className="text-3xl font-black text-green-600">🤝</p>
                <p className="mt-1 text-xs font-black uppercase text-gray-600">Impacto social</p>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#ingressos"
                className="rounded-full bg-red-600 px-7 py-4 text-center text-sm font-black uppercase tracking-wide text-white shadow-lg transition hover:-translate-y-1 hover:bg-red-700"
              >
                Ver produtos
              </a>

              <a
                href="#kits"
                className="rounded-full bg-green-600 px-7 py-4 text-center text-sm font-black uppercase tracking-wide text-white shadow-lg transition hover:-translate-y-1 hover:bg-green-700"
              >
                Kits solidários
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function LojaSolidariaPage() {
  const [hoje, setHoje] = useState(new Date());

  const [quantidadesAlimentos, setQuantidadesAlimentos] = useState<Record<string, number>>({});
  const [quantidadesRacao, setQuantidadesRacao] = useState<Record<string, number>>({});

  useEffect(() => {
    setHoje(new Date());
  }, []);

  function alterarQuantidadeAlimento(id: string, valor: number) {
    setQuantidadesAlimentos((estado) => ({
      ...estado,
      [id]: Math.max(1, (estado[id] || 1) + valor),
    }));
  }

  function alterarQuantidadeRacao(id: string, valor: number) {
    setQuantidadesRacao((estado) => ({
      ...estado,
      [id]: Math.max(1, (estado[id] || 1) + valor),
    }));
  }

  const livrosInfantis = useMemo(
    () =>
      gerarLivrosPreVenda({
        quantidade: 18,
        prefixoTitulo: "Livro Infantil",
        pasta: "infantil",
        baseAno: 2026,
        baseMes: 11,
      }),
    [],
  );

  const livrosInfantojuvenis = useMemo(
    () =>
      gerarLivrosPreVenda({
        quantidade: 15,
        prefixoTitulo: "Livro Infantojuvenil",
        pasta: "infantojuvenil",
        baseAno: 2026,
        baseMes: 11,
      }),
    [],
  );

  return (
    <>
      <SetasNavegacao
        anterior="/area-do-colecionador"
        proxima="/impacto-social"
        labelAnterior="Voltar para Área do Colecionador"
        labelProxima="Ir para Impacto Social"
      />

      <main className="min-h-screen bg-[#fff7e8] text-gray-950">
        <Link
          href="/"
          className="fixed left-4 top-1/2 z-50 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-2xl font-black text-red-700 shadow-lg ring-1 ring-red-100 transition hover:scale-105 hover:bg-red-50"
          aria-label="Voltar para a página inicial"
          title="Voltar para a página inicial"
        >
          ←
        </Link>

        <CardCartoonLojaSolidaria />

        <section className="mx-auto flex max-w-6xl flex-col items-center px-4 py-16 text-center">
          <span className="mb-4 rounded-full bg-green-100 px-5 py-2 text-sm font-bold text-green-700">
            Loja Solidária Hot Dogueres
          </span>

          <h1 className="max-w-4xl text-4xl font-black leading-tight text-red-700 md:text-6xl">
            Loja Solidária Completa
          </h1>

          <p className="mt-6 max-w-3xl text-lg font-medium leading-relaxed text-gray-800 md:text-xl">
            Aqui você encontra ingressos colecionáveis, livros, camisas, kits de alimentação, kits de ração e
            produtos especiais do universo Hot Dogueres.
          </p>

          <p className="mt-3 max-w-3xl text-base font-semibold leading-relaxed text-gray-700 md:text-lg">
            Livros e camisas trabalham com pré-venda. Os kits solidários possuem impacto direto nas ações sociais.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a href="#ingressos" className="rounded-full bg-red-600 px-7 py-3 text-sm font-black text-white shadow-md transition hover:bg-red-700">
              Ingressos
            </a>

            <a href="#livros" className="rounded-full bg-yellow-400 px-7 py-3 text-sm font-black text-gray-950 shadow-md transition hover:bg-yellow-500">
              Livros
            </a>

            <a href="#camisas" className="rounded-full bg-red-600 px-7 py-3 text-sm font-black text-white shadow-md transition hover:bg-red-700">
              Camisas
            </a>

            <a href="#kits" className="rounded-full bg-green-600 px-7 py-3 text-sm font-black text-white shadow-md transition hover:bg-green-700">
              Kits Solidários
            </a>
          </div>
        </section>

        <section className="bg-white px-4 py-12">
          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
            <div className="rounded-3xl border-4 border-red-600 bg-[#fff7e8] p-6 text-center shadow-lg">
              <h2 className="text-3xl font-black text-red-700">104 toneladas</h2>
              <p className="mt-2 font-bold text-gray-800">Meta de alimentos arrecadados</p>
            </div>

            <div className="rounded-3xl border-4 border-yellow-400 bg-[#fff7e8] p-6 text-center shadow-lg">
              <h2 className="text-3xl font-black text-yellow-600">Pré-venda</h2>
              <p className="mt-2 font-bold text-gray-800">Livros e camisas vendidos por encomenda</p>
            </div>

            <div className="rounded-3xl border-4 border-green-600 bg-[#fff7e8] p-6 text-center shadow-lg">
              <h2 className="text-3xl font-black text-green-700">Kits</h2>
              <p className="mt-2 font-bold text-gray-800">Alimentação, ração e ações sociais</p>
            </div>
          </div>
        </section>

        <section id="ingressos" className="mx-auto max-w-6xl px-4 py-14">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-black text-red-700 md:text-5xl">Ingressos Colecionáveis</h2>

            <p className="mx-auto mt-4 max-w-3xl text-lg font-medium text-gray-800">
              Os ingressos colecionáveis fazem parte da campanha Hot Dogueres. Por serem digitais/colecionáveis, não
              precisam de impressão em estoque.
            </p>
          </div>

          <div className="mx-auto max-w-3xl">
            <CarrosselImagens itens={IMAGENS_INGRESSOS} altura="h-[420px] md:h-[560px]" corAtiva="bg-red-600" />
          </div>

          <div className="mx-auto mt-10 max-w-xl rounded-3xl border-4 border-red-600 bg-white p-6 text-center shadow-xl">
            <h3 className="text-2xl font-black text-red-700">Ingresso Solidário Hot Dogueres</h3>

            <p className="mt-3 font-medium leading-relaxed text-gray-800">
              Entrada para participar do festival, com cultura, diversão, gastronomia e solidariedade.
            </p>

            <Link
              href="/#ingressos"
              className="mt-6 block rounded-full bg-red-600 px-6 py-3 text-center text-sm font-black text-white shadow-md transition hover:bg-red-700"
            >
              Ver ingressos na página inicial
            </Link>
          </div>

          <div className="mx-auto mt-12 max-w-3xl rounded-3xl border-4 border-yellow-400 bg-white p-6 shadow-xl">
            <div className="grid gap-6 md:grid-cols-2 md:items-center">
              <div className="relative h-80 overflow-hidden rounded-3xl bg-[#fff7e8]">
                <Image
                  src={INGRESSO_APRESENTACAO_DO_ECOSSISTEMA_HOT_DOGUERES.imagem}
                  alt={INGRESSO_APRESENTACAO_DO_ECOSSISTEMA_HOT_DOGUERES.titulo}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-contain p-4"
                  unoptimized
                />
              </div>

              <div className="text-center md:text-left">
                <span className="rounded-full bg-yellow-100 px-4 py-2 text-xs font-black text-yellow-800">
                  Apresentação do Ecossistema Hot Dogueres 2026
                </span>

                <h3 className="mt-4 text-2xl font-black text-red-700">
                  {INGRESSO_APRESENTACAO_DO_ECOSSISTEMA_HOT_DOGUERES.titulo}
                </h3>

                <p className="mt-3 font-medium leading-relaxed text-gray-800">
                  Um ingresso especial para ações, eventos e campanhas voltadas ao Dia das Crianças no universo Hot
                  Dogueres.
                </p>

                <Link
                  href="/colecionaveis/hot-dog-day"
                  className="mt-6 block rounded-full bg-yellow-400 px-6 py-3 text-center text-sm font-black text-gray-950 shadow-md transition hover:bg-yellow-500"
                >
                  Comprar Ingresso Especial
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="livros" className="bg-white px-4 py-14">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <h2 className="text-3xl font-black text-red-700 md:text-5xl">Livros em Pré-venda</h2>

              <p className="mx-auto mt-4 max-w-4xl text-lg font-medium leading-relaxed text-gray-800">
                Todas as capas aparecem na loja, mas a compra só fica liberada no período correto de pré-venda. O
                ritmo usado é: abre todo dia 10, fecha dia 20 do mês seguinte e entrega dia 12 do mês posterior ao
                fechamento.
              </p>
            </div>

            <SecaoLivros
              titulo="Livros Infantis"
              descricao="Primeira temporada com 18 livros infantis do universo Hot Dogueres."
              livros={livrosInfantis}
              hoje={hoje}
            />

            <SecaoLivros
              titulo="Livros Infantojuvenis"
              descricao="Série infantojuvenil planejada com 15 livros, seguindo o mesmo sistema de pré-venda."
              livros={livrosInfantojuvenis}
              hoje={hoje}
            />
          </div>
        </section>

        <section id="camisas" className="mx-auto max-w-6xl px-4 py-14">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-black text-red-700 md:text-5xl">Camisas em Pré-venda</h2>

            <p className="mx-auto mt-4 max-w-4xl text-lg font-medium leading-relaxed text-gray-800">
              As camisas serão feitas por pré-venda. Elas não incluem doação de alimentos, porque o custo de
              produção é alto e o lucro é mínimo.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-xl">
            <h3 className="text-center text-2xl font-black text-red-700">Camisas dos Eventos Oficiais</h3>

            <p className="mx-auto mt-3 max-w-3xl text-center font-medium leading-relaxed text-gray-800">
              Modelos oficiais ligados aos eventos Hot Dogueres.
            </p>

            <div className="mt-8">
              <GradeCamisas
                produtos={CAMISAS_EVENTOS_OFICIAIS}
                observacao="Produto em pré-venda. Não inclui doação de alimentos."
                destaque="yellow"
              />
            </div>
          </div>

          <div className="mt-10 rounded-3xl bg-white p-6 shadow-xl">
            <h3 className="text-center text-2xl font-black text-red-700">Camisas para Eventos Esportivos</h3>

            <p className="mx-auto mt-3 max-w-4xl text-center font-medium leading-relaxed text-gray-800">
              Essas camisas serão criadas de acordo com cada instituição ajudada. Exemplo: na Avosos, pode ser feito
              um concurso de desenho entre as crianças, e o desenho vencedor será estampado na camisa.
            </p>

            <div className="mt-8">
              <GradeCamisas
                produtos={CAMISAS_ESPORTIVAS}
                observacao="Modelo especial por instituição. Produção sob projeto."
                destaque="green"
              />
            </div>
          </div>

          <div className="mt-10 rounded-3xl bg-white p-6 shadow-xl">
            <h3 className="text-center text-2xl font-black text-red-700">Camisas Gamer</h3>

            <p className="mx-auto mt-3 max-w-3xl text-center font-medium leading-relaxed text-gray-800">
              Linha gamer Hot Dogueres, com 8 modelos disponíveis para pré-venda.
            </p>

            <div className="mt-8">
              <GradeCamisas
                produtos={CAMISAS_GAMER}
                observacao="Produto em pré-venda. Não inclui doação de alimentos."
                destaque="red"
              />
            </div>
          </div>

          <div className="mt-10 rounded-3xl bg-white p-6 shadow-xl">
            <h3 className="text-center text-2xl font-black text-red-700">
              Camisas Infantis A Jornada Hot Dogueres
            </h3>

            <p className="mx-auto mt-3 max-w-3xl text-center font-medium leading-relaxed text-gray-800">
              Linha infantil inspirada na Jornada Hot Dogueres, com 8 modelos para a criançada.
            </p>

            <div className="mt-8">
              <GradeCamisas
                produtos={CAMISAS_INFANTIS_JORNADA}
                observacao="Produto em pré-venda. Não inclui doação de alimentos."
                destaque="yellow"
              />
            </div>
          </div>
        </section>

        <section id="kits" className="bg-white px-4 py-14">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-black text-red-700 md:text-5xl">Kits Solidários</h2>

              <p className="mx-auto mt-4 max-w-4xl text-lg font-medium leading-relaxed text-gray-800">
                Os kits são produtos com impacto direto nas ações sociais. Aqui entram os kits de alimentação, kits
                de ração e projetos especiais ligados a corridas e instituições.
              </p>
            </div>

            <div className="rounded-3xl border-4 border-green-600 bg-[#fff7e8] p-6 shadow-xl">
              <h3 className="text-center text-2xl font-black text-green-700">Kits Alimentação</h3>

              <p className="mx-auto mt-3 max-w-3xl text-center font-medium leading-relaxed text-gray-800">
                Kits voltados para arrecadação e apoio alimentar nas campanhas solidárias Hot Dogueres.
              </p>

              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {KITS_ALIMENTOS.map((kit) => (
                  <CardKitComQuantidade
                    key={kit.id}
                    kit={kit}
                    quantidade={quantidadesAlimentos[kit.id] || 1}
                    onAlterarQuantidade={alterarQuantidadeAlimento}
                    destaque="red"
                  />
                ))}
              </div>
            </div>

            <div className="mt-10 rounded-3xl border-4 border-blue-600 bg-[#fff7e8] p-6 shadow-xl">
              <h3 className="text-center text-2xl font-black text-blue-700">Kits Ração</h3>

              <p className="mx-auto mt-3 max-w-3xl text-center font-medium leading-relaxed text-gray-800">
                Kits voltados para apoio a animais, protetores e campanhas de arrecadação de ração.
              </p>

              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {KITS_RACAO.map((kit) => (
                  <CardKitComQuantidade
                    key={kit.id}
                    kit={kit}
                    quantidade={quantidadesRacao[kit.id] || 1}
                    onAlterarQuantidade={alterarQuantidadeRacao}
                    destaque="blue"
                  />
                ))}
              </div>
            </div>

            <div className="mt-10 rounded-3xl bg-red-700 p-8 text-center text-white shadow-xl">
              <h3 className="text-2xl font-black md:text-4xl">Kits de Corrida e Projetos Especiais</h3>

              <p className="mx-auto mt-4 max-w-4xl text-lg font-medium leading-relaxed">
                Nos projetos de corrida e ações especiais, o valor arrecadado será dividido da seguinte forma:
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl bg-white/15 p-5">
                  <p className="text-3xl font-black">50%</p>
                  <p className="mt-2 font-bold">Para a instituição ajudada</p>
                </div>

                <div className="rounded-2xl bg-white/15 p-5">
                  <p className="text-3xl font-black">10%</p>
                  <p className="mt-2 font-bold">Para ajuda humanitária</p>
                </div>

                <div className="rounded-2xl bg-white/15 p-5">
                  <p className="text-3xl font-black">40%</p>
                  <p className="mt-2 font-bold">Para confecção dos kits</p>
                </div>
              </div>

              <p className="mx-auto mt-6 max-w-3xl font-semibold leading-relaxed">
                Além disso, quem quiser também poderá doar brinquedos, livros e outros itens de apoio às campanhas.
              </p>

              <p className="mx-auto mt-6 max-w-xl text-sm font-bold text-yellow-200">
                Sem preço fixo porque o valor depende do projeto. Conte pra gente o que você quer apoiar:
              </p>

              <FormularioProjetoEspecial />
            </div>
          </div>
        </section>

        <div className="px-4 py-8 text-center">
          <Link
            href="/"
            className="rounded-full bg-gray-950 px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-gray-800"
          >
            Voltar para a página principal
          </Link>
        </div>
      </main>
    </>
  );
}
