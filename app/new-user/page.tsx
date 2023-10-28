import NewUserForm from '@/components/organisms/NewUserForm'
import { getCurrentUserData } from '@/services/user'
import { redirect } from 'next/navigation'

interface Props {
  searchParams: Record<string, string | string[] | undefined>
}

export default async function NewUser({ searchParams }: Props) {
  const redirectTo = searchParams?.redirectTo ?? '/'
  const currentUser = await getCurrentUserData()
  const redirectUrl = Array.isArray(redirectTo) ? redirectTo[0] : redirectTo

  if (currentUser) redirect(redirectUrl)

  return <NewUserForm />
}
