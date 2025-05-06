import { NextResponse } from 'next/server'
import { getToken, getUserDetails } from './utils/securityUtils'
import { HeaderValues } from './constants'

const NO_AUTH_ROUTES = [
  '/login',
  '/reset-password',
  '/user/register',
  '/user/password',
]

export async function middleware(request) {
  const isNextResource = request.url.includes('_next')
  const isFavicon = request.url.includes('/favicon.ico')
  const isSitemap = request.url.includes('/sitemap.xml')
  const isRobots = request.url.includes('/robots.txt')
  const isNoAuth = !!NO_AUTH_ROUTES.filter(route => request.url.includes(route))?.length > 0
  const isRsc = !!request.headers.get('next-action')
  const shouldSkip = isNoAuth || isNextResource || isSitemap || isRobots || isFavicon || isRsc
  if (shouldSkip) { return }


  const { origin } = request.nextUrl
  const userDetails = await getUserDetails()

  if (userDetails.status != 200 || !userDetails?.email) {
    console.error('No details.')
    return NextResponse.redirect(`${origin}/login`)
  }

  const nextHeaders = new Headers()
  nextHeaders.append(HeaderValues.EMAIL, userDetails?.email)
  nextHeaders.append(HeaderValues.TOKEN, getToken())

  return NextResponse.next({
    request: {
      headers: nextHeaders
    }
  })

}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    '/((?!login|reset-password).*)',
  ],
}