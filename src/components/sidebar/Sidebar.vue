<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref } from 'vue'
import SidebarItem from './SidebarItem.vue'

const sidebarOpen = ref(false)
const sidebarData = ref([
  {
    title: 'Справочник',
    iconSrc: '/src/assets/png/book.png',
    child: [
      {
        title: 'Класс',
        iconSrc: '/src/assets/png/gradelevel.png',
        href: '/gradelevels',
        isOpen: false
      },
      {
        title: 'Предмет',
        iconSrc: '/src/assets/png/lesson.png',
        href: '/lessons',
        isOpen: false
      }
    ]
  },
  {
    title: 'Педагоги',
    iconSrc: '/src/assets/png/teacher.png',
    href: '/teachers'
  },
  {
    title: 'Студенты',
    iconSrc: '/src/assets/png/student.png',
    href: '/students'
  },
  {
    title: 'Родители',
    iconSrc: '/src/assets/png/parent.png',
    href: '/parents'
  },
  {
    title: 'Расписание',
    iconSrc: '/src/assets/png/schedules.png',
    href: '/schedules'
  },
  {
    title: 'Журнал',
    iconSrc: '/src/assets/png/gradebook.png',
    href: '/gradebooks'
  },
  {
    title: 'Сервис уведомления',
    iconSrc: '/src/assets/png/gradebook.png',
    href: '/notificationsender'
  },
  {
    title: 'Настройки',
    iconSrc: '/src/assets/png/setting.png',
    child: [
      {
        title: 'Системные настройки',
        iconSrc: '/src/assets/png/syssettings.png',
        href: '/syssettings',
        isOpen: false
      }
    ]
  }
])
const onBestClick = (item) => {
  const index = sidebarData.value.findIndex((t) => t.title === item)
  sidebarData.value[index].child.forEach((element) => {
    element.isOpen = !element.isOpen
  })
  sidebarData.value[index].isOpen = !sidebarData.value[index].isOpen
}
</script>
<template>
  <div
    :class="sidebarOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'"
    class="fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-gray-900 lg:translate-x-0 lg:static lg:inset-0"
  >
    <div class="flex items-center justify-center mt-8">
      <div class="flex items-center">
        <svg class="w-12 h-12" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M364.61 390.213C304.625 450.196 207.37 450.196 147.386 390.213C117.394 360.22 102.398 320.911 102.398 281.6C102.398 242.291 117.394 202.981 147.386 172.989C147.386 230.4 153.6 281.6 230.4 307.2C230.4 256 256 102.4 294.4 76.7999C320 128 334.618 142.997 364.608 172.989C394.601 202.981 409.597 242.291 409.597 281.6C409.597 320.911 394.601 360.22 364.61 390.213Z"
            fill="#4C51BF"
            stroke="#4C51BF"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M201.694 387.105C231.686 417.098 280.312 417.098 310.305 387.105C325.301 372.109 332.8 352.456 332.8 332.8C332.8 313.144 325.301 293.491 310.305 278.495C295.309 263.498 288 256 275.2 230.4C256 243.2 243.201 320 243.201 345.6C201.694 345.6 179.2 332.8 179.2 332.8C179.2 352.456 186.698 372.109 201.694 387.105Z"
            fill="white"
          ></path>
        </svg>

        <span class="mx-2 text-2xl font-semibold text-white">Dashboard</span>
      </div>
    </div>

    <nav class="mt-10">
      <div v-for="(item, index) in sidebarData" :key="index">
        <div>
          <RouterLink v-if="item.href" :to="item.href">
            <SidebarItem :title="item.title" :imgSrc="item.iconSrc" />
          </RouterLink>
          <SidebarItem
            @click="onBestClick(item.title)"
            v-else
            :title="item.title"
            :imgSrc="item.iconSrc"
            :is-group="true"
            :is-open="item.isOpen"
          />
        </div>

        <div class="pl-4 bg-gray-800" v-if="item.child">
          <div v-for="(subItem, index) in item.child" :key="index">
            <RouterLink :to="subItem.href">
              <SidebarItem v-if="subItem.isOpen" :title="subItem.title" :imgSrc="subItem.iconSrc" />
            </RouterLink>
          </div>
        </div>
      </div>

      <!-- <RouterLink to="/students">
        <SidebarItem title="Students" />
      </RouterLink>

      <RouterLink to="/teachers">
        <SidebarItem title="Teachers" />
      </RouterLink>
      <RouterLink to="/schedules">
        <SidebarItem title="Schedules" />
      </RouterLink>
      <RouterLink to="/gradebooks">
        <SidebarItem title="GradeBook" />
      </RouterLink>
      <RouterLink to="/syssettings">
        <SidebarItem title="SysSetting" />
      </RouterLink>
      <RouterLink to="/parents">
        <SidebarItem title="Parent" />
      </RouterLink>
      <RouterLink to="/gradelevels">
        <SidebarItem title="GradeLevel" />
      </RouterLink> -->
    </nav>
  </div>
</template>
