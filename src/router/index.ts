import HomeView from '@/views/HomeView.vue'
import PrivacyPolicyView from '@/views/stt/PrivacyPolicyView.vue'
import LoginView from '@/views/LoginView.vue'
import ForGotPwdView from '@/views/ForGotPwdView.vue'
import RegisterView from '@/views/RegisterView.vue'
import VerificationView from '@/views/VerificationView.vue'
import UserHomeView from '@/views/UserHomeView.vue'
import UserHomeSettingView from '@/views/UserHomeSettingView.vue'
import TermsOfServiceView from '@/views/stt/TermsOfServiceView.vue'
import McServer from '@/views/mc/McServer.vue'
import TeamView from '@/views/stt/TeamView.vue'
import FightsView from '@/views/mc/FightsView.vue'
import ResetPwd from '@/views/ResetPwd.vue'
import E404 from '@/views/stt/E404.vue'

import { createRouter, createWebHistory } from 'vue-router'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
     {
    path: '/:lang',
    component: { template: '<router-view />' },
    children: [
      {
      path: '',
      name: 'HomeView',
      component : HomeView,
      meta: { transition: 'fade-enter-active' },
    },
    {
      path: 'PrivacyPolicy',
      name: 'PrivacyPolicyView',
      component: PrivacyPolicyView
    },
    {
      path: 'login',
      name: 'LoginView',
      component: LoginView,
      meta: { transition: 'fade-leave-active' },
    },
    {
      path: 'findpwd',
      name: 'ForgotPasswordView',
      component: ForGotPwdView,
      meta: { transition: 'fade-leave-active' },
    },
    {
      path: 'register',
      name: 'RegisterView',
      component: RegisterView,
      meta: { transition: 'fade-leave-active' },
    },
    {
      path: 'verification/:token',
      name: 'VerificationView',
      component: VerificationView,
      meta: { transition: 'fade-leave-active' },
    },
    {
      path: 'user/:uuid',
      name: 'UserHomeView',
      component: UserHomeView,
      meta: { transition: 'fade-leave-active' },
    },
    {
      path: 'user/setting',
      name: 'UserHomeSettingView',
      component: UserHomeSettingView,
      meta: { transition: 'fade-leave-active' },
    },
    {
      path: 'tos',
      name: 'TeamOfServiceView',
      component: TermsOfServiceView,
      meta: { transition: 'fade-leave-active' },
    },
    {
      path: 'server',
      name: 'McServer',
      component: McServer,
      meta: { transition: 'fade-leave-active' },
    },
    {
      path: 'aboutus',
      name: 'TeamView',
      component: TeamView,
      meta: { transition: 'fade-leave-active' },
    },
    {
      path: 'match',
      name: 'FightsView',
      component: FightsView,
    },
    {
      path: 'resetpwd/:email',
      name: 'ResetPwd',
      component: ResetPwd,
      meta: { transition: 'fade-leave-active' },
    },
    {
      path: ":pathMatch(.*)*",
      name: "NotFound",
      component: E404,
    }
    ]
  },
 { 
  path: '/:pathMatch(.*)*', 
  redirect: to => {
    const lang = getDefaultLanguage()
    const originalPath = to.path.startsWith(`/${lang}`) 
      ? to.path 
      : `/${lang}${to.path}`
    return originalPath
  }
}
    
  ]
})
function getDefaultLanguage() {
  const browserLang = navigator.language.split('-')[0]
  return ['en', 'zh', 'ja', 'ko'].includes(browserLang) ? browserLang : 'zh'
}
export default router
