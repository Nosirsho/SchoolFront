import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const url = 'http://localhost:5296/Lesson/'

export const useLessonStore = defineStore('lesson', () => {
  const data = ref([])
  const error = ref(null)
  const isLoading = ref(false)

  const dataCount = computed(() => data.value.length)

  const getlessons = async () => {
    isLoading.value = true
    try {
      const response = await axios.get(url)
      data.value = response.data
      console.log('PINIAlessonsData.value' + data.value)
      error.value = null
    } catch (error) {
      error.value = error
      data.value = null
    } finally {
      isLoading.value = false
    }
  }

  return {
    data,
    dataCount,
    getlessons
  }
})
