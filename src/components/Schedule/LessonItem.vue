<script setup>
const prop =defineProps({
  num: Number,
  title: String
})

const emit = defineEmits(['deleteLesson'])
</script>
<template>
  <div class="flex justify-start mt-1">
    <div
      class="bg-gray-50 border border-gray-300 px-2 rounded-l-lg text-center text-gray-900 text-sm"
    >
      {{ num }}
    </div>
    <select
      id="countries"
      class="bg-gray-50 border border-gray-300 mx-0.5 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full"
    >
      <option selected>Choose a country</option>
      <option value="US">United States</option>
      <option value="CA">Canada</option>
      <option value="FR">France</option>
      <option value="DE">Germany</option>
    </select>
    <button
      @click="emit('deleteLesson', prop.num)"
      class="bg-gray-50 border border-gray-300 px-2 mr-0.5 rounded-r-lg text-center text-red-500 font-bold text-sm"
    >X</button>
  </div>
</template>
