import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import en from './en.json';
import ar from './ar.json';
import ru from './ru.json';

const resources = {
  en: { translation: en },
  ar: { translation: ar },
  ru: { translation: ru },
};

const findBestMatchingLanguage = () => {
  const fallback = 'en';
  const locales = RNLocalize.getLocales();

  if (!Array.isArray(locales) || locales.length === 0) {
    return fallback;
  }

  const languageTags = locales.map((locale) => locale.languageTag);

  for (const languageTag of languageTags) {
    const baseLanguage = languageTag.split('-')[0];
    if (Object.keys(resources).includes(baseLanguage)) {
      return baseLanguage;
    }
  }

  return fallback;
};

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    lng: findBestMatchingLanguage(),
    resources,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
