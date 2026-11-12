import Image from "next/image";

type IngressoHistorico = {
  id: string;
  titulo: string;
  subtitulo: string;
  categoria: "Eventos" | "Fixos" | "City Quest";
  imagem: string;
};

type AlbumHistorico = {
  id: string;
  titulo: string;
  subtitulo: string;
  descricao: string;
  imagem: string;
  destaque?: boolean;
};

const INGRESSOS_EVENTOS: IngressoHistorico[] = [
  {
    id: "evento-01",
    titulo: "Ingresso de Evento 01",
    subtitulo: "Feiras, festivais, corridas e experiências especiais",
    categoria: "Eventos",
    imagem: "/loja-solidaria/ingressos-historicos/evento-01.png",
  },
  {
    id: "evento-02",
    titulo: "Ingresso de Evento 02",
    subtitulo: "Feiras, festivais, corridas e experiências especiais",
    categoria: "Eventos",
    imagem: "/loja-solidaria/ingressos-historicos/evento-02.png",
  },
  {
    id: "evento-03",
    titulo: "Ingresso de Evento 03",
    subtitulo: "Feiras, festivais, corridas e experiências especiais",
    categoria: "Eventos",
    imagem: "/loja-solidaria/ingressos-historicos/evento-03.png",
  },
  {
    id: "evento-04",
    titulo: "Ingresso de Evento 04",
    subtitulo: "Feiras, festivais, corridas e experiências especiais",
    categoria: "Eventos",
    imagem: "/loja-solidaria/ingressos-historicos/evento-04.png",
  },
  {
    id: "evento-05",
    titulo: "Ingresso de Evento 05",
    subtitulo: "Feiras, festivais, corridas e experiências especiais",
    categoria: "Eventos",
    imagem: "/loja-solidaria/ingressos-historicos/evento-05.png",
  },
  {
    id: "evento-06",
    titulo: "Ingresso de Evento 06",
    subtitulo: "Feiras, festivais, corridas e experiências especiais",
    categoria: "Eventos",
    imagem: "/loja-solidaria/ingressos-historicos/evento-06.png",
  },
  {
    id: "evento-07",
    titulo: "Ingresso de Evento 07",
    subtitulo: "Feiras, festivais, corridas e experiências especiais",
    categoria: "Eventos",
    imagem: "/loja-solidaria/ingressos-historicos/evento-07.png",
  },
  {
    id: "evento-08",
    titulo: "Ingresso de Evento 08",
    subtitulo: "Feiras, festivais, corridas e experiências especiais",
    categoria: "Eventos",
    imagem: "/loja-solidaria/ingressos-historicos/evento-08.png",
  },
];

const INGRESSOS_FIXOS: IngressoHistorico[] = [
  {
    id: "fixo-2027-01",
    titulo: "Ingresso Fixo 2027 — 01",
    subtitulo: "Coleção fixa anual do Ecossistema Hot Dogueres",
    categoria: "Fixos",
    imagem: "/loja-solidaria/ingressos-historicos/fixo-2027-01.png",
  },
  {
    id: "fixo-2027-02",
    titulo: "Ingresso Fixo 2027 — 02",
    subtitulo: "Coleção fixa anual do Ecossistema Hot Dogueres",
    categoria: "Fixos",
    imagem: "/loja-solidaria/ingressos-historicos/fixo-2027-02.png",
  },
  {
    id: "fixo-2027-03",
    titulo: "Ingresso Fixo 2027 — 03",
    subtitulo: "Coleção fixa anual do Ecossistema Hot Dogueres",
    categoria: "Fixos",
    imagem: "/loja-solidaria/ingressos-historicos/fixo-2027-03.png",
  },
  {
    id: "fixo-2027-04",
    titulo: "Ingresso Fixo 2027 — 04",
    subtitulo: "Coleção fixa anual do Ecossistema Hot Dogueres",
    categoria: "Fixos",
    imagem: "/loja-solidaria/ingressos-historicos/fixo-2027-04.png",
  },
  {
    id: "fixo-2027-05",
    titulo: "Ingresso Fixo 2027 — 05",
    subtitulo: "Coleção fixa anual do Ecossistema Hot Dogueres",
    categoria: "Fixos",
    imagem: "/loja-solidaria/ingressos-historicos/fixo-2027-05.png",
  },
  {
    id: "fixo-2027-06",
    titulo: "Ingresso Fixo 2027 — 06",
    subtitulo: "Coleção fixa anual do Ecossistema Hot Dogueres",
    categoria: "Fixos",
    imagem: "/loja-solidaria/ingressos-historicos/fixo-2027-06.png",
  },
];

