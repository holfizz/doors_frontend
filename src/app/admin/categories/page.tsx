'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function AdminCategoriesPage() {
	const [categories, setCategories] = useState([])

	useEffect(() => {
		loadCategories()
	}, [])

	const loadCategories = () => {
		fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`)
			.then(res => res.json())
			.then(data => setCategories(data))
	}

	return (
		<div>
			<div className='flex justify-between items-center mb-6'>
				<h1 className='text-3xl font-bold'>Категории</h1>
				<Link
					href='/admin/categories/new'
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
					Добавить категорию
				</Link>
			</div>

			<div className='bg-white rounded-2xl shadow-lg shadow-gray-200/50 overflow-hidden'>
				<table className='w-full'>
					<thead className='bg-gray-50'>
						<tr>
							<th className='px-6 py-4 text-left font-semibold text-gray-700'>
								ID
							</th>
							<th className='px-6 py-4 text-left font-semibold text-gray-700'>
								Название
							</th>
							<th className='px-6 py-4 text-left font-semibold text-gray-700'>
								Slug
							</th>
							<th className='px-6 py-4 text-left font-semibold text-gray-700'>
								Товаров
							</th>
						</tr>
					</thead>
					<tbody>
						{categories.map((cat: any) => (
							<tr key={cat.id} className='border-t hover:bg-gray-50'>
								<td className='px-6 py-4 font-mono text-sm'>{cat.id}</td>
								<td className='px-6 py-4 font-medium'>{cat.name}</td>
								<td className='px-6 py-4 text-gray-600 text-sm'>{cat.slug}</td>
								<td className='px-6 py-4'>
									<span className='inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700'>
										{cat._count?.products || 0}
									</span>
								</td>
							</tr>
						))}
					</tbody>
				</table>

				{categories.length === 0 && (
					<div className='text-center py-12 text-gray-500'>
						Категорий пока нет
					</div>
				)}
			</div>
		</div>
	)
}
