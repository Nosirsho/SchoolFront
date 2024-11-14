<script setup>
import {computed, ref} from 'vue'
const prop = defineProps({
  number: Number,
  lessonId: String,
  lessons: Array
})

const selectedLessonData = ref(prop.lessonId) 

const selectedLesson = computed(() => {
  return selectedLessonData.value
})

//TODO: setLessonEmit найти правилбный метод для отправки выбранного select-элемента
//во второй параметр метода. при передачи "selectedLesson" значение прихолит пустым
const setLessonEmit = (event) => {
  selectedLessonData.value = event.target.value
  emit('setLessonId', prop.number, event.target.value)
}
const emit = defineEmits(['deleteLesson', 'setLessonId'])
</script>
<template>
  <div class="flex justify-start mt-1">
    <div
      class="bg-gray-50 border border-gray-300 px-2 rounded-l-lg text-center text-gray-900 text-sm"
    >
      {{ number }}
    </div>
    <select
      v-model="selectedLessonData"
      @change="setLessonEmit"
      class="bg-gray-50 border border-gray-300 mx-0.5 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full"
    >
      <option v-for="lesson in prop.lessons" :key="lesson.id" :value="lesson.id">
        {{ lesson.name }}
      </option>
    </select>
    <button
      @click="emit('deleteLesson', prop.number)"
      
      class="bg-gray-50 border border-gray-300 px-2 mr-0.5 rounded-r-lg text-center text-red-500 font-bold text-sm"
    >
      X
    </button>
  </div>
</template>
