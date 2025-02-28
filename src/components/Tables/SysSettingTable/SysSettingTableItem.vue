<script setup>
import DeleteButton from '@/components/Buttons/DeleteButton.vue'
import EditButton from '@/components/Buttons/EditButton.vue'
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
//const emit = defineEmits(['selectedEditStudent', 'deleteSelectedStudent'])
</script>
<template>
  <tr class="hover:bg-slate-100">
    <td
      class="px-6 py-1 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-900"
    >
      {{ code }}
    </td>
    <td
      class="px-6 py-1 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-900"
    >
      {{ name }}
    </td>
    <td
      class="px-6 py-1 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-900"
    >
      {{ type }}
    </td>
    <td
      class="px-6 py-1 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-900"
    >
      {{ intValue }}
    </td>
    <td
      class="px-6 py-1 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-900"
    >
      {{ stringValue }}
    </td>
    <td
      class="px-6 py-1 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-900"
    >
      {{ dateValue }}
    </td>
    <td
      class="px-6 py-1 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-900"
    >
      {{ boolValue }}
    </td>
    <td
      class="px-6 py-1 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-900"
    >
      {{ guidValue }}
    </td>
    <td
      class="text-center border-b border-gray-200 border-l-2"
    >
      <EditButton class="mx-1" />
      <DeleteButton class="mx-1" />
    </td>
  </tr>
</template>
