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
import FightsView from '@/views/FightsView.vue'
import McServer from '@/views/McServer.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomeView',
      component : HomeView,
      meta: { transition: 'fade-enter-active' },
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
      component: RegisterView,
      meta: { transition: 'fade-leave-active' },
    },
    {
      path: '/verification/:token',
      name: 'VerificationView',
      component: VerificationView,
      meta: { transition: 'fade-leave-active' },
    },
    {
      path: '/user/:uuid',
      name: 'UserHomeView',
      component: UserHomeView,
      meta: { transition: 'fade-leave-active' },
    },
    {
      path: '/tos',
      name: 'TeamOfServiceView',
      component: TermsOfServiceView,
      meta: { transition: 'fade-leave-active' },
    },
    {
      path: '/server',
      name: 'McServer',
      component: McServer,
      meta: { transition: 'fade-leave-active' },
    },
    {
      path: '/aboutus',
      name: 'TeamView',
      component: TeamView,
      meta: { transition: 'fade-leave-active' },
    },
    {
      path: '/match',
      name: 'FightsView',
      component: FightsView,
    }
  ]
})

export default router
