import FeedbackButton from '@/components/FeedbackButton'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
	title: 'Двери - Каталог межкомнатных дверей',
	description: 'Широкий выбор межкомнатных дверей с доставкой',
	icons: {
		icon: '/icon.png',
		apple: '/icon.png',
	},
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='ru'>
			<body>
				<Header />
				<main className='min-h-screen'>{children}</main>
				<Footer />
				<FeedbackButton />
			</body>
		</html>
	)
}
