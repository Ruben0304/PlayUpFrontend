<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
   <nav-bar></nav-bar>
    <!-- Main content -->
    <div class="flex-1 flex flex-col overflow-hidden">
<!--       Top navbar-->
<!--      <header class="bg-white shadow">-->
<!--        <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">-->
<!--          <h2 class="text-xl font-semibold text-gray-800">{{ $t($route.name) }}</h2>-->
<!--&lt;!&ndash;          <div class="flex items-center">&ndash;&gt;-->
<!--&lt;!&ndash;            <button @click="toggleLanguage" class="mr-4 text-sm text-gray-600 hover:text-primary-600">&ndash;&gt;-->
<!--&lt;!&ndash;              {{ currentLanguage === 'es' ? 'EN' : 'ES' }}&ndash;&gt;-->
<!--&lt;!&ndash;            </button>&ndash;&gt;-->
<!--&lt;!&ndash;            <button @click="logout" class="text-sm text-gray-600 hover:text-primary-600">&ndash;&gt;-->
<!--&lt;!&ndash;              {{ $t('logout') }}&ndash;&gt;-->
<!--&lt;!&ndash;            </button>&ndash;&gt;-->
<!--&lt;!&ndash;          </div>&ndash;&gt;-->
<!--        </div>-->
<!--      </header>-->

      <!-- Page content -->
      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
        <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <router-view></router-view>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
// import { computed } from 'vue'
// import { useI18n } from 'vue-i18n'
import NavBar from "@/components/admin/NavBar.vue";

// const { locale } = useI18n()

// const currentLanguage = computed(() => locale.value)
//
// function toggleLanguage() {
//   locale.value = locale.value === 'es' ? 'en' : 'es'
// }

// function logout() {
//   // Implementar lógica de cierre de sesión aquí
//   console.log('Logout clicked')
//   // Por ejemplo:
//   // auth.logout()
//   // router.push('/login')
// }
</script>