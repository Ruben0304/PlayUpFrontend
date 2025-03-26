<template>
  <!-- Contenedor principal con un canvas para el "video" de fondo -->
  <div class="bg-background-500 min-h-screen py-32 relative overflow-hidden">
    <!-- Canvas de fondo -->
    <canvas
        id="futuristic-canvas"
        class="absolute inset-0 pointer-events-none z-0"
    ></canvas>

    <div class="container mx-auto max-w-4xl px-4 relative z-10">
      <div
          class="relative overflow-hidden bg-background-600 rounded-xl p-8 shadow-2xl"
          data-aos="fade-up"
      >
        <!-- Capa de degradado sutil encima del background -->
        <div class="absolute inset-0 gradient-background opacity-20"></div>

        <!-- Contenido real -->
        <div class="relative z-10 space-y-16">

          <!-- Sección: ¿Quiénes somos? -->
          <section class="space-y-4">
            <h1 class="text-4xl font-bold text-primary-500">{{ $t('about_us.who_we_are.title') }}</h1>
            <p class="text-gray-300" v-html="$t('about_us.who_we_are.content')"></p>
          </section>

          <!-- Sección: ¿Qué ofrecemos? -->
          <section class="space-y-4">
            <h2 class="text-3xl font-bold text-primary-500">{{ $t('about_us.what_we_offer.title') }}</h2>
            <p class="text-gray-300">
              {{ $t('about_us.what_we_offer.content') }}
            </p>
          </section>

          <!-- Sección: Beneficios -->
          <section class="space-y-8">
            <h2 class="text-3xl font-bold text-primary-500">{{ $t('about_us.benefits.title') }}</h2>

            <!-- Jugador -->
            <div
                class="bg-gray-700 rounded-xl p-6 transform transition-transform duration-500 hover:-translate-y-2 hover:rotate-1 hover:scale-[1.03]"
                data-aos="fade-right"
            >
              <h3 class="text-2xl font-bold text-white mb-4">{{ $t('about_us.benefits.player.title') }}</h3>
              <div class="space-y-4">
                <p class="text-gray-300">
                  {{ $t('about_us.benefits.player.description') }}
                </p>
                <ul class="list-none space-y-2 pl-4">
                  <li class="flex items-center space-x-2 text-gray-300">
                    <span class="w-2 h-2 bg-primary-500 rounded-full"></span>
                    <span>{{ $t('about_us.benefits.player.stats.goals') }}</span>
                  </li>
                  <li class="flex items-center space-x-2 text-gray-300">
                    <span class="w-2 h-2 bg-primary-500 rounded-full"></span>
                    <span>{{ $t('about_us.benefits.player.stats.assists') }}</span>
                  </li>
                  <li class="flex items-center space-x-2 text-gray-300">
                    <span class="w-2 h-2 bg-primary-500 rounded-full"></span>
                    <span>{{ $t('about_us.benefits.player.stats.red_cards') }}</span>
                  </li>
                  <li class="flex items-center space-x-2 text-gray-300">
                    <span class="w-2 h-2 bg-primary-500 rounded-full"></span>
                    <span>{{ $t('about_us.benefits.player.stats.yellow_cards') }}</span>
                  </li>
                </ul>
                <div class="bg-gray-800 p-4 rounded-lg border-l-4 border-primary-500 mt-4">
                  <p class="text-gray-300 text-sm">
                    {{ $t('about_us.benefits.player.note') }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Organizador -->
            <div
                class="bg-gray-700 rounded-xl p-6 transform transition-transform duration-500 hover:-translate-y-2 hover:rotate-1 hover:scale-[1.03]"
                data-aos="fade-left"
            >
              <h3 class="text-2xl font-bold text-white mb-4">{{ $t('about_us.benefits.organizer.title') }}</h3>
              <p class="text-gray-300">
                {{ $t('about_us.benefits.organizer.content') }}
              </p>
            </div>

            <!-- Patrocinador -->
            <div
                class="bg-gray-700 rounded-xl p-6 transform transition-transform duration-500 hover:-translate-y-2 hover:rotate-1 hover:scale-[1.03]"
                data-aos="fade-right"
            >
              <h3 class="text-2xl font-bold text-white mb-4">{{ $t('about_us.benefits.sponsor.title') }}</h3>
              <p class="text-gray-300">
                {{ $t('about_us.benefits.sponsor.content') }}
              </p>
            </div>
          </section>

          <!-- Sección: Nuestra Visión -->
          <section class="space-y-4">
            <h2 class="text-3xl font-bold text-primary-500">{{ $t('about_us.vision.title') }}</h2>
            <p class="text-gray-300">
              {{ $t('about_us.vision.content') }}
            </p>
          </section>

          <!-- Sección: Nuestro Equipo -->
          <section class="space-y-8">
            <h2 class="text-3xl font-bold text-primary-500">{{ $t('about_us.team.title') }}</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              <!-- Desarrollador Móvil -->
              <div class="relative group" data-aos="fade-up">
                <div
                    class="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-500"
                ></div>
                <a
                    href="https://github.com/ale24dev"
                    target="_blank"
                    class="relative block bg-gray-800 p-6 rounded-xl transform transition duration-500 hover:-translate-y-2 hover:scale-[1.03]"
                >
                  <div class="text-center">
                    <!-- Imagen Circular -->
                    <div
                        class="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105"
                    >
                      <img
                          src="https://avatars.githubusercontent.com/u/111847126?v=4"
                          :alt="$t('about_us.team.members.alejandro.name')"
                          class="w-full h-full object-cover"
                      >
                    </div>
                    <h3 class="text-xl font-bold text-white mb-2 flex items-center justify-center">
                      <i data-lucide="smartphone" class="w-5 h-5 text-white mr-2"></i>
                      {{ $t('about_us.team.members.alejandro.name') }}
                    </h3>
                    <p class="text-gray-400 mb-4">{{ $t('about_us.team.members.alejandro.role') }}</p>
                    <div class="flex justify-center">
                      <span class="text-blue-500 hover:text-blue-400 flex items-center">
                        <i data-lucide="github" class="w-5 h-5 mr-2"></i> {{ $t('about_us.team.members.alejandro.github') }}
                      </span>
                    </div>
                  </div>
                </a>
              </div>

              <!-- Desarrollador Web -->
              <div class="relative group" data-aos="fade-up" data-aos-delay="100">
                <div
                    class="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-500"
                ></div>
                <a
                    href="https://github.com/Ruben0304"
                    target="_blank"
                    class="relative block bg-gray-800 p-6 rounded-xl transform transition duration-500 hover:-translate-y-2 hover:scale-[1.03]"
                >
                  <div class="text-center">
                    <!-- Imagen Circular -->
                    <div
                        class="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105"
                    >
                      <img
                          src="https://avatars.githubusercontent.com/u/98282371?v=4"
                          :alt="$t('about_us.team.members.ruben.name')"
                          class="w-full h-full object-cover"
                      >
                    </div>
                    <h3 class="text-xl font-bold text-white mb-2 flex items-center justify-center">
                      <i data-lucide="code" class="w-5 h-5 text-white mr-2"></i>
                      {{ $t('about_us.team.members.ruben.name') }}
                    </h3>
                    <p class="text-gray-400 mb-4">{{ $t('about_us.team.members.ruben.role') }}</p>
                    <div class="flex justify-center">
                      <span class="text-blue-500 hover:text-blue-400 flex items-center">
                        <i data-lucide="github" class="w-5 h-5 mr-2"></i> {{ $t('about_us.team.members.ruben.github') }}
                      </span>
                    </div>
                  </div>
                </a>
              </div>

              <!-- Community Manager -->
              <div class="relative group" data-aos="fade-up" data-aos-delay="200">
                <div
                    class="absolute inset-0 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-500"
                ></div>
                <a
                    href="https://www.facebook.com/andy.cabrera.528316"
                    target="_blank"
                    class="relative block bg-gray-800 p-6 rounded-xl transform transition duration-500 hover:-translate-y-2 hover:scale-[1.03]"
                >
                  <div class="text-center">
                    <!-- Imagen Circular -->
                    <div
                        class="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105"
                    >
                      <img
                          src="https://scontent-phx1-1.xx.fbcdn.net/v/t39.30808-1/441082192_1182844439752833_5257541817965719591_n.jpg?stp=dst-jpg_s100x100&_nc_cat=100&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=zMaAe9CIn7EQ7kNvgHY4wpV&_nc_zt=24&_nc_ht=scontent-phx1-1.xx&_nc_gid=AHrVubRzCSeUJwjjDi2FjSY&oh=00_AYBBhx5ptcFP5VU19l3LDhkWfeSSMWswKEBZRcjWv2bsqw&oe=6728E65A"
                          :alt="$t('about_us.team.members.andy.name')"
                          class="w-full h-full object-cover"
                      >
                    </div>
                    <h3 class="text-xl font-bold text-white mb-2 flex items-center justify-center">
                      <i data-lucide="message-circle" class="w-5 h-5 text-white mr-2"></i>
                      {{ $t('about_us.team.members.andy.name') }}
                    </h3>
                    <p class="text-gray-400 mb-4">{{ $t('about_us.team.members.andy.role') }}</p>
                    <div class="flex justify-center">
                      <span class="text-green-500 hover:text-green-400 flex items-center">
                        <i data-lucide="facebook" class="w-5 h-5 mr-2"></i> {{ $t('about_us.team.members.andy.facebook') }}
                      </span>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </section>

          <!-- Sección: Preguntas Frecuentes -->
          <section
              class="container mx-auto px-4 py-16 max-w-4xl space-y-8"
              data-aos="fade-up"
          >
            <h2 class="text-3xl font-bold text-primary-500">{{ $t('about_us.faq.title') }}</h2>
            <div class="space-y-4">
              <div class="bg-gray-800 rounded-xl p-6">
                <h3 class="text-lg font-semibold text-white">{{ $t('about_us.faq.questions.free.question') }}</h3>
                <p class="text-gray-300">
                  {{ $t('about_us.faq.questions.free.answer') }}
                </p>
              </div>
              <div class="bg-gray-800 rounded-xl p-6">
                <h3 class="text-lg font-semibold text-white">{{ $t('about_us.faq.questions.join_tournament.question') }}</h3>
                <p class="text-gray-300">
                  {{ $t('about_us.faq.questions.join_tournament.answer') }}
                </p>
              </div>
              <div class="bg-gray-800 rounded-xl p-6">
                <h3 class="text-lg font-semibold text-white">{{ $t('about_us.faq.questions.create_tournament.question') }}</h3>
                <p class="text-gray-300">
                  {{ $t('about_us.faq.questions.create_tournament.answer') }}
                </p>
              </div>
              <div class="bg-gray-800 rounded-xl p-6">
                <h3 class="text-lg font-semibold text-white">{{ $t('about_us.faq.questions.verify_results.question') }}</h3>
                <p class="text-gray-300">
                  {{ $t('about_us.faq.questions.verify_results.answer') }}
                </p>
              </div>
              <div class="bg-gray-800 rounded-xl p-6">
                <h3 class="text-lg font-semibold text-white">{{ $t('about_us.faq.questions.invite_friends.question') }}</h3>
                <p class="text-gray-300">
                  {{ $t('about_us.faq.questions.invite_friends.answer') }}
                </p>
              </div>
              <div class="bg-gray-800 rounded-xl p-6">
                <h3 class="text-lg font-semibold text-white">{{ $t('about_us.faq.questions.contact_support.question') }}</h3>
                <p class="text-gray-300">
                  {{ $t('about_us.faq.questions.contact_support.answer') }}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- Replace the current script tag with this Vue script setup -->
<script>
export default {
  mounted() {
    this.initFuturisticCanvas();
  },
  methods: {
    initFuturisticCanvas() {
      const canvas = document.getElementById("futuristic-canvas");
      if (!canvas) return; // Safety check
      
      const ctx = canvas.getContext("2d");
      
      let width, height;
      let circles = [];
      
      function initCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        
        // Generamos "n" círculos/partículas
        const totalCircles = 80;
        circles = [];
        for (let i = 0; i < totalCircles; i++) {
          circles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            r: Math.random() * 6 + 2,
            dx: (Math.random() - 0.5) * 0.4,
            dy: (Math.random() - 0.5) * 0.4,
            opacity: Math.random() * 0.5 + 0.3
          });
        }
      }
      
      function animate() {
        ctx.clearRect(0, 0, width, height);
        
        // Fondo sutil para simular "video" (color ajustable si quieres)
        // Lo dejamos casi transparente para no invadir el color actual
        ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
        ctx.fillRect(0, 0, width, height);
        
        // Dibujamos cada partícula
        circles.forEach((circle) => {
          ctx.beginPath();
          ctx.globalAlpha = circle.opacity;
          ctx.fillStyle = "#ffffff";
          ctx.arc(circle.x, circle.y, circle.r, 0, Math.PI * 2, false);
          ctx.fill();
          
          // Movimiento
          circle.x += circle.dx;
          circle.y += circle.dy;
          
          // Rebote sencillo en los bordes
          if (circle.x < 0 || circle.x > width) circle.dx *= -1;
          if (circle.y < 0 || circle.y > height) circle.dy *= -1;
        });
        
        requestAnimationFrame(animate);
      }
      
      // Ajustamos el canvas al inicio y cuando cambia el tamaño de la ventana
      window.addEventListener("resize", initCanvas);
      
      // Inicializamos y arrancamos la animación
      initCanvas();
      animate();
    }
  }
}
</script>

<style scoped>
/* Ejemplo de un gradiente futurista muy suave,
   si ya tienes un `.gradient-background` simplemente ajusta la opacidad. */
.gradient-background {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.01));
}
</style>
