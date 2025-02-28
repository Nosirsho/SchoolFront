<script setup>
import { useGradeBookStore } from '@/stores/GradeBookStore.js'
import SaveButton from '@/components/Buttons/SaveButton.vue'
import DeleteButton from '@/components/Buttons/DeleteButton.vue'
import { onMounted, ref } from 'vue'
import utils from '@/utils/utils'
const gradeBookStore = useGradeBookStore()
const props = defineProps({
  studentId: String,
  fullName: String,
  grades: Array
})
const currGrade = ref()
const emit = defineEmits(['addCurrentDayGrade'])
const currentMonthYear = ref()

onMounted(async () => {
  currentMonthYear.value = utils.formatDate(gradeBookStore.systemDate)
})

const handleSaveClickButton = () => {
  if (currGrade.value == '' || currGrade.value == undefined) {
    gradeBookStore.showModalWindow(true, 'Оценка не может быть пустым!')
    return
  }
  const gradeBookObj = {
    StudentId: props.studentId,
    Grade: currGrade.value,
    Date: currentMonthYear.value
  }
  emit('addCurrentDayGrade', gradeBookObj)
}
const deleteCurrentDayGrade = () => {
  const gradeBookObj = {
    StudentId: props.studentId,
    Date: currentMonthYear.value
  }
  emit('deleteCurrentDayGrade', gradeBookObj)
}

const handleInput = (event) => {
  const input = event.target
  const value = input.value.replace(/[^1-5]/g, '') // Удаляем все, кроме цифр 1-5

  if (value.length > 1) {
    input.value = value.charAt(0) // Оставляем только первый символ, если введено больше одной цифры
  } else {
    input.value = value
  }
  currGrade.value = input.value
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
        :id="'gradebook' + props.fullName + grade.date"
        :value="grade.grade"
        class="bg-gray-50 w-8 border border-gray-300 text-center text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block"
        :readonly="grade.date !== currentMonthYear"
        @input="handleInput"
      />
    </td>
    <td class="text-center border-b border-gray-200">
      <SaveButton @on-save-click="handleSaveClickButton" />
      <DeleteButton @on-delete-click="deleteCurrentDayGrade" />
    </td>
  </tr>
</template>
