import LoginView from '@/views/LoginView.vue'
import home from '@/views/home.vue'
import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component : home,
      meta: { transition: 'fade-leave-active' },
    },
    {
      path: '/login',
      name: 'LoginView',
      component: LoginView,
      meta: { transition: 'fade-leave-active' },
    },
    {
      path: '/findpwd',
      name: 'ForgotPasswordView',
      component: LoginView
    },
    {
      path: '/register',
      name: 'RegisterView',
      component: LoginView
    }
  ]
})

export default router
