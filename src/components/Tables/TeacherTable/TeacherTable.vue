<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { useAutoAnimate } from '@formkit/auto-animate/vue'

import TeacherTableItem from '&/Tables/TeacherTable/TeacherTableItem.vue'
import TeacherEditForm from '&/Forms/TeacherEditForm.vue'

const [parent] = useAutoAnimate(/* optional config */)

const items = ref([])
const isVisibleForm = ref(false)
const editTeacherId = ref(null)
const isEdit = ref(false)
const searchInput = ref()

const handleAddTeacher = (teacher) => {
  items.value.push(teacher)
}
const handleEditTeacher = (teacher) => {
  const index = items.value.findIndex((item) => item.id === teacher.id)
  if (index !== -1) {
    items.value.splice(index, 1, teacher)
  }
}

const handleTeacherEdit = (teacherId) => {
  isVisibleForm.value = true
  editTeacherId.value = teacherId
  isEdit.value = true
}
const handleDeleteTeacher = (teacherId) => {
  items.value = items.value.filter((t) => t.id !== teacherId)
}
const openAddForm = async () => {
  isVisibleForm.value = true
  isEdit.value = false
}
const closeAddForm = async () => {
  isVisibleForm.value = false
}

const searchTeachers = async () => {
  try {
    await axios
      .get('http://localhost:5296/Teacher/search', { params: { search: searchInput.value } })
      .then((response) => {
        items.value = response.data
      })
  } catch (e) {
    console.log(e)
  }
}

onMounted(async () => {
  try {
    const { data } = await axios.get('http://localhost:5296/Teacher')
    items.value = data
  } catch (e) {
    console.log(e)
  }
})
</script>
<template>
  <div ref="parent">
    <TeacherEditForm
      @close-add-form="closeAddForm"
      @addTeacher="handleAddTeacher"
      @editTeacher="handleEditTeacher"
      :editTeacherId="editTeacherId"
      :isEdit="isEdit"
      v-if="isVisibleForm"
    />

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
          @click="searchTeachers"
          class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search
        </button>
      </div>
    </div>

    <table class="min-w-full">
      <thead>
        <tr class="border-2 border-gray-300 bg-gray-100">
          <th
            class="px-6 py-1 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase"
          >
            ФИО
          </th>
          <th
            class="px-6 py-1 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase"
          >
            Дата рожд
          </th>
          <th
            class="px-6 py-1 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase"
          >
            Телефон
          </th>
          <th
            class="px-6 py-1 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase"
          >
            Пол
          </th>
          <th
            class="px-4 py-1 text-xs font-medium leading-4 tracking-wider text-right text-green-500 uppercase"
          >
            <button
              @click="openAddForm"
              class="px-1 text-blue-400 border-2 border-blue-400 text-center hover:bg-blue-500 hover:text-white focus:ring-2 focus:ring-blue-300 rounded-lg text-sm text-center inline-flex items-center"
            >
              + Add
            </button>
          </th>
        </tr>
      </thead>

      <tbody class="bg-white" v-auto-animate>
        <!--TeacherTableItem-->
        <TeacherTableItem
          v-for="(item, index) in items"
          :key="index"
          :id="item.id"
          :full-name="item.fullName"
          :birth-date="item.birthDate"
          :phone="item.phone"
          :sex="item.sex"
          @editTeacher="handleTeacherEdit"
          @deleteTeacher="handleDeleteTeacher"
        />
        <!--End TeacherTableItem-->
      </tbody>
    </table>
  </div>
</template>
