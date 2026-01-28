'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function OrderSuccessPage() {
	const searchParams = useSearchParams()
	const orderNumber = searchParams.get('orderNumber')

	return (
		<div className='container mx-auto px-4 py-16 text-center'>
			<div className='max-w-2xl mx-auto'>
				<div className='text-6xl mb-6'>✓</div>
				<h1 className='text-4xl font-bold mb-4'>Заказ оформлен!</h1>
				<p className='text-xl text-gray-600 mb-2'>
					Номер заказа: <strong>{orderNumber}</strong>
				</p>
				<p className='text-gray-600 mb-8'>
					Мы отправили подтверждение на вашу почту. Наш менеджер свяжется с вами
					в ближайшее время.
				</p>

				<div className='flex gap-4 justify-center'>
					<Link
						href='/catalogue'
						className='bg-black text-white px-8 py-3 rounded hover:bg-gray-800'
					>
						Продолжить покупки
					</Link>
					<Link
						href='/'
						className='border border-black px-8 py-3 rounded hover:bg-gray-50'
					>
						На главную
					</Link>
				</div>
			</div>
		</div>
	)
}
