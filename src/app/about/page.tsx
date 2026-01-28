export default function AboutPage() {
	return (
		<div className='container mx-auto px-4 py-12'>
			<h1 className='text-4xl font-bold mb-8'>О компании</h1>

			<div className='max-w-3xl space-y-6 text-gray-700'>
				<p className='text-lg'>
					Мы специализируемся на продаже качественных межкомнатных и входных
					дверей от ведущих производителей. Наша компания работает на рынке
					более 10 лет и зарекомендовала себя как надежный партнер.
				</p>

				<div className='grid md:grid-cols-3 gap-6 my-12'>
					<div className='text-center p-6 border rounded'>
						<div className='text-4xl font-bold text-black mb-2'>1000+</div>
						<p className='text-gray-600'>Моделей дверей</p>
					</div>
					<div className='text-center p-6 border rounded'>
						<div className='text-4xl font-bold text-black mb-2'>10+</div>
						<p className='text-gray-600'>Лет на рынке</p>
					</div>
					<div className='text-center p-6 border rounded'>
						<div className='text-4xl font-bold text-black mb-2'>5000+</div>
						<p className='text-gray-600'>Довольных клиентов</p>
					</div>
				</div>

				<h2 className='text-2xl font-bold mt-8 mb-4'>Наши преимущества</h2>

				<ul className='space-y-3'>
					<li className='flex items-start'>
						<span className='text-black mr-2'>✓</span>
						<span>Широкий ассортимент межкомнатных и входных дверей</span>
					</li>
					<li className='flex items-start'>
						<span className='text-black mr-2'>✓</span>
						<span>Доставка по всей России</span>
					</li>
					<li className='flex items-start'>
						<span className='text-black mr-2'>✓</span>
						<span>Профессиональный монтаж</span>
					</li>
					<li className='flex items-start'>
						<span className='text-black mr-2'>✓</span>
						<span>Гарантия качества на все товары</span>
					</li>
					<li className='flex items-start'>
						<span className='text-black mr-2'>✓</span>
						<span>Консультация специалистов</span>
					</li>
				</ul>
			</div>
		</div>
	)
}
