<script setup>
import DeleteButton from '@/components/Buttons/DeleteButton.vue'
import EditButton from '@/components/Buttons/EditButton.vue'

import { useTeacherStore } from '@/stores/TeacherStore'

const teacherStore = useTeacherStore()

const props = defineProps({
  id: String,
  fullName: String,
  birthDate: String,
  phone: String,
  sex: String
})
const handleEditButtonClick = () => {
  teacherStore.formVisible = true
  teacherStore.isEdit = true
  teacherStore.currItemId = props.id
}
const handleDeleteButtonClick = () => {
  teacherStore.deleteTeacher(props.id)
}
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
      <EditButton class="mx-1" @on-edit-click="handleEditButtonClick" />
      <DeleteButton class="mx-1" @on-delete-click="handleDeleteButtonClick" />
    </td>
  </tr>
</template>
