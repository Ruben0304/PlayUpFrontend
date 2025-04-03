<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">{{ $t('tournaments') }}</h1>

    <div class="bg-white shadow-md rounded-lg overflow-hidden mb-6">
      <div class="p-4 bg-gray-50 border-b flex justify-between items-center">
        <h2 class="text-xl font-semibold text-gray-700">{{ $t('tournamentList') }}</h2>
        <div class="flex space-x-4">
          <span v-for="(count, status) in statusCounts" :key="status" class="text-sm">
            {{ $t(status) }}: {{ count }}
          </span>
        </div>
      </div>

      <div class="p-4 bg-gray-50 border-b">
        <div class="flex flex-col md:flex-row md:items-center gap-4">
          <div class="flex-1">
            <label :for="labelId" class="block text-sm font-medium text-gray-700 mb-1">
              {{ $t('filterByStatus') }}
            </label>
            <CustomSelect
                v-model="selectedStatus"
                :options="statusOptions"
                :label="$t('filterByStatus')"
                @update:modelValue="filterTournaments"
            />
          </div>
          
          <div class="flex items-center">
            <label class="inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="showTestItems" class="sr-only peer" @change="filterTournaments">
              <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
              <span class="ml-3 text-sm font-medium text-gray-700">{{ $t('showTestItems') }}</span>
            </label>
          </div>
        </div>
      </div>

      <!-- Loading state -->
      <LoaderComponent v-if="loading"/>

      <!-- error state -->
      <div v-else-if="error" class="p-4 text-center text-red-600">
        {{ error }}
      </div>

      <!-- Tournament Grid -->
      <div v-else class="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="tournament in filteredTournaments"
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
            <div class="flex justify-between items-center mb-4">
              <span class="text-sm text-gray-500">{{ tournament.organization_name }}</span>
              <span class="text-xs text-gray-400">{{ formatDate(tournament.created_at) }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-primary-500">{{ $t('seasons') }}: {{ tournament.season_count }}</span>
              <div>
                <button @click="viewSeasons(tournament.id)" class="px-3 py-1 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition duration-300 ease-in-out mr-2">
                  {{ $t('viewSeasons') }}
                </button>
                <button @click="editTournament(tournament)" class="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300 ease-in-out">
                  {{ $t('edit') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Seasons Modal -->
    <div v-if="showSeasonsModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-2xl">
        <h2 class="text-2xl font-bold mb-4">{{ $t('seasonsFor', { tournament: selectedTournament?.name }) }}</h2>
        <div v-if="loadingSeasons" class="text-center">
          <LoaderComponent />
        </div>
        <div v-else-if="seasons.length === 0" class="text-center text-gray-600">
          {{ $t('noSeasonsFound') }}
        </div>
        <ul v-else class="divide-y divide-gray-200">
          <li v-for="season in seasons" :key="season.id" class="py-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-lg font-semibold">{{ $t('season') }} {{ season.season }}</p>
                <p class="text-sm text-gray-600">{{ season.description }}</p>
              </div>
              <div class="flex items-center">
                <span class="px-2 py-1 text-xs font-semibold rounded-full mr-2"
                      :class="getStatusClass(season.tournament_status)">
                  {{ $t(getStatusLabel(season.tournament_status)) }}
                </span>
                <button @click="editSeason(season)" class="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300 ease-in-out">
                  {{ $t('edit') }}
                </button>
              </div>
            </div>
          </li>
        </ul>
        <button @click="closeSeasonsModal" class="mt-4 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition duration-300 ease-in-out">
          {{ $t('close') }}
        </button>
      </div>
    </div>

    <!-- Edit Tournament Modal -->
    <div v-if="showEditTournamentModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-2xl">
        <h2 class="text-2xl font-bold mb-4">{{ $t('editTournament') }}</h2>
        <form @submit.prevent="saveTournament">
          <div class="mb-4">
            <label for="tournamentName" class="block text-sm font-medium text-gray-700">{{ $t('name') }}</label>
            <input type="text" id="tournamentName" v-model="editingTournament.name" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50">
          </div>
          <div class="mb-4">
            <label for="tournamentDescription" class="block text-sm font-medium text-gray-700">{{ $t('description') }}</label>
            <textarea id="tournamentDescription" v-model="editingTournament.description" rows="3" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"></textarea>
          </div>
          <div class="flex justify-end space-x-2">
            <button type="button" @click="cancelEditTournament" class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition duration-300 ease-in-out">
              {{ $t('cancel') }}
            </button>
            <button type="submit" class="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition duration-300 ease-in-out">
              {{ $t('save') }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Edit Season Modal -->
    <div v-if="showEditSeasonModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-2xl">
        <h2 class="text-2xl font-bold mb-4">{{ $t('editSeason') }}</h2>
        <form @submit.prevent="saveSeason">
          <div class="mb-4">
            <label for="seasonDescription" class="block text-sm font-medium text-gray-700">{{ $t('description') }}</label>
            <textarea id="seasonDescription" v-model="editingSeason.description" rows="3" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"></textarea>
          </div>
          <div class="mb-4">
            <label for="seasonStatus" class="block text-sm font-medium text-gray-700">{{ $t('status') }}</label>
            <select id="seasonStatus" v-model="editingSeason.tournament_status" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md">
              <option v-for="status in statusOptions" :key="status.value" :value="status.value">
                {{ $t(status.label) }}
              </option>
            </select>
          </div>
          <div class="flex justify-end space-x-2">
            <button type="button" @click="cancelEditSeason" class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition duration-300 ease-in-out">
              {{ $t('cancel') }}
            </button>
            <button type="submit" class="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition duration-300 ease-in-out">
              {{ $t('save') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, inject, computed} from 'vue'
import {useI18n} from 'vue-i18n'
import LoaderComponent from "@/components/LoaderComponent.vue"
import CustomSelect from "@/components/CustomSelect.vue";

const {t} = useI18n()
const tournamentService = inject('tournamentService')

// State
const tournaments = ref([])
const allTournaments = ref([]) // Store all tournaments
const filteredTournaments = ref([])
const loading = ref(false)
const error = ref(null)
const statusCounts = ref({})
const selectedStatus = ref('')
const showTestItems = ref(false) // Toggle for showing test items
const showSeasonsModal = ref(false)
const seasons = ref([])
const loadingSeasons = ref(false)
const selectedTournament = ref(null)
const showEditTournamentModal = ref(false)
const showEditSeasonModal = ref(false)
const editingTournament = ref(null)
const editingSeason = ref(null)

const statusOptions = [
  {value: 1, label: 'open'},
  {value: 2, label: 'closed'},
  {value: 3, label: 'inProgress'},
  {value: 4, label: 'finished'},
  {value: 5, label: 'cancelled'}
]

const labelId = computed(() => 'status-filter-label');



// Methods
function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString()
}

async function loadTournaments() {
  loading.value = true
  error.value = null
  try {
    allTournaments.value = await tournamentService.getAllTournamentsWithOrganizations()
    await loadStatusCounts()
    filterTournaments()
  } catch (e) {
    error.value = t('errorLoadingTournaments')
    console.error('error loading tournaments:', e)
  } finally {
    loading.value = false
  }
}

async function loadStatusCounts() {
  try {
    statusCounts.value = await tournamentService.getTournamentStatusCounts()
  } catch (e) {
    console.error('error loading status counts:', e)
  }
}

async function filterTournaments() {
  // First filter by test status
  let filtered = showTestItems.value 
    ? allTournaments.value 
    : allTournaments.value.filter(tournament => !tournament.is_test);
  
  // Then filter by selected status if needed
  if (selectedStatus.value) {
    try {
      const statusFiltered = await tournamentService.filterTournamentsByStatus(selectedStatus.value)
      // Only keep tournaments that are in both filtered arrays
      filteredTournaments.value = statusFiltered.filter(tournament => 
        filtered.some(t => t.id === tournament.id)
      )
    } catch (e) {
      console.error('error filtering tournaments by status:', e)
      filteredTournaments.value = filtered
    }
  } else {
    filteredTournaments.value = filtered
  }
}

async function viewSeasons(tournamentId) {
  loadingSeasons.value = true
  showSeasonsModal.value = true
  selectedTournament.value = tournaments.value.find(t => t.id === tournamentId)
  try {
    seasons.value = await tournamentService.getTournamentSeasons(tournamentId)
  } catch (e) {
    console.error('error loading seasons:', e)
  } finally {
    loadingSeasons.value = false
  }
}

function closeSeasonsModal() {
  showSeasonsModal.value = false
  seasons.value = []
  selectedTournament.value = null
}

function getStatusClass(status) {
  const classes = {
    1: 'bg-green-100 text-green-800',
    2: 'bg-red-100 text-red-800',
    3: 'bg-yellow-100 text-yellow-800',
    4: 'bg-blue-100 text-blue-800',
    5: 'bg-gray-100 text-gray-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

function getStatusLabel(status) {
  const labels = {
    1: 'open',
    2: 'closed',
    3: 'inProgress',
    4: 'finished',
    5: 'cancelled'
  }
  return labels[status] || 'unknown'
}

function editTournament(tournament) {
  editingTournament.value = {...tournament}
  showEditTournamentModal.value = true
}

function cancelEditTournament() {
  editingTournament.value = null
  showEditTournamentModal.value = false
}

async function saveTournament() {
  try {
    await tournamentService.updateTournament(editingTournament.value.id, {
      name: editingTournament.value.name,
      description: editingTournament.value.description
    })
    const index = tournaments.value.findIndex(t => t.id === editingTournament.value.id)
    if (index !== -1) {
      tournaments.value[index] = {...tournaments.value[index], ...editingTournament.value}
    }
    showEditTournamentModal.value = false
    alert(t('updateSuccess'))
  } catch (error) {
    console.error('error updating tournament:', error)
    alert(t('updateError'))
  }
}

function editSeason(season) {
  editingSeason.value = {...season}
  showEditSeasonModal.value = true
}

function cancelEditSeason() {
  editingSeason.value = null
  showEditSeasonModal.value = false
}

async function saveSeason() {
  try {
    await tournamentService.updateSeason(editingSeason.value.id, {
      description: editingSeason.value.description,
      tournament_status: editingSeason.value.tournament_status
    })
    const index = seasons.value.findIndex(s => s.id === editingSeason.value.id)
    if (index !== -1) {
      seasons.value[index] = {...seasons.value[index], ...editingSeason.value}
    }
    showEditSeasonModal.value = false
    alert(t('updateSuccess'))
  } catch (error) {
    console.error('error updating season:', error)
    alert(t('updateError'))
  }
}

// Load tournaments when component mounts
onMounted(() => {
  loadTournaments()
})
</script>

<style scoped>
/* Add any component-specific styles here if needed */
</style>
