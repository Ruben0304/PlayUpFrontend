<template>
  <section id="players" class="bg-background-500 text-white py-12 md:py-20 px-4">
    <div
        class="container mx-auto flex flex-col md:flex-row
             items-center justify-between"
    >
      <!-- MOCKUP (Izquierda) -->
      <div
          class="w-full md:w-1/2 flex justify-center md:justify-start"
          data-aos="fade-up"
          data-aos-duration="800"
      >
        <img
            src="@/assets/phone5.png"
            alt="Mockup Jugador"
            class="w-48 sm:w-56 md:w-64 lg:w-72 shadow-md"
        />
      </div>

      <!-- TEXTO (Derecha) -->
      <div
          class="w-full md:w-1/2 mt-8 md:mt-0 md:pl-8"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay="200"
      >
        <!-- Título -->
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
          Eres jugador,
          <br class="block sm:hidden" />
          <span class="whitespace-nowrap">no nos olvidamos de ti.</span>
        </h2>

        <!-- Subtítulo o descripción breve -->
        <p class="text-gray-300 text-lg mb-6">
          Conecta con jugadores de todo el mundo y comparte tus experiencias.
        </p>

        <!-- Lista de puntos -->
        <ul class="text-gray-300 space-y-3">
          <li class="flex items-start">
            <span class="text-primary-500 mr-2">✓</span>
            Almacenamos tu historial de carrera y tus logros.
          </li>
          <li class="flex items-start">
            <span class="text-primary-500 mr-2">✓</span>
            Contacta con otros jugadores.
          </li>
          <li class="flex items-start">
            <span class="text-primary-500 mr-2">✓</span>
            Recibe ofertas de equipos interesados.
          </li>
          <li class="flex items-start">
            <span class="text-primary-500 mr-2">✓</span>
            Sigue los resultados de tus equipos favoritos.
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
/*
  - Dejar vacío o eliminar si no necesitas lógica adicional.
  - Asegúrate de tener AOS instalado y configurado
    si vas a usar data-aos (opcional).
*/
</script>

<style scoped>
/*
  No incluimos animaciones flotantes o keyframes adicionales,
  solo el fade-up de AOS al cargar.
*/
</style>


<!--<template>-->
<!--  <section id="stats" class="py-20 relative ">-->
<!--    <div class="max-w-7xl mx-auto px-4"><h2 data-aos="fade-up" class="text-4xl font-bold text-center mb-16"-->
<!--                                            style="color: white;"> {{ $t('statsSection.realTimeAnalysis') }} </h2>-->
<!--      &lt;!&ndash; Stats Grid &ndash;&gt;-->
<!--      <div class="grid grid-cols-1 md:grid-cols-2 gap-8"> &lt;!&ndash; Performance Chart &ndash;&gt;-->
<!--        <div data-aos="fade-right" class="bg-gray-900 rounded-2xl p-6"><h3 class="text-xl font-semibold mb-6"-->
<!--                                                                           style="color: white;">-->
<!--          {{ $t('statsSection.seasonPerformance') }}</h3>-->
<!--          <canvas id="performanceChart" class="rounded-xl bg-gray-800"></canvas>-->
<!--        </div> &lt;!&ndash; Stats Overview &ndash;&gt;-->
<!--        <div data-aos="fade-left" class="bg-gray-900 rounded-2xl p-6"><h3 class="text-xl font-semibold mb-6"-->
<!--                                                                          style="color: white;">-->
<!--          {{ $t('statsSection.keyStatistics') }}</h3>-->
<!--          <div class="grid grid-cols-2 gap-4">-->
<!--            <StatBox :title="$t('statsSection.goals')" :count="24"/>-->
<!--            <StatBox :title="$t('statsSection.assists')" :count="12"/>-->
<!--            <StatBox :title="$t('statsSection.matches')" :count="36"/>-->
<!--            <StatBox :title="$t('statsSection.rating')" :count="8.5"/>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </section>-->
<!--</template>-->

<!--<script setup>-->
<!--import {onMounted} from 'vue'-->
<!--import Chart from 'chart.js/auto'-->
<!--import StatBox from './StatBox.vue'-->

<!--onMounted(() => {-->
<!--  const ctx = document.getElementById('performanceChart')-->
<!--  new Chart(ctx, {-->
<!--    type: 'line',-->
<!--    data: {-->
<!--      labels: ['2021', '2022', '2023'],-->
<!--      datasets: [{-->
<!--        label: 'Rendimiento (%)',-->
<!--        data: [75, 85, 90],-->
<!--        borderColor: '#EB6343',-->
<!--        backgroundColor: 'rgba(235, 99, 67, 0.2)',-->
<!--        borderWidth: 3,-->
<!--        pointRadius: 5,-->
<!--        pointBackgroundColor: '#EB6343',-->
<!--        pointBorderColor: '#EB6343',-->
<!--        fill: true,-->
<!--        tension: 0.4-->
<!--      }]-->
<!--    },-->
<!--    options: {-->
<!--      responsive: true,-->
<!--      maintainAspectRatio: true,-->
<!--      aspectRatio: 1.8,-->
<!--      plugins: {-->
<!--        legend: {-->
<!--          display: false-->
<!--        },-->
<!--      },-->
<!--      scales: {-->
<!--        x: {-->
<!--          grid: {-->
<!--            display: false-->
<!--          },-->
<!--          ticks: {-->
<!--            color: '#FFFFFF'-->
<!--          }-->
<!--        },-->
<!--        y: {-->
<!--          beginAtZero: true,-->
<!--          max: 100,-->
<!--          ticks: {-->
<!--            color: '#FFFFFF',-->
<!--            stepSize: 20-->
<!--          },-->
<!--          grid: {-->
<!--            color: 'rgba(255, 255, 255, 0.1)'-->
<!--          }-->
<!--        }-->
<!--      },-->
<!--      animation: {-->
<!--        duration: 2000,-->
<!--        easing: 'easeInOutQuad'-->
<!--      },-->
<!--      layout: {-->
<!--        padding: {-->
<!--          top: 20,-->
<!--          right: 20,-->
<!--          bottom: 20,-->
<!--          left: 20-->
<!--        }-->
<!--      }-->
<!--    }-->
<!--  })-->
<!--})-->
<!--</script>-->