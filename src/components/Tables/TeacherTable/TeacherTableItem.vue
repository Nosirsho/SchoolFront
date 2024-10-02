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
    <td class="px-6 py-4">{{ firstName }}</td>
    <td class="px-6 py-4">{{ middleName }}</td>
    <td class="px-6 py-4">{{ lastName }}</td>
    <td class="px-6 py-4">{{ birthDate }}</td>
    <td class="px-6 py-4">{{ sex }}</td>
    <td class="px-6 py-4">
      <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
    </td>
  </tr>
</template>
