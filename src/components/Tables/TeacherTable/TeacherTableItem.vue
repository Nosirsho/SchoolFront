<script setup>
defineProps({
  firstName: String,
  middleName: String,
  lastName: String,
  birthDate: String,
  sex: String
})
</script>
<template>
  <tr class="hover:font-bold">
    <td
      class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-900"
    >
      {{ firstName }}
    </td>
    <td
      class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-900"
    >
      {{ middleName }}
    </td>
    <td
      class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-900"
    >
      {{ lastName }}
    </td>
    <td
      class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-900"
    >
      {{ birthDate }}
    </td>
    <td
      class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-900"
    >
      {{ sex }}
    </td>
    <td
      class="px-6 py-4 text-sm font-medium leading-5 text-right whitespace-no-wrap border-b border-gray-200"
    >
      <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
    </td>
  </tr>
</template>
