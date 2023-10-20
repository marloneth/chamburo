import Image from 'next/image'
import { Worker } from '@/types/worker'

interface Props {
  worker: Worker
}

export default function JobCard({ worker }: Props) {
  return (
    <div className="flex flex-col items-center border p-4">
      <Image
        className="rounded-full"
        src={worker.image || '/user-default.png'}
        alt="user image"
        width={72}
        height={72}
        priority
      />
      <h3>
        {worker.firstName} {worker.lastName}
      </h3>
      <p className="capitalize">{worker.occupation}</p>
    </div>
  )
}
