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
