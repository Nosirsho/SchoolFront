<script setup>
import ToastComponent from '@/components/ToastComponent/ToastComponent.vue'

import { useSysSettingStore } from '@/stores/SysSettingStore.js'
import SysSettingTable from '@/components/Tables/SysSettingTable/SysSettingTable.vue'

const sysSettingStore = useSysSettingStore()
const handleOkButtonClick = () => {
  sysSettingStore.showModal.visible = false
}

</script>
<template>
  <ToastComponent
    v-if="sysSettingStore.showModalVisible"
    :isError="sysSettingStore.showModal.isError"
    :meesage="sysSettingStore.showModal.message"
    @okButtonClick="handleOkButtonClick"
  />
  <div class="container m-2">
    <SysSettingTable/>
  </div>
</template>
