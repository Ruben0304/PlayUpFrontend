<template>
  <div class="bg-white rounded-lg shadow p-6">
    <h2 class="text-xl font-semibold mb-4">{{ $t('userSignIns') }}</h2>
    <div class="mb-4">
      <select v-model="selectedPeriod" @change="updateChart" class="border rounded p-2">
        <option value="day">{{ $t('daily') }}</option>
        <option value="week">{{ $t('weekly') }}</option>
        <option value="month">{{ $t('monthly') }}</option>
      </select>
    </div>
    <div v-if="loading" class="flex justify-center items-center h-64">
      <LoaderComponent />
    </div>
    <div v-else-if="error" class="text-red-500 text-center h-64 flex items-center justify-center">
      {{ error }}
    </div>
    <div v-else>
      <div class="h-64">
        <canvas ref="chartRef"></canvas>
      </div>
      <div class="flex justify-between items-center mt-4">
        <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="px-4 py-2 bg-primary text-primary-foreground rounded disabled:opacity-50"
        >
          {{ $t('previous') }}
        </button>
        <span>{{ $t('page') }} {{ currentPage }} {{ $t('of') }} {{ totalPages }}</span>
        <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="px-4 py-2 bg-primary text-primary-foreground rounded disabled:opacity-50"
        >
          {{ $t('next') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick, computed,defineProps } from 'vue'
import { Chart, registerables } from 'chart.js'
import { useI18n } from 'vue-i18n'
import LoaderComponent from '@/components/LoaderComponent.vue'

Chart.register(...registerables)

const { t } = useI18n()
const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: ''
  },
  itemsPerPage: {
    type: Number,
    default: 7
  }
})

const chartRef = ref(null)
let chart = null

const currentPage = ref(1)
const selectedPeriod = ref('day')

const groupedData = computed(() => {
  if (selectedPeriod.value === 'day') {
    return props.data
  } else if (selectedPeriod.value === 'week') {
    return groupDataByPeriod(props.data, 7)
  } else {
    return groupDataByPeriod(props.data, 30)
  }
})

const totalPages = computed(() => Math.ceil(groupedData.value.length / props.itemsPerPage))

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * props.itemsPerPage
  const end = start + props.itemsPerPage
  return groupedData.value.slice(start, end)
})

function groupDataByPeriod(data) {
  const grouped = {}
  data.forEach(item => {
    const date = new Date(item.signin_date)
    const periodStart = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay())
    const key = periodStart.toISOString().split('T')[0]
    if (!grouped[key]) {
      grouped[key] = { signin_date: key, user_count: 0 }
    }
    grouped[key].user_count += item.user_count
  })
  return Object.values(grouped)
}

const createChart = async () => {
  if (chart) {
    chart.destroy()
  }

  await nextTick()

  if (chartRef.value) {
    const ctx = chartRef.value.getContext('2d')
    chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: paginatedData.value.map(item => item.signin_date),
        datasets: [{
          label: t('userSignIns'),
          data: paginatedData.value.map(item => item.user_count),
          fill: false,
          borderColor: 'hsl(var(--primary))',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: t('numberOfSignIns')
            }
          },
          x: {
            title: {
              display: true,
              text: t('date')
            }
          }
        }
      }
    })
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const updateChart = () => {
  currentPage.value = 1
  createChart()
}

watch([() => props.data, currentPage, selectedPeriod], async () => {
  if (props.data.length > 0 && !props.loading && !props.error) {
    await createChart()
  }
}, { deep: true })

onMounted(async () => {
  if (props.data.length > 0 && !props.loading && !props.error) {
    await createChart()
  }
})
</script>