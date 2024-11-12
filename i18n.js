import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import es from './locales/es.json'
import fr from './locales/fr.json'
import pt from './locales/pt.json' // Importa las traducciones en portugués

const messages = {
    en,
    es,
    fr,
    pt // Añade las traducciones en portugués
}

const i18n = createI18n({
    locale: 'es',
    fallbackLocale: 'en',
    messages
})

export default i18n
