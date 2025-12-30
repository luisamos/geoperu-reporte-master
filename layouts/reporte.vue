<template>
  <div>
    <LoadingOverlay
      v-if="$store.getters['Loading/isOverlay']"
      v-show="$store.getters['Loading/isLoading']"
      :label="$store.getters['Loading/text']"
    />
    <LoadingNotif
      v-if="$store.getters['Loading/isNotif']"
      v-show="$store.getters['Loading/isLoading']"
      :label="$store.getters['Loading/text']"
    />
    <ClientOnly>
      <AppState />
    </ClientOnly>
    <NuxtPage />
  </div>
</template>

<script setup>
import AppState from "~/components/AppState.vue";
import LoadingOverlay from "~/components/LoadingOverlay.vue";
import LoadingNotif from "~/components/LoadingNotif.vue";

const { $store } = useNuxtApp();
</script>

<style>
@media print {
  .no-print {
    visibility: hidden !important;
  }

  .no-print * {
    visibility: hidden !important;
  }

  img {
    -webkit-print-color-adjust: exact;
  }
}
</style>
