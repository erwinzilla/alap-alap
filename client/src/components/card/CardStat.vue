<script setup lang="ts">
import type { ColorKey } from '@/types/tailwind.js'
import PhIcon from '../PhIcon.vue'
import { textColor500 } from '@/globals/tailwind.ts'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    title: string
    color?: ColorKey
    value?: number | string
    icon?: string
  }>(),
  {
    color: 'blue',
    value: 0,
    icon: 'package',
  },
)

const isValueNumeric = computed<boolean>(() => !isNaN(parseInt(props.value.toString())))
const formatedValue = computed<string>(() => {
  if (isValueNumeric.value) {
    const value = props.value as number
    if (value > 0) return value.toString()
  }

  if (props.value !== '' && props.value !== 0) return props.value.toString()

  return '—'
})
</script>

<template>
  <div
    class="bg-white dark:bg-stone-900 rounded-xl shadow-sm border border-stone-100 dark:border-stone-800 p-5 card-hover"
  >
    <div class="flex items-center justify-between">
      <span class="text-stone-400 text-sm font-medium">{{ title }}</span>
      <PhIcon :name="icon" :class="textColor500[color]"></PhIcon>
    </div>
    <p :class="{ 'text-stone-500': formatedValue == '—' }" class="text-3xl font-bold mt-2">
      {{ formatedValue }}
    </p>
  </div>
</template>
