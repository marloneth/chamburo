import SearchBar from '@/components/molecules/SearchBar'
import JobList from '@/components/organisms/JobList'
import { getCurrentUserData } from '@/services/user'
import { getWorkers } from '@/services/worker'
import { redirect } from 'next/navigation'

export default async function JobsPage() {
  let workers
  const currentUser = await getCurrentUserData()!

  if (currentUser?.role !== 'CLIENT') redirect('/')

  workers = await getWorkers()

  return (
    <main className="my-6 px-4">
      <div className="md:px-32">
        <SearchBar size="md" />
      </div>
      <JobList workers={workers} />
    </main>
  )
}
