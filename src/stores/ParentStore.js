import { ref, computed } from 'vue'
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
  const bindFormVisible = ref(false)
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

  const createParent = async (data) => {
    isLoading.value = true
    try {
      const response = await utils.sendRequest('POST', url, data)
      if (response.state === 0) {
        showModalWindow(true, response.message)
        return
      }
      formVisible.value = false
      showModalWindow(false, 'Успешно!')
      error.value = null
    } catch (error) {
      error.value = error
    } finally {
      isLoading.value = false
    }
  }

  const editParent = async (id, data) => {
    isLoading.value = true
    try {
      const response = await utils.sendRequest('PUT', url + id, data)
      if (response.state === 0) {
        showModalWindow(true, response.message)
        return
      }
      formVisible.value = false
      showModalWindow(false, 'Успешно!')
      error.value = null
    } catch (error) {
      error.value = error
    } finally {
      isLoading.value = false
    }
  }

  const getParentById = async (id) => {
    isLoading.value = true
    try {
      const response = await utils.sendRequest('GET', url + id)
      if (response.state === 0) {
        showModalWindow(true, response.message)
        return
      }
      currentItemObj.value = response
    } catch (error) {
      error.value = error
    } finally {
      isLoading.value = false
    }
  }

  const getParentWithStudent = async (id) => {
    isLoading.value = true
    try {
      const response = await utils.sendRequest('GET', url + 'bind/' + id)
      if (response.state === 0) {
        showModalWindow(true, response.message)
        return
      }
      currentItemObj.value = response
    } catch (error) {
      error.value = error
    } finally {
      isLoading.value = false
    }
  }
  const bindParentStudents = async (parentid, data) => {
    isLoading.value = true
    try {
      const response = await utils.sendRequest('POST', url + 'bind/' + parentid, data)
      if (response.state === 0) {
        showModalWindow(true, response.message)
        return
      }
      currentItemObj.value = response
    } catch (error) {
      error.value = error
    } finally {
      isLoading.value = false
    }
  }

  //Модальное окно
  const showModalVisible = computed(() => showModal.value.visible)
  const showModalWindow = (isError, msg) => {
    showModal.value.visible = true
    showModal.value.isError = isError
    showModal.value.message = msg
  }
  //End Модальное окно

  return {
    data,
    showModal,
    formVisible,
    bindFormVisible,
    isEdit,
    currItemId,
    currentItemObj,
    getParentsList,
    createParent,
    showModalVisible,
    getParentById,
    editParent,
    getParentWithStudent,
    bindParentStudents
  }
})
