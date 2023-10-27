import { authMiddleware, redirectToSignIn } from '@clerk/nextjs'

export default authMiddleware({
  publicRoutes: ['/'],
  afterAuth(auth, req) {
    const { origin, pathname } = req.nextUrl
    const returnBackUrl = origin + '/new-user?redirectTo=' + pathname

    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({
        returnBackUrl,
      })
    }
  },
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
