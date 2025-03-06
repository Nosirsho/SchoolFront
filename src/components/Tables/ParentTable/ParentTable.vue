<script setup>
import { ref, onMounted } from 'vue'
import { useParentStore } from '@/stores/ParentStore.js'

import ParentTableItem from './ParentTableItem.vue'

const parentStore = useParentStore()
const items = ref([])

onMounted(async () => {
  await parentStore.getParentsList()
  items.value = parentStore.data
})
</script>
<template>
  <div ref="parent">
    <!-- <StudentEditForm
      @closeAddForm="handleCloseAddForm"
      :editStudentId="editStudentId"
      :isEdit="isEdit"
      v-if="isVisibleForm"
    /> -->

    <!--Search Input Start-->
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
          placeholder='Поиск по шаблону "Фамилия Имя Отчество"'
          required
        />
        <button
          @click="searchStudents"
          class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search
        </button>
      </div>
    </div>
    <!--Search Input End-->

    <table class="min-w-full">
      <thead>
        <tr class="border-2 border-gray-300 bg-gray-100">
          <th
            class="px-6 py-1 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase"
          >
            ФИО
          </th>
          <th
            class="px-6 py-1 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase"
          >
            Пол
          </th>
          <th
            class="px-6 py-1 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase"
          >
            Номер тел
          </th>
          <th
            class="px-6 py-1 text-xs font-medium leading-4 tracking-wider text-right text-green-500 uppercase"
          >
            <button
              @click="openAddForm"
              class="px-1 text-blue-400 border-2 border-blue-400 text-center hover:bg-blue-500 hover:text-white focus:ring-2 focus:ring-blue-300 rounded-lg text-sm text-center inline-flex items-center"
            >
              + Add
            </button>
          </th>
        </tr>
      </thead>

      <tbody class="bg-white" v-auto-animate>
        <!--ParentTableItem-->
        <ParentTableItem
          v-for="item in items"
          :key="item.id"
          :fullName="item.fullName"
          :sex="item.sex"
          :phone="item.phone"
        />
        <!--End ParentTableItem-->
      </tbody>
    </table>
  </div>
</template>
