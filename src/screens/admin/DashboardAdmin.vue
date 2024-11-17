<template>
  <div class="min-h-screen  p-8 transition-colors duration-500">
    <div class="container mx-auto">
      <header class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-gray-800">{{ $t('dashboard') }}</h1>
      </header>

      <LoaderComponent loading="loading" v-if="loading"/>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

        <StatCard v-for="stat in stats" :key="stat.name" :stat="stat" />
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
<!--        <ChartCard />-->
<!--        <OrganizationsCard />-->
      </div>
    </div>

    <FloatingActionButton />
  </div>
</template>

<script setup>
import {inject, onMounted, ref} from 'vue'
import { Users, UserPlus, Trophy, Building } from 'lucide-vue-next'
import StatCard from '@/components/admin/StatCard.vue'
// import ChartCard from '@/components/admin/ChartCard.vue'
// import OrganizationsCard from '@/components/admin/OrganizationsCard.vue'
import FloatingActionButton from '@/components/admin/FloatingActionButton.vue'
import {useI18n} from "vue-i18n";
import LoaderComponent from "@/components/LoaderComponent.vue";
const { t } = useI18n()
const organizationService = inject('organizationService')
const playerService = inject('playerService')
const tournamentService = inject('tournamentService')
const teamService = inject('teamService')

// State
const countOrg = ref(0)
const countPlayers = ref(0)
const countTournaments = ref(0)
const countTeams = ref(0)
const loading = ref(false)
const error = ref(null)
const stats = ref([])

// Methods
async function loadData() {
  loading.value = true
  error.value = null
  try {
    const organizations = await organizationService.getAllOrganizationsWithCreators()
    const players = await playerService.getAll()
    const tournaments = await tournamentService.getAllTournamentsWithOrganizations()
    const teams = await teamService.getAll()
    countOrg.value = organizations.length;
    countPlayers.value = players.length;
    countTournaments.value = tournaments.length;
    countTeams.value = teams.length;
  } catch (e) {
    error.value = t('errorLoadingOrganizations')
    console.error('Error loading:', e)
  } finally {
    loading.value = false
    stats.value = [
      { name: 'totalTeams', value: countTeams, icon: Users, href: '/admin/teams' },
      { name: 'totalPlayers', value: countPlayers, icon: UserPlus, href: '/players' },
      { name: 'activeTournaments', value: countTournaments, icon: Trophy, href: '/tournaments' },
      { name: 'totalOrganizations', value: countOrg, icon: Building, href: '/organizations' },
    ]
  }
}

// Load organizations when component mounts
onMounted(() => {
  loadData()
})

</script>
