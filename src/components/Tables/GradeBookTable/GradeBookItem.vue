<script setup>
defineProps({
  id: String,
  fullName: String,
  grades: Array
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
      v-for="(grade, index) in grades"
      :key="index"
      :class="[
        'px-1 border-b border-gray-200 text-sm text-gray-900',
        index == 'd14' ? 'bg-gray-100' : ''
      ]"
    >
      <input
        type="number"
        id="first_product"
        :value="grade"
        class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1"
        :readonly="index!=='d14'"
      />
    </td>
    <td
      class="px-6 py-4 text-sm font-medium leading-5 text-right whitespace-no-wrap border-b border-gray-200"
    >
      <button
        class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-md text-sm px-3 pb-0.5 dark:focus:ring-yellow-900"
      >
        Edit
      </button>
      |
      <button
        class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-md text-sm px-3 pb-0.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
      >
        Delete
      </button>
    </td>
  </tr>
</template>
