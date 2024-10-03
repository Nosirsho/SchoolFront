<script setup>
import TeacherTableItem from './TeacherTableItem.vue'
import { onMounted, ref } from 'vue'
import axios from 'axios'

const items = ref([])

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
    <table class="min-w-full">
      <thead>
        <tr>
          <th
            class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
          >
            FirstName
          </th>
          <th
            class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
          >
            MiddleName
          </th>
          <th
            class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
          >
            LastName
          </th>
          <th
            class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
          >
            BirthDate
          </th>
          <th
            class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
          >
            Sex
          </th>
          <th class="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
        </tr>
      </thead>

      <tbody class="bg-white">
        <!--TeacherTableItem-->
        <TeacherTableItem
          v-for="(item, index) in items"
          :key="index"
          :firstName="item.firstName"
          :middle-name="item.middleName"
          :last-name="item.lastName"
          :birth-date="item.birthDate"
          :sex="item.sex"
        />
        <!--End TeacherTableItem-->
      </tbody>
    </table>
  </div>
</template>
