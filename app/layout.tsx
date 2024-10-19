import { Layout } from '@/components/layout/layout'
import { fontSans } from '@/config/fonts'
import '@/styles/globals.css'
import clsx from 'clsx'
import type { Metadata } from 'next'
import { Providers } from './providers'

export const metadata: Metadata = {
	title: {
		template: '%s | Панель-управления',
		default: 'Панель-управления',
	},
	description: 'Панель-управления дом-сантехники',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='ru'>
			<body className={clsx('font-sans antialiased', fontSans.className)}>
				<Providers>
					<Layout>{children}</Layout>
				</Providers>
			</body>
		</html>
	)
}
