import NewUserForm from '@/components/organisms/NewUserForm'
import { getCurrentUserData } from '@/services/user'
import { redirect } from 'next/navigation'

export default async function NewUser() {
  const currentUser = await getCurrentUserData()

  if (currentUser) redirect('/')

  return <NewUserForm />
}
