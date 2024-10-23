<script setup>
import { provide, onMounted, ref } from 'vue'
import axios from 'axios'
import { useAutoAnimate } from '@formkit/auto-animate/vue'

import StudentTableItem from './StudentTableItem.vue'
import StudentEditForm from '../../Forms/StudentEditForm.vue'

const [parent] = useAutoAnimate()

const items = ref([])
const isVisibleForm = ref(false)
const editStudentId = ref(null)
const isEdit = ref(false)
const searchInput = ref()

const handleAddStudent = (student) => {
  items.value.push(student)
}
const handleEditStudent = (student) => {
  const index = items.value.findIndex((item) => item.id === student.id)
  if (index !== -1) {
    items.value.splice(index, 1, student)
  }
}

const handleStudentEdit = (studentId) => {
  isVisibleForm.value = true
  editStudentId.value = studentId
  isEdit.value = true
}
const handleDeleteStudent = (studentId) => {
  items.value = items.value.filter((t) => t.id !== studentId)
}

const openAddForm = async () => {
  isVisibleForm.value = true
  isEdit.value = false
}
const closeAddForm = async () => {
  isVisibleForm.value = false
}

provide('AddFormActions', {
  openAddForm,
  closeAddForm
})

const searchStudents = async () => {
  try {
    await axios
      .get('http://localhost:5296/Student/search', { params: { search: searchInput.value } })
      .then((response) => {
        items.value = response.data
        console.log(response.data)
      })
  } catch (e) {
    console.log(e)
  }
}

onMounted(async () => {
  try {
    const { data } = await axios.get('http://localhost:5296/Student')
    items.value = data
  } catch (e) {
    console.log(e)
  }
})
</script>
<template>
  <div ref="parent">
    <StudentEditForm
      @close-add-form="closeAddForm"
      @addStudent="handleAddStudent"
      @editStudent="handleEditStudent"
      :editStudentId="editStudentId"
      :isEdit="isEdit"
      v-if="isVisibleForm"
    />
    <!--Search Input Start-->
    <div class="max-auto mx-auto">
      <label
        for="default-search"
        class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >Search</label
      >
      <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            class="w-4 h-4 text-gray-500 dark:text-gray-400"
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
          class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder='Поиск по шаблону "Фамилия Имя Отчество"'
          required
        />
        <button
          @click="searchStudents"
          class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search
        </button>
      </div>
    </div>
    <!--Search Input End-->

    <table class="min-w-full">
      <thead>
        <tr>
          <th
            class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
          >
            ФИО
          </th>
          <th
            class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
          >
            Дата рождения
          </th>
          <th
            class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
          >
            Класс
          </th>
          <th
            class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
          >
            Пол
          </th>
          <th
            class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-right text-green-500 uppercase border-b border-gray-200 bg-gray-50"
          >
            <button
              @click="openAddForm"
              class="inline-flex items-center px-4 py-2 bg-blue-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              + Add
            </button>
          </th>
        </tr>
      </thead>

      <tbody class="bg-white" v-auto-animate>
        <!--StudentTableItem-->
        <StudentTableItem
          v-for="(item, index) in items"
          :key="index"
          :id="item.id"
          :full-name="item.fullName"
          :birth-date="item.birthDate"
          :grade-level="item.gradeLevel"
          :sex="item.sex"
          @editStudent="handleStudentEdit"
          @deleteStudent="handleDeleteStudent"
        />
        <!--End StudentTableItem-->
      </tbody>
    </table>
  </div>
</template>
