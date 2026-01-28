'use client'

export default function FeedbackButton() {
	return (
		<button
			className='fixed right-0 top-1/2 -translate-y-1/2 bg-gradient-to-b from-yellow-400 to-yellow-500 text-gray-900 font-bold px-4 py-10 rounded-l-xl shadow-xl hover:from-yellow-500 hover:to-yellow-600 transition-all z-50 flex items-center border-l-4 border-yellow-600'
			style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
		>
			Отзыв о сайте
		</button>
	)
}
