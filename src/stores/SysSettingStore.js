import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import utils from '@/utils/utils'

const url = 'http://localhost:5296/SysSetting/'

export const useSysSettingStore = defineStore('sysSetting', () => {
  const data = ref([])
  const sysSettingTypesList = ref([])
  const error = ref(null)
  const showModal = ref([])
  const isLoading = ref(false)
  //Форма
  const formVisible = ref()
  const isEdit = ref(false)
  const currItemId = ref()
  const currentItemObj = ref([])
  //

  const showModalVisible = computed(() => showModal.value.visible)

  const getSysSettingType = async () => {
    isLoading.value = true
    try {
      const response = await utils.sendRequest('GET', url + 'type')
      if (response.state === 0) {
        showModalWindow(true, response.message)
        return
      }
      sysSettingTypesList.value = response
      error.value = null
    } catch (error) {
      error.value = error
      sysSettingTypesList.value = null
    } finally {
      isLoading.value = false
    }
  }
  const getSysSettings = async () => {
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

  const setSysSettingValue = async (data) => {
    isLoading.value = true
    try {
      const response = await utils.sendRequest('POST', url, data)
      if (response.state === 0) {
        showModalWindow(true, response.message)
        return
      }
      showModalWindow(false, 'Успешно!')
      sysSettingTypesList.value = response
      error.value = null
    } catch (error) {
      error.value = error
      sysSettingTypesList.value = null
    } finally {
      isLoading.value = false
    }
  }

  const updateSysSettingValue = async (data) => {
    isLoading.value = true
    try {
      const response = await utils.sendRequest('PUT', url + currItemId.value, data)
      if (response.state === 0) {
        showModalWindow(true, response.message)
        return
      }
      showModalWindow(false, 'Успешно!')
      sysSettingTypesList.value = response
      error.value = null
    } catch (error) {
      error.value = error
      sysSettingTypesList.value = null
    } finally {
      isLoading.value = false
    }
  }

  const getSysSettingById = async (id) => {
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
      sysSettingTypesList.value = null
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
    showModalVisible,
    sysSettingTypesList,
    showModalWindow,
    showModal,
    getSysSettingType,
    getSysSettingById,
    setSysSettingValue,
    updateSysSettingValue,
    getSysSettings,
    formVisible,
    isEdit,
    currItemId,
    currentItemObj
  }
})
