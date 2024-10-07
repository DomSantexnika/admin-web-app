import {
	Skeleton,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
	data: any[]
}

export default function BrandTable({ data }: Props) {
	return (
		<Table>
			<TableHeader>
				<TableColumn>Картинка</TableColumn>
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
							<TableCell>
								{item.image ? (
									<Image
										src={item.image.location}
										width={64}
										height={64}
										alt=''
										className='object-contain w-16 h-16 bg-white p-1'
									/>
								) : (
									<div className='w-[64px] h-[64px] bg-gray-300' />
								)}
							</TableCell>
							<TableCell>{item.name}</TableCell>
							<TableCell>
								<Link href={`/brands/${item.id}`}>Open</Link>
							</TableCell>
						</TableRow>
					))}
			</TableBody>
		</Table>
	)
}
