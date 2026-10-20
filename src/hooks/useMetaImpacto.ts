"use client";

import { useEffect, useState } from "react";

type MetaImpacto = {
  meta: {
    ingressos: number;
    alimentos_kg: number;
    alimentos_toneladas: number;
  };
  ingressos: {
    vendidos: number;
    comuns: number;
    eternizados: number;
    restantes: number;
    percentual: number;
  };
  alimentos: {
    kg: number;
    toneladas: number;
    restantes_kg: number;
    restantes_toneladas: number;
    percentual: number;
  };
  fontes: {
    ingressos_kg: number;
    kits_kg: number;
    membros_kg: number;
    outros_kg: number;
  };
  regra: {
    ingressos_comuns: string;
    ingressos_eternizados: string;
    clube_apoiador: string;
    clube_fundador: string;
    clube_eternizado: string;
    meta_total: string;
  };
};

type EstadoMetaImpacto = {
  data: MetaImpacto | null;
  loading: boolean;
  error: string | null;
};

export function useMetaImpacto() {
  const [estado, setEstado] = useState<EstadoMetaImpacto>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();
    let montado = true;

    async function carregarMeta() {
      try {
        if (montado) {
          setEstado((estadoAtual) => ({
            ...estadoAtual,
            loading: true,
            error: null,
          }));
        }

        const resposta = await fetch("/api/metas/impacto", {
          method: "GET",
          cache: "no-store",
          signal: controller.signal,
        });

        if (!resposta.ok) {
          throw new Error("Erro ao carregar a meta de impacto.");
        }

        const json = (await resposta.json()) as MetaImpacto;

        if (montado) {
          setEstado({
            data: json,
            loading: false,
            error: null,
          });
        }
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }

        if (montado) {
          setEstado({
            data: null,
            loading: false,
            error:
              error instanceof Error
                ? error.message
                : "Erro desconhecido ao carregar a meta.",
          });
        }
      }
    }

    carregarMeta();

    return () => {
      montado = false;
      controller.abort();
    };
  }, []);

  return estado;
}
