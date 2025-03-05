<template>
  <div class="min-h-screen relative overflow-hidden flex items-center">
    <!-- Fondo con imagen y opacidad -->
    <div class="absolute inset-0 z-0">
      <img
          src="@/assets/banner.jpg"
          alt="Fondo decorativo"
          class="w-full h-full object-cover opacity-30"
      />
    </div>

    <div class="container mx-auto px-4 md:px-6 py-12 md:py-0 z-10">
      <div class="flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 sm:space-y-0">
        <!-- Text Content -->
        <div
            class="w-full md:w-1/2 text-white z-10 mt-20 md:mt-0 mb-8 md:mb-0 flex flex-col gap-6 md:gap-8"
            data-aos="fade-right"
            data-aos-delay="100"
        >
          <h1
              class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight
               md:text-left px-1 md:px-0"
              ref="heroText"
          >
            <span>
              {{ $t('hero.passion') }}&nbsp;{{ $t('hero.game') }}&nbsp;{{ $t('hero.story') }}&nbsp;{{ $t('hero.everything') }}
              <span class="text-primary-500">PlayUp</span>.
            </span>
          </h1>

          <p
              class="text-white text-sm sm:text-md md:text-lg lg:text-xl max-w-lg
               md:text-left px-2 md:px-0"
              ref="heroDescription"
          >
            {{ $t('hero.description') }}
          </p>

          <div class="flex md:justify-start px-2 md:px-0">
            <button
                class="bg-primary-500 hover:bg-primary-600 text-white px-6 md:px-8 py-2 md:py-3
                   rounded text-base md:text-lg font-semibold transition-all duration-300
                   transform hover:scale-105"
                ref="startButton"
            >
              {{ $t('hero.start') }}
            </button>
          </div>

          <!-- Store Links -->
          <div
              class="flex justify-start space-x-4 pt-4 md:pt-6 px-2 md:px-0"
              ref="storeLinks"
          >
            <a href="https://play.google.com/store/apps/details?id=com.playup.inc&pcampaignid=web_share" class="transform hover:scale-105 transition-transform">
              <img
                  src="@/assets/Stores.png"
                  alt="Google Play"
                  class="h-8 sm:h-10 md:h-12"
              />
            </a>
            <a href="https://apps.apple.com/tr/app/playup/id6741330857" class="transform hover:scale-105 transition-transform">
              <img
                  src="@/assets/AppleStores.png"
                  alt="App Store"
                  class="h-8 sm:h-10 md:h-12"
              />
            </a>
          </div>
        </div>

        <!-- Phone Images -->
<!--        <div-->
<!--            class="w-full md:w-1/2 relative h-[200px] sm:h-[250px] md:h-[400px] lg:h-[500px]"-->
<!--            data-aos="zoom-in"-->
<!--            data-aos-delay="200"-->
<!--        >-->
<!--          <div class="absolute w-full h-full">-->
<!--            <div class="relative w-full h-full">-->
<!--              &lt;!&ndash; Mockup 1 &ndash;&gt;-->
<!--              <img-->
<!--                  src="@/assets/phone1.png"-->
<!--                  alt="Primer mockup de PlayUp"-->
<!--                  class="absolute w-36 sm:w-44 md:w-64 lg:w-72-->
<!--                       top-1/2 left-1/2-->
<!--                       transform -translate-x-1/2 -translate-y-1/2-->
<!--                       mockup-floating-1"-->
<!--              />-->

<!--              &lt;!&ndash; Mockup 2 &ndash;&gt;-->
<!--              <img-->
<!--                  src="@/assets/phone2.png"-->
<!--                  alt="Segundo mockup de PlayUp"-->
<!--                  class="absolute w-36 sm:w-44 md:w-64 lg:w-72-->
<!--                       top-1/2 left-1/2-->
<!--                       transform -translate-x-1/2 -translate-y-1/2-->
<!--                       mockup-floating-2"-->
<!--              />-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes mockupFloat1 {
  0%, 100% {
    transform: translate(-50%, -50%) rotateX(10deg) rotate(-8deg);
  }
  50% {
    transform: translate(-50%, -50%) rotateX(10deg) rotate(-8deg) translateY(-8px);
  }
}

