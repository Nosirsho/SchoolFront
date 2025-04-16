<script setup>
import { ref, onMounted } from 'vue'
import Datepicker from 'vue3-datepicker'
import { useTeacherStore } from '@/stores/TeacherStore.js'
import utils from '@/utils/utils'

const teacherStore = useTeacherStore()

const prop = defineProps({
  isEdit: Boolean
})

const teacher = ref({
  firstName: '',
  lastName: '',
  middleName: '',
  phone: '',
  birthDate: null,
  sex: 0
})

const onBackButtonClick = () => {
  teacherStore.formVisible = false
}
const onSaveEditButtonClick = () => {
  const data = {
    id: teacher.value.id,
    firstName: teacher.value.firstName,
    middleName: teacher.value.middleName,
    lastName: teacher.value.lastName,
    sex: parseInt(teacher.value.sex),
    phone: teacher.value.phone,
    birthDate: utils.formatDate(teacher.value.birthDate)
  }

  if (prop.isEdit) {
    teacherStore.editTeacher(teacher.value.id, data)
  } else {
    teacherStore.createTeacher(data)
  }
}

onMounted(async () => {
  if (prop.isEdit) {
    await teacherStore.getParentById(teacherStore.currItemId)
    teacher.value.id = teacherStore.currentItemObj.id
    teacher.value.firstName = teacherStore.currentItemObj.firstName
    teacher.value.middleName = teacherStore.currentItemObj.middleName
    teacher.value.lastName = teacherStore.currentItemObj.lastName
    teacher.value.phone = teacherStore.currentItemObj.phone
    teacher.value.birthDate = new Date(teacherStore.currentItemObj.birthDate)
    teacher.value.sex = teacherStore.currentItemObj.sex
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
    <h1 class="color-white">Teachers</h1>

    <form class="w-full m-2">
      <div class="grid grid-cols-8 mb-2">
        <div
          class="col-span-2 bg-gray-700 text-teal-500 font-medium text-sm border border-gray-600 rounded-l-lg"
        >
          <p class="p-2.5">Фамилия</p>
        </div>
        <input
          v-model="teacher.lastName"
          type="text"
          class="col-span-6 shadow-sm bg-gray-800 border border-gray-600 text-gray-200 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Фамилия"
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
          v-model="teacher.firstName"
          type="text"
          class="col-span-6 shadow-sm bg-gray-800 border border-gray-600 text-gray-200 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Имя"
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
          v-model="teacher.middleName"
          type="text"
          class="col-span-6 shadow-sm bg-gray-800 border border-gray-600 text-gray-200 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Отчество"
          required
        />
      </div>

      <div class="grid grid-cols-8 mb-2">
        <div
          class="col-span-2 bg-gray-700 text-teal-500 font-medium text-sm border border-gray-600 rounded-l-lg"
        >
          <p class="p-2.5">Телефон</p>
        </div>
        <input
          v-model="teacher.phone"
          type="text"
          class="col-span-6 shadow-sm bg-gray-800 border border-gray-600 text-gray-200 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Телефон"
          required
        />
      </div>

      <div class="grid grid-cols-8 mb-2">
        <div
          class="col-span-2 bg-gray-700 text-teal-500 font-medium text-sm border border-gray-600 rounded-l-lg"
        >
          <p class="p-2.5">Дата рожд</p>
        </div>
        <Datepicker
          v-model="teacher.birthDate"
          class="col-span-4 shadow-sm bg-gray-800 border border-gray-600 text-gray-200 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
        />
      </div>

      <div class="grid grid-cols-8 mb-2">
        <div
          class="col-span-2 bg-gray-700 text-teal-500 font-medium text-sm border border-gray-600 rounded-l-lg"
        >
          <p class="p-2.5">Пол</p>
        </div>
        <select
          v-model="teacher.sex"
          class="col-span-2 shadow-sm bg-gray-800 border border-gray-600 text-gray-400 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
          <option value="0">Не выбран</option>
          <option value="1">М</option>
          <option value="2">Ж</option>
        </select>
      </div>

      <div class="text-right">
        <button
          @click="onSaveEditButtonClick"
          type="button"
          class="text-center mt-2 p-1.5 text-teal-600 font-bold bg-gray-700 border border-gray-300 hover:bg-gray-800 rounded-lg focus:ring-2 focus:ring-blue-300"
        >
          {{ prop.isEdit ? 'Изменить' : 'Сохранить' }}
        </button>
      </div>
    </form>
  </div>
</template>
