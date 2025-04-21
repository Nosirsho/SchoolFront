<script setup>
import { useLessonStore } from '@/stores/LessonStore.js'
import ToastComponent from '@/components/ToastComponent/ToastComponent.vue'
import LessonCrEdForm from '@/components/Forms/LessonCrEdForm.vue'
import LessonTable from '@/components/Tables/LessonTable/LessonTable.vue'

const lessonStore = useLessonStore()

const handleOkButtonClick = () => {
  lessonStore.showModal.visible = false
}
</script>
<template>
  <ToastComponent
    v-if="lessonStore.showModalVisible"
    :isError="lessonStore.showModal.isError"
    :meesage="lessonStore.showModal.message"
    @okButtonClick="handleOkButtonClick"
  />
  <LessonCrEdForm v-if="lessonStore.formVisible" :isEdit="lessonStore.isEdit" />
  <div class="container px-6 py-8 mx-auto">
    <h3 class="text-3xl font-medium text-gray-700">Предмет</h3>
    <div class="flex flex-col mt-1">
      <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div
          class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-400 shadow sm:rounded-lg"
        >
          <!--ParentTable-->
          <LessonTable />
          <!--End ParentTable-->
        </div>
      </div>
    </div>
  </div>
</template>