const INGRESSOS_CITY_QUEST: IngressoHistorico[] = [
  {
    id: "city-quest-01",
    titulo: "City Quest 01",
    subtitulo: "Primeiro município da jornada City Quest",
    categoria: "City Quest",
    imagem: "/loja-solidaria/ingressos-historicos/city-quest-01.png",
  },
  {
    id: "city-quest-02",
    titulo: "City Quest 02",
    subtitulo: "Segundo município da jornada City Quest",
    categoria: "City Quest",
    imagem: "/loja-solidaria/ingressos-historicos/city-quest-02.png",
  },
  {
    id: "city-quest-03",
    titulo: "City Quest 03",
    subtitulo: "Terceiro município da jornada City Quest",
    categoria: "City Quest",
    imagem: "/loja-solidaria/ingressos-historicos/city-quest-03.png",
  },
  {
    id: "city-quest-04",
    titulo: "City Quest 04",
    subtitulo: "Quarto município da jornada City Quest",
    categoria: "City Quest",
    imagem: "/loja-solidaria/ingressos-historicos/city-quest-04.png",
  },
  {
    id: "city-quest-05",
    titulo: "City Quest 05",
    subtitulo: "Quinto município da jornada City Quest",
    categoria: "City Quest",
    imagem: "/loja-solidaria/ingressos-historicos/city-quest-05.png",
  },
  {
    id: "city-quest-06",
    titulo: "City Quest 06",
    subtitulo: "Sexto município da jornada City Quest",
    categoria: "City Quest",
    imagem: "/loja-solidaria/ingressos-historicos/city-quest-06.png",
  },
];

const ALBUNS_HOT_DOGUERES: AlbumHistorico[] = [
  {
    id: "album-fisico",
    titulo: "Álbum Físico Premium",
    subtitulo: "Hot Dogueres — Memórias que Alimentam",
    descricao:
      "Álbum premium para guardar a coleção física de ingressos históricos dos próximos anos.",
    imagem: "/loja-solidaria/albuns/album-fisico-premium.png",
    destaque: true,
  },
  {
    id: "album-digital-2027",
    titulo: "Álbum Digital 2027",
    subtitulo: "Primeira temporada da coleção digital",
    descricao:
      "Acesso pelo site oficial para acompanhar e organizar os ingressos colecionáveis de 2027.",
    imagem: "/loja-solidaria/albuns/album-digital-2027.png",
  },
  {
    id: "album-digital-2028",
    titulo: "Álbum Digital 2028",
    subtitulo: "Segunda temporada da coleção digital",
    descricao:
      "Nova edição anual do álbum digital para os ingressos históricos e colecionáveis de 2028.",
    imagem: "/loja-solidaria/albuns/album-digital-2028.png",
  },
  {
    id: "album-digital-2029",
    titulo: "Álbum Digital 2029",
    subtitulo: "Terceira temporada da coleção digital",
    descricao:
      "Continuação da memória colecionável do Ecossistema Hot Dogueres para 2029.",
    imagem: "/loja-solidaria/albuns/album-digital-2029.png",
  },
];

