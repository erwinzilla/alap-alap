<script setup lang="ts">
import SkeletonBase from '@/components/skeleton/SkeletonBase.vue'
import type { SizeKey, TextKey, ColorKey } from '@/types/tailwind'
import { textColor500, textSize } from '@/globals/tailwind.ts'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    loaded?: boolean
    width?: SizeKey
    size?: TextKey
    color?: ColorKey
  }>(),
  {
    loaded: true,
    width: 'full',
    size: 'base',
    color: 'default',
  },
)

const heightSize: Record<TextKey, SizeKey> = {
  xs: '2',
  sm: '4',
  base: '6',
  lg: '8',
  xl: '9',
  '2xl': '10',
  '3xl': '11',
  '4xl': '12',
  '5xl': '14',
  '6xl': '16',
  '7xl': '20',
  '8xl': '24',
  '9xl': '28',
}

const height = computed(() => heightSize[props.size] as SizeKey)
</script>

<template>
  <span v-if="loaded" :class="[textSize[size], textColor500[color]]"><slot></slot></span>
  <skeleton-base v-else :width="width" :height="height" rounded="lg" color="stone"></skeleton-base>
</template>

<style scoped></style>
