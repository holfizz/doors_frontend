'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function AdminLoginPage() {
	const router = useRouter()
	const [formData, setFormData] = useState({ email: '', password: '' })
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)
		setError('')

		try {
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData),
			})

			if (!res.ok) {
				throw new Error('Неверный email или пароль')
			}

			const data = await res.json()

			// Сохраняем токен в localStorage и cookies
			localStorage.setItem('token', data.access_token)
			document.cookie = `auth_token=${data.access_token}; path=/; max-age=86400` // 24 часа

			router.push('/admin')
		} catch (err: any) {
			setError(err.message)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100'>
			<div className='max-w-md w-full bg-white p-10 rounded-3xl shadow-2xl shadow-gray-300/50'>
				<div className='text-center mb-8'>
					<div className='w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-4'>
						<svg
							className='w-8 h-8 text-white'
							fill='currentColor'
							viewBox='0 0 20 20'
						>
							<path d='M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z' />
						</svg>
					</div>
					<h1 className='text-3xl font-bold text-gray-900'>Вход в админку</h1>
					<p className='text-gray-500 mt-2'>Управление магазином дверей</p>
				</div>

				{error && (
					<div className='mb-6 p-4 bg-red-50 border-2 border-red-200 text-red-700 rounded-2xl flex items-center gap-3'>
						<svg
							className='w-5 h-5 flex-shrink-0'
							fill='currentColor'
							viewBox='0 0 20 20'
						>
							<path
								fillRule='evenodd'
								d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
								clipRule='evenodd'
							/>
						</svg>
						<span>{error}</span>
					</div>
				)}

				<form onSubmit={handleSubmit} className='space-y-5'>
					<div>
						<label className='block mb-2 font-semibold text-gray-700'>
							Email
						</label>
						<input
							type='email'
							required
							value={formData.email}
							onChange={e =>
								setFormData({ ...formData, email: e.target.value })
							}
							className='w-full border-2 border-gray-200 rounded-2xl px-5 py-3 focus:outline-none focus:border-yellow-400 transition-colors'
							placeholder='admin@example.com'
						/>
					</div>

					<div>
						<label className='block mb-2 font-semibold text-gray-700'>
							Пароль
						</label>
						<input
							type='password'
							required
							value={formData.password}
							onChange={e =>
								setFormData({ ...formData, password: e.target.value })
							}
							className='w-full border-2 border-gray-200 rounded-2xl px-5 py-3 focus:outline-none focus:border-yellow-400 transition-colors'
							placeholder='••••••••'
						/>
					</div>

					<button
						type='submit'
						disabled={loading}
						className='w-full bg-gray-900 text-white py-4 rounded-2xl hover:bg-gray-800 disabled:bg-gray-400 font-semibold shadow-lg shadow-gray-900/20 hover:shadow-xl hover:shadow-gray-900/30 transition-all'
					>
						{loading ? 'Вход...' : 'Войти'}
					</button>
				</form>

				<div className='mt-6 p-4 bg-gray-50 rounded-2xl'>
					<p className='text-sm text-gray-600 text-center'>
						<span className='font-semibold'>По умолчанию:</span>
						<br />
						admin@example.com / admin123
					</p>
				</div>
			</div>
		</div>
	)
}
