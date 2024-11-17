<template>
  <div class="bg-gradient-to-r from-gray-100 to-gray-300 dark:from-gray-700 dark:to-gray-900 rounded-xl overflow-hidden shadow-lg backdrop-blur-lg bg-opacity-30 dark:bg-opacity-30 border border-gray-200 dark:border-gray-700 transition-all duration-500 p-6">
    <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{{ $t('topOrganizations') }}</h2>
    <!-- Loading state -->
    <LoaderComponent v-if="loading"/>
    <ul class="space-y-4">
      <li v-for="org in organizations" :key="org.organization_id" class="flex items-center justify-between bg-gradient-to-r from-gray-50 to-gray-200 dark:from-gray-700 dark:to-gray-800 p-3 rounded-lg shadow-md">
        <div class="flex items-center">
          <img :src="org.organization_logo" :alt="org.organization_name" class="w-10 h-10 rounded-full mr-3">
          <span class="text-gray-700 dark:text-gray-300">{{ org.organization_name }}</span>
        </div>
        <span class="text-primary-600  font-semibold">5</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import {inject, onMounted, ref} from 'vue'
import {useI18n} from "vue-i18n";
import LoaderComponent from "@/components/LoaderComponent.vue";
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
    console.error('Error loading organizations:', e)
  } finally {
    loading.value = false
  }
}

// Load organizations when component mounts
onMounted(() => {
  loadOrganizations()
})

</script>