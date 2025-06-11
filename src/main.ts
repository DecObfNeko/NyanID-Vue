import './assets/css/app.css'
import { createApp, onMounted } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import VueCropper from 'vue-cropperjs'
import router from './router'
import App from './App.vue'
import i18n from './utils/index'

const app = createApp(App)

app.use(router)
app.use(i18n)
app.use(ElementPlus)
app.component('VueCropper', VueCropper);

app.mount('#app')


