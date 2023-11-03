'use server'

import { currentUser } from '@clerk/nextjs'
import { Role } from '@prisma/client'
import { prisma } from './db'
import { redirect } from 'next/navigation'

export async function createNewUser(formData: FormData) {
  let newUser
  const role = formData.get('role') as Role
  const occupation = formData.get('occupation') as string
  const user = (await currentUser())!
  const match = await prisma.user.findUnique({
    where: { clerkId: user.id },
  })

  if (match) return

  newUser = await prisma.user.create({
    data: {
      clerkId: user.id,
      email: user.emailAddresses[0].emailAddress,
      role,
    },
  })

  if (role === Role.WORKER && occupation) {
    await prisma.worker.create({
      data: {
        userId: newUser.id,
        occupation,
      },
    })

    redirect('/worker/dashboard')
  }

  redirect('/jobs')
}
