<template>
  <section id="download" class="py-20 relative overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-800"></div> <!-- Decorative Elements -->
    <div class="absolute inset-0">
      <div class="absolute top-1/3 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div
          class="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
    </div>
    <div class="relative max-w-7xl mx-auto px-4">
      <div class="text-center mb-16"><h2 data-aos="fade-up" class="text-4xl font-bold mb-6">
        {{ $t('downloadSection.title') }} </h2>
        <p data-aos="fade-up" data-aos-delay="100" class="text-xl text-gray-400 mb-8">
          {{ $t('downloadSection.description') }} </p></div>
      <div class="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-12">
        <!-- iOS Download -->
        <div data-aos="fade-right" class="text-center"><img src="/qr-ios.png" alt="QR Code iOS"
                                                            class="mb-4 rounded-xl shadow-lg">
          <p class="text-lg font-semibold mb-2">{{ $t('downloadSection.iosTitle') }}</p>
          <p class="text-gray-400">{{ $t('downloadSection.iosDescription') }}</p></div> <!-- Android Download -->
        <div data-aos="fade-left" class="text-center"><img src="/qr-android.png" alt="QR Code Android"
                                                           class="mb-4 rounded-xl shadow-lg">
          <p class="text-lg font-semibold mb-2">{{ $t('downloadSection.androidTitle') }}</p>
          <p class="text-gray-400">{{ $t('downloadSection.androidDescription') }}</p></div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Add any necessary imports or logic here
</script>