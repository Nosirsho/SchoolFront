<script setup>
import { onMounted, ref } from 'vue'
import { useSysSettingStore } from '@/stores/SysSettingStore'
import { useScheduleStore } from '@/stores/ScheduleStore'
const sysSettingStore = useSysSettingStore()
const scheduleStore = useScheduleStore()
const lessons = ref([])

const operDay = ref()
onMounted(async () => {
  const operDayString = ref(await sysSettingStore.getSysSettingByCode('OPER_DAY'))
  sysSettingStore.operDate = operDayString
  operDay.value = operDayString
  lessons.value = await scheduleStore.getScheduleByDayForGradeLevel(
    true,
    'c8ac4626-0d32-4edb-b094-09cb6492b104',
    operDayString.value
  )
})
</script>
<template>
  <div class="flex">
    <input
      type="search"
      id="default-search"
      class="w-80 m-2 p-2 rounded-lg text-sm text-gray-900 border border-blue-400 bg-gray-100 focus:border-blue-500"
      placeholder="Поиск по шаблону ФИО"
    />
    <h1>Oper day {{ operDay }}</h1>
    <ul>
      <li v-for="lesson in lessons" :key="lesson.Id">{{ lesson.lessonName }}</li>
    </ul>
  </div>
</template>
