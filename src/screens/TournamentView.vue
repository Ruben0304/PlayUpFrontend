<template>
  <section class="pt-32 pb-8 relative bg-background-500 min-h-screen">
    <!-- Content container -->
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header with animated title -->
      <!-- <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-4 relative inline-block">
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-primary-600 animate-gradient-x">
            Torneos
          </span>
          <div class="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary-500/0 via-primary-500 to-primary-500/0 animate-pulse-slow"></div>
        </h1>
        <p class="text-gray-300 max-w-2xl mx-auto animate-fade-in-up animation-delay-300">
          Descubre los torneos más emocionantes y únete a la competición para demostrar tus habilidades
        </p>
      </div> -->

      <!-- Tournament filters -->
      <div class="mb-8 flex flex-wrap justify-center gap-3 animate-fade-in-up animation-delay-500">
        <button 
          v-for="(status, index) in ['Todos', 'Abiertos', 'En progreso', 'Finalizados']" 
          :key="status"
          @click="filterStatus = index === 0 ? null : index === 1 ? 1 : index === 2 ? 3 : 4"
          class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-glow"
          :class="[
            (index === 0 && filterStatus === null) || 
            (index === 1 && filterStatus === 1) || 
            (index === 2 && filterStatus === 3) || 
            (index === 3 && filterStatus === 4)
              ? 'bg-primary-500 text-white shadow-glow' 
              : 'bg-background-700 text-gray-300 hover:bg-background-600'
          ]"
        >
          {{ status }}
        </button>
      </div>

      <!-- Skeleton loading -->
      <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="i in 6" :key="i" class="bg-background-600 rounded-xl overflow-hidden shadow-xl border border-background-400/10 animate-pulse">
          <div class="h-48 bg-background-700"></div>
          <div class="p-5 space-y-3">
            <div class="h-6 bg-background-700 rounded w-3/4"></div>
            <div class="h-4 bg-background-700 rounded w-1/2"></div>
            <div class="pt-4 flex justify-between items-center">
              <div class="h-10 w-10 rounded-full bg-background-700"></div>
              <div class="h-8 w-24 rounded-full bg-background-700"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tournament cards -->
      <div v-else-if="filteredTournaments.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="(tournament, index) in filteredTournaments" 
          :key="tournament.id"
          class="group bg-background-600 rounded-xl overflow-hidden shadow-xl border border-background-400/10 transition-all duration-500 hover:shadow-glow hover:border-primary-500/30 animate-fade-in-up"
          :style="{ animationDelay: `${800 + (index * 100)}ms` }"
        >
          <!-- Tournament banner with overlay -->
          <div class="relative h-48 overflow-hidden">
            <img 
              :src="tournament.banner_image || 'https://via.placeholder.com/800x400/232222/666666?text=Tournament'" 
              :alt="tournament.name"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-background-900 to-transparent opacity-70"></div>
            
            <!-- Status badge -->
            <div 
              class="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold"
              :class="getStatusClass(tournament.current_season?.tournament_status)"
            >
              {{ getStatusText(tournament.current_season?.tournament_status) }}
            </div>
            
            <!-- Tournament name -->
            <div class="absolute bottom-0 left-0 w-full p-4">
              <h3 class="text-xl font-bold text-white truncate group-hover:text-primary-400 transition-colors duration-300">
                {{ tournament.name }}
              </h3>
              <p class="text-sm text-gray-300 line-clamp-1">
                {{ tournament.description || 'Sin descripción' }}
              </p>
            </div>
          </div>
          
          <!-- Tournament details -->
          <div class="p-4">
            <div class="flex justify-between items-center">
              <!-- Organization info -->
              <div class="flex items-center">
                <div class="w-10 h-10 rounded-full bg-background-700 flex items-center justify-center overflow-hidden border-2 border-primary-500/30 group-hover:border-primary-500 transition-colors duration-300">
                  <img 
                    v-if="tournament.logo" 
                    :src="tournament.logo" 
                    :alt="tournament.organization_name"
                    class="w-full h-full object-cover"
                  />
                  <span v-else class="text-primary-500 text-xs font-bold">{{ getInitials(tournament.organization_name) }}</span>
                </div>
                <div class="ml-3">
                  <p class="text-sm font-medium text-gray-300">{{ tournament.organization_name || 'Organización' }}</p>
                  <p class="text-xs text-gray-400">{{ formatDate(tournament.created_at) }}</p>
                </div>
              </div>
              
              <!-- Action button -->
              <button 
                @click="openTournamentDetails(tournament)"
                class="px-4 py-2 rounded-full text-sm font-medium bg-primary-500 text-white transition-all duration-300 transform hover:scale-105 hover:shadow-glow hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50"
              >
                Ver detalles
              </button>
            </div>
            
            <!-- Tournament stats -->
            <div class="mt-4 pt-4 border-t border-background-400/10 grid grid-cols-3 gap-2 text-center">
              <div>
                <p class="text-xs text-gray-400">Equipos</p>
                <p class="text-lg font-semibold text-white">{{ tournament.current_season?.teamCount || 0 }}</p>
              </div>
              <div>
                <p class="text-xs text-gray-400">Temporada</p>
                <p class="text-lg font-semibold text-white">{{ tournament.current_season?.season || 1 }}</p>
              </div>
              <div>
                <p class="text-xs text-gray-400">Ronda</p>
                <p class="text-lg font-semibold text-white">{{ tournament.current_season?.current_round || '-' }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div v-else class="text-center py-16 animate-fade-in">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-background-700 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 class="text-xl font-medium text-white mb-2">No hay torneos disponibles</h3>
        <p class="text-gray-400 max-w-md mx-auto">
          No se encontraron torneos con los filtros seleccionados. Intenta cambiar los filtros o vuelve más tarde.
        </p>
      </div>

      <!-- Pagination controls -->
      <div v-if="!isLoading && filteredTournaments.length > 0" class="mt-12 flex justify-center space-x-2 animate-fade-in animation-delay-1000">
        <button 
          v-for="page in 3" 
          :key="page"
          @click="currentPage = page"
          class="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
          :class="currentPage === page ? 'bg-primary-500 text-white' : 'bg-background-700 text-gray-300 hover:bg-background-600'"
        >
          {{ page }}
        </button>
      </div>
    </div>
  </section>

  <!-- Tournament Details Modal -->
  <Teleport to="body">
    <div 
      v-if="showDetailsModal" 
      class="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in"
      @click="closeDetailsModal"
    >
      <div 
        class="bg-background-600 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden animate-scale-in"
        @click.stop
      >
        <!-- Modal Header -->
        <div class="relative h-48 overflow-hidden">
          <img 
            :src="selectedTournament?.banner_image || 'https://via.placeholder.com/1200x400/232222/666666?text=Tournament'" 
            :alt="selectedTournament?.name"
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-background-900 to-transparent opacity-80"></div>
          
          <div class="absolute top-4 right-4">
            <button @click="closeDetailsModal" class="text-white hover:text-primary-500 transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div class="absolute bottom-0 left-0 w-full p-6">
            <div class="flex items-center">
              <div class="w-16 h-16 rounded-full bg-background-700 flex items-center justify-center overflow-hidden border-2 border-primary-500">
                <img 
                  v-if="selectedTournament?.logo" 
                  :src="selectedTournament.logo" 
                  :alt="selectedTournament?.organization_name"
                  class="w-full h-full object-cover"
                />
                <span v-else class="text-primary-500 text-xl font-bold">{{ getInitials(selectedTournament?.organization_name) }}</span>
              </div>
              <div class="ml-4">
                <h2 class="text-2xl font-bold text-white">{{ selectedTournament?.name }}</h2>
                <p class="text-gray-300">{{ selectedTournament?.organization_name }}</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Tournament Description -->
        <div class="p-6 border-b border-background-400/20">
          <h3 class="text-xl font-semibold text-white mb-2">Descripción</h3>
          <p class="text-gray-300">{{ selectedTournament?.description || 'Sin descripción disponible.' }}</p>
        </div>
        
        <!-- Seasons List -->
        <div class="p-6">
          <h3 class="text-xl font-semibold text-white mb-4">Temporadas</h3>
          
          <div v-if="seasonsLoading" class="flex justify-center py-8">
            <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500"></div>
          </div>
          
          <div v-else-if="tournamentSeasons.length === 0" class="text-center py-8 text-gray-400">
            No hay temporadas disponibles para este torneo.
          </div>
          
          <div v-else class="space-y-4">
            <div 
              v-for="season in tournamentSeasons" 
              :key="season.id" 
              class="bg-background-700 rounded-lg p-4 hover:bg-background-600 transition-colors duration-200"
            >
              <div class="flex justify-between items-center">
                <div>
                  <h4 class="text-lg font-medium text-white">
                    Temporada {{ season.season }}
                    <span v-if="season.current" class="ml-2 px-2 py-0.5 text-xs rounded-full bg-primary-500 text-white">Actual</span>
                  </h4>
                  <p class="text-sm text-gray-400">{{ formatDate(season.start_date) }}</p>
                </div>
                <div class="text-right">
                  <p class="text-sm text-gray-300">
                    <span class="font-medium">Estado:</span> {{ getStatusText(season.tournament_status) }}
                  </p>
                  <p class="text-sm text-gray-300">
                    <span class="font-medium">Equipos:</span> {{ season.teamCount }}
                  </p>
                </div>
              </div>
              
              <div class="mt-3 pt-3 border-t border-background-400/20">
                <p class="text-sm text-gray-300">{{ season.description || 'Sin descripción' }}</p>
              </div>
              
              <div class="mt-3 flex justify-between items-center">
                <div>
                  <p class="text-sm text-gray-300">
                    <span class="font-medium">Ronda actual:</span> {{ season.current_round || 'No iniciado' }}
                  </p>
                </div>
                <button class="px-3 py-1.5 rounded-full text-xs font-medium bg-primary-500 text-white hover:bg-primary-400 transition-colors duration-200">
                  Ver detalles
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, onMounted, inject } from 'vue';


