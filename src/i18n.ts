import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

// Used in the language switch in footer
interface Language {
  name: string;
  code: string;
}
const languages: Language[] = [
  { name: 'Norsk', code: 'nb-NO' },
  { name: 'English', code: 'en-US' },
];

const resources = {
  'nb-NO': { translation: require('./locales/no.json') },
  'en-US': { translation: require('./locales/en.json') },
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: 'nb-NO',

    keySeparator: false,

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
export { languages };
