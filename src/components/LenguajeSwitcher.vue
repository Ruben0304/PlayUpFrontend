<template>
  <div class="relative">
    <button
        @click="toggleDropdown"
        @blur="handleBlur"
        class="text-white hover:text-orange-500 transition-colors flex items-center"
    >
      <Globe class="w-5 h-5 mr-2" />
      <span class="flex items-center gap-2">
        {{ flagEmoji[currentLanguage] }}
        <svg
            :class="{'rotate-180': isOpen}"
            class="w-4 h-4 transition-transform duration-200"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </span>
    </button>

    <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
    >
      <div
          v-if="isOpen"
          class="absolute right-0 mt-2 w-40 rounded-lg bg-gray-900/90 backdrop-blur-sm shadow-lg border border-white/10 z-20"
      >
        <div class="py-1">
          <button
              v-for="lang in languages"
              :key="lang"
              @click="changeLanguage(lang)"
              class="w-full flex items-center gap-3 px-4 py-2 text-white hover:text-orange-500 transition-colors text-sm"
              :class="{'text-orange-500': currentLanguage === lang}"
          >
            <span class="text-base">{{ flagEmoji[lang] }}</span>
            <span>{{ languageNames[lang] }}</span>
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Globe } from 'lucide-vue-next'

const { locale } = useI18n()
const currentLanguage = ref(locale.value)
const isOpen = ref(false)
const languages = ['es', 'en', 'fr', 'pt'] // Añadido portugués

const flagEmoji = {
  es: '🇪🇸',
  en: '🇬🇧',
  fr: '🇫🇷',
  pt: '🇵🇹' // Emoji de bandera para portugués
}

const languageNames = {
  es: 'Español',
  en: 'English',
  fr: 'Français',
  pt: 'Português' // Nombre completo para portugués
}

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const handleBlur = () => {
  setTimeout(() => {
    isOpen.value = false
  }, 200)
}

const changeLanguage = (lang) => {
  currentLanguage.value = lang
  locale.value = lang
  isOpen.value = false
}
</script>
