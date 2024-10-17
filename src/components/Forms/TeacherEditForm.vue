<script setup>
import { ref, watchEffect } from 'vue'
import Datepicker from 'vue3-datepicker'
import axios from 'axios'
import utils from '../../utils/utils.js'

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

const emit = defineEmits(['closeAddForm'])
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
  <div class="bg-black w-96 h-full fixed right-0 top-0 z-30 p-8">
    <button
      @click.prevent="() => emit('closeAddForm')"
      type="submit"
      class="mb-5 text-white bg-blue-100 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Назад
    </button>

    <form class="max-w-sm mx-auto">
      <div class="mb-5">
        <input
          type="text"
          id="first-name"
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          placeholder="Имя"
          v-model="teacher.firstName"
          required
        />
      </div>
      <div class="mb-5">
        <input
          type="text"
          id="last-name"
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          placeholder="Фамилия"
          v-model="teacher.lastName"
          required
        />
      </div>
      <div class="mb-5">
        <input
          type="text"
          id="middle-name"
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          placeholder="Отчество"
          v-model="teacher.middleName"
          required
        />
      </div>
      <Datepicker
        v-model="teacher.birthDate"
        class="shadow-sm my-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
      />
      <div class="relative">
        <select
          v-model="teacher.sex"
          class="shadow-sm my-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
        >
          <option value="0">Не выбран</option>
          <option value="1">М</option>
          <option value="2">Ж</option>
        </select>
      </div>
      <div class="mb-5">
        <input
          type="text"
          id="phone"
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          placeholder="Телефон"
          v-model="teacher.phone"
          required
        />
      </div>
      <button
        @click.prevent="toggleTeacherEvent"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        {{ isEdit ? 'Изменить' : 'Добавить' }}
      </button>
    </form>
  </div>
</template>
