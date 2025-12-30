<script setup lang="ts">
definePageMeta({
  middleware: (to) => {
    return navigateTo(`/reporte/${to.params.id}`);
  },
});
</script>

<template>
  <div />
</template>
