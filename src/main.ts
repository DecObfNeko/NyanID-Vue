import './assets/css/main.css'
import { createApp, onMounted } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import VueCropper from 'vue-cropperjs'
import router from './router'
import App from './App.vue'
import i18n from './utils/index'

const app = createApp(App)

type SupportedLocale = 'en' | 'zh' | 'ja' | 'ko';

import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import { isSupportedLocale } from './utils/typeGuards'
// 增强的重定向方法
const redirectWithLocale = (to: RouteLocationNormalized, next: NavigationGuardNext) => {
  const defaultLang = getDefaultLanguage()
  const cleanPath = to.path.replace(/^\/+/, '') // 去除前导斜杠
  const targetPath = cleanPath ? `/${defaultLang}/${cleanPath}` : `/${defaultLang}/`
  
  // 避免重复添加语言前缀
  next(targetPath.replace(/\/+/g, '/'))
}

router.beforeEach(async (to: RouteLocationNormalized, from, next) => {
  try {
    const rawLang = to.params.lang
    const lang = Array.isArray(rawLang) ? rawLang[0] : rawLang || ''

    // 处理无语言参数的情况
    if (!lang) return redirectWithLocale(to, next)

    // 类型安全验证
    if (isSupportedLocale(lang)) {
      // 同步i18n语言状态
      if (i18n.global.locale.value !== lang) {
        i18n.global.locale.value = lang as typeof i18n.global.locale.value
      }
      return next()
    }

    // 无效语言处理
    return redirectWithLocale(to, next)
  } catch (error) {
    console.error('路由守卫错误:', error)
    next('/') // 安全回退
  }
})

// 独立工具函数
function getDefaultLanguage(): SupportedLocale {
  const browserLang = navigator.language.split('-')[0]
  const supported: SupportedLocale[] = ['en', 'zh', 'ja', 'ko']
  return supported.includes(browserLang as any) ? browserLang as SupportedLocale : 'zh'
}


app.use(router)
app.use(i18n)
app.use(ElementPlus)
app.component('VueCropper', VueCropper);

app.mount('#app')


