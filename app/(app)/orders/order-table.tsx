import { time } from '@/lib/time'
import {
	Skeleton,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from '@nextui-org/react'
import Link from 'next/link'

type Props = {
	data: any[]
}

export default function OrderTable({ data }: Props) {
	return (
		<Table>
			<TableHeader>
				<TableColumn>Код</TableColumn>
				<TableColumn>Статус</TableColumn>
				<TableColumn>Цена</TableColumn>
				<TableColumn>Создан</TableColumn>
			</TableHeader>
			<TableBody
				emptyContent={
					<div className='flex flex-col gap-3'>
						{new Array(6).fill(null).map((a, b) => (
							<Skeleton key={b} className='w-full h-16' />
						))}
					</div>
				}
			>
				{data &&
					data.map(item => (
						<TableRow key={item.id}>
							<TableCell>
								<Link
									className='font-bold underline'
									href={`/orders/${item.id}`}
								>
									{item.code}
								</Link>
							</TableCell>
							<TableCell>{item.status.name}</TableCell>
							<TableCell>{item.totalPrice}</TableCell>
							<TableCell>{time(item.createdAt).fromNow()}</TableCell>
						</TableRow>
					))}
			</TableBody>
		</Table>
	)
}
