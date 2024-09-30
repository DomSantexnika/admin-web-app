'use client'

import { LoadingOverlay } from '@/components/shared/loding-oerlay'
import axios from '@/lib/axios'
import { time } from '@/lib/time'
import { Button, useDisclosure } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import { Pencil } from 'lucide-react'
import { useState } from 'react'
import { OrderAddressEditModal } from './modals/order-address-edit-modal'
import { OrderCustomerEditModal } from './modals/order-customer-edit-modal'
import { OrderDeliveryEditModal } from './modals/order-delivery-update-modal'
import { OrderPaymentEditModal } from './modals/order-payment-edit-modal'
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

	const customerEditModalControl = useDisclosure()
	const statusEditModalControl = useDisclosure()
	const paymentEditModalControl = useDisclosure()
	const deliveryEditModalControl = useDisclosure()
	const addressEditModalControl = useDisclosure()

	if (!data) {
		return <LoadingOverlay />
	}

	const onStatusEdit = (dto: any) => {
		statusEditModalControl.onClose()
		setIsLoading(true)
		axios
			.put(`/orders/${data.id}/status`, dto)
			.then(() => refetch())
			.finally(() => {
				setTimeout(() => setIsLoading(false), 1000)
			})
	}

	const onCustomerEdit = (dto: any) => {
		customerEditModalControl.onClose()
		setIsLoading(true)
		axios
			.put(`/orders/${data.id}/customer`, dto)
			.then(() => refetch())
			.catch(err => console.error(err))
			.finally(() => setTimeout(() => setIsLoading(false), 1000))
	}

	const onDeliveryEdit = (dto: any) => {
		customerEditModalControl.onClose()
		axios
			.put(`/orders/${data.id}/delivery`, dto)
			.then(() => refetch())
			.catch(err => console.error(err))
			.finally(() => setTimeout(() => setIsLoading(false), 1000))
	}

	const onAddressEdit = (dto: any) => {
		addressEditModalControl.onClose()
		setIsLoading(true)
		axios
			.put(`/orders/${data.id}/address`, dto)
			.then(() => refetch())
			.catch(err => console.error(err))
			.finally(() => setTimeout(() => setIsLoading(false), 1000))
	}

	const onPaymentEdit = (dto: any) => {
		paymentEditModalControl.onClose()
		setIsLoading(true)
		axios
			.put(`/orders/${data.id}/payment`, dto)
			.then(() => refetch())
			.catch(err => console.error(err))
			.finally(() => setTimeout(() => setIsLoading(false), 1000))
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

						<div className='p-5 border-t-1 border-gray-600 mt-auto'>
							<Button
								startContent={<Pencil size={15} />}
								onClick={statusEditModalControl.onOpen}
							>
								Изменить статус
							</Button>
						</div>
						<OrderStatusEditModal
							status={data.status}
							onSubmit={onStatusEdit}
							stateControl={statusEditModalControl}
						/>
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
						<div className='p-5 border-t-1 border-gray-600 mt-auto'>
							<Button
								onClick={paymentEditModalControl.onOpen}
								startContent={<Pencil size={15} />}
							>
								Редактировать
							</Button>
							<OrderPaymentEditModal
								payment={data.paymentMethod}
								onSubmit={onPaymentEdit}
								stateControl={paymentEditModalControl}
							/>
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

						<div className='p-5 border-t-1 border-gray-600 mt-auto'>
							<Button
								startContent={<Pencil size={15} />}
								onClick={customerEditModalControl.onOpen}
							>
								Редактировать
							</Button>
						</div>
						<OrderCustomerEditModal
							stateControl={customerEditModalControl}
							customer={{
								email: data.customerEmail,
								phone: data.customerPhone,
								firstName: data.customerFirstName,
								lastName: data.customerLastName,
							}}
							onSubmit={onCustomerEdit}
						/>
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
						<div className='flex gap-5 p-5 border-t-1 border-gray-600 mt-auto'>
							<Button
								onClick={deliveryEditModalControl.onOpen}
								startContent={<Pencil size={15} />}
							>
								Редактировать
							</Button>
							<Button
								onClick={addressEditModalControl.onOpen}
								startContent={<Pencil size={15} />}
							>
								Изменить адрес доставки
							</Button>
						</div>
						<OrderDeliveryEditModal
							delivery={data.deliveryMethod[0]}
							onSubmit={onDeliveryEdit}
							stateControl={deliveryEditModalControl}
						/>
						<OrderAddressEditModal
							address={{
								city: {
									name: data.deliveryCity,
								},
								value: data.addressValue,
								entry: data.addressEntry,
								floor: data.addressFloor,
								flat: data.addressFlat,
							}}
							onSubmit={onAddressEdit}
							stateControl={addressEditModalControl}
						/>
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
