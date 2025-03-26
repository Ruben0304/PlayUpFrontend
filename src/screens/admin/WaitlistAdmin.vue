<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">Lista de espera</h1>

    <!-- Success message -->
    <div v-if="successMessage" class="mb-4 p-4 bg-green-100 text-green-700 rounded-md">
      {{ successMessage }}
    </div>

    <div class="bg-white shadow-md rounded-lg overflow-hidden">
      <div class="p-4 bg-gray-50 border-b">
        <h2 class="text-xl font-semibold text-gray-700">Usuarios en lista de espera</h2>
      </div>

      <!-- Loading state -->
      <LoaderComponent v-if="loading"/>

      <!-- error state -->
      <div v-else-if="error" class="p-4 text-center text-red-600">
        {{ error }}
      </div>

      <!-- Empty state -->
      <div v-else-if="waitlistUsers.length === 0" class="p-4 text-center text-gray-500">
        No hay usuarios en lista de espera
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
        <tr v-for="item in waitlistUsers" :key="item.waitlistId">
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="flex items-center">
              <img v-if="item.avatar_url"
                   :src="item.avatar_url"
                   class="h-10 w-10 rounded-full"
                   :alt="item.username">
              <span v-else class="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                {{ item.username.charAt(0).toUpperCase() }}
              </span>
              <span class="ml-4">{{ item.username }}</span>
            </div>
          </td>
          <td class="px-6 py-4">
            {{ item.email }}
          </td>
          <td class="px-6 py-4">
            {{ item.tournament_name }}
          </td>
          <td class="px-6 py-4">
            <div v-if="item.urls && item.urls.length > 0" class="space-y-1">
              <a
                  v-for="(url, index) in item.urls"
                  :key="index"
                  :href="url"
                  target="_blank"
                  class="block text-blue-600 hover:underline truncate max-w-xs"
              >
                {{ url }}
              </a>
            </div>
            <span v-else class="text-gray-400">Sin URLs</span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-right space-x-2">
            <button
                class="inline-flex items-center justify-center p-2 rounded-full text-green-600 hover:bg-green-50 transition-colors"
                title="Aceptar"
                @click="handleAcceptUser(item.waitlistId)"
                :disabled="processingIds.includes(item.waitlistId)"
            >
              <Check v-if="!processingIds.includes(item.waitlistId)" class="w-5 h-5"/>
              <span v-else class="w-5 h-5 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></span>
            </button>
            <button
                class="inline-flex items-center justify-center p-2 rounded-full text-red-600 hover:bg-red-50 transition-colors"
                title="Rechazar"
                @click="handleCancelUser(item.waitlistId)"
                :disabled="processingIds.includes(item.waitlistId)"
            >
              <X v-if="!processingIds.includes(item.waitlistId)" class="w-5 h-5"/>
              <span v-else class="w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></span>
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject, watch } from 'vue'
import LoaderComponent from "@/components/LoaderComponent.vue"
import { Check, X } from 'lucide-vue-next';

const userService = inject('userService')

// State
const waitlistUsers = ref([])
const loading = ref(false)
const error = ref(null)
const successMessage = ref('')
const processingIds = ref([]) // Para seguimiento de IDs que se están procesando

const headers = [
  { text: 'Usuario', value: 'username' },
  { text: 'Email', value: 'email' },
  { text: 'Nombre del Torneo', value: 'tournament_name' },
  { text: 'URLs', value: 'urls' },
  { text: '', value: 'actions' }
]

const handleAcceptUser = async (waitlistId) => {
  try {
    // Limpiar mensajes anteriores
    error.value = null
    successMessage.value = ''

    // Añadir ID a la lista de procesamiento
    processingIds.value.push(waitlistId)

    console.log('Accepting user with ID:', waitlistId)
    const result = await userService.acceptWaitlistUser(waitlistId)
    console.log('Accept result:', result)

    if (result.success) {
      successMessage.value = result.message || 'Usuario aceptado exitosamente'
      // Recargar la lista después de aceptar
      await loadWaitlistUsers()
    } else {
      error.value = result.error || 'Error al aceptar usuario'
    }
  } catch (err) {
    console.error('Error al aceptar usuario:', err)
    error.value = 'Error al aceptar usuario'
  } finally {
    // Remover ID de la lista de procesamiento
    processingIds.value = processingIds.value.filter(id => id !== waitlistId)
  }
}

const handleCancelUser = async (waitlistId) => {
  try {
    // Limpiar mensajes anteriores
    error.value = null
    successMessage.value = ''

    // Añadir ID a la lista de procesamiento
    processingIds.value.push(waitlistId)

    console.log('Canceling user with ID:', waitlistId)
    const result = await userService.cancelWaitlistUser(waitlistId)
    console.log('Cancel result:', result)

    if (result.success) {
      successMessage.value = result.message || 'Usuario rechazado exitosamente'
      // Recargar la lista después de rechazar
      await loadWaitlistUsers()
    } else {
      error.value = result.error || 'Error al rechazar usuario'
    }
  } catch (err) {
    console.error('Error al rechazar usuario:', err)
    error.value = 'Error al rechazar usuario'
  } finally {
    // Remover ID de la lista de procesamiento
    processingIds.value = processingIds.value.filter(id => id !== waitlistId)
  }
}

async function loadWaitlistUsers() {
  loading.value = true
  error.value = null
  try {
    waitlistUsers.value = await userService.getWaitlistUsers()
    console.log('Waitlist users loaded:', waitlistUsers.value)
  } catch (e) {
    error.value = 'Error al cargar la lista de espera'
    console.error('Error loading waitlist:', e)
  } finally {
    loading.value = false
  }
}

// Limpiar mensaje de éxito después de 5 segundos
function clearSuccessMessage() {
  if (successMessage.value) {
    setTimeout(() => {
      successMessage.value = ''
    }, 5000)
  }
}

// Observar cambios en el mensaje de éxito
watch(successMessage, (newValue) => {
  if (newValue) {
    clearSuccessMessage()
  }
})

// Load waitlist users when component mounts
onMounted(() => {
  loadWaitlistUsers()
})
</script>