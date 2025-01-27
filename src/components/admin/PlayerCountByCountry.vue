<template>
  <div class="bg-white shadow rounded-lg p-6">
    <h2 class="text-2xl font-semibold mb-4">{{ $t('playerCountByCountry') }}</h2>
    <div v-if="loading" class="flex justify-center items-center h-64">
      <LoaderComponent />
    </div>
    <div v-else-if="error" class="text-red-500">
      {{ error }}
    </div>
    <div v-else class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            {{ $t('country') }}
          </th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            {{ $t('playerCount') }}
          </th>
        </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="(item, index) in playerCountData" :key="index" class="hover:bg-gray-50">
          <td class="px-6 py-4 whitespace-nowrap">
            {{ item.pais }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            {{ item.cantidad }}
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue'
import { useI18n } from 'vue-i18n'
import LoaderComponent from '@/components/LoaderComponent.vue'

const { t } = useI18n()
const countryService = inject('countryService')

const playerCountData = ref([])
const loading = ref(false)
const error = ref(null)

async function loadPlayerCountData() {
  loading.value = true
  error.value = null
  try {
    playerCountData.value = await countryService.getPlayerCountByCountry()
  } catch (e) {
    error.value = t('errorLoadingPlayerCount')
    console.error('error loading player count data:', e)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadPlayerCountData()
})
</script>