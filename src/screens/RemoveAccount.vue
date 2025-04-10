<template>
  <div class="min-h-screen bg-background-500 relative overflow-hidden flex items-center justify-center">
    <div class="container mx-auto px-4 md:px-6 py-12 z-10">
      <div class="max-w-md mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 class="text-2xl font-bold text-white text-center mb-6">
          {{ $t('account_removal.title') }}
        </h1>
        
        <p class="text-gray-300 text-sm mb-6 text-center">
          {{ $t('account_removal.description') }}
        </p>
        
        <form @submit.prevent="confirmDeletion" class="space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-300">{{ $t('account_removal.email_label') }}</label>
            <div class="relative">
              <input 
                type="email" 
                id="email" 
                v-model="email" 
                @input="validateEmail"
                required 
                class="mt-1 block w-full px-3 py-2 bg-gray-700 border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                :class="{ 
                  'border-gray-600': !emailTouched,
                  'border-red-500': emailTouched && !isValidEmail, 
                  'border-green-500': emailTouched && isValidEmail 
                }"
                :placeholder="$t('account_removal.email_placeholder')"
              >
              <div v-if="emailTouched && !isValidEmail" class="mt-1 text-sm">
                <p class="text-red-500">{{ $t('account_removal.email_validation.invalid') }}</p>
              </div>
            </div>
          </div>
          
          <div>
            <label for="password" class="block text-sm font-medium text-gray-300">{{ $t('auth.password') }}</label>
            <div class="relative">
              <input 
                type="password" 
                id="password" 
                v-model="password" 
                @input="validatePassword"
                required 
                class="mt-1 block w-full px-3 py-2 bg-gray-700 border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                :class="{ 
                  'border-gray-600': !passwordTouched,
                  'border-red-500': passwordTouched && !isValidPassword, 
                  'border-green-500': passwordTouched && isValidPassword 
                }"
                placeholder="******"
              >
              <div v-if="passwordTouched && !isValidPassword" class="mt-1 text-sm">
                <p class="text-red-500">{{ $t('account_removal.password_validation.invalid') }}</p>
              </div>
            </div>
          </div>
          
          <!-- Debug Info - Solo muestra valores de variables reactivas, no process.env directamente -->
          <div v-if="isDevMode" class="bg-gray-700 p-3 rounded-md">
            <p class="text-xs text-gray-300">Debug Info:</p>
            <p class="text-xs text-gray-300">Email: {{ email }}</p>
            <p class="text-xs text-gray-300">Valid: {{ isValidEmail }}</p>
            <p class="text-xs text-gray-300">Environment: {{ environment }}</p>
          </div>
          
          <div v-if="error" class="text-red-500 text-sm py-2">
            {{ error }}
          </div>
          
          <div class="pt-2">
            <button 
              type="submit" 
              class="w-full px-4 py-2 bg-red-600 text-white rounded font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
              :class="{
                'opacity-50 cursor-not-allowed': !isFormValid,
                'hover:bg-red-700': isFormValid
              }"
              :disabled="!isFormValid"
            >
              {{ $t('account_removal.delete_button') }}
            </button>
          </div>
        </form>
      </div>
    </div>
    
    <!-- Confirmation Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div class="bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
        <h3 class="text-xl font-bold text-white mb-4">{{ $t('account_removal.modal.title') }}</h3>
        
        <p class="text-gray-300 mb-6">
          {{ $t('account_removal.modal.confirmation') }}
        </p>
        
        <div class="flex space-x-4">
          <button 
            @click="cancelDeletion" 
            class="flex-1 px-4 py-2 bg-gray-600 text-white rounded font-medium transition-colors hover:bg-gray-700"
            :disabled="loading"
          >
            {{ $t('common.cancel') || 'Cancel' }}
          </button>
          <button 
            @click="processAccountDeletion" 
            class="flex-1 px-4 py-2 bg-red-600 text-white rounded font-medium transition-colors hover:bg-red-700"
            :disabled="loading"
          >
            <span v-if="loading" class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ $t('auth.loading') || 'Loading...' }}
            </span>
            <span v-else>{{ $t('account_removal.modal.confirm_button') || 'Yes, Delete My Account' }}</span>
          </button>
        </div>
      </div>
    </div>
    
    <!-- Error Modal -->
    <div v-if="showErrorModal" class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div class="bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
        <div class="flex items-center justify-center mb-4">
          <div class="bg-red-500 rounded-full p-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>
        
        <h3 class="text-xl font-bold text-white mb-2 text-center">{{ $t('account_removal.error.title') || 'Error' }}</h3>
        
        <p class="text-gray-300 mb-6 text-center">
          {{ errorMessage || $t('account_removal.error.message') || 'An error occurred while trying to delete your account.' }}
        </p>
        
        <div class="flex justify-center">
          <button 
            @click="closeErrorModal" 
            class="px-6 py-2 bg-gray-600 text-white rounded font-medium transition-colors hover:bg-gray-700"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { AuthService } from '@/services/authService'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const router = useRouter()
const authService = new AuthService()

// Configuración del entorno de forma segura
let devMode = false;
let envName = 'production';
try {
  // Verificamos si process.env está disponible en tiempo de compilación
  if (typeof process !== 'undefined' && process.env) {
    devMode = process.env.NODE_ENV === 'development';
    envName = process.env.NODE_ENV || 'production';
  }
} catch (e) {
  console.warn('Cannot access environment variables');
}

const email = ref('')
const password = ref('')
const showModal = ref(false)
const showErrorModal = ref(false)
const emailTouched = ref(false)
const passwordTouched = ref(false)
const isValidEmail = ref(false)
const isValidPassword = ref(false)
const error = ref('')
const errorMessage = ref('')
const loading = ref(false)
const isDevMode = ref(devMode)
const environment = ref(envName)

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const validateEmail = () => {
  emailTouched.value = true
  isValidEmail.value = emailRegex.test(email.value)
}

const validatePassword = () => {
  passwordTouched.value = true
  isValidPassword.value = password.value.length >= 6
}

const isFormValid = computed(() => {
  return isValidEmail.value && isValidPassword.value
})

const confirmDeletion = () => {
  if (!isFormValid.value) return
  error.value = ''
  showModal.value = true
}

const cancelDeletion = () => {
  showModal.value = false
}

const closeErrorModal = () => {
  showErrorModal.value = false
}

const processAccountDeletion = async () => {
  loading.value = true
  error.value = ''
  
  try {
    console.log('Procesando eliminación de cuenta para:', email.value)
    const { success, error: deleteError } = await authService.deleteAccount(email.value, password.value)
    
    if (!success) {
      throw deleteError
    }
    
    // Close modal and reset form
    showModal.value = false
    email.value = ''
    password.value = ''
    emailTouched.value = false
    passwordTouched.value = false
    isValidEmail.value = false
    isValidPassword.value = false
    
    // Show success message and redirect to home
    alert(t('account_removal.success_message') || 'Your account deletion request has been submitted.')
    router.push('/')
  } catch (err) {
    console.error('Error deleting account:', err)
    // Close confirmation modal
    showModal.value = false
    // Always use the translated error message
    errorMessage.value = t('account_removal.error.message') || 'An error occurred while trying to delete your account.'
    showErrorModal.value = true
  } finally {
    loading.value = false
  }
}
</script> 