<template>
  <div class="min-h-screen flex items-center justify-center bg-background-500">
    <div class="max-w-md w-full space-y-8 p-8">
      <div class="text-center space-y-4">
        <h1 class="text-3xl font-bold text-white">{{ $t('auth.emailVerified') }}</h1>
        <p class="text-gray-300">{{ $t('auth.emailVerifiedSuccess') }}</p>
        <button 
          class="bg-red-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-600 transition-colors w-full"
          @click="handleOpenApp"
        >
          {{ $t('auth.goToApp') }}
        </button>
      </div>
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
  const deepLink = 'playup://auth/email-verified'
  
  // Intentar abrir la app
  window.location.href = deepLink
  
  // Si después de 1 segundo seguimos en la web, significa que la app no está instalada
  setTimeout(() => {
    if (document.hidden) return // Usuario ya fue a la app
    
    // Redirigir a stores según plataforma
    if (/android/i.test(navigator.userAgent)) {
      window.location.href = 'https://play.google.com/store/apps/details?id=com.playup.inc'
    } else if (/iphone|ipad|ipod/i.test(navigator.userAgent)) {
      window.location.href = 'https://apps.apple.com/app/id6741330857'
    }
  }, 1000)
}
</script> 