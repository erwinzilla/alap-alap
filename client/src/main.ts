import './assets/base.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// service
import ApiService, { setRouterInstance } from '@/services/api.service'
import { TokenService } from '@/services/token.service'

ApiService.init(import.meta.env.VITE_APP_ROOT_API)

if (TokenService.getToken()) {
  ApiService.setHeader()
  ApiService.mountRequestInterceptor()
  ApiService.mount401Interceptor()
}

setRouterInstance(router)

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
