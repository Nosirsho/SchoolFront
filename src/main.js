import './assets/main.css'
import { createRouter, createWebHistory } from 'vue-router'
import { createApp } from 'vue'
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

app.use(router)

app.mount('#app')
