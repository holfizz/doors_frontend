import CatalogueClient from '@/components/CatalogueClient'

export const dynamic = 'force-dynamic'

async function getProducts() {
	console.log('[Catalogue] Fetching products from API...')
	try {
		const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
		const url = `${apiUrl}/products?take=30&page=1`
		console.log('[Catalogue] URL:', url)
		const res = await fetch(url, {
			cache: 'no-store',
		})
		console.log('[Catalogue] Response status:', res.status, res.ok)
		if (!res.ok) {
			console.error('[Catalogue] Response not OK')
			return { products: [], total: 0 }
		}
		const data = await res.json()
		console.log('[Catalogue] Received products:', data.products?.length || 0)
		if (data.products?.[0]) {
			console.log('[Catalogue] First product:', {
				name: data.products[0].name,
				images: data.products[0].images?.length || 0,
				firstImageUrl: data.products[0].images?.[0]?.url,
			})
		}
		return data
	} catch (error) {
		console.error('[Catalogue] Error fetching products:', error)
		return { products: [], total: 0 }
	}
}

async function getCategories() {
	console.log('[Catalogue] Fetching categories from API...')
	try {
		const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
		const res = await fetch(`${apiUrl}/categories`, {
			cache: 'no-store',
		})
		console.log('[Catalogue] Categories response status:', res.status)
		if (!res.ok) return []
		const data = await res.json()
		console.log('[Catalogue] Received categories:', data.length)
		return data
	} catch (error) {
		console.error('[Catalogue] Error fetching categories:', error)
		return []
	}
}

export default async function CataloguePage() {
	const { products, total } = await getProducts()
	const categories = await getCategories()

	console.log('[Catalogue Page] Rendering with:', {
		productsCount: products.length,
		total,
		categoriesCount: categories.length,
	})

	return (
		<div className='bg-gradient-to-b from-gray-50 to-white min-h-screen'>
			<div className='container mx-auto px-4 py-6'>
				{/* Breadcrumbs */}
				<div className='text-sm text-gray-500 mb-4 flex items-center gap-2'>
					<span className='hover:text-gray-700 cursor-pointer'>Главная</span>
					<svg
						className='w-4 h-4'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M9 5l7 7-7 7'
						/>
					</svg>
					<span className='text-gray-900 font-medium'>Каталог</span>
				</div>

				<h1 className='text-5xl font-bold mb-2 text-gray-900'>Двери</h1>
				<p className='text-orange-600 text-xl mb-8 font-medium'>
					по низким ценам
				</p>

				<CatalogueClient
					initialProducts={products}
					initialTotal={total}
					categories={categories}
				/>
			</div>
		</div>
	)
}
