import { Role } from '@prisma/client'

export interface MyUserCreationBody {
  role: Role
  occupation: string
}
