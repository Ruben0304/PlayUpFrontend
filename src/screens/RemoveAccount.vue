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
          >
            {{ $t('common.cancel') }}
          </button>
          <button 
            @click="processAccountDeletion" 
            class="flex-1 px-4 py-2 bg-red-600 text-white rounded font-medium transition-colors hover:bg-red-700"
          >
            {{ $t('account_removal.modal.confirm_button') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const email = ref('')
const password = ref('')
const showModal = ref(false)
const emailTouched = ref(false)
const passwordTouched = ref(false)
const isValidEmail = ref(false)
const isValidPassword = ref(false)

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
  showModal.value = true
}

const cancelDeletion = () => {
  showModal.value = false
}

const processAccountDeletion = () => {
  // Here you would typically send the deletion request to your backend
  console.log('Account deletion confirmed for email:', email.value)
  
  // Close modal and reset form
  showModal.value = false
  email.value = ''
  password.value = ''
  emailTouched.value = false
  passwordTouched.value = false
  isValidEmail.value = false
  isValidPassword.value = false
  
  // Show success message or redirect
  alert(t('account_removal.success_message'))
}
</script> 