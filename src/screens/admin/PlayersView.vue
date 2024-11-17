<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <div class="mb-6 flex justify-between items-center">
      <h1 class="text-3xl font-bold text-gray-800">{{ $t('players') }}</h1>
<!--      <button-->
<!--          @click="openDialog"-->
<!--          class="bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors"-->
<!--      >-->
<!--        <UserPlus class="w-5 h-5"/>-->
<!--        {{ $t('newPlayer') }}-->
<!--      </button>-->
    </div>

    <div class="bg-white shadow-lg rounded-lg overflow-hidden">
      <!-- Loading state -->
      <LoaderComponent loading="loading" v-if="loading"/>

      <!-- Error state -->
      <div v-else-if="error" class="p-8 text-center">
        <AlertCircle class="w-8 h-8 text-red-500 mx-auto"/>
        <p class="mt-2 text-red-600">{{ error }}</p>
      </div>

      <!-- Data table -->
      <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {{ $t('image') }}
            </th>
            <th v-for="header in headers" :key="header.value"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {{ header.text }}
            </th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
            </th>
          </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="item in players" :key="item.id" class="hover:bg-gray-50 transition-colors">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="h-10 w-10 rounded-full overflow-hidden bg-gray-200">
                <img
                    v-if="item.image"
                    :src="item.image"
                    :alt="item.name"
                    class="h-full w-full object-cover"
                >
                <User v-else class="h-full w-full p-2 text-gray-400"/>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">{{ item.name }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ formatDate(item.birthdate) }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ item.height }}cm</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ item.weight }}kg</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ item.fav_position }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ item.preferred_foot }}</td>
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
    </div>

    <!-- Modal Form -->
    <!-- Modal para crear/editar jugador -->
    <div v-if="dialog"
         class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div class="bg-white p-5 rounded-lg shadow-xl w-full max-w-md">
        <h3 class="text-lg font-semibold mb-4">{{ formTitle }}</h3>
        <form @submit.prevent="save" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Información básica -->
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700">{{ $t('playerName') }}</label>
              <input
                  type="text"
                  id="name"
                  v-model="editedItem.name"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50"
                  required
              >
            </div>
            <div>
              <label for="first_name" class="block text-sm font-medium text-gray-700">{{ $t('firstName') }}</label>
              <input
                  type="text"
                  id="first_name"
                  v-model="editedItem.first_name"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50"
                  required
              >
            </div>
            <div>
              <label for="identification" class="block text-sm font-medium text-gray-700">{{
                  $t('identification')
                }}</label>
              <input
                  type="text"
                  id="identification"
                  v-model="editedItem.identification"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50"
                  required
              >
            </div>
            <div>
              <label for="birthdate" class="block text-sm font-medium text-gray-700">{{ $t('birthdate') }}</label>
              <input
                  type="date"
                  id="birthdate"
                  v-model="editedItem.birthdate"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50"
                  required
              >
            </div>

            <!-- Características físicas -->
            <div>
              <label for="height" class="block text-sm font-medium text-gray-700">{{ $t('height') }} (cm)</label>
              <input
                  type="number"
                  id="height"
                  v-model="editedItem.height"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50"
                  required
              >
            </div>
            <div>
              <label for="weight" class="block text-sm font-medium text-gray-700">{{ $t('weight') }} (kg)</label>
              <input
                  type="number"
                  id="weight"
                  v-model="editedItem.weight"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50"
                  required
              >
            </div>

            <!-- Características deportivas -->
            <div>
              <label for="fav_position" class="block text-sm font-medium text-gray-700">{{ $t('favPosition') }}</label>
              <input
                  type="text"
                  id="fav_position"
                  v-model="editedItem.fav_position"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50"
                  required
              >
            </div>
            <div>
              <label for="preferred_foot" class="block text-sm font-medium text-gray-700">{{
                  $t('preferredFoot')
                }}</label>
              <select
                  id="preferred_foot"
                  v-model="editedItem.preferred_foot"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50"
                  required
              >
                <option value="right">{{ $t('right') }}</option>
                <option value="left">{{ $t('left') }}</option>
              </select>
            </div>
          </div>

          <div class="flex justify-end space-x-2 pt-4">
            <button
                type="button"
                @click="close"
                class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              {{ $t('cancel') }}
            </button>
            <button
                type="submit"
                :disabled="saving"
                class="flex items-center gap-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
            >
              <Loader2 v-if="saving" class="animate-spin w-4 h-4"/>
              {{ saving ? $t('saving') : $t('save') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, computed, onMounted, inject} from 'vue'
import {useI18n} from 'vue-i18n'
import {
  User,
  Edit2,
  Trash2,
  Loader2,
  AlertCircle
} from 'lucide-vue-next'
import LoaderComponent from "@/components/LoaderComponent.vue";

const {t} = useI18n()
const playerService = inject('playerService')

// Estado
const dialog = ref(false)
const players = ref([])
const editedIndex = ref(-1)
const loading = ref(false)
const saving = ref(false)
const error = ref(null)

const editedItem = ref({
  name: '',
  first_name: '',
  identification: '',
  birthdate: '',
  height: '',
  weight: '',
  fav_position: '',
  preferred_foot: 'RIGHT',
  image: ''
})

const defaultItem = {
  name: '',
  first_name: '',
  identification: '',
  birthdate: '',
  height: '',
  weight: '',
  fav_position: '',
  preferred_foot: 'RIGHT',
  image: ''
}

const headers = [
  {text: t('playerName'), value: 'name'},
  {text: t('birthdate'), value: 'birthdate'},
  {text: t('height'), value: 'height'},
  {text: t('weight'), value: 'weight'},
  {text: t('position'), value: 'fav_position'},
  {text: t('foot'), value: 'preferred_foot'}
]

const formTitle = computed(() => {
  return editedIndex.value === -1 ? t('newPlayer') : t('editPlayer')
})

// Métodos
function formatDate(date) {
  return new Date(date).toLocaleDateString()
}

async function loadPlayers() {
  loading.value = true
  error.value = null
  try {
    players.value = await playerService.getAll()
  } catch (e) {
    error.value = t('errorLoadingPlayers')
    console.error('Error loading players:', e)
  } finally {
    loading.value = false
  }
}

function editItem(item) {
  editedIndex.value = players.value.indexOf(item)
  editedItem.value = Object.assign({}, item)
  dialog.value = true
}

async function deleteItem(item) {
  if (confirm(t('deleteConfirmation'))) {
    try {
      await playerService.delete(item.id)
      const index = players.value.indexOf(item)
      players.value.splice(index, 1)
    } catch (e) {
      console.error('Error deleting player:', e)
      alert(t('errorDeletingPlayer'))
    }
  }
}

// function openDialog() {
//   editedItem.value = Object.assign({}, defaultItem)
//   editedIndex.value = -1
//   dialog.value = true
// }

function close() {
  dialog.value = false
  editedItem.value = Object.assign({}, defaultItem)
  editedIndex.value = -1
}


async function save() {
  saving.value = true
  try {
    if (editedIndex.value > -1) {
      const updatedPlayer = await playerService.update(editedItem.value.identification, editedItem.value)
      Object.assign(players.value[editedIndex.value], updatedPlayer)
    } else {
      const newPlayer = await playerService.create(editedItem.value)
      players.value.push(newPlayer)
    }
    close()
  } catch (e) {
    console.error('Error saving player:', e)
    alert(t('errorSavingTeam'))
  } finally {
    saving.value = false
  }
}

// Cargar equipos al montar el componente
onMounted(() => {
  loadPlayers()
})
</script>