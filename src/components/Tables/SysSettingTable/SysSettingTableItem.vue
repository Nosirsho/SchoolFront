<script setup>
defineProps({
  id: String,
  name: String,
  code: String,
  type: String,
  integerValue: Number,
  stringValue: String,
  dateValue: String,
  booleanValue: Boolean,
  guidValue: String
})
const emit = defineEmits(['selectedEditStudent', 'deleteSelectedStudent'])
</script>
<template>
  <tr class="hover:bg-slate-100">
    <td class="px-6 py-1 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-900">{{ code }}</td>
    <td class="px-6 py-1 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-900">{{ name }}</td>
    <td class="px-6 py-1 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-900">{{ type }}</td>
    <td class="px-6 py-1 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-900">{{ intValue }}</td>
    <td class="px-6 py-1 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-900">{{ stringValue }}</td>
    <td class="px-6 py-1 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-900">{{ dateValue }}</td>
    <td class="px-6 py-1 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-900">{{ boolValue }}</td>
    <td class="px-6 py-1 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-900">{{ guidValue }}</td>
    <td class="px-6 py-1 text-sm font-medium leading-5 text-right whitespace-no-wrap border-b border-gray-200">
      <button
        class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-md text-sm px-3 pb-0.5 dark:focus:ring-yellow-900"
        @click="emit('selectedEditStudent', id)"
      >Edit</button>
      |
      <button
        class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-md text-sm px-3 pb-0.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        @click="emit('deleteSelectedStudent', id)"
      >Delete</button>
    </td>
  </tr>
</template>
