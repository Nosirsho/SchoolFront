<script setup>
import { provide, onMounted, ref } from 'vue'
import axios from 'axios'

import TeacherTableItem from './TeacherTableItem.vue'
import TeacherEditForm from '../../Forms/TeacherEditForm.vue'


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
    const { data } = await axios.get('http://localhost:5296/Teacher')
    items.value = data
    console.log(items.value)
  } catch (e) {
    console.log(e)
  }
})


</script>
<template>
  <div>
    <TeacherEditForm @close-add-form="closeAddForm" v-if="isVisibleForm" />
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
            Дата рожд
          </th>
          <th
            class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
          >
            Телефон
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
        <!--TeacherTableItem-->
        <TeacherTableItem
          v-for="(item, index) in items"
          :key="index"
          :full-name="item.fullName"
          :birth-date="item.birthDate"
          :phone="item.phone"
          :sex="item.sex"
        />
        <!--End TeacherTableItem-->
      </tbody>
    </table>
  </div>
</template>
