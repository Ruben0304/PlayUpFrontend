<template>
  <div class="min-h-screen flex items-center justify-center bg-background-500">
    <div class="max-w-md w-full space-y-8 p-8">
      <div class="text-center">
        <h2 class="mt-6 text-3xl font-bold text-white">
          {{ $t('auth.resetPasswordTitle') }}
        </h2>
        <p class="mt-2 text-sm text-gray-300">
          {{ $t('auth.resetPasswordDescription') }}
        </p>
      </div>

      <form @submit.prevent="handleResetPassword" class="mt-8 space-y-6">
        <div v-if="error" class="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded relative">
          {{ error }}
        </div>
        <div v-if="success" class="bg-green-500/10 border border-green-500 text-green-500 px-4 py-3 rounded relative">
          {{ success }}
        </div>

        <div>
          <label for="password" class="sr-only">{{ $t('auth.password') }}</label>
          <input
            id="password"
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            required
            class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
            :placeholder="$t('auth.password')"
          />
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition duration-300 transform hover:scale-105 disabled:opacity-50"
          >
            <span v-if="loading" class="absolute left-0 inset-y-0 flex items-center pl-3">
              <!-- Loading spinner -->
              <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </span>
            {{ loading ? $t('auth.loading') : $t('auth.resetPasswordTitle') }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { inject } from 'vue'

const auth = inject('authService')
const router = useRouter()
const route = useRoute()

const password = ref('')
const showPassword = ref(false)
const loading = ref(false)
const error = ref(null)
const success = ref(null)

const handleResetPassword = async () => {
  if (!password.value) {
    error.value = 'auth.errors.passwordRequired'
    return
  }

  loading.value = true
  error.value = null
  success.value = null

  try {
    const { hash } = route.query
    if (!hash) {
      throw new Error('No reset token found')
    }

    await auth.updatePassword(password.value, hash)
    success.value = 'auth.passwordResetSuccess'
    setTimeout(() => router.push('/auth'), 2000)
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
</script> 