<script setup lang="ts">
import ButtonBase from '@/components/button/ButtonBase.vue'
import PhIcon from '@/components/PhIcon.vue'
import { useModalStore } from '@/stores/modal.store.ts'
import LabelBase from '@/components/label/LabelBase.vue'

// props & emits
defineProps<{
  title: string
  text: string
}>()

// stores
const { confirmModal, cancelModal } = useModalStore()
</script>

<template>
  <div class="p-2">
    <div class="flex gap-4 mb-4">
      <div>
        <ph-icon name="question" :size="64"></ph-icon>
      </div>
      <div>
        <label-base color="stone" size="sm" class="block">{{ title }}</label-base>
        <label-base class="block">{{ text }}</label-base>
      </div>
    </div>

    <div class="flex justify-end gap-2">
      <button-base @click="cancelModal" size="sm" variant="secondary">Cancel</button-base>
      <button-base @click="confirmModal" size="sm" :focus="true">Sure</button-base>
    </div>
  </div>
</template>

<style scoped></style>
