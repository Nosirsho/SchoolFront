import { createRouter, createWebHistory } from 'vue-router'

import TeacherPage from '@/pages/TeacherPage.vue'
import StudentPage from '@/pages/StudentPage.vue'
import SchedulePage from '@/pages/SchedulePage.vue'
import GradeBookPage from '@/pages/GradeBookPage.vue'
import SysSettingPage from '@/pages/SysSettingPage.vue'
import ParentPage from '@/pages/ParentPage.vue'
import GradeLevelPage from '@/pages/GradeLevelPage.vue'
import LessonPage from '@/pages/LessonPage.vue'
import NotificationSenderPage from '@/pages/NotificationSenderPage.vue'
import LoginPage from '@/pages/LoginPage.vue'

const routes = [
  { path: '/students', name: 'StudentPage', component: StudentPage },
  { path: '/teachers', name: 'TeacherPage', component: TeacherPage },
  { path: '/schedules', name: 'SchedulePage', component: SchedulePage },
  { path: '/gradebooks', name: 'GradeBookPage', component: GradeBookPage },
  { path: '/syssettings', name: 'SysSettingPage', component: SysSettingPage },
  { path: '/parents', name: 'ParentPage', component: ParentPage },
  { path: '/gradelevels', name: 'GradeLevelPage', component: GradeLevelPage },
  { path: '/lessons', name: 'LessonPage', component: LessonPage },
  {
    path: '/notificationsender',
    name: 'NotificationSenderPage',
    component: NotificationSenderPage
  },
  { path: '/login', name: 'LoginPage', component: LoginPage }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router
