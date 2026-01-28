const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

export async function fetchProducts(params?: {
	categoryId?: number
	search?: string
	page?: number
}) {
	const query = new URLSearchParams()
	if (params?.categoryId) query.set('categoryId', params.categoryId.toString())
	if (params?.search) query.set('search', params.search)
	if (params?.page) query.set('page', params.page.toString())

	const res = await fetch(`${API_URL}/products?${query}`)
	return res.json()
}

export async function fetchProduct(slug: string) {
	const res = await fetch(`${API_URL}/products/slug/${slug}`)
	return res.json()
}

export async function fetchCategories() {
	const res = await fetch(`${API_URL}/categories`)
	return res.json()
}

export async function createOrder(data: {
	customerName: string
	customerEmail: string
	customerPhone: string
	items: Array<{ productId: number; quantity: number; price: number }>
}) {
	const res = await fetch(`${API_URL}/orders`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	})
	return res.json()
}
