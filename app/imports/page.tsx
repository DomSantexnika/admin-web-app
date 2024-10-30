'use client'

import axios from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'
import { ImportCreateModal } from './import-create-modal'
import ImportTable from './import-table'

export default function ImportsPage() {
	const { data, refetch } = useQuery({
		queryKey: ['imports'],
		queryFn: () => axios.get('/imports'),
		refetchInterval: 1000,
	})

	return (
		<div className='my-10 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4'>
			<h3 className='text-xl font-semibold'>Импорты</h3>
			<div className='flex justify-between flex-wrap gap-4 items-center'>
				<div className='flex flex-row gap-3.5 flex-wrap'>
					<ImportCreateModal onSubmit={refetch} />
				</div>
			</div>

			<div className='max-w-[95rem] mx-auto w-full'>
				<ImportTable data={data?.data} />
			</div>
		</div>
	)
}
