<script setup>
import { provide, onMounted, ref } from 'vue'
import axios from 'axios'

import StudentTableItem from './StudentTableItem.vue'
import StudentEditForm from '../../Forms/StudentEditForm.vue'

const items = ref([])

const isVisibleForm = ref(false)
const openAddForm = async () => {
  isVisibleForm.value = true
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
    console.log(items.value)
  } catch (e) {
    console.log(e)
  }
})
</script>
<template>
  <div>
    <StudentEditForm @close-add-form="closeAddForm" v-if="isVisibleForm" />
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
          :full-name="item.fullName"
          :birth-date="item.birthDate"
          :grade-level="item.gradeLevel"
          :sex="item.sex"
        />
        <!--End StudentTableItem-->
      </tbody>
    </table>
  </div>
</template>
