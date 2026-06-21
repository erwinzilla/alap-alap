<script setup lang="ts">
withDefaults(
  defineProps<{
    show: boolean
    customClass?: string
  }>(),
  {
    customClass: '',
  },
)
</script>

<template>
  <Transition
    enter-active-class="transition-all duration-150 ease-out"
    enter-from-class="opacity-0 translate-y-2 scale-95"
    enter-to-class="opacity-100 translate-y-0 scale-100"
    leave-active-class="transition-all duration-150 ease-in"
    leave-from-class="opacity-100 translate-y-0 scale-100"
    leave-to-class="opacity-0 translate-y-2 scale-95"
    appear
  >
    <div v-if="show" :class="customClass">
      <slot></slot>
    </div>
  </Transition>
</template>

<style scoped></style>
