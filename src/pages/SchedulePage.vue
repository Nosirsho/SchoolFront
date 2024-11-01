<script setup>
import { ref, onMounted } from 'vue'

import { useScheduleStore } from '@/stores/ScheduleStore.js'

import GradeItem from '&/Schedule/GradeItem.vue'

const scheduleStore = useScheduleStore()

const data = ref([])
data.value = scheduleStore.data


onMounted(() => {})
</script>
<template>
  <div class="container px-6 py-8 mx-auto">
    <div class="grid grid-cols-12 gap-2">
      <GradeItem
        v-for="(item, index) in data"
        :key="index"
        :grade="item.Grade"
        :schedule="item.Schedule"
      />
    </div>
  </div>
</template>
