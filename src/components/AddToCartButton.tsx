'use client'

import { useCartStore } from '@/store/cart'
import { useState } from 'react'

export default function AddToCartButton({ product }: { product: any }) {
	const [quantity, setQuantity] = useState(1)
	const [added, setAdded] = useState(false)
	const addItem = useCartStore(state => state.addItem)

	const handleAddToCart = () => {
		addItem({
			productId: product.id,
			name: product.name,
			price: product.retailPrice,
			quantity,
			image: product.images?.[0]?.url,
		})
		setAdded(true)
		setTimeout(() => setAdded(false), 2000)
	}

	return (
		<div className='flex gap-4 items-center'>
			<div className='flex items-center border rounded'>
				<button
					onClick={() => setQuantity(Math.max(1, quantity - 1))}
					className='px-4 py-2 hover:bg-gray-100'
				>
					−
				</button>
				<span className='px-6 py-2 border-x'>{quantity}</span>
				<button
					onClick={() => setQuantity(quantity + 1)}
					className='px-4 py-2 hover:bg-gray-100'
				>
					+
				</button>
			</div>

			<button
				onClick={handleAddToCart}
				className='flex-1 bg-black text-white py-3 px-8 rounded hover:bg-gray-800 transition'
			>
				{added ? '✓ Добавлено' : 'В корзину'}
			</button>
		</div>
	)
}
