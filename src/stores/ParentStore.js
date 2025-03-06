import { ref } from 'vue'
import { defineStore } from 'pinia'
import utils from '@/utils/utils'

const url = 'http://localhost:5296/parents/'

export const useParentStore = defineStore('parents', () => {
  const data = ref([])
  const error = ref(null)
  const showModal = ref([])
  const isLoading = ref(false)
  //Форма
  const formVisible = ref()
  const isEdit = ref(false)
  const currItemId = ref()
  const currentItemObj = ref([])
  //

  const getParentsList = async () => {
    isLoading.value = true
    try {
      const response = await utils.sendRequest('GET', url)
      if (response.state === 0) {
        showModalWindow(true, response.message)
        return
      }
      data.value = response
      error.value = null
    } catch (error) {
      error.value = error
      data.value = null
    } finally {
      isLoading.value = false
    }
  }

  const showModalWindow = (isError, msg) => {
    showModal.value.visible = true
    showModal.value.isError = isError
    showModal.value.message = msg
  }

  return {
    data,
    showModal,
    formVisible,
    isEdit,
    currItemId,
    currentItemObj,
    getParentsList
  }
})
