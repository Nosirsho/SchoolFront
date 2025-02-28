<script setup>
const emit = defineEmits(['onDeleteClick'])
const onDeleteClick = () => {
  emit('onDeleteClick')
}
</script>
<template>
  <button
    @click="onDeleteClick"
    type="button"
    class="p-1 text-red-400 border-2 border-red-400 text-center hover:bg-red-500 hover:text-white focus:ring-2 focus:ring-red-300 rounded-lg text-sm text-center inline-flex items-center"
  >
    <svg
      class="w-3 h-3"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 48 48"
    >
      <path
        fill-rule="evenodd"
        d="M21.5 4.5H26.501V43.5H21.5z"
        transform="rotate(45.001 24 24)"
        clip-rule="evenodd"
      />
      <path
        fill-rule="evenodd"
        d="M21.5 4.5H26.5V43.501H21.5z"
        transform="rotate(135.008 24 24)"
        clip-rule="evenodd"
      />
    </svg>
  </button>
</template>
