<script setup>
defineProps({
  id: String,
  fullName: String,
  birthDate: String,
  gradeLevel: String,
  sex: String
})
const emit = defineEmits(['selectedEditStudent', 'deleteSelectedStudent'])
</script>
<template>
  <tr class="hover:bg-slate-100">
    <td
      class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-900"
    >
      {{ fullName }}
    </td>
    <td
      class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-900"
    >
      {{ birthDate }}
    </td>
    <td
      class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-900"
    >
      {{ gradeLevel }}
    </td>
    <td
      class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-900"
    >
      {{ sex }}
    </td>
    <td
      class="px-6 py-4 text-sm font-medium leading-5 text-right whitespace-no-wrap border-b border-gray-200"
    >
      <button
        class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-md text-sm px-3 pb-0.5 dark:focus:ring-yellow-900"
        @click="emit('selectedEditStudent', id)"
      >
        Edit
      </button>
      |
      <button
        class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-md text-sm px-3 pb-0.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        @click="emit('deleteSelectedStudent', id)"
      >
        Delete
      </button>
    </td>
  </tr>
</template>