// Services
const tournamentService = inject('tournamentService');

// State
const tournaments = ref([]);
const isLoading = ref(true);
const filterStatus = ref(null);
const currentPage = ref(1);

// Modal state
const showDetailsModal = ref(false);
const selectedTournament = ref(null);
const tournamentSeasons = ref([]);
const seasonsLoading = ref(false);

// Computed
const filteredTournaments = computed(() => {
  if (filterStatus.value === null) return tournaments.value;
  
  return tournaments.value.filter(tournament => {
    const status = tournament.current_season?.tournament_status;
    return status === filterStatus.value;
  });
});

// Methods
const fetchTournaments = async () => {
  isLoading.value = true;
  try {
    const data = await tournamentService.getAllTournamentsWithOrganizations();
    tournaments.value = data;
    
    // Fetch additional season data for each tournament
    for (const tournament of tournaments.value) {
      if (tournament.season_count > 0) {
        const seasons = await tournamentService.getTournamentSeasons(tournament.id);
        const currentSeason = seasons.find(s => s.current) || seasons[0];
        tournament.current_season = currentSeason;
      }
    }
  } catch (error) {
    console.error('Error fetching tournaments:', error);
  } finally {
    // Simulate longer loading for demo purposes
    setTimeout(() => {
      isLoading.value = false;
    }, 1500);
  }
};

const openTournamentDetails = async (tournament) => {
  selectedTournament.value = tournament;
  showDetailsModal.value = true;
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
  
  // Fetch seasons for this tournament
  await fetchTournamentSeasons(tournament.id);
};

const fetchTournamentSeasons = async (tournamentId) => {
  seasonsLoading.value = true;
  try {
    const seasons = await tournamentService.getTournamentSeasons(tournamentId);
    tournamentSeasons.value = seasons;
  } catch (error) {
    console.error('Error fetching tournament seasons:', error);
  } finally {
    seasonsLoading.value = false;
  }
};

const closeDetailsModal = () => {
  showDetailsModal.value = false;
  document.body.style.overflow = ''; // Restore scrolling
};

const getStatusText = (status) => {
  switch (status) {
    case 1: return 'Abierto';
    case 2: return 'Cerrado';
    case 3: return 'En progreso';
    case 4: return 'Finalizado';
    case 5: return 'Cancelado';
    default: return 'Desconocido';
  }
};

const getStatusClass = (status) => {
  switch (status) {
    case 1: return 'bg-green-500/30 text-green-300 border border-green-500/30';
    case 2: return 'bg-yellow-500/30 text-yellow-300 border border-yellow-500/30';
    case 3: return 'bg-blue-500/30 text-blue-300 border border-blue-500/30';
    case 4: return 'bg-gray-500/30 text-gray-300 border border-gray-500/30';
    case 5: return 'bg-red-500/30 text-red-300 border border-red-500/30';
    default: return 'bg-gray-500/30 text-gray-300 border border-gray-500/30';
  }
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('es-ES', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  }).format(date);
};

const getInitials = (name) => {
  if (!name) return '?';
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();
};

// Lifecycle
onMounted(() => {
  fetchTournaments();
});
</script>

<style scoped>
/* Custom animations */
@keyframes pulse-slow {
  0%, 100% { opacity: 0.7; }
  50% { opacity: 0.3; }
}

@keyframes gradient-x {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-pulse-slow {
  animation: pulse-slow 4s ease-in-out infinite;
}

.animate-gradient-x {
  animation: gradient-x 10s ease infinite;
  background-size: 200% 200%;
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out forwards;
  opacity: 0;
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out forwards;
  opacity: 0;
}

.animate-scale-in {
  animation: scale-in 0.3s ease-out forwards;
}

.animation-delay-300 {
  animation-delay: 300ms;
}

.animation-delay-500 {
  animation-delay: 500ms;
}

.animation-delay-1000 {
  animation-delay: 1000ms;
}

.animation-delay-2000 {
  animation-delay: 2000ms;
}

.shadow-glow {
  box-shadow: 0 0 15px rgba(249, 61, 61, 0.3);
}

.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>