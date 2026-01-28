'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const router = useRouter()
	const pathname = usePathname()

	const handleLogout = () => {
		localStorage.removeItem('token')
		document.cookie = 'auth_token=; path=/; max-age=0'
		router.push('/admin/login')
	}

	const isActive = (path: string) => {
		if (path === '/admin') {
			return pathname === '/admin'
		}
		return pathname.startsWith(path)
	}

	return (
		<div className='flex min-h-screen'>
			<aside className='w-64 bg-gray-900 text-white p-6 flex flex-col'>
				<div className='mb-8'>
					<h2 className='text-2xl font-bold flex items-center gap-2'>
						<div className='w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center'>
							<svg
								className='w-5 h-5 text-white'
								fill='currentColor'
								viewBox='0 0 20 20'
							>
								<path d='M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z' />
							</svg>
						</div>
						Админка
					</h2>
				</div>

				<nav className='space-y-1 flex-1'>
					<Link
						href='/admin'
						className={`block py-3 px-4 rounded-xl transition-colors ${
							isActive('/admin') && pathname === '/admin'
								? 'bg-yellow-400 text-gray-900 font-semibold'
								: 'hover:bg-gray-800'
						}`}
					>
						<div className='flex items-center gap-3'>
							<svg
								className='w-5 h-5'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
								/>
							</svg>
							Главная
						</div>
					</Link>
					<Link
						href='/admin/products'
						className={`block py-3 px-4 rounded-xl transition-colors ${
							isActive('/admin/products')
								? 'bg-yellow-400 text-gray-900 font-semibold'
								: 'hover:bg-gray-800'
						}`}
					>
						<div className='flex items-center gap-3'>
							<svg
								className='w-5 h-5'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4'
								/>
							</svg>
							Товары
						</div>
					</Link>
					<Link
						href='/admin/categories'
						className={`block py-3 px-4 rounded-xl transition-colors ${
							isActive('/admin/categories')
								? 'bg-yellow-400 text-gray-900 font-semibold'
								: 'hover:bg-gray-800'
						}`}
					>
						<div className='flex items-center gap-3'>
							<svg
								className='w-5 h-5'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z'
								/>
							</svg>
							Категории
						</div>
					</Link>
					<Link
						href='/admin/orders'
						className={`block py-3 px-4 rounded-xl transition-colors ${
							isActive('/admin/orders')
								? 'bg-yellow-400 text-gray-900 font-semibold'
								: 'hover:bg-gray-800'
						}`}
					>
						<div className='flex items-center gap-3'>
							<svg
								className='w-5 h-5'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
								/>
							</svg>
							Заказы
						</div>
					</Link>
					<Link
						href='/admin/import'
						className={`block py-3 px-4 rounded-xl transition-colors ${
							isActive('/admin/import')
								? 'bg-yellow-400 text-gray-900 font-semibold'
								: 'hover:bg-gray-800'
						}`}
					>
						<div className='flex items-center gap-3'>
							<svg
								className='w-5 h-5'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
								/>
							</svg>
							Импорт
						</div>
					</Link>
				</nav>

				<div className='border-t border-gray-800 pt-4 mt-4'>
					<Link
						href='/'
						className='block py-3 px-4 rounded-xl hover:bg-gray-800 transition-colors mb-2'
					>
						<div className='flex items-center gap-3'>
							<svg
								className='w-5 h-5'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
								/>
							</svg>
							На сайт
						</div>
					</Link>
					<button
						onClick={handleLogout}
						className='w-full py-3 px-4 rounded-xl hover:bg-red-600 transition-colors text-left'
					>
						<div className='flex items-center gap-3'>
							<svg
								className='w-5 h-5'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
								/>
							</svg>
							Выйти
						</div>
					</button>
				</div>
			</aside>
			<main className='flex-1 p-8 bg-gray-50'>{children}</main>
		</div>
	)
}
