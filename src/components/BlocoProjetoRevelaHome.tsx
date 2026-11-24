import Link from "next/link";

const META_PROJETO_REVELA_REAIS = 60000;
const TOTAL_ARRECADADO_PROJETO_REVELA_REAIS = 0;

const COTAS_PROJETO_REVELA = [
  {
    titulo: "01. Semente de Talento",
    valor: "R$ 100,00",
    pontos: "100 pontos",
  },
  {
    titulo: "02. Incentivador",
    valor: "R$ 200,00",
    pontos: "220 pontos",
  },
  {
    titulo: "03. Desenvolvedor",
    valor: "R$ 325,00",
    pontos: "380 pontos",
  },
  {
    titulo: "04. Adotante Integral",
    valor: "R$ 650,00",
    pontos: "800 pontos",
  },
];

function formatarMoeda(valor: number) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export default function BlocoProjetoRevelaHome() {
  const porcentagem = Math.min(
    (TOTAL_ARRECADADO_PROJETO_REVELA_REAIS / META_PROJETO_REVELA_REAIS) * 100,
    100,
  );

  const faltaParaMeta = Math.max(
    META_PROJETO_REVELA_REAIS - TOTAL_ARRECADADO_PROJETO_REVELA_REAIS,
    0,
  );

  return (
    <section className="w-full px-4 pb-8">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-white shadow-2xl ring-1 ring-purple-100">
        <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative overflow-hidden bg-gradient-to-br from-purple-800 via-purple-700 to-red-600 p-5 text-white md:p-7 lg:p-8">
            <div className="absolute left-[-120px] top-[-120px] h-72 w-72 rounded-full bg-white/20 blur-3xl" />
            <div className="absolute bottom-[-140px] right-[-120px] h-80 w-80 rounded-full bg-yellow-300/30 blur-3xl" />

            <div className="relative z-10">
              <p className="inline-flex rounded-full bg-yellow-400 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-950 shadow-md">
                Projeto Revela
              </p>

              <h2 className="mt-4 text-2xl font-black leading-tight md:text-4xl">
                Primeira meta: colocar o projeto de pé.
              </h2>

              <p className="mt-4 text-sm font-bold leading-relaxed text-white/90">
                Antes da meta mensal de manutenção, o Projeto Hot Dogueres
                Revela precisa de uma implantação inicial para comprar
                equipamentos, materiais, uniformes e estruturar as primeiras
                aulas gratuitas de judô, dança e pintura.
              </p>

              <div className="mt-5 rounded-[1.5rem] bg-white/10 p-4 ring-1 ring-white/15">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-yellow-300">
                  O que entra nos R$ 60 mil iniciais
                </p>

                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {[
                    "Tatames",
                    "Kimonos",
                    "2 camisas por criança",
                    "Tripés de pintura",
                    "Tintas e pincéis",
                    "Quadros e cadeiras",
                    "Caixas de armazenamento",
                    "Tablado para dança",
                    "Caixa de som",
                    "Aluguel, professores e lanches",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl bg-white/10 px-3 py-2 text-xs font-black leading-relaxed text-white ring-1 ring-white/10"
                    >
                      ✓ {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 rounded-[1.5rem] bg-yellow-400 p-4 text-gray-950 shadow-lg">
                <p className="text-[10px] font-black uppercase tracking-[0.2em]">
                  Depois da implantação
                </p>

                <p className="mt-2 text-sm font-black leading-relaxed">
                  A partir do segundo mês, a meta volta para R$ 25.000/mês para
                  manter transporte, professores, alimentação, reposição de
                  materiais, coordenação e acompanhamento das crianças.
                </p>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {COTAS_PROJETO_REVELA.map((cota) => (
                  <div
                    key={cota.titulo}
                    className="rounded-2xl bg-white/10 p-3 ring-1 ring-white/15"
                  >
                    <p className="text-xs font-black text-white">
                      {cota.titulo}
                    </p>

                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-white px-3 py-1 text-[10px] font-black text-purple-800">
                        {cota.valor}
                      </span>

                      <span className="rounded-full bg-yellow-400 px-3 py-1 text-[10px] font-black text-gray-950">
                        {cota.pontos}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center bg-[#fff7e8] p-5 md:p-7 lg:p-8">
            <div className="w-full">
              <div className="text-center">
                <p className="inline-flex rounded-full bg-purple-100 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-purple-700">
                  Termômetro de implantação
                </p>

                <h3 className="mt-4 text-2xl font-black leading-tight text-gray-950 md:text-4xl">
                  Meta inicial de {formatarMoeda(META_PROJETO_REVELA_REAIS)}
                </h3>

                <p className="mx-auto mt-3 max-w-md text-sm font-bold leading-relaxed text-gray-600">
                  Esse valor será usado para iniciar o projeto com estrutura
                  mínima, segurança e materiais adequados para as crianças.
                </p>
              </div>

              <div className="mt-6 rounded-[1.75rem] bg-white p-5 shadow-xl ring-1 ring-purple-100">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl bg-purple-50 p-4">
                    <p className="text-[10px] font-black uppercase tracking-wide text-purple-700">
                      Arrecadado
                    </p>

                    <p className="mt-1 text-3xl font-black text-purple-700">
                      {formatarMoeda(TOTAL_ARRECADADO_PROJETO_REVELA_REAIS)}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-yellow-50 p-4">
                    <p className="text-[10px] font-black uppercase tracking-wide text-yellow-700">
                      Falta
                    </p>

                    <p className="mt-1 text-3xl font-black text-gray-950">
                      {formatarMoeda(faltaParaMeta)}
                    </p>
                  </div>
                </div>

                <div className="mt-5 h-7 overflow-hidden rounded-full bg-purple-100 shadow-inner">
                  <div
                    className="flex h-full items-center justify-end rounded-full bg-gradient-to-r from-purple-700 via-red-600 to-yellow-400 px-3 text-xs font-black text-white transition-all duration-700"
                    style={{ width: `${porcentagem}%` }}
                  >
                    {porcentagem > 12 ? `${porcentagem.toFixed(0)}%` : ""}
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-[10px] font-black uppercase tracking-wide text-gray-500">
                  <span>0%</span>
                  <span>{porcentagem.toFixed(0)}% alcançado</span>
                  <span>100%</span>
                </div>

                <div className="mt-5 rounded-2xl bg-gray-950 p-4 text-center text-white">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-yellow-300">
                    Transparência
                  </p>

                  <p className="mt-2 text-sm font-bold leading-relaxed text-white/85">
                    A meta de R$ 60 mil é apenas a primeira etapa. Ela permite
                    comprar os materiais e iniciar as aulas. Depois, a
                    manutenção mensal será de R$ 25 mil.
                  </p>
                </div>

                <div className="mt-4 rounded-2xl bg-purple-50 p-4 text-center ring-1 ring-purple-100">
                  <p className="text-sm font-black text-purple-800">
                    Ingresso de R$ 100,00 também vale 100 pontos no Ranking do
                    Bem.
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <Link
                  href="/projeto-revela"
                  className="flex justify-center rounded-full bg-purple-700 px-5 py-3 text-xs font-black uppercase tracking-wide text-white shadow-lg transition hover:-translate-y-1 hover:bg-purple-800"
                >
                  Conhecer o projeto
                </Link>

                <Link
                  href="/cadastro?tipo=projeto-revela"
                  className="flex justify-center rounded-full bg-yellow-400 px-5 py-3 text-xs font-black uppercase tracking-wide text-gray-950 shadow-lg transition hover:-translate-y-1 hover:bg-yellow-500"
                >
                  Apoiar agora
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
