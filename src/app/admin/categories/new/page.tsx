'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function NewCategoryPage() {
	const router = useRouter()
	const [categories, setCategories] = useState([])
	const [loading, setLoading] = useState(false)
	const [formData, setFormData] = useState({
		name: '',
		parentId: '',
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
			const slug = formData.name
				.toLowerCase()
				.replace(/[^a-zа-яё0-9\s-]/g, '')
				.replace(/\s+/g, '-')

			const categoryData = {
				name: formData.name,
				slug,
				parentId: formData.parentId ? parseInt(formData.parentId) : null,
			}

			const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(categoryData),
			})

			if (!res.ok) throw new Error('Ошибка при создании категории')

			alert('Категория успешно создана!')
			router.push('/admin/categories')
		} catch (error: any) {
			alert(error.message)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div>
			<div className='flex justify-between items-center mb-6'>
				<h1 className='text-3xl font-bold'>Добавить категорию</h1>
				<button
					onClick={() => router.back()}
					className='px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors'
				>
					← Назад
				</button>
			</div>

			<div className='bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-8 max-w-2xl'>
				<form onSubmit={handleSubmit} className='space-y-6'>
					<div>
						<label className='block mb-2 font-semibold text-gray-700'>
							Название категории *
						</label>
						<input
							type='text'
							required
							value={formData.name}
							onChange={e => setFormData({ ...formData, name: e.target.value })}
							className='w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-400 transition-colors'
							placeholder='Межкомнатные двери'
						/>
					</div>

					<div>
						<label className='block mb-2 font-semibold text-gray-700'>
							Родительская категория
						</label>
						<select
							value={formData.parentId}
							onChange={e =>
								setFormData({ ...formData, parentId: e.target.value })
							}
							className='w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-400 transition-colors'
						>
							<option value=''>Нет (корневая категория)</option>
							{categories.map((cat: any) => (
								<option key={cat.id} value={cat.id}>
									{cat.name}
								</option>
							))}
						</select>
						<p className='text-sm text-gray-500 mt-2'>
							Выберите родительскую категорию для создания подкатегории
						</p>
					</div>

					<div className='flex gap-4 pt-4'>
						<button
							type='submit'
							disabled={loading}
							className='flex-1 bg-gray-900 text-white py-4 rounded-2xl hover:bg-gray-800 disabled:bg-gray-400 font-semibold shadow-lg shadow-gray-900/20 transition-all'
						>
							{loading ? 'Создание...' : 'Создать категорию'}
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
