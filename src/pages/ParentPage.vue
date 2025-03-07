<script setup>
import { useStudentStore } from '@/stores/StudentStore.js'
import ToastComponent from '@/components/ToastComponent/ToastComponent.vue'
import ParentTable from '@/components/Tables/ParentTable/ParentTable.vue';
//import ParentCrEdForm from '@/components/Forms/ParentCrEdForm.vue';
import TestForm from '@/components/Forms/TestForm.vue';

const studentStore = useStudentStore()

const handleOkButtonClick = () => {
  studentStore.showModal.visible = false
}

// const parent = {
//   firstName: 'firstName',
//   lastName: 'lastName',
//   middleName: 'middleName',
//   sex: 0,
//   phone: '92-992-92-92'
// }
</script>
<template>
  <ToastComponent
    v-if="studentStore.showModalVisible"
    :isError="studentStore.showModal.isError"
    :meesage="studentStore.showModal.message"
    @okButtonClick="handleOkButtonClick"
  />
  <TestForm/>
  <div class="container px-6 py-8 mx-auto">
    <h3 class="text-3xl font-medium text-gray-700">Parents</h3>
    <div class="flex flex-col mt-1">
      <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div
          class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-400 shadow sm:rounded-lg"
        >
          <!--ParentTable-->
          <ParentTable/>
          <!--End ParentTable-->
        </div>
      </div>
    </div>
  </div>
</template>
