<script setup>
const props = defineProps({
  isError: Boolean,
  meesage: String
})

const emit = defineEmits(['okButtonClick'])
</script>
<template>
  <div id="toast-container" class="fixed top-0 left-0 w-full h-full z-50 bg-gray-400 opacity-90">
    <div
      id="toast-simple"
      :class="[
        'fixed top-1/3 right-1/3 z-50 content-center w-full h-1/6 max-w-lg p-4 text-gray-700 bg-gray-100 rounded-lg shadow-sm border-4',
        isError ? 'border-red-500' : 'border-green-500'
      ]"
      role="alert"
    >
      <div class="grid grid-cols-6 items-center">
        <div>
          <svg
            v-if="isError"
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
          <svg
            v-else
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
        </div>
        <div class="col-span-4">
          <div class="ps-4 text-xl font-normal">{{ props.meesage }}</div>
        </div>
        <div class="col-start-6">
          <button
            @click="emit('okButtonClick')"
            type="button"
            :class="[
              'mx-2 border-2 focus:ring-4 hover:text-white focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center',
              isError
                ? 'border-red-700 hover:bg-red-800 focus:ring-red-300 text-red-700'
                : 'border-green-700 hover:bg-green-800 focus:ring-green-300 text-green-700'
            ]"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
