'use client'

import axios from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'
import { BrandCreate } from './brand-create'
import BrandTable from './brand-table'

export default function BrandsPage() {
	const { data } = useQuery({
		queryKey: ['brands'],
		queryFn: () => axios.get('/brands'),
	})

	return (
		<div className='my-10 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4'>
			<h3 className='text-xl font-semibold'>Бренды</h3>
			<div className='flex justify-between flex-wrap gap-4 items-center'>
				<div className='flex flex-row gap-3.5 flex-wrap'>
					<BrandCreate />
				</div>
			</div>

			<div className='max-w-[95rem] mx-auto w-full'>
				<BrandTable data={data?.data} />
			</div>
		</div>
	)
}
