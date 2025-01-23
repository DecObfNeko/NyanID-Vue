import './assets/css/main.css'
import { createApp } from 'vue'

import "tailwindcss";
import "daisyui";

import router from './router'
import App from './App.vue'


const app = createApp(App)

app.use(router)

app.mount('#app')
