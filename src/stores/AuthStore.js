import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import utils from '@/utils/utils'
import router from '@/router'
import { jwtDecode } from 'jwt-decode'

const url = 'http://localhost:8010/'

export const useAuthStore = defineStore('auth', () => {
  const data = ref([])
  const error = ref(null)
  const showModal = ref([])
  const isLoading = ref(false)
  const isAuthentificated = ref()

  const login = async (userData) => {
    isLoading.value = true
    try {
      const response = await utils.sendRequest('POST', url + 'login', userData)
      if (response.state === 0) {
        showModalWindow(true, response.message)
        return
      }
      localStorage.setItem('token', response)
      const decodedToken = jwtDecode(response)
      console.log(decodedToken)

      isAuthentificated.value = true
      router.push({ name: 'LoginPage' })
      error.value = null
    } catch (error) {
      error.value = error
    } finally {
      isLoading.value = false
    }
  }

  const logout = async () => {
    await localStorage.removeItem('token')
    isAuthentificated.value = false
    router.push({ name: 'LoginPage' })
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
    showModalVisible,
    login,
    isAuthentificated,
    logout
  }
})
