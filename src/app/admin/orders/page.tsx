'use client'

import { useEffect, useState } from 'react'

export default function AdminOrdersPage() {
	const [orders, setOrders] = useState<any[]>([])

	useEffect(() => {
		// TODO: Добавить авторизацию
		fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`)
			.then(res => res.json())
			.then(data => {
				console.log('[AdminOrders] Received data:', data)
				// Проверяем что data это массив
				if (Array.isArray(data)) {
					setOrders(data)
				} else if (data.orders && Array.isArray(data.orders)) {
					setOrders(data.orders)
				} else {
					console.error('[AdminOrders] Invalid data format:', data)
					setOrders([])
				}
			})
			.catch(err => {
				console.error('[AdminOrders] Error:', err)
				setOrders([])
			})
	}, [])

	const statusColors: any = {
		PENDING: 'bg-yellow-100 text-yellow-800',
		CONFIRMED: 'bg-blue-100 text-blue-800',
		PROCESSING: 'bg-purple-100 text-purple-800',
		SHIPPED: 'bg-indigo-100 text-indigo-800',
		DELIVERED: 'bg-green-100 text-green-800',
		CANCELLED: 'bg-red-100 text-red-800',
	}

	const statusLabels: any = {
		PENDING: 'Ожидает',
		CONFIRMED: 'Подтвержден',
		PROCESSING: 'В обработке',
		SHIPPED: 'Отправлен',
		DELIVERED: 'Доставлен',
		CANCELLED: 'Отменен',
	}

	return (
		<div>
			<h1 className='text-3xl font-bold mb-6'>Заказы</h1>

			<div className='bg-white rounded shadow overflow-hidden'>
				<table className='w-full'>
					<thead className='bg-gray-50'>
						<tr>
							<th className='px-6 py-3 text-left'>Номер</th>
							<th className='px-6 py-3 text-left'>Клиент</th>
							<th className='px-6 py-3 text-left'>Телефон</th>
							<th className='px-6 py-3 text-left'>Сумма</th>
							<th className='px-6 py-3 text-left'>Статус</th>
							<th className='px-6 py-3 text-left'>Дата</th>
						</tr>
					</thead>
					<tbody>
						{orders.map((order: any) => (
							<tr key={order.id} className='border-t hover:bg-gray-50'>
								<td className='px-6 py-4 font-mono text-sm'>
									{order.orderNumber}
								</td>
								<td className='px-6 py-4'>
									<div>{order.customerName}</div>
									<div className='text-sm text-gray-500'>
										{order.customerEmail}
									</div>
								</td>
								<td className='px-6 py-4'>{order.customerPhone}</td>
								<td className='px-6 py-4 font-semibold'>
									{parseFloat(order.totalAmount).toLocaleString('ru-RU')} ₽
								</td>
								<td className='px-6 py-4'>
									<span
										className={`px-2 py-1 rounded text-xs ${statusColors[order.status]}`}
									>
										{statusLabels[order.status]}
									</span>
								</td>
								<td className='px-6 py-4 text-sm text-gray-500'>
									{new Date(order.createdAt).toLocaleDateString('ru-RU')}
								</td>
							</tr>
						))}
					</tbody>
				</table>

				{orders.length === 0 && (
					<div className='text-center py-12 text-gray-500'>
						Заказов пока нет
					</div>
				)}
			</div>
		</div>
	)
}
