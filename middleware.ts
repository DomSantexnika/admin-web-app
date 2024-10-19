import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { appConfig } from './config/app'
import axios from './lib/axios'

export async function middleware(request: NextRequest) {
	const resp = await axios
		.get('/auth', {
			headers: {
				Cookie: request.headers.get('Cookie'),
			},
		})
		.catch(err => {})

	if (resp && resp.data && resp.data.role === 'ADMIN') {
		return NextResponse.next()
	}

	return NextResponse.redirect(appConfig.shopUrl)
}

export const config = {
	matcher: ['/'],
}
