'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function AdminProductsPage() {
	const [products, setProducts] = useState([])

	useEffect(() => {
		fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`)
			.then(res => res.json())
			.then(data => setProducts(data.products || []))
	}, [])

	return (
		<div>
			<div className='flex justify-between items-center mb-6'>
				<h1 className='text-3xl font-bold'>Товары</h1>
				<Link
					href='/admin/products/new'
					className='bg-gray-900 text-white px-6 py-3 rounded-2xl hover:bg-gray-800 font-semibold shadow-lg shadow-gray-900/20 transition-all flex items-center gap-2'
				>
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
							d='M12 4v16m8-8H4'
						/>
					</svg>
					Добавить товар
				</Link>
			</div>

			<div className='bg-white rounded-2xl shadow-lg shadow-gray-200/50 overflow-hidden'>
				<table className='w-full'>
					<thead className='bg-gray-50'>
						<tr>
							<th className='px-6 py-4 text-left font-semibold text-gray-700'>
								Артикул
							</th>
							<th className='px-6 py-4 text-left font-semibold text-gray-700'>
								Название
							</th>
							<th className='px-6 py-4 text-left font-semibold text-gray-700'>
								Цена
							</th>
							<th className='px-6 py-4 text-left font-semibold text-gray-700'>
								Действия
							</th>
						</tr>
					</thead>
					<tbody>
						{products.map((product: any) => (
							<tr key={product.id} className='border-t hover:bg-gray-50'>
								<td className='px-6 py-4 font-mono text-sm'>
									{product.vendorCode}
								</td>
								<td className='px-6 py-4'>{product.name}</td>
								<td className='px-6 py-4 font-semibold'>
									{parseFloat(product.retailPrice).toLocaleString('ru-RU')} ₽
								</td>
								<td className='px-6 py-4'>
									<Link
										href={`/admin/products/${product.id}`}
										className='text-blue-600 hover:text-blue-800 font-medium transition-colors'
									>
										Редактировать
									</Link>
								</td>
							</tr>
						))}
					</tbody>
				</table>

				{products.length === 0 && (
					<div className='text-center py-12 text-gray-500'>
						Товаров пока нет
					</div>
				)}
			</div>
		</div>
	)
}
