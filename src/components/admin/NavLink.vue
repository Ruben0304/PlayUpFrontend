<template>
  <router-link
      :to="to"
      class="block py-2 px-4 rounded-lg text-sm font-medium transition duration-300 ease-in-out"
      :class="[
      active
        ? 'bg-primary-600 text-white'
        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
    ]"
  >
    <slot></slot>
  </router-link>
</template>

<script setup>
import {defineProps} from 'vue'
defineProps({
  to: {
    type: [String, Object],
    required: true
  },
  active: {
    type: Boolean,
    default: false
  }
});
</script>