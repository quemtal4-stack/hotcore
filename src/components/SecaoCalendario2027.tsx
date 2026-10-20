"use client";

import { useState } from "react";
import Link from "next/link";

type Evento2027Resumo = {
  nome: string;
  detalhe: string;
  quantidade: string;
  cor: string;
};

const EVENTOS_2027_RESUMO: Evento2027Resumo[] = [
  {
    nome: "Hot Dogueres Salva Vidas",
    detalhe: "Gastronomia que Salva",
    quantidade: "5 eventos",
    cor: "bg-red-600 text-white",
  },
  {
    nome: "Hot Dogueres City Quest",
    detalhe: "Experiências urbanas e ações em diferentes cidades",
    quantidade: "5 eventos",
    cor: "bg-blue-700 text-white",
  },
  {
    nome: "Hot Dogueres EcoAção",
    detalhe: "Plantio de árvores, limpeza de praias e ações ambientais",
    quantidade: "3 eventos",
    cor: "bg-green-600 text-white",
  },
  {
    nome: "Hot Dogueres na Escola",
    detalhe: "Horta escolar, educação alimentar e atividades com crianças",
    quantidade: "10 eventos",
    cor: "bg-yellow-400 text-gray-950",
  },
  {
    nome: "Hot Dogueres Horta Medicinal",
    detalhe: "Hortas medicinais em postos de saúde",
    quantidade: "1 evento teste",
    cor: "bg-emerald-700 text-white",
  },
  {
    nome: "Hot Dogueres Community",
    detalhe: "Horta comunitária e fortalecimento de comunidades",
    quantidade: "1 evento teste",
    cor: "bg-lime-600 text-white",
  },
  {
    nome: "Hot Dogueres Corrida do Bem",
    detalhe: "Esporte, solidariedade e arrecadação",
    quantidade: "2 eventos",
    cor: "bg-orange-600 text-white",
  },
  {
    nome: "Feira Hot Dogueres Pets Day",
    detalhe: "Adoção, cuidado animal, ração e comunidade pet",
    quantidade: "1 feira",
    cor: "bg-sky-600 text-white",
  },
  {
    nome: "Hot Dogueres Adventure Race",
    detalhe: "Up & Down Challenge e treino outdoor na natureza",
    quantidade: "1 a 2 eventos",
    cor: "bg-gray-950 text-white",
  },
  {
    nome: "Dia do Herói",
    detalhe: "Homenagem, reconhecimento e solidariedade",
    quantidade: "1 evento",
    cor: "bg-red-700 text-white",
  },
  {
    nome: "Outdoor Adventure Trail Edition",
    detalhe: "Mountain Run e experiência aberta ao público",
    quantidade: "1 evento",
    cor: "bg-stone-700 text-white",
  },
  {
    nome: "Hot Dogueres Day",
    detalhe: "Especial Dia das Crianças",
    quantidade: "1 evento",
    cor: "bg-pink-600 text-white",
  },
  {
    nome: "Feira Hot Dogueres HotCore Tecnologia",
    detalhe: "Tecnologia, inovação, marcas e experiências",
    quantidade: "1 feira",
    cor: "bg-purple-700 text-white",
  },
  {
    nome: "Festival Cultural Hot Dogueres",
    detalhe: "O Maior Hot Dog do Mundo",
    quantidade: "1 festival",
    cor: "bg-yellow-500 text-gray-950",
  },
];

