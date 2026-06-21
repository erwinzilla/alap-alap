<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted, computed } from 'vue'
import { useAppStore } from '@/stores/app.store'
import ModalBase from '@/components/modal/ModalBase.vue'
import BackgroundBase from '@/components/BackgroundBase.vue'
import AnimationShow from '@/components/animation/AnimationShow.vue'
import { useModalStore } from '@/stores/modal.store.ts'

// stores
const { initTheme } = useAppStore()
const modalStore = useModalStore()
const { closeModal } = useModalStore()

// computed
const showModal = computed(() => modalStore.show)

// lifecycle
onMounted(() => {
  initTheme()
})
</script>

<template>
  <background-base>
    <RouterView />

    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center">
      <!-- Backdrop -->
      <div @click="closeModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm"></div>
    </div>

    <animation-show
      :show="showModal"
      custom-class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full md:w-md transition-all duration-150 z-50"
    >
      <modal-base></modal-base>
    </animation-show>
  </background-base>
</template>

<style scoped></style>
