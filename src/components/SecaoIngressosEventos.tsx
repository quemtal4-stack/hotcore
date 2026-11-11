"use client";

import Link from "next/link";

type EventoIngresso = {
  id: string;
  titulo: string;
  municipio: string;
  descricao: string;
  abertura: Date;
  encerramento: Date;
  metaPrincipal: number;
  metaSecundaria: number;
  metaSuperada: number;
  metaMunicipio: number;
};

type SecaoIngressosEventosProps = {
  kgDoados?: number;
  metaKg?: number;
  ingressosVendidos?: number;
};

const META_TOTAL_ANUAL = 25000;

const EVENTOS_CITY_QUEST: EventoIngresso[] = [
  {
    id: "hot-dogueres-city-quest-2027-01",
    titulo: "Hot Dogueres City Quest",
    municipio: "1º município de Sergipe",
    descricao:
      "Primeira etapa da gincana urbana Hot Dogueres City Quest em Sergipe.",
    abertura: new Date(2027, 0, 25, 0, 0, 0),
    encerramento: new Date(2027, 2, 25, 23, 59, 59),
    metaPrincipal: 5000,
    metaSecundaria: 8000,
    metaSuperada: 10000,
    metaMunicipio: 5000,
  },
  {
    id: "hot-dogueres-city-quest-2027-02",
    titulo: "Hot Dogueres City Quest",
    municipio: "2º município de Sergipe",
    descricao:
      "Segunda etapa da gincana urbana Hot Dogueres City Quest em Sergipe.",
    abertura: new Date(2027, 2, 25, 0, 0, 0),
    encerramento: new Date(2027, 4, 28, 23, 59, 59),
    metaPrincipal: 5000,
    metaSecundaria: 8000,
    metaSuperada: 10000,
    metaMunicipio: 5000,
  },
  {
    id: "hot-dogueres-city-quest-2027-03",
    titulo: "Hot Dogueres City Quest",
    municipio: "3º município de Sergipe",
    descricao:
      "Terceira etapa da gincana urbana Hot Dogueres City Quest em Sergipe.",
    abertura: new Date(2027, 4, 28, 0, 0, 0),
    encerramento: new Date(2027, 6, 30, 23, 59, 59),
    metaPrincipal: 5000,
    metaSecundaria: 8000,
    metaSuperada: 10000,
    metaMunicipio: 5000,
  },
  {
    id: "hot-dogueres-city-quest-2027-04",
    titulo: "Hot Dogueres City Quest",
    municipio: "4º município de Sergipe",
    descricao:
      "Quarta etapa da gincana urbana Hot Dogueres City Quest em Sergipe.",
    abertura: new Date(2027, 6, 30, 0, 0, 0),
    encerramento: new Date(2027, 9, 1, 23, 59, 59),
    metaPrincipal: 5000,
    metaSecundaria: 8000,
    metaSuperada: 10000,
    metaMunicipio: 5000,
  },
  {
    id: "hot-dogueres-city-quest-2027-05",
    titulo: "Hot Dogueres City Quest",
    municipio: "5º município de Sergipe",
    descricao:
      "Quinta etapa da gincana urbana Hot Dogueres City Quest em Sergipe.",
    abertura: new Date(2027, 9, 1, 0, 0, 0),
    encerramento: new Date(2027, 10, 30, 23, 59, 59),
    metaPrincipal: 5000,
    metaSecundaria: 8000,
    metaSuperada: 10000,
    metaMunicipio: 5000,
  },
];

function formatarData(data: Date) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(data);
}

function formatarDataCurta(data: Date) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(data);
}

function formatarNumero(valor: number) {
  return new Intl.NumberFormat("pt-BR").format(valor);
}

function obterStatus(evento: EventoIngresso, agora: Date) {
  if (agora < evento.abertura) {
    return {
      texto: "Venda programada",
      classe: "bg-blue-100 text-blue-800",
      disponivel: false,
    };
  }

  if (agora > evento.encerramento) {
    return {
      texto: "Venda encerrada",
      classe: "bg-gray-200 text-gray-700",
      disponivel: false,
    };
  }

  return {
    texto: "Venda aberta",
    classe: "bg-green-100 text-green-800",
    disponivel: true,
  };
}

