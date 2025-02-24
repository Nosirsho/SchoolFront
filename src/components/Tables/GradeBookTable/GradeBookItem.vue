<script setup>
import { useGradeBookStore } from '@/stores/GradeBookStore.js'
import { onMounted, ref } from 'vue'
import utils from '@/utils/utils'
const gradeBookStore = useGradeBookStore()
const props = defineProps({
  id: String,
  fullName: String,
  grades: Array
})
const emit = defineEmits(['addCurrentDayGrade'])
const currentMonthYear = ref()

onMounted(async () => {
  currentMonthYear.value = utils.formatDate(gradeBookStore.systemDate)
  
})

const addCurrentDayGrade = () => {
  emit('addCurrentDayGrade', props.id)
}

const handleInput = (event) => {
  const input = event.target;
  const value = input.value.replace(/[^1-5]/g, ''); // Удаляем все, кроме цифр 1-5

  if (value.length > 1) {
    input.value = value.charAt(0); // Оставляем только первый символ, если введено больше одной цифры
  } else {
    input.value = value;
  }
}
</script>
<template>
  <tr class="hover:bg-slate-100">
    <td
      class="px-2 py-1 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-900"
    >
      {{ fullName }}
    </td>
    <td
      v-for="grade in grades"
      :key="grade.date"
      :class="[
        'border border-gray-200 text-sm text-gray-900',
        grade.date === currentMonthYear ? 'bg-indigo-100' : ''
      ]"
    >
      <input
        :id="'gradebook'+props.fullName+grade.date"
        :value="grade.grade"
        class="bg-gray-50 w-8 border border-gray-300 text-center text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block"
        :readonly="grade.date!==currentMonthYear"
        @input="handleInput"
      />
    </td>
    <td
      class="text-center border-b border-gray-200"
    >
    <button 
      @click="addCurrentDayGrade"
      type="button" 
      class=" p-1 text-green-400 border-2 border-green-400 text-center hover:bg-green-500 hover:text-white focus:ring-2 focus:ring-green-300 rounded-lg text-sm text-center inline-flex items-center me-2">
      <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 0 1 0 1.414l-8 8a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 1.414-1.414L8 12.586l7.293-7.293a1 1 0 0 1 1.414 0z" clip-rule="evenodd"/>
      </svg>
      <span class="sr-only">Checkmark</span>
    </button>
    </td>
  </tr>
</template>
