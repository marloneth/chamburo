import { authMiddleware, redirectToSignIn } from '@clerk/nextjs'
import { i18n } from './i18n.config'
import { NextRequest, NextResponse } from 'next/server'
import Negotiator from 'negotiator'
import { match as matchLocale } from '@formatjs/intl-localematcher'

function getLocale(request: NextRequest) {
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages()

  const locale = matchLocale(languages, locales, i18n.defaultLocale)
  return locale
}

function generateLocaleWithPathname(locale: string, pathname: string) {
  return `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`
}

export default authMiddleware({
  publicRoutes: ['/', ...i18n.locales.map((locale) => '/' + locale)],
  afterAuth(auth, req) {
    let returnBackUrl
    const { origin, pathname } = req.nextUrl
    const [_, firstSegment] = pathname.split('/')
    const langSegmentExists = i18n.locales.some(
      (local) => local === firstSegment
    )

    if (!langSegmentExists) {
      const locale = getLocale(req)
      return NextResponse.redirect(
        new URL(generateLocaleWithPathname(locale, pathname), req.url)
      )
    }

    if (!auth.userId && !auth.isPublicRoute) {
      returnBackUrl =
        origin +
        generateLocaleWithPathname(
          firstSegment,
          '/new-user?redirectTo=' + pathname
        )

      return redirectToSignIn({
        returnBackUrl,
      })
    }
  },
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
