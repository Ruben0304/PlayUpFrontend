<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">{{ $t('waitlist') }}</h1>

    <div class="bg-white shadow-md rounded-lg overflow-hidden">
      <div class="p-4 bg-gray-50 border-b">
        <h2 class="text-xl font-semibold text-gray-700">{{ $t('waitlistUsers') }}</h2>
      </div>

      <!-- Loading state -->
      <LoaderComponent v-if="loading"/>

      <!-- error state -->
      <div v-else-if="error" class="p-4 text-center text-red-600">
        {{ error }}
      </div>

      <!-- Empty state -->
      <div v-else-if="waitlistUsers.length === 0" class="p-4 text-center text-gray-500">
        {{ $t('noWaitlistUsers') }}
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
          <td class="px-6 py-4 whitespace-nowrap text-right space-x-2">
            <button
                class="inline-flex items-center justify-center p-2 rounded-full text-green-600 hover:bg-green-50 transition-colors"
                :title="$t('accept')"
                @click="handleAcceptUser(item.waitlistId)"
            >
              <Check class="w-5 h-5"/>
            </button>
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
import LoaderComponent from "@/components/LoaderComponent.vue"
import { Check } from 'lucide-vue-next';

const { t } = useI18n()
const userService = inject('userService')

// State
const waitlistUsers = ref([])
const loading = ref(false)
const error = ref(null)

const headers = [
  { text: t('userName'), value: 'username' },
  { text: '', value: 'actions' }
]

const handleAcceptUser = async (waitlistId) => {
  try {
    loading.value = true;
    const result = await userService.acceptWaitlistUser(waitlistId);

    if (result.success) {
      // Recargar la lista después de aceptar
      await loadWaitlistUsers();
    }
  } catch (error) {
    console.error('error al aceptar usuario:', error);
  } finally {
    loading.value = false;
  }
};

async function loadWaitlistUsers() {
  loading.value = true
  error.value = null
  try {
    waitlistUsers.value = await userService.getWaitlistUsers()
    console.log('Waitlist users:', waitlistUsers.value);
  } catch (e) {
    error.value = t('errorLoadingWaitlist')
    console.error('error loading waitlist:', e)
  } finally {
    loading.value = false
  }
}

// Load waitlist users when component mounts
onMounted(() => {
  loadWaitlistUsers()
})
</script>