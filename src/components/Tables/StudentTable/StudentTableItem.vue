<script setup>
import DeleteButton from '@/components/Buttons/DeleteButton.vue'
import EditButton from '@/components/Buttons/EditButton.vue'
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
      {{ gradeLevel }}
    </td>
    <td
      class="px-6 py-1 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-900"
    >
      {{ sex }}
    </td>
    <td class="text-center border-b border-gray-200 border-l-2">
      <EditButton class="mx-1" @on-edit-click="emit('selectedEditStudent', id)" />
      <DeleteButton class="mx-1" @on-delete-click="emit('deleteSelectedStudent', id)"/>
    </td>
  </tr>
</template>
