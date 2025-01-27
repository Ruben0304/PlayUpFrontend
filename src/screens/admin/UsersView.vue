<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">{{ $t('users') }}</h1>

    <div class="bg-white shadow-md rounded-lg overflow-hidden">
      <div class="p-4 bg-gray-50 border-b">
        <h2 class="text-xl font-semibold text-gray-700">{{ $t('userList') }}</h2>
        <div class="mt-4">
          <input
              v-model="searchTerm"
              @input="debounceSearch"
              type="text"
              :placeholder="$t('searchUsers')"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>

      <!-- Loading state -->
      <LoaderComponent v-if="loading"/>

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
        <tr v-for="item in users" :key="item.id">
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
          <td class="px-6 py-4 whitespace-nowrap">{{ item.role }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-right space-x-2">
            <button
                class="inline-flex items-center justify-center p-2 rounded-full transition-colors"
                :class="isBanned(item) ?
                  'text-green-600 hover:bg-green-50' :
                  'text-red-600 hover:bg-red-50'"
                :title="isBanned(item) ? $t('desbanear') : $t('banear')"
                @click="handleBanToggle(item.id, item.is_banned)"
            >
              <Shield v-if="isBanned(item)" class="w-5 h-5"/>
              <Ban v-else class="w-5 h-5"/>
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
import { Ban, Shield } from 'lucide-vue-next';

const { t } = useI18n()
const userService = inject('userService')

const isBanned = (item) => {
  return Boolean(item.is_banned);
};

const handleBanToggle = async (userId, is_banned) => {
  try {
    loading.value = true;

    if (is_banned) {
      await userService.unbanUser(userId);
    } else {
      await userService.banUser(userId);
    }

    await loadUsers();

  } catch (error) {
    console.error('error al cambiar estado de baneo:', error);
  } finally {
    loading.value = false;
  }
};

// State
const users = ref([])
const loading = ref(false)
const error = ref(null)
const searchTerm = ref('')

const headers = [
  { text: t('userName'), value: 'username' },
  { text: t('userRole'), value: 'role' },
  { text: '', value: '' }
]

// Methods
async function loadUsers() {
  loading.value = true
  error.value = null
  try {
    users.value = await userService.getAllUsersWithRoles(searchTerm.value)
  } catch (e) {
    error.value = t('errorLoadingUsers')
    console.error('error loading users:', e)
  } finally {
    loading.value = false
  }
}

// Debounce function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

const debounceSearch = debounce(() => {
  loadUsers();
}, 300);

// Load users when component mounts
onMounted(() => {
  loadUsers()
})
</script>