declare module 'vue-i18n' {
  import { Composer, I18n } from 'vue-i18n'
  
  export const createI18n: typeof I18n.createI18n
  export const useI18n: typeof Composer.useI18n
}