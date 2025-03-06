//TODO вывести методы работы с БД в store (Teacher )
<script setup>
import { ref, watchEffect } from 'vue'
import Datepicker from 'vue3-datepicker'
import axios from 'axios'
import utils from '@/utils/utils.js'

const props = defineProps({
  editTeacherId: {
    type: String,
    required: false
  },
  isEdit: {
    type: Boolean,
    required: false
  }
})

const emit = defineEmits(['addTeacher', 'editTeacher', 'closeAddForm'])
const teacher = ref({
  firstName: '',
  lastName: '',
  middleName: '',
  birthDate: null,
  phone: '',
  sex: 0
})

watchEffect(async () => {
  if (props.isEdit) {
    try {
      const response = await axios.get(`http://localhost:5296/Teacher/${props.editTeacherId}`)
      teacher.value = response.data
      teacher.value.birthDate = new Date(teacher.value.birthDate)
    } catch (error) {
      console.error('Ошибка при поиске:', error)
    }
  }
})

const toggleTeacherEvent = () => {
  props.isEdit ? editTeacherResp() : addTeacherResp()
}

const addTeacherResp = () => {
  axios
    .post('http://localhost:5296/Teacher', {
      firstName: teacher.value.firstName,
      lastName: teacher.value.lastName,
      phone: teacher.value.phone,
      middleName: teacher.value.middleName,
      birthDate: utils.formatDate(teacher.value.birthDate),
      sex: parseInt(teacher.value.sex)
    })
    .then((response) => {
      emit('addTeacher', response.data)
      emit('closeAddForm')
    })
    .catch((error) => {
      console.error(error) // Handle errors
    })
}

const editTeacherResp = () => {
  axios
    .put(`http://localhost:5296/Teacher/${teacher.value.id}`, {
      id: teacher.value.id,
      firstName: teacher.value.firstName,
      lastName: teacher.value.lastName,
      middleName: teacher.value.middleName,
      phone: teacher.value.phone,
      birthDate: utils.formatDate(teacher.value.birthDate),
      sex: parseInt(teacher.value.sex)
    })
    .then((response) => {
      emit('editTeacher', response.data)
      emit('closeAddForm')
    })
    .catch((error) => {
      console.error(error) // Handle errors
    })
}
</script>

<template>
  <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-60"></div>
  <div class="bg-gray-900 w-1/4 h-full fixed right-0 top-0 z-30 p-4">
    <button
      @click.prevent="() => emit('closeAddForm')"
      type="submit"
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
          <p class="p-2.5">Имя</p>
        </div>
        <input
          type="text"
          id="first-name"
          class="col-span-6 shadow-sm bg-gray-800 border border-gray-600 text-gray-200 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Имя"
          v-model="teacher.firstName"
          required
        />
      </div>

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
          v-model="teacher.lastName"
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
          v-model="teacher.middleName"
          required
        />
      </div>

      <div class="grid grid-cols-8 mb-2">
        <div
          class="col-span-2 bg-gray-700 text-teal-500 font-medium text-sm border border-gray-600 rounded-l-lg"
        >
          <p class="p-2.5">Дата рожд.</p>
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
          <p class="p-2.5">Отчество</p>
        </div>
        <input
          type="text"
          id="phone"
          class="col-span-6 shadow-sm bg-gray-800 border border-gray-600 text-gray-200 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Телефон"
          v-model="teacher.phone"
          required
        />
      </div>

      <div class="text-right">
        <button
          @click.prevent="toggleTeacherEvent"
          class="text-center mt-2 p-1.5 text-teal-600 font-bold bg-gray-700 border border-gray-300 hover:bg-gray-800 rounded-lg focus:ring-2 focus:ring-blue-300"
        >
          {{ isEdit ? 'Изменить' : 'Добавить' }}
        </button>
      </div>
    </form>
  </div>
</template>
