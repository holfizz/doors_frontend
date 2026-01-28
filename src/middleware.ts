import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
	// Проверяем только админские роуты
	if (request.nextUrl.pathname.startsWith('/admin')) {
		// Разрешаем доступ к странице логина
		if (request.nextUrl.pathname === '/admin/login') {
			return NextResponse.next()
		}

		// Проверяем наличие токена в cookies
		const token = request.cookies.get('auth_token')?.value

		if (!token) {
			// Редирект на страницу логина
			return NextResponse.redirect(new URL('/admin/login', request.url))
		}
	}

	return NextResponse.next()
}

export const config = {
	matcher: '/admin/:path*',
}
