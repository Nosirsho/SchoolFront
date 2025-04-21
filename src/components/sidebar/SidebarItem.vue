<script setup>
import { computed } from 'vue'
const props = defineProps({
  title: String,
  imgSrc: String,
  isGroup: Boolean,
  isOpen: Boolean
})
const arrowPath = computed(() => {
  if (!props.isOpen) {
    return 'M233.252,155.997L120.752,6.001c-4.972-6.628-14.372-7.97-21-3c-6.628,4.971-7.971,14.373-3,21 l105.75,140.997L96.752,306.001c-4.971,6.627-3.627,16.03,3,21c2.698,2.024,5.856,3.001,8.988,3.001 c4.561,0,9.065-2.072,12.012-6.001l112.5-150.004C237.252,168.664,237.252,161.33,233.252,155.997z'
  } else {
    return 'M155.997,233.252L6.001,120.752c-6.628-4.972-7.97-14.372-3-21c4.971-6.628,14.373-7.971,21-3 l140.997,105.75L306.001,96.752c6.627-4.971,16.03-3.627,21,3c2.024,2.698,3.001,5.856,3.001,8.988 c0,4.561-2.072,9.065-6.001,12.012l-150.004,112.5C168.664,237.252,161.33,237.252,155.997,233.252z'
  }
})
</script>
<template>
  <div
    class="flex items-center px-6 py-2 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
  >
    <img width="20" :src="imgSrc" />

    <span class="mx-3">{{ title }}</span>
    <div v-if="isGroup">
      <svg
        fill="#fafafa"
        height="15px"
        width="15px"
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 330.002 330.002"
        xml:space="preserve"
      >
        <path :d="arrowPath" />
      </svg>
    </div>
  </div>
</template>
