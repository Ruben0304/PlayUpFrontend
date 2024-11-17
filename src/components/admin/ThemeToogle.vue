<template>
  <button @click="toggleTheme" class="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors duration-300">
    <Sun v-if="isDark" class="w-6 h-6" />
    <Moon v-else class="w-6 h-6" />
  </button>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { Sun, Moon } from 'lucide-vue-next'

const isDark = ref(false)

const toggleTheme = () => {
  isDark.value = !isDark.value
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  updateTheme()
}

const updateTheme = () => {
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

onMounted(() => {
  isDark.value = localStorage.getItem('theme') === 'dark'
  updateTheme()
})

watch(isDark, updateTheme)
</script>