import SearchBar from '@/components/molecules/SearchBar'
import { getDictionary } from '../lib/dictionary'
import { Locale } from '@/i18n.config'

interface Props {
  params: { lang: Locale }
}

export default async function HomePage({ params: { lang } }: Props) {
  const { page } = await getDictionary(lang)

  return (
    <main className="h-full flex flex-col justify-center">
      <div className="m-10 md:w-1/2 md:ml-32">
        <h1 className="text-4xl md:text-6xl">{page.home.searchHeading}</h1>
        <div className="mt-10">
          <SearchBar size="xl" />
        </div>
      </div>
    </main>
  )
}
