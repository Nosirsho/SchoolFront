<script setup>
import axios from 'axios'
import DeleteButton from '@/components/Buttons/DeleteButton.vue'
import EditButton from '@/components/Buttons/EditButton.vue'

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
      class="px-6 py-1 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-900"
    >
      {{ fullName }}
    </td>
    <td
      class="px-6 py-1 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-900"
    >
      {{ birthDate }}
    </td>
    <td
      class="px-6 py-1 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-900"
    >
      {{ phone }}
    </td>
    <td
      class="px-6 py-1 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-900"
    >
      {{ sex }}
    </td>
    <td class="text-center border-b border-gray-200 border-l-2">
      <EditButton class="mx-1" @on-edit-click="$emit('editTeacher', id)" />
      <DeleteButton @on-delete-click="deleteTeacher" />
    </td>
  </tr>
</template>
