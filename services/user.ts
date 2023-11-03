import { MyUserCreationBody } from '@/types/user'
import { createURL } from '@/utils/api'
import { prisma } from '@/utils/db'
import { currentUser } from '@clerk/nextjs'

export async function getCurrentUserData() {
  const clerkUser = await currentUser()

  if (!clerkUser) return null

  const dbUser = await prisma.user.findUnique({
    where: { clerkId: clerkUser.id },
  })

  if (!dbUser) return null

  return {
    ...dbUser,
    firstName: clerkUser.firstName,
    lastName: clerkUser.lastName,
    image: clerkUser.imageUrl,
  }
}

export async function createMyUser(body: MyUserCreationBody) {
  const response = await fetch(
    new Request(createURL('/api/user/me'), {
      method: 'POST',
      body: JSON.stringify(body),
    })
  )

  if (response.ok) return true

  const responseBody = await response.json()
  throw new Error(responseBody.message)
}
