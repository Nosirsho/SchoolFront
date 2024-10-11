<script setup>
import Datepicker from 'vue3-datepicker'
const emit = defineEmits(['closeAddForm'])
</script>
<script>
import utils from '../../utils/utils.js'
import axios from 'axios'

export default {
  data() {
    return {
      teacher: {
        firstName: 'firstName',
        lastName: 'lastName',
        middleName: 'middleName',
        phone: '92-92-92-92',
        birthDate: null,
        gender: 1
      }
    }
  },
  methods: {
    addTeacher: async (teacher) => {
      console.log('1: ' + teacher.birthDate)
      console.log('2: ' + utils.formatDate(teacher.birthDate))
      axios
        .post('http://localhost:5296/Teacher', {
          firstName: teacher.firstName,
          lastName: teacher.lastName,
          middleName: teacher.middleName,
          phone: teacher.phone,
          birthDate: utils.formatDate(teacher.birthDate),
          sex: teacher.gender
        })
        .then((response) => {
          teacher = null
          console.log(response.data) // Handle successful response
        })
        .catch((error) => {
          console.error(error) // Handle errors
        })
    }
  }
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

      <Datepicker
        v-model="teacher.birthDate"
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
      <button
        @click.prevent="addTeacher(teacher)"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Добавить
      </button>
    </form>
  </div>
</template>
