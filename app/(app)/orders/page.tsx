'use client'

import axios from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'
import OrderTable from './order-table'

export default function OrdersPage() {
	const { data } = useQuery({
		queryKey: ['orders'],
		queryFn: () => axios.get('/orders'),
	})

	return (
		<div className='my-10 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4'>
			<h3 className='text-xl font-semibold'>Заказы</h3>
			<div className='flex justify-between flex-wrap gap-4 items-center'>
				<div className='flex flex-row gap-3.5 flex-wrap'></div>
			</div>

			<div className='max-w-[95rem] mx-auto w-full'>
				<OrderTable data={data?.data} />
			</div>
		</div>
	)
}
