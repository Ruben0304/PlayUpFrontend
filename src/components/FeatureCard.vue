<template>
  <div data-aos="fade-up" class="group">
    <div style="background-color: rgba(0,0,0,0.42);" class="rounded-2xl p-6 h-full border border-gray-700 hover:border transition-colors">
      <div style="background-color: rgba(0,0,0,0.42);" class="w-16 h-16 rounded-xl mb-6 flex items-center justify-center group-hover:bg transition-colors">
        <component :is="icon" class="w-8 h-8 text-primary-500"  ></component>
      </div>
      <h3 class="text-xl font-semibold mb-4">{{ title }}</h3>
      <ul class="space-y-3 text-gray-400">
        <li v-for="feature in features" :key="feature" class="flex items-center">
          <svg class="w-5 h-5 mr-2 text-primary-500"  fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          {{ feature }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  title: String,
  icon: Object,
  features: Array
});
</script>
