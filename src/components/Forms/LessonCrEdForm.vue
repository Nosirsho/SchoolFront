<script setup>
import { ref, onMounted } from 'vue'
import { useLessonStore } from '@/stores/LessonStore.js'

const lessonStore = useLessonStore()

const prop = defineProps({
  isEdit: Boolean
})

const lesson = ref({
  id: '',
  name: ''
})

const onBackButtonClick = () => {
  lessonStore.formVisible = false
}
const onSaveEditButtonClick = () => {
  const data = {
    name: lesson.value.name
  }

  if (prop.isEdit) {
    ;(data.id = lesson.value.id), lessonStore.editLesson(lesson.value.id, data)
  } else {
    lessonStore.createLesson(data)
  }
}

onMounted(async () => {
  if (prop.isEdit) {
    await lessonStore.getLessonById(lessonStore.currItemId)
    lesson.value.id = lessonStore.currentItemObj.id
    lesson.value.name = lessonStore.currentItemObj.name
  }
})
</script>

<template>
  <div class="fixed top-0 left-0 h-full w-full bg-black z-30 opacity-60"></div>
  <div class="bg-gray-900 w-1/3 h-full fixed right-0 top-0 z-30 p-4">
    <button
      type="button"
      class="text-center m-2 p-2 text-gray-800 bg-gray-700 border border-gray-300 hover:bg-gray-800 rounded-lg focus:ring-2 focus:ring-blue-300"
      @click="onBackButtonClick"
    >
      <svg class="w-15 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 10">
        <path
          stroke="rgb(13 148 136)"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 5H1m0 0l4-4m-4 4l4 4"
        />
      </svg>
    </button>
    <h1 class="color-white">Teachers</h1>

    <form class="w-full m-2">
      <div class="grid grid-cols-8 mb-2">
        <div
          class="col-span-2 bg-gray-700 text-teal-500 font-medium text-sm border border-gray-600 rounded-l-lg"
        >
          <p class="p-2.5">Наименование</p>
        </div>
        <input
          v-model="lesson.name"
          type="text"
          class="col-span-6 shadow-sm bg-gray-800 border border-gray-600 text-gray-200 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Наименование"
          required
        />
      </div>

      <div class="text-right">
        <button
          @click="onSaveEditButtonClick"
          type="button"
          class="text-center mt-2 p-1.5 text-teal-600 font-bold bg-gray-700 border border-gray-300 hover:bg-gray-800 rounded-lg focus:ring-2 focus:ring-blue-300"
        >
          {{ prop.isEdit ? 'Изменить' : 'Сохранить' }}
        </button>
      </div>
    </form>
  </div>
</template>
