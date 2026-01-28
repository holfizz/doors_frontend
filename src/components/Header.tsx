import Image from 'next/image'
import Link from 'next/link'
import CartIcon from './CartIcon'

export default function Header() {
	return (
		<header className='border-b border-gray-200 sticky top-0 bg-white/95 backdrop-blur-sm z-50 shadow-lg shadow-gray-200/50'>
			<div className='container mx-auto px-4 py-4'>
				<div className='flex items-center justify-between gap-8'>
					<Link
						href='/'
						className='flex items-center gap-3 hover:opacity-80 transition-opacity'
					>
						<Image
							src='/logo.png'
							alt='Логотип'
							width={120}
							height={40}
							className='h-10 w-auto'
							priority
						/>
					</Link>

					<div className='flex-1 max-w-2xl'>
						<div className='relative'>
							<input
								type='text'
								placeholder='Поиск товаров...'
								className='w-full px-5 py-3.5 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-gray-400 transition-all text-sm bg-gray-50 focus:bg-white'
							/>
							<button className='absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-gray-900 rounded-xl hover:bg-gray-800 transition-colors shadow-lg shadow-gray-900/20'>
								<svg
									className='w-5 h-5 text-white'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
									/>
								</svg>
							</button>
						</div>
					</div>

					<nav className='flex gap-8 items-center'>
						<Link
							href='/catalogue'
							className='hover:text-gray-600 text-sm font-semibold transition-colors'
						>
							Каталог
						</Link>
						<Link
							href='/about'
							className='hover:text-gray-600 text-sm font-semibold transition-colors'
						>
							О компании
						</Link>
						<Link
							href='/contacts'
							className='hover:text-gray-600 text-sm font-semibold transition-colors'
						>
							Контакты
						</Link>
					</nav>

					<div className='flex gap-2 items-center'>
						<button className='p-3 hover:bg-gray-100 rounded-2xl transition-colors'>
							<svg
								className='w-6 h-6 text-gray-600'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
								/>
							</svg>
						</button>
						<button className='p-3 hover:bg-gray-100 rounded-2xl transition-colors'>
							<svg
								className='w-6 h-6 text-gray-600'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z'
								/>
							</svg>
						</button>
						<CartIcon />
					</div>
				</div>
			</div>
		</header>
	)
}
