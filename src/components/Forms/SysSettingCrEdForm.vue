<script setup>
import { ref, onMounted, computed } from 'vue'
import Datepicker from 'vue3-datepicker'
import { useSysSettingStore } from '@/stores/SysSettingStore.js'
import utils from '@/utils/utils'

const sysSettingStore = useSysSettingStore()
const sysSettingTypes = ref([])
const selectedSysSettingType = ref()

const datepickerValue = ref()
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

const codeValue = ref()
const booleanValue = ref()
const textValue = ref()
const intValue = ref()
const selectedSysSettingTypeNumber = computed(() => selectedSysSettingType.value)
onMounted(async () => {
  await sysSettingStore.getSysSettingType()
  sysSettingTypes.value = sysSettingStore.sysSettingTypesList
})
</script>

<template>
  <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-60"></div>
  <div class="bg-gray-900 w-1/3 h-full fixed right-0 top-0 z-30 p-4">
    <button
      type="button"
      class="text-center m-2 p-2 text-gray-800 bg-gray-700 border border-gray-600 hover:bg-gray-800 rounded-lg focus:ring-2 focus:ring-blue-300"
    >
      <svg class="w-15 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 10">
        <path
          stroke="rgb(1 163 175)"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 5H1m0 0l4-4m-4 4l4 4"
        />
      </svg>
    </button>

    <form class="w-full m-2">
      <div class="grid grid-cols-8 mb-2">
        <div
          class="col-span-2 bg-gray-700 text-gray-400 text-sm border border-gray-600 rounded-l-lg"
        >
          <p class="p-2.5">Наименование</p>
        </div>
        <input
          type="text"
          class="col-span-6 shadow-sm bg-gray-800 border border-gray-600 text-gray-200 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Наименование"
          required
        />
      </div>

      <div class="grid grid-cols-8 mb-2">
        <div
          class="col-span-2 bg-gray-700 text-gray-400 text-sm border border-gray-600 rounded-l-lg"
        >
          <p class="p-2.5">Код</p>
        </div>
        <input
          type="text"
          v-model="codeValue"
          class="col-span-6 shadow-sm bg-gray-800 border border-gray-600 text-gray-200 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Код"
          required
        />
      </div>

      <div class="grid grid-cols-8 mb-2">
        <div
          class="col-span-2 bg-gray-700 text-gray-400 font-medium text-sm border border-gray-600 rounded-l-lg"
        >
          <p class="p-2.5">Тип</p>
        </div>
        <select
          id="type"
          v-model="selectedSysSettingType"
          class="col-span-6 shadow-sm bg-gray-800 border border-gray-600 text-gray-400 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
          <option v-for="type in sysSettingTypes" :key="type.id" :value="type.number">
            {{ type.name }}
          </option>
        </select>
      </div>

      <div v-if="selectedSysSettingTypeNumber == 4" class="grid grid-cols-8 mb-2">
        <div
          class="col-span-2 bg-gray-700 text-gray-400 text-sm border border-gray-600 rounded-l-lg"
        >
          <p class="p-2.5">Значение</p>
        </div>
        <Datepicker
          v-model="datepickerValue"
          class="col-span-4 shadow-sm bg-gray-800 border border-gray-600 text-gray-200 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
        />
      </div>

      <div v-else-if="selectedSysSettingTypeNumber == 3" class="grid grid-cols-8 mb-2">
        <div
          class="col-span-2 bg-gray-700 text-gray-400 text-sm border border-gray-600 rounded-l-lg"
        >
          <p class="p-2.5">Значение</p>
        </div>
        <input
          v-model="booleanValue"
          type="checkbox"
          id="check-value"
          class="shadow-sm bg-gray-800 border border-gray-600 text-gray-200 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
          placeholder="Значение"
          chacked
          required
        />
      </div>

      <div v-else-if="selectedSysSettingTypeNumber == 2" class="grid grid-cols-8 mb-2">
        <div
          class="col-span-2 bg-gray-700 text-gray-400 text-sm border border-gray-600 rounded-l-lg"
        >
          <p class="p-2.5">Значение</p>
        </div>
        <input
          v-model="intValue"
          type="number"
          class="col-span-6 shadow-sm bg-gray-800 border border-gray-600 text-gray-200 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
      </div>

      <div v-else class="grid grid-cols-8 mb-2">
        <div
          class="col-span-2 bg-gray-700 text-gray-400 text-sm border border-gray-600 rounded-l-lg"
        >
          <p class="p-2.5">Значение</p>
        </div>
        <input
          v-model="textValue"
          type="text"
          class="col-span-6 shadow-sm bg-gray-800 border border-gray-600 text-gray-200 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
      </div>

      <button
        @click.prevent="toggleStudentEvent"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      ></button>
    </form>
  </div>
</template>
