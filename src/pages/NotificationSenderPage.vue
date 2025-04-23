<script setup>
import NotificationSenderTable from '@/components/Tables/NotificationSenderTable/NotificationSenderTable.vue'
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
  <div class="container mx-auto">
    <div class="mt-8"></div>

    <div class="flex flex-col mt-8">
      <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div
          class="inline-block p-1 overflow-hidden align-middle border-2 border-blue-300 rounded-lg"
        >
        <h1>StudentGradeBook</h1>
          <!--StudenTable-->
          <NotificationSenderTable />
          <!--End StudenTable-->
        </div>
      </div>
    </div>
  </div>
</template>
