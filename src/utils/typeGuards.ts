import  i18n  from './index'
type SupportedLocale = 'en' | 'zh' | 'ja' | 'ko';

export function isSupportedLocale(lang: unknown): lang is SupportedLocale {
  return typeof lang === 'string' 
    && (['en', 'zh', 'ja', 'ko'] as const).includes(lang as SupportedLocale)
}