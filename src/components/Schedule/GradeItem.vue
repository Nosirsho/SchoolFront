<script setup>
import { ref, onMounted } from 'vue'
import DayItem from '/src/components/Schedule/DayItem.vue'
import { useLessonStore } from '@/stores/LessonStore.js'
const lessonStore = useLessonStore()
const lessonData = ref([])
const prop = defineProps({
  gradeLevel: String,
  dayLessons: Object
})
onMounted(async () => {
  await lessonStore.getlessons()
  lessonData.value = lessonStore.data
})
</script>
<template>
  <div class="col-span-1 w-10 px-3 pb-3 bg-white border border-gray-200 rounded-lg ring-1">
    {{ prop.gradeLevel }}
  </div>

  <div class="col-span-11 grid grid-cols-6 gap-2">
    <DayItem
      v-for="(item, index) in prop.dayLessons"
      :key="index"
      :gradeLevel="prop.gradeLevel"
      :dayInt="item.dayInt"
      :lessonNumbers="item.lessonNumbers"
      :lessonData="lessonData"
    />
  </div>
</template>
