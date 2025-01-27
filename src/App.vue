<template>

    <LoaderAnimation />
    <Transition name="fade">
      <router-view v-if="!isLoading"></router-view>
    </Transition>


</template>

<script setup>
import {ref, onMounted} from 'vue'
import LoaderAnimation from "@/components/LoaderAnimation.vue";

const isLoading = ref(true)

onMounted(() => {
  // Simular tiempo de carga
  setTimeout(() => {
    isLoading.value = false
  }, 3000) // Ajusta este valor según tus necesidades
})
</script>

<style>
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

/* Estilos adicionales para la transición */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>