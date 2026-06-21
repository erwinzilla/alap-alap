<script lang="ts" setup>
import ButtonBase from '@/components/button/ButtonBase.vue'
import { useModalStore } from '@/stores/modal.store.ts'
import { computed } from 'vue'
import type { ModalStatus } from '@/types'
import ModalConfirm from '@/components/modal/ModalConfirm.vue'
import ModalComponent from '@/components/modal/ModalComponent.vue'
import ModalHeader from '@/components/modal/ModalHeader.vue'
import ModalAlert from '@/components/modal/ModalAlert.vue'

// stores
const { closeModal } = useModalStore()
const modalStore = useModalStore()

// computed
const status = computed(() => modalStore.status)
const text = computed(() => modalStore.text)
const title = computed(() => modalStore.title)
const component = computed(() => modalStore.component)
const componentProps = computed(() => modalStore.componentProps)
const titleText = computed(() => title.value || statusText[status.value])

const statusText: Record<ModalStatus, string> = {
  success: 'Success',
  error: 'Error',
  none: '',
  confirm: '',
}
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center">
    <!-- Modal content -->
    <div
      class="z-50 bg-glass p-2 mx-1 md:mx-auto text-black dark:text-white rounded-2xl shadow-xl max-w-full md:max-w-md w-full transition-colors duration-150"
    >
      <modal-alert
        v-if="status === 'success' || status === 'error'"
        :status="status"
        :title="titleText"
        :text="text"
      ></modal-alert>
      <modal-header v-else-if="status === 'none'" :title="titleText" :text="text"></modal-header>

      <modal-component v-if="component">
        <component :is="component" v-bind="componentProps" />
      </modal-component>

      <modal-confirm v-if="status === 'confirm'" :title="titleText" :text="text"></modal-confirm>

      <div v-if="status === 'success' || status === 'error'" class="mt-4 text-right">
        <button-base @click="closeModal" size="sm" :focus="true">Close</button-base>
      </div>
    </div>
  </div>
</template>
