<script setup>
import Sidebar from './components/Sidebar/Sidebar.vue'
import Header from './components/Header/Header.vue'
import Main from './components/main/Main.vue'
import StudentEditForm from './components/Forms/StudentEditForm.vue';
</script>
<template>
  <StudentEditForm/>
  <div>
    <div x-data="{ sidebarOpen: false }" class="flex h-screen bg-gray-200">
      <div
        :class="sidebarOpen ? 'block' : 'hidden'"
        @click="sidebarOpen = false"
        class="fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden"
      ></div>
      <!--Sidebar-->
      <Sidebar />
      <!--End Sidebar-->
      <div class="flex flex-col flex-1 overflow-hidden">
        <!--Header-->
        <Header />
        <!--End Header-->
        <!--Main-->
        <Main />
        <!--End Main-->
      </div>
    </div>
  </div>
</template>
