import axios from '@/lib/axios'
import {
	Button,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import { Pencil, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface Props {
	orderId: number
}

export function OrderPageItems({ orderId }: Props) {
	const { data, refetch } = useQuery({
		queryKey: ['order', orderId, 'items'],
		queryFn: async () => {
			const response = await axios.get(`/orders/${orderId}/items`)
			return response.data
		},
	})

	const router = useRouter()

	const onItemDeleteClick = async (itemId: number) => {
		axios.delete(`/orders/${orderId}/items/${itemId}`).then(() => {
			router.refresh()
		})
	}

	const onItemEditClick = () => {}

	return (
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
					data.map(item => (
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
							<TableCell>{item.price} руб.</TableCell>
							<TableCell>{item.quantity} шт.</TableCell>
							<TableCell>{item.price} руб.</TableCell>
							<TableCell>{item.price * item.quantity} руб.</TableCell>
							<TableCell>0 руб.</TableCell>
							<TableCell>
								<Button
									color='primary'
									size='sm'
									className='mr-3'
									onClick={onItemEditClick}
								>
									<Pencil size={16} />
								</Button>
								<Button
									color='danger'
									size='sm'
									onClick={() => onItemDeleteClick(item.id)}
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
