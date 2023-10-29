import { Locale } from '@/i18n.config'

const dictionaries = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  es: () => import('@/dictionaries/es.json').then((module) => module.default),
}

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]()
}
