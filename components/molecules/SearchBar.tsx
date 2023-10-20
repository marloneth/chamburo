import { goToJobList } from '@/utils/serverActions'

interface Props {
  size: 'md' | 'xl'
}

export default function SearchBar({ size }: Props) {
  const sizeClasses = {
    md: { input: 'text-md', button: 'text-xl' },
    xl: { input: 'text-md md:text-xl', button: 'text-xl md:text-3xl' },
  }

  return (
    <form className="flex border-2 rounded-xl p-2 w-full" action={goToJobList}>
      <input
        type="text"
        name="search-jobs"
        className={`outline-0 w-full ${sizeClasses[size].input}`}
        placeholder="What are you looking for?"
      />
      <button type="submit" className={sizeClasses[size].button}>
        🔎
      </button>
    </form>
  )
}
