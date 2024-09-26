import { fontSans } from '@/config/fonts'
import '@/styles/globals.css'
import clsx from 'clsx'
import type { Metadata } from 'next'
import { Providers } from './providers'

export const metadata: Metadata = {
	title: {
		template: '%s | Admin-panel',
		default: 'Admin-panel',
	},
	description: 'Generated by Next.js',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<body className={clsx('font-sans antialiased', fontSans.className)}>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
