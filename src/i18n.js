import i18n from 'i18next'
import detector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import translationENG from './locales/eng/translation.json'
import translationPT from './locales/pt/translation.json'

// the translations
const resources = {
  'en-US': {
    translation: translationENG
  },
  'pt-BR': {
    translation: translationPT
  }
}

i18n
  .use(detector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    // lng: "pt",
    fallbackLng: 'pt-BR', // use en if detected lng is not available

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  })

export default i18n
