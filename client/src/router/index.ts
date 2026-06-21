import { TokenService } from '@/services/token.service.ts'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: () => import('../views/layout/MainLayout.vue'),
      meta: {
        title: 'Shopee Console',
        public: true,
        onlyWhenLoggedOut: true,
      },
    },
  ],
})

router.beforeEach((to, _, next) => {
  const isPublic = to.matched.some((record) => record.meta.public)
  const onlyWhenLoggedOut = to.matched.some((record) => record.meta.onlyWhenLoggedOut)
  const loggedIn = !!TokenService.getToken()

  if (!isPublic && !loggedIn) {
    return next({
      path: '/welcome',
      query: { redirect: to.fullPath },
    })
  }

  if (loggedIn && onlyWhenLoggedOut) {
    return next('/p/home')
  }

  // title document
  document.title = to.meta.title || import.meta.env.VITE_APP_NAME

  next()
})

export default router
