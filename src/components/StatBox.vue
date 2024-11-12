<template>
  <div class="bg-gray-800 rounded-xl p-4 text-center">
    <div class="text-gray-400 mb-1">{{ title }}</div>
    <div class="text-3xl font-bold" :id="`counter-${id}`" :data-count="count" style="color: white;">0</div>
  </div>
</template>

<script setup>
import { defineProps, onMounted } from 'vue'

const props = defineProps({
  title: String,
  count: Number,
  id: {
    type: String,
    default: () => Math.random().toString(36).substr(2, 9)
  }
})
onMounted(() => {
  const counter = document.getElementById(`counter-${props.id}`)
  let count = 0
  const target = props.count
  const duration = 2000
  const step = target / (duration / 16)

  const updateCounter = () => {
    count += step
    if (count < target) {
      counter.textContent = Math.round(count)
      requestAnimationFrame(updateCounter)
    } else {
      counter.textContent = target
    }
  }

  updateCounter()
})
</script>