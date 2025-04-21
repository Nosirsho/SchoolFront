import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import utils from '@/utils/utils'

const url = 'http://localhost:8010/Lessons/'

export const useLessonStore = defineStore('lesson', () => {
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

  const dataCount = computed(() => data.value.length)

  const getLessonsList = async (returning) => {
    isLoading.value = true
    try {
      const response = await utils.sendRequest('GET', url)
      if (response.state === 0) {
        showModalWindow(true, response.message)
        return
      }
      data.value = response
      if (returning) {
        return data.value
      }
      error.value = null
    } catch (error) {
      error.value = error
      showModalWindow(true, error.message)
      data.value = null
    } finally {
      isLoading.value = false
    }
  }

  const getLessonById = async (id) => {
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

  const editLesson = async (id, lData) => {
    isLoading.value = true
    try {
      const response = await utils.sendRequest('PUT', url + id, lData)
      if (response.state === 0) {
        showModalWindow(true, response.message)
        return
      }
      const gradeLevel = response
      formVisible.value = false
      showModalWindow(false, 'Успешно!')
      const index = data.value.findIndex((item) => item.id === gradeLevel.id)
      if (index !== -1) {
        data.value.splice(index, 1, gradeLevel)
      }
      error.value = null
    } catch (error) {
      error.value = error
    } finally {
      isLoading.value = false
    }
  }
  const createLesson = async (lData) => {
    isLoading.value = true
    try {
      const response = await utils.sendRequest('POST', url, lData)
      if (response.state === 0) {
        showModalWindow(true, response.message)
        return
      }
      const gradeLevel = response
      formVisible.value = false
      data.value.push(gradeLevel)
      showModalWindow(false, 'Успешно!')
      error.value = null
    } catch (error) {
      error.value = error
    } finally {
      isLoading.value = false
    }
  }
  const deleteLesson = async (id) => {
    isLoading.value = true
    try {
      const response = await utils.sendRequest('DELETE', `${url}${id}`)
      const lessonId = response
      showModalWindow(false, 'Успешно удален!')
      const indexToDelete = data.value.findIndex((t) => t.id === lessonId)
      data.value.splice(indexToDelete, 1)
    } catch (error) {
      error.value = error
      data.value = null
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
    showModalVisible,
    formVisible,
    isEdit,
    currItemId,
    currentItemObj,
    dataCount,
    getLessonsList,
    getLessonById,
    editLesson,
    createLesson,
    deleteLesson
  }
})
