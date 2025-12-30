<template>
  <div class="placeholder sectionv">
    <slot />
    <span class="sr-only">SectionV component</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  borderStyle: { type: Array, default: undefined },
  padding: { type: Array, default: undefined },
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
