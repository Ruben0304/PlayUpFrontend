<template>
  <div class="p-8 text-center">
    <Loader2 class="w-8 h-8 animate-spin mx-auto text-primary-500"/>
    <p class="mt-2 text-gray-600">{{ $t('loading') }}...</p>
  </div>
</template>

<script setup>
import {Loader2,} from 'lucide-vue-next'
</script>

