<template>
  <div class="min-h-screen flex items-center justify-center bg-background-500">
    <div class="max-w-md w-full space-y-8 p-8">
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 mx-auto"></div>
        <p class="mt-4 text-sm text-gray-300">
          {{ $t('auth.loading') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { inject } from 'vue'

const router = useRouter()
const route = useRoute()
const auth = inject('authService')

onMounted(async () => {
  // Procesar los parámetros de la URL
  const hashParams = new URLSearchParams(window.location.hash.substring(1))
  const queryParams = route.query

  // Si tenemos un token de acceso, significa que es una autenticación exitosa
  if (hashParams.get('access_token')) {
    await auth.handleAuthCallback(hashParams.toString())
    await router.push('/')
  } 
  // Si tenemos type=recovery, es un reset de password
  else if (queryParams.type === 'recovery') {
    await router.push(`/auth/reset-password?hash=${queryParams.hash || ''}`)
  }
  // Si tenemos type=signup o email_change, es una verificación de email
  else if (queryParams.type === 'signup' || queryParams.type === 'email_change') {
    await router.push('/auth/verify-email')
  }
  // Por defecto, redirigir a home
  else {
    await router.push('/')
  }
})
</script> 