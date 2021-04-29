import i18n from 'i18next'
import detector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import translationENG from './locales/eng/translation.json'
import translationPT from './locales/pt/translation.json'

// the translations
const resources = {
  eng: {
    translation: translationENG
  },
  pt: {
    translation: translationPT
  }
}

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'pt-BR',
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
