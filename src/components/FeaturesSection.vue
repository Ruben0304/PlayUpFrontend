<template>
  <section id="features" class="py-20 relative">
    <div class="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900"></div>
    <div class="relative max-w-7xl mx-auto px-4">
      <h2 data-aos="fade-up" class="text-4xl font-bold text-center mb-16">
        {{ $t('featuresSection.everythingYouNeed') }}
      </h2>

      <!-- Tarjetas de Características -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard
            :title="$t('featuresSection.professionalProfileTitle')"
            :icon="Users"
            :features="[ $t('featuresSection.professionalProfileFeatures1'), $t('featuresSection.professionalProfileFeatures2'), $t('featuresSection.professionalProfileFeatures3') ]"
        />
        <FeatureCard
            :title="$t('featuresSection.tournamentManagementTitle')"
            :icon="Trophy"
            :features="[ $t('featuresSection.tournamentManagementFeatures1'), $t('featuresSection.tournamentManagementFeatures2'), $t('featuresSection.tournamentManagementFeatures3') ]"
        />
        <FeatureCard
            :title="$t('featuresSection.advancedAnalysisTitle')"
            :icon="BarChart2"
            :features="[ $t('featuresSection.advancedAnalysisFeatures1'), $t('featuresSection.advancedAnalysisFeatures2') ]"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { Users, Trophy, BarChart2 } from 'lucide-vue-next';
import FeatureCard from './FeatureCard.vue'
</script>
