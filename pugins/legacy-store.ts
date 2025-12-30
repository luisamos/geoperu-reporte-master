import { defineNuxtPlugin } from "#app";
import {
  loadingActions,
  useLoadingGetters,
  type LoadingPayload,
} from "~/stores/loading";
import { reporteActions, useReporteGetters } from "~/stores/reporte";

export default defineNuxtPlugin((nuxtApp) => {
  const loadingGetters = useLoadingGetters();
  const reporteGetters = useReporteGetters();

  const getters = {
    get "Loading/isLoading"() {
      return loadingGetters.isLoading.value;
    },
    get "Loading/isOverlay"() {
      return loadingGetters.isOverlay.value;
    },
    get "Loading/isNotif"() {
      return loadingGetters.isNotif.value;
    },
    get "Loading/text"() {
      return loadingGetters.text.value;
    },
    get "reporte/results"() {
      return reporteGetters.results.value;
    },
    get "reporte/tipo"() {
      return reporteGetters.tipo.value;
    },
    get "reporte/description"() {
      return reporteGetters.description.value;
    },
    get "reporte/isMancomunidad"() {
      return reporteGetters.isMancomunidad.value;
    },
    get "reporte/isRegion"() {
      return reporteGetters.isRegion.value;
    },
  };

  const actions = {
    "Loading/START": (payload?: LoadingPayload) =>
      loadingActions.start(payload),
    "Loading/STOP": () => loadingActions.stop(),
    "reporte/fetchApi": (codigo: string) =>
      reporteActions.fetchApi(
        typeof codigo === "string" ? codigo : String(codigo ?? "")
      ),
    "reporte/isRegion": (value: boolean) =>
      reporteActions.setIsRegion(Boolean(value)),
    "reporte/isMancomunidad": (value: boolean) =>
      reporteActions.setIsMancomunidad(Boolean(value)),
  };

  const dispatch = (type: keyof typeof actions, payload?: unknown) => {
    const action = actions[type];
    if (!action) {
      console.warn(`[store] Unknown action "${type}"`);
      return Promise.resolve();
    }
    try {
      const result = action(payload as never);
      return result instanceof Promise ? result : Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const store = { getters, dispatch };

  nuxtApp.provide("store", store);
  nuxtApp.vueApp.config.globalProperties.$store = store;
});
