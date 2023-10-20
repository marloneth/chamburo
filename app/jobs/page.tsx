'use client'

import SearchBar from '@/components/molecules/SearchBar'
import JobList from '@/components/organisms/JobList'
import { fetcher } from '@/utils/api'
import useSWR from 'swr'

export default function JobsPage() {
  const { data } = useSWR('/api/worker', fetcher)

  return (
    <main className="my-6 px-4">
      <div className="md:px-32">
        <SearchBar size="md" />
      </div>
      {data && <JobList workers={data.workers} />}
    </main>
  )
}
