<script setup>
import { ref, onMounted } from 'vue'
import LessonItem from '&/Schedule/LessonItem.vue'

import { useScheduleStore } from '@/stores/ScheduleStore.js'
import { useLessonStore } from '@/stores/LessonStore.js'
const scheduleStore = useScheduleStore()
const lessonStore = useLessonStore()

const lessonData = ref([])
lessonData.value = lessonStore.data
const prop = defineProps({
  gradeLevel: String,
  dayInt: Number,
  lessonNumbers: Object
})

const handleDeleteLesson = (num) => {
  scheduleStore.deleteLesson(prop.gradeLevel, prop.dayInt, num)
}

const handleSetLesson = (num, selectedLesson) => {
  scheduleStore.setLesson(prop.gradeLevel, prop.dayInt, num, selectedLesson)
}

const addLesson = () => {
  scheduleStore.addLesson(prop.gradeLevel, prop.dayInt)
}
onMounted(async () => {
  await lessonStore.getlessons()
  lessonData.value = lessonStore.data
})
</script>
<template>
  <div class="block w-50 px-3 py-3 bg-white border border-gray-200 rounded-lg ring-1">
    <LessonItem
      v-for="(item, index) in prop.lessonNumbers"
      :key="index"
      :number="item.number"
      :lessonId="item.lessonId"
      :lessons="lessonData"
      @deleteLesson="handleDeleteLesson"
      @setLessonId="handleSetLesson"
    />
    <div class="grid justify-items-end">
      <button
        class="bg-blue-500 border border-blue-700 hover:bg-blue-700 text-white mt-2 py-1 px-4 rounded-lg text-sm"
        @click="addLesson"
      >
        Добавить
      </button>
    </div>
  </div>
</template>
