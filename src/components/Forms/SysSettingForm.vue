<script setup>
import { ref, onMounted, computed } from 'vue'
import Datepicker from 'vue3-datepicker'
import { useSysSettingStore } from '@/stores/SysSettingStore.js'
import utils from '@/utils/utils'

const sysSettingStore = useSysSettingStore()
const sysSettingTypes = ref([])
const selectedSysSettingType = ref()

const codeValue = ref()
const datepickerValue = ref()
const booleanValue = ref()
const textValue = ref()
const intValue = ref()

const emit = defineEmits(['saveButtonClick'])

const saveButtonClick = () => {
    if(!selectedSysSettingType.value){
        console.log('Error')
        return
    }
    const selectedTypeNumber = selectedSysSettingTypeNumber.value
    const typeId = sysSettingTypes.value.find(type => type.number == selectedTypeNumber).id
    let value = null
    if(selectedTypeNumber == 2){
        value = intValue.value.toString()
    } else if(selectedTypeNumber == 3){
        value = booleanValue.value
    } else if(selectedTypeNumber == 4){
        value = utils.formatDate(datepickerValue.value)
    } else {
        value = textValue.value
    }
    const result  = {
        code: codeValue.value,
        typeId: typeId,
        value: value
    }
 
  emit('saveButtonClick', result)
}

const selectedSysSettingTypeNumber = computed(
  () => selectedSysSettingType.value
)
onMounted(async () => {
  await sysSettingStore.getSysSettingType()
  sysSettingTypes.value = sysSettingStore.sysSettingTypesList
})
</script>
<template>
    <div class="bg-white p-2 border-2 border-indigo-600 rounded-lg w-2/3">
      <div class="grid grid-cols-8 mb-2">
        <div class="col-span-8 rounded-lg text-center font-bold text-4xl">
          <p class="item-center p-2.5">Системные настройки</p>
        </div>
      </div>
      <div class="grid grid-cols-8 mb-2">
        <div class="col-span-2 border border-gray-300 rounded-l-lg">
          <p class="item-center p-2.5">Код</p>
        </div>
        <input
          v-model="codeValue"
          type="text"
          id="code"
          class="col-span-6 shadow-sm bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-r-lg p-2.5"
          placeholder="Код"
          required
        />
      </div>

      <div class="grid grid-cols-8 mb-2">
        <div class="col-span-2 border border-gray-300 rounded-l-lg">
          <p class="item-center p-2.5">Тип</p>
        </div>
        <select
          id="type"
          v-model="selectedSysSettingType"
          class="col-span-2 shadow-sm bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-r-lg p-2.5"
        >
          <option v-for="type in sysSettingTypes" :key="type.id" :value="type.number">
            {{ type.name }}
          </option>
        </select>
      </div>
      
      <div v-if="selectedSysSettingTypeNumber==4" class="grid grid-cols-8 mb-2">
        <div class="col-span-2 border border-gray-300 rounded-l-lg">
          <p class="item-center p-2.5">Значение</p>
        </div>
        <Datepicker
          v-model="datepickerValue"
          id="date-value"
          class="col-span-2 shadow-sm bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-r-lg p-3"
          placeholder="Значение"
        />
      </div>

      <div v-else-if="selectedSysSettingTypeNumber==3" class="grid grid-cols-8 mb-2">
        <div class="col-span-2 border border-gray-300 rounded-l-lg">
          <p class="item-center p-2.5">Значение</p>
        </div>
        <input
        v-model="booleanValue"
          type="checkbox"
          id="check-value"
          class="col-span-1 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-r-lg p-2.5 my-2"
          placeholder="Значение"
          required
        />
      </div>

      <div v-else-if="selectedSysSettingTypeNumber==2" class="grid grid-cols-8 mb-2">
        <div class="col-span-2 border border-gray-300 rounded-l-lg">
          <p class="item-center p-2.5">Значение</p>
        </div>
        <input
          v-model="intValue"
          type="number"
          id="value"
          class="col-span-2 shadow-sm bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-r-lg p-2.5"
          placeholder="Значение"
          required
        />
      </div>

      <div v-else class="grid grid-cols-8 mb-2">
        <div class="col-span-2 border border-gray-300 rounded-l-lg">
          <p class="item-center p-2.5">Значение</p>
        </div>
        <input
          v-model="textValue"
          type="text"
          id="value"
          class="col-span-6 shadow-sm bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-r-lg p-2.5"
          placeholder="Значение"
          required
        />
      </div>

      <div class="grid grid-cols-8">
        <div class="col-span-6"></div>
        <button
          @click.prevent="saveButtonClick"
          class="col-span-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Сохранить
        </button>
      </div>
    </div>
</template>