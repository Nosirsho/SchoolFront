import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import utils from '@/utils/utils'

const url = 'http://localhost:5296/Student/'

export const useStudentStore = defineStore('students', () => {
  const data = ref([])
  const error = ref(null)
  const showModal = ref([])
  const isLoading = ref(false)
  const currentStudent = ref(null)

  const searchByName = async (params) => {
    isLoading.value = true
    try {
      const response = await utils.sendRequest('GET', `${url}search?search=${params}`)
      data.value = response
      error.value = null
    } catch (error) {
      error.value = error
      data.value = null
    } finally {
      isLoading.value = false
    }
  }

  const getStudents = async () => {
    isLoading.value = true
    try {
      const response = await utils.sendRequest('GET', url)
      data.value = response
      error.value = null
    } catch (error) {
      error.value = error
      data.value = null
    } finally {
      isLoading.value = false
    }
  }

  const getStudentById = async (id) => {
    isLoading.value = true
    try {
      const response = await utils.sendRequest('GET', `${url}${id}`)
      currentStudent.value = response
      error.value = null
    } catch (error) {
      error.value = error
      currentStudent.value = null
    } finally {
      isLoading.value = false
    }
  }

  const editStudent = async (params) => {
    isLoading.value = true
    try {
      const response = await utils.sendRequest('PUT', `${url}${params.id}`, params)
      if (response.state === 0) {
        showModalWindow(true, response.message)
        return
      }
      const student = response
      showModalWindow(true, 'Успешно изменен!')
      const index = data.value.findIndex((item) => item.id === student.id)
      if (index !== -1) {
        data.value.splice(index, 1, student)
      }
      error.value = null
    } catch (error) {
      error.value = error
      data.value = null
    } finally {
      isLoading.value = false
    }
  }

  const addStudent = async (params) => {
    isLoading.value = true
    try {
      const response = await utils.sendRequest('POST', `${url}`, params)
      if (response.state === 0) {
        showModalWindow(false, response.message)
        return
      }
      showModalWindow(true, 'Успешно добавлен!')
      const student = response
      data.value.push(student)
      error.value = null
    } catch (error) {
      error.value = error
      data.value = null
    } finally {
      isLoading.value = false
    }
  }

  const deleteStudent = async (id) => {
    isLoading.value = true
    try {
      const response = await utils.sendRequest('DELETE', `${url}${id}`)
      const studentId = response
      data.value = data.value.filter((t) => t.id !== studentId)
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

  const studentsCount = computed(() => data.value.length)
  const showModalVisible = computed(() => showModal.value.visible)

  return {
    data,
    error,
    showModal,
    isLoading,
    currentStudent,
    searchByName,
    getStudents,
    getStudentById,
    editStudent,
    addStudent,
    deleteStudent,
    studentsCount,
    showModalVisible
  }
})
