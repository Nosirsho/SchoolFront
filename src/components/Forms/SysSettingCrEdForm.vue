<script setup>
import { ref } from 'vue'
const props = defineProps({
  isEdit: Boolean,
  Name: String
})
const sysSettingObj = ref({
  id: '1',
  name: 'Name',
  code: 'Code',
  type: 'Type',
  integerValue: 1,
  stringValue: 'StringVal',
  dateValue: '2025-02-22',
  booleanValue: true,
  guidValue: 'd7fe027c-2084-4a88-bf71-fb8989887c7e'
})
</script>

<template>
  <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-60"></div>
  <div class="bg-black w-1/3 h-full fixed right-0 top-0 z-30 p-4">
    <button
      @click.prevent="() => emit('closeAddForm')"
      type="submit"
      class="mb-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
    >
      Назад
    </button>

    <form class="w-full m-2">
      <div class="grid grid-cols-8 mb-2">
        <div class="col-span-2 bg-gray-700 text-gray-400 text-sm border border-gray-600 rounded-l-lg">
          <p class="p-2.5">Наименование</p>
        </div>
        <input
          type="text"
          class="col-span-6 shadow-sm bg-gray-700 border border-gray-600 text-gray-200 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Наименование"
          required
        />
      </div>
      <div class="mb-2">
        <input
          type="text"
          class="shadow-sm bg-gray-700 border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Код"
          required
        />
      </div>
      <div class="mb-2">
        <input
          type="text"
          class="shadow-sm bg-gray-700 border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Значение"
          required
        />
      </div>
      <Datepicker
        class="shadow-sm my-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
      />
      <div class="relative">
        <select
          class="shadow-sm my-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
        >
          <option value="0">Не выбран</option>
          <option value="1">М</option>
          <option value="2">Ж</option>
        </select>
      </div>
      <div class="relative">
        <select
          class="shadow-sm my-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
        >
          <option v-for="gradeLevel in gradeLevels" :key="gradeLevel.id" :value="gradeLevel.id">
            {{ gradeLevel.name }}
          </option>
        </select>
      </div>
      <button
        @click.prevent="toggleStudentEvent"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      ></button>
    </form>
  </div>
</template>
