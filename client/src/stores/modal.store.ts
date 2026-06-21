import { defineStore } from 'pinia'
import type { ModalStatus } from '@/types'
import { markRaw, type Component } from 'vue'

let resolver: ((value: boolean) => void) | null = null

export const useModalStore = defineStore('modal', {
  state: () => ({
    show: false as boolean,
    status: 'none' as ModalStatus,
    text: '',
    title: '',
    component: null as Component | null, // Tambahan
    componentProps: {} as Record<string, unknown>,
    isConfirmed: false as boolean,
  }),
  actions: {
    showModal(
      status: ModalStatus | undefined = 'none',
      text: string | undefined = '',
      title: string | undefined = '',
      component: Component | null = null,
      componentProps: Record<string, unknown> = {},
    ) {
      // jika statusnya show hilangkang dahulu
      if (this.show) this.closeModal()

      // atur status
      this.status = status
      this.text = text
      this.title = title
      this.component = component ? markRaw(component) : null
      this.componentProps = componentProps

      // munculkan modal
      this.show = true
    },
    confirmModalWithMessage(text: string, title: string = 'Konfirmasi'): Promise<boolean> {
      this.showModal('confirm', text, title)
      return new Promise((resolve) => {
        resolver = resolve
      })
    },

    confirmModal() {
      this.isConfirmed = true
      this.show = false
      resolver?.(true)
      resolver = null
    },

    cancelModal() {
      this.isConfirmed = false
      this.show = false
      resolver?.(false)
      resolver = null
    },

    closeModal() {
      // set ke default value lagi
      this.status = 'none'
      this.text = ''
      this.title = ''
      this.component = null
      this.componentProps = {}
      this.isConfirmed = false

      // tutup modal
      this.show = false
      resolver = null
    },
  },
})
