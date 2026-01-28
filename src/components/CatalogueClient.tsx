'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import ProductCard from './ProductCard'

interface Category {
	id: number
	name: string
	_count?: { products?: number }
}

interface Product {
	id: number
	name: string
	slug: string
	vendorCode: string
	retailPrice: number
	basePrice: number
	images: Array<{ url: string; alt?: string }>
}

export default function CatalogueClient({
	initialProducts,
	initialTotal,
	categories,
}: {
	initialProducts: Product[]
	initialTotal: number
	categories: Category[]
}) {
	const searchParams = useSearchParams()
	const searchQuery = searchParams.get('search')

	const [products, setProducts] = useState(initialProducts)
	const [total, setTotal] = useState(initialTotal)
	const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
	const [sortBy, setSortBy] = useState<string>('default')
	const [loading, setLoading] = useState(false)
	const [page, setPage] = useState(1)
	const [hasMore, setHasMore] = useState(initialProducts.length < initialTotal)

	useEffect(() => {
		if (searchQuery) {
			resetAndFetch(null, searchQuery, sortBy)
		}
	}, [searchQuery])

	// Infinite scroll observer
	useEffect(() => {
		const observer = new IntersectionObserver(
			entries => {
				if (entries[0].isIntersecting && hasMore && !loading) {
					loadMore()
				}
			},
			{ threshold: 0.1 },
		)

		const sentinel = document.getElementById('scroll-sentinel')
		if (sentinel) {
			observer.observe(sentinel)
		}

		return () => {
			if (sentinel) {
				observer.unobserve(sentinel)
			}
		}
	}, [hasMore, loading, page, selectedCategory, searchQuery, sortBy])

	const resetAndFetch = async (
		categoryId: number | null,
		search?: string,
		sort?: string,
	) => {
		setPage(1)
		setProducts([])
		await fetchProducts(categoryId, search, sort, 1, true)
	}

	const loadMore = async () => {
		const nextPage = page + 1
		setPage(nextPage)
		await fetchProducts(
			selectedCategory,
			searchQuery || undefined,
			sortBy,
			nextPage,
			false,
		)
	}

	const fetchProducts = async (
		categoryId: number | null,
		search?: string,
		sort?: string,
		pageNum: number = 1,
		reset: boolean = false,
	) => {
		setLoading(true)
		console.log('[CatalogueClient] Fetching:', {
			categoryId,
			search,
			sort,
			pageNum,
		})

		try {
			const perPage = 30
			let url = `http://localhost:3001/products?take=${perPage}&page=${pageNum}`
			if (categoryId) url += `&categoryId=${categoryId}`
			if (search) url += `&search=${encodeURIComponent(search)}`

			if (sort && sort !== 'default') {
				switch (sort) {
					case 'price-asc':
						url += '&sortBy=price&sortOrder=asc'
						break
					case 'price-desc':
						url += '&sortBy=price&sortOrder=desc'
						break
					case 'name':
						url += '&sortBy=name&sortOrder=asc'
						break
					case 'popular':
						url += '&sortBy=popular'
						break
				}
			}

			const res = await fetch(url, { cache: 'no-store' })
			if (res.ok) {
				const data = await res.json()
				console.log(
					'[CatalogueClient] Received:',
					data.products.length,
					'total:',
					data.total,
				)

				if (reset) {
					setProducts(data.products)
					setHasMore(
						data.products.length === perPage &&
							data.products.length < data.total,
					)
				} else {
					setProducts(prev => {
						const newProducts = [...prev, ...data.products]
						setHasMore(
							data.products.length === perPage &&
								newProducts.length < data.total,
						)
						return newProducts
					})
				}

				setTotal(data.total)
			}
		} catch (error) {
			console.error('[CatalogueClient] Error:', error)
		} finally {
			setLoading(false)
		}
	}

	const handleCategoryClick = (categoryId: number | null) => {
		setSelectedCategory(categoryId)
		resetAndFetch(categoryId, undefined, sortBy)
	}

	const handleSortChange = (newSort: string) => {
		setSortBy(newSort)
		resetAndFetch(selectedCategory, searchQuery || undefined, newSort)
	}

	return (
		<div className='flex gap-6'>
			{/* Sidebar */}
			<aside className='w-72 flex-shrink-0'>
				<div className='bg-white rounded-2xl p-6 sticky top-20 shadow-lg shadow-gray-200/50'>
					<h3 className='font-bold mb-5 text-lg text-gray-900'>Категории</h3>
					<ul className='space-y-1'>
						<li
							onClick={() => handleCategoryClick(null)}
							className={`flex items-center justify-between gap-3 p-3 cursor-pointer rounded-xl transition-colors group ${
								selectedCategory === null
									? 'bg-gray-900 text-white'
									: 'hover:bg-gray-50'
							}`}
						>
							<div className='flex items-center gap-3 flex-1'>
								<svg
									className={`w-4 h-4 flex-shrink-0 ${
										selectedCategory === null
											? 'text-white'
											: 'text-gray-400 group-hover:text-gray-600'
									}`}
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M4 6h16M4 12h16M4 18h16'
									/>
								</svg>
								<span
									className={`text-sm font-medium line-clamp-2 ${
										selectedCategory === null
											? 'text-white'
											: 'text-gray-700 group-hover:text-gray-900'
									}`}
								>
									Все товары
								</span>
							</div>
							<span
								className={`text-xs font-medium flex-shrink-0 ${
									selectedCategory === null ? 'text-white' : 'text-gray-400'
								}`}
							>
								{initialTotal}
							</span>
						</li>
						{categories.slice(0, 15).map(cat => (
							<li
								key={cat.id}
								onClick={() => handleCategoryClick(cat.id)}
								className={`flex items-center justify-between gap-3 p-3 cursor-pointer rounded-xl transition-colors group ${
									selectedCategory === cat.id
										? 'bg-gray-900 text-white'
										: 'hover:bg-gray-50'
								}`}
							>
								<div className='flex items-center gap-3 flex-1'>
									<svg
										className={`w-4 h-4 flex-shrink-0 ${
											selectedCategory === cat.id
												? 'text-white'
												: 'text-gray-400 group-hover:text-gray-600'
										}`}
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
									<span
										className={`text-sm font-medium line-clamp-2 ${
											selectedCategory === cat.id
												? 'text-white'
												: 'text-gray-700 group-hover:text-gray-900'
										}`}
									>
										{cat.name}
									</span>
								</div>
								{cat._count?.products && (
									<span
										className={`text-xs font-medium flex-shrink-0 ${
											selectedCategory === cat.id
												? 'text-white'
												: 'text-gray-400'
										}`}
									>
										{cat._count.products}
									</span>
								)}
							</li>
						))}
					</ul>
				</div>
			</aside>

			{/* Products */}
			<div className='flex-1'>
				<div className='flex justify-between items-center mb-6'>
					<p className='text-gray-600 font-medium'>
						{loading && products.length === 0
							? 'Загрузка...'
							: searchQuery
								? `Результаты поиска "${searchQuery}": ${total} товаров`
								: `Найдено ${total} товаров`}
					</p>
					<div className='flex gap-3 items-center'>
						<select
							value={sortBy}
							onChange={e => handleSortChange(e.target.value)}
							className='px-5 py-3 border border-gray-200 rounded-2xl bg-white text-sm font-medium hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all shadow-sm'
						>
							<option value='default'>Рекомендуем</option>
							<option value='price-asc'>Сначала дешевые</option>
							<option value='price-desc'>Сначала дорогие</option>
							<option value='popular'>По популярности</option>
							<option value='name'>По названию</option>
						</select>
						<button className='p-3 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all shadow-sm'>
							<svg
								className='w-5 h-5 text-gray-600'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M4 6h16M4 12h16M4 18h16'
								/>
							</svg>
						</button>
						<button className='p-3 border border-gray-200 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-all shadow-sm'>
							<svg
								className='w-5 h-5 text-gray-700'
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
						</button>
					</div>
				</div>

				{loading && products.length === 0 ? (
					<div className='flex items-center justify-center py-20'>
						<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900'></div>
					</div>
				) : (
					<>
						<div className='grid md:grid-cols-3 gap-5'>
							{products.map((product: any) => (
								<ProductCard key={product.id} product={product} />
							))}
						</div>

						{/* Sentinel для infinite scroll */}
						{hasMore && (
							<div id='scroll-sentinel' className='py-8 flex justify-center'>
								{loading ? (
									<div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900'></div>
								) : (
									<div className='text-gray-400 text-sm'>
										Прокрутите для загрузки еще
									</div>
								)}
							</div>
						)}

						{!hasMore && products.length > 0 && (
							<div className='text-center py-8 text-gray-500'>
								<p className='text-sm'>Все товары загружены</p>
							</div>
						)}

						{products.length === 0 && !loading && (
							<div className='text-center py-20 text-gray-500 bg-white rounded-3xl shadow-lg shadow-gray-200/50'>
								<svg
									className='w-20 h-20 mx-auto mb-5 text-gray-300'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={1.5}
										d='M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4'
									/>
								</svg>
								<p className='font-semibold text-lg text-gray-700'>
									Товары не найдены
								</p>
								<p className='text-sm text-gray-500 mt-2'>
									Попробуйте выбрать другую категорию
								</p>
							</div>
						)}
					</>
				)}
			</div>
		</div>
	)
}
