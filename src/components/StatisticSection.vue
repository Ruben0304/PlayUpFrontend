<template>
  <section class="py-20 relative overflow-hidden">
    <div class="max-w-7xl mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        <!-- Efecto de Burbuja Sutil -->
        <div class="absolute inset-0 -z-10 opacity-15 animate-pulse transition-colors" style="background: radial-gradient(circle, rgba(235, 99, 67, 0.08), transparent 70%);"></div>

        <!-- Contadores con animación de incremento -->
        <StatCard :title="$t('statsSection.activePlayers')" :count="50000" />
        <StatCard :title="$t('statsSection.organizedTournaments')" :count="1000" />
        <StatCard :title="$t('statsSection.associatedClubs')" :count="200" />
      </div>
    </div>
  </section>
</template>

<script setup>
import StatCard from './StatCard.vue'
</script>
