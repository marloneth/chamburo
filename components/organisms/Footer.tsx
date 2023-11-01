import { getDictionary } from '@/lib/dictionary'
import { serverDetectLanguage } from '@/utils/i18n'

export default async function Footer() {
  const lang = serverDetectLanguage()
  const { component } = await getDictionary(lang)
  const langStrings = component.footer

  return (
    <footer className="h-20 flex flex-col items-center border-t-2 p-2">
      <span>{langStrings.legal}</span>
      <div className="my-2 flex text-center flex-col md:flex-row">
        <span>{langStrings.countryIcons} &nbsp;</span>
        <a
          href="https://www.flaticon.com/packs/gloss-circle-world-flags"
          title="country icons"
          className="text-vibrant-blue underline decoration-vibrant-blue"
        >
          Xinh Studio - Flaticon
        </a>
      </div>
      <span>Marlon Torres</span>
    </footer>
  )
}
