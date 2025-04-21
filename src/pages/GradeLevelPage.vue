<script setup>
import { useGradeLevelStore } from '@/stores/GradeLevelStore.js'
import ToastComponent from '@/components/ToastComponent/ToastComponent.vue'
import GradeLevelTable from '@/components/Tables/GradeLevelTable/GradeLevelTable.vue'
import GradeLevelCrEdForm from '@/components/Forms/GradeLevelCrEdForm.vue';

const gradeLevelStore = useGradeLevelStore()

const handleOkButtonClick = () => {
  gradeLevelStore.showModal.visible = false
}
</script>
<template>
  <ToastComponent
    v-if="gradeLevelStore.showModalVisible"
    :isError="gradeLevelStore.showModal.isError"
    :meesage="gradeLevelStore.showModal.message"
    @okButtonClick="handleOkButtonClick"
  />
  <GradeLevelCrEdForm v-if="gradeLevelStore.formVisible" :isEdit="gradeLevelStore.isEdit" />
  <div class="container px-6 py-8 mx-auto">
    <h3 class="text-3xl font-medium text-gray-700">GradeLevel</h3>
    <div class="flex flex-col mt-1">
      <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div
          class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-400 shadow sm:rounded-lg"
        >
          <!--ParentTable-->
          <GradeLevelTable />
          <!--End ParentTable-->
        </div>
      </div>
    </div>
  </div>
</template>
