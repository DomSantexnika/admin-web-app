'use client'

import OrderTable from '@/app/orders/order-table'
import { Link } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'

import axios from '@/lib/axios'
import dynamic from 'next/dynamic'
import NextLink from 'next/link'
import { StatCard } from '../../shared/stat-card'

const Chart = dynamic(() => import('./steam').then(mod => mod.Steam), {
	ssr: false,
})

export function HomePage() {
	const { data } = useQuery({
		queryKey: ['orders-dashboard'],
		queryFn: () => axios.get('/orders?limit=10&sort=id:desc'),
		refetchInterval: 30000,
	})

	return (
		<div className='h-full lg:px-6'>
			<div className='flex justify-center gap-4 xl:gap-6 pt-3 px-4 lg:px-0  flex-wrap xl:flex-nowrap sm:pt-10 max-w-[90rem] mx-auto w-full'>
				<div className='mt-6 gap-6 flex flex-col w-full'>
					<div className='flex flex-col gap-2'>
						<h3 className='text-xl font-semibold'>Продажа</h3>
						<div className='grid md:grid-cols-2 grid-cols-1 2xl:grid-cols-4 gap-5  justify-center w-full'>
							<StatCard />
							<StatCard />
							<StatCard />
							<StatCard />
						</div>
					</div>

					<div className='h-full flex flex-col gap-2'>
						<h3 className='text-xl font-semibold'>Статистика заказов</h3>
						<div className='w-full bg-default-50 shadow-lg rounded-2xl p-6 '>
							<Chart />
						</div>
					</div>

					<div className='flex flex-col justify-center w-full py-5 px-4 lg:px-0  max-w-[90rem] mx-auto gap-3'>
						<div className='flex  flex-wrap justify-between'>
							<h3 className='text-center text-xl font-semibold'>
								Последние заказы
							</h3>
							<Link
								href='/orders'
								as={NextLink}
								color='primary'
								className='cursor-pointer'
							>
								Все заказы
							</Link>
						</div>
						<OrderTable data={data?.data} />
					</div>
				</div>
			</div>
		</div>
	)
}
