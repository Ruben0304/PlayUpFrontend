

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const carousel = ref(null)
const autoScrollInterval = ref(null)

const testimonials = ref([
  // Datos de testimonios
])

const scrollCarousel = (direction) => {
  if (carousel.value) {
    const scrollAmount = direction === 'next' ? carousel.value.offsetWidth : -carousel.value.offsetWidth
    carousel.value.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    })
  }
  resetAutoScroll()
}

const autoScroll = () => {
  scrollCarousel('next')
  if (carousel.value && carousel.value.scrollLeft + carousel.value.offsetWidth >= carousel.value.scrollWidth) {
    carousel.value.scrollTo({ left: 0, behavior: 'smooth' })
  }
}

const resetAutoScroll = () => {
  if (autoScrollInterval.value) clearInterval(autoScrollInterval.value)
  autoScrollInterval.value = setInterval(autoScroll, 5000)
}

onMounted(() => {
  resetAutoScroll()
})

onUnmounted(() => {
  if (autoScrollInterval.value) clearInterval(autoScrollInterval.value)
})
</script>