import JobCard from '../molecules/JobCard'
import { Worker } from '@/types/worker'

interface Props {
  workers: Worker[]
}

export default function JobList({ workers }: Props) {
  return (
    <div className="mt-4">
      <span>Showing 100 jobs</span>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {workers.map((worker, i) => (
          <JobCard key={i} worker={worker} />
        ))}
      </div>
    </div>
  )
}
