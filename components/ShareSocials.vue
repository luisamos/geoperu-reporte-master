<template>
  <div class="placeholder sharesocials">
    <slot />
    <span class="sr-only">ShareSocials component</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  url: { type: String, default: undefined },
  description: { type: String, default: undefined },
});
</script>

<style scoped>
.placeholder {
  min-height: 1px;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
