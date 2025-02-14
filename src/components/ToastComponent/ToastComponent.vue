<script setup>
const props = defineProps({
  isError: Boolean,
  meesage: String
})

const emit = defineEmits(['okButtonClick'])
</script>
<template>
  <div id="toast-container" class="fixed top-0 left-0 w-full h-full z-10 bg-gray-400 opacity-80">
    <div
      id="toast-simple"
      class="fixed top-1/3 right-1/3 z-30 content-center w-full h-1/6 max-w-lg p-4 text-gray-500 bg-gray-200 rounded-lg shadow-sm border-2 border-black-500"
      role="alert"
    >
      <div class="grid grid-cols-6">
        <div>
          <svg
            v-if="isError"
            class="w-10 h-10"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="green"
            viewBox="0 0 20 20"
          >
            <path
              d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"
            />
          </svg>
          <svg
            v-else
            class="w-10 h-10"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="red"
            viewBox="0 0 20 20"
          >
            <path
              d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"
            />
          </svg>
        </div>
        <div class="col-span-4">
          <div class="ps-4 text-xl font-normal">{{ props.meesage }}</div>
        </div>
        <div class="col-start-6">
          <button
            @click="emit('okButtonClick')"
            type="button"
            class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
