import { computed } from "vue";
import { useState } from "#app";

export type LoadingMode = "Overlay" | "Notif";

export interface LoadingPayload {
  tipo?: LoadingMode;
  text?: string;
}

interface LoadingState {
  isLoading: boolean;
  mode: LoadingMode | null;
  text: string;
}

export const useLoadingState = () =>
  useState<LoadingState>("loading", () => ({
    isLoading: false,
    mode: null,
    text: "",
  }));

export const useLoadingGetters = () => {
  const state = useLoadingState();

  return {
    isLoading: computed(() => state.value.isLoading),
    isOverlay: computed(
      () => state.value.isLoading && state.value.mode === "Overlay"
    ),
    isNotif: computed(
      () => state.value.isLoading && state.value.mode === "Notif"
    ),
    text: computed(() => state.value.text),
  };
};

export const loadingActions = {
  start(payload: LoadingPayload = {}) {
    const state = useLoadingState();
    state.value.mode = payload.tipo ?? "Overlay";
    state.value.text = payload.text ?? "";
    state.value.isLoading = true;
  },
  stop() {
    const state = useLoadingState();
    state.value.isLoading = false;
    state.value.mode = null;
    state.value.text = "";
  },
};
