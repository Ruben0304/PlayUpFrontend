<template>
  <div id="app" class="bg-gray-900 text-white overflow-x-hidden">
    <NavBar />
    <HeroSection />
    <StatisticsSection />
    <FeaturesSection />
    <ScreenshotsSection />
    <PerformanceSection />
    <DownloadSection />
    <ContactSection />
    <FooterSection />
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import StatisticsSection from './components/StatisticSection.vue'
import FeaturesSection from './components/FeaturesSection.vue'
import ScreenshotsSection from './components/ScreenshotsSection.vue'
import PerformanceSection from './components/PerformanceSection.vue'
import DownloadSection from './components/DownloadSection.vue'
import ContactSection from './components/ContactSection.vue'
import FooterSection from './components/FooterSection.vue'
</script>

<style>
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

/* Additional global styles can be added here */
</style>