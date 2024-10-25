import './assets/main.css'
import { createRouter, createWebHistory } from 'vue-router'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'

import TeacherPage from './pages/TeacherPage.vue'
import StudentPage from './pages/StudentPage.vue'

const routes = [
  { path: '/students', name: 'StudentPage', component: StudentPage },
  { path: '/teachers', name: 'TeacherPage', component: TeacherPage }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})
const app = createApp(App)
const pinia = createPinia()

app.use(autoAnimatePlugin)
app.use(pinia)
app.use(router)

app.mount('#app')
