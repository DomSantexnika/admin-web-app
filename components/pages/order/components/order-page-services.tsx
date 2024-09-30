import {
	Button,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
	useDisclosure,
} from '@nextui-org/react'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { OrderServiceAddModal } from '../modals/order-service-add-modal'
import { OrderServiceEditModal } from '../modals/order-service-edit-modal'

interface Props {
	items: any[]
	onDelete: (item: any) => void
	onEdit: (item: any, data: Record<string, any>) => void
	onAdd: (dto: any) => void
}

export function OrderPageServices({ items, onDelete, onEdit, onAdd }: Props) {
	const editModalControl = useDisclosure()
	const addModalControl = useDisclosure()

	const [editModalData, setEditModalData] = useState()

	const onItemEditClick = (item: any) => {
		setEditModalData(item)
		editModalControl.onOpen()
	}

	return (
		<div>
			<div className='p-4 pb-0'>
				<Button
					onClick={addModalControl.onOpen}
					startContent={<Plus size={15} />}
				>
					Добавить сервис
				</Button>
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
								<Button
									color='primary'
									size='sm'
									className='mr-3'
									onClick={() => onItemEditClick(item)}
								>
									<Pencil size={16} />
								</Button>
								<Button
									color='danger'
									size='sm'
									onClick={() => {
										if (window.confirm('Вы уверены?')) {
											onDelete(item)
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
			<OrderServiceAddModal stateControl={addModalControl} onSubmit={onAdd} />
			<OrderServiceEditModal
				item={editModalData}
				stateControl={editModalControl}
				onSubmit={onEdit}
			/>
		</div>
	)
}
