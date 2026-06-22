<script setup lang="ts">
defineProps<{
  title?: string
  desc?: string
}>()
</script>

<template>
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- === GREETING === -->
    <div v-if="title || desc" class="mb-8 fade-in">
      <h1 v-if="title" class="text-3xl font-bold text-stone-900 dark:text-stone-100">
        {{ title }}
      </h1>
      <p v-if="desc" class="text-stone-500 mt-1">{{ desc }}</p>
    </div>

    <slot></slot>
  </main>
</template>
