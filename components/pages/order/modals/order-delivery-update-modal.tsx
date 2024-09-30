import axios from '@/lib/axios'
import {
	Button,
	DatePicker,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Select,
	SelectItem,
} from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

type Inputs = {
	deliveryMethodId: number
	date: Date
	price: number
	city: string
}

interface Props {
	delivery: any
	stateControl: any
	onSubmit: (data: Inputs) => void
}

export function OrderDeliveryEditModal({
	delivery,
	stateControl,
	onSubmit,
}: Props) {
	const { register, handleSubmit, control } = useForm<Inputs>()

	const { data } = useQuery({
		queryKey: ['delivery', 'methods'],
		queryFn: async () => {
			const response = await axios.get(`/delivery/methods`)
			return response.data
		},
	})

	const citiesFetch = useQuery({
		queryKey: ['delivery', 'cities'],
		queryFn: async () => {
			const response = await axios.get(`/delivery/cities`)
			return response.data
		},
	})

	const submit: SubmitHandler<Inputs> = data => {
		onSubmit(data)
	}

	return (
		<Modal
			isOpen={stateControl.isOpen}
			onOpenChange={stateControl.onOpenChange}
			placement='top-center'
		>
			<ModalContent>
				<ModalHeader className='flex flex-col gap-1'>
					Изменить доставку
				</ModalHeader>
				<ModalBody>
					<form className='flex flex-col gap-5' onSubmit={handleSubmit(submit)}>
						<div>
							Текший тип доставки: <b>{delivery.deliveryMethod.name}</b>
						</div>
						<Controller
							control={control}
							name='deliveryMethodId'
							render={({ field }) => (
								<Select
									label='Новый тип доставки'
									variant='bordered'
									items={data || []}
									multiple={false}
									defaultSelectedKeys={new Set([delivery.deliveryMethodId])}
									onSelectionChange={a => field.onChange(+[...a][0])}
								>
									{item => <SelectItem key={item.id}>{item.name}</SelectItem>}
								</Select>
							)}
						/>
						<div>
							Текший город доставки: <b>Москва</b>
						</div>
						<Controller
							control={control}
							name='city'
							render={({ field }) => (
								<Select
									label='Город доставки'
									variant='bordered'
									items={citiesFetch.data || []}
									multiple={false}
									onSelectionChange={a => field.onChange(+[...a][0])}
								>
									{item => (
										<SelectItem key={item.id}>
											[{item.code}] {item.name} ({item.deliveryPrice} руб.)
										</SelectItem>
									)}
								</Select>
							)}
						/>
						<Input
							label='Цена'
							type='number'
							variant='bordered'
							{...register('price', {
								value: delivery.price,
							})}
						/>
						<Controller
							name='date'
							control={control}
							render={({ field }) => (
								<DatePicker
									onChange={a => {
										field.onChange(a.toString())
									}}
									label='Дата доставки'
									variant='bordered'
								/>
							)}
						/>

						<Button className='w-full' color='primary' type='submit'>
							Обновить
						</Button>
					</form>
				</ModalBody>
				<ModalFooter></ModalFooter>
			</ModalContent>
		</Modal>
	)
}
