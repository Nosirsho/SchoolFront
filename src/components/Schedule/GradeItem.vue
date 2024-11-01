<script setup>
import DayItem from '&/Schedule/DayItem.vue'
const prop = defineProps({
  grade: String,
  schedule: Object
})
</script>
<template>
  <div class="block w-10 px-3 pb-3 bg-white border border-gray-200 rounded-lg ring-1">
    {{ prop.grade }}
  </div>

  <div class="col-span-11 grid grid-cols-6 gap-2">
    <DayItem
      v-for="(item, index) in prop.schedule"
      :key="index"
      :grade="prop.grade"
      :day="item.Day"
      :lesson="item.Lesson"
    />
  </div>
</template>
