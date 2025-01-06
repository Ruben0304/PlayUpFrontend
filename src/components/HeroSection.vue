<template>
  <div class="min-h-screen bg-background-500 relative overflow-hidden flex items-center">
    <div class="container mx-auto px-4 md:px-6 py-12 md:py-0">
      <div
          class="flex flex-col md:flex-row items-center justify-between space-y-12 md:space-y-0"
      >

        <!-- Text Content -->
        <div
            class="w-full md:w-1/2 text-white z-10
         mb-8 md:mb-0 mt-20 md:mt-0"
            data-aos="fade-right"
            data-aos-delay="100"
        >
          <!-- Ajustamos la forma de mostrar el H1 para que no quede uno debajo de otro en móviles -->
          <h1
              class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight
                   text-center md:text-left px-2 md:px-0"
              ref="heroText"
          >
            <!--
              En una sola línea (o como máximo dos) para móvil.
              Puedes ajustar donde se rompen las líneas según necesites.
            -->
            <span>
              {{ $t('hero.passion') }}&nbsp;{{ $t('hero.game') }}&nbsp;
              {{ $t('hero.story') }}&nbsp;{{ $t('hero.everything') }}
              <span class="text-primary-500">PlayUp</span>.
            </span>
          </h1>

          <p
              class="text-primary-100 text-md sm:text-lg md:text-xl max-w-lg
                   text-center md:text-left mt-4 px-2 md:px-0"
              ref="heroDescription"
          >
            {{ $t('hero.description') }}
          </p>

          <div class="flex justify-center md:justify-start mt-6 px-2 md:px-0">
            <button
                class="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-full
                     text-lg font-semibold transition-all duration-300 transform hover:scale-105"
                ref="startButton"
            >
              {{ $t('hero.start') }}
            </button>
          </div>

          <!-- Store Links -->
          <div
              class="flex justify-center md:justify-start space-x-4 pt-6 px-2 md:px-0"
              ref="storeLinks"
          >
            <a href="#" class="transform hover:scale-105 transition-transform">
              <img
                  src="@/assets/Stores.png"
                  alt="Google Play"
                  class="h-12"
              />
            </a>
            <a href="#" class="transform hover:scale-105 transition-transform">
              <img
                  src="@/assets/AppleStores.png"
                  alt="App Store"
                  class="h-12"
              />
            </a>
          </div>
        </div>

        <!-- Phone Images -->
        <div
            class="w-full md:w-1/2 relative h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px]"
            data-aos="zoom-in"
            data-aos-delay="200"
        >
          <div class="absolute w-full h-full">
            <div class="relative w-full h-full">
              <!-- Efecto de resplandor rojo con animación -->
              <div
                  class="absolute inset-0
                       bg-primary-500
                       animate-glowPulse
                       blur-[100px]
                       rounded-full"
              ></div>

              <!-- Mockup 1 -->
              <img
                  src="@/assets/phone1.png"
                  alt="Primer mockup de PlayUp"
                  class="absolute w-52 sm:w-56 md:w-72
                       top-1/2 left-1/2
                       transform -translate-x-1/2 -translate-y-1/2
                       mockup-floating-1"
              />

              <!-- Mockup 2 -->
              <img
                  src="@/assets/phone2.png"
                  alt="Segundo mockup de PlayUp"
                  class="absolute w-52 sm:w-56 md:w-72
                       top-1/2 left-1/2
                       transform -translate-x-1/2 -translate-y-1/2
                       mockup-floating-2"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const heroText = ref(null)
const heroDescription = ref(null)
const startButton = ref(null)
const storeLinks = ref(null)

onMounted(() => {
  // Animación del texto con GSAP
  const animateText = () => {
    if (heroText.value) {
      gsap.from(heroText.value, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out'
      })
    }
  }

  // Animación de la descripción
  const animateDescription = () => {
    if (heroDescription.value) {
      gsap.from(heroDescription.value, {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.5,
        ease: 'power3.out'
      })
    }
  }

  // Animación del botón
  const animateButton = () => {
    if (startButton.value) {
      gsap.from(startButton.value, {
        scale: 0.5,
        opacity: 0,
        duration: 0.5,
        delay: 1,
        ease: 'back.out(1.7)'
      })
    }
  }

  // Animación de los enlaces de tienda
  const animateStoreLinks = () => {
    if (storeLinks.value) {
      gsap.from(storeLinks.value.children, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.2,
        delay: 1.5,
        ease: 'power3.out'
      })
    }
  }

  // Ejecutar todas las animaciones GSAP
  animateText()
  animateDescription()
  animateButton()
  animateStoreLinks()
})
</script>

<style scoped>
/*
  ------------------------------------------------------------------
  Animación de "glowPulse" para el resplandor:
  Hace que el brillo aumente y disminuya con efecto suave
  ------------------------------------------------------------------
*/
@keyframes glowPulse {
  0%, 100% {
    opacity: 0.2;
  }
  50% {
    opacity: 0.6;
  }
}
.animate-glowPulse {
  animation: glowPulse 3s ease-in-out infinite;
}

/*
  ------------------------------------------------------------------
  Animaciones para los mockups (flotan levemente de arriba a abajo):
  Mantiene el efecto "peliculero" + ligera rotación 3D
  ------------------------------------------------------------------
*/
@keyframes mockupFloat1 {
  0%, 100% {
    transform: translate(-50%, -50%) rotateX(15deg) rotate(-12deg);
  }
  50% {
    transform: translate(-50%, -50%) rotateX(15deg) rotate(-12deg) translateY(-10px);
  }
}
.mockup-floating-1 {
  animation: mockupFloat1 4s ease-in-out infinite;
}

@keyframes mockupFloat2 {
  0%, 100% {
    transform: translate(-50%, -50%) rotateY(15deg) rotate(12deg);
  }
  50% {
    transform: translate(-50%, -50%) rotateY(15deg) rotate(12deg) translateY(-10px);
  }
}
.mockup-floating-2 {
  animation: mockupFloat2 4s ease-in-out infinite;
}

/*
  ------------------------------------------------------------------
  Ajustes responsivos:
  - El contenedor se organiza en columna inversa en móvil (si lo deseas).
  - Se centra el texto en pantallas pequeñas.
  ------------------------------------------------------------------
*/
@media (max-width: 768px) {
  .container > div {
    flex-direction: column-reverse;
  }
  /* Ajustar anchos o alturas si fuera necesario */
}
</style>
