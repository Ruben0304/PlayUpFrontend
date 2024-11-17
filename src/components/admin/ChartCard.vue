<template>
  <div class="bg-gradient-to-r from-gray-100 to-gray-300 dark:from-gray-700 dark:to-gray-900 rounded-xl overflow-hidden shadow-lg backdrop-blur-lg bg-opacity-30 dark:bg-opacity-30 border border-gray-200 dark:border-gray-700 transition-all duration-500 p-6">
    <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{{ $t('monthlyStats') }}</h2>
    <div class="h-80">
      <Line :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const chartData = ref({
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Teams',
      data: [12, 15, 18, 22, 26, 30],
      borderColor: '#8B5CF6',
      backgroundColor: '#8B5CF6',
    },
    {
      label: 'Players',
      data: [150, 180, 210, 250, 300, 350],
      borderColor: '#10B981',
      backgroundColor: '#10B981',
    }
  ]
})

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(0, 0, 0, 0.1)',
      },
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      labels: {
        color: 'rgb(156, 163, 175)',
      },
    },
  },
}))

onMounted(() => {
  // Aquí puedes cargar datos reales si es necesario
})
</script>
