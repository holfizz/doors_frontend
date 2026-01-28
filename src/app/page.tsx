import Link from 'next/link'

export const dynamic = 'force-dynamic'

async function getCategories() {
	console.log('[Home] Fetching categories from API...')
	try {
		const res = await fetch('http://localhost:3001/categories', {
			cache: 'no-store',
		})
		console.log('[Home] Categories response status:', res.status)
		if (!res.ok) return []
		const data = await res.json()
		console.log('[Home] Received categories:', data.length)
		return data
	} catch (error) {
		console.error('[Home] Error fetching categories:', error)
		return []
	}
}

async function getFeaturedProducts() {
	console.log('[Home] Fetching featured products from API...')
	try {
		const res = await fetch('http://localhost:3001/products?take=6', {
			cache: 'no-store',
		})
		console.log('[Home] Products response status:', res.status)
		if (!res.ok) return { products: [] }
		const data = await res.json()
		console.log('[Home] Received products:', data.products?.length || 0)
		if (data.products?.[0]) {
			console.log(
				'[Home] First product image URL:',
				data.products[0].images?.[0]?.url,
			)
		}
		return data
	} catch (error) {
		console.error('[Home] Error fetching products:', error)
		return { products: [] }
	}
}

export default async function Home() {
	const categories = await getCategories()
	const { products } = await getFeaturedProducts()

	console.log('[Home Page] Rendering with:', {
		categoriesCount: categories.length,
		productsCount: products.length,
	})

	const categoryIcons: any = {
		'Погонаж, фурнитура': (
			<svg
				className='w-12 h-12'
				fill='none'
				stroke='currentColor'
				viewBox='0 0 24 24'
			>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth={1.5}
					d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
				/>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth={1.5}
					d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
				/>
			</svg>
		),
		default: (
			<svg
				className='w-12 h-12'
				fill='none'
				stroke='currentColor'
				viewBox='0 0 24 24'
			>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth={1.5}
					d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
				/>
			</svg>
		),
	}

	return (
		<div className='bg-gradient-to-b from-white via-gray-50 to-white'>
			{/* Hero */}
			<section className='container mx-auto px-4 py-20'>
				<div className='max-w-4xl mx-auto text-center'>
					<h1 className='text-6xl font-bold mb-6 text-gray-900 leading-tight'>
						Двери по низким ценам
					</h1>
					<p className='text-xl text-gray-600 mb-10 leading-relaxed'>
						Широкий выбор межкомнатных и входных дверей
						<br />
						Быстрая доставка и профессиональный монтаж
					</p>
					<Link
						href='/catalogue'
						className='inline-flex items-center gap-3 bg-gray-900 text-white px-10 py-4 rounded-2xl hover:bg-gray-800 transition-all shadow-lg shadow-gray-900/20 hover:shadow-xl hover:shadow-gray-900/30 font-medium text-lg'
					>
						Перейти в каталог
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
								d='M9 5l7 7-7 7'
							/>
						</svg>
					</Link>
				</div>
			</section>

			{/* Категории */}
			<section className='container mx-auto px-4 py-16'>
				<h2 className='text-3xl font-bold mb-10 text-center text-gray-900'>
					Категории товаров
				</h2>
				<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
					{categories.slice(0, 8).map((cat: any) => (
						<Link
							key={cat.id}
							href={`/catalogue?category=${cat.id}`}
							className='group bg-white p-8 rounded-3xl text-center transition-all hover:scale-105 shadow-lg shadow-gray-200/50 hover:shadow-xl hover:shadow-gray-300/50'
						>
							<div className='w-16 h-16 mx-auto mb-4 flex items-center justify-center text-gray-600 group-hover:text-gray-900 transition-colors'>
								{categoryIcons[cat.name] || categoryIcons.default}
							</div>
							<h3 className='font-semibold text-sm text-gray-700 group-hover:text-gray-900 transition-colors leading-snug'>
								{cat.name}
							</h3>
							{cat._count?.products > 0 && (
								<p className='text-xs text-gray-400 mt-2'>
									{cat._count.products} товаров
								</p>
							)}
						</Link>
					))}
				</div>
			</section>

			{/* Популярные товары */}
			{products.length > 0 && (
				<section className='container mx-auto px-4 py-16'>
					<div className='flex justify-between items-center mb-10'>
						<h2 className='text-3xl font-bold text-gray-900'>
							Популярные товары
						</h2>
						<Link
							href='/catalogue'
							className='text-gray-600 hover:text-gray-900 font-medium flex items-center gap-2 transition-colors'
						>
							Смотреть все
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
									d='M9 5l7 7-7 7'
								/>
							</svg>
						</Link>
					</div>
					<div className='grid md:grid-cols-3 gap-6'>
						{products.slice(0, 6).map((product: any) => (
							<Link
								key={product.id}
								href={`/catalogue/${product.slug}`}
								className='group bg-white rounded-3xl overflow-hidden shadow-lg shadow-gray-200/50 hover:shadow-xl hover:shadow-gray-300/50 transition-all hover:scale-105'
							>
								<div className='relative h-64 bg-gradient-to-br from-gray-50 to-white overflow-hidden'>
									{product.images?.[0]?.url ? (
										<img
											src={product.images[0].url}
											alt={product.name}
											className='w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-500'
											loading='lazy'
										/>
									) : (
										<div className='w-full h-full flex items-center justify-center text-gray-300'>
											<svg
												className='w-20 h-20'
												fill='none'
												stroke='currentColor'
												viewBox='0 0 24 24'
											>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth={1}
													d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
												/>
											</svg>
										</div>
									)}
								</div>
								<div className='p-6'>
									<p className='text-xs text-gray-400 mb-2'>
										Арт. {product.vendorCode}
									</p>
									<h3 className='text-sm font-medium mb-3 line-clamp-2 text-gray-800 leading-snug'>
										{product.name}
									</h3>
									<p className='text-2xl font-bold text-gray-900'>
										{parseFloat(product.retailPrice).toLocaleString('ru-RU')} ₽
									</p>
								</div>
							</Link>
						))}
					</div>
				</section>
			)}

			{/* Преимущества */}
			<section className='container mx-auto px-4 py-16'>
				<div className='grid md:grid-cols-3 gap-8'>
					<div className='bg-white p-10 rounded-3xl text-center shadow-lg shadow-gray-200/50'>
						<div className='w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl flex items-center justify-center'>
							<svg
								className='w-8 h-8 text-gray-700'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={1.5}
									d='M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4'
								/>
							</svg>
						</div>
						<h3 className='text-xl font-bold mb-3 text-gray-900'>
							Большой выбор
						</h3>
						<p className='text-gray-600 leading-relaxed'>
							Более{' '}
							{categories.reduce(
								(sum: number, cat: any) => sum + (cat._count?.products || 0),
								0,
							)}{' '}
							товаров в наличии
						</p>
					</div>
					<div className='bg-white p-10 rounded-3xl text-center shadow-lg shadow-gray-200/50'>
						<div className='w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl flex items-center justify-center'>
							<svg
								className='w-8 h-8 text-gray-700'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={1.5}
									d='M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0'
								/>
							</svg>
						</div>
						<h3 className='text-xl font-bold mb-3 text-gray-900'>
							Быстрая доставка
						</h3>
						<p className='text-gray-600 leading-relaxed'>
							Доставка по всей России в кратчайшие сроки
						</p>
					</div>
					<div className='bg-white p-10 rounded-3xl text-center shadow-lg shadow-gray-200/50'>
						<div className='w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl flex items-center justify-center'>
							<svg
								className='w-8 h-8 text-gray-700'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={1.5}
									d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
								/>
							</svg>
						</div>
						<h3 className='text-xl font-bold mb-3 text-gray-900'>
							Гарантия качества
						</h3>
						<p className='text-gray-600 leading-relaxed'>
							Официальная гарантия до 2 лет на все товары
						</p>
					</div>
				</div>
			</section>
		</div>
	)
}
