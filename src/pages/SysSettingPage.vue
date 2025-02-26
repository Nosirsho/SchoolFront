<script setup>
import ToastComponent from '@/components/ToastComponent/ToastComponent.vue'
import { useGradeBookStore } from '@/stores/GradeBookStore.js'

const gradeBookStore = useGradeBookStore()
const handleOkButtonClick = () => {
  gradeBookStore.showModal.visible = false
}
</script>
<template>
  <ToastComponent
    v-if="gradeBookStore.showModalVisible"
    :isError="gradeBookStore.showModal.isError"
    :meesage="gradeBookStore.showModal.message"
    @okButtonClick="handleOkButtonClick"
  />
  <div class="container m-2">
    <div class="grid grid-cols-3 gap-4 w-2/3 bg-white p-2 border-2 border-indigo-600 rounded-lg">
      <input
        type="text"
        id="code"
        class="shadow-sm bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg w-1/2 p-2.5"
        placeholder="Код"
        required
      />
      <input
        type="text"
        id="code"
        class="shadow-sm bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg w-2/3 p-2.5"
        placeholder="Код"
        required
      />
    </div>
  </div>
</template>
