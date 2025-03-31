<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">Solicitudes de Reclamo de Jugador</h1>

    <!-- Success message -->
    <div v-if="successMessage" class="mb-4 p-4 bg-green-100 text-green-700 rounded-md">
      {{ successMessage }}
    </div>

    <div class="bg-white shadow-md rounded-lg overflow-hidden">
      <div class="p-4 bg-gray-50 border-b">
        <h2 class="text-xl font-semibold text-gray-700">Solicitudes pendientes</h2>
      </div>

      <!-- Loading state -->
      <LoaderComponent v-if="loading"/>

      <!-- error state -->
      <div v-else-if="error" class="p-4 text-center text-red-600">
        {{ error }}
      </div>

      <!-- Empty state -->
      <div v-else-if="claimRequests.length === 0" class="p-4 text-center text-gray-500">
        No hay solicitudes de reclamo pendientes
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
        <tr v-for="item in claimRequests" :key="item.id">
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="flex items-center">
              <img v-if="item.user.avatar_url"
                   :src="item.user.avatar_url"
                   class="h-10 w-10 rounded-full"
                   :alt="item.user.username">
              <span v-else class="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                {{ item.user.username.charAt(0).toUpperCase() }}
              </span>
              <span class="ml-4">{{ item.user.username }}</span>
            </div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="flex items-center">
              <img v-if="item.player.image"
                   :src="item.player.image"
                   class="h-10 w-10 rounded-full"
                   :alt="item.player.name">
              <span v-else class="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                {{ item.player.name.charAt(0).toUpperCase() }}
              </span>
              <span class="ml-4">{{ item.player.name || item.player.first_name }}</span>
            </div>
          </td>
          <td class="px-6 py-4">
            {{ formatDate(item.created_at) }}
          </td>
          <td class="px-6 py-4">
            <button 
              @click="openImageModal(item.file)"
              class="text-blue-600 hover:text-blue-800 underline"
            >
              Ver documento
            </button>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-right space-x-2">
            <button
                class="inline-flex items-center justify-center p-2 rounded-full text-green-600 hover:bg-green-50 transition-colors"
                title="Aprobar"
                @click="handleApproveRequest(item)"
                :disabled="processingIds.includes(item.id)"
            >
              <Check v-if="!processingIds.includes(item.id)" class="w-5 h-5"/>
              <span v-else class="w-5 h-5 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></span>
            </button>
            <button
                class="inline-flex items-center justify-center p-2 rounded-full text-red-600 hover:bg-red-50 transition-colors"
                title="Rechazar"
                @click="handleRejectRequest(item.id)"
                :disabled="processingIds.includes(item.id)"
            >
              <X v-if="!processingIds.includes(item.id)" class="w-5 h-5"/>
              <span v-else class="w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></span>
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <!-- Image Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-4 rounded-lg max-w-4xl w-full max-h-screen overflow-auto">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold">Documento de verificación</h3>
          <button @click="showModal = false" class="text-gray-500 hover:text-gray-700">
            <X class="w-6 h-6" />
          </button>
        </div>
        <div class="flex justify-center">
          <img :src="currentImage" alt="Documento de verificación" class="max-w-full max-h-[70vh] object-contain" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject, watch } from 'vue'
import LoaderComponent from "@/components/LoaderComponent.vue"
import { Check, X } from 'lucide-vue-next';

const playerService = inject('playerService')

// State
const claimRequests = ref([])
const loading = ref(false)
const error = ref(null)
const successMessage = ref('')
const processingIds = ref([]) // Para seguimiento de IDs que se están procesando
const showModal = ref(false)
const currentImage = ref('')

const headers = [
  { text: 'Usuario', value: 'username' },
  { text: 'Jugador', value: 'player' },
  { text: 'Fecha de solicitud', value: 'created_at' },
  { text: 'Documento', value: 'file' },
  { text: '', value: 'actions' }
]

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const openImageModal = (imageUrl) => {
  currentImage.value = imageUrl
  showModal.value = true
}

const handleApproveRequest = async (item) => {
  try {
    // Limpiar mensajes anteriores
    error.value = null
    successMessage.value = ''

    // Añadir ID a la lista de procesamiento
    processingIds.value.push(item.id)

    console.log('Approving claim request with ID:', item.id)
    const result = await playerService.approvePlayerClaim(item.id, item.player.id, item.user.id)
    console.log('Approve result:', result)

    if (result.success) {
      successMessage.value = result.message || 'Solicitud aprobada exitosamente'
      // Recargar la lista después de aprobar
      await loadClaimRequests()
    } else {
      error.value = result.error || 'Error al aprobar solicitud'
    }
  } catch (err) {
    console.error('Error al aprobar solicitud:', err)
    error.value = 'Error al aprobar solicitud'
  } finally {
    // Remover ID de la lista de procesamiento
    processingIds.value = processingIds.value.filter(id => id !== item.id)
  }
}

const handleRejectRequest = async (requestId) => {
  try {
    // Limpiar mensajes anteriores
    error.value = null
    successMessage.value = ''

    // Añadir ID a la lista de procesamiento
    processingIds.value.push(requestId)

    console.log('Rejecting claim request with ID:', requestId)
    const result = await playerService.rejectPlayerClaim(requestId)
    console.log('Reject result:', result)

    if (result.success) {
      successMessage.value = result.message || 'Solicitud rechazada exitosamente'
      // Recargar la lista después de rechazar
      await loadClaimRequests()
    } else {
      error.value = result.error || 'Error al rechazar solicitud'
    }
  } catch (err) {
    console.error('Error al rechazar solicitud:', err)
    error.value = 'Error al rechazar solicitud'
  } finally {
    // Remover ID de la lista de procesamiento
    processingIds.value = processingIds.value.filter(id => id !== requestId)
  }
}

async function loadClaimRequests() {
  loading.value = true
  error.value = null
  try {
    claimRequests.value = await playerService.getPlayerClaimRequests()
    console.log('Claim requests loaded:', claimRequests.value)
  } catch (e) {
    error.value = 'Error al cargar las solicitudes de reclamo'
    console.error('Error loading claim requests:', e)
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

// Load claim requests when component mounts
onMounted(() => {
  loadClaimRequests()
})
</script>