<script setup>
import LessonItem from '&/Schedule/LessonItem.vue'
import AddButton from '../Buttons/AddButton.vue'
import { useScheduleStore } from '@/stores/ScheduleStore.js'
const scheduleStore = useScheduleStore()

const prop = defineProps({
  gradeLevel: String,
  dayInt: Number,
  lessonNumbers: Object,
  lessonData: Array
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
</script>
<template>
  <div class="block w-50 px-3 py-3 bg-white border border-gray-200 rounded-lg ring-1">
    <LessonItem
      v-for="(item, index) in prop.lessonNumbers"
      :key="index"
      :number="item.number"
      :lessonId="item.lessonId"
      :lessons="prop.lessonData"
      @deleteLesson="handleDeleteLesson"
      @setLessonId="handleSetLesson"
    />
    <div class="mt-2 grid justify-items-end">
      <AddButton @onAddClick="addLesson" />
    </div>
  </div>
</template>
