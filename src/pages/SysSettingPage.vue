<script setup>
import { useSysSettingStore } from '@/stores/SysSettingStore.js'

import ToastComponent from '@/components/ToastComponent/ToastComponent.vue'
import SysSettingTable from '@/components/Tables/SysSettingTable/SysSettingTable.vue'
import SysSettingCrEdForm from '@/components/Forms/SysSettingCrEdForm.vue'

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
  <SysSettingCrEdForm/>
  <div class="container m-2">
    <SysSettingTable/>
  </div>
</template>
