<template>
  <button @click="showModal = true" class="fixed bottom-8 right-8 bg-primary-600 hover:bg-primary-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110">
    <LogOut class="w-6 h-6" />
  </button>

  <Transition name="fade">
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-8 max-w-md w-full">
        <h2 class="text-2xl font-bold mb-4 text-gray-900">Cerrar sesion</h2>
        <p class="mb-4 text-gray-700">¿ Seguro que desea cerrar sesion ?</p>
        <div class="flex justify-end">
          <button @click="showModal = false" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg mr-2">
            {{ $t('cancel') }}
          </button>
          <button @click="handleLogout" class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg">
            {{ $t('accept') }}
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import {inject, ref} from 'vue'
import { LogOut } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const showModal = ref(false)
const router = useRouter()
const auth = inject('authService')
// Router

const handleLogout = async () => {
  await auth.signOut()

  // Redirigir a la ruta "/"
  await router.push('/')

  // Cerrar el modal
  showModal.value = false
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>