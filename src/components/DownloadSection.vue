<template>
  <section id="download" class="py-20 relative overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-800"></div>
    <div class="absolute inset-0">
      <div class="absolute top-1/3 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
    </div>
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 data-aos="fade-up" class="text-4xl font-bold mb-6 text-white">
          {{ $t('downloadSection.title') }}
        </h2>
        <p data-aos="fade-up" data-aos-delay="100" class="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
          {{ $t('downloadSection.description') }}
        </p>
      </div>
      <div class="flex flex-col sm:flex-row items-center justify-center space-y-8 sm:space-y-0 sm:space-x-12">
        <!-- iOS Download -->
        <div data-aos="fade-right" class="text-center">
          <a href="#" class="inline-block mb-4 transition-transform duration-300 hover:scale-105">
            <img :src="apple" alt="Download on the App Store" class="h-14 w-auto">
          </a>
          <p class="text-lg font-semibold mb-2 text-white">{{ $t('downloadSection.iosTitle') }}</p>
          <p class="text-gray-400 max-w-xs mx-auto">{{ $t('downloadSection.iosDescription') }}</p>
        </div>
        <!-- Android Download -->
        <div data-aos="fade-left" class="text-center">
          <a href="#" class="inline-block mb-4 transition-transform duration-300 hover:scale-105">
            <img :src="google" alt="Get it on Google Play" class="h-14 w-auto">
          </a>
          <p class="text-lg font-semibold mb-2 text-white">{{ $t('downloadSection.androidTitle') }}</p>
          <p class="text-gray-400 max-w-xs mx-auto">{{ $t('downloadSection.androidDescription') }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import AppStore from '@/assets/AppStore.png'
import PlayStore from '@/assets/GooglePlay.png'

const apple = ref(AppStore)
const google = ref(PlayStore)
</script>