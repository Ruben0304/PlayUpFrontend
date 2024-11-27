<template>
  <aside class="w-64 bg-gray-900 text-gray-300 h-screen">

    <div class="p-6">
      <router-link to="/" class="flex items-center space-x-3 relative">
        <div class="w-10 h-10 rounded-full flex items-center justify-center relative overflow-hidden">
          <img :src="logoSrc" alt="logo" class="w-full h-full object-cover">
        </div>
        <h1 class="text-2xl font-bold text-white">{{ $t('appName') }}</h1>
      </router-link>

    </div>
    <nav class="mt-6 space-y-2 px-4">
      <NavLink
          v-for="item in menuItems"
          :key="item.path"
          :to="item.path"
          :active="$route.path === item.path"
      >
        {{ $t(item.name) }}
      </NavLink>
    </nav>
  </aside>
</template>

<script setup>
import { ref } from 'vue';
import NavLink from './NavLink.vue';
import logo from '@/assets/logo.png'

const logoSrc = ref(logo)


const menuItems = ref([
  { name: 'dashboard', path: '/admin' },
  { name: 'teams', path: '/admin/teams' },
  { name: 'players', path: '/admin/players' },
  { name: 'users', path: '/admin/users' },
  { name: 'organizations', path: '/admin/organizations' },
  { name: 'tournaments', path: '/admin/tournaments' },
  { name: 'waitlist', path: '/admin/waitlist' },
]);
</script>
