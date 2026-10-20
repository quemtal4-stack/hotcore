"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

const VALOR_INGRESSO_COLECIONAVEL = 20;
const VALOR_SEXTO_INGRESSO = 80;
const VALOR_HOT_DOG_DAY = 20;
const MIN_INGRESSOS = 1;
const QUANTIDADE_PARA_LIBERAR_SEXTO = 5;

type TipoCompra = "ingresso-solidario-colecionavel" | "hot-dog-day";
type PerfilRanking = "pessoa-fisica" | "empresa";
type ModoCadastro = "compra" | "ranking";

type IngressoColecaoModelo = {
  numero?: number;
  id: string;
  titulo: string;
  descricao: string;
  imagem: string;
  tag: string;
  especial?: boolean;
};

type IngressoColecaoLocal = IngressoColecaoModelo & {
  quantidade: number;
  status: "pendente";
  nomeEternizado?: string;
  nome_eternizado?: string;
};

const MAPA_INGRESSOS_COLECAO: IngressoColecaoModelo[] = [
  {
    numero: 1,
    id: "fundador",
    titulo: "Fundador",
    descricao:
      "Ingresso especial para quem entra na história desde o começo do Hot Dogueres Solidário.",
    imagem: "/ingressos/fundador.png",
    tag: "Ingresso #1",
  },
  {
    numero: 2,
    id: "gigante-solidario",
    titulo: "Gigante Solidário",
    descricao:
      "Um ingresso criado para representar a força da solidariedade em torno do hot dog gigante.",
    imagem: "/ingressos/gigante-solidario.png",
    tag: "Ingresso #2",
  },
  {
    numero: 3,
    id: "raizes-do-futuro",
    titulo: "Raízes do Futuro",
    descricao:
      "Ingresso ligado ao futuro, ao meio ambiente e às ações que plantam esperança para as próximas gerações.",
    imagem: "/ingressos/raizes-do-futuro.png",
    tag: "Ingresso #3",
  },
  {
    numero: 4,
    id: "amigos-de-pata",
    titulo: "Amigos de Pata",
    descricao:
      "Ingresso dedicado ao cuidado, proteção e apoio aos animais que precisam de ajuda.",
    imagem: "/ingressos/amigos-de-pata.png",
    tag: "Ingresso #4",
  },
  {
    numero: 5,
    id: "sua-fome-ajuda-a-quem-precisa",
    titulo: "Sua Fome Ajuda a Quem Precisa",
    descricao:
      "Cada participação fortalece uma corrente de alimento, dignidade e apoio a quem mais precisa.",
    imagem: "/ingressos/sua-fome-ajuda-a-quem-precisa.png",
    tag: "Ingresso #5",
  },
];

const INGRESSO_ETERNIZADO: IngressoColecaoModelo = {
  numero: 6,
  id: "eternizados-250-metros",
  titulo: "Eternizados 250 Metros",
  descricao:
    "Ingresso especial para quem desbloqueia a peça mais exclusiva da coleção.",
  imagem: "/ingressos/eternizados-250-metros.png",
  tag: "Ingresso especial",
  especial: true,
};

function limparNumero(valor: string) {
  return valor.replace(/\D/g, "");
}

function formatarCpf(valor: string) {
  const numeros = limparNumero(valor).slice(0, 11);

  return numeros
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1-$2");
}

function formatarCnpj(valor: string) {
  const numeros = limparNumero(valor).slice(0, 14);

  return numeros
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2");
}

function formatarTelefone(valor: string) {
  const numeros = limparNumero(valor).slice(0, 11);

  if (numeros.length <= 10) {
    return numeros
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  }

  return numeros
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");
}

function formatarMoeda(valor: number) {
  const valorSeguro = Number.isFinite(valor) ? valor : 0;

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valorSeguro);
}

function validarCpf(cpf: string) {
  const numeros = limparNumero(cpf);

  if (numeros.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(numeros)) return false;

  let soma = 0;

  for (let i = 0; i < 9; i++) {
    soma += Number(numeros[i]) * (10 - i);
  }

  let primeiroDigito = 11 - (soma % 11);
  if (primeiroDigito >= 10) primeiroDigito = 0;

  if (primeiroDigito !== Number(numeros[9])) return false;

  soma = 0;

  for (let i = 0; i < 10; i++) {
    soma += Number(numeros[i]) * (11 - i);
  }

  let segundoDigito = 11 - (soma % 11);
  if (segundoDigito >= 10) segundoDigito = 0;

  return segundoDigito === Number(numeros[10]);
}

