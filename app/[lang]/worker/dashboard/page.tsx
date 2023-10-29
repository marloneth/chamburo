import { getCurrentUserData } from '@/services/user'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const currentUser = await getCurrentUserData()!

  if (currentUser?.role !== 'WORKER') redirect('/')

  return (
    <div className="p-5">
      <h2 className="text-3xl">THIS IS THE DASHBOARD</h2>
    </div>
  )
}
