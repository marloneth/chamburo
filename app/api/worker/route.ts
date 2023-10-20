import { prisma } from '@/utils/db'
import { NextResponse } from 'next/server'
import { clerkClient } from '@clerk/nextjs'

export async function GET() {
  const dbWorkers = await prisma.worker.findMany({
    include: {
      user: {
        select: {
          clerkId: true,
        },
      },
    },
  })

  const clerkWorkers = await clerkClient.users.getUserList({
    userId: dbWorkers.map((w) => w.user.clerkId),
  })
  const clerkWorkersMap = new Map(clerkWorkers.map((cw) => [cw.id, cw]))
  const workers = dbWorkers.map((dbw) => {
    const clerkUser = clerkWorkersMap.get(dbw.user.clerkId)
    return {
      ...dbw,
      firstName: clerkUser?.firstName,
      lastName: clerkUser?.lastName,
      image: clerkUser?.imageUrl,
    }
  })

  return NextResponse.json({
    status: 200,
    message: 'Workers retrieved',
    data: {
      workers,
    },
  })
}
