<script lang="ts" setup>
import { bgColor500p25, heightSize, roundedClass, widthSize } from '@/globals/tailwind.ts'
import type { SizeKey, RoundKey, ColorKey } from '@/types/tailwind'

defineProps<{
  width: SizeKey
  height: SizeKey
  rounded: RoundKey
  color: ColorKey
  customClass?: string
}>()
</script>

<template>
  <div
    class="animate-pulse grow"
    :class="[
      widthSize[width],
      heightSize[height],
      roundedClass[rounded],
      bgColor500p25[color],
      customClass ?? '',
    ]"
  ></div>
</template>

<style scoped></style>
