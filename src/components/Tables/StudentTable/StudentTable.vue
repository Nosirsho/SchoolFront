<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import StudentTableItem from './StudentTableItem.vue'

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
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">FirstName</th>
          <th scope="col" class="px-6 py-3">LastName</th>
          <th scope="col" class="px-6 py-3">MiddleName</th>
          <th scope="col" class="px-6 py-3">BirthDate</th>
          <th scope="col" class="px-6 py-3">Sex</th>
          <th scope="col" class="px-6 py-3"></th>
        </tr>
      </thead>
      <tbody>
        <StudentTableItem
          v-for="(item, index) in items"
          :key="index"
          :first-name="item.firstName"
          :last-name="item.lastName"
          :middle-name="item.middleName"
          :birth-date="item.birthDate"
        />
      </tbody>
    </table>
  </div>
</template>