function CardIngressoHistorico({ ingresso }: { ingresso: IngressoHistorico }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-[2rem] bg-white p-4 shadow-lg ring-1 ring-red-100 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:ring-red-300">
      <div className="absolute right-4 top-4 z-10 rounded-full bg-gray-950 px-3 py-1 text-[10px] font-black uppercase tracking-wide text-white shadow-md">
        Em breve
      </div>

      <div className="relative h-56 overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-red-50 via-yellow-50 to-white shadow-inner">
        <Image
          src={ingresso.imagem}
          alt={ingresso.titulo}
          fill
          sizes="(max-width: 768px) 100vw, 280px"
          className="object-contain p-3 transition duration-300 group-hover:scale-105"
          unoptimized
        />
      </div>

      <p className="mt-4 text-[10px] font-black uppercase tracking-[0.2em] text-red-600">
        {ingresso.categoria}
      </p>

      <h4 className="mt-2 text-lg font-black leading-tight text-gray-950">
        {ingresso.titulo}
      </h4>

      <p className="mt-2 text-sm font-bold leading-relaxed text-gray-600">
        {ingresso.subtitulo}
      </p>

      <div className="mt-4 rounded-2xl bg-yellow-50 p-4 text-center ring-1 ring-yellow-100">
        <p className="text-[10px] font-black uppercase tracking-wide text-yellow-700">
          Ingresso histórico
        </p>

        <p className="mt-1 text-xs font-bold leading-relaxed text-gray-700">
          Após sair do destaque, poderá voltar para coleção com valor progressivo
          e impacto solidário.
        </p>
      </div>
    </article>
  );
}

function BlocoCategoriaIngressos({
  titulo,
  descricao,
  ingressos,
  cor,
}: {
  titulo: string;
  descricao: string;
  ingressos: IngressoHistorico[];
  cor: "red" | "yellow" | "green";
}) {
  const classes = {
    red: {
      etiqueta: "bg-red-600 text-white",
      borda: "ring-red-100",
    },
    yellow: {
      etiqueta: "bg-yellow-400 text-gray-950",
      borda: "ring-yellow-100",
    },
    green: {
      etiqueta: "bg-green-600 text-white",
      borda: "ring-green-100",
    },
  }[cor];

  return (
    <section
      className={`rounded-[2.5rem] bg-white p-5 shadow-xl ring-1 md:p-7 ${classes.borda}`}
    >
      <div className="text-center">
        <p
          className={`inline-flex rounded-full px-5 py-2 text-xs font-black uppercase tracking-[0.2em] shadow-sm ${classes.etiqueta}`}
        >
          {titulo}
        </p>

        <p className="mx-auto mt-4 max-w-3xl text-sm font-bold leading-relaxed text-gray-600">
          {descricao}
        </p>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {ingressos.map((ingresso) => (
          <CardIngressoHistorico key={ingresso.id} ingresso={ingresso} />
        ))}
      </div>
    </section>
  );
}

