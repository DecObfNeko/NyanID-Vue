import { createI18n } from 'vue-i18n'
import en from './../locales/en.json'
import zh from './../locales/zh.json'
import ja from './../locales/ja.json'
import ko from './../locales/ko.json'

const messages = { en, zh, ja, ko };
type SupportedLocale = 'en' | 'zh' | 'ja' | 'ko';

const i18n = createI18n<{}, SupportedLocale>({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages
});

export default i18n;