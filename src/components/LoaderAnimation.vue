<template>
  <div v-if="isLoading" class="fixed inset-0  bg-background-500 flex justify-center items-center z-50">
    <DotLottieVue
        class="w-72 h-72"
        src="https://lottie.host/1a6f8f7f-752f-4178-b448-162564a50103/eFPKzFjyDK.lottie"
        autoplay
        loop
    />
  </div>
</template>

<script setup>
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
import { ref, onMounted } from 'vue'

const isLoading = ref(true)

onMounted(() => {
  // Simular tiempo de carga
  setTimeout(() => {
    isLoading.value = false
  }, 3000) // Ajusta este valor según tus necesidades
})
</script>