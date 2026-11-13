"use client";

import Link from "next/link";
import { useMemo, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";

type FormaEntrega = "retirada-local" | "retirada-evento" | "receber-casa";

type DadosComprador = {
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  cep: string;
  endereco: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  observacoes: string;
};

const FRETE_ENTREGA_CASA = 20;

function formatarMoeda(valor: number) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function limparNumeros(valor: string) {
  return valor.replace(/\D/g, "");
}

function formatarCpf(valor: string) {
  const numeros = limparNumeros(valor).slice(0, 11);

  return numeros
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1-$2");
}

function formatarTelefone(valor: string) {
  const numeros = limparNumeros(valor).slice(0, 11);

  if (numeros.length <= 10) {
    return numeros
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  }

  return numeros
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");
}

function formatarCep(valor: string) {
  return limparNumeros(valor)
    .slice(0, 8)
    .replace(/^(\d{5})(\d)/, "$1-$2");
}

function obterTextoFormaEntrega(formaEntrega: FormaEntrega) {
  if (formaEntrega === "retirada-local") return "Retirada na sede";
  if (formaEntrega === "retirada-evento") return "Retirada no evento";
  return "Receber em casa";
}

export default function CheckoutLivrosPage() {
  const searchParams = useSearchParams();

  const produto = searchParams.get("produto") || "";
  const titulo = searchParams.get("titulo") || "Livro Hot Dogueres";
  const valor = Number(searchParams.get("valor") || 0);
  const tipoPreco = searchParams.get("tipoPreco") || "";
  const livro = searchParams.get("livro") || "";
  const entrega = searchParams.get("entrega") || "";

  const [dados, setDados] = useState<DadosComprador>({
    nome: "",
    cpf: "",
    email: "",
    telefone: "",
    cep: "",
    endereco: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
    observacoes: "",
  });

  const [formaEntrega, setFormaEntrega] =
    useState<FormaEntrega>("receber-casa");

  const [aceitouPreVenda, setAceitouPreVenda] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  const tipoPrecoTexto = useMemo(() => {
    if (tipoPreco === "promocional") return "Valor promocional";
    if (tipoPreco === "membro") return "Valor para membro";
    if (tipoPreco === "nao-membro") return "Valor para não membro";
    return "Valor do livro";
  }, [tipoPreco]);

  const valorFrete = useMemo(() => {
    if (formaEntrega === "receber-casa") {
      return FRETE_ENTREGA_CASA;
    }

    return 0;
  }, [formaEntrega]);

  const valorTotal = useMemo(() => {
    return valor + valorFrete;
  }, [valor, valorFrete]);

  const formaEntregaTexto = useMemo(() => {
    return obterTextoFormaEntrega(formaEntrega);
  }, [formaEntrega]);

  function atualizarCampo(campo: keyof DadosComprador, valorCampo: string) {
    let valorFinal = valorCampo;

    if (campo === "cpf") {
      valorFinal = formatarCpf(valorCampo);
    }

    if (campo === "telefone") {
      valorFinal = formatarTelefone(valorCampo);
    }

    if (campo === "cep") {
      valorFinal = formatarCep(valorCampo);
    }

    if (campo === "estado") {
      valorFinal = valorCampo.toUpperCase().slice(0, 2);
    }

    setDados((estadoAtual) => ({
      ...estadoAtual,
      [campo]: valorFinal,
    }));
  }

  function validarFormulario() {
    if (!produto || !titulo || !valor) {
      return "Produto inválido. Volte para a Loja Solidária e escolha o livro novamente.";
    }

    if (!dados.nome.trim()) {
      return "Informe seu nome completo.";
    }

    if (limparNumeros(dados.cpf).length !== 11) {
      return "Informe um CPF válido com 11 números.";
    }

    if (!dados.email.includes("@")) {
      return "Informe um e-mail válido.";
    }

    if (limparNumeros(dados.telefone).length < 10) {
      return "Informe um telefone válido.";
    }

    if (formaEntrega === "receber-casa") {
      if (limparNumeros(dados.cep).length !== 8) {
        return "Informe um CEP válido com 8 números.";
      }

      if (!dados.endereco.trim()) {
        return "Informe o endereço de entrega.";
      }

      if (!dados.numero.trim()) {
        return "Informe o número do endereço.";
      }

      if (!dados.bairro.trim()) {
        return "Informe o bairro.";
      }

      if (!dados.cidade.trim()) {
        return "Informe a cidade.";
      }

      if (dados.estado.trim().length !== 2) {
        return "Informe a UF do estado com 2 letras.";
      }
    }

    if (!aceitouPreVenda) {
      return "Confirme que você entende que este produto é uma pré-venda.";
    }

    return "";
  }

  async function irParaPagamento(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const erroValidacao = validarFormulario();

    if (erroValidacao) {
      setErro(erroValidacao);
      return;
    }

    setErro("");
    setCarregando(true);

    try {
      const resposta = await fetch("/api/mercado-pago/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tipo: "livro-pre-venda",
          produto,
          titulo,
          quantidade: 1,
          valor: valorTotal,
          valorLivro: valor,
          frete: valorFrete,
          tipoPreco,
          livro,
          entrega,
          formaEntrega,
          formaEntregaTexto,
          comprador: {
            nome: dados.nome.trim(),
            cpf: limparNumeros(dados.cpf),
            email: dados.email.trim(),
            telefone: limparNumeros(dados.telefone),
          },
          entregaEndereco:
            formaEntrega === "receber-casa"
              ? {
                  cep: limparNumeros(dados.cep),
                  endereco: dados.endereco.trim(),
                  numero: dados.numero.trim(),
                  complemento: dados.complemento.trim(),
                  bairro: dados.bairro.trim(),
                  cidade: dados.cidade.trim(),
                  estado: dados.estado.trim().toUpperCase(),
                  observacoes: dados.observacoes.trim(),
                }
              : null,
          observacaoPedido: `Produto em pré-venda. Entrega conforme prazo informado na página do produto. Forma de entrega: ${formaEntregaTexto}. Frete: ${formatarMoeda(valorFrete)}.`,
        }),
      });

      const resultado = await resposta.json();

      if (!resposta.ok) {
        throw new Error(
          resultado?.error ||
            resultado?.message ||
            "Não foi possível iniciar o pagamento.",
        );
      }

      const urlPagamento =
        resultado?.init_point ||
        resultado?.sandbox_init_point ||
        resultado?.url ||
        resultado?.checkoutUrl;

      if (!urlPagamento) {
        throw new Error(
          "A resposta do Mercado Pago não retornou o link de pagamento.",
        );
      }

      window.location.href = urlPagamento;
    } catch (error) {
      const mensagem =
        error instanceof Error
          ? error.message
          : "Erro inesperado ao iniciar o pagamento.";

      setErro(mensagem);
      setCarregando(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#fff7e8] px-4 py-10 text-gray-950">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/loja-solidaria#livros"
          className="inline-flex rounded-full bg-white px-5 py-3 text-sm font-black text-red-700 shadow-md ring-1 ring-red-100 transition hover:bg-red-50"
        >
          ← Voltar para livros
        </Link>

        <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <aside className="h-fit rounded-[2rem] border-4 border-red-600 bg-white p-6 shadow-xl">
            <p className="inline-flex rounded-full bg-yellow-100 px-4 py-2 text-xs font-black uppercase tracking-wide text-yellow-800">
              Pré-venda de livro
            </p>

            <h1 className="mt-5 text-3xl font-black leading-tight text-red-700 md:text-4xl">
              {titulo}
            </h1>

            <div className="mt-5 space-y-3 rounded-3xl bg-[#fff7e8] p-5">
              {livro && (
                <div>
                  <p className="text-xs font-black uppercase text-gray-500">
                    Livro
                  </p>
                  <p className="text-lg font-black text-gray-950">Nº {livro}</p>
                </div>
              )}

              <div>
                <p className="text-xs font-black uppercase text-gray-500">
                  Tipo de preço
                </p>
                <p className="text-lg font-black text-gray-950">
                  {tipoPrecoTexto}
                </p>
              </div>

              <div>
                <p className="text-xs font-black uppercase text-gray-500">
                  Valor do livro
                </p>
                <p className="text-3xl font-black text-green-700">
                  {formatarMoeda(valor)}
                </p>
              </div>

              <div>
                <p className="text-xs font-black uppercase text-gray-500">
                  Forma de entrega
                </p>
                <p className="text-lg font-black text-red-700">
                  {formaEntregaTexto}
                </p>
              </div>

              <div>
                <p className="text-xs font-black uppercase text-gray-500">
                  Frete
                </p>
                <p className="text-lg font-black text-gray-950">
                  {valorFrete > 0 ? formatarMoeda(valorFrete) : "Sem frete"}
                </p>
              </div>

              <div className="rounded-2xl bg-white p-4 ring-1 ring-green-100">
                <p className="text-xs font-black uppercase text-gray-500">
                  Total do pedido
                </p>
                <p className="text-4xl font-black text-green-700">
                  {formatarMoeda(valorTotal)}
                </p>
              </div>

              {entrega && (
                <div>
                  <p className="text-xs font-black uppercase text-gray-500">
                    Previsão de entrega
                  </p>
                  <p className="text-lg font-black text-red-700">{entrega}</p>
                </div>
              )}
            </div>

            <div className="mt-5 rounded-3xl bg-red-50 p-5 text-sm font-bold leading-relaxed text-red-800">
              Este produto está em pré-venda. A produção, separação e entrega
              seguem o prazo informado na Loja Solidária.
            </div>

            <div className="mt-4 rounded-3xl bg-green-50 p-5 text-sm font-bold leading-relaxed text-green-800">
              Para receber em casa, o frete fixo é de R$ 20,00. Para retirada na
              sede ou no evento, não há cobrança de frete.
            </div>
          </aside>

          <section className="rounded-[2rem] bg-white p-6 shadow-xl">
            <h2 className="text-2xl font-black text-red-700">
              Dados para a pré-venda
            </h2>

            <p className="mt-2 text-sm font-semibold leading-relaxed text-gray-700">
              Antes do pagamento, precisamos registrar seus dados para
              identificação do pedido, contato e entrega do livro.
            </p>

            <form onSubmit={irParaPagamento} className="mt-6 space-y-5">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-black text-gray-800">
                    Nome completo
                  </span>
                  <input
                    value={dados.nome}
                    onChange={(event) =>
                      atualizarCampo("nome", event.target.value)
                    }
                    required
                    className="mt-2 w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm font-bold outline-none focus:border-red-500"
                    placeholder="Seu nome completo"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-black text-gray-800">CPF</span>
                  <input
                    value={dados.cpf}
                    onChange={(event) =>
                      atualizarCampo("cpf", event.target.value)
                    }
                    required
                    className="mt-2 w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm font-bold outline-none focus:border-red-500"
                    placeholder="000.000.000-00"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-black text-gray-800">
                    E-mail
                  </span>
                  <input
                    type="email"
                    value={dados.email}
                    onChange={(event) =>
                      atualizarCampo("email", event.target.value)
                    }
                    required
                    className="mt-2 w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm font-bold outline-none focus:border-red-500"
                    placeholder="seuemail@email.com"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-black text-gray-800">
                    Telefone / WhatsApp
                  </span>
                  <input
                    value={dados.telefone}
                    onChange={(event) =>
                      atualizarCampo("telefone", event.target.value)
                    }
                    required
                    className="mt-2 w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm font-bold outline-none focus:border-red-500"
                    placeholder="(79) 99999-9999"
                  />
                </label>
              </div>

              <div className="rounded-3xl bg-[#fff7e8] p-5">
                <h3 className="text-lg font-black text-red-700">
                  Forma de entrega
                </h3>

                <p className="mt-1 text-sm font-semibold leading-relaxed text-gray-700">
                  Escolha como deseja receber ou retirar seu livro.
                </p>

                <div className="mt-4 grid gap-3 md:grid-cols-3">
                  <button
                    type="button"
                    onClick={() => setFormaEntrega("retirada-local")}
                    className={`rounded-2xl p-4 text-left shadow-sm ring-2 transition ${
                      formaEntrega === "retirada-local"
                        ? "bg-red-600 text-white ring-red-600"
                        : "bg-white text-gray-800 ring-red-100 hover:bg-red-50"
                    }`}
                  >
                    <p className="text-sm font-black">Retirada na sede</p>
                    <p className="mt-1 text-xs font-bold opacity-90">
                      Sem cobrança de frete.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormaEntrega("retirada-evento")}
                    className={`rounded-2xl p-4 text-left shadow-sm ring-2 transition ${
                      formaEntrega === "retirada-evento"
                        ? "bg-yellow-400 text-gray-950 ring-yellow-400"
                        : "bg-white text-gray-800 ring-yellow-100 hover:bg-yellow-50"
                    }`}
                  >
                    <p className="text-sm font-black">Retirada no evento</p>
                    <p className="mt-1 text-xs font-bold opacity-90">
                      Entrega combinada no evento.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormaEntrega("receber-casa")}
                    className={`rounded-2xl p-4 text-left shadow-sm ring-2 transition ${
                      formaEntrega === "receber-casa"
                        ? "bg-green-600 text-white ring-green-600"
                        : "bg-white text-gray-800 ring-green-100 hover:bg-green-50"
                    }`}
                  >
                    <p className="text-sm font-black">Receber em casa</p>
                    <p className="mt-1 text-xs font-bold opacity-90">
                      Frete fixo de R$ 20,00.
                    </p>
                  </button>
                </div>
              </div>

              {formaEntrega === "receber-casa" && (
                <div className="rounded-3xl bg-[#fff7e8] p-5">
                  <h3 className="text-lg font-black text-red-700">
                    Endereço de entrega
                  </h3>

                  <p className="mt-1 text-sm font-semibold leading-relaxed text-gray-700">
                    O frete para entrega em casa é fixo: R$ 20,00.
                  </p>

                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <label className="block">
                      <span className="text-sm font-black text-gray-800">
                        CEP
                      </span>
                      <input
                        value={dados.cep}
                        onChange={(event) =>
                          atualizarCampo("cep", event.target.value)
                        }
                        required={formaEntrega === "receber-casa"}
                        className="mt-2 w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm font-bold outline-none focus:border-red-500"
                        placeholder="00000-000"
                      />
                    </label>

                    <label className="block">
                      <span className="text-sm font-black text-gray-800">
                        Endereço
                      </span>
                      <input
                        value={dados.endereco}
                        onChange={(event) =>
                          atualizarCampo("endereco", event.target.value)
                        }
                        required={formaEntrega === "receber-casa"}
                        className="mt-2 w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm font-bold outline-none focus:border-red-500"
                        placeholder="Rua, avenida, travessa..."
                      />
                    </label>

                    <label className="block">
                      <span className="text-sm font-black text-gray-800">
                        Número
                      </span>
                      <input
                        value={dados.numero}
                        onChange={(event) =>
                          atualizarCampo("numero", event.target.value)
                        }
                        required={formaEntrega === "receber-casa"}
                        className="mt-2 w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm font-bold outline-none focus:border-red-500"
                        placeholder="123"
                      />
                    </label>

                    <label className="block">
                      <span className="text-sm font-black text-gray-800">
                        Complemento
                      </span>
                      <input
                        value={dados.complemento}
                        onChange={(event) =>
                          atualizarCampo("complemento", event.target.value)
                        }
                        className="mt-2 w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm font-bold outline-none focus:border-red-500"
                        placeholder="Apto, bloco, referência..."
                      />
                    </label>

                    <label className="block">
                      <span className="text-sm font-black text-gray-800">
                        Bairro
                      </span>
                      <input
                        value={dados.bairro}
                        onChange={(event) =>
                          atualizarCampo("bairro", event.target.value)
                        }
                        required={formaEntrega === "receber-casa"}
                        className="mt-2 w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm font-bold outline-none focus:border-red-500"
                        placeholder="Bairro"
                      />
                    </label>

                    <div className="grid gap-4 sm:grid-cols-[1fr_90px]">
                      <label className="block">
                        <span className="text-sm font-black text-gray-800">
                          Cidade
                        </span>
                        <input
                          value={dados.cidade}
                          onChange={(event) =>
                            atualizarCampo("cidade", event.target.value)
                          }
                          required={formaEntrega === "receber-casa"}
                          className="mt-2 w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm font-bold outline-none focus:border-red-500"
                          placeholder="Cidade"
                        />
                      </label>

                      <label className="block">
                        <span className="text-sm font-black text-gray-800">
                          UF
                        </span>
                        <input
                          value={dados.estado}
                          onChange={(event) =>
                            atualizarCampo("estado", event.target.value)
                          }
                          required={formaEntrega === "receber-casa"}
                          className="mt-2 w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm font-bold uppercase outline-none focus:border-red-500"
                          placeholder="SE"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {formaEntrega !== "receber-casa" && (
                <div className="rounded-3xl bg-green-50 p-5 text-sm font-bold leading-relaxed text-green-800">
                  Você escolheu {formaEntregaTexto.toLowerCase()}. Não será
                  cobrado frete. Entraremos em contato pelo WhatsApp informado
                  para combinar os detalhes da retirada.
                </div>
              )}

              <label className="block">
                <span className="text-sm font-black text-gray-800">
                  Observações
                </span>
                <textarea
                  value={dados.observacoes}
                  onChange={(event) =>
                    atualizarCampo("observacoes", event.target.value)
                  }
                  rows={3}
                  className="mt-2 w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm font-bold outline-none focus:border-red-500"
                  placeholder={
                    formaEntrega === "receber-casa"
                      ? "Ex.: entregar pela manhã, ponto de referência, nome de quem recebe..."
                      : "Ex.: melhor horário para contato, evento que pretende retirar, observações sobre a retirada..."
                  }
                />
              </label>

              <label className="flex gap-3 rounded-2xl bg-yellow-50 p-4 text-sm font-bold leading-relaxed text-gray-800">
                <input
                  type="checkbox"
                  checked={aceitouPreVenda}
                  onChange={(event) => setAceitouPreVenda(event.target.checked)}
                  className="mt-1 h-5 w-5 shrink-0"
                />

                <span>
                  Confirmo que estou comprando um produto em pré-venda e que a
                  entrega ou retirada seguirá o prazo informado na página do
                  produto.
                </span>
              </label>

              {erro && (
                <div className="rounded-2xl bg-red-100 p-4 text-sm font-black text-red-700">
                  {erro}
                </div>
              )}

              <button
                type="submit"
                disabled={carregando}
                className="w-full rounded-full bg-red-600 px-6 py-4 text-center text-sm font-black uppercase tracking-wide text-white shadow-lg transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-400"
              >
                {carregando
                  ? "Preparando pagamento..."
                  : `Continuar para pagamento — ${formatarMoeda(valorTotal)}`}
              </button>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}
