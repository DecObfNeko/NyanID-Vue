import './assets/css/main.css'
import { createApp, onMounted } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import VueCropper from 'vue-cropperjs'
import router from './router'
import App from './App.vue'
import i18n from './utils/index'

const app = createApp(App)

router.beforeEach((to, from, next) => {
  const lang = to.params.lang
  if (lang) {
    if (i18n.global.availableLocales.includes(lang)) {
      i18n.global.locale.value = lang
      next()
    } else {
      next(`/${getDefaultLanguage()}${to.path}`)
    }
  } else {
    next(`/${getDefaultLanguage()}${to.path}`)
  }
})

function getDefaultLanguage() {
  const browserLang = navigator.language.split('-')[0]
  return ['en', 'zh', 'ja', 'ko'].includes(browserLang) ? browserLang : 'zh'
}

app.use(router)
app.use(i18n)
app.use(ElementPlus)
app.component('VueCropper', VueCropper);

app.mount('#app')


