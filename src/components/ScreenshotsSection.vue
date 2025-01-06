<template>
  <section class="bg-background-500 text-white py-12 md:py-20 px-4">
    <div
        class="container mx-auto flex flex-col-reverse md:flex-row
             items-center justify-between"
    >
      <!-- TEXTO -->
      <div class="w-full md:w-1/2 mt-8 md:mt-0">
        <!-- Título -->
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
          Organiza tus torneos
          <span class="text-primary-500">fácilmente</span> con PlayUp.
        </h2>

        <!-- Descripción breve -->
        <p class="text-gray-300 text-lg mb-6">
          Simplifica tu trabajo y ofrece una experiencia única a jugadores y fans.
        </p>

        <!-- Lista de puntos -->
        <ul class="text-gray-300 space-y-3">
          <li class="flex items-start">
            <span class="text-primary-500 mr-2">✓</span>
            Generación automatizada de partidos.
          </li>
          <li class="flex items-start">
            <span class="text-primary-500 mr-2">✓</span>
            Estadísticas en Tiempo Real.
          </li>
          <li class="flex items-start">
            <span class="text-primary-500 mr-2">✓</span>
            Tablas de posiciones automatizadas.
          </li>
          <li class="flex items-start">
            <span class="text-primary-500 mr-2">✓</span>
            Participación de equipos externos.
          </li>
          <li class="flex items-start">
            <span class="text-primary-500 mr-2">✓</span>
            Gestión integral de inscripciones.
          </li>
          <li class="flex items-start">
            <span class="text-primary-500 mr-2">✓</span>
            Capitanes inscriben sus equipos.
          </li>
        </ul>
      </div>

      <!-- MOCKUPS -->
      <div
          class="w-full md:w-1/2 flex items-center justify-center relative gap-4"
          data-aos="fade-up"
      data-aos-duration="800"
      >
      <!-- Mockup 1 -->
      <img
          src="@/assets/phone3.png"
          alt="Mockup 1"
          class="w-32 sm:w-36 md:w-40 lg:w-44 shadow-md"
      />
      <!-- Mockup 2 -->
      <img
          src="@/assets/phone4.png"
          alt="Mockup 2"
          class="w-32 sm:w-36 md:w-40 lg:w-44 shadow-md"
      />
    </div>
    </div>
  </section>
</template>

<script setup>
/*
  - Si no necesitas lógica adicional,
    puedes dejarlo vacío o eliminarlo.
*/
</script>

<style scoped>
/*
  Sin animación continua; solo tienes fade-up (u otra) con AOS al entrar.
  No necesitas keyframes ni animación permanente aquí.
*/
</style>
