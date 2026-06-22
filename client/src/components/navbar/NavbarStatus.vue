<script setup lang="ts">
import { useAppStore } from '@/stores/app.store'
import { computed } from 'vue'

const appStore = useAppStore()

// getter
const isLogin = computed(() => appStore.isLogin)
</script>

<template>
  <span
    id="statusBadge"
    :class="[
      isLogin
        ? 'bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-400'
        : 'bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-400',
    ]"
    class="flex items-center gap-2 text-sm px-3 py-1.5 rounded-full"
  >
    <span
      :class="isLogin ? 'bg-green-500' : 'bg-stone-500'"
      class="status-dot inline-block w-2 h-2 rounded-full"
    ></span>
    <span id="statusText">{{ isLogin ? 'Online' : 'Offline' }}</span>
  </span>
</template>

<style scoped>
@keyframes pulse-dot {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(0.8);
  }
}

.status-dot {
  animation: pulse-dot 1.5s ease-in-out infinite;
}
</style>
