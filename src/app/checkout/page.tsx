'use client'

import { createOrder } from '@/lib/api'
import { useCartStore } from '@/store/cart'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function CheckoutPage() {
	const router = useRouter()
	const { items, total, clearCart } = useCartStore()
	const [loading, setLoading] = useState(false)
	const [mounted, setMounted] = useState(false)
	const [formData, setFormData] = useState({
		customerName: '',
		customerEmail: '',
		customerPhone: '',
	})

	useEffect(() => {
		setMounted(true)
	}, [])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)

		try {
			const orderData = {
				...formData,
				items: items.map(item => ({
					productId: item.productId,
					quantity: item.quantity,
					price: item.price,
				})),
			}

			const order = await createOrder(orderData)
			clearCart()
			router.push(`/order-success?orderNumber=${order.orderNumber}`)
		} catch (error) {
			console.error('Ошибка создания заказа:', error)
			alert('Ошибка при оформлении заказа')
		} finally {
			setLoading(false)
		}
	}

	if (!mounted) {
		return null
	}

	if (items.length === 0) {
		router.push('/cart')
		return null
	}

	return (
		<div className='container mx-auto px-4 py-8'>
			<h1 className='text-4xl font-bold mb-8'>Оформление заказа</h1>

			<div className='grid lg:grid-cols-3 gap-8'>
				<div className='lg:col-span-2'>
					<form onSubmit={handleSubmit} className='bg-white p-6 rounded border'>
						<h2 className='text-2xl font-bold mb-6'>Контактные данные</h2>

						<div className='space-y-4'>
							<div>
								<label className='block mb-2 font-medium'>Имя *</label>
								<input
									type='text'
									required
									value={formData.customerName}
									onChange={e =>
										setFormData({ ...formData, customerName: e.target.value })
									}
									className='w-full border rounded px-4 py-2'
									placeholder='Иван Иванов'
								/>
							</div>

							<div>
								<label className='block mb-2 font-medium'>Email *</label>
								<input
									type='email'
									required
									value={formData.customerEmail}
									onChange={e =>
										setFormData({ ...formData, customerEmail: e.target.value })
									}
									className='w-full border rounded px-4 py-2'
									placeholder='email@example.com'
								/>
							</div>

							<div>
								<label className='block mb-2 font-medium'>Телефон *</label>
								<input
									type='tel'
									required
									value={formData.customerPhone}
									onChange={e =>
										setFormData({ ...formData, customerPhone: e.target.value })
									}
									className='w-full border rounded px-4 py-2'
									placeholder='+7 (999) 999-99-99'
								/>
							</div>
						</div>

						<button
							type='submit'
							disabled={loading}
							className='w-full mt-6 bg-black text-white py-3 rounded hover:bg-gray-800 disabled:bg-gray-400'
						>
							{loading ? 'Оформление...' : 'Оформить заказ'}
						</button>
					</form>
				</div>

				<div className='lg:col-span-1'>
					<div className='bg-white p-6 rounded border sticky top-4'>
						<h2 className='text-xl font-bold mb-4'>Ваш заказ</h2>

						<div className='space-y-3 mb-4'>
							{items.map(item => (
								<div
									key={item.productId}
									className='flex justify-between text-sm'
								>
									<span>
										{item.name} × {item.quantity}
									</span>
									<span>
										{(item.price * item.quantity).toLocaleString('ru-RU')} ₽
									</span>
								</div>
							))}
						</div>

						<div className='border-t pt-4'>
							<div className='flex justify-between font-bold text-xl'>
								<span>Итого:</span>
								<span>{total().toLocaleString('ru-RU')} ₽</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
