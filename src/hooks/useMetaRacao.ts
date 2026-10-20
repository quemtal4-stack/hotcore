"use client";

import { useEffect, useState } from "react";

export type MetaRacaoData = {
  meta: {
    racao_kg: number;
    racao_toneladas: number;
  };
  racao: {
    kg: number;
    toneladas: number;
    restantes_kg: number;
    restantes_toneladas: number;
    percentual: number;
  };
  fontes: {
    kits_kg: number;
    outros_kg: number;
  };
  kits: {
    vendidos: number;
  };
  regra: {
    kits_racao: string;
    meta_total: string;
  };
};

export function useMetaRacao() {
  const [data, setData] = useState<MetaRacaoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ativo = true;

    async function carregar() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/metas/racao", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Erro ao carregar meta de ração.");
        }

        const json = await response.json();

        if (ativo) {
          setData(json);
        }
      } catch (erro) {
        if (ativo) {
          setError(
            erro instanceof Error
              ? erro.message
              : "Erro ao carregar meta de ração.",
          );
        }
      } finally {
        if (ativo) {
          setLoading(false);
        }
      }
    }

    carregar();

    return () => {
      ativo = false;
    };
  }, []);

  return {
    data,
    loading,
    error,
  };
}
