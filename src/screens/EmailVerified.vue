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
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onBeforeMount(() => {
  // Verificar si viene de un redirect checando el objeto de history state
  if (!history.state?.redirectedFromEmailVerification) {
    // Si no viene de un redirect, redirigir a home
    router.replace('/')
  }
})
</script> 