.mockup-floating-1 {
  animation: mockupFloat1 4s ease-in-out infinite;
}

@keyframes mockupFloat2 {
  0%, 100% {
    transform: translate(-50%, -50%) rotateY(10deg) rotate(8deg);
  }
  50% {
    transform: translate(-50%, -50%) rotateY(10deg) rotate(8deg) translateY(-8px);
  }
}

.mockup-floating-2 {
  animation: mockupFloat2 4s ease-in-out infinite;
}

/* Ajustes específicos para móvil */
@media (max-width: 768px) {
  .container > div {
    flex-direction: column-reverse;
  }

  .space-y-8 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-y-reverse: 0;
    margin-top: calc(1.5rem * calc(1 - var(--tw-space-y-reverse)));
    margin-bottom: calc(1.5rem * var(--tw-space-y-reverse));
  }
}
</style>

<!--<template>-->
<!--  <div class="min-h-screen bg-background-500 relative overflow-hidden flex items-center">-->
<!--    <div class="container mx-auto px-4 md:px-6 py-12 md:py-0">-->
<!--      <div class="flex flex-col md:flex-row items-center justify-between  space-y-8 md:space-y-0 sm:space-y-0">-->
<!--        &lt;!&ndash; Text Content &ndash;&gt;-->
<!--        <div-->
<!--            class="w-full md:w-1/2 text-white z-10 mt-20 md:mt-0 mb-8 md:mb-0 flex flex-col gap-6 md:gap-8"-->
<!--            data-aos="fade-right"-->
<!--            data-aos-delay="100"-->
<!--        >-->
<!--          <h1-->
<!--              class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight-->
<!--               md:text-left px-1 md:px-0"-->
<!--              ref="heroText"-->
<!--          >-->
<!--        <span>-->
<!--            {{ $t('hero.passion') }}&nbsp;{{ $t('hero.game') }}&nbsp;{{ $t('hero.story') }}&nbsp;{{ $t('hero.everything') }}-->
<!--            <span class="text-primary-500">PlayUp</span>.-->
<!--        </span>-->
<!--          </h1>-->

<!--          <p-->
<!--              class="text-primary-100 text-sm sm:text-md md:text-lg lg:text-xl max-w-lg-->
<!--               md:text-left px-2 md:px-0"-->
<!--              ref="heroDescription"-->
<!--          >-->
<!--            {{ $t('hero.description') }}-->
<!--          </p>-->

<!--          <div class="flex md:justify-start px-2 md:px-0">-->
<!--            <button-->
<!--                class="bg-primary-500 hover:bg-primary-600 text-white px-6 md:px-8 py-2 md:py-3-->
<!--                   rounded text-base md:text-lg font-semibold transition-all duration-300-->
<!--                   transform hover:scale-105"-->
<!--                ref="startButton"-->
<!--            >-->
<!--              {{ $t('hero.start') }}-->
<!--            </button>-->
<!--          </div>-->

<!--          &lt;!&ndash; Store Links &ndash;&gt;-->
<!--          <div-->
<!--              class="flex justify-start space-x-4 pt-4 md:pt-6 px-2 md:px-0"-->
<!--              ref="storeLinks"-->
<!--          >-->
<!--            <a href="#" class="transform hover:scale-105 transition-transform">-->
<!--              <img-->
<!--                  src="@/assets/Stores.png"-->
<!--                  alt="Google Play"-->
<!--                  class="h-8 sm:h-10 md:h-12"-->
<!--              />-->
<!--            </a>-->
<!--            <a href="#" class="transform hover:scale-105 transition-transform">-->
<!--              <img-->
<!--                  src="@/assets/AppleStores.png"-->
<!--                  alt="App Store"-->
<!--                  class="h-8 sm:h-10 md:h-12"-->
<!--              />-->
<!--            </a>-->
<!--          </div>-->
<!--        </div>-->