export default function SecaoCalendario2027() {
  const [mostrarTodos, setMostrarTodos] = useState(false);

  const eventosMobile = mostrarTodos
    ? EVENTOS_2027_RESUMO
    : EVENTOS_2027_RESUMO.slice(0, 1);

  return (
    <section id="calendario-2027" className="mt-8">
      <div className="mx-auto max-w-6xl rounded-[2rem] bg-gray-950 p-5 text-white shadow-xl md:p-8">
        <div className="text-center">
          <p className="inline-flex rounded-full bg-yellow-400 px-5 py-2 text-xs font-black uppercase tracking-wide text-gray-950">
            Calendário 2027
          </p>

          <h2 className="mt-4 text-3xl font-black leading-tight md:text-5xl">
            Um ano inteiro de eventos, impacto social e oportunidades para marcas
          </h2>

          <p className="mx-auto mt-4 max-w-4xl text-sm font-bold leading-relaxed text-gray-300 md:text-base">
            O Ecossistema Hot Dogueres está preparando uma agenda com
            aproximadamente 34 eventos em 2027, reunindo gastronomia, esporte,
            cultura, educação, meio ambiente, tecnologia, proteção animal e ações
            solidárias.
          </p>
        </div>

        <div className="mt-7 grid gap-4 md:grid-cols-3">
          <div className="rounded-[1.5rem] bg-white p-5 text-center text-gray-950 shadow-md">
            <p className="text-[10px] font-black uppercase tracking-wide text-gray-500">
              Previsão para 2027
            </p>

            <p className="mt-2 text-5xl font-black text-red-600">34</p>

            <p className="mt-1 text-sm font-black uppercase text-gray-700">
              eventos, feiras e festivais
            </p>
          </div>

          <div className="rounded-[1.5rem] bg-yellow-400 p-5 text-center text-gray-950 shadow-md">
            <p className="text-[10px] font-black uppercase tracking-wide text-gray-700">
              Frentes de atuação
            </p>

            <p className="mt-2 text-5xl font-black">14+</p>

            <p className="mt-1 text-sm font-black uppercase">
              projetos e formatos especiais
            </p>
          </div>

          <div className="rounded-[1.5rem] bg-green-600 p-5 text-center text-white shadow-md">
            <p className="text-[10px] font-black uppercase tracking-wide text-green-100">
              Ciclo completo
            </p>

            <p className="mt-2 text-5xl font-black">35</p>

            <p className="mt-1 text-sm font-black uppercase">
              ações contando dezembro de 2026
            </p>
          </div>
        </div>

        <div className="mt-7 rounded-[1.5rem] bg-white/10 p-5 ring-1 ring-white/10">
          {/* Mobile: controla exibição via estado */}
          <div className="grid gap-4 md:hidden">
            {eventosMobile.map((evento) => (
              <article
                key={evento.nome}
                className="rounded-[1.3rem] bg-white p-4 text-gray-950 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
              >
                <p
                  className={`inline-flex rounded-full px-4 py-2 text-[10px] font-black uppercase tracking-wide ${evento.cor}`}
                >
                  {evento.quantidade}
                </p>

                <h3 className="mt-4 text-xl font-black leading-tight">
                  {evento.nome}
                </h3>

                <p className="mt-2 text-sm font-bold leading-relaxed text-gray-600">
                  {evento.detalhe}
                </p>
              </article>
            ))}

            <button
              type="button"
              onClick={() => setMostrarTodos((atual) => !atual)}
              className="rounded-full bg-yellow-400 px-6 py-3 text-sm font-black uppercase tracking-wide text-gray-950 shadow-md transition hover:bg-yellow-500"
            >
              {mostrarTodos
                ? "Ver menos"
                : `Ver os outros ${EVENTOS_2027_RESUMO.length - 1} eventos`}
            </button>
          </div>

          {/* Desktop/tablet: todos os cards sempre visíveis */}
          <div className="hidden gap-4 md:grid md:grid-cols-2 xl:grid-cols-3">
            {EVENTOS_2027_RESUMO.map((evento) => (
              <article
                key={evento.nome}
                className="rounded-[1.3rem] bg-white p-4 text-gray-950 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
              >
                <p
                  className={`inline-flex rounded-full px-4 py-2 text-[10px] font-black uppercase tracking-wide ${evento.cor}`}
                >
                  {evento.quantidade}
                </p>

                <h3 className="mt-4 text-xl font-black leading-tight">
                  {evento.nome}
                </h3>

                <p className="mt-2 text-sm font-bold leading-relaxed text-gray-600">
                  {evento.detalhe}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-7 grid gap-4 lg:grid-cols-[1fr_0.7fr] lg:items-center">
          <div className="rounded-[1.5rem] bg-white p-5 text-gray-950 shadow-md">
            <p className="text-xs font-black uppercase tracking-wide text-red-600">
              Para empresas parceiras
            </p>

            <h3 className="mt-2 text-2xl font-black leading-tight">
              Sua marca presente em uma agenda anual de impacto
            </h3>

            <p className="mt-3 text-sm font-bold leading-relaxed text-gray-700">
              Empresas parceiras poderão participar de uma jornada com divulgação
              em eventos, camisas oficiais, redes sociais, materiais impressos,
              ações presenciais e campanhas solidárias ao longo de 2027.
            </p>
          </div>

          <div className="grid gap-3">
            <Link
              href="/parceiros-empresas#fazer-parte"
              className="flex justify-center rounded-full bg-yellow-400 px-6 py-4 text-sm font-black uppercase tracking-wide text-gray-950 shadow-lg transition hover:bg-yellow-500"
            >
              Quero minha empresa no calendário
            </Link>

            <Link
              href="#ingressos"
              className="flex justify-center rounded-full border border-white/30 bg-white/10 px-6 py-4 text-sm font-black uppercase tracking-wide text-white shadow-sm transition hover:bg-white/20"
            >
              Ver primeiros ingressos
            </Link>
          </div>
        </div>

        <p className="mt-5 text-center text-xs font-bold leading-relaxed text-gray-400">
          Calendário em desenvolvimento. A quantidade de eventos poderá ser
          ajustada conforme autorizações, vendas, patrocínios, estrutura
          operacional e confirmação dos parceiros.
        </p>
      </div>
    </section>
  );
}
