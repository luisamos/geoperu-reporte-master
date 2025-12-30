import { useNuxtApp, useState } from "#app";
import { computed } from "vue";

export type PresupuestoItem = Record<string, unknown> & { ano_eje?: string };

export interface Ejecutora {
  ubigeo: string;
  nom_prov: string;
  nom_dpto: string;
  nom_dist: string;
  nombre: string;
}

export interface ReporteResults {
  ejecutora: Ejecutora[];
  ejecucion: PresupuestoItem[];
  ejecuciontotal: PresupuestoItem[];
  mef: { fecha: string }[];
  [key: string]: unknown;
}

export interface ReporteState {
  description: string;
  tipo: string;
  isRegion: boolean;
  isMancomunidad: boolean;
  results: ReporteResults;
}

export interface ReporteResponse extends Partial<ReporteState> {
  results?: ReporteResults;
}

const createEmptyResults = (): ReporteResults => ({
  ejecutora: [
    {
      ubigeo: "",
      nom_prov: "",
      nom_dpto: "",
      nom_dist: "",
      nombre: "",
    },
  ],
  ejecucion: [],
  ejecuciontotal: [],
  mef: [{ fecha: "" }],
});

export const useReporteState = () =>
  useState<ReporteState>("reporte", () => ({
    description: "",
    tipo: "",
    isRegion: false,
    isMancomunidad: false,
    results: createEmptyResults(),
  }));

export const useReporteGetters = () => {
  const state = useReporteState();

  return {
    hasResults: computed(() => Boolean(state.value.results?.ejecutora?.length)),
    results: computed(() => state.value.results),
    tipo: computed(() => state.value.tipo),
    description: computed(() => state.value.description),
    isMancomunidad: computed(() => state.value.isMancomunidad),
    isRegion: computed(() => state.value.isRegion),
  };
};

const setResults = (results: ReporteResults | Partial<ReporteResults>) => {
  const state = useReporteState();
  const empty = createEmptyResults();
  state.value.results = {
    ...empty,
    ...results,
    ejecutora:
      results?.ejecutora && results.ejecutora.length > 0
        ? results.ejecutora
        : empty.ejecutora,
    ejecucion: results?.ejecucion ?? empty.ejecucion,
    ejecuciontotal: results?.ejecuciontotal ?? empty.ejecuciontotal,
    mef: results?.mef && results.mef.length > 0 ? results.mef : empty.mef,
  };
};

const setTipo = (tipo: string) => {
  const state = useReporteState();
  state.value.tipo = tipo;
};

const setDescription = (description: string) => {
  const state = useReporteState();
  state.value.description = description;
};

const setIsRegion = (value: boolean) => {
  const state = useReporteState();
  state.value.isRegion = value;
};

const setIsMancomunidad = (value: boolean) => {
  const state = useReporteState();
  state.value.isMancomunidad = value;
};

const reset = () => {
  const state = useReporteState();
  state.value.description = "";
  state.value.tipo = "";
  state.value.isRegion = false;
  state.value.isMancomunidad = false;
  state.value.results = createEmptyResults();
};

const fetchApi = async (codigo: string) => {
  const { $fetch } = useNuxtApp();
  const state = useReporteState();
  try {
    const response = await $fetch<ReporteResponse>(`/api/reporte/${codigo}`);
    if (response) {
      if (response.results) {
        setResults(response.results);
      }
      if (response.tipo) {
        setTipo(response.tipo);
      }
      if (response.description) {
        setDescription(response.description);
      }
      if (typeof response.isRegion === "boolean") {
        setIsRegion(response.isRegion);
      }
      if (typeof response.isMancomunidad === "boolean") {
        setIsMancomunidad(response.isMancomunidad);
      }
    }
    return response;
  } catch (error) {
    if (!state.value.results?.ejecutora?.length) {
      state.value.results = createEmptyResults();
    }
    throw error;
  }
};

export const reporteActions = {
  reset,
  setResults,
  setTipo,
  setDescription,
  setIsRegion,
  setIsMancomunidad,
  fetchApi,
};
