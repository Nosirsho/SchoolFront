<script setup>
const emit = defineEmits(['onSaveClick'])
const onSaveClick = () => {
    emit('onSaveClick')
}
</script>
<template>
  <button
    @click="onSaveClick"
    type="button"
    class="p-1 text-green-400 border-2 border-green-400 text-center hover:bg-green-500 hover:text-white focus:ring-2 focus:ring-green-300 rounded-lg text-sm text-center inline-flex items-center"
  >
    <svg
      class="w-3 h-3"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fill-rule="evenodd"
        d="M16.707 5.293a1 1 0 0 1 0 1.414l-8 8a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 1.414-1.414L8 12.586l7.293-7.293a1 1 0 0 1 1.414 0z"
        clip-rule="evenodd"
      />
    </svg>
  </button>
</template>
