'use client'

import { LoadingOverlay } from '@/components/shared/loding-oerlay'
import axios from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
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

	if (!data) {
		return <LoadingOverlay />
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
		axios
			.put(`/orders/${item.orderId}/items/${item.id}`, data)
			.then(() => refetch())
			.catch(err => console.error(err))
			.finally(() => setTimeout(() => setIsLoading(false), 1000))
	}

	const onItemAdd = (dto: any) => {
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
									value: 'Создан',
								},
								{
									name: 'Создан',
									value: data.createdAt,
								},
							]}
						/>
					</OrderPageBlock>
					<OrderPageBlock name='Оплата'>
						<OrderPageCard
							items={[
								{
									name: 'Тип',
									value: 'Наличный расчет',
								},
								{
									name: 'К оплате',
									value: data.totalPrice,
								},
							]}
						/>
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
					</OrderPageBlock>

					<OrderPageBlock name='Доставка'>
						<OrderPageCard
							items={[
								{
									name: 'Тип',
									value: 'Самовывоз',
								},
								{
									name: 'Стоимость',
									value: '0',
								},
								{
									name: 'Время',
									value: '26.09.2024 (15:00-18:00)',
								},
								{
									name: 'Адрес',
									value: data.address,
									href: `https://yandex.ru/maps?text=${data.address}`,
								},
							]}
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
				<OrderPageBlock name='История заказа'>
					<OrderPageHistory orderId={data.id} />
				</OrderPageBlock>
			</div>
			{isLoading && <LoadingOverlay />}
		</div>
	)
}
