<script setup>
import { ref, onMounted, computed } from 'vue'
import Datepicker from 'vue3-datepicker'
import { useSysSettingStore } from '@/stores/SysSettingStore.js'
import utils from '@/utils/utils'

const sysSettingStore = useSysSettingStore()
const sysSettingTypes = ref([])
const selectedSysSettingType = ref()

const prop = defineProps({
  isEdit: Boolean
})

const name = ref()
const code = ref()

const datepickerValue = ref()
const booleanValue = ref()
const textValue = ref()
const intValue = ref()

const selectedSysSettingTypeNumber = computed(() => selectedSysSettingType.value)

const onBackButtonClick = () => {
  sysSettingStore.formVisible = false
}
const onButtonClick = () => {
  if (!selectedSysSettingType.value) {
    console.log('Error')
    return
  }
  const selectedTypeNumber = selectedSysSettingTypeNumber.value
  const typeId = sysSettingTypes.value.find((type) => type.number == selectedTypeNumber).id
  let value = null
  if (selectedTypeNumber == 2) {
    value = intValue.value.toString()
  } else if (selectedTypeNumber == 3) {
    value = booleanValue.value
  } else if (selectedTypeNumber == 4) {
    value = utils.formatDate(datepickerValue.value)
  } else {
    value = textValue.value
  }
  const data = {
    name: name.value,
    code: code.value,
    typeId: typeId,
    value: value
  }
  if (prop.isEdit) {
    sysSettingStore.updateSysSettingValue(data)
  } else {
    sysSettingStore.setSysSettingValue(data)
  }
}

onMounted(async () => {
  await sysSettingStore.getSysSettingType()
  sysSettingTypes.value = sysSettingStore.sysSettingTypesList
  if (prop.isEdit) {
    await sysSettingStore.getSysSettingById(sysSettingStore.currItemId)

    name.value = sysSettingStore.currentItemObj.name
    code.value = sysSettingStore.currentItemObj.code
    booleanValue.value = sysSettingStore.currentItemObj.booleanValue
    textValue.value = sysSettingStore.currentItemObj.stringValue
    intValue.value = sysSettingStore.currentItemObj.integerValue
    datepickerValue.value = new Date(sysSettingStore.currentItemObj.dateValue)
    selectedSysSettingType.value = sysSettingStore.currentItemObj.typeNumber
  }
})
</script>

<template>
  <div class="fixed top-0 left-0 h-full w-full bg-black z-30 opacity-60"></div>
  <div class="bg-gray-900 w-1/3 h-full fixed right-0 top-0 z-30 p-4">
    <button
      type="button"
      class="text-center m-2 p-2 text-gray-800 bg-gray-700 border border-gray-300 hover:bg-gray-800 rounded-lg focus:ring-2 focus:ring-blue-300"
      @click="onBackButtonClick"
    >
      <svg class="w-15 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 10">
        <path
          stroke="rgb(13 148 136)"
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
          class="col-span-2 bg-gray-700 text-teal-500 font-medium text-sm border border-gray-600 rounded-l-lg"
        >
          <p class="p-2.5">Наименование</p>
        </div>
        <input
          v-model="name"
          type="text"
          class="col-span-6 shadow-sm bg-gray-800 border border-gray-600 text-gray-200 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Наименование"
          required
        />
      </div>

      <div class="grid grid-cols-8 mb-2">
        <div
          class="col-span-2 bg-gray-700 text-teal-500 font-medium text-sm border border-gray-600 rounded-l-lg"
        >
          <p class="p-2.5">Код</p>
        </div>
        <input
          type="text"
          v-model="code"
          class="col-span-6 shadow-sm bg-gray-800 border border-gray-600 text-gray-200 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Код"
          required
        />
      </div>

      <div class="grid grid-cols-8 mb-2">
        <div
          class="col-span-2 bg-gray-700 text-teal-500 font-medium text-sm border border-gray-600 rounded-l-lg"
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
          class="col-span-2 bg-gray-700 text-teal-500 font-medium text-sm border border-gray-600 rounded-l-lg"
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
          class="col-span-2 bg-gray-700 text-teal-500 font-medium text-sm border border-gray-600 rounded-l-lg"
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
          class="col-span-2 bg-gray-700 text-teal-500 font-medium text-sm border border-gray-600 rounded-l-lg"
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
          class="col-span-2 bg-gray-700 text-teal-500 font-medium text-sm border border-gray-600 rounded-l-lg"
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
      <div class="text-right">
        <button
          @click="onButtonClick"
          type="button"
          class="text-center mt-2 p-1.5 text-teal-600 font-bold bg-gray-700 border border-gray-300 hover:bg-gray-800 rounded-lg focus:ring-2 focus:ring-blue-300"
        >
          {{ prop.isEdit ? 'Изменить' : 'Сохранить' }}
        </button>
      </div>
    </form>
  </div>
</template>
