import './assets/main.css'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router/index.js'



const app = createApp(App)
const pinia = createPinia()

app.use(autoAnimatePlugin)
app.use(pinia)
app.use(router)

app.mount('#app')
