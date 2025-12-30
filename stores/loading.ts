import { defineStore } from "pinia";

type LoadingMode = "Overlay" | "Notif";

interface LoadingPayload {
  tipo?: LoadingMode;
  text?: string;
}

export const useLoadingStore = defineStore("loading", {
  state: () => ({
    isLoading: false,
    mode: null as LoadingMode | null,
    text: "",
  }),
  getters: {
    isOverlay: (state) => state.isLoading && state.mode === "Overlay",
    isNotif: (state) => state.isLoading && state.mode === "Notif",
  },
  actions: {
    start(payload: LoadingPayload = {}) {
      this.mode = payload.tipo ?? "Overlay";
      this.text = payload.text ?? "";
      this.isLoading = true;
    },
    stop() {
      this.isLoading = false;
      this.mode = null;
      this.text = "";
    },
  },
});
