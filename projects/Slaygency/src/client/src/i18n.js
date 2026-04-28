import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import ne from './locales/ne.json';

const saved = localStorage.getItem('app_lang');
const initialLang = saved === 'ne' ? 'ne' : 'en';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ne: { translation: ne },
  },
  lng: initialLang,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

i18n.on('languageChanged', (lang) => {
  localStorage.setItem('app_lang', lang);
});

export default i18n;