function validarCnpj(cnpj: string) {
  const numeros = limparNumero(cnpj);

  if (numeros.length !== 14) return false;
  if (/^(\d)\1{13}$/.test(numeros)) return false;

  const calcularDigito = (base: string, pesos: number[]) => {
    const soma = base
      .split("")
      .reduce((total, numero, index) => total + Number(numero) * pesos[index], 0);

    const resto = soma % 11;

    return resto < 2 ? 0 : 11 - resto;
  };

  const primeiroDigito = calcularDigito(numeros.slice(0, 12), [
    5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2,
  ]);

  const segundoDigito = calcularDigito(numeros.slice(0, 13), [
    6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2,
  ]);

  return (
    primeiroDigito === Number(numeros[12]) &&
    segundoDigito === Number(numeros[13])
  );
}

function validarEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function normalizarQuantidadeIngressos(valor: string | number | null) {
  const numero = Number(valor);

  if (!Number.isFinite(numero)) {
    return MIN_INGRESSOS;
  }

  const inteiro = Math.floor(numero);

  return Math.max(inteiro, MIN_INGRESSOS);
}

function parametroAtivo(params: URLSearchParams, nomes: string[]) {
  return nomes.some((nome) => {
    const valor = params.get(nome)?.toLowerCase();

    return (
      valor === "sim" ||
      valor === "true" ||
      valor === "1" ||
      valor === "yes"
    );
  });
}

function calcularKgAlimentos(
  ehHotDogDay: boolean,
  ingressosNormais: number,
  incluirSextoIngresso: boolean,
) {
  if (ehHotDogDay) {
    return 0;
  }

  return ingressosNormais + (incluirSextoIngresso ? 3 : 0);
}

function criarIdLocal() {
  return `participante-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 10)}`;
}

function chaveColecaoPorCpf(cpf: string) {
  return `hotdogueres_colecao_${limparNumero(cpf)}`;
}

function montarColecaoPorParametro(
  ingressosSelecionados: string | null,
): IngressoColecaoLocal[] {
  if (!ingressosSelecionados) {
    return [];
  }

  const colecao: IngressoColecaoLocal[] = [];

  for (const item of ingressosSelecionados.split(",")) {
    const [numeroTexto, quantidadeTexto] = item.split(":");
    const numero = Number(numeroTexto);
    const quantidade = Number(quantidadeTexto);

    const ingresso = MAPA_INGRESSOS_COLECAO.find(
      (modelo) => modelo.numero === numero,
    );

    if (!ingresso || !Number.isFinite(quantidade) || quantidade <= 0) {
      continue;
    }

    colecao.push({
      ...ingresso,
      quantidade: Math.floor(quantidade),
      status: "pendente",
    });
  }

  return colecao;
}

function montarColecaoPadrao(quantidadeIngressos: number) {
  const quantidadeSegura = normalizarQuantidadeIngressos(quantidadeIngressos);
  const colecao: IngressoColecaoLocal[] = [];
  let quantidadeRestante = quantidadeSegura;

  for (const ingresso of MAPA_INGRESSOS_COLECAO) {
    if (quantidadeRestante <= 0) {
      break;
    }

    colecao.push({
      ...ingresso,
      quantidade: 1,
      status: "pendente",
    });

    quantidadeRestante -= 1;
  }

  if (quantidadeRestante > 0 && colecao[0]) {
    colecao[0].quantidade += quantidadeRestante;
  }

  return colecao;
}

function salvarPastaColecionadorLocal({
  cpf,
  incluirSextoIngresso,
  quantidadeIngressos,
  nomeIngressoEternizado,
}: {
  cpf: string;
  incluirSextoIngresso: boolean;
  quantidadeIngressos: number;
  nomeIngressoEternizado: string;
}) {
  const chave = chaveColecaoPorCpf(cpf);

  const params = new URLSearchParams(window.location.search);
  const ingressosSelecionados = params.get("ingressosSelecionados");

  let colecao = montarColecaoPorParametro(ingressosSelecionados);

  if (colecao.length === 0) {
    colecao = montarColecaoPadrao(quantidadeIngressos);
  }

  if (incluirSextoIngresso) {
    colecao.push({
      ...INGRESSO_ETERNIZADO,
      quantidade: 1,
      status: "pendente",
      nomeEternizado: nomeIngressoEternizado,
      nome_eternizado: nomeIngressoEternizado,
    });
  }

  localStorage.setItem(chave, JSON.stringify(colecao));
}

