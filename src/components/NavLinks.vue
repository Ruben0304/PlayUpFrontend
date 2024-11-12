<template>
  <a :href="href" class="text-white hover:text-orange-500 transition-colors flex items-center">
    <component :is="icon" class="w-5 h-5 mr-2" />
    <slot></slot>
  </a>
</template>

<script setup>
import {defineProps} from 'vue'
defineProps({
  href: String,
  icon: {
    type: Object,  // Cambiado de String a Object porque ahora recibimos el componente
    required: true
  }
})
</script>