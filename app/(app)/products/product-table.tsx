import {
	Button,
	Skeleton,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from '@nextui-org/react'
import { Eye, Pencil, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
	data: any[]
}

export default function ProductTable({ data }: Props) {
	return (
		<Table isStriped>
			<TableHeader>
				<TableColumn>Артикул</TableColumn>
				<TableColumn>Картинка</TableColumn>
				<TableColumn>Названия</TableColumn>
				<TableColumn>Цена</TableColumn>
				<TableColumn>Кол-во</TableColumn>
				<TableColumn> </TableColumn>
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
							<TableCell>{item.article}</TableCell>
							<TableCell>
								<Image
									src={item.image.location}
									width={64}
									height={64}
									alt=''
									className='object-contain w-16 h-16 bg-white p-1'
								/>
							</TableCell>
							<TableCell>{item.name}</TableCell>
							<TableCell>{item.price} руб.</TableCell>
							<TableCell>{item.stock} шт.</TableCell>
							<TableCell className='text-right'>
								<Button
									as={Link}
									href={`http://localhost:3000/products/${item.slug}`}
									color='success'
									size='sm'
									className='mr-3'
									target='_blank'
								>
									<Eye size={16} color='#fff' />
								</Button>
								<Button
									as={Link}
									href={`/products/${item.id}/edit`}
									color='primary'
									size='sm'
									className='mr-3'
								>
									<Pencil size={16} />
								</Button>
								<Button
									color='danger'
									size='sm'
									onClick={() => {
										if (window.confirm('Вы уверены?')) {
											console.log(item)
										}
									}}
								>
									<Trash2 size={16} />
								</Button>
							</TableCell>
						</TableRow>
					))}
			</TableBody>
		</Table>
	)
}
