<template>
  <div data-aos="fade-up" class="bg-gray-800/50 backdrop-blur-xl p-8 rounded-2xl border" style="border-color: #EB6343;">
    <div class="text-4xl font-bold" style="color: #EB6343;" ref="counterEl">0</div>
    <div class="text-gray-400">{{ title }}</div>
  </div>
</template>

<script setup>
import { defineProps, onMounted, ref } from 'vue'

const props = defineProps({
  title: String,
  count: Number,
  id: {
    type: String,
    default: () => Math.random().toString(36).substr(2, 9)
  }
})

const counterEl = ref(null)

onMounted(() => {
  const duration = 2000
  const start = 0
  const end = props.count
  const range = end - start
  let current = start
  const increment = end > start ? 1 : -1
  const stepTime = Math.abs(Math.floor(duration / range))

  const timer = setInterval(() => {
    current += increment
    counterEl.value.textContent = current
    if (current === end) {
      clearInterval(timer)
    }
  }, stepTime)
})
</script>