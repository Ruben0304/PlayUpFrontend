<template>
  <section class="my-12">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-2xl font-bold mb-6 text-white">{{ $t('screenshotsSection.title') }}</h2>
      <div class="relative">
        <div class="carousel" ref="carousel">
          <div v-for="(screenshot, index) in screenshots" :key="index" class="carousel-item">
            <div class="card">
              <img :src="screenshot" :alt="`Screenshot ${index + 1}`" class="w-full h-full object-cover rounded-lg shadow-lg opacity-70 transition-opacity duration-300 hover:opacity-100"/>
              <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
        <button @click="scrollCarousel('prev')" class="carousel-prev absolute top-1/2 left-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-200 focus:outline-none transition-colors duration-300">
          <i data-lucide="chevron-left" class="w-6 h-6 text-gray-600"></i>
        </button>
        <button @click="scrollCarousel('next')" class="carousel-next absolute top-1/2 right-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-200 focus:outline-none transition-colors duration-300">
          <i data-lucide="chevron-right" class="w-6 h-6 text-gray-600"></i>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const carousel = ref(null)
const screenshots = ref([])

const loadScreenshots = () => {
  const screenshotCount = 6  // Número de capturas de pantalla
  for (let i = 1; i <= screenshotCount; i++) {
    screenshots.value.push(require(`@/assets/screenshots/c${i}.jpg`))
  }
}

const scrollCarousel = (direction) => {
  if (carousel.value) {
    const scrollAmount = direction === 'next' ? carousel.value.offsetWidth : -carousel.value.offsetWidth
    carousel.value.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    })
  }
}

onMounted(() => {
  loadScreenshots()
  // Initialize any necessary carousel functionality
})
</script>


<style scoped>
.carousel {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
  scrollbar-width: none;
}

.carousel::-webkit-scrollbar {
  display: none;
}

.carousel-item {
  flex: 0 0 300px;
  height: 400px;
  scroll-snap-align: start;
  position: relative;
  margin: 0 10px;
}

.card {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  overflow: hidden;
}
</style>