<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg backdrop-blur-lg bg-opacity-30 dark:bg-opacity-30 border border-gray-200 dark:border-gray-700 transition-all duration-500 hover:shadow-2xl hover:scale-105">
    <div class="p-6">
      <div class="flex items-center">
<!--        <div class="flex-shrink-0 p-3 bg-primary-100 dark:bg-primary-900 rounded-full">-->
          <component :is="stat.icon" class="h-7 w-7 text-primary-500 " aria-hidden="true" />
<!--        </div>-->
        <div class="ml-5 w-0 flex-1">
          <dl>
            <dt class="text-sm font-medium text-gray-600 dark:text-gray-500 truncate">{{ $t(stat.name) }}</dt>
            <dd class="text-lg font-semibold text-gray-700">{{ stat.value }}</dd>
          </dl>
        </div>
      </div>
    </div>
    <div class="bg-gray-50 dark:bg-gray-700 px-6 py-4">
      <div class="text-sm">
        <router-link class="font-medium text-gray-400 hover:text-primary-500 transition-colors duration-300" :to="stat.href">
          {{ $t('viewAll') }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import {defineProps} from 'vue'
defineProps({
  stat: {
    type: Object,
    required: true
  }
})
</script>