<script setup>
import { useSysSettingStore } from '@/stores/SysSettingStore.js'
import DeleteButton from '@/components/Buttons/DeleteButton.vue'
import EditButton from '@/components/Buttons/EditButton.vue'

const prop = defineProps({
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
const sysSettingStore = useSysSettingStore()

const handleEditButtonClick = () => {
  sysSettingStore.formVisible = true
  sysSettingStore.isEdit = true
  sysSettingStore.currItemId = prop.id
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
      {{ code }}
    </td>
    <td
      class="px-6 py-1 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-900"
    >
      {{ type }}
    </td>
    <td
      class="px-6 py-1 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-900"
    >
      {{ prop.intValue }}
    </td>
    <td
      class="px-6 py-1 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-900"
    >
      {{ prop.stringValue }}
    </td>
    <td
      class="px-6 py-1 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-900"
    >
      {{ prop.dateValue }}
    </td>
    <td
      class="px-6 py-1 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-900"
    >
      {{ prop.boolValue }}
    </td>
    <td
      class="px-6 py-1 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-900"
    >
      {{ prop.guidValue }}
    </td>
    <td class="text-center border-b border-gray-200 border-l-2">
      <EditButton class="mx-1" @on-edit-click="handleEditButtonClick" />
      <DeleteButton class="mx-1" />
    </td>
  </tr>
</template>
