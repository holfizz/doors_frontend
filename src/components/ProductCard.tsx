'use client'

import { useFavorites } from '@/store/favorites'
import Link from 'next/link'

interface Product {
	id: number
	name: string
	slug: string
	vendorCode: string
	retailPrice: number
	basePrice: number
	images: Array<{ url: string; alt?: string }>
}

export default function ProductCard({ product }: { product: Product }) {
	const imageUrl = product.images[0]?.url || null
	const hasDiscount = product.basePrice > product.retailPrice
	const discount = hasDiscount
		? Math.round(
				((product.basePrice - product.retailPrice) / product.basePrice) * 100,
			)
		: 0

	const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites()
	const favorite = isFavorite(product.id)

	const toggleFavorite = (e: React.MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()
		if (favorite) {
			removeFromFavorites(product.id)
		} else {
			addToFavorites(product.id)
		}
	}

	// Логирование для отладки
	if (typeof window !== 'undefined') {
		console.log('[ProductCard] Rendering product:', {
			name: product.name,
			imageUrl,
			imagesCount: product.images?.length || 0,
		})
	}

	return (
		<div className='group relative bg-white rounded-3xl overflow-hidden shadow-lg shadow-gray-200/50 hover:shadow-2xl hover:shadow-gray-300/50 transition-all duration-500 hover:scale-105'>
			<Link href={`/catalogue/${product.slug}`}>
				{/* Изображение */}
				<div className='relative h-72 bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden'>
					{imageUrl ? (
						<img
							src={imageUrl}
							alt={product.name}
							className='w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-700'
							loading='lazy'
							onError={e => {
								const target = e.target as HTMLImageElement
								target.style.display = 'none'
								const parent = target.parentElement
								if (parent) {
									parent.innerHTML = `
										<div class="w-full h-full flex items-center justify-center text-gray-300">
											<svg class="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
											</svg>
										</div>
									`
								}
							}}
						/>
					) : (
						<div className='w-full h-full flex items-center justify-center text-gray-300'>
							<svg
								className='w-24 h-24'
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
					{hasDiscount && (
						<div className='absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-lg shadow-red-500/30'>
							{discount}%
						</div>
					)}
				</div>

				{/* Информация */}
				<div className='p-6'>
					<p className='text-xs text-gray-400 mb-2 font-medium'>
						Арт. {product.vendorCode}
					</p>
					<h3 className='text-sm mb-4 line-clamp-2 min-h-[40px] leading-snug text-gray-800 font-medium'>
						{product.name}
					</h3>

					{/* Рейтинг */}
					<div className='flex items-center gap-1 mb-4'>
						{[1, 2, 3, 4].map(star => (
							<svg
								key={star}
								className='w-4 h-4 fill-yellow-400'
								viewBox='0 0 20 20'
							>
								<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
							</svg>
						))}
						<svg className='w-4 h-4 fill-gray-300' viewBox='0 0 20 20'>
							<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
						</svg>
						<span className='text-xs text-gray-500 ml-1 font-medium'>(12)</span>
					</div>

					{/* Цена */}
					<div className='mb-5'>
						{hasDiscount && (
							<p className='text-sm text-gray-400 line-through mb-1'>
								{parseFloat(String(product.basePrice)).toLocaleString('ru-RU')}{' '}
								₽
							</p>
						)}
						<p className='text-2xl font-bold text-gray-900'>
							{parseFloat(String(product.retailPrice)).toLocaleString('ru-RU')}{' '}
							<span className='text-sm font-normal text-gray-500'>₽</span>
						</p>
					</div>
				</div>
			</Link>

			{/* Кнопки */}
			<div className='px-6 pb-6 flex gap-3'>
				<button className='flex-1 bg-gray-900 text-white py-3.5 rounded-2xl hover:bg-gray-800 transition-all font-medium text-sm shadow-lg shadow-gray-900/20 hover:shadow-xl hover:shadow-gray-900/30'>
					В корзину
				</button>
				<button
					onClick={toggleFavorite}
					className={`w-14 h-14 border-2 rounded-2xl flex items-center justify-center transition-all ${
						favorite
							? 'bg-red-50 border-red-500 text-red-500'
							: 'border-gray-200 hover:bg-gray-50 hover:border-gray-300'
					}`}
					title={favorite ? 'Удалить из избранного' : 'Добавить в избранное'}
				>
					<svg
						className={`w-5 h-5 ${favorite ? 'fill-current' : ''}`}
						fill={favorite ? 'currentColor' : 'none'}
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
			</div>
		</div>
	)
}
