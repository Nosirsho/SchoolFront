<script setup>
import SidebarItem from './SidebarItem.vue'
</script>
<template>
  <div>
    <aside
      id="default-sidebar"
      class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <ul class="space-y-2 font-medium">
          <RouterLink to="/students"><SidebarItem title="Students" /></RouterLink>
          <RouterLink to="/teachers"><SidebarItem title="Teachers" /></RouterLink>
          <SidebarItem title="GradeLevel" />
          <SidebarItem title="Parents" />
        </ul>
      </div>
    </aside>
  </div>
</template>
