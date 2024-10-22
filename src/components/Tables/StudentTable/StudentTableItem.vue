<script setup>
defineProps({
  id: String,
  fullName: String,
  birthDate: String,
  gradeLevel: String,
  sex: String
})
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
      <button class="text-indigo-600 hover:text-indigo-900" @click="$emit('editStudent', id)">
        Edit
      </button>
    </td>
  </tr>
</template>
