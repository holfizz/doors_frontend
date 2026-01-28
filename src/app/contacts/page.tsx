export default function ContactsPage() {
	return (
		<div className='container mx-auto px-4 py-12'>
			<h1 className='text-4xl font-bold mb-8'>Контакты</h1>

			<div className='grid md:grid-cols-2 gap-12'>
				<div>
					<h2 className='text-2xl font-bold mb-6'>Свяжитесь с нами</h2>

					<div className='space-y-6'>
						<div>
							<h3 className='font-semibold mb-2'>Телефон</h3>
							<p className='text-gray-700'>+7 (XXX) XXX-XX-XX</p>
							<p className='text-sm text-gray-500'>Пн-Пт: 9:00 - 18:00</p>
						</div>

						<div>
							<h3 className='font-semibold mb-2'>Email</h3>
							<p className='text-gray-700'>info@example.com</p>
						</div>

						<div>
							<h3 className='font-semibold mb-2'>Адрес</h3>
							<p className='text-gray-700'>
								г. Москва, ул. Примерная, д. 1<br />
								Офис 101
							</p>
						</div>

						<div>
							<h3 className='font-semibold mb-2'>Режим работы</h3>
							<p className='text-gray-700'>
								Понедельник - Пятница: 9:00 - 18:00
								<br />
								Суббота: 10:00 - 16:00
								<br />
								Воскресенье: выходной
							</p>
						</div>
					</div>
				</div>

				<div>
					<h2 className='text-2xl font-bold mb-6'>Напишите нам</h2>

					<form className='space-y-4'>
						<div>
							<label className='block mb-2 font-medium'>Имя</label>
							<input
								type='text'
								className='w-full border rounded px-4 py-2'
								placeholder='Ваше имя'
							/>
						</div>

						<div>
							<label className='block mb-2 font-medium'>Email</label>
							<input
								type='email'
								className='w-full border rounded px-4 py-2'
								placeholder='your@email.com'
							/>
						</div>

						<div>
							<label className='block mb-2 font-medium'>Сообщение</label>
							<textarea
								rows={5}
								className='w-full border rounded px-4 py-2'
								placeholder='Ваше сообщение'
							/>
						</div>

						<button
							type='submit'
							className='w-full bg-black text-white py-3 rounded hover:bg-gray-800'
						>
							Отправить
						</button>
					</form>
				</div>
			</div>
		</div>
	)
}
