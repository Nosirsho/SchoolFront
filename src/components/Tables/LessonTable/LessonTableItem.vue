<script setup>
import DeleteButton from '@/components/Buttons/DeleteButton.vue'
import EditButton from '@/components/Buttons/EditButton.vue'

import { useLessonStore } from '@/stores/LessonStore.js'

const lessonStore = useLessonStore()

const props = defineProps({
  id: String,
  name: String
})
const handleEditButtonClick = () => {
  lessonStore.formVisible = true
  lessonStore.isEdit = true
  lessonStore.currItemId = props.id
}
const handleDeleteButtonClick = () => {
    lessonStore.deleteLesson(props.id)
}
</script>
<template>
  <tr class="hover:bg-slate-100">
    <td
      class="px-6 py-1 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-900"
    >
      {{ name }}
    </td>
    <td class="text-center border-b border-gray-200 border-l-2">
      <EditButton class="mx-1" @on-edit-click="handleEditButtonClick" />
      <DeleteButton class="mx-1" @on-delete-click="handleDeleteButtonClick" />
    </td>
  </tr>
</template>
