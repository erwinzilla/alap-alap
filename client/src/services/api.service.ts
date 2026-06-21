import axios, { type AxiosResponse, type InternalAxiosRequestConfig, type AxiosError } from 'axios'
import { useAuthStore } from '@/stores/auth.store.ts'
import { useModalStore } from '@/stores/modal.store.ts'
import { TokenService } from '@/services/token.service.ts'
import type { AxiosRequestConfig } from 'axios'
import type { ModalStatus } from '@/types'

interface ErrorMessage {
  error: ModalStatus
  error_description: string
  message?: string
}

let routerInstance: ReturnType<(typeof import('vue-router'))['useRouter']> | null = null

export function setRouterInstance(router: typeof routerInstance) {
  routerInstance = router
}

const ApiService = {
  _requestInterceptor: 0,
  _401interceptor: 0,

  init(baseURL: string | undefined) {
    axios.defaults.baseURL = baseURL
  },

  setHeader() {
    axios.defaults.headers.common['Authorization'] = `Bearer ${TokenService.getToken()}`
  },

  removeHeader() {
    axios.defaults.headers.common = {}
  },

  get(resource: string) {
    return axios.get(resource)
  },

  post(resource: string, data: unknown) {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
    return axios.post(resource, data, config)
  },

  put(resource: string, data: unknown) {
    return axios.put(resource, data)
  },

  delete(resource: string) {
    return axios.delete(resource)
  },

  customRequest(data: AxiosRequestConfig) {
    return axios(data)
  },

  mountRequestInterceptor() {
    this._requestInterceptor = axios.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        return config
      },
    )
  },

  mount401Interceptor() {
    this._401interceptor = axios.interceptors.response.use(
      async (response: AxiosResponse) => response,
      async (error: AxiosError) => {
        const authStore = useAuthStore()

        if (error.request.status === 401) {
          console.log(error)
          if (error.config) {
            authStore.signOut()
            await routerInstance?.push({ path: '/welcome' })
            throw error
          }
        }

        // forbiden
        if (error.request.status === 403) {
          const { showModal } = useModalStore()

          // atur untuk modal
          const errRespData = error.response?.data as ErrorMessage
          const status = errRespData.error
          const message = errRespData.error_description
          showModal(status, message)
        }

        // server error
        if (error.request.status === 500) {
          const { showModal } = useModalStore()

          const errRespData = error.response?.data as ErrorMessage
          const message = errRespData.message
          showModal(
            'error',
            'Ada masalah dengan server, silahkan hubungin team IT anda untuk mengecek masalah server ini.\n[' +
              message +
              ']',
          )
        }
        throw error
      },
    )
  },

  unmount401Interceptor() {
    axios.interceptors.response.eject(this._401interceptor)
  },
}

export default ApiService
