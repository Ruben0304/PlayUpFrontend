<template>
  <div id="app" class="bg-gray-900 text-white overflow-x-hidden min-h-screen flex flex-col">
    <NavBar/>
    <main>
      <router-view></router-view>
    </main>
    <FooterSection/>
  </div>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue'
import FooterSection from '@/components/FooterSection.vue'
</script>