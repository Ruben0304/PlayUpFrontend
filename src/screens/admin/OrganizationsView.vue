<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">{{ $t('organizations') }}</h1>

    <div class="bg-white shadow-md rounded-lg overflow-hidden">
      <div class="p-4 bg-gray-50 border-b">
        <h2 class="text-xl font-semibold text-gray-700">{{ $t('organizationList') }}</h2>
      </div>

      <!-- Loading state -->
      <LoaderComponent v-if="loading"/>

      <!-- error state -->
      <div v-else-if="error" class="p-4 text-center text-red-600">
        {{ error }}
      </div>

      <!-- Organizations Grid -->
      <div v-else class="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="org in organizations"
             :key="org.organization_id"
             class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col items-center">
          <img :src="org.organization_logo || '/api/placeholder/96/96'"
               :alt="org.organization_name"
               class="w-24 h-24 rounded-full mb-4 object-cover">
          <h3 class="text-lg font-semibold text-gray-800 text-center mb-2">
            {{ org.organization_name }}
          </h3>
          <p v-if="org.created_by_username" class="text-sm text-gray-500">
            {{ $t('createdBy') }}: {{ org.created_by_username }}
          </p>
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
const organizationService = inject('organizationService')

// State
const organizations = ref([])
const loading = ref(false)
const error = ref(null)

// Methods
async function loadOrganizations() {
  loading.value = true
  error.value = null
  try {
    organizations.value = await organizationService.getAllOrganizationsWithCreators()
  } catch (e) {
    error.value = t('errorLoadingOrganizations')
    console.error('error loading organizations:', e)
  } finally {
    loading.value = false
  }
}

// Load organizations when component mounts
onMounted(() => {
  loadOrganizations()
})
</script>