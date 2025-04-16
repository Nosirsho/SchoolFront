<script setup>
import { useTeacherStore } from '@/stores/TeacherStore.js'
import ToastComponent from '@/components/ToastComponent/ToastComponent.vue'
import TeacherTable from '@/components/Tables/TeacherTable/TeacherTable.vue'
import TeacherCrEdForm from '@/components/Forms/TeacherCrEdForm.vue'

const teacherStore = useTeacherStore()

const handleOkButtonClick = () => {
  teacherStore.showModal.visible = false
}
</script>
<template>
  <ToastComponent
    v-if="teacherStore.showModalVisible"
    :isError="teacherStore.showModal.isError"
    :meesage="teacherStore.showModal.message"
    @okButtonClick="handleOkButtonClick"
  />
  <TeacherCrEdForm v-if="teacherStore.formVisible" :isEdit="teacherStore.isEdit" />

  <div class="container px-6 py-8 mx-auto">
    <h3 class="text-3xl font-medium text-gray-700">Teachers {{ teacherStore.teachersCount }}</h3>
    <div class="flex flex-col mt-1">
      <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div
          class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-400 shadow sm:rounded-lg"
        >
          <!--ParentTable-->
          <TeacherTable />
          <!--End ParentTable-->
        </div>
      </div>
    </div>
  </div>
</template>
