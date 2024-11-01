<script setup>
import LessonItem from '&/Schedule/LessonItem.vue'

import { useScheduleStore } from '@/stores/ScheduleStore.js'
const scheduleStore = useScheduleStore()
const prop = defineProps({
  grade: String,
  day: Number,
  lesson: Object
})

const handleDeleteLesson = (num) => {
  scheduleStore.delleteLesson(prop.grade, prop.day, num)
}

const addLesson =() => {
    scheduleStore.addLesson(prop.grade, prop.day)
}

</script>
<template>
  <div class="block w-50 px-3 pb-3 bg-white border border-gray-200 rounded-lg ring-1">
    <h1 class="text-center underline underline-offset-2">Monday</h1>
    <LessonItem
      v-for="(item, index) in prop.lesson"
      :key="index"
      :num="item.Number"
      :title="item.Name"
      @deleteLesson="handleDeleteLesson"
    />
    <div class="grid justify-items-end">
      <button
        class="bg-blue-500 border border-blue-700 hover:bg-blue-700 text-white mt-2 py-1 px-4 rounded-lg text-sm"
        @click="addLesson"
      >
        Add
      </button>
    </div>
  </div>
</template>
