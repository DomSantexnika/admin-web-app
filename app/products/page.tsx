'use client'

import axios from '@/lib/axios'
import { Button } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import ProductTable from './product-table'

export default function ProductsPage() {
	const { data } = useQuery({
		queryKey: ['products'],
		queryFn: () => axios.get('/products'),
	})

	return (
		<div className='my-10 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4'>
			<h3 className='text-xl font-semibold'>Товары</h3>
			<div className='flex justify-between flex-wrap gap-4 items-center'>
				<div className='flex flex-row gap-3.5 flex-wrap'>
					<Button color='primary' as={Link} href='/products/create'>
						Новый товар
					</Button>
					<Button color='primary'>Импорт</Button>
					<Button color='primary'>Экспорт</Button>
				</div>
			</div>

			<div className='max-w-[95rem] mx-auto w-full'>
				<ProductTable data={data?.data} />
			</div>
		</div>
	)
}
