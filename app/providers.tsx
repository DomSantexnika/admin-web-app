'use client'

import { NextUIProvider } from '@nextui-org/system'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ThemeProviderProps } from 'next-themes/dist/types'
import { ReactNode, useState } from 'react'
import { ToastContainer } from 'react-toastify'

export interface ProvidersProps {
	children: ReactNode
	themeProps?: ThemeProviderProps
}

import 'react-toastify/dist/ReactToastify.css'

export function Providers({ children, themeProps }: ProvidersProps) {
	const [queryClient] = useState(() => new QueryClient())

	return (
		<NextUIProvider>
			<NextThemesProvider
				defaultTheme='system'
				attribute='class'
				{...themeProps}
			>
				<QueryClientProvider client={queryClient}>
					{children}
					<ToastContainer
						autoClose={2000}
						hideProgressBar
						position='top-center'
						theme='dark'
					/>
				</QueryClientProvider>
			</NextThemesProvider>
		</NextUIProvider>
	)
}
