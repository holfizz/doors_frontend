'use client'

import { useCartStore } from '@/store/cart'
import Image from 'next/image'
import Link from 'next/link'

export default function CartPage() {
	const { items, removeItem, updateQuantity, total, clearCart } = useCartStore()

	if (items.length === 0) {
		return (
			<div className='container mx-auto px-4 py-16 text-center'>
				<h1 className='text-3xl font-bold mb-4'>Корзина пуста</h1>
				<p className='text-gray-600 mb-8'>Добавьте товары из каталога</p>
				<Link
					href='/catalogue'
					className='inline-block bg-black text-white px-8 py-3 rounded hover:bg-gray-800'
				>
					Перейти в каталог
				</Link>
			</div>
		)
	}

	return (
		<div className='container mx-auto px-4 py-8'>
			<h1 className='text-4xl font-bold mb-8'>Корзина</h1>

			<div className='grid lg:grid-cols-3 gap-8'>
				<div className='lg:col-span-2 space-y-4'>
					{items.map(item => (
						<div
							key={item.productId}
							className='flex gap-4 bg-white p-4 rounded border'
						>
							{item.image && (
								<div className='relative w-24 h-24 flex-shrink-0 bg-gray-100 rounded'>
									<Image
										src={item.image}
										alt={item.name}
										fill
										className='object-cover'
									/>
								</div>
							)}

							<div className='flex-1'>
								<h3 className='font-semibold mb-2'>{item.name}</h3>
								<p className='text-lg font-bold'>
									{item.price.toLocaleString('ru-RU')} ₽
								</p>
							</div>

							<div className='flex flex-col items-end gap-2'>
								<div className='flex items-center border rounded'>
									<button
										onClick={() =>
											updateQuantity(
												item.productId,
												Math.max(1, item.quantity - 1),
											)
										}
										className='px-3 py-1 hover:bg-gray-100'
									>
										−
									</button>
									<span className='px-4 py-1 border-x'>{item.quantity}</span>
									<button
										onClick={() =>
											updateQuantity(item.productId, item.quantity + 1)
										}
										className='px-3 py-1 hover:bg-gray-100'
									>
										+
									</button>
								</div>

								<button
									onClick={() => removeItem(item.productId)}
									className='text-red-600 text-sm hover:underline'
								>
									Удалить
								</button>
							</div>
						</div>
					))}
				</div>

				<div className='lg:col-span-1'>
					<div className='bg-white p-6 rounded border sticky top-4'>
						<h2 className='text-2xl font-bold mb-4'>Итого</h2>

						<div className='space-y-2 mb-6'>
							<div className='flex justify-between'>
								<span>Товары ({items.length})</span>
								<span>{total().toLocaleString('ru-RU')} ₽</span>
							</div>
							<div className='flex justify-between font-bold text-xl pt-4 border-t'>
								<span>Итого:</span>
								<span>{total().toLocaleString('ru-RU')} ₽</span>
							</div>
						</div>

						<Link
							href='/checkout'
							className='block w-full bg-black text-white text-center py-3 rounded hover:bg-gray-800 mb-2'
						>
							Оформить заказ
						</Link>

						<button
							onClick={clearCart}
							className='w-full text-gray-600 text-sm hover:underline'
						>
							Очистить корзину
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
