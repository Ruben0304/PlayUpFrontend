<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">{{ $t('tournaments') }}</h1>

    <div class="bg-white shadow-md rounded-lg overflow-hidden">
      <div class="p-4 bg-gray-50 border-b">
        <h2 class="text-xl font-semibold text-gray-700">{{ $t('tournamentList') }}</h2>
      </div>

      <!-- Loading state -->
      <LoaderComponent v-if="loading"/>

      <!-- Error state -->
      <div v-else-if="error" class="p-4 text-center text-red-600">
        {{ error }}
      </div>

      <!-- Tournament Grid -->
      <div v-else class="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="tournament in tournaments"
             :key="tournament.id"
             class="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
          <div class="relative h-48">
            <img :src="tournament.banner_image || '/api/placeholder/400/200'"
                 :alt="tournament.name"
                 class="w-full h-full object-cover">
            <div class="absolute top-4 left-4">
              <img :src="tournament.logo || '/api/placeholder/48/48'"
                   :alt="`${tournament.name} logo`"
                   class="w-12 h-12 rounded-full border-2 border-white shadow-md">
            </div>
          </div>
          <div class="p-4">
            <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ tournament.name }}</h3>
            <p class="text-sm text-gray-600 mb-4 line-clamp-2">{{ tournament.description }}</p>
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-500">{{ tournament.organization_name }}</span>
              <span class="text-xs text-gray-400">{{ formatDate(tournament.created_at) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue'
import { useI18n } from 'vue-i18n'
import LoaderComponent from "@/components/LoaderComponent.vue"

const { t } = useI18n()
const tournamentService = inject('tournamentService')

// State
const tournaments = ref([])
const loading = ref(false)
const error = ref(null)

// Methods
function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString()
}

async function loadTournaments() {
  loading.value = true
  error.value = null
  try {
    tournaments.value = await tournamentService.getAllTournamentsWithOrganizations()
  } catch (e) {
    error.value = t('errorLoadingTournaments')
    console.error('Error loading tournaments:', e)
  } finally {
    loading.value = false
  }
}

// Load tournaments when component mounts
onMounted(() => {
  loadTournaments()
})
</script>