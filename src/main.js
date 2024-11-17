import { createApp } from 'vue'
import App from './App.vue'
import AOS from 'aos'
import 'aos/dist/aos.css'
import './assets/tailwind.css'

const app = createApp(App)
import './assets/tailwind.css'
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import i18n from '../i18n' // Asegúrate de que el archivo i18n.js esté bien importado
import router from './router/router'
import { servicesPlugin } from '@/di/services'

const vuetify = createVuetify({
    components,
    directives,
})


// Inicializar AOS
AOS.init({
    duration: 800,
    once: true
})

// Inicializar los iconos de Lucide
import { createIcons, icons } from 'lucide'

createIcons({ icons })

app.use(servicesPlugin)
app.use(i18n).use(router).use(vuetify).mount('#app')