<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import type { SizeType } from '@/types/tailwind'
import type { VariantType } from '@/types'

// props & emits
const props = withDefaults(
  defineProps<{
    variant?: VariantType
    size?: SizeType
    outline?: boolean
    loading?: boolean
    disabled?: boolean
    focus?: boolean
  }>(),
  {
    variant: 'primary',
    size: 'md',
    focus: false,
  },
)

// refs
const buttonRef = ref<HTMLButtonElement | null>(null)

// Base styles
const baseClass =
  'inline-flex items-center justify-center font-medium shadow-[inset_0_1px_0_0_hsla(0deg,0%,100%,0.2)] transition-colors duration-150'

// Variants
const variantMap: Record<VariantType, string> = {
  primary:
    'bg-blue-950 dark:bg-stone-200 text-stone-50 dark:text-stone-900 hover:bg-blue-900 hover:dark:bg-stone-50 focus:outline-4 focus:outline-white/25 focus:outline-black/25',
  secondary: 'bg-stone-600 text-white hover:bg-stone-700',
  danger: 'bg-red-600 text-white hover:bg-red-700',
  warning: 'bg-amber-600 text-white hover:bg-amber-700',
  success: 'bg-green-600 text-white hover:bg-green-700',
}

const outlineMap: Record<VariantType, string> = {
  primary: 'border border-rose-400 text-rose-400 bg-transparent hover:bg-rose-50',
  secondary: 'border border-gray-600 text-gray-600 bg-transparent hover:bg-gray-100',
  danger: 'border border-red-600 text-red-600 bg-transparent hover:bg-red-50',
  warning: 'border border-amber-600 text-amber-600 bg-transparent hover:bg-amber-50',
  success: 'border border-green-600 text-green-600 bg-transparent hover:bg-green-50',
}

const variantClass = computed(() =>
  props.outline ? outlineMap[props.variant] : variantMap[props.variant],
)

// Size map
const sizeMap: Record<SizeType, string> = {
  sm: 'text-sm px-3 py-1.5 rounded-lg',
  md: 'text-base px-3 py-2 rounded-xl',
  lg: 'text-lg px-5 py-3.25 rounded-xl',
  xl: 'text-xl px-6 py-3.5 rounded-xl',
}

const sizeClass = computed(() => sizeMap[props.size])
const outlineClass = computed(() => outlineMap[props.variant])

// lifecycle
onMounted(() => {
  if (props.focus && buttonRef.value) {
    buttonRef.value.focus()
  }
})
</script>

<template>
  <button
    ref="buttonRef"
    :class="[
      baseClass,
      variantClass,
      sizeClass,
      outline ? outlineClass : '',
      loading || disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
    ]"
    :disabled="disabled || loading"
  >
    <span
      v-if="loading"
      class="mr-2 animate-spin w-4 h-4 border-2 dark:border-blue-950 border-white border-t-transparent dark:border-t-transparent rounded-full"
    ></span>
    <slot />
  </button>
</template>
