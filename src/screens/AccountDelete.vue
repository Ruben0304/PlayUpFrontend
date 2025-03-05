<template>
  <div class="min-h-screen bg-background-500 relative overflow-hidden flex items-center">


    <div class="container mx-auto px-4 md:px-6 py-12 md:py-0 z-10">
      <div class="flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0">
        <!-- Warning Icon -->
        <div
            class="w-full md:w-1/2 flex justify-center md:justify-start"
            data-aos="fade-right"
            data-aos-delay="100"
        >
          <div class="w-48 sm:w-56 md:w-64 lg:w-72 h-48 sm:h-56 md:h-64 lg:h-72 bg-red-500 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-24 h-24 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>

        <!-- Text Content and Form -->
        <div
            class="w-full md:w-1/2 text-white z-10 mt-8 md:mt-0 mb-8 md:mb-0 flex flex-col gap-6 md:gap-8"
            data-aos="fade-left"
            data-aos-delay="200"
        >
          <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight md:text-left px-1 md:px-0">
            Account Deletion Request
          </h1>

          <p class="text-white text-sm sm:text-md md:text-lg lg:text-xl max-w-lg md:text-left px-2 md:px-0">
            We're sorry to see you go. Please confirm your decision to delete your account.
          </p>

          <form @submit.prevent="submitDeletionRequest" class="space-y-4 w-full">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-300">Email Address</label>
              <input type="email" id="email" v-model="email" required class="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
            </div>
            <div>
              <label for="reason" class="block text-sm font-medium text-gray-300">Reason for Deletion (Optional)</label>
              <textarea id="reason" v-model="reason" rows="3" class="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"></textarea>
            </div>
            <div class="flex items-center">
              <input type="checkbox" id="confirm" v-model="confirmed" required class="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300 rounded">
              <label for="confirm" class="ml-2 block text-sm text-gray-300">I understand this action is irreversible</label>
            </div>
            <button type="submit" class="w-full px-6 md:px-8 py-2 md:py-3 bg-red-600 text-white rounded text-base md:text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800">
              Request Account Deletion
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const reason = ref('')
const confirmed = ref(false)

const submitDeletionRequest = () => {
  // Here you would typically send the deletion request to your backend
  console.log('Deletion request submitted', { email: email.value, reason: reason.value })
  // Reset form or show confirmation message
  alert('Your account deletion request has been submitted. We will process it shortly.')
}
</script>

<style scoped>
/* You can add any additional styles here if needed */
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