function obterEventosParaDestaque(agora: Date) {
  const eventoAberto = EVENTOS_CITY_QUEST.find(
    (evento) => agora >= evento.abertura && agora <= evento.encerramento,
  );

  if (eventoAberto) {
    const indiceAtual = EVENTOS_CITY_QUEST.findIndex(
      (evento) => evento.id === eventoAberto.id,
    );

    return {
      principal: eventoAberto,
      proximo: EVENTOS_CITY_QUEST[indiceAtual + 1] ?? null,
    };
  }

  const proximoEvento = EVENTOS_CITY_QUEST.find(
    (evento) => agora < evento.abertura,
  );

  if (proximoEvento) {
    const indiceProximo = EVENTOS_CITY_QUEST.findIndex(
      (evento) => evento.id === proximoEvento.id,
    );

    return {
      principal: proximoEvento,
      proximo: EVENTOS_CITY_QUEST[indiceProximo + 1] ?? null,
    };
  }

  return {
    principal: EVENTOS_CITY_QUEST[EVENTOS_CITY_QUEST.length - 1],
    proximo: null,
  };
}

function CardEvento({
  evento,
  tipo,
}: {
  evento: EventoIngresso;
  tipo: "principal" | "proximo";
}) {
  const agora = new Date();
  const status = obterStatus(evento, agora);

  const hrefCheckout = `/checkout/ingressos?evento=${encodeURIComponent(
    evento.id,
  )}&municipio=${encodeURIComponent(evento.municipio)}`;

  return (
    <article
      className={`overflow-hidden rounded-[2rem] bg-white shadow-xl ring-1 ${
        tipo === "principal" ? "ring-red-100" : "ring-yellow-200"
      }`}
    >
      <div
        className={`p-4 text-white md:p-5 ${
          tipo === "principal"
            ? "bg-gradient-to-br from-red-700 via-red-600 to-yellow-400"
            : "bg-gradient-to-br from-gray-950 via-red-800 to-yellow-500"
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="rounded-full bg-white/20 px-4 py-2 text-xs font-black uppercase tracking-[0.2em]">
            {tipo === "principal" ? "Primeiro evento" : "Próximo evento"}
          </p>

          <span
            className={`rounded-full px-4 py-2 text-xs font-black uppercase tracking-[0.15em] ${status.classe}`}
          >
            {status.texto}
          </span>
        </div>

        <div className="mt-5 flex items-center gap-3">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-3xl shadow-lg">
            🗺️
          </div>

          <div>
            <h2 className="text-2xl font-black leading-tight md:text-3xl">
              {evento.titulo}
            </h2>

            <p className="mt-1 text-xs font-black uppercase tracking-[0.16em] text-yellow-100">
              {evento.municipio}
            </p>
          </div>
        </div>

        <p className="mt-3 max-w-2xl text-xs font-bold leading-relaxed text-white/90 md:text-sm">
          {evento.descricao}
        </p>
      </div>

      <div className="space-y-4 p-4 md:p-5">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl bg-red-50 p-3">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-red-700">
              Abertura
            </p>
            <p className="mt-2 text-lg font-black text-gray-950">
              {formatarData(evento.abertura)}
            </p>
          </div>

          <div className="rounded-2xl bg-yellow-50 p-3">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-yellow-700">
              Encerramento
            </p>
            <p className="mt-2 text-lg font-black text-gray-950">
              {formatarData(evento.encerramento)}
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-3">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-gray-600">
            Metas do município
          </p>

          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-white p-3 text-center shadow-sm">
              <p className="text-xl font-black text-red-700">
                {formatarNumero(evento.metaPrincipal)}
              </p>
              <p className="mt-1 text-xs font-bold text-gray-600">
                primeira meta
              </p>
            </div>

            <div className="rounded-2xl bg-white p-3 text-center shadow-sm">
              <p className="text-xl font-black text-yellow-600">
                {formatarNumero(evento.metaSecundaria)}
              </p>
              <p className="mt-1 text-xs font-bold text-gray-600">
                segunda meta
              </p>
            </div>

            <div className="rounded-2xl bg-white p-3 text-center shadow-sm">
              <p className="text-xl font-black text-green-700">
                +{formatarNumero(evento.metaSuperada)}
              </p>
              <p className="mt-1 text-xs font-bold text-gray-600">
                meta superada
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-gray-950 p-3 text-white">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-yellow-300">
            Regra de venda
          </p>

          <p className="mt-2 text-xs font-bold leading-relaxed text-white/85 md:text-sm">
            A meta base é de {formatarNumero(evento.metaMunicipio)} ingressos
            por município, mas a venda pode continuar acima da meta dentro do
            período oficial.
          </p>
        </div>

        {status.disponivel ? (
          <Link
            href={hrefCheckout}
            className="flex w-full items-center justify-center rounded-full bg-red-600 px-5 py-3 text-center text-xs font-black uppercase tracking-[0.16em] text-white shadow-lg transition hover:bg-red-700"
          >
            Comprar ingresso
          </Link>
        ) : (
          <div className="flex w-full items-center justify-center rounded-full bg-gray-200 px-5 py-3 text-center text-xs font-black uppercase tracking-[0.16em] text-gray-600">
            {agora < evento.abertura
              ? `Venda abre em ${formatarData(evento.abertura)}`
              : "Venda encerrada"}
          </div>
        )}
      </div>
    </article>
  );
}

export default function SecaoIngressosEventos({
  kgDoados = 0,
  metaKg = 0,
  ingressosVendidos = 0,
}: SecaoIngressosEventosProps) {
  void kgDoados;
  void metaKg;
  void ingressosVendidos;

  const agora = new Date();
  const { principal, proximo } = obterEventosParaDestaque(agora);

  return (
    <section id="ingressos-eventos" className="mt-6 w-full">
      <div className="mx-auto w-full max-w-6xl rounded-[2rem] bg-white p-5 shadow-xl md:p-6">
        <div className="mx-auto max-w-4xl text-center">
          <p className="inline-flex rounded-full bg-red-100 px-5 py-2 text-xs font-black uppercase tracking-[0.25em] text-red-700">
            Ingressos oficiais
          </p>

          <h1 className="mt-4 text-3xl font-black leading-tight text-gray-950 md:text-4xl">
            Hot Dogueres City Quest 2027
          </h1>

          <p className="mx-auto mt-3 max-w-3xl text-sm font-bold leading-relaxed text-gray-700 md:text-base">
            Uma gincana urbana em municípios de Sergipe, com 5 eventos durante
            o ano. Cada município começa com meta de 5 mil ingressos, segunda
            meta de 8 mil e venda aberta para ultrapassar 10 mil ingressos
            dentro do prazo oficial.
          </p>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <CardEvento evento={principal} tipo="principal" />

          {proximo ? (
            <CardEvento evento={proximo} tipo="proximo" />
          ) : (
            <article className="flex min-h-[280px] items-center justify-center rounded-[2rem] bg-white p-6 text-center shadow-xl ring-1 ring-gray-200">
              <div>
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-3xl">
                  🏁
                </div>

                <h2 className="mt-4 text-2xl font-black text-gray-950">
                  Calendário concluído
                </h2>

                <p className="mt-3 max-w-md text-sm font-bold leading-relaxed text-gray-600">
                  Todos os eventos cadastrados para o Hot Dogueres City Quest
                  2027 já passaram.
                </p>
              </div>
            </article>
          )}
        </div>

        <div className="mt-5 rounded-[1.5rem] bg-gray-50 p-4 shadow-inner">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-red-700">
                Meta anual
              </p>

              <h3 className="mt-1 text-xl font-black text-gray-950">
                {formatarNumero(META_TOTAL_ANUAL)} ingressos em 2027
              </h3>
            </div>

            <p className="rounded-full bg-yellow-100 px-4 py-2 text-xs font-black text-yellow-800">
              5 municípios × 5 mil ingressos
            </p>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-5">
            {EVENTOS_CITY_QUEST.map((evento, index) => {
              const status = obterStatus(evento, agora);

              return (
                <div
                  key={evento.id}
                  className="rounded-2xl border border-gray-200 bg-white p-3"
                >
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-gray-500">
                    Etapa {index + 1}
                  </p>

                  <p className="mt-1 text-sm font-black text-gray-950">
                    {evento.municipio}
                  </p>

                  <p className="mt-2 text-xs font-bold leading-relaxed text-gray-600">
                    {formatarDataCurta(evento.abertura)} até{" "}
                    {formatarDataCurta(evento.encerramento)}
                  </p>

                  <span
                    className={`mt-3 inline-flex rounded-full px-3 py-2 text-[10px] font-black uppercase tracking-[0.12em] ${status.classe}`}
                  >
                    {status.texto}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
