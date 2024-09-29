import { time } from '@/lib/time'

interface Props {
	items: Record<string, any>[]
}

export function OrderPageHistory({ items }: Props) {
	return (
		<div className='flex flex-col'>
			{items.map(item => (
				<div className='flex py-3 px-4 gap-6' key={item.id}>
					<div className='text-success'>{time(item.createdAt).calendar()}</div>
					<div>{item.message}</div>
				</div>
			))}
		</div>
	)
}
