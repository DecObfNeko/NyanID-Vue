import LoginView from '@/views/LoginView.vue'
import HomeView from '@/views/HomeView.vue'
import ForGotPwdView from '@/views/ForGotPwdView.vue'
import PrivacyPolicyView from '@/views/PrivacyPolicyView.vue'
import RegisterView from '@/views/RegisterView.vue'
import VerificationView from '@/views/VerificationView.vue'
import UserHomeView from '@/views/UserHomeView.vue'
import TermsOfServiceView from '@/views/TermsOfServiceView.vue'

import { createRouter, createWebHistory } from 'vue-router'
import TeamView from '@/views/TeamView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomeView',
      component : HomeView,
      meta: { transition: 'fade-leave-active' },
    },
    {
      path: '/PrivacyPolicy',
      name: 'PrivacyPolicyView',
      component: PrivacyPolicyView
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
      component: ForGotPwdView,
      meta: { transition: 'fade-leave-active' },
    },
    {
      path: '/register',
      name: 'RegisterView',
      component: RegisterView
    },
    {
      path: '/verification/:token',
      name: 'VerificationView',
      component: VerificationView,
    },
    {
      path: '/user/:uuid',
      name: 'UserHomeView',
      component: UserHomeView,
    },
    {
      path: '/tos',
      name: 'TeamOfServiceView',
      component: TermsOfServiceView,
    },
    {
      path: '/aboutus',
      name: 'TeamView',
      component: TeamView,
    }
  ]
})

export default router
