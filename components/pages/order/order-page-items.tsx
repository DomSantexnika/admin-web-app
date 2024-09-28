import {
	Button,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from '@nextui-org/react'
import { Pencil, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { OrderItemAddModal } from './modals/order-item-add-modal'
import { OrderItemEditModal } from './modals/order-item-edit-modal'

export interface IOrderItem {
	id: number
	price: number
	quantity: number
	product: {
		id: number
		name: string
		price: number
		image: {
			location: string
		}
	}
}

interface Props {
	data: IOrderItem[]
	onItemDelete: (item: IOrderItem) => void
	onItemEdit: (item: IOrderItem, data: Record<string, any>) => void
	onItemAdd: (dto: any) => void
}

export function OrderPageItems({
	data,
	onItemDelete,
	onItemEdit,
	onItemAdd,
}: Props) {
	const [itemEditModalData, setItemEditModalData] = useState<IOrderItem>()

	const itemEditModalOpenRef = useRef()
	const itemAddModalOpenRef = useRef()

	const onItemEditClick = (item: IOrderItem) => {
		setItemEditModalData(item)
		if (itemEditModalOpenRef?.current) itemEditModalOpenRef.current()
	}

	return (
		<div>
			<div className='p-2'>
				<Button
					onClick={() => {
						if (itemEditModalOpenRef?.current) itemAddModalOpenRef.current()
					}}
					color='primary'
				>
					Добавить товар
				</Button>
			</div>
			<Table>
				<TableHeader>
					<TableColumn>Картинка</TableColumn>
					<TableColumn>Артикул</TableColumn>
					<TableColumn>Названия</TableColumn>
					<TableColumn>Зак. цена</TableColumn>
					<TableColumn>Кол.</TableColumn>
					<TableColumn>Цена</TableColumn>
					<TableColumn>Сумма</TableColumn>
					<TableColumn>Профит</TableColumn>
					<TableColumn> </TableColumn>
				</TableHeader>
				<TableBody>
					{data &&
						data.map((item: IOrderItem) => (
							<TableRow key={item.id}>
								<TableCell>
									<Image
										src={item.product.image.location}
										width={64}
										height={64}
										alt=''
										className='object-contain w-16 h-16 bg-white p-1'
									/>
								</TableCell>
								<TableCell>ASD823</TableCell>
								<TableCell>{item.product.name}</TableCell>
								<TableCell>{item.product.price} руб.</TableCell>
								<TableCell>{item.quantity} шт.</TableCell>
								<TableCell>{item.price} руб.</TableCell>
								<TableCell>{item.price * item.quantity} руб.</TableCell>
								<TableCell>{item.price - item.product.price} руб.</TableCell>
								<TableCell>
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
												onItemDelete(item)
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
			<OrderItemEditModal
				openRef={itemEditModalOpenRef}
				item={itemEditModalData}
				onSubmit={data => {
					onItemEdit(itemEditModalData!, data)
				}}
			/>
			<OrderItemAddModal
				openRef={itemAddModalOpenRef}
				onSubmit={dto => {
					onItemAdd(dto)
				}}
			/>
		</div>
	)
}
