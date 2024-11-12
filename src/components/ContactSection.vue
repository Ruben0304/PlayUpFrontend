<template>
  <section class="space-y-8 py-16 bg-gray-900"><h2 class="text-4xl font-bold text-center text-orange-500 mb-12"
                                                   data-aos="fade-up">{{ $t('contactSection.title') }}</h2>
    <div
        class="max-w-3xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg transform transition duration-500 hover:shadow-2xl hover:-translate-y-1">
      <form @submit.prevent="submitForm" class="space-y-6" data-aos="fade-up" data-aos-delay="100"> <!-- Nombre -->
        <div class="relative"><label for="name" class="block text-sm font-medium text-gray-400">{{
            $t('contactSection.nameLabel')
          }}</label> <input v-model="form.name" type="text" id="name" name="name" required
                            class="w-full mt-1 p-3 bg-gray-700 text-white rounded-lg shadow-inner focus:ring-2 focus:ring-orange-500 focus:outline-none transition duration-300"
                            :placeholder="$t('contactSection.namePlaceholder')"></div> <!-- Correo -->
        <div class="relative"><label for="email" class="block text-sm font-medium text-gray-400">{{
            $t('contactSection.emailLabel')
          }}</label> <input v-model="form.email" type="email" id="email" name="_replyto" required
                            class="w-full mt-1 p-3 bg-gray-700 text-white rounded-lg shadow-inner focus:ring-2 focus:ring-orange-500 focus:outline-none transition duration-300"
                            :placeholder="$t('contactSection.emailPlaceholder')"></div> <!-- Mensaje -->
        <div class="relative"><label for="message" class="block text-sm font-medium text-gray-400">{{
            $t('contactSection.messageLabel')
          }}</label> <textarea v-model="form.message" id="message" name="message" required rows="5"
                               class="w-full mt-1 p-3 bg-gray-700 text-white rounded-lg shadow-inner focus:ring-2 focus:ring-orange-500 focus:outline-none transition duration-300"
                               :placeholder="$t('contactSection.messagePlaceholder')"></textarea></div>
        <!-- Botón Enviar -->
        <div class="text-center mt-6">
          <button type="submit" style="background-color: #EB6343; width: 100%"
                  class="px-8 py-3 font-semibold rounded-lg bg-orange-500 text-white shadow-lg hover:bg-orange-600 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50 transition duration-300 transform hover:-translate-y-1">
            {{ $t('contactSection.submitButton') }}
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup>
import {ref} from 'vue'

const form = ref({
  name: '',
  email: '',
  message: ''
})

const submitForm = () => {
  // Here you would typically send the form data to your backend
  console.log('Form submitted:', form.value)
  // Reset form after submission
  form.value = {name: '', email: '', message: ''}
}
</script>