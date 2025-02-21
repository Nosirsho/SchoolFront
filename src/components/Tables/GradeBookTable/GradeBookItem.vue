<script setup>
import { useGradeBookStore } from '@/stores/GradeBookStore.js'
import { onMounted, ref } from 'vue'
const gradeBookStore = useGradeBookStore()
const props = defineProps({
  id: String,
  fullName: String,
  grades: Array
})
const currentDay = ref()
onMounted(async () => {
  currentDay.value = gradeBookStore.currentDay
})
</script>
<template>
  <tr class="hover:bg-slate-100">
    <td
      class="px-2 py-1 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-900"
    >
      {{ fullName }}
    </td>
    <td
      v-for="(grade, index) in grades"
      :key="index"
      :class="[
        'border border-gray-200 text-sm text-gray-900',
        index === currentDay -1 ? 'bg-indigo-100' : ''
      ]"
    >
      <input
        :type="[index !== grades.length-1 ? 'text' : 'number']"
        :id="'first_product'+props.fullName+index"
        :value="grade.grade"
        class="bg-gray-50 w-8 border border-gray-300 text-center text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block"
        :readonly="index!==currentDay -1"
      />
    </td>
    <td
      class="px-6 text-sm font-medium leading-5 text-center whitespace-no-wrap border-b border-gray-200"
    >
      <button
        class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-md text-sm px-3 pb-0.5 dark:focus:ring-yellow-900"
      >
        Edit
      </button>
    </td>
  </tr>
</template>
