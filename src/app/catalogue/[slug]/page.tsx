import AddToCartButton from '@/components/AddToCartButton'
import Image from 'next/image'
import { notFound } from 'next/navigation'

async function getProduct(slug: string) {
	try {
		const res = await fetch(`http://localhost:3001/products/slug/${slug}`, {
			cache: 'no-store',
		})
		if (!res.ok) return null
		return res.json()
	} catch (error) {
		console.error('Error fetching product:', error)
		return null
	}
}

export default async function ProductPage({
	params,
}: {
	params: { slug: string }
}) {
	const product = await getProduct(params.slug)

	if (!product) {
		notFound()
	}

	const mainImage = product.images?.[0]?.url || '/placeholder.jpg'

	return (
		<div className='container mx-auto px-4 py-8'>
			<div className='grid md:grid-cols-2 gap-12'>
				{/* Изображения */}
				<div>
					<div className='relative h-[600px] bg-gray-100 rounded-lg overflow-hidden mb-4'>
						{mainImage && mainImage !== '/placeholder.jpg' ? (
							<Image
								src={mainImage}
								alt={product.name}
								fill
								className='object-contain p-8'
								priority
								sizes='(max-width: 768px) 100vw, 50vw'
							/>
						) : (
							<div className='w-full h-full flex items-center justify-center text-gray-400'>
								<svg
									className='w-32 h-32'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={1}
										d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
									/>
								</svg>
							</div>
						)}
					</div>

					{product.images?.length > 1 && (
						<div className='grid grid-cols-4 gap-2'>
							{product.images.slice(1, 5).map((img: any, idx: number) => (
								<div
									key={idx}
									className='relative h-24 bg-gray-100 rounded cursor-pointer hover:opacity-75'
								>
									<Image src={img.url} alt='' fill className='object-cover' />
								</div>
							))}
						</div>
					)}
				</div>

				{/* Информация */}
				<div>
					<p className='text-sm text-gray-500 mb-2'>
						Артикул: {product.vendorCode}
					</p>
					<h1 className='text-4xl font-bold mb-4'>{product.name}</h1>

					<div className='mb-6'>
						<p className='text-3xl font-bold'>
							{product.retailPrice.toLocaleString('ru-RU')} ₽
						</p>
						{product.basePrice < product.retailPrice && (
							<p className='text-gray-500 line-through'>
								{product.basePrice.toLocaleString('ru-RU')} ₽
							</p>
						)}
					</div>

					{product.description && (
						<div className='mb-6'>
							<h3 className='font-semibold mb-2'>Описание</h3>
							<p className='text-gray-700'>{product.description}</p>
						</div>
					)}

					{/* Варианты */}
					{product.variants?.length > 0 && (
						<div className='mb-6'>
							<h3 className='font-semibold mb-3'>Характеристики</h3>
							<div className='space-y-2'>
								{product.variants.map((variant: any) => (
									<div
										key={variant.id}
										className='flex justify-between py-2 border-b'
									>
										<span className='text-gray-600'>{variant.name}</span>
										<span className='font-medium'>{variant.value}</span>
									</div>
								))}
							</div>
						</div>
					)}

					<AddToCartButton product={product} />

					<div className='mt-8 p-4 bg-gray-50 rounded'>
						<h3 className='font-semibold mb-2'>Доставка и оплата</h3>
						<ul className='text-sm text-gray-600 space-y-1'>
							<li>• Доставка по России</li>
							<li>• Оплата при получении или онлайн</li>
							<li>• Гарантия качества</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}
