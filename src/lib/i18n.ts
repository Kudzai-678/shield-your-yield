import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import enTranslation from '../locales/en.json';
import afTranslation from '../locales/af.json';
import zuTranslation from '../locales/zu.json';
import xhTranslation from '../locales/xh.json';

const resources = {
  en: { translation: enTranslation },
  af: { translation: afTranslation },
  zu: { translation: zuTranslation },
  xh: { translation: xhTranslation },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    
    interpolation: {
      escapeValue: false,
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

export default i18n;