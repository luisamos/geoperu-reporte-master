import { useNuxtApp } from "#app";
import { defineStore } from "pinia";

type PresupuestoItem = Record<string, unknown> & { ano_eje?: string };

interface Ejecutora {
  ubigeo: string;
  nom_prov: string;
  nom_dpto: string;
  nom_dist: string;
  nombre: string;
}

interface ReporteResults {
  ejecutora: Ejecutora[];
  ejecucion: PresupuestoItem[];
  ejecuciontotal: PresupuestoItem[];
  mef: { fecha: string }[];
  [key: string]: unknown;
}

interface ReporteState {
  description: string;
  tipo: string;
  isRegion: boolean;
  isMancomunidad: boolean;
  results: ReporteResults;
}

interface ReporteResponse extends Partial<ReporteState> {
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

export const useReporteStore = defineStore("reporte", {
  state: (): ReporteState => ({
    description: "",
    tipo: "",
    isRegion: false,
    isMancomunidad: false,
    results: createEmptyResults(),
  }),
  getters: {
    hasResults: (state) => Boolean(state.results?.ejecutora?.length),
  },
  actions: {
    reset() {
      this.description = "";
      this.tipo = "";
      this.isRegion = false;
      this.isMancomunidad = false;
      this.results = createEmptyResults();
    },
    setResults(results: ReporteResults | Partial<ReporteResults>) {
      const empty = createEmptyResults();
      this.results = {
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
    },
    setTipo(tipo: string) {
      this.tipo = tipo;
    },
    setDescription(description: string) {
      this.description = description;
    },
    setIsRegion(value: boolean) {
      this.isRegion = value;
    },
    setIsMancomunidad(value: boolean) {
      this.isMancomunidad = value;
    },
    async fetchApi(codigo: string) {
      const { $fetch } = useNuxtApp();
      try {
        const response = await $fetch<ReporteResponse>(
          `/api/reporte/${codigo}`
        );
        if (response) {
          if (response.results) {
            this.setResults(response.results);
          }
          if (response.tipo) {
            this.setTipo(response.tipo);
          }
          if (response.description) {
            this.setDescription(response.description);
          }
          if (typeof response.isRegion === "boolean") {
            this.setIsRegion(response.isRegion);
          }
          if (typeof response.isMancomunidad === "boolean") {
            this.setIsMancomunidad(response.isMancomunidad);
          }
        }
        return response;
      } catch (error) {
        if (!this.results?.ejecutora?.length) {
          this.results = createEmptyResults();
        }
        throw error;
      }
    },
  },
});
