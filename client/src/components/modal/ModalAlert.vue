<script setup lang="ts">
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
import type { ModalStatus } from '@/types'
import LabelBase from '@/components/label/LabelBase.vue'
import type { ColorKey } from '@/types/tailwind'

// props & emits
defineProps<{
  status: ModalStatus
  title: string
  text: string
}>()

// const
const urlIcon: Record<ModalStatus, string> = {
  success: 'success.lottie',
  error: 'error.lottie',
  none: '',
  confirm: '',
}

const statusColor: Record<ModalStatus, ColorKey> = {
  success: 'green',
  error: 'red',
  none: 'default',
  confirm: 'default',
}
</script>

<template>
  <div class="flex flex-col mb-2 text-center">
    <div class="mx-auto">
      <DotLottieVue
        style="height: 150px; width: 150px"
        autoplay
        :src="'/assets/images/animations/' + urlIcon[status]"
        :speed="2"
      />
    </div>
    <label-base
      v-if="title"
      size="xl"
      :color="statusColor[status]"
      class="block font-semibold uppercase"
    >
      {{ title }}
    </label-base>
    <label-base class="block">{{ text }}</label-base>
  </div>
</template>

<style scoped></style>
