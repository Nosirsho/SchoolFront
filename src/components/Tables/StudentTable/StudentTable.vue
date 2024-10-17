<script setup>
import { provide, onMounted, ref } from 'vue'
import axios from 'axios'

import StudentTableItem from './StudentTableItem.vue'
import StudentEditForm from '../../Forms/StudentEditForm.vue'

const items = ref([])
const isVisibleForm = ref(false)
const editStudentId = ref(null)
const isEdit = ref(false)

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
  <div>
    <StudentEditForm
      @close-add-form="closeAddForm"
      @addStudent="handleAddStudent"
      @editStudent="handleEditStudent"
      :editStudentId="editStudentId"
      :isEdit="isEdit"
      v-if="isVisibleForm"
    />
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

      <tbody class="bg-white">
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
        />
        <!--End StudentTableItem-->
      </tbody>
    </table>
  </div>
</template>
