<template>

    <LoaderAnimation />
    <Transition name="fade">
      <router-view v-if="!isLoading"></router-view>
    </Transition>


</template>

<script setup>
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