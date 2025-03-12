<script setup>
import DeleteButton from '@/components/Buttons/DeleteButton.vue'
import EditButton from '@/components/Buttons/EditButton.vue'
import BindButton from '@/components/Buttons/BindButton.vue'
import { useParentStore } from '@/stores/ParentStore'

const parentStore = useParentStore()

const prop = defineProps({
  id: String,
  fullName: String,
  sex: String,
  phone: String
})

const handleEditButtonClick = () => {
  parentStore.formVisible = true
  parentStore.isEdit = true
  parentStore.currItemId = prop.id
}

const handleBindButtonClick = () => {
  parentStore.bindFormVisible = true
  parentStore.currItemId = prop.id
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
      {{ sex }}
    </td>
    <td
      class="px-6 py-1 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-900"
    >
      {{ phone }}
    </td>
    <td class="text-center border-b border-gray-200 border-l-2">
      <BindButton class="mx-1" @on-bind-click="handleBindButtonClick" />
      <EditButton class="mx-1" @on-edit-click="handleEditButtonClick" />
      <DeleteButton class="mx-1" @on-delete-click="emit('deleteSelectedStudent', id)" />
    </td>
  </tr>
</template>
