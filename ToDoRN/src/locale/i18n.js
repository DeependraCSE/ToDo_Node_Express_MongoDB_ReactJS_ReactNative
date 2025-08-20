import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import AsyncStorage from '@react-native-async-storage/async-storage';

import en from './en.json';
import hi from './hi.json';

const LANGUAGES = {
  en: 'en',
  hi: 'hi',
};


const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: async (callback) => {
    const storedLanguage = await AsyncStorage.getItem('appLanguage');
    if (storedLanguage) {
      return callback(storedLanguage);
    }
    const deviceLanguage = RNLocalize.getLocales()[0].languageCode;
    const bestLanguage = LANGUAGES[deviceLanguage] ? deviceLanguage : 'en';
    callback(bestLanguage);
  },
  init: () => {},
  cacheUserLanguage: async language => {
    await AsyncStorage.setItem('appLanguage', language);
  },
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources: {
      en: {translation: en},
      hi: {translation: hi},
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });
export default i18n;
