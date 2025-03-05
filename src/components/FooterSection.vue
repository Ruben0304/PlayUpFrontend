<template>
  <footer class="bg-background-500 py-12 border-t border-gray-800">
    <div class="max-w-7xl mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div class="flex items-center space-x-3 mb-6">
            <div class="w-10 h-10 rounded-full flex items-center justify-center relative overflow-hidden">
              <img :src="logoSrc" alt="logo" class="w-full h-full object-cover">
            </div>
            <span class="text-xl font-bold">PlayUp</span></div>
          <p class="text-gray-400"> {{ $t('footer.platformDescription') }} </p></div>
        <div><h4 class="text-lg font-semibold mb-4">{{ $t('footer.productTitle') }}</h4>
          <ul class="space-y-2 text-gray-400">
            <li><a href="#features" class="hover:text-primary-500 transition-colors">{{ $t('footer.featuresLink') }}</a>
            </li>
            <li><a href="#tournaments" class="hover:text-primary-500 transition-colors">{{
                $t('footer.tournamentsLink')
              }}</a></li>
            <li><a href="#players" class="hover:text-primary-500 transition-colors">{{ $t('footer.playersLink') }}</a>
            </li>
            <li><a href="#stats" class="hover:text-primary-500 transition-colors">{{ $t('footer.statsLink') }}</a></li>
          </ul>
        </div>
        <div><h4 class="text-lg font-semibold mb-4">{{ $t('footer.companyTitle') }}</h4>
          <ul class="space-y-2 text-gray-400">
            <li><router-link to="/about-us" class="hover:text-primary-500 transition-colors">{{
                $t('footer.aboutUsLink')
              }}</router-link></li>
            <li><a href="#" class="hover:text-primary-500 transition-colors">{{ $t('footer.contactLink') }}</a></li>
          </ul>
        </div>
        <div><h4 class="text-lg font-semibold mb-4">{{ $t('footer.legalTitle') }}</h4>
          <ul class="space-y-2 text-gray-400">
            <li><router-link to="/terms-conditions" class="hover:text-primary-500 transition-colors">{{ $t('footer.termsLink') }}</router-link>
            </li>
            <li><router-link to="/privacy-policy"
                   class="hover:text-primary-500 transition-colors">{{ $t('footer.privacyLink') }}</router-link></li>
          </ul>
        </div>
      </div>
      <div class="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
        <div class="text-gray-400 mb-4 md:mb-0"> © {{ currentYear }} PlayUp. {{ $t('footer.rightsReserved') }}</div>
        <div class="flex space-x-6"><a v-for="(link, index) in socialLinks" :key="index" :href="link.url"
                                       class="text-gray-400 hover:text-primary-500 transition-colors"> <i
            :data-lucide="link.icon" class="w-6 h-6"></i> </a></div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import {ref} from 'vue'

const currentYear = new Date().getFullYear()
import logo from '@/assets/logo.jpg'
const logoSrc = ref(logo)

const socialLinks = ref([
  {icon: 'twitter', url: '#'},
  {icon: 'instagram', url: '#'},
  {icon: 'linkedin', url: '#'}
])
</script>