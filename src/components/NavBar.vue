<template>
  <nav class="fixed w-full z-50 rounded-lg shadow-2xl transition-all duration-300 ease-in-out hover:shadow-2xl"
       :style="navStyle">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex h-16">
        <!-- Logo and name -->
        <router-link to="/" class="flex items-center space-x-3 relative">
          <div class="w-10 h-10  flex items-center justify-center relative overflow-hidden">
            <img :src="logoSrc" alt="logo" class="w-full h-full object-cover">
          </div>
          <span class="text-xl font-bold text-white">PlayUp</span>
        </router-link>

        <!-- Navigation links - Desktop -->
        <div class="flex-1 flex justify-center">
          <div class="hidden md:flex space-x-8">
            <NavLink href="#features" :icon="Sparkles">{{ $t('features') }}</NavLink>
            <NavLink href="#tournaments" :icon="Trophy">{{ $t('tournaments') }}</NavLink>
            <NavLink href="#players" :icon="Users">{{ $t('players') }}</NavLink>
            <NavLink href="#stats" :icon="BarChart2">{{ $t('stats') }}</NavLink>
          </div>
        </div>

        <!-- Acciones a la derecha -->
        <div class="flex items-center space-x-6">
          <DownloadButton class="hidden md:flex"/>
          <LanguageSwitcher class="hidden md:flex"/>

          <!-- Botón de menú móvil -->
          <button
              @click="isMenuOpen = !isMenuOpen"
              class="md:hidden p-2 rounded-lg hover:bg-gray-700 focus:outline-none"
          >
            <Menu v-if="!isMenuOpen" class="w-6 h-6 text-white"/>
            <X v-else class="w-6 h-6 text-white"/>
          </button>
        </div>
    </div>

    <!-- Menú móvil -->
    <div
        v-show="isMenuOpen"
        class="md:hidden absolute top-16 left-0 right-0 bg-gray-900 bg-opacity-95 backdrop-blur-lg border-t border-gray-700"
    >
      <div class="px-4 pt-2 pb-3 space-y-1">
        <a href="#features" class="flex items-center space-x-2 px-3 py-2 rounded-lg text-white hover:bg-gray-700">
          <Sparkles class="w-5 h-5"/>
          <span>{{ $t('features') }}</span>
        </a>
        <a href="#tournaments" class="flex items-center space-x-2 px-3 py-2 rounded-lg text-white hover:bg-gray-700">
          <Trophy class="w-5 h-5"/>
          <span>{{ $t('tournaments') }}</span>
        </a>
        <a href="#players" class="flex items-center space-x-2 px-3 py-2 rounded-lg text-white hover:bg-gray-700">
          <Users class="w-5 h-5"/>
          <span>{{ $t('players') }}</span>
        </a>
        <a href="#stats" class="flex items-center space-x-2 px-3 py-2 rounded-lg text-white hover:bg-gray-700">
          <BarChart2 class="w-5 h-5"/>
          <span>{{ $t('stats') }}</span>
        </a>
        <div class="pt-6 space-y-6">
          <DownloadButton class="w-full"/>
          <LanguageSwitcher class="w-full"/>
        </div>
      </div>
    </div>
    </div>
  </nav>
</template>

<script setup>
import {ref} from 'vue'
import {Sparkles, Trophy, Users, BarChart2, Menu, X} from 'lucide-vue-next'
import NavLink from './NavLinks.vue'
import DownloadButton from './DownloadButton.vue'
import LanguageSwitcher from './LenguajeSwitcher.vue'

const isMenuOpen = ref(false)
import logo from '@/assets/logo.png'

const logoSrc = ref(logo)

const navStyle = ref({
  background: 'rgba(17, 24, 39, 0.7)',
  backdropFilter: 'blur(12px)',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  top: '20px',
  width: '80%',
  marginLeft: '10%'
})
</script>
