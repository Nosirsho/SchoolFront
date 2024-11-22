<script setup>
import { ref, onMounted } from 'vue'

import { useScheduleStore } from '@/stores/ScheduleStore.js'

import GradeItem from '&/Schedule/GradeItem.vue'

const scheduleStore = useScheduleStore()

const data = ref([])
const gradeSearch = ref([])
data.value = scheduleStore.data

onMounted(async () => {
  await scheduleStore.getSchedules()
  data.value = scheduleStore.data
})
const sendScheduleList = () => {
  scheduleStore.addScheduleList()
}

const filterByGradeLevel = () => {
  data.value = scheduleStore.filterByGradeLevel(gradeSearch.value)
}
</script>
<template>
  <div class="flex flex-row">
    <div class="basis-1/2">
      <div class="relative">
        <div class="absolute inset-y-0 start-5 flex items-center ps-3 pointer-events-none">
          <svg
            class="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          @input="filterByGradeLevel"
          v-model="gradeSearch"
          type="search"
          class="block ps-8 mt-2 ml-5 py-1 px-4 mr-7 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
          placeholder="Search"
        />
      </div>
    </div>
    <div class="basis-1/2">
      <div class="flex justify-end">
        <button
          class="bg-green-600 border border-green-900 hover:bg-green-700 text-white mt-2 py-1 px-4 mr-7 rounded-lg text-sm"
          @click="sendScheduleList"
        >
          Отправить
        </button>
      </div>
    </div>
  </div>
  <div class="container px-4 py-4 mx-auto">
    <div class="grid grid-cols-12 gap-2">
      <GradeItem
        v-for="(item, index) in data"
        :key="index"
        :gradeLevel="item.gradeLevel"
        :dayLessons="item.dayLessons"
      />
    </div>
  </div>
</template>
