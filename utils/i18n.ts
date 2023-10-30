import { Locale } from '@/i18n.config'
import { headers } from 'next/headers'

export function serverDetectLanguage() {
  const headerList = headers()
  const pathname = headerList.get('x-pathname') || ''
  const [_, language] = pathname.split('/')
  return language as Locale
}
