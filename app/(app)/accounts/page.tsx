'use client'

import axios from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'
import AccountTable from './account-table'

export default function AccountsPage() {
	const { data, refetch } = useQuery({
		queryKey: ['accounts'],
		queryFn: () => axios.get('/accounts'),
	})

	return (
		<div className='my-10 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4'>
			<h3 className='text-xl font-semibold'>Аккаунты</h3>
			<div className='flex justify-between flex-wrap gap-4 items-center'>
				<div className='flex flex-row gap-3.5 flex-wrap'></div>
			</div>

			<div className='max-w-[95rem] mx-auto w-full'>
				<AccountTable data={data?.data} />
			</div>
		</div>
	)
}
