<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
const data = [
  'Авезов',
  'Баранов',
  'Вакилов',
  'Гаратов',
  'Дастунов',
  'Егоров',
  'Париев',
  'Литров',
  'Растаров'
]
const filteredItems = ref(data)
const inputText = ref()
const listVisible = ref(false)
const selectedIndex = ref(-1)

const handleKeyDown = (event) => {
  if (listVisible.value) {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      selectedIndex.value = Math.min(selectedIndex.value + 1, filteredItems.value.length - 1)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      selectedIndex.value = Math.max(selectedIndex.value - 1, 0)
    } else if (event.key === 'Escape') {
    listVisible.value = false;
    selectedIndex.value = -1;
  } else if (event.key === 'Enter') {
      event.preventDefault()
      if (selectedIndex.value >= 0 && selectedIndex.value < filteredItems.value.length) {
        onItemClick(filteredItems.value[selectedIndex.value])
      }
    }
  }
}

const onItemClick = (item) => {
  inputText.value = item
  listVisible.value = false
}
const showList = () => {
  listVisible.value = true
}
const onChange = (query) => {
  if (query == '') {
    filteredItems.value = data
  }
  filteredItems.value = data.filter((item) => item.toLowerCase().includes(query.toLowerCase()))
}
// const hideLise = () => {
//   listVisible.value = false
// }

const handleClickOutside = (event) => {
  if (listVisible.value && !event.target.closest('.list-container')) {
    listVisible.value = false
    selectedIndex.value = -1;
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
<template>
  <div class="grid grid-cols-8 mb-2 list-container">
    <div
      class="col-span-2 bg-gray-700 text-teal-500 font-medium text-sm border border-gray-600 rounded-l-lg"
    >
      <p class="p-2.5">TEST</p>
    </div>
    <input
      @focus="showList"
      @focusout="hideLise"
      @input="onChange(inputText)"
      @keydown="handleKeyDown"
      type="text"
      id="middle-name"
      class="col-span-6 shadow-sm bg-gray-800 border border-gray-600 text-gray-200 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      placeholder=""
      v-model="inputText"
      required
    />
    <div class="col-span-2"></div>
    <div
      v-if="listVisible"
      class="col-span-8 shadow-sm bg-gray-800 border border-gray-600 text-gray-200 text-sm rounded-b-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
    >
      <ul class="bg-gray-800 text-sm">
        <li
          @click="onItemClick(item)"
          @mouseenter="selectedIndex=index"
          :class="{ 'mx-1 bg-gray-900': index === selectedIndex }"
          v-for="(item, index) in filteredItems"
          :key="index"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>
