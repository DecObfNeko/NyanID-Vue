import { createI18n } from 'vue-i18n'
import en from './../locales/en.json'
import zh from './../locales/zh.json'
import ja from './../locales/ja.json'
import ko from './../locales/ko.json'


const messages = { en, zh, ja, ko }

export default createI18n({
  legacy: false,
  locale: 'zh',
  fallbackLocale: 'zh',
  messages,
  fallbackWarn: false,
  missingWarn: false
})
