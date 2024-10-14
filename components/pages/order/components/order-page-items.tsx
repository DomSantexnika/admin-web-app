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
import Image from 'next/image'
import { useRef, useState } from 'react'
import { OrderItemAddModal } from '../modals/order-item-add-modal'
import { OrderItemEditModal } from '../modals/order-item-edit-modal'

export interface IOrderItem {
	id: number
	price: number
	quantity: number
	product: {
		id: number
		article: string
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

	const totalRef = useRef({
		quantity: 0,
		price: 0,
		profit: 0,
		cost: 0,
	})

	const setTotalValue = (
		key: 'quantity' | 'price' | 'profit' | 'cost',
		value: number
	) => {
		totalRef.current[key] += value

		return value
	}

	const resetTotalValue = () => {
		totalRef.current = {
			quantity: 0,
			price: 0,
			profit: 0,
			cost: 0,
		}

		return true
	}

	const itemEditModalControl = useDisclosure()
	const itemAddModalControl = useDisclosure()

	const onItemEditClick = (item: IOrderItem) => {
		setItemEditModalData(item)
		itemEditModalControl.onOpen()
	}

	return (
		<div>
			<div className='p-4 pb-0'>
				<Button
					onClick={itemAddModalControl.onOpen}
					startContent={<Plus size={15} />}
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
					{(data as any) &&
						resetTotalValue() &&
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
								<TableCell>{item.product.article}</TableCell>
								<TableCell>{item.product.name}</TableCell>
								<TableCell>
									{setTotalValue('cost', item.product.price)} руб.
								</TableCell>
								<TableCell>
									{setTotalValue('quantity', item.quantity)} шт.
								</TableCell>
								<TableCell>{item.price} руб.</TableCell>
								<TableCell>
									{setTotalValue('price', item.price * item.quantity)} руб.
								</TableCell>
								<TableCell>
									{setTotalValue('profit', item.price - item.product.price)}
									руб.
								</TableCell>
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
												onItemDelete(item)
											}
										}}
									>
										<Trash2 size={16} />
									</Button>
								</TableCell>
							</TableRow>
						))}
					<TableRow>
						<TableCell> </TableCell>
						<TableCell> </TableCell>
						<TableCell> </TableCell>
						<TableCell className='font-bold'>
							{totalRef.current.cost} руб.
						</TableCell>
						<TableCell className='font-bold'>
							{totalRef.current.quantity} шт.
						</TableCell>
						<TableCell> </TableCell>
						<TableCell className='font-bold'>
							{totalRef.current.price} руб.
						</TableCell>
						<TableCell className='font-bold'>
							{totalRef.current.profit} руб.
						</TableCell>
						<TableCell> </TableCell>
					</TableRow>
				</TableBody>
			</Table>
			<OrderItemEditModal
				stateControl={itemEditModalControl}
				item={itemEditModalData}
				onSubmit={data => {
					itemEditModalControl.onClose()
					onItemEdit(itemEditModalData!, data)
				}}
			/>
			<OrderItemAddModal
				stateControl={itemAddModalControl}
				onSubmit={dto => {
					itemAddModalControl.onClose()
					onItemAdd(dto)
				}}
			/>
		</div>
	)
}
