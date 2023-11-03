import { NextRequest, NextResponse } from 'next/server'
import createError from 'http-errors'
import { getTypedError } from '@/utils/error'
import { currentUser } from '@clerk/nextjs'
import { prisma } from '@/utils/db'
import { Role } from '@prisma/client'
import { MyUserCreationBody } from '@/types/user'

export async function POST(req: NextRequest) {
  try {
    let newUser
    let loggedUser
    let userExists
    const data = await req.json()
    const { role, occupation } = data as MyUserCreationBody

    loggedUser = (await currentUser())!
    userExists = !!(await prisma.user.findUnique({
      where: { clerkId: loggedUser.id },
    }))

    if (userExists) {
      throw createError.Conflict('Logged user is already registered')
    }

    newUser = await prisma.user.create({
      data: {
        clerkId: loggedUser.id,
        email: loggedUser.emailAddresses[0].emailAddress,
        role,
      },
    })

    if (role === Role.WORKER) {
      await prisma.worker.create({
        data: {
          userId: newUser.id,
          occupation,
        },
      })
    }

    return NextResponse.json(
      { status: 'OK', message: 'User created', data: {} },
      { status: 200 }
    )
  } catch (error) {
    const typedError = getTypedError(error)
    return NextResponse.json(
      { status: 'Error', message: typedError.message, data: {} },
      { status: typedError.status }
    )
  }
}
