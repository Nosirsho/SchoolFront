import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import utils from '@/utils/utils'

const url = 'http://localhost:8010/teachers/'

export const useTeacherStore = defineStore('teacher', () => {
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

  const getTeachersList = async () => {
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

  const createTeacher = async (teacherData) => {
    isLoading.value = true
    try {
      const response = await utils.sendRequest('POST', url, teacherData)
      if (response.state === 0) {
        showModalWindow(true, response.message)
        return
      }
      const teacher = response
      formVisible.value = false
      data.value.push(teacher)
      showModalWindow(false, 'Успешно!')
      error.value = null
    } catch (error) {
      error.value = error
    } finally {
      isLoading.value = false
    }
  }

  const editTeacher = async (id, teacherData) => {
    isLoading.value = true
    try {
      const response = await utils.sendRequest('PUT', url + id, teacherData)
      if (response.state === 0) {
        showModalWindow(true, response.message)
        return
      }
      const teacher = response
      formVisible.value = false
      showModalWindow(false, 'Успешно!')
      const index = data.value.findIndex((item) => item.id === teacher.id)
      if (index !== -1) {
        data.value.splice(index, 1, teacher)
      }
      error.value = null
    } catch (error) {
      error.value = error
    } finally {
      isLoading.value = false
    }
  }

  const deleteTeacher = async (id) => {
    isLoading.value = true
    try {
      const response = await utils.sendRequest('DELETE', `${url}${id}`)
      const teacherId = response
      const indexToDelete = data.value.findIndex((t) => t.id === teacherId)
      data.value.splice(indexToDelete, 1)
    } catch (error) {
      error.value = error
      data.value = null
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
  const teachersCount = computed(() => data.value && data.value.length > 0 ?  data.value.length : 0)

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
    getTeachersList,
    createTeacher,
    showModalVisible,
    getParentById,
    editTeacher,
    deleteTeacher,
    getParentWithStudent,
    bindParentStudents,
    teachersCount
  }
})
