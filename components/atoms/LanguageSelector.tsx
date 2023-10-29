'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Locale } from '@/i18n.config'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'

interface Language {
  key: string
  name: string
}

interface Props {
  showSelectedLangName?: boolean
}

const LANGUAGE_SELECTOR_ID = 'language-selector'

export default function LanguageSelector({ showSelectedLangName }: Props) {
  const flagSize = 30
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const currentPath = usePathname()
  const currentLocale = currentPath.split('/')[1] as Locale
  const languages = {
    en: { key: 'us', name: 'English (US)' },
    es: { key: 'mx', name: 'Español (MX)' },
  }

  const langOptions = Object.entries(languages)
  const selectedLanguage = languages[currentLocale]

  async function handleLanguageChange(locale: string) {
    setIsOpen(false)

    if (locale === currentLocale) return

    const segments = currentPath.split('/')
    segments.splice(1, 1, locale)
    const newUrl = segments.join('/')
    router.replace(newUrl)
  }

  useEffect(() => {
    const handleWindowClick = (event: any) => {
      const target = event.target.closest('button')
      if (target && target.id === LANGUAGE_SELECTOR_ID) return

      setIsOpen(false)
    }

    window.addEventListener('click', handleWindowClick)

    return () => {
      window.removeEventListener('click', handleWindowClick)
    }
  }, [])

  return (
    <>
      <div className="flex items-center z-40">
        <div className="relative inline-block text-left">
          <div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center w-full text-off-white rounded-md shadow-sm px-2 py-2 bg-vibrant-blue focus:outline-none"
              id={LANGUAGE_SELECTOR_ID}
              aria-haspopup="true"
              aria-expanded={isOpen}
            >
              <Image
                src={`/icons/${selectedLanguage.key}-flag.png`}
                alt={`${selectedLanguage.key} flag`}
                width={flagSize}
                height={flagSize}
              />
              {showSelectedLangName && (
                <span className="ml-2">{selectedLanguage.name}</span>
              )}
              <svg
                className="-mr-1 ml-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="#F4F4F4"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L10 12.586l3.293-3.293a1 1 0 011.414 1.414l-4 4z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          {isOpen && (
            <div
              className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-off-white ring-1 ring-black ring-opacity-5"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="language-selector"
            >
              <div className="py-1 flex flex-col" role="none">
                {langOptions.map(([locale, language], index) => {
                  return (
                    <button
                      key={language.key}
                      onClick={() => handleLanguageChange(locale)}
                      className={`${
                        selectedLanguage.key === language.key
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-700'
                      } px-4 py-2 text-sm text-left items-center inline-flex hover:bg-gray-100 ${
                        index % 2 === 0 ? 'rounded-r' : 'rounded-l'
                      }`}
                      role="menuitem"
                    >
                      <Image
                        src={`/icons/${language.key}-flag.png`}
                        alt={`${language.key} flag`}
                        width={flagSize}
                        height={flagSize}
                      />
                      <span className="truncate pl-2">{language.name}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
