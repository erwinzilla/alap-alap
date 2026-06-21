<script setup lang="ts">
import { computed, type Component } from 'vue'
import * as PhosphorIcons from '@phosphor-icons/vue' // Import semua ikon

type PhWeightType = 'bold' | 'fill' | 'thin' | 'light' | 'regular' | 'duotone'

const props = withDefaults(
  defineProps<{
    name: string
    weight?: PhWeightType
    size?: number
  }>(),
  {
    weight: 'duotone',
    size: 24,
  },
)

const phIcon: { [key: string]: string } = {
  'paper-clip': 'paperclip',
  cog: 'gear',
  more: 'dots-three-outline',
  'user-group': 'users',
  'adjustments-vertical': 'faders',
  banknotes: 'hand-coins',
  'arrow-trending-up': 'arrows-down-up',
  scale: 'seal-percent',
  'building-storefront': 'storefront',
  'cursor-arrow-ripple': 'target',
  identification: 'identification-badge',
  'ellipsis-horizontal': 'dots-three',
}

const iconComponent = computed(() => {
  // ambil dari phIcon
  const name = phIcon[props.name] ?? props.name

  // Konversi nama properti ke format yang digunakan oleh Phosphor Icons
  // Misalnya, 'paper-clip' menjadi 'PaperClip'
  const formattedName = name
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')

  const iconKey = `Ph${formattedName}` // Ini mungkin bervariasi tergantung library

  // Pastikan PhosphorIcons memiliki properti tersebut
  return (PhosphorIcons as Record<string, Component>)[iconKey] || null
})
</script>

<template>
  <component :is="iconComponent" :weight="props.weight" v-if="iconComponent" :size="size" />
  <span v-else>Ikon tidak ditemukan</span>
</template>

<style scoped></style>
