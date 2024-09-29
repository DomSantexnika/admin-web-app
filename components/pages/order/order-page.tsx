'use client'

import { LoadingOverlay } from '@/components/shared/loding-oerlay'
import axios from '@/lib/axios'
import { time } from '@/lib/time'
import { Button } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import { useRef, useState } from 'react'
import { OrderCustomerEditModal } from './modals/order-customer-edit-modal'
import { OrderStatusEditModal } from './modals/order-status-edit-modal'
import { OrderPageBlock } from './order-page-block'
import { OrderPageCard } from './order-page-card'
import { OrderPageHistory } from './order-page-history'
import { IOrderItem, OrderPageItems } from './order-page-items'
import { OrderPageServices } from './order-page-services'

interface Props {
	id: number
}

export function OrderShowPage({ id }: Props) {
	const { data, refetch } = useQuery({
		queryKey: ['order', id],
		queryFn: async () => {
			const response = await axios.get(`/orders/${id}`)
			return response.data
		},
	})

	const [isLoading, setIsLoading] = useState(false)

	const customerEditModalOpenRef = useRef()
	const orderStatusEditModalOpenRef = useRef()

	if (!data) {
		return <LoadingOverlay />
	}

	const onStatusEdit = (dto: any) => {
		setIsLoading(true)
		axios
			.put(`/orders/${data.id}/status`, dto)
			.then(() => refetch())
			.finally(() => {
				setTimeout(() => setIsLoading(false), 1000)
			})
	}

	const onItemDelete = (item: IOrderItem) => {
		setIsLoading(true)
		axios
			.delete(`/orders/${data.id}/items/${item.id}`)
			.then(() => refetch())
			.finally(() => {
				setTimeout(() => setIsLoading(false), 1000)
			})
	}

	const onItemEdit = (item: any, data: any) => {
		setIsLoading(true)
		axios
			.put(`/orders/${item.orderId}/items/${item.id}`, data)
			.then(() => refetch())
			.catch(err => console.error(err))
			.finally(() => setTimeout(() => setIsLoading(false), 1000))
	}

	const onItemAdd = (dto: any) => {
		setIsLoading(true)
		axios
			.post(`/orders/${data.id}/items`, dto)
			.then(() => refetch())
			.catch(err => console.error(err))
			.finally(() => setTimeout(() => setIsLoading(false), 1000))
	}

	const onCustomerEdit = (dto: any) => {
		setIsLoading(true)
		axios
			.put(`/orders/${data.id}/customer`, dto)
			.then(() => refetch())
			.catch(err => console.error(err))
			.finally(() => setTimeout(() => setIsLoading(false), 1000))
	}

	return (
		<div>
			<div>
				<h3 className='text-xl font-semibold mb-6'>Заказ: {data.code}</h3>
			</div>
			<div className='flex flex-col gap-10'>
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
					<OrderPageBlock name='Заказ'>
						<OrderPageCard
							items={[
								{
									name: 'Номер',
									value: data.code,
								},
								{
									name: 'Статус',
									value: data.status.name,
								},
								{
									name: 'Создан',
									value: time(data.createdAt).calendar(),
								},
							]}
						/>
						<OrderStatusEditModal
							status={data.status}
							onSubmit={onStatusEdit}
							openRef={orderStatusEditModalOpenRef}
						/>
						<div className='p-5 border-t-1 mt-auto'>
							<Button onClick={orderStatusEditModalOpenRef.current}>
								Изменить статус
							</Button>
						</div>
					</OrderPageBlock>
					<OrderPageBlock name='Оплата'>
						<OrderPageCard
							items={[
								{
									name: 'Тип',
									value: data.paymentMethod.name,
								},
								{
									name: 'К оплате',
									value: data.totalPrice,
								},
							]}
						/>
						<div className='p-5 border-t-1 mt-auto'>
							<Button>Редактировать</Button>
						</div>
					</OrderPageBlock>
					<OrderPageBlock name='Покупатель'>
						<OrderPageCard
							items={[
								{
									name: 'Телефон',
									value: data.customerPhone,
									href: `tel:${data.customerPhone}`,
								},
								{
									name: 'Почта',
									value: data.customerEmail,
									href: `mailto:${data.customerEmail}`,
								},
								{
									name: 'ФИО',
									value: `${data.customerFirstName} ${data.customerLastName}`,
								},
							]}
						/>
						<OrderCustomerEditModal
							openRef={customerEditModalOpenRef}
							customer={{
								email: data.customerEmail,
								phone: data.customerPhone,
								firstName: data.customerFirstName,
								lastName: data.customerLastName,
							}}
							onSubmit={onCustomerEdit}
						/>
						<div className='p-5 border-t-1 mt-auto'>
							<Button onClick={customerEditModalOpenRef.current}>
								Редактировать
							</Button>
						</div>
					</OrderPageBlock>

					<OrderPageBlock name='Доставка'>
						<OrderPageCard
							items={[
								{
									name: 'Тип',
									value: data.deliveryMethod[0].deliveryMethod.name,
								},
								{
									name: 'Стоимость',
									value: `${data.deliveryMethod[0].price} руб.`,
								},
								{
									name: 'Время',
									value: time(data.deliveryMethod[0].data).calendar(),
								},
								{
									name: 'Адрес',
									value: data.addressValue,
									href: `https://yandex.ru/maps?text=${data.addressValue}`,
								},
							]}
						/>
						<div className='p-5 border-t-1 mt-auto'>
							<Button>Редактировать</Button>
						</div>
					</OrderPageBlock>
				</div>
				<OrderPageBlock name='Товары в заказе'>
					<OrderPageItems
						onItemDelete={onItemDelete}
						onItemEdit={onItemEdit}
						onItemAdd={onItemAdd}
						data={data.items || []}
					/>
				</OrderPageBlock>
				<OrderPageBlock name='Дополнительные услуги'>
					<OrderPageServices orderId={data.id} />
				</OrderPageBlock>
				{data.histories.length && (
					<OrderPageBlock name='История заказа'>
						<OrderPageHistory items={data.histories} />
					</OrderPageBlock>
				)}
			</div>
			{isLoading && <LoadingOverlay />}
		</div>
	)
}
