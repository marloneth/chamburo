import { prisma } from '@/utils/db'
import { clerkClient } from '@clerk/nextjs'
import { GetManyWorkersParams, Worker } from '@/types/worker'

export async function getWorkers({
  filters,
}: GetManyWorkersParams = {}): Promise<Worker[]> {
  let whereClause
  const search = filters?.search

  if (search) {
    whereClause = {
      occupation: {
        contains: search,
      },
    }
  }

  const dbWorkers = await prisma.worker.findMany({
    include: {
      user: {
        select: {
          clerkId: true,
        },
      },
    },
    where: whereClause,
  })

  const clerkWorkers = await clerkClient.users.getUserList({
    userId: dbWorkers.map((w) => w.user.clerkId),
  })

  const clerkWorkersMap = new Map(clerkWorkers.map((cw) => [cw.id, cw]))
  const workers = dbWorkers.map((dbw) => {
    const clerkUser = clerkWorkersMap.get(dbw.user.clerkId)
    return {
      ...dbw,
      firstName: clerkUser?.firstName || '',
      lastName: clerkUser?.lastName || '',
      image: clerkUser?.imageUrl,
    }
  })

  return workers
}
