<script setup>
import { ref, onMounted } from 'vue'
import { useGradeBookStore } from '@/stores/GradeBookStore.js'
import GradeBookItem from '&/Tables/GradeBookTable/GradeBookItem.vue'
import MonthYearPicker from '&/MonthYearPicker/MonthYearPicker.vue'

const gradeBookStore = useGradeBookStore()

const items = ref(gradeBookStore.data)
const searchInput = ref()
const daysArray = ref([])
const currentDay = ref()

const handleChangeDate = (date) => {
  gradeBookStore.getIntervalGradeBooks(date)
}

onMounted(async () => {
  await gradeBookStore.getGradeBooks()
  items.value = gradeBookStore.data
  daysArray.value = gradeBookStore.getDaysArray()
  currentDay.value = gradeBookStore.currentDay
  
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
      <MonthYearPicker
      :date="new Date()"
      @changeDate="handleChangeDate"
      />
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
            day.substring(8, 10) == currentDay ? 'bg-indigo-200' : '' // добавляем класс bg-red-500 только для n === 14
          ]"
          >
            {{day.substring(8, 10)}}
          </th>

          <th
            class="px-6 py-2 text-xs font-medium leading-4 text-green-500 uppercase border-b border-gray-200 bg-gray-50"
          >
            <button
              class="inline-flex items-center px-4 py-2 bg-blue-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
          :id="item.id"
          :full-name="item.studentFullName"
          :grades="item.grades"
        />
        <!--End GradeBookItem-->
      </tbody>
    </table>
  </div>
</template>
