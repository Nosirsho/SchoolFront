<script setup>
import DashCard from '@/components/DashCard/DashCard.vue'
import TeacherTable from '@/components/Tables/TeacherTable/TeacherTable.vue'
</script>
<template>
  <div class="container px-6 py-8 mx-auto">
    <h3 class="text-3xl font-medium text-gray-700">Dashboard</h3>

    <div class="mt-4">
      <div class="flex flex-wrap -mx-6">
        <!--DashCard-->
        <DashCard />
        <!--End DashCard-->
        <DashCard />
      </div>
    </div>

    <div class="mt-8"></div>

    <div class="flex flex-col mt-8">
      <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div
          class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg"
        >
          <!--TeacherTable-->
          <TeacherTable />
          <!--End TeacherTable-->
        </div>
      </div>
    </div>
  </div>
</template>
