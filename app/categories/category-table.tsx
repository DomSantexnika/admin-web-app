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

export default function CategoryTable({ data }: Props) {
	return (
		<Table>
			<TableHeader>
				<TableColumn>Названия</TableColumn>
				<TableColumn>Действии</TableColumn>
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
							<TableCell>{item.name}</TableCell>
							<TableCell>
								<Link href={`/categories/${item.id}`}>Open</Link>
							</TableCell>
						</TableRow>
					))}
			</TableBody>
		</Table>
	)
}