function obterResumoIngressosSelecionados(ingressosSelecionados: string | null) {
  const colecao = montarColecaoPorParametro(ingressosSelecionados);

  return colecao.map((ingresso) => `${ingresso.titulo} (${ingresso.quantidade}x)`);
}

export default function CadastroPage() {
  const [carregouParametros, setCarregouParametros] = useState(false);

  const [modoCadastro, setModoCadastro] = useState<ModoCadastro>("compra");
  const [perfilRanking, setPerfilRanking] =
    useState<PerfilRanking>("pessoa-fisica");

  const [quantidadeIngressos, setQuantidadeIngressos] = useState(1);
  const [incluirSextoIngresso, setIncluirSextoIngresso] = useState(false);
  const [ingressosSelecionadosParametro, setIngressosSelecionadosParametro] =
    useState<string | null>(null);

  const [tipoCompra, setTipoCompra] = useState<TipoCompra>(
    "ingresso-solidario-colecionavel",
  );

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");

  const [nomeEmpresa, setNomeEmpresa] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [responsavelEmpresa, setResponsavelEmpresa] = useState("");
  const [cidade, setCidade] = useState("Aracaju/SE");

  const [erro, setErro] = useState("");
  const [nomeIngressoEternizado, setNomeIngressoEternizado] = useState("");

  const [modoAdminTeste, setModoAdminTeste] = useState(false);
  const [valorAdminTeste, setValorAdminTeste] = useState<number | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const tipoParam = params.get("tipo");
    const perfilParam = params.get("perfil");

    if (tipoParam === "ranking-do-bem") {
      setModoCadastro("ranking");
      setPerfilRanking(perfilParam === "empresa" ? "empresa" : "pessoa-fisica");
      setCarregouParametros(true);
      return;
    }

    const produtoParam = params.get("produto");
    const tituloParam = params.get("titulo");

    const adminAtivo =
      params.get("admin") === "true" || params.get("teste") === "true";

    const valorParam = Number(params.get("valor"));

    setModoAdminTeste(adminAtivo);

    if (adminAtivo && Number.isFinite(valorParam) && valorParam > 0) {
      setValorAdminTeste(valorParam);
    }

    const ehHotDogDayParametro =
      produtoParam === "hot-dog-day" ||
      tipoParam === "hot-dog-day" ||
      tituloParam?.toLowerCase().includes("hot dog day");

    if (ehHotDogDayParametro) {
      const quantidadeParam =
        params.get("quantidade") || params.get("ingressos") || "1";

      const quantidadeCorrigida = normalizarQuantidadeIngressos(
        quantidadeParam,
      );

      setTipoCompra("hot-dog-day");
      setQuantidadeIngressos(quantidadeCorrigida);
      setIncluirSextoIngresso(false);
      setIngressosSelecionadosParametro(null);
      setCarregouParametros(true);
      return;
    }

    const quantidadeParam =
      params.get("ingressos") ||
      params.get("quantidade") ||
      params.get("quantidadeIngressos") ||
      params.get("qtd") ||
      params.get("quantidadeTotal");

    const quantidadeCorrigida = normalizarQuantidadeIngressos(quantidadeParam);

    const sextoIngressoParam =
      parametroAtivo(params, [
        "sextoIngresso",
        "sexto",
        "especial",
        "eternizados",
        "incluirSextoIngresso",
      ]) || quantidadeCorrigida > QUANTIDADE_PARA_LIBERAR_SEXTO;

    const nomeEternizadoParam =
      params.get("nomeIngressoEternizado") ||
      params.get("nome_ingresso_eternizado") ||
      "";

    setModoCadastro("compra");
    setTipoCompra("ingresso-solidario-colecionavel");
    setQuantidadeIngressos(quantidadeCorrigida);
    setIncluirSextoIngresso(
      sextoIngressoParam &&
        quantidadeCorrigida >= QUANTIDADE_PARA_LIBERAR_SEXTO,
    );
    setNomeIngressoEternizado(nomeEternizadoParam);
    setIngressosSelecionadosParametro(params.get("ingressosSelecionados"));
    setCarregouParametros(true);
  }, []);

  const ehHotDogDay = tipoCompra === "hot-dog-day";

  const quantidadeIngressosSegura =
    normalizarQuantidadeIngressos(quantidadeIngressos);

  const quantidadeTotal = ehHotDogDay
    ? quantidadeIngressosSegura
    : quantidadeIngressosSegura + (incluirSextoIngresso ? 1 : 0);

  const kgAlimentos = calcularKgAlimentos(
    ehHotDogDay,
    quantidadeIngressosSegura,
    incluirSextoIngresso,
  );

  const ingressosSelecionadosResumo = useMemo(() => {
    return obterResumoIngressosSelecionados(ingressosSelecionadosParametro);
  }, [ingressosSelecionadosParametro]);

  const totalOriginal = useMemo(() => {
    if (ehHotDogDay) {
      return quantidadeIngressosSegura * VALOR_HOT_DOG_DAY;
    }

    return (
      quantidadeIngressosSegura * VALOR_INGRESSO_COLECIONAVEL +
      (incluirSextoIngresso ? VALOR_SEXTO_INGRESSO : 0)
    );
  }, [
    ehHotDogDay,
    quantidadeIngressosSegura,
    incluirSextoIngresso,
  ]);

  const total =
    modoAdminTeste && valorAdminTeste !== null ? valorAdminTeste : totalOriginal;

  function voltarParaInicio() {
    window.location.href = "/";
  }

  function voltarParaRanking() {
    window.location.href = "/ranking-do-bem";
  }

  function salvarCadastroRanking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErro("");

    if (perfilRanking === "pessoa-fisica") {
      if (!nome.trim()) {
        setErro("Informe seu nome completo.");
        return;
      }

      if (!validarEmail(email)) {
        setErro("Informe um e-mail válido.");
        return;
      }

      if (limparNumero(telefone).length < 10) {
        setErro("Informe um telefone válido.");
        return;
      }

      if (!validarCpf(cpf)) {
        setErro("Informe um CPF válido.");
        return;
      }

      if (!cidade.trim()) {
        setErro("Informe sua cidade.");
        return;
      }

      const participante = {
        id: criarIdLocal(),
        nome: nome.trim(),
        email: email.trim(),
        telefone,
        cpf,
        cidade: cidade.trim(),
        tipo: "Pessoa física",
        perfil: "pessoa-fisica",
        pontos: 0,
        destaque: "Cadastro realizado no Ranking do Bem",
        origem: "ranking-do-bem",
        criadoEm: new Date().toISOString(),
      };

      const participantesAtuais = JSON.parse(
        localStorage.getItem("hotdogueres_ranking_participantes") || "[]",
      );

      localStorage.setItem(
        "hotdogueres_ranking_participantes",
        JSON.stringify([...participantesAtuais, participante]),
      );

      sessionStorage.setItem(
        "hotdogueres_participante_ranking",
        JSON.stringify(participante),
      );

      window.location.href = "/ranking-do-bem?cadastro=sucesso";
      return;
    }

    if (!nomeEmpresa.trim()) {
      setErro("Informe o nome da empresa.");
      return;
    }

    if (!validarCnpj(cnpj)) {
      setErro("Informe um CNPJ válido.");
      return;
    }

    if (!responsavelEmpresa.trim()) {
      setErro("Informe o nome do responsável.");
      return;
    }

    if (!validarEmail(email)) {
      setErro("Informe um e-mail válido.");
      return;
    }

    if (limparNumero(telefone).length < 10) {
      setErro("Informe um telefone válido.");
      return;
    }

    if (!cidade.trim()) {
      setErro("Informe a cidade da empresa.");
      return;
    }

    const empresa = {
      id: criarIdLocal(),
      nome: nomeEmpresa.trim(),
      nomeEmpresa: nomeEmpresa.trim(),
      cnpj,
      responsavel: responsavelEmpresa.trim(),
      email: email.trim(),
      telefone,
      cidade: cidade.trim(),
      tipo: "Empresa",
      perfil: "empresa",
      pontos: 0,
      destaque: "Empresa cadastrada no Ranking do Bem",
      origem: "ranking-do-bem",
      criadoEm: new Date().toISOString(),
    };

    const participantesAtuais = JSON.parse(
      localStorage.getItem("hotdogueres_ranking_participantes") || "[]",
    );

    localStorage.setItem(
      "hotdogueres_ranking_participantes",
      JSON.stringify([...participantesAtuais, empresa]),
    );

    sessionStorage.setItem(
      "hotdogueres_participante_ranking",
      JSON.stringify(empresa),
    );

    window.location.href = "/ranking-do-bem?cadastro=sucesso";
  }

  function continuarParaPagamento(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErro("");

    if (!nome.trim()) {
      setErro("Informe seu nome completo.");
      return;
    }

    if (!validarEmail(email)) {
      setErro("Informe um e-mail válido.");
      return;
    }

    if (limparNumero(telefone).length < 10) {
      setErro("Informe um telefone válido.");
      return;
    }

    if (!validarCpf(cpf)) {
      setErro("Informe um CPF válido.");
      return;
    }

    if (
      !ehHotDogDay &&
      incluirSextoIngresso &&
      quantidadeIngressosSegura < QUANTIDADE_PARA_LIBERAR_SEXTO
    ) {
      setErro("O 6º ingresso especial só pode ser liberado com 5 ingressos comuns.");
      return;
    }

    const nomeParaIngressoEternizado =
      !ehHotDogDay && incluirSextoIngresso
        ? nomeIngressoEternizado.trim() || nome.trim()
        : "";

    const dadosCadastro = {
      nome: nome.trim(),
      email: email.trim(),
      telefone,
      cpf,
      ingressos: ehHotDogDay ? quantidadeIngressosSegura : quantidadeIngressosSegura,
      ingressosSelecionados: ehHotDogDay ? null : ingressosSelecionadosParametro,
      sextoIngresso: ehHotDogDay ? false : incluirSextoIngresso,
      quantidadeTotal,
      kgAlimentos,
      total,
      tipo: tipoCompra,
      nomeProduto: ehHotDogDay
        ? "Hot Dog Day"
        : "Ingresso Solidário Colecionável",
      nomeIngressoEternizado: nomeParaIngressoEternizado,
    };

    sessionStorage.setItem(
      "hotdogueres_cadastro",
      JSON.stringify(dadosCadastro),
    );

    const params = new URLSearchParams({
      tipo: tipoCompra,
      ingressos: String(quantidadeIngressosSegura),
      sextoIngresso: ehHotDogDay
        ? "nao"
        : incluirSextoIngresso
          ? "sim"
          : "nao",
      quantidadeTotal: String(quantidadeTotal),
      kgAlimentos: String(kgAlimentos),
    });

    const paramsOriginais = new URLSearchParams(window.location.search);

    const modoAdmin =
      paramsOriginais.get("admin") === "true" ||
      paramsOriginais.get("teste") === "true";

    const valorParametro = Number(paramsOriginais.get("valor"));

    const valorParaCheckout =
      modoAdmin && Number.isFinite(valorParametro) && valorParametro > 0
        ? valorParametro
        : totalOriginal;

    const produtoParametro =
      paramsOriginais.get("produto") ||
      (ehHotDogDay ? "hot-dog-day" : "ingresso-solidario-colecionavel");

    const tituloParametro =
      paramsOriginais.get("titulo") ||
      (ehHotDogDay
        ? "Ingresso Hot Dog Day"
        : "Ingresso Solidário Colecionável");

    const ingressosSelecionadosOriginal =
      paramsOriginais.get("ingressosSelecionados") || ingressosSelecionadosParametro;

    params.set("produto", produtoParametro);
    params.set("titulo", tituloParametro);
    params.set("valor", String(valorParaCheckout));

    if (!ehHotDogDay && ingressosSelecionadosOriginal) {
      params.set("ingressosSelecionados", ingressosSelecionadosOriginal);
    }

    if (nomeParaIngressoEternizado) {
      params.set("nomeIngressoEternizado", nomeParaIngressoEternizado);
    }

    if (modoAdmin) {
      params.set("admin", "true");
      params.set("teste", "true");
    }

    if (!ehHotDogDay) {
      salvarPastaColecionadorLocal({
        cpf,
        incluirSextoIngresso,
        quantidadeIngressos: quantidadeIngressosSegura,
        nomeIngressoEternizado: nomeParaIngressoEternizado,
      });
    }

    window.location.href = `/checkout/ingressos?${params.toString()}`;
  }

  if (!carregouParametros) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#dff6ff] px-4">
        <div className="rounded-3xl bg-white p-8 text-center shadow-xl">
          <p className="text-lg font-black text-gray-900">
            Carregando cadastro...
          </p>
        </div>
      </main>
    );
  }

  if (modoCadastro === "ranking") {
    return (
      <main className="min-h-screen bg-[#fff7e8] px-4 py-8 text-gray-950">
        <section className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_0.8fr]">
          <div className="rounded-[2rem] bg-white p-8 shadow-xl">
            <button
              type="button"
              onClick={voltarParaRanking}
              className="rounded-full bg-gray-100 px-4 py-2 text-sm font-black text-gray-700 hover:bg-gray-200"
            >
              Voltar
            </button>

            <p className="mt-6 inline-flex rounded-full bg-yellow-400 px-4 py-2 text-sm font-black uppercase tracking-wide text-gray-950">
              Ranking do Bem
            </p>

            <h1 className="mt-6 text-4xl font-black leading-tight text-gray-900 md:text-5xl">
              Entre para o Ranking do Bem
            </h1>

            <p className="mt-4 max-w-2xl text-lg text-gray-700">
              Preencha seus dados para participar do Ranking do Bem como{" "}
              <strong>
                {perfilRanking === "empresa" ? "empresa" : "pessoa física"}
              </strong>
              .
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setPerfilRanking("pessoa-fisica")}
                className={`rounded-full px-5 py-3 text-sm font-black uppercase tracking-wide transition ${
                  perfilRanking === "pessoa-fisica"
                    ? "bg-red-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Pessoa física
              </button>

              <button
                type="button"
                onClick={() => setPerfilRanking("empresa")}
                className={`rounded-full px-5 py-3 text-sm font-black uppercase tracking-wide transition ${
                  perfilRanking === "empresa"
                    ? "bg-gray-950 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Empresa
              </button>
            </div>

            <form onSubmit={salvarCadastroRanking} className="mt-8 space-y-5">
              {perfilRanking === "pessoa-fisica" ? (
                <>
                  <div>
                    <label className="text-sm font-black uppercase tracking-wide text-gray-600">
                      Nome completo
                    </label>
                    <input
                      type="text"
                      value={nome}
                      onChange={(event) => setNome(event.target.value)}
                      placeholder="Digite seu nome completo"
                      className="mt-2 w-full rounded-2xl border border-gray-200 px-5 py-4 text-gray-900 outline-none focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-black uppercase tracking-wide text-gray-600">
                      CPF
                    </label>
                    <input
                      type="text"
                      value={cpf}
                      onChange={(event) =>
                        setCpf(formatarCpf(event.target.value))
                      }
                      placeholder="000.000.000-00"
                      className="mt-2 w-full rounded-2xl border border-gray-200 px-5 py-4 text-gray-900 outline-none focus:border-red-500"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="text-sm font-black uppercase tracking-wide text-gray-600">
                      Nome da empresa
                    </label>
                    <input
                      type="text"
                      value={nomeEmpresa}
                      onChange={(event) => setNomeEmpresa(event.target.value)}
                      placeholder="Digite o nome da empresa"
                      className="mt-2 w-full rounded-2xl border border-gray-200 px-5 py-4 text-gray-900 outline-none focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-black uppercase tracking-wide text-gray-600">
                      CNPJ
                    </label>
                    <input
                      type="text"
                      value={cnpj}
                      onChange={(event) =>
                        setCnpj(formatarCnpj(event.target.value))
                      }
                      placeholder="00.000.000/0000-00"
                      className="mt-2 w-full rounded-2xl border border-gray-200 px-5 py-4 text-gray-900 outline-none focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-black uppercase tracking-wide text-gray-600">
                      Responsável
                    </label>
                    <input
                      type="text"
                      value={responsavelEmpresa}
                      onChange={(event) =>
                        setResponsavelEmpresa(event.target.value)
                      }
                      placeholder="Nome do responsável"
                      className="mt-2 w-full rounded-2xl border border-gray-200 px-5 py-4 text-gray-900 outline-none focus:border-red-500"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="text-sm font-black uppercase tracking-wide text-gray-600">
                  E-mail
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="seuemail@exemplo.com"
                  className="mt-2 w-full rounded-2xl border border-gray-200 px-5 py-4 text-gray-900 outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="text-sm font-black uppercase tracking-wide text-gray-600">
                  Telefone / WhatsApp
                </label>
                <input
                  type="tel"
                  value={telefone}
                  onChange={(event) =>
                    setTelefone(formatarTelefone(event.target.value))
                  }
                  placeholder="(79) 99999-9999"
                  className="mt-2 w-full rounded-2xl border border-gray-200 px-5 py-4 text-gray-900 outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="text-sm font-black uppercase tracking-wide text-gray-600">
                  Cidade / Estado
                </label>
                <input
                  type="text"
                  value={cidade}
                  onChange={(event) => setCidade(event.target.value)}
                  placeholder="Aracaju/SE"
                  className="mt-2 w-full rounded-2xl border border-gray-200 px-5 py-4 text-gray-900 outline-none focus:border-red-500"
                />
              </div>

              {erro && (
                <div className="rounded-2xl bg-red-50 p-4 text-sm font-bold text-red-600">
                  {erro}
                </div>
              )}

              <button
                type="submit"
                className="w-full rounded-full bg-red-600 px-6 py-4 text-lg font-black text-white shadow-lg transition hover:bg-red-700"
              >
                Cadastrar no Ranking do Bem
              </button>
            </form>
          </div>

          <aside className="rounded-[2rem] bg-white p-8 shadow-xl">
            <p className="text-sm font-black uppercase tracking-wide text-red-600">
              Como funciona
            </p>

            <h2 className="mt-2 text-3xl font-black text-gray-900">
              Pontuação solidária
            </h2>

            <div className="mt-8 space-y-4 rounded-3xl bg-gray-50 p-5">
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <p className="text-sm font-black text-gray-950">
                  Compras aprovadas
                </p>
                <p className="mt-1 text-sm font-bold text-gray-600">
                  Ingressos, camisas, livros e kits solidários geram pontos.
                </p>
              </div>

              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <p className="text-sm font-black text-gray-950">
                  Voluntariado
                </p>
                <p className="mt-1 text-sm font-bold text-gray-600">
                  Participações confirmadas em ações sociais também pontuam.
                </p>
              </div>

              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <p className="text-sm font-black text-gray-950">
                  Empresas parceiras
                </p>
                <p className="mt-1 text-sm font-bold text-gray-600">
                  Patrocínios e cotas de parceria entram no Ranking do Bem.
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-3xl bg-yellow-50 p-5">
              <p className="text-sm font-black uppercase tracking-wide text-yellow-700">
                Próxima etapa
              </p>

              <p className="mt-2 text-sm text-gray-700">
                Depois vamos ligar este cadastro ao banco de dados e atualizar o
                ranking automaticamente quando uma compra for aprovada.
              </p>
            </div>
          </aside>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#dff6ff] px-4 py-8">
      <section className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_0.8fr]">
        <div className="rounded-[2rem] bg-white p-8 shadow-xl">
          <button
            type="button"
            onClick={voltarParaInicio}
            className="rounded-full bg-gray-100 px-4 py-2 text-sm font-black text-gray-700 hover:bg-gray-200"
          >
            Voltar
          </button>

          <p className="mt-6 inline-flex rounded-full bg-red-100 px-4 py-2 text-sm font-black uppercase tracking-wide text-red-600">
            Cadastro do comprador
          </p>

          {modoAdminTeste && (
            <p className="mt-4 inline-flex rounded-full bg-yellow-100 px-4 py-2 text-sm font-black uppercase tracking-wide text-yellow-700">
              Modo teste admin ativo
            </p>
          )}

          <h1 className="mt-6 text-4xl font-black leading-tight text-gray-900 md:text-5xl">
            Finalize seus dados
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-gray-700">
            Preencha as informações abaixo para continuar para o pagamento do{" "}
            <strong>
              {ehHotDogDay ? "Hot Dog Day" : "Ingresso Solidário Colecionável"}
            </strong>
            .
          </p>

          <form onSubmit={continuarParaPagamento} className="mt-8 space-y-5">
            <div>
              <label className="text-sm font-black uppercase tracking-wide text-gray-600">
                Nome completo
              </label>
              <input
                type="text"
                value={nome}
                onChange={(event) => setNome(event.target.value)}
                placeholder="Digite seu nome completo"
                className="mt-2 w-full rounded-2xl border border-gray-200 px-5 py-4 text-gray-900 outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="text-sm font-black uppercase tracking-wide text-gray-600">
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="seuemail@exemplo.com"
                className="mt-2 w-full rounded-2xl border border-gray-200 px-5 py-4 text-gray-900 outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="text-sm font-black uppercase tracking-wide text-gray-600">
                Telefone / WhatsApp
              </label>
              <input
                type="tel"
                value={telefone}
                onChange={(event) =>
                  setTelefone(formatarTelefone(event.target.value))
                }
                placeholder="(79) 99999-9999"
                className="mt-2 w-full rounded-2xl border border-gray-200 px-5 py-4 text-gray-900 outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="text-sm font-black uppercase tracking-wide text-gray-600">
                CPF
              </label>
              <input
                type="text"
                value={cpf}
                onChange={(event) => setCpf(formatarCpf(event.target.value))}
                placeholder="000.000.000-00"
                className="mt-2 w-full rounded-2xl border border-gray-200 px-5 py-4 text-gray-900 outline-none focus:border-red-500"
              />
              <p className="mt-2 text-sm text-gray-500">
                O CPF será usado para validar a compra e evitar duplicidade.
              </p>
            </div>

            {!ehHotDogDay && incluirSextoIngresso && (
              <div>
                <label className="text-sm font-black uppercase tracking-wide text-gray-600">
                  Nome para o Ingresso Eternizado
                </label>

                <input
                  type="text"
                  value={nomeIngressoEternizado}
                  onChange={(event) =>
                    setNomeIngressoEternizado(event.target.value)
                  }
                  placeholder="Digite o nome que aparecerá no ingresso especial"
                  className="mt-2 w-full rounded-2xl border border-gray-200 px-5 py-4 text-gray-900 outline-none focus:border-red-500"
                />

                <p className="mt-2 text-sm text-gray-500">
                  Se ficar em branco, usaremos o nome completo informado acima.
                </p>
              </div>
            )}

            {erro && (
              <div className="rounded-2xl bg-red-50 p-4 text-sm font-bold text-red-600">
                {erro}
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-full bg-red-600 px-6 py-4 text-lg font-black text-white shadow-lg transition hover:bg-red-700"
            >
              Continuar para pagamento
            </button>
          </form>
        </div>

        <aside className="rounded-[2rem] bg-white p-8 shadow-xl">
          <p className="text-sm font-black uppercase tracking-wide text-red-600">
            Resumo da compra
          </p>

          <h2 className="mt-2 text-3xl font-black text-gray-900">
            {ehHotDogDay ? "Seu pedido" : "Seus ingressos"}
          </h2>

          <div className="mt-8 space-y-4 rounded-3xl bg-gray-50 p-5">
            {ehHotDogDay ? (
              <>
                <div className="flex justify-between text-gray-700">
                  <span>Produto</span>
                  <strong>Hot Dog Day</strong>
                </div>

                <div className="flex justify-between text-gray-700">
                  <span>Quantidade</span>
                  <strong>{quantidadeIngressosSegura}</strong>
                </div>

                <div className="flex justify-between text-gray-700">
                  <span>Valor original</span>
                  <strong>{formatarMoeda(totalOriginal)}</strong>
                </div>
              </>
            ) : (
              <>
                {ingressosSelecionadosResumo.length > 0 && (
                  <div className="flex justify-between gap-4 text-gray-700">
                    <span>Modelos escolhidos</span>
                    <strong className="max-w-[220px] text-right">
                      {ingressosSelecionadosResumo.join(", ")}
                    </strong>
                  </div>
                )}

                <div className="flex justify-between text-gray-700">
                  <span>Ingressos comuns</span>
                  <strong>{quantidadeIngressosSegura}</strong>
                </div>

                <div className="flex justify-between text-gray-700">
                  <span>Valor unitário</span>
                  <strong>{formatarMoeda(VALOR_INGRESSO_COLECIONAVEL)}</strong>
                </div>

                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <strong>
                    {formatarMoeda(
                      quantidadeIngressosSegura *
                        VALOR_INGRESSO_COLECIONAVEL,
                    )}
                  </strong>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-gray-700">
                    <span>6º especial</span>
                    <strong>{incluirSextoIngresso ? "Sim" : "Não"}</strong>
                  </div>

                  {incluirSextoIngresso && (
                    <div className="mt-3 flex justify-between text-gray-700">
                      <span>Valor do 6º especial</span>
                      <strong>{formatarMoeda(VALOR_SEXTO_INGRESSO)}</strong>
                    </div>
                  )}
                </div>
              </>
            )}

            <div className="flex justify-between border-t border-gray-200 pt-4 text-gray-700">
              <span>
                {ehHotDogDay ? "Quantidade total" : "Total de ingressos"}
              </span>
              <strong>{quantidadeTotal}</strong>
            </div>

            {!ehHotDogDay && (
              <div className="flex justify-between text-gray-700">
                <span>Doação abatida</span>
                <strong>{kgAlimentos} kg</strong>
              </div>
            )}

            {modoAdminTeste && (
              <div className="flex justify-between rounded-2xl bg-yellow-100 p-3 text-yellow-800">
                <span className="font-black">Teste admin</span>
                <strong>{formatarMoeda(total)}</strong>
              </div>
            )}

            <div className="flex justify-between border-t border-gray-200 pt-4 text-xl">
              <span className="font-black text-gray-900">Total</span>
              <span className="font-black text-red-600">
                {formatarMoeda(total)}
              </span>
            </div>
          </div>

          <div className="mt-6 rounded-3xl bg-yellow-50 p-5">
            <p className="text-sm font-black uppercase tracking-wide text-yellow-700">
              Atenção
            </p>

            <p className="mt-2 text-sm text-gray-700">
              Nesta etapa fazemos a validação básica do CPF. Depois, quando
              ligarmos o banco de dados, a regra completa vai verificar as
              compras anteriores desse CPF.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}
