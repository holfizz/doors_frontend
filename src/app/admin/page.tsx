'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function AdminPage() {
	const [stats, setStats] = useState({
		products: 0,
		orders: 0,
		categories: 0,
	})

	useEffect(() => {
		// Загрузка статистики
		Promise.all([
			fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?take=1`).then(res =>
				res.json(),
			),
			fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`).then(res =>
				res.json(),
			),
			fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`).then(res =>
				res.json(),
			),
		]).then(([productsData, ordersData, categoriesData]) => {
			setStats({
				products: productsData.total || 0,
				orders: Array.isArray(ordersData) ? ordersData.length : 0,
				categories: categoriesData.length || 0,
			})
		})
	}, [])

	return (
		<div>
			<h1 className='text-3xl font-bold mb-8'>Панель управления</h1>

			<div className='grid md:grid-cols-3 gap-6 mb-8'>
				<Link
					href='/admin/products'
					className='bg-white p-8 rounded-2xl shadow-lg shadow-gray-200/50 hover:shadow-xl hover:shadow-gray-300/50 transition-all hover:scale-105'
				>
					<div className='flex items-center justify-between mb-4'>
						<h3 className='text-lg font-semibold text-gray-700'>Товары</h3>
						<div className='w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center'>
							<svg
								className='w-6 h-6 text-blue-600'
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
						</div>
					</div>
					<p className='text-4xl font-bold text-gray-900'>
						{stats.products.toLocaleString('ru-RU')}
					</p>
					<p className='text-sm text-gray-500 mt-2'>Всего товаров в каталоге</p>
				</Link>

				<Link
					href='/admin/orders'
					className='bg-white p-8 rounded-2xl shadow-lg shadow-gray-200/50 hover:shadow-xl hover:shadow-gray-300/50 transition-all hover:scale-105'
				>
					<div className='flex items-center justify-between mb-4'>
						<h3 className='text-lg font-semibold text-gray-700'>Заказы</h3>
						<div className='w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center'>
							<svg
								className='w-6 h-6 text-green-600'
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
						</div>
					</div>
					<p className='text-4xl font-bold text-gray-900'>
						{stats.orders.toLocaleString('ru-RU')}
					</p>
					<p className='text-sm text-gray-500 mt-2'>Всего заказов</p>
				</Link>

				<Link
					href='/admin/categories'
					className='bg-white p-8 rounded-2xl shadow-lg shadow-gray-200/50 hover:shadow-xl hover:shadow-gray-300/50 transition-all hover:scale-105'
				>
					<div className='flex items-center justify-between mb-4'>
						<h3 className='text-lg font-semibold text-gray-700'>Категории</h3>
						<div className='w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center'>
							<svg
								className='w-6 h-6 text-purple-600'
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
						</div>
					</div>
					<p className='text-4xl font-bold text-gray-900'>
						{stats.categories.toLocaleString('ru-RU')}
					</p>
					<p className='text-sm text-gray-500 mt-2'>Всего категорий</p>
				</Link>
			</div>

			<div className='grid md:grid-cols-2 gap-6'>
				<div className='bg-white p-8 rounded-2xl shadow-lg shadow-gray-200/50'>
					<h3 className='text-xl font-bold mb-4'>Быстрые действия</h3>
					<div className='space-y-3'>
						<Link
							href='/admin/products/new'
							className='block p-4 border-2 border-gray-200 rounded-xl hover:border-yellow-400 hover:bg-yellow-50 transition-all'
						>
							<div className='flex items-center gap-3'>
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
										d='M12 4v16m8-8H4'
									/>
								</svg>
								<span className='font-medium'>Добавить товар</span>
							</div>
						</Link>
						<Link
							href='/admin/categories/new'
							className='block p-4 border-2 border-gray-200 rounded-xl hover:border-yellow-400 hover:bg-yellow-50 transition-all'
						>
							<div className='flex items-center gap-3'>
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
										d='M12 4v16m8-8H4'
									/>
								</svg>
								<span className='font-medium'>Добавить категорию</span>
							</div>
						</Link>
						<Link
							href='/admin/import'
							className='block p-4 border-2 border-gray-200 rounded-xl hover:border-yellow-400 hover:bg-yellow-50 transition-all'
						>
							<div className='flex items-center gap-3'>
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
										d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
									/>
								</svg>
								<span className='font-medium'>Импорт товаров</span>
							</div>
						</Link>
					</div>
				</div>

				<div className='bg-white p-8 rounded-2xl shadow-lg shadow-gray-200/50'>
					<h3 className='text-xl font-bold mb-4'>Информация</h3>
					<div className='space-y-4 text-sm text-gray-600'>
						<div className='flex items-start gap-3'>
							<svg
								className='w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5'
								fill='currentColor'
								viewBox='0 0 20 20'
							>
								<path
									fillRule='evenodd'
									d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
									clipRule='evenodd'
								/>
							</svg>
							<p>
								Используйте раздел "Импорт" для массовой загрузки товаров из XML
								файлов
							</p>
						</div>
						<div className='flex items-start gap-3'>
							<svg
								className='w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5'
								fill='currentColor'
								viewBox='0 0 20 20'
							>
								<path
									fillRule='evenodd'
									d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
									clipRule='evenodd'
								/>
							</svg>
							<p>
								На сайте отображаются только товары с изображениями для лучшего
								пользовательского опыта
							</p>
						</div>
						<div className='flex items-start gap-3'>
							<svg
								className='w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5'
								fill='currentColor'
								viewBox='0 0 20 20'
							>
								<path
									fillRule='evenodd'
									d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
									clipRule='evenodd'
								/>
							</svg>
							<p>Все изменения применяются мгновенно и отображаются на сайте</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
