'use client'

import axios from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'
import { CategoryCreate } from './category-create'
import CategoryTable from './category-table'

export default function CategoriesPage() {
	const { data } = useQuery({
		queryKey: ['categories'],
		queryFn: () => axios.get('/categories'),
	})

	return (
		<div className='my-10 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4'>
			<h3 className='text-xl font-semibold'>Категории</h3>
			<div className='flex justify-between flex-wrap gap-4 items-center'>
				<div className='flex flex-row gap-3.5 flex-wrap'>
					<CategoryCreate />
				</div>
			</div>

			<div className='max-w-[95rem] mx-auto w-full'>
				<CategoryTable data={data?.data} />
			</div>
		</div>
	)
}
