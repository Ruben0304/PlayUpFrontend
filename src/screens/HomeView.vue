<template>
  <div>
    <HeroSection />
<!--    <StatisticsSection/>-->
    <ScreenshotsSection />
    <FeaturesSection />

    <PerformanceSection />
<!--    <DownloadSection />-->
<!--    <ContactSection />-->
<ChatInterface/>
  </div>
</template>

<script setup>
import HeroSection from '../components/HeroSection.vue'

import FeaturesSection from '../components/FeaturesSection.vue'
import ScreenshotsSection from '../components/ScreenshotsSection.vue'
import PerformanceSection from '../components/PerformanceSection.vue'
import ChatInterface from './ChatInterface.vue';

</script>