import { EntityCommon } from './shared'

export interface Worker extends EntityCommon {
  id: string
  firstName: string
  lastName: string
  image?: string
  occupation: string
  userId: string
  user: {
    clerkId: string
  }
}

interface WorkerFilters {
  search?: string | null
}

export interface GetManyWorkersParams {
  filters?: WorkerFilters
}
