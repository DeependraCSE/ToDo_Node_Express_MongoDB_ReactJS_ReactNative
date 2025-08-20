import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './en.json'
import hi from './hi.json'

i18n
  .use(LanguageDetector) // auto-detect language
  .use(initReactI18next) // pass i18n instance to react-i18next
  .init({
    fallbackLng: 'en',
    debug: true,
    resources: {
      en: { translation: en },
      hi: { translation: hi },
    },
    interpolation: {
      escapeValue: false, // react already escapes
    },
  });

export default i18n;
