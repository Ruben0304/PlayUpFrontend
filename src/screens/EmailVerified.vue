<template>
  <div class="min-h-screen flex items-center justify-center bg-background-500">
    <div class="max-w-md w-full space-y-8 p-8">
      <div class="text-center">
        <h2 class="mt-6 text-3xl font-bold text-white">
          {{ $t('auth.emailVerified') }}
        </h2>
        <p class="mt-2 text-sm text-gray-300">
          {{ $t('auth.emailVerifiedDescription') }}
        </p>
      </div>
      <div class="mt-8">
        <router-link
          to="/"
          class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition duration-300 transform hover:scale-105"
        >
          {{ $t('auth.goToApp') }}
        </router-link>
      </div>
      <button 
        class="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors"
        @click="handleOpenApp"
      >
        {{ $t('auth.openApp') }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

onMounted(() => {
  // Verificar los parámetros que envía Supabase
  const hasEmailVerificationParams = route.hash.includes('access_token') || 
                                   route.hash.includes('refresh_token') ||
                                   route.hash.includes('type=signup') ||
                                   route.hash.includes('type=email_change')
  
  if (!hasEmailVerificationParams) {
    router.replace('/')
  }
})

const handleOpenApp = () => {
  // Deep link URL
  const deepLink = 'playup://auth/verified'
  
  // Intentar abrir la app
  window.location.href = deepLink
  
  // Si después de 1 segundo seguimos en la web, significa que la app no está instalada
  setTimeout(() => {
    if (document.hidden) return // Usuario ya fue a la app
    
    // Redirigir a stores según plataforma
    if (/android/i.test(navigator.userAgent)) {
      window.location.href = 'https://play.google.com/store/apps/details?id=com.playup.inc'
    } else if (/iphone|ipad|ipod/i.test(navigator.userAgent)) {
      window.location.href = 'https://apps.apple.com/app/id6741330857' // Reemplazar con ID de App Store
    }
  }, 1000)
}
</script> 