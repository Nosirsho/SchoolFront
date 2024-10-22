<script setup>
import axios from 'axios'

const props = defineProps({
  id: String,
  fullName: String,
  birthDate: String,
  phone: String,
  sex: String
})
const deleteTeacher = async () => {
  try {
    await axios.delete(`http://localhost:5296/Teacher/${props.id}`).then((response) => {
      emit('deleteTeacher', response.data)
      console.log(response.data)
    })
  } catch (e) {
    console.log(e)
  }
}

const emit = defineEmits(['deleteTeacher'])
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
      {{ phone }}
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
        @click="$emit('editTeacher', id)"
      >
        Edit
      </button>
      |
      <button
        class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-md text-sm px-3 pb-0.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        @click="deleteTeacher"
      >
        Delete
      </button>
    </td>
  </tr>
</template>
