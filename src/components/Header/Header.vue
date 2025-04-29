<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/AuthStore'

const authStore = useAuthStore()
const user = ref({
  email: '',
  password: ''
})

const login = async () => {
  const loginObj = {
    email: user.value.email,
    password: user.value.password
  }
  await authStore.login(loginObj)
}
const logout = async () => {
  await authStore.logout()
}
</script>
<template>
  <div class="flex items-center justify-between px-6 py-4 bg-gray-400 border-b-4 border-gray-900">
    <div class="w-1/3 flex items-center grid grid-cols-8 gap-2">
      <input
        type="text"
        v-if="!authStore.isAuthentificated"
        v-model="user.email"
        class="col-span-3 shadow-sm bg-gray-800 border border-gray-600 text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder="Login"
        required
      />
      <input
        v-if="!authStore.isAuthentificated"
        type="password"
        v-model="user.password"
        class="col-span-3 shadow-sm bg-gray-800 border border-gray-600 text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder="Password"
        required
      />
      <button
        v-if="!authStore.isAuthentificated"
        type="button"
        @click="login"
        class="col-span shadow-sm text-center text-gray-400 font-bold bg-gray-700 border border-gray-300 h-full hover:bg-gray-800 rounded-lg focus:ring-1 focus:ring-white"
      >
        Вход
      </button>
      <button
        v-else
        type="button"
        @click="logout"
        class="col-span shadow-sm text-center text-gray-400 font-bold bg-gray-700 border border-gray-300 h-full hover:bg-gray-800 rounded-lg focus:ring-1 focus:ring-white"
      >
        Выход
      </button>
    </div>

    <div class="flex items-center"></div>
  </div>
</template>