function CardAlbum({ album }: { album: AlbumHistorico }) {
  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-[2rem] p-4 shadow-lg ring-1 transition duration-300 hover:-translate-y-1 hover:shadow-2xl ${
        album.destaque
          ? "bg-yellow-50 ring-yellow-200 hover:ring-yellow-400"
          : "bg-white ring-purple-100 hover:ring-purple-300"
      }`}
    >
      <div className="absolute right-4 top-4 z-10 rounded-full bg-gray-950 px-3 py-1 text-[10px] font-black uppercase tracking-wide text-white shadow-md">
        Em breve
      </div>

      <div className="relative h-64 overflow-hidden rounded-[1.5rem] bg-white shadow-inner">
        <Image
          src={album.imagem}
          alt={album.titulo}
          fill
          sizes="(max-width: 768px) 100vw, 320px"
          className="object-contain p-4 transition duration-300 group-hover:scale-105"
          unoptimized
        />
      </div>

      <p className="mt-4 text-[10px] font-black uppercase tracking-[0.2em] text-purple-700">
        Álbum Hot Dogueres
      </p>

      <h4 className="mt-2 text-xl font-black leading-tight text-gray-950">
        {album.titulo}
      </h4>

      <p className="mt-2 text-sm font-black text-red-600">{album.subtitulo}</p>

      <p className="mt-3 text-sm font-bold leading-relaxed text-gray-600">
        {album.descricao}
      </p>

      <div className="mt-5 rounded-2xl bg-gray-950 p-4 text-center text-white">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-yellow-300">
          Acesso oficial
        </p>

        <p className="mt-2 text-xs font-bold leading-relaxed text-white/80">
          Pensado para ser acessado pelo site oficial em computador, tablet e
          smartphone.
        </p>
      </div>
    </article>
  );
}

export default function SecaoIngressosHistoricosLojaSolidaria() {
  return (
    <section id="ingressos-historicos" className="px-4 pb-12">
      <div className="mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-[2.5rem] bg-gray-950 p-6 text-center text-white shadow-2xl md:p-10">
          <p className="inline-flex rounded-full bg-yellow-400 px-5 py-2 text-xs font-black uppercase tracking-[0.2em] text-gray-950 shadow-sm">
            Ingressos Históricos
          </p>

          <h2 className="mt-5 text-3xl font-black leading-tight md:text-5xl">
            A coleção continua mesmo depois que o evento termina.
          </h2>

          <p className="mx-auto mt-5 max-w-4xl text-base font-bold leading-relaxed text-white/80 md:text-lg">
            Em breve, os ingressos que já saíram do destaque principal poderão
            voltar para a Loja Solidária como peças históricas colecionáveis.
            Assim, novos participantes poderão completar sua coleção, enquanto
            cada compra continua ajudando a transformar solidariedade em
            alimento.
          </p>

          <div className="mx-auto mt-7 max-w-4xl rounded-[2rem] bg-white/10 p-5 text-left ring-1 ring-white/10">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-yellow-300">
              Aviso em breve
            </p>

            <h3 className="mt-3 text-2xl font-black leading-tight text-white">
              Álbum Hot Dogueres — Memórias que Alimentam
            </h3>

            <p className="mt-3 text-sm font-bold leading-relaxed text-white/75">
              A ideia é reunir os ingressos históricos em uma experiência
              colecionável oficial, acessível pelo site da Hot Dogueres, com
              versões físicas e digitais planejadas por ano.
            </p>
          </div>
        </div>

        <div className="mt-8 space-y-8">
          <BlocoCategoriaIngressos
            titulo="01. Ingressos Eventos"
            descricao="Espaço para 8 modelos históricos de feiras, festivais, corridas, Adventure Race, Pets Day e outros eventos especiais do ecossistema."
            ingressos={INGRESSOS_EVENTOS}
            cor="red"
          />

          <BlocoCategoriaIngressos
            titulo="02. Ingressos Fixos"
            descricao="Espaço para 6 ingressos fixos da coleção anual. Os modelos de 2027 poderão entrar na Loja Solidária em 2028 como itens históricos."
            ingressos={INGRESSOS_FIXOS}
            cor="yellow"
          />

          <BlocoCategoriaIngressos
            titulo="03. Ingressos City Quest"
            descricao="Espaço para os 6 ingressos da jornada City Quest, permitindo que colecionadores completem a sequência mesmo após a saída do destaque principal."
            ingressos={INGRESSOS_CITY_QUEST}
            cor="green"
          />

          <section className="rounded-[2.5rem] bg-white p-5 shadow-xl ring-1 ring-purple-100 md:p-7">
            <div className="text-center">
              <p className="inline-flex rounded-full bg-purple-700 px-5 py-2 text-xs font-black uppercase tracking-[0.2em] text-white shadow-sm">
                04. Álbuns Colecionáveis
              </p>

              <h3 className="mt-4 text-3xl font-black leading-tight text-gray-950 md:text-4xl">
                Hot Dogueres — Memórias que Alimentam
              </h3>

              <p className="mx-auto mt-4 max-w-3xl text-sm font-bold leading-relaxed text-gray-600">
                Uma nova forma de valorizar cada ingresso, organizar a coleção e
                fortalecer a memória solidária do ecossistema ano após ano.
              </p>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {ALBUNS_HOT_DOGUERES.map((album) => (
                <CardAlbum key={album.id} album={album} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
