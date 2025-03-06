import './assets/main.css'
import { createRouter, createWebHistory } from 'vue-router'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'

import TeacherPage from './pages/TeacherPage.vue'
import StudentPage from './pages/StudentPage.vue'
import SchedulePage from '@/pages/SchedulePage.vue'
import GradeBookPage from './pages/GradeBookPage.vue'
import SysSettingPage from './pages/SysSettingPage.vue'
import ParentPage from './pages/ParentPage.vue'

const routes = [
  { path: '/students', name: 'StudentPage', component: StudentPage },
  { path: '/teachers', name: 'TeacherPage', component: TeacherPage },
  { path: '/schedules', name: 'SchedulePage', component: SchedulePage },
  { path: '/gradebooks', name: 'GradeBookPage', component: GradeBookPage },
  { path: '/syssettings', name: 'SysSettingPage', component: SysSettingPage },
  { path: '/parents', name: 'ParentPage', component: ParentPage },
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
