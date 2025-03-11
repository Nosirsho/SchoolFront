<script setup>
import { ref, onMounted } from 'vue'
//import utils from '@/utils/utils.js'
import { useStudentStore } from '@/stores/StudentStore.js'
import SelectFilter from '../Items/SelectFilter.vue'
import { useParentStore } from '@/stores/ParentStore'

const studentStore = useStudentStore()
const parentStore = useParentStore()
const selectedStudent = ref()

const parent = ref({
  firstName: '',
  lastName: '',
  middleName: '',
  sex: 0,
  phone: ''
})
const prop = defineProps({
  isEdit: Boolean
})

const studentData = ref([])
const onChangeHandle = async (query) => {
  await studentStore.searchByName(query)
  studentData.value = studentStore.data
}
const closeForm = () => {
  parentStore.formVisible = false
}

const saveEditButtonClick = async () => {
  const data = {
    firstName: parent.value.firstName,
    lastName: parent.value.lastName,
    middleName: parent.value.middleName,
    sex: parseInt(parent.value.sex),
    phone: parent.value.phone,
    studentId: selectedStudent.value
  }
  if (!prop.isEdit) {
    await parentStore.createParent(data)
  } else {
    data.id = parentStore.currItemId
    await parentStore.editParent(data.id, data)
  }
}

onMounted(async () => {
  if (prop.isEdit) {
    await parentStore.getParentById(parentStore.currItemId)
    parent.value.firstName = parentStore.currentItemObj.firstName
    parent.value.lastName = parentStore.currentItemObj.lastName
    parent.value.middleName = parentStore.currentItemObj.middleName
    parent.value.sex = parentStore.currentItemObj.sex
    parent.value.phone = parentStore.currentItemObj.phone
  } else {
    console.log('new')
  }
})
</script>

<template>
  <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-60"></div>
  <div class="bg-gray-900 w-1/4 h-full fixed right-0 top-0 z-30 p-4">
    <button
      @click="closeForm"
      class="text-center m-2 p-2 text-gray-800 bg-gray-700 border border-gray-300 hover:bg-gray-800 rounded-lg focus:ring-2 focus:ring-blue-300"
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
          <p class="p-2.5">Фамилия</p>
        </div>
        <input
          type="text"
          id="last-name"
          class="col-span-6 shadow-sm bg-gray-800 border border-gray-600 text-gray-200 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Фамилия"
          v-model="parent.lastName"
          required
        />
      </div>

      <div class="grid grid-cols-8 mb-2">
        <div
          class="col-span-2 bg-gray-700 text-teal-500 font-medium text-sm border border-gray-600 rounded-l-lg"
        >
          <p class="p-2.5">Имя</p>
        </div>
        <input
          type="text"
          id="first-name"
          class="col-span-6 shadow-sm bg-gray-800 border border-gray-600 text-gray-200 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Имя"
          v-model="parent.firstName"
          required
        />
      </div>

      <div class="grid grid-cols-8 mb-2">
        <div
          class="col-span-2 bg-gray-700 text-teal-500 font-medium text-sm border border-gray-600 rounded-l-lg"
        >
          <p class="p-2.5">Отчество</p>
        </div>
        <input
          type="text"
          id="middle-name"
          class="col-span-6 shadow-sm bg-gray-800 border border-gray-600 text-gray-200 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Отчество"
          v-model="parent.middleName"
          required
        />
      </div>

      <div class="grid grid-cols-8 mb-2">
        <div
          class="col-span-2 bg-gray-700 text-teal-500 font-medium text-sm border border-gray-600 rounded-l-lg"
        >
          <p class="p-2.5">Пол</p>
        </div>
        <select
          v-model="parent.sex"
          class="col-span-6 shadow-sm bg-gray-800 border border-gray-600 text-gray-400 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
          <option value="0">Не выбран</option>
          <option value="1">М</option>
          <option value="2">Ж</option>
        </select>
      </div>

      <div class="grid grid-cols-8 mb-2">
        <div
          class="col-span-2 bg-gray-700 text-teal-500 font-medium text-sm border border-gray-600 rounded-l-lg"
        >
          <p class="p-2.5">Телефон</p>
        </div>
        <input
          type="text"
          id="middle-name"
          class="col-span-6 shadow-sm bg-gray-800 border border-gray-600 text-gray-200 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Телефон"
          v-model="parent.phone"
          required
        />
      </div>

      <SelectFilter
        v-if="!isEdit"
        :data="studentData"
        caption="Студент"
        @on-change="onChangeHandle"
        v-model="selectedStudent"
      />

      <div class="text-right">
        <button
          @click.prevent="saveEditButtonClick"
          class="text-center mt-2 p-1.5 text-teal-600 font-bold bg-gray-700 border border-gray-300 hover:bg-gray-800 rounded-lg focus:ring-2 focus:ring-blue-300"
        >
          {{ isEdit ? 'Изменить' : 'Добавить' }}
        </button>
      </div>
    </form>
  </div>
</template>
