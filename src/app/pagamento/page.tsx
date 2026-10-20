import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pagamento | Clube Hot Dogueres",
  description:
    "Finalize seu plano do Clube Hot Dogueres via PIX ou WhatsApp com segurança e praticidade.",
};

type PagamentoSearchParams = {
  plano?: string;
  nome?: string;
  email?: string;
  whatsapp?: string;
};

type Plano = {
  id: string;
  nome: string;
  valor: string;
  recorrencia: string;
  descricao: string;
  destaque: string;
  beneficios: string[];
};

const CHAVE_PIX = "22.311.249/0001-50";
const WHATSAPP_HOT_DOGUERES = "5579981314109";

const PLANOS: Record<string, Plano> = {
  apoiador: {
    id: "apoiador",
    nome: "Apoiador",
    valor: "R$ 19,90",
    recorrencia: "por mês",
    descricao:
      "Plano ideal para entrar no Clube Hot Dogueres, apoiar o projeto e fazer parte dessa caminhada.",
    destaque: "Entrada no clube",
    beneficios: [
      "Participação como membro apoiador",
      "Nome ligado à construção da marca",
      "Acesso às novidades do projeto",
      "Apoio direto ao crescimento da Hot Dogueres",
    ],
  },
  fundador: {
    id: "fundador",
    nome: "Fundador",
    valor: "R$ 39,90",
    recorrencia: "por mês",
    descricao:
      "Plano para quem quer apoiar ainda mais a Hot Dogueres todos os meses e caminhar mais perto da marca.",
    destaque: "Mais apoio mensal",
    beneficios: [
      "Participação como membro fundador",
      "Reconhecimento especial dentro do clube",
      "Apoio recorrente ao projeto",
      "Presença mais forte na história da marca",
    ],
  },
  anual: {
    id: "anual",
    nome: "Anual",
    valor: "R$ 497,00",
    recorrencia: "por ano",
    descricao:
      "Plano anual para quem quer apoiar a Hot Dogueres por 12 meses e fortalecer a construção do projeto.",
    destaque: "Apoio por 12 meses",
    beneficios: [
      "Participação anual no Clube Hot Dogueres",
      "Apoio antecipado ao crescimento da marca",
      "Reconhecimento especial como apoiador anual",
      "Mais estabilidade para o projeto continuar evoluindo",
    ],
  },
  eternizado: {
    id: "eternizado",
    nome: "Anual",
    valor: "R$ 497,00",
    recorrencia: "por ano",
    descricao:
      "Plano anual para quem quer apoiar a Hot Dogueres por 12 meses e fortalecer a construção do projeto.",
    destaque: "Apoio por 12 meses",
    beneficios: [
      "Participação anual no Clube Hot Dogueres",
      "Apoio antecipado ao crescimento da marca",
      "Reconhecimento especial como apoiador anual",
      "Mais estabilidade para o projeto continuar evoluindo",
    ],
  },
};

function pegarTexto(valor?: string | string[]) {
  if (Array.isArray(valor)) {
    return valor[0] || "";
  }

  return valor || "";
}

function normalizarPlano(plano?: string | string[]) {
  const planoRecebido = pegarTexto(plano).toLowerCase();

  if (planoRecebido === "fundador") {
    return PLANOS.fundador;
  }

  if (planoRecebido === "anual" || planoRecebido === "eternizado") {
    return PLANOS.anual;
  }

  return PLANOS.apoiador;
}

export default async function PagamentoClubePage({
  searchParams,
}: {
  searchParams?: Promise<PagamentoSearchParams> | PagamentoSearchParams;
}) {
  const params = searchParams ? await searchParams : {};

  const plano = normalizarPlano(params.plano);
  const nome = pegarTexto(params.nome);
  const email = pegarTexto(params.email);
  const whatsapp = pegarTexto(params.whatsapp);

  const mensagemWhatsApp = encodeURIComponent(
    `Olá! Acabei de fazer meu cadastro no Clube Hot Dogueres.

Nome: ${nome || "Não informado"}
E-mail: ${email || "Não informado"}
WhatsApp: ${whatsapp || "Não informado"}
Plano: ${plano.nome}
Valor: ${plano.valor} ${plano.recorrencia}

Quero finalizar meu pagamento.`
  );

  const linkWhatsApp = `https://wa.me/${WHATSAPP_HOT_DOGUERES}?text=${mensagemWhatsApp}`;

  const dadosCliente = [
    {
      label: "Nome",
      valor: nome || "Não informado",
    },
    {
      label: "E-mail",
      valor: email || "Não informado",
    },
    {
      label: "WhatsApp",
      valor: whatsapp || "Não informado",
    },
    {
      label: "Plano",
      valor: plano.nome,
    },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FFF8E7] px-4 py-8 text-[#111111] md:px-8 md:py-10">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#FFE99A_0%,#FFB347_40%,#E11D2E_100%)]" />
      <div className="absolute left-[-140px] top-[-140px] h-96 w-96 rounded-full bg-white/45 blur-3xl" />
      <div className="absolute bottom-[-180px] right-[-140px] h-[28rem] w-[28rem] rounded-full bg-black/25 blur-3xl" />
      <div className="absolute left-[12%] top-[28%] hidden h-48 w-48 rounded-full bg-[#E11D2E]/25 blur-3xl md:block" />
      <div className="absolute right-[18%] top-[12%] hidden h-40 w-40 rounded-full bg-[#FFE99A]/45 blur-3xl md:block" />

      <Link
        href="/clube-de-membros#planos"
        className="relative z-20 inline-flex rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-black text-[#111111] shadow-xl transition hover:scale-105 hover:bg-[#FFF1B8]"
      >
        ← Voltar para os planos
      </Link>

      <Image
        src="/mascote-esquerda.png"
        alt="Mascote Hot Dogueres"
        width={520}
        height={520}
        className="pointer-events-none absolute bottom-0 left-4 z-10 hidden w-[28vw] max-w-[460px] select-none drop-shadow-2xl lg:block"
        priority
      />

      <Image
        src="/mascote-direita.png"
        alt="Mascote Hot Dogueres"
        width={520}
        height={520}
        className="pointer-events-none absolute bottom-0 right-4 z-10 hidden w-[28vw] max-w-[460px] select-none drop-shadow-2xl lg:block"
        priority
      />

      <section className="relative z-20 mx-auto mt-8 grid w-full max-w-6xl gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="rounded-[2rem] border border-white/35 bg-black/65 p-6 text-white shadow-2xl backdrop-blur-md md:p-8">
          <p className="inline-flex rounded-full bg-[#FFE99A] px-4 py-2 text-xs font-black uppercase tracking-[0.25em] text-[#111111]">
            Pagamento do clube
          </p>

          <h1 className="mt-6 text-4xl font-black leading-tight md:text-6xl">
            Finalize seu plano{" "}
            <span className="text-[#FFE99A]">{plano.nome}</span>.
          </h1>

          <p className="mt-5 max-w-xl text-base font-semibold leading-relaxed text-white/80 md:text-lg">
            Confira seus dados, veja o resumo do plano escolhido e finalize pelo
            WhatsApp para receber a chave PIX ou o QR Code.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/10 p-5">
              <p className="text-xs font-black uppercase tracking-wide text-[#FFE99A]">
                Plano
              </p>
              <p className="mt-2 text-2xl font-black">{plano.nome}</p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/10 p-5">
              <p className="text-xs font-black uppercase tracking-wide text-[#FFE99A]">
                Valor
              </p>
              <p className="mt-2 text-2xl font-black">{plano.valor}</p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/10 p-5">
              <p className="text-xs font-black uppercase tracking-wide text-[#FFE99A]">
                Recorrência
              </p>
              <p className="mt-2 text-lg font-black">{plano.recorrencia}</p>
            </div>
          </div>

          <div className="mt-6 rounded-3xl border border-[#FFE99A]/30 bg-[#FFE99A]/10 p-5">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[#FFE99A]">
              {plano.destaque}
            </p>

            <p className="mt-3 leading-relaxed text-white/85">
              {plano.descricao}
            </p>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/50 bg-white p-5 shadow-2xl md:p-7">
          <div className="rounded-[1.7rem] bg-[#FFF8E7] p-5 md:p-7">
            <div className="flex flex-col gap-4 border-b border-black/10 pb-6 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.25em] text-[#E11D2E]">
                  Resumo
                </p>

                <h2 className="mt-2 text-3xl font-black text-[#111111] md:text-4xl">
                  Conferência do pedido
                </h2>
              </div>

              <div className="rounded-2xl bg-[#E11D2E] px-5 py-3 text-center text-white shadow-lg">
                <p className="text-xs font-black uppercase tracking-wide">
                  Total
                </p>
                <p className="text-2xl font-black">{plano.valor}</p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {dadosCliente.map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col gap-1 rounded-2xl bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
                >
                  <strong className="text-sm text-[#111111]">
                    {item.label}
                  </strong>

                  <span className="break-words text-left text-sm font-bold text-[#444444] sm:text-right">
                    {item.valor}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-[1.5rem] border-2 border-dashed border-[#FFB347] bg-[#FFF1B8] p-5 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-3xl shadow-md">
                🔐
              </div>

              <h3 className="mt-4 text-xl font-black text-[#111111]">
                Pagamento via PIX
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm font-semibold leading-relaxed text-[#444444]">
                Nesta etapa, você fala com a Hot Dogueres pelo WhatsApp para
                receber a chave PIX ou o QR Code e concluir o pagamento.
              </p>

              <div className="mt-4 rounded-2xl border border-[#FFB347]/50 bg-white p-4">
                <p className="text-xs font-black uppercase tracking-wide text-[#E11D2E]">
                  Chave PIX
                </p>

                <p className="mt-1 break-all text-lg font-black text-[#111111]">
                  {CHAVE_PIX}
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-[1.5rem] bg-white p-5 shadow-sm">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#E11D2E]">
                Benefícios do plano
              </p>

              <ul className="mt-4 space-y-3">
                {plano.beneficios.map((beneficio) => (
                  <li
                    key={beneficio}
                    className="flex gap-3 text-sm font-bold leading-relaxed text-[#333333]"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100 text-xs text-green-700">
                      ✓
                    </span>
                    {beneficio}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 grid gap-3">
              <a
                href={linkWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-green-600 px-6 py-4 text-center text-base font-black uppercase tracking-wide text-white shadow-xl transition hover:scale-[1.02] hover:bg-green-700"
              >
                Finalizar pelo WhatsApp
              </a>

              <Link
                href={`/clube/cadastro?plano=${encodeURIComponent(plano.id)}`}
                className="rounded-full bg-[#111111] px-6 py-4 text-center text-base font-black uppercase tracking-wide text-white shadow-xl transition hover:scale-[1.02] hover:bg-black"
              >
                Corrigir cadastro
              </Link>

              <Link
                href="/clube-de-membros#planos"
                className="rounded-full border border-[#E11D2E]/25 bg-white px-6 py-4 text-center text-sm font-black uppercase tracking-wide text-[#E11D2E] transition hover:bg-[#FFF1B8]"
              >
                ← Escolher outro plano
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-20 mx-auto mt-8 max-w-6xl rounded-[2rem] border border-white/35 bg-white/20 p-5 text-white shadow-xl backdrop-blur-md md:p-6">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl bg-black/45 p-5">
            <p className="text-2xl">📲</p>
            <h3 className="mt-3 text-lg font-black">1. Envie pelo WhatsApp</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/75">
              Clique no botão verde para mandar seus dados já preenchidos.
            </p>
          </div>

          <div className="rounded-3xl bg-black/45 p-5">
            <p className="text-2xl">💳</p>
            <h3 className="mt-3 text-lg font-black">2. Receba o PIX</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/75">
              Você receberá a chave PIX ou QR Code para concluir o pagamento.
            </p>
          </div>

          <div className="rounded-3xl bg-black/45 p-5">
            <p className="text-2xl">🌭</p>
            <h3 className="mt-3 text-lg font-black">3. Entre para o clube</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/75">
              Após a confirmação, sua participação no clube será registrada.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
