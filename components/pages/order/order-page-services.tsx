import {
	Button,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from '@nextui-org/react'
import { Pencil, Plus, Trash2 } from 'lucide-react'

interface Props {
	items: any[]
}

export function OrderPageServices({ items }: Props) {
	return (
		<div>
			<div className='p-4 pb-0'>
				<Button startContent={<Plus size={15} />}>Добавить сервис</Button>
			</div>
			<Table className='w-full'>
				<TableHeader>
					<TableColumn>Названия</TableColumn>
					<TableColumn>Цена</TableColumn>
					<TableColumn> </TableColumn>
				</TableHeader>
				<TableBody>
					{items.map(item => (
						<TableRow key={item.id}>
							<TableCell>{item.service.name}</TableCell>
							<TableCell>{item.price} руб.</TableCell>
							<TableCell className='text-right'>
								<Button color='primary' size='sm' className='mr-3'>
									<Pencil size={16} />
								</Button>
								<Button color='danger' size='sm'>
									<Trash2 size={16} />
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}
