<template>
  <section id="stats" class="py-20 relative bg-gray-800">
    <div class="max-w-7xl mx-auto px-4"><h2 data-aos="fade-up" class="text-4xl font-bold text-center mb-16"
                                            style="color: white;"> {{ $t('statsSection.realTimeAnalysis') }} </h2>
      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8"> <!-- Performance Chart -->
        <div data-aos="fade-right" class="bg-gray-900 rounded-2xl p-6"><h3 class="text-xl font-semibold mb-6"
                                                                           style="color: white;">
          {{ $t('statsSection.seasonPerformance') }}</h3>
          <canvas id="performanceChart" class="rounded-xl bg-gray-800"></canvas>
        </div> <!-- Stats Overview -->
        <div data-aos="fade-left" class="bg-gray-900 rounded-2xl p-6"><h3 class="text-xl font-semibold mb-6"
                                                                          style="color: white;">
          {{ $t('statsSection.keyStatistics') }}</h3>
          <div class="grid grid-cols-2 gap-4">
            <StatBox :title="$t('statsSection.goals')" :count="24"/>
            <StatBox :title="$t('statsSection.assists')" :count="12"/>
            <StatBox :title="$t('statsSection.matches')" :count="36"/>
            <StatBox :title="$t('statsSection.rating')" :count="8.5"/>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import {onMounted} from 'vue'
import Chart from 'chart.js/auto'
import StatBox from './StatBox.vue'

onMounted(() => {
  const ctx = document.getElementById('performanceChart')
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['2021', '2022', '2023'],
      datasets: [{
        label: 'Rendimiento (%)',
        data: [75, 85, 90],
        borderColor: '#EB6343',
        backgroundColor: 'rgba(235, 99, 67, 0.2)',
        borderWidth: 3,
        pointRadius: 5,
        pointBackgroundColor: '#EB6343',
        pointBorderColor: '#EB6343',
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 1.8,
      plugins: {
        legend: {
          display: false
        },
      },
      scales: {
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: '#FFFFFF'
          }
        },
        y: {
          beginAtZero: true,
          max: 100,
          ticks: {
            color: '#FFFFFF',
            stepSize: 20
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          }
        }
      },
      animation: {
        duration: 2000,
        easing: 'easeInOutQuad'
      },
      layout: {
        padding: {
          top: 20,
          right: 20,
          bottom: 20,
          left: 20
        }
      }
    }
  })
})
</script>