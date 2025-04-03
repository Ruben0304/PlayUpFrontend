<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">{{ $t('teams') }}</h1>

    <!-- Filter toggle -->
    <div class="mb-4 flex items-center">
      <label class="inline-flex items-center cursor-pointer mr-4">
        <input type="checkbox" v-model="showTestItems" class="sr-only peer">
        <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
        <span class="ml-3 text-sm font-medium text-gray-700">{{ $t('showTestItems') }}</span>
      </label>
    </div>

    <div class="bg-white shadow-md rounded-lg overflow-hidden">
      <div class="p-4 bg-gray-50 border-b flex justify-between items-center">
        <h2 class="text-xl font-semibold text-gray-700">{{ $t('teamList') }}</h2>
        <button @click="openDialog" class="bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded">
          {{ $t('newTeam') }}
        </button>
      </div>

      <!-- Loading state -->
      <LoaderComponent loading="loading" v-if="loading"/>

      <!-- error state -->
      <div v-else-if="error" class="p-4 text-center text-red-600">
        {{ error }}
      </div>

      <!-- Data table -->
      <table v-else class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
        <tr>
          <th v-for="header in headers" :key="header.value"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            {{ header.text }}
          </th>
        </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="item in teams" :key="item.id">
          <td class="px-6 py-4 whitespace-nowrap">{{ item.name }}</td>
          <td class="px-6 py-4 whitespace-nowrap">{{ item.location }}</td>
          <td class="px-6 py-4 whitespace-nowrap">{{ item.code }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-right space-x-2">
            <button
                @click="editItem(item)"
                class="inline-flex items-center justify-center p-2 rounded-full text-blue-600 hover:bg-blue-50 transition-colors"
                :title="$t('edit')"
            >
              <Edit2 class="w-5 h-5"/>
            </button>
            <button
                @click="deleteItem(item)"
                class="inline-flex items-center justify-center p-2 rounded-full text-red-600 hover:bg-red-50 transition-colors"
                :title="$t('delete')"
            >
              <Trash2 class="w-5 h-5"/>
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal para crear/editar equipo -->
    <div v-if="dialog"
         class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div class="bg-white p-5 rounded-lg shadow-xl w-full max-w-md">
        <h3 class="text-lg font-semibold mb-4">{{ formTitle }}</h3>
        <form @submit.prevent="save">
          <div class="mb-4">
            <label for="name" class="block text-sm font-medium text-gray-700">{{ $t('teamName') }}</label>
            <input type="text" id="name" v-model="editedItem.name"
                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50">
          </div>
          <div class="mb-4">
            <label for="location" class="block text-sm font-medium text-gray-700">{{ $t('location') }}</label>
            <input type="text" id="location" v-model="editedItem.location"
                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50">
          </div>
          <div class="mb-4">
            <label for="code" class="block text-sm font-medium text-gray-700">{{ $t('teamCode') }}</label>
            <input type="text" id="code" v-model="editedItem.code"
                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50">
          </div>
          <div class="flex justify-end space-x-2">
            <button type="button" @click="close"
                    class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              {{ $t('cancel') }}
            </button>
            <button type="submit" :disabled="saving"
                    class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              {{ saving ? $t('saving') : $t('save') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, computed, onMounted, inject, nextTick, watch} from 'vue'
import {useI18n} from 'vue-i18n'
import LoaderComponent from "@/components/LoaderComponent.vue";
import {Edit2, Trash2} from "lucide-vue-next";

const {t} = useI18n()
const teamService = inject('teamService')

// Estado
const dialog = ref(false)
const teams = ref([])
const allTeams = ref([]) // Store all teams
const editedIndex = ref(-1)
const loading = ref(false)
const saving = ref(false)
const error = ref(null)
const showTestItems = ref(false) // Toggle for showing test items

const editedItem = ref({
  name: '',
  location: '',
  code: ''
})

const defaultItem = {
  name: '',
  location: '',
  code: ''
}

const headers = [
  {text: t('teamName'), value: 'name'},
  {text: t('location'), value: 'location'},
  {text: t('teamCode'), value: 'code'},
  {text: "", value: 'actions'}
]

const formTitle = computed(() => {
  return editedIndex.value === -1 ? t('newTeam') : t('editTeam')
})

// Métodos
async function loadTeams() {
  loading.value = true
  error.value = null
  try {
    allTeams.value = await teamService.getAll()
    filterTeams()
  } catch (e) {
    error.value = t('errorLoadingTeams')
    console.error('error loading teams:', e)
  } finally {
    loading.value = false
  }
}

// Filter teams based on showTestItems toggle
function filterTeams() {
  if (showTestItems.value) {
    teams.value = allTeams.value
  } else {
    teams.value = allTeams.value.filter(team => !team.is_test)
  }
}

// Watch for changes to showTestItems and update filtered teams
watch(showTestItems, () => {
  filterTeams()
})

function openDialog() {
  dialog.value = true
}

function editItem(item) {
  editedIndex.value = teams.value.indexOf(item)
  editedItem.value = Object.assign({}, item)
  dialog.value = true
}

async function deleteItem(item) {
  if (confirm(t('deleteConfirmation'))) {
    try {
      await teamService.delete(item.id)
      const index = teams.value.indexOf(item)
      teams.value.splice(index, 1)
    } catch (e) {
      console.error('error deleting team:', e)
      alert(t('errorDeletingTeam'))
    }
  }
}

function close() {
  dialog.value = false
  nextTick(() => {
    editedItem.value = Object.assign({}, defaultItem)
    editedIndex.value = -1
  })
}

async function save() {
  saving.value = true
  try {
    if (editedIndex.value > -1) {
      const updatedTeam = await teamService.update(editedItem.value.id, editedItem.value)
      Object.assign(teams.value[editedIndex.value], updatedTeam)
    } else {
      const newTeam = await teamService.create(editedItem.value)
      teams.value.push(newTeam)
    }
    close()
  } catch (e) {
    console.error('error saving team:', e)
    alert(t('errorSavingTeam'))
  } finally {
    saving.value = false
  }
}

// Cargar equipos al montar el componente
onMounted(() => {
  loadTeams()
})
</script>