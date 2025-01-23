import './assets/css/main.css'
import { createApp } from 'vue'

<<<<<<< HEAD
import "tailwindcss";
import "daisyui";

import router from './router'
=======
import  './assets/main.css'

>>>>>>> 2728010303035b08f107b292847bcd5a3e1500ae
import App from './App.vue'


const app = createApp(App)

app.use(router)

app.mount('#app')
