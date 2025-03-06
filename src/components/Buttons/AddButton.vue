<script setup>
const emit = defineEmits(['onAddClick'])
const onAddClick = () => {
  emit('onAddClick')
}
</script>
<template>
  <button
    @click="onAddClick"
    type="button"
    class="p-1 text-green-400 border-2 border-green-400 text-center hover:bg-green-500 hover:text-white focus:ring-2 focus:ring-green-300 rounded-lg text-sm text-center inline-flex items-center"
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none">
      <path
        id="Vector"
        d="M3 14V15C3 16.1046 3.89543 17 5 17L19 17C20.1046 17 21 16.1046 21 15L21 13C21 11.8954 20.1046 11 19 11H13M10 8H7M7 8H4M7 8V5M7 8V11"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </button>
</template>
