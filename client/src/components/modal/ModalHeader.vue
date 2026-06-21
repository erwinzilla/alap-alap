<script setup lang="ts">
import PhIcon from '@/components/PhIcon.vue'
import { useModalStore } from '@/stores/modal.store.ts'

// props & emits
defineProps<{
  title: string
  text: string
}>()

// stores
const { closeModal } = useModalStore()
</script>

<template>
  <div class="flex justify-between">
    <div class="self-center">
      <span class="block text-stone-500 text-xs capitalize">{{ title }}</span>
      <span class="block uppercase font-bold">{{ text }}</span>
    </div>
    <div @click="closeModal" class="text-red-500 cursor-pointer">
      <ph-icon name="x-circle"></ph-icon>
    </div>
  </div>
</template>

<style scoped></style>
