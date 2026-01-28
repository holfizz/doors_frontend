'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function NewProductPage() {
	const router = useRouter()
	const [categories, setCategories] = useState([])
	const [loading, setLoading] = useState(false)
	const [formData, setFormData] = useState({
		name: '',
		vendorCode: '',
		description: '',
		categoryId: '',
		basePrice: '',
		retailPrice: '',
		imageUrl: '',
	})

	useEffect(() => {
		fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`)
			.then(res => res.json())
			.then(data => setCategories(data))
	}, [])

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
				vendorCode: formData.vendorCode,
				description: formData.description || null,
				categoryId: parseInt(formData.categoryId),
				basePrice: parseFloat(formData.basePrice),
				retailPrice: parseFloat(formData.retailPrice),
				available: true,
			}

			const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(productData),
			})

			if (!res.ok) throw new Error('Ошибка при создании товара')

			const product = await res.json()

			// Добавляем изображение если указано
			if (formData.imageUrl) {
				await fetch(
					`${process.env.NEXT_PUBLIC_API_URL}/products/${product.id}/images`,
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${token}`,
						},
						body: JSON.stringify({ url: formData.imageUrl }),
					},
				)
			}

			alert('Товар успешно создан!')
			router.push('/admin/products')
		} catch (error: any) {
			alert(error.message)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div>
			<div className='flex justify-between items-center mb-6'>
				<h1 className='text-3xl font-bold'>Добавить товар</h1>
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
								placeholder='Дверь межкомнатная...'
							/>
						</div>

						<div>
							<label className='block mb-2 font-semibold text-gray-700'>
								Артикул *
							</label>
							<input
								type='text'
								required
								value={formData.vendorCode}
								onChange={e =>
									setFormData({ ...formData, vendorCode: e.target.value })
								}
								className='w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-400 transition-colors'
								placeholder='ART-12345'
							/>
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
							placeholder='Описание товара...'
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
								placeholder='10000'
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
								placeholder='12000'
							/>
						</div>
					</div>

					<div>
						<label className='block mb-2 font-semibold text-gray-700'>
							URL изображения
						</label>
						<input
							type='url'
							value={formData.imageUrl}
							onChange={e =>
								setFormData({ ...formData, imageUrl: e.target.value })
							}
							className='w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-400 transition-colors'
							placeholder='https://example.com/image.jpg'
						/>
					</div>

					<div className='flex gap-4 pt-4'>
						<button
							type='submit'
							disabled={loading}
							className='flex-1 bg-gray-900 text-white py-4 rounded-2xl hover:bg-gray-800 disabled:bg-gray-400 font-semibold shadow-lg shadow-gray-900/20 transition-all'
						>
							{loading ? 'Создание...' : 'Создать товар'}
						</button>
						<button
							type='button'
							onClick={() => router.back()}
							className='px-8 py-4 border-2 border-gray-300 rounded-2xl hover:bg-gray-50 font-semibold transition-colors'
						>
							Отмена
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}
