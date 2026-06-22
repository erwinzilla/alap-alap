<script setup lang="ts">
import PhIcon from '../PhIcon.vue'
import NavbarStatus from './NavbarStatus.vue'
</script>

<template>
  <!-- ====== NAVBAR ====== -->
  <nav
    class="bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 shadow-sm sticky top-0 z-50"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center gap-3">
          <span class="text-2xl">🦅</span>
          <span class="font-bold text-xl">Shopee Console</span>
          <span
            class="text-xs bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-400 px-2 py-0.5 rounded-full font-medium"
            >Alap Alap</span
          >
        </div>
        <div class="flex items-center gap-4">
          <NavbarStatus></NavbarStatus>
          <a
            href="/auth/shopee"
            class="bg-orange-500 hover:bg-orange-600 text-white dark:text-stone-900 px-4 py-2 rounded-xl text-sm font-medium transition flex items-center gap-2"
          >
            <PhIcon name="plugs"></PhIcon>
            Connect Shopee
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>
