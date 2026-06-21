<script setup lang="ts">
import { useAppStore } from '@/stores/app.store.ts'
import { computed } from 'vue'

const appStore = useAppStore()
const showBackground = computed(() => appStore.showBackground)
</script>

<template>
  <div
    :class="
      showBackground
        ? 'min-h-screen bg-stone-100 dark:bg-stone-950 text-amber-950 dark:text-stone-50 transition-colors duration-150'
        : ''
    "
  >
    <slot></slot>
  </div>
</template>

<style scoped></style>
