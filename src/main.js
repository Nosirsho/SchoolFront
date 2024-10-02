import './assets/main.css'
import { createRouter, createWebHistory } from 'vue-router'
import { createApp } from 'vue'
import App from './App.vue'
import Students from './pages/Students.vue'
import Teachers from './pages/Teachers.vue'

const routes = [
  { path: '/Students', name: 'Students', component: Students },
  { path: '/teachers', name: 'Teachers', component: Teachers }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)

app.use(router)

app.mount('#app')
