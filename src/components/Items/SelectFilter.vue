<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const modelValue = defineModel()
const updateModelValue = (value) => {
  modelValue.value = value
}

const props = defineProps({
  data: Array,
  caption: String,
  inputText: String,
  index: Number
})

const filteredItems = computed(() => {
  if (!Array.isArray(props.data) || !props.data) {
    return [] // Return an empty array if data is not valid.
  }

  return props.data.filter((option) => {
    const fullName = option?.fullName // Use optional chaining

    if (fullName && inputText.value) {
      return fullName.toLowerCase().includes(inputText.value.toLowerCase())
    } else if (fullName && !inputText.value) {
      return true // if no inputText.value, return all items that have a fullName.
    } else {
      return false // Skip items without fullName or if inputText.value is undefined.
    }
  })
})

const inputText = ref(props.inputText)
const listVisible = ref(false)
const selectedIndex = ref(-1)
const emit = defineEmits(['onChange', 'selected'])

const handleKeyDown = (event) => {
  if (listVisible.value) {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      selectedIndex.value = Math.min(selectedIndex.value + 1, filteredItems.value.length - 1)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      selectedIndex.value = Math.max(selectedIndex.value - 1, 0)
    } else if (event.key === 'Escape') {
      listVisible.value = false
      selectedIndex.value = -1
    } else if (event.key === 'Enter') {
      event.preventDefault()
      if (selectedIndex.value >= 0 && selectedIndex.value < filteredItems.value.length) {
        onItemClick(filteredItems.value[selectedIndex.value])
      }
    }
  }
}

const onItemClick = (item) => {
  inputText.value = item.fullName
  updateModelValue(item.id)
  listVisible.value = false
  const elem = {
    id: item.id,
    childFullName: item.fullName
  }
  emit('selected', props.index, elem)
}
const showList = () => {
  listVisible.value = true
}
const onChange = async (query) => {
  emit('onChange', query)
  if (query == '') {
    updateModelValue(query)
  }
}

const handleClickOutside = (event) => {
  if (listVisible.value && !event.target.closest('.list-container')) {
    listVisible.value = false
    selectedIndex.value = -1
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
      <p class="p-2.5">{{ caption }}</p>
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
          @mouseenter="selectedIndex = index"
          :class="{ 'mx-1 bg-gray-900': index === selectedIndex }"
          v-for="(item, index) in filteredItems"
          :key="index"
        >
          {{ item.fullName }} {{ item.gradeLevel }}
        </li>
      </ul>
    </div>
  </div>
</template>
