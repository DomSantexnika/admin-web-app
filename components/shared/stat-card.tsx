import { Card, CardBody } from '@nextui-org/react'
import { Community } from '../icons/community'

interface Props {
	className?: string
}

export function StatCard({ className }: Props) {
	return (
		<Card className='xl:max-w-sm bg-primary rounded-xl shadow-md px-3 w-full'>
			<CardBody className='py-5 overflow-hidden'>
				<div className='flex gap-2.5'>
					<Community />
					<div className='flex flex-col'>
						<span className='text-white'>Продано сегодня</span>
						<span className='text-white text-xs'>45 Заказов</span>
					</div>
				</div>
				<div className='flex gap-2.5 py-2 items-center'>
					<span className='text-white text-xl font-semibold'>372 232 руб.</span>
					<span className='text-success text-xs'>+ 4.5%</span>
				</div>
			</CardBody>
		</Card>
	)
}
