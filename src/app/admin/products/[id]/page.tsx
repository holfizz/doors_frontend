'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function EditProductPage() {
	const router = useRouter()
	const params = useParams()
	const [categories, setCategories] = useState([])
	const [loading, setLoading] = useState(false)
	const [formData, setFormData] = useState({
		name: '',
		vendorCode: '',
		description: '',
		categoryId: '',
		basePrice: '',
		retailPrice: '',
		available: true,
	})

	useEffect(() => {
		// Загрузка категорий
		fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`)
			.then(res => res.json())
			.then(data => setCategories(data))

		// Загрузка товара
		fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${params.id}`)
			.then(res => res.json())
			.then(product => {
				setFormData({
					name: product.name,
					vendorCode: product.vendorCode,
					description: product.description || '',
					categoryId: product.categoryId.toString(),
					basePrice: product.basePrice.toString(),
					retailPrice: product.retailPrice.toString(),
					available: product.available,
				})
			})
	}, [params.id])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)

		try {
			const token = localStorage.getItem('token')
			const slug =
				formData.name
					.toLowerCase()
					.replace(/[^a-zа-яё0-9\s-]/g, '')
					.replace(/\s+/g, '-') +
				'-' +
				formData.vendorCode

			const productData = {
				name: formData.name,
				slug,
				description: formData.description || null,
				categoryId: parseInt(formData.categoryId),
				basePrice: parseFloat(formData.basePrice),
				retailPrice: parseFloat(formData.retailPrice),
				available: formData.available,
			}

			const res = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/products/${params.id}`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify(productData),
				},
			)

			if (!res.ok) throw new Error('Ошибка при обновлении товара')

			alert('Товар успешно обновлен!')
			router.push('/admin/products')
		} catch (error: any) {
			alert(error.message)
		} finally {
			setLoading(false)
		}
	}

	const handleDelete = async () => {
		if (!confirm('Вы уверены что хотите удалить этот товар?')) return

		try {
			const token = localStorage.getItem('token')
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/products/${params.id}`,
				{
					method: 'DELETE',
					headers: { Authorization: `Bearer ${token}` },
				},
			)

			if (!res.ok) throw new Error('Ошибка при удалении товара')

			alert('Товар удален!')
			router.push('/admin/products')
		} catch (error: any) {
			alert(error.message)
		}
	}

	return (
		<div>
			<div className='flex justify-between items-center mb-6'>
				<h1 className='text-3xl font-bold'>Редактировать товар</h1>
				<button
					onClick={() => router.back()}
					className='px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors'
				>
					← Назад
				</button>
			</div>

			<div className='bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-8'>
				<form onSubmit={handleSubmit} className='space-y-6'>
					<div className='grid md:grid-cols-2 gap-6'>
						<div>
							<label className='block mb-2 font-semibold text-gray-700'>
								Название товара *
							</label>
							<input
								type='text'
								required
								value={formData.name}
								onChange={e =>
									setFormData({ ...formData, name: e.target.value })
								}
								className='w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-400 transition-colors'
							/>
						</div>

						<div>
							<label className='block mb-2 font-semibold text-gray-700'>
								Артикул *
							</label>
							<input
								type='text'
								required
								disabled
								value={formData.vendorCode}
								className='w-full border-2 border-gray-200 rounded-xl px-4 py-3 bg-gray-50 text-gray-500'
							/>
							<p className='text-xs text-gray-500 mt-1'>
								Артикул нельзя изменить
							</p>
						</div>
					</div>

					<div>
						<label className='block mb-2 font-semibold text-gray-700'>
							Описание
						</label>
						<textarea
							value={formData.description}
							onChange={e =>
								setFormData({ ...formData, description: e.target.value })
							}
							rows={4}
							className='w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-400 transition-colors'
						/>
					</div>

					<div>
						<label className='block mb-2 font-semibold text-gray-700'>
							Категория *
						</label>
						<select
							required
							value={formData.categoryId}
							onChange={e =>
								setFormData({ ...formData, categoryId: e.target.value })
							}
							className='w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-400 transition-colors'
						>
							<option value=''>Выберите категорию</option>
							{categories.map((cat: any) => (
								<option key={cat.id} value={cat.id}>
									{cat.name}
								</option>
							))}
						</select>
					</div>

					<div className='grid md:grid-cols-2 gap-6'>
						<div>
							<label className='block mb-2 font-semibold text-gray-700'>
								Базовая цена *
							</label>
							<input
								type='number'
								required
								step='0.01'
								value={formData.basePrice}
								onChange={e =>
									setFormData({ ...formData, basePrice: e.target.value })
								}
								className='w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-400 transition-colors'
							/>
						</div>

						<div>
							<label className='block mb-2 font-semibold text-gray-700'>
								Розничная цена *
							</label>
							<input
								type='number'
								required
								step='0.01'
								value={formData.retailPrice}
								onChange={e =>
									setFormData({ ...formData, retailPrice: e.target.value })
								}
								className='w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-400 transition-colors'
							/>
						</div>
					</div>

					<div className='flex items-center gap-3 p-4 bg-gray-50 rounded-xl'>
						<input
							type='checkbox'
							id='available'
							checked={formData.available}
							onChange={e =>
								setFormData({ ...formData, available: e.target.checked })
							}
							className='w-5 h-5 rounded'
						/>
						<label htmlFor='available' className='font-semibold text-gray-700'>
							Товар доступен для продажи
						</label>
					</div>

					<div className='flex gap-4 pt-4'>
						<button
							type='submit'
							disabled={loading}
							className='flex-1 bg-gray-900 text-white py-4 rounded-2xl hover:bg-gray-800 disabled:bg-gray-400 font-semibold shadow-lg shadow-gray-900/20 transition-all'
						>
							{loading ? 'Сохранение...' : 'Сохранить изменения'}
						</button>
						<button
							type='button'
							onClick={handleDelete}
							className='px-8 py-4 bg-red-500 text-white rounded-2xl hover:bg-red-600 font-semibold shadow-lg shadow-red-500/20 transition-all'
						>
							Удалить
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}
