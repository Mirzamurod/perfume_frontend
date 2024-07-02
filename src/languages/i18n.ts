// i18n.ts
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { ru, us, uz } from '.'

i18n.use(initReactI18next).init({
  resources: {
    uz: { translation: uz },
    ru: { translation: ru },
    us: { translation: us },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
})

export default i18n
