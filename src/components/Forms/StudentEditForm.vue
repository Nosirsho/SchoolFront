<script setup>
import { onMounted, ref } from 'vue'
import Datepicker from 'vue3-datepicker'
import utils from '@/utils/utils.js'
import { useStudentStore } from '@/stores/StudentStore.js'

const studentStore = useStudentStore()
const props = defineProps({
  editStudentId: {
    type: String,
    required: false
  },
  isEdit: {
    type: Boolean,
    required: false
  }
})

const gradeLevels = ref([])
const selectedGradeLevel = ref()
const student = ref({
  firstName: '',
  lastName: '',
  middleName: '',
  birthDate: null,
  sex: 0
})

const toggleStudentEvent = () => {
  props.isEdit ? editStudentResp() : addStudentResp()
}

const addStudentResp = async () => {
  const params = {
    firstName: student.value.firstName,
    lastName: student.value.lastName,
    middleName: student.value.middleName,
    birthDate: utils.formatDate(student.value.birthDate),
    sex: parseInt(student.value.sex),
    gradeLevelId: selectedGradeLevel.value
  }
  await studentStore.addStudent(params)
  emit('closeAddForm')
}

const editStudentResp = async () => {
  const params = {
    id: student.value.id,
    firstName: student.value.firstName,
    lastName: student.value.lastName,
    middleName: student.value.middleName,
    birthDate: student.value.birthDate,
    sex: parseInt(student.value.sex),
    gradeLevelId: selectedGradeLevel.value
  }
  await studentStore.editStudent(params)
  emit('closeAddForm')
}

onMounted(async () => {
  if (props.isEdit) {
    await studentStore.getStudentById(props.editStudentId)
    student.value = studentStore.currentStudent
    student.value.birthDate = new Date(student.value.birthDate)
    selectedGradeLevel.value = student.value.gradeLevelId
  }

  try {
    //const { data } = await axios.get('http://localhost:5296/GradeLevel')
    const data = await utils.sendRequest('GET', 'http://localhost:5296/GradeLevel')
    gradeLevels.value = data
  } catch (e) {
    console.log(e)
  }
})

const emit = defineEmits(['closeAddForm'])
</script>

<template>
  <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-60"></div>
  <div class="bg-gray-900 w-1/4 h-full fixed right-0 top-0 z-30 p-4">
    <button
      @click.prevent="() => emit('closeAddForm')"
      type="submit"
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
          <p class="p-2.5">Имя</p>
        </div>
        <input
          type="text"
          id="first-name"
          class="col-span-6 shadow-sm bg-gray-800 border border-gray-600 text-gray-200 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Имя"
          v-model="student.firstName"
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
          v-model="student.lastName"
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
          v-model="student.middleName"
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
          v-model="student.birthDate"
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
          v-model="student.sex"
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
          <p class="p-2.5">Класс</p>
        </div>
        <select
          v-model="selectedGradeLevel"
          class="col-span-6 shadow-sm bg-gray-800 border border-gray-600 text-gray-400 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
          <option v-for="gradeLevel in gradeLevels" :key="gradeLevel.id" :value="gradeLevel.id">
            {{ gradeLevel.name }}
          </option>
        </select>
      </div>

      <div class="text-right">
        <button
          @click.prevent="toggleStudentEvent"
          class="text-center mt-2 p-1.5 text-teal-600 font-bold bg-gray-700 border border-gray-300 hover:bg-gray-800 rounded-lg focus:ring-2 focus:ring-blue-300"
        >
          {{ isEdit ? 'Изменить' : 'Добавить' }}
        </button>
      </div>
    </form>
  </div>
</template>
