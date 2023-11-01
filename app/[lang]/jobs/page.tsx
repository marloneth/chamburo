import SearchBar from '@/components/molecules/SearchBar'
import JobList from '@/components/organisms/JobList'
import { getCurrentUserData } from '@/services/user'
import { getWorkers } from '@/services/worker'
import { redirect } from 'next/navigation'

interface Props {
  searchParams?: Record<string, string | string[] | undefined>
}

export default async function JobsPage({ searchParams }: Props) {
  let workers
  const currentUser = await getCurrentUserData()!
  let search = searchParams?.search ?? ''

  if (currentUser?.role !== 'CLIENT') redirect('/')

  if (Array.isArray(search)) search = search[0]

  workers = await getWorkers({ filters: { search } })

  return (
    <main className="my-6 px-4">
      <div className="md:px-32">
        <SearchBar size="md" value={search} />
      </div>
      <JobList workers={workers} />
    </main>
  )
}
