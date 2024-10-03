<script setup>
import StudentTableItem from './StudentTableItem.vue'
import { onMounted, ref } from 'vue'
import axios from 'axios'

const items = ref([])

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
          <th class="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
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
