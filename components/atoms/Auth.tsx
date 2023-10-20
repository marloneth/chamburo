'use server'

import { UserButton, currentUser } from '@clerk/nextjs'
import Link from 'next/link'

export default async function Auth() {
  const user = await currentUser()

  return user ? (
    <UserButton afterSignOutUrl="/" />
  ) : (
    <Link href="/sign-in" className="">
      Sign In
    </Link>
  )
}
