export default function Footer() {
	return (
		<footer className='bg-gray-100 mt-16'>
			<div className='container mx-auto px-4 py-8'>
				<div className='grid md:grid-cols-3 gap-8'>
					<div>
						<h3 className='font-semibold mb-4'>О компании</h3>
						<p className='text-gray-600'>
							Продажа межкомнатных дверей с доставкой по всей России
						</p>
					</div>
					<div>
						<h3 className='font-semibold mb-4'>Контакты</h3>
						<p className='text-gray-600'>
							Телефон: +7 (XXX) XXX-XX-XX
							<br />
							Email: info@example.com
						</p>
					</div>
					<div>
						<h3 className='font-semibold mb-4'>Информация</h3>
						<ul className='text-gray-600 space-y-2'>
							<li>Доставка и оплата</li>
							<li>Гарантия</li>
							<li>Монтаж</li>
						</ul>
					</div>
				</div>
				<div className='border-t mt-8 pt-8 text-center text-gray-600'>
					© 2026 Все права защищены
				</div>
			</div>
		</footer>
	)
}
