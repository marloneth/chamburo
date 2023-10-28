import JobCard from '../molecules/JobCard'
import { Worker } from '@/types/worker'

interface Props {
  workers: Worker[]
}

export default function JobList({ workers }: Props) {
  const jobsCount = workers.length
  const showingLabel = jobsCount
    ? `Showing ${workers.length} job${jobsCount > 1 ? 's' : ''}`
    : 'No jobs found'

  return (
    <div className="mt-4">
      <span>{showingLabel}</span>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {workers.map((worker, i) => (
          <JobCard key={i} worker={worker} />
        ))}
      </div>
    </div>
  )
}