<!--        &lt;!&ndash; Phone Images &ndash;&gt;-->
<!--        <div-->
<!--            class="w-full md:w-1/2 relative h-[200px] sm:h-[250px] md:h-[400px] lg:h-[500px]"-->
<!--            data-aos="zoom-in"-->
<!--            data-aos-delay="200"-->
<!--        >-->
<!--          <div class="absolute w-full h-full">-->
<!--            <div class="relative w-full h-full">-->
<!--              &lt;!&ndash; Glow effect &ndash;&gt;-->
<!--              <div-->
<!--                  class="absolute inset-0 bg-primary-500 animate-glowPulse blur-[60px] sm:blur-[80px]-->
<!--                       md:blur-[100px] rounded-full opacity-50 md:opacity-60"-->
<!--              ></div>-->

<!--              &lt;!&ndash; Mockup 1 &ndash;&gt;-->
<!--              <img-->
<!--                  src="@/assets/phone1.png"-->
<!--                  alt="Primer mockup de PlayUp"-->
<!--                  class="absolute w-36 sm:w-44 md:w-64 lg:w-72-->
<!--                       top-1/2 left-1/2-->
<!--                       transform -translate-x-1/2 -translate-y-1/2-->
<!--                       mockup-floating-1"-->
<!--              />-->

<!--              &lt;!&ndash; Mockup 2 &ndash;&gt;-->
<!--              <img-->
<!--                  src="@/assets/phone2.png"-->
<!--                  alt="Segundo mockup de PlayUp"-->
<!--                  class="absolute w-36 sm:w-44 md:w-64 lg:w-72-->
<!--                       top-1/2 left-1/2-->
<!--                       transform -translate-x-1/2 -translate-y-1/2-->
<!--                       mockup-floating-2"-->
<!--              />-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->

<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<style scoped>-->
<!--@keyframes glowPulse {-->
<!--  0%, 100% {-->
<!--    opacity: 0.2;-->
<!--  }-->
<!--  50% {-->
<!--    opacity: 0.4;-->
<!--  }-->
<!--}-->

<!--.animate-glowPulse {-->
<!--  animation: glowPulse 3s ease-in-out infinite;-->
<!--}-->

<!--@keyframes mockupFloat1 {-->
<!--  0%, 100% {-->
<!--    transform: translate(-50%, -50%) rotateX(10deg) rotate(-8deg);-->
<!--  }-->
<!--  50% {-->
<!--    transform: translate(-50%, -50%) rotateX(10deg) rotate(-8deg) translateY(-8px);-->
<!--  }-->
<!--}-->

<!--.mockup-floating-1 {-->
<!--  animation: mockupFloat1 4s ease-in-out infinite;-->
<!--}-->

<!--@keyframes mockupFloat2 {-->
<!--  0%, 100% {-->
<!--    transform: translate(-50%, -50%) rotateY(10deg) rotate(8deg);-->
<!--  }-->
<!--  50% {-->
<!--    transform: translate(-50%, -50%) rotateY(10deg) rotate(8deg) translateY(-8px);-->
<!--  }-->
<!--}-->

<!--.mockup-floating-2 {-->
<!--  animation: mockupFloat2 4s ease-in-out infinite;-->
<!--}-->

<!--/* Ajustes específicos para móvil */-->
<!--@media (max-width: 768px) {-->
<!--  .container > div {-->
<!--    flex-direction: column-reverse;-->
<!--  }-->

<!--  /* Reducir el espacio entre elementos */-->
<!--  .space-y-8 > :not([hidden]) ~ :not([hidden]) {-->
<!--    &#45;&#45;tw-space-y-reverse: 0;-->
<!--    margin-top: calc(1.5rem * calc(1 - var(&#45;&#45;tw-space-y-reverse)));-->
<!--    margin-bottom: calc(1.5rem * var(&#45;&#45;tw-space-y-reverse));-->
<!--  }-->
<!--}-->
<!--</style>-->