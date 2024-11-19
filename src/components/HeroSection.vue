<template>
  <header class="relative min-h-screen flex items-center justify-center overflow-hidden">
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-gray-900 to-primary-900/20"></div>

    <!-- Elementos animados decorativos -->
    <div class="absolute inset-0">
      <div class="absolute w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse" style="top: 10%; left: 20%;"></div>
      <div class="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-700" style="bottom: 10%; right: 20%;"></div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 text-center">
      <h1 data-aos="fade-up" class="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-primary-500 bg-clip-text text-transparent">
        {{ $t('header.title') }}<br/>{{ $t('header.subtitle') }}
      </h1>
      <p data-aos="fade-up" data-aos-delay="100" class="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
        {{ $t('header.description') }}
      </p>
      <div data-aos="fade-up" data-aos-delay="200" class="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
        <a href="#download" class="group relative inline-flex items-center justify-center px-8 py-3 rounded-lg overflow-hidden transition-all duration-300 bg-primary-500">
          <div class="absolute inset-0 w-0 bg-white transition-all duration-500 ease-out group-hover:w-full opacity-20"></div>
          <div class="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 shadow-primary"></div>
          <span class="relative text-lg font-semibold text-white transform group-hover:scale-105 transition-transform duration-300">
            {{ $t('header.startNow') }}
          </span>
        </a>
        <a href="#features" class="group relative inline-flex items-center justify-center px-8 py-3 rounded-lg transition-all duration-300 bg-transparent border-2 border-gray-700 hover:border-transparent">
          <div class="absolute inset-0 opacity-0 group-hover:opacity-100 rounded-lg transition-all duration-300 bg-primary-500/10"></div>
          <span class="relative text-lg font-semibold text-primary-500 group-hover:text-current transition-colors duration-300">
            {{ $t('header.viewFeatures') }}
          </span>
        </a>
      </div>
    </div>
  </header>
</template>
<script setup>
// Asumiendo que ya tienes configurado Vue i18n en tu proyecto.
</script>
