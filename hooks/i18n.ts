import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary'
import { LangDictionary } from '@/types/i18n'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

function useDetectLang() {
  const pathname = usePathname()
  const [_, language = 'en'] = pathname.split('/')
  return language as Locale
}

export function useLangDictionary() {
  const lang = useDetectLang()
  const [langDictionary, setLangDictionary] = useState<LangDictionary>()

  useEffect(() => {
    getDictionary(lang).then((dictionary) => setLangDictionary(dictionary))
  }, [])

  return { langDictionary, lang }
}
