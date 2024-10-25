<template>
  <div class="w-full px-6 sm:w-1/2 xl:w-1/3">
    <div class="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
      <div class="p-3 bg-indigo-600 bg-opacity-75 rounded-full">Ico</div>

      <div class="mx-5">
        <h4 class="text-2xl font-semibold text-gray-700">{{ props.count }}</h4>
        <div class="text-gray-500">{{ props.title }}</div>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  count: Number,
  title: String
})
</script>
