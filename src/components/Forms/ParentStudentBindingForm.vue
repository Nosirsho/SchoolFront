<script setup>
import { ref, onMounted } from 'vue'
import { useStudentStore } from '@/stores/StudentStore.js'
import SelectFilter from '../Items/SelectFilter.vue'
import { useParentStore } from '@/stores/ParentStore'

const studentStore = useStudentStore()
const parentStore = useParentStore()

const parentFullName = ref()
const childArray = ref([])

const studentData = ref([])
const onChangeHandle = async (query) => {
  await studentStore.searchByName(query)
  studentData.value = studentStore.data
}
const selectedHandle = (index, elem) => {
  if (index !== -1) {
    childArray.value.splice(index, 1, elem)
  }
}
const AddElement = () => {
  const elem = {
    id: '',
    childFullName: ''
  }
  childArray.value.push(elem)
}

const closeForm = () => {
  parentStore.bindFormVisible = false
}

const saveEditButtonClick = async () => {
  const parentId = parentStore.currentItemObj.id
  const data = childArray.value.map((ch) => ch.id)
  parentStore.bindParentStudents(parentId, data)
}

onMounted(async () => {
  await parentStore.getParentWithStudent(parentStore.currItemId)
  parentFullName.value = parentStore.currentItemObj.fullName
  childArray.value = parentStore.currentItemObj.children
  //   parent.value.lastName = parentStore.currentItemObj.lastName
  //   parent.value.middleName = parentStore.currentItemObj.middleName
  //   parent.value.sex = parentStore.currentItemObj.sex
  //   parent.value.phone = parentStore.currentItemObj.phone
})
</script>

<template>
  <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-60"></div>
  <div class="bg-gray-900 w-1/4 h-full fixed right-0 top-0 z-30 p-4">
    <button
      @click="closeForm"
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
      <div class="grid grid-cols-8 mb-2 text-center">
        <div
          class="col-span-8 bg-gray-700 text-teal-500 uppercase font-medium text-sm border border-gray-600 rounded-lg"
        >
          <p class="p-2.5">{{ parentFullName }}</p>
        </div>
      </div>

      <SelectFilter
        v-for="(child, index) in childArray"
        :key="child.id"
        :data="studentData"
        :inputText="child.childFullName"
        :index="index"
        caption="Студент"
        @on-change="onChangeHandle"
        @selected="selectedHandle"
      />

      <div class="text-right">
        <button
          @click.prevent="AddElement"
          class="text-center mt-2 p-1.5 text-teal-600 font-bold bg-gray-700 border border-gray-300 hover:bg-gray-800 rounded-lg focus:ring-2 focus:ring-blue-300"
        >
          Добавить
        </button>
      </div>
      <div class="text-right">
        <button
          @click.prevent="saveEditButtonClick"
          class="text-center mt-2 p-1.5 text-teal-600 font-bold bg-gray-700 border border-gray-300 hover:bg-gray-800 rounded-lg focus:ring-2 focus:ring-blue-300"
        >
          Сохранить
        </button>
      </div>
    </form>
  </div>
</template>
