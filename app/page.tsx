import SearchBar from '@/components/molecules/SearchBar'

export default function HomePage() {
  return (
    <main className="h-full flex flex-col justify-center">
      <div className="m-10 md:w-1/2 md:ml-32">
        <h1 className="text-4xl md:text-6xl">Find people that can help you</h1>
        <div className="mt-10">
          <SearchBar size="xl" />
        </div>
      </div>
    </main>
  )
}
