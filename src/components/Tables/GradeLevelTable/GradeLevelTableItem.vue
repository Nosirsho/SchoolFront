<script setup>
import DeleteButton from '@/components/Buttons/DeleteButton.vue'
import EditButton from '@/components/Buttons/EditButton.vue'

import { useGradeLevelStore } from '@/stores/GradeLevelStore.js'

const gradeLevelStore = useGradeLevelStore()

const props = defineProps({
  id: String,
  name: String,
  entryYear: Number
})
const handleEditButtonClick = () => {
  gradeLevelStore.formVisible = true
  gradeLevelStore.isEdit = true
  gradeLevelStore.currItemId = props.id
}
const handleDeleteButtonClick = () => {
  gradeLevelStore.deleteGradeLevel(props.id)
}
</script>
<template>
  <tr class="hover:bg-slate-100">
    <td
      class="px-6 py-1 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-900"
    >
      {{ name }}
    </td>
    <td
      class="px-6 py-1 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-900"
    >
      {{ entryYear }}
    </td>
    <td class="text-center border-b border-gray-200 border-l-2">
      <EditButton class="mx-1" @on-edit-click="handleEditButtonClick" />
      <DeleteButton class="mx-1" @on-delete-click="handleDeleteButtonClick" />
    </td>
  </tr>
</template>
