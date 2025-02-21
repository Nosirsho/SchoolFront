<script setup>
import { ref, onMounted } from 'vue'
import utils from '@/utils/utils'

const props = defineProps({
  date: {
    type: Date,
    required: false
  }
})
const emit = defineEmits(['changeDate'])

const monthYearValue = ref()
onMounted(async () => {
  monthYearValue.value = utils.formatDate(new Date()).substring(0, 7)
})

const addMonth = () => {
    props.date.setDate(props.date.getDate(props.date.setMonth(props.date.getMonth()+1)))
    monthYearValue.value = utils.formatDate(props.date).substring(0, 7)
    props.date.setDate(1)
    emit('changeDate', utils.formatDate(props.date))
}
const reduceMonth = () => {
    props.date.setDate(props.date.getDate(props.date.setMonth(props.date.getMonth()-1)))
    monthYearValue.value = utils.formatDate(props.date).substring(0, 7)
    props.date.setDate(1)
    emit('changeDate', utils.formatDate(props.date))
}

</script>
<template>
<button 
    @click="reduceMonth"
    type="button" 
    class="m-2 p-2 text-white bg-blue-200 border border-blue-400 hover:bg-blue-200 rounded-lg focus:ring-2 focus:ring-blue-300"
    >
    <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
    <path stroke="rgba(96, 165, 250)" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0l4-4m-4 4l4 4"/>
    </svg>
</button>
    <input
    v-model="monthYearValue"
    type="month"
    class="w-25 my-2 p-2 rounded-lg text-sm text-gray-900 border border-blue-400 bg-gray-100 focus:border-blue-500"
    />
  <button 
    @click="addMonth"
    type="button" 
    class="m-2 p-2 text-white bg-blue-200 border border-blue-400 hover:bg-blue-200 rounded-lg focus:ring-2 focus:ring-blue-300">
      <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
        <path stroke="rgba(96, 165, 250)" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
       </svg>
  </button>
</template>