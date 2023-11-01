import { getDictionary } from '@/lib/dictionary'
import { serverDetectLanguage } from '@/utils/i18n'
import JobCard from '../molecules/JobCard'
import { Worker } from '@/types/worker'

interface Props {
  workers: Worker[]
}

export default async function JobList({ workers }: Props) {
  const lang = serverDetectLanguage()
  const { component } = await getDictionary(lang)
  const langStrings = component.jobList
  const jobsCount = workers.length
  const showingLabel = jobsCount
    ? langStrings.showingJobs.replace('{count}', jobsCount.toString()) +
      (jobsCount > 1 ? 's' : '')
    : langStrings.noJobs

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
