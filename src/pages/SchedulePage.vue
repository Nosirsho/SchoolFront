<script setup>
import { ref, onMounted } from 'vue'

import { useScheduleStore } from '@/stores/ScheduleStore.js'

import GradeItem from '&/Schedule/GradeItem.vue'

const scheduleStore = useScheduleStore()

const data = ref([])
data.value = scheduleStore.data

onMounted(async () => {
  await scheduleStore.getSchedules()
  data.value = scheduleStore.data
})
</script>
<template>
  <div class="grid justify-items-end">
    <button
      class="bg-green-600 border border-green-900 hover:bg-green-700 text-white mt-2 py-1 px-4 mr-7 rounded-lg text-sm"
      @click="addLesson"
    >
      Отправить
    </button>
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
