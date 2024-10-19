'use client'

import axiosClassic from '@/lib/axios'
import { Button } from '@nextui-org/react'
import { RefreshCcwDot } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'react-toastify'

export function SearchDbReIndexButton() {
	const [loading, setLoading] = useState(false)

	const onClick = () => {
		setLoading(true)

		axiosClassic
			.get('/system/search-db/refresh')
			.then(resp => toast.success('База обновлено'))
			.catch(err => toast.error(err.message))
			.finally(() => setLoading(false))
	}

	return (
		<Button
			color='danger'
			isLoading={loading}
			disabled={loading}
			onClick={onClick}
			className='font-medium'
			startContent={<RefreshCcwDot />}
		>
			ReIndex
		</Button>
	)
}
