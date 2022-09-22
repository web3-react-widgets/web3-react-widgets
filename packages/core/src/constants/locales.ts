export const SUPPORTED_LOCALES = [
  // order as they appear in the language dropdown
  'en-US',
  'zh-CN',
  'zh-TW',
]
export type SupportedLocale = typeof SUPPORTED_LOCALES[number] | 'pseudo'

export const DEFAULT_LOCALE: SupportedLocale = 'en-US'

export const LOCALE_LABEL: { [locale in SupportedLocale]: string } = {
  'en-US': 'English',
  'zh-CN': '简体中文',
  'zh-TW': '繁体中文',
  pseudo: 'ƥƨèúδô',
}
