<script setup>
import { ref, onMounted } from 'vue'
import { useGradeBookStore } from '@/stores/GradeBookStore.js'
import { useLessonStore } from '@/stores/LessonStore.js'
import { useSysSettingStore } from '@/stores/SysSettingStore'

import GradeBookItem from '/src/components/Tables/GradeBookTable/GradeBookItem.vue'
import MonthYearPicker from '/src/components/MonthYearPicker/MonthYearPicker.vue'
import utils from '@/utils/utils'

const gradeBookStore = useGradeBookStore()
const lessonStore = useLessonStore()
const sysSettingStore = useSysSettingStore()

const items = ref(gradeBookStore.data)
const lessonData = ref()

const searchInput = ref()
const daysArray = ref([])
const currentMonthYear = ref()
const systemDate = ref()
const operDay = ref()

const selectedLesson = ref()

const handleChangeDate = async (date) => {
  currentMonthYear.value = date.substring(6, 10)
  await gradeBookStore.getIntervalGradeBooks(date, selectedLesson.value)
  items.value = gradeBookStore.data
  daysArray.value = gradeBookStore.getDaysArray()
}

const handleAddCurrentDayGrade = async (gradeBookObj) => {
  gradeBookObj.LessonId = selectedLesson.value
  await gradeBookStore.addCurrentDayGrade(gradeBookObj)
}

const handleDeleteCurrentDayGrade = async (gradeBookObj) => {
  gradeBookObj.LessonId = selectedLesson.value
  await gradeBookStore.deleteCurrentDayGrade(gradeBookObj)
}

const lessonDropdownChange = async () => {
  const date = utils.formatDate(systemDate.value)
  await gradeBookStore.getIntervalGradeBooks(date, selectedLesson.value)
  items.value = gradeBookStore.data
}

onMounted(async () => {
  await lessonStore.getLessonsList()
  const operDayString = ref(await sysSettingStore.getSysSettingByCode('OPER_DAY'))
  sysSettingStore.operDate = operDayString
  operDay.value = new Date(operDayString.value)
  lessonData.value = lessonStore.data
  currentMonthYear.value = operDayString.value
  selectedLesson.value = lessonData.value[0]
  systemDate.value = new Date(operDay.value)
  systemDate.value.setDate(1)
  const date = utils.formatDate(systemDate.value)
  await gradeBookStore.getIntervalGradeBooks(date, selectedLesson.value.id)
  items.value = gradeBookStore.data
  daysArray.value = gradeBookStore.getDaysArray()
  selectedLesson.value = lessonData.value[0].id
})
</script>
<template>
  <div ref="parent">
    <div class="flex">
      <input
        v-model="searchInput"
        type="search"
        id="default-search"
        class="w-80 m-2 p-2 rounded-lg text-sm text-gray-900 border border-blue-400 bg-gray-100 focus:border-blue-500"
        placeholder="Поиск по шаблону ФИО"
      />
      <MonthYearPicker :date="systemDate" @changeDate="handleChangeDate" />
      <div class="relative">
        <select
          @change="lessonDropdownChange"
          v-model="selectedLesson"
          class="w-40 m-2 p-2 rounded-lg text-sm text-gray-900 border border-blue-400 bg-gray-100 focus:border-blue-500"
        >
          <option v-for="lesson in lessonData" :key="lesson.id" :value="lesson.id">
            {{ lesson.name }}
          </option>
        </select>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th
            class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
          >
            ФИО
          </th>
          <th
            v-for="day in daysArray"
            :key="day"
            :class="[
              'mx-2 text-lg font-medium text-center text-gray-500 uppercase border border-gray-200 bg-gray-50',
              day == currentMonthYear ? 'bg-indigo-200' : ''
            ]"
          >
            {{ day.substring(8, 10) }}
          </th>

          <th
            class="px-3 py-2 text-xs font-medium leading-4 text-green-500 uppercase border-b border-gray-200 bg-gray-50"
          >
            <button
              class="px-1 text-blue-400 border-2 border-blue-400 text-center hover:bg-blue-500 hover:text-white focus:ring-2 focus:ring-blue-300 rounded-lg text-sm text-center inline-flex items-center"
            >
              + Add
            </button>
          </th>
        </tr>
      </thead>

      <tbody class="bg-white" v-auto-animate>
        <!--GradeBookItem-->
        <GradeBookItem
          v-for="(item, index) in items"
          :key="index"
          :studentId="item.studentId"
          :full-name="item.studentFullName"
          :grades="item.grades"
          :operDay="operDay"
          @addCurrentDayGrade="handleAddCurrentDayGrade"
          @deleteCurrentDayGrade="handleDeleteCurrentDayGrade"
        />
        <!--End GradeBookItem-->
      </tbody>
    </table>
  </div>
</template>
