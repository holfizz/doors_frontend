'use client'

import { useState } from 'react'

export default function AdminImportPage() {
	const [file, setFile] = useState<File | null>(null)
	const [loading, setLoading] = useState(false)
	const [result, setResult] = useState<any>(null)

	const handleImport = async () => {
		if (!file) return

		setLoading(true)
		const formData = new FormData()
		formData.append('file', file)

		try {
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/import/xml`, {
				method: 'POST',
				body: formData,
			})
			const data = await res.json()
			setResult(data)
		} catch (error) {
			console.error('Ошибка импорта:', error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div>
			<h1 className='text-3xl font-bold mb-6'>Импорт товаров</h1>

			<div className='bg-white p-6 rounded shadow max-w-2xl'>
				<div className='mb-4'>
					<label className='block mb-2 font-semibold'>Выберите XML файл</label>
					<input
						type='file'
						accept='.xml'
						onChange={e => setFile(e.target.files?.[0] || null)}
						className='border p-2 rounded w-full'
					/>
				</div>

				<button
					onClick={handleImport}
					disabled={!file || loading}
					className='bg-black text-white px-6 py-2 rounded hover:bg-gray-800 disabled:bg-gray-400'
				>
					{loading ? 'Импорт...' : 'Импортировать'}
				</button>

				{result && (
					<div className='mt-6 p-4 bg-green-50 border border-green-200 rounded'>
						<p className='font-semibold'>Импорт завершен!</p>
						<p>
							Импортировано: {result.imported} из {result.total}
						</p>
					</div>
				)}
			</div>
		</div>
	)
}
