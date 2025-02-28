<script setup>
import { onMounted, ref } from 'vue'
import { useAutoAnimate } from '@formkit/auto-animate/vue'
import SysSettingTableItem from '&/Tables/SysSettingTable/SysSettingTableItem.vue'

import { useSysSettingStore } from '@/stores/SysSettingStore.js'

const [parent] = useAutoAnimate()

const sysSettingStore = useSysSettingStore()
const items = ref([])

const searchInput = ref()

onMounted(async () => {
  await sysSettingStore.getSysSettings()
  items.value = sysSettingStore.data
})
</script>
<template>
  <div ref="parent">
    <!--Search Input Start-->
    <div>
      <div class="max-auto mx-auto rounded-lg w-1/3">
        <div class="relative">
          <div class="mt-3 absolute inset-y-0 start-0 flex ps-3 pointer-events-none">
            <svg
              class="w-4 h-4 text-gray-500"
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
            class="w-full mb-2 p-2 ps-10 text-sm text-gray-900 border border-gray-300 bg-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder='Поиск по шаблону "Фамилия Имя Отчество"'
            required
          />
          <button
            @click="searchStudents"
            class="text-white absolute end-1 bottom-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <!--Search Input End-->

    <table class="min-w-full">
      <thead>
        <tr>
          <th
            class="px-6 py-1 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
          >
            Наименование
          </th>
          <th
            class="px-6 py-1 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
          >
            Код
          </th>
          <th
            class="px-6 py-1 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
          >
            Тип
          </th>
          <th
            class="px-6 py-1 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
          >
            Число
          </th>
          <th
            class="px-6 py-1 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
          >
            Строка
          </th>
          <th
            class="px-6 py-1 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
          >
            Дата
          </th>
          <th
            class="px-6 py-1 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
          >
            Булевое
          </th>
          <th
            class="px-6 py-1 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
          >
            Guid
          </th>
          <th
            class="px-6 py-1 text-xs font-medium leading-4 tracking-wider text-right text-green-500 uppercase border-b border-gray-200 bg-gray-50"
          >
            <button
              @click="openAddForm"
              class="px-4 py-2 bg-blue-500 rounded-md font-semibold text-xs text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              + Add
            </button>
          </th>
        </tr>
      </thead>

      <tbody class="bg-white" v-auto-animate>
        <!--StudentTableItem-->
        <SysSettingTableItem
          v-for="(item, index) in items"
          :key="index"
          :id="item.id"
          :name="item.name"
          :code="item.code"
          :type="item.type"
          :integerValue="item.integerValue"
          :dateValue="item.dateValue"
          :stringValue="item.stringValue"
          :guidValue="item.guidValue"
          @addCurrentDayGrade="handleAddCurrentDayGrade"
          @deleteCurrentDayGrade="handleDeleteCurrentDayGrade"
        />
        <!--End StudentTableItem-->
      </tbody>
    </table>
  </div>
</template>
