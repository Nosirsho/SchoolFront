<script setup>
import { ref, onMounted } from 'vue'
import { useGradeBookStore } from '@/stores/GradeBookStore.js'

import GradeBookItem from './GradeBookItem.vue'

const gradeBookStore = useGradeBookStore()

const items = ref([])
const searchInput = ref()
const daysArray = ref([])


onMounted(async () => {
  await gradeBookStore.getGradeBooks()
  items.value = gradeBookStore.data
  daysArray.value = gradeBookStore.getDaysArray()
})
</script>
<template>
  <div ref="parent">
    <div class="max-auto mx-auto">
      <label
        for="default-search"
        class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >Search</label
      >
      <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            class="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          v-model="searchInput"
          type="search"
          id="default-search"
          class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Поиск по шаблону Фамилия Имя Отчество"
          required
        />
        <button
          @click="searchTeachers"
          class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search
        </button>
      </div>
    </div>

    <table >
      <thead>
        <tr>
          <th
            class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
          >
            ФИО
          </th>
          <th
            v-for="n in daysArray.length"
            :key="n"
            :class="[
            'mx-2 text-lg font-medium text-center text-gray-500 uppercase border border-gray-200 bg-gray-50',
            n === daysArray.length ? 'bg-indigo-200' : '' // добавляем класс bg-red-500 только для n === 14
          ]"
          >
            {{daysArray[n-1].substring(8, 10)}}
          </th>

          <th
            class="px-6 py-2 text-xs font-medium leading-4 text-green-500 uppercase border-b border-gray-200 bg-gray-50"
          >
            <button
              @click="openAddForm"
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
