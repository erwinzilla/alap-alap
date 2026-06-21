import { defineStore } from 'pinia'
import { TokenService } from '@/services/token.service.ts'
import type { Stock, User } from '@/types/model'
import type { ThemeKey } from '@/types'

export const useAppStore = defineStore('app', {
  state: () => ({
    theme: 'light' as ThemeKey,
    isLogin: !!TokenService.getToken(),
    user: null as User | null,
    showBackground: true as boolean,
    showSidebar: true as boolean,
    pinnedStock: null as Stock | null,
    loaded: false as boolean,
  }),

  actions: {
    initTheme() {
      const isNotHaveTheme = !localStorage.getItem('theme')
      const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      const isThemeDark = localStorage.getItem('theme') && localStorage.getItem('theme') === 'dark'

      // sidebar
      const isNotHaveSidebar = !localStorage.getItem('sidebar')
      const isShow = this.showSidebar ? 'show' : 'hide'
      if (isNotHaveSidebar) {
        localStorage.setItem('sidebar', isShow)
      } else {
        const sidebarShow = localStorage.getItem('sidebar')
        this.showSidebar = sidebarShow === 'show'
      }

      // Atur tema berdasarkan `localStorage` atau preferensi sistem
      if (isThemeDark || (isNotHaveTheme && isSystemDark)) {
        this.theme = 'dark'
        document.documentElement.classList.add('dark')
        localStorage.setItem('theme', 'dark')
      } else {
        this.theme = 'light'
        document.documentElement.classList.remove('dark')
        localStorage.setItem('theme', 'light')
      }

      // check pinned stock
      const stockId: number = Number(localStorage.getItem('stockId')) ?? 0
      const stockName: string = localStorage.getItem('stockName') ?? ''
      const stockRef: string | null = localStorage.getItem('stockRef') ?? null
      this.pinnedStock = {
        id: stockId,
        name: stockName,
        ref: stockRef,
      }
    },
    toggleTheme() {
      this.theme = this.isDarkMode ? 'light' : 'dark'
      document.documentElement.classList.toggle('dark', this.isDarkMode)
      localStorage.setItem('theme', this.theme)
    },
    loginGoogle() {
      window.location.href =
        'https://erwinzilla.com/api/auth/google/redirect?redirect_uri=https://pos.erwinzilla.com/google/callback'
    },
    setLogin(status: boolean) {
      this.isLogin = status
    },
    setUser(user: User) {
      this.user = user
    },
    setShowBackground(show: boolean = true) {
      this.showBackground = show
    },
    toggleSidebar() {
      // ubah dulu lalu save
      this.showSidebar = !this.showSidebar

      // simpan ke local storage
      const isShow = this.showSidebar ? 'show' : 'hide'
      localStorage.setItem('sidebar', isShow)
    },
    setPinnedStock(stock: Stock) {
      if (this.pinnedStock) {
        if (this.pinnedStock.id === stock.id) {
          this.pinnedStock = null
          localStorage.setItem('stockId', '')
          localStorage.setItem('stockName', '')
          localStorage.setItem('stockRef', '')
        } else {
          this.pinnedStock = stock
          localStorage.setItem('stockId', String(stock.id) ?? 0)
          localStorage.setItem('stockName', stock.name ?? '')
          localStorage.setItem('stockRef', stock.ref ?? '')
        }
      } else {
        this.pinnedStock = stock
        localStorage.setItem('stockId', String(stock.id) ?? 0)
        localStorage.setItem('stockName', stock.name ?? '')
        localStorage.setItem('stockRef', stock.ref ?? '')
      }
    },
    setLoaded(val: boolean) {
      this.loaded = val
    },
  },
  getters: {
    isDarkMode: (state) => state.theme === 'dark',
  },
})
