<script setup>
defineProps({
  title: String
})
</script>
<template>
  <div>
    <li>
      <a
        href="#"
        class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
      >
        <span class="ms-3">{{ title }}</span>
      </a>
    </li>
  </div>
</template>
