import axios from '@/lib/axios'
import {
	Button,
	Checkbox,
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
	statusId: number
	notification: boolean
}

interface Props {
	status: any
	stateControl: any
	onSubmit: (data: Inputs) => void
}

export function OrderStatusEditModal({
	status,
	stateControl,
	onSubmit,
}: Props) {
	const { register, handleSubmit, control } = useForm<Inputs>()

	const { data } = useQuery({
		queryKey: ['order', 'status'],
		queryFn: async () => {
			const response = await axios.get(`/orders/statuses`)
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
					Изменить статус заказа
				</ModalHeader>
				<ModalBody>
					<form className='flex flex-col gap-5' onSubmit={handleSubmit(submit)}>
						<div>
							Текший статус заказа: <b>{status.name}</b>
						</div>
						<Controller
							control={control}
							name='statusId'
							render={({ field }) => (
								<Select
									label='Новый статус заказа'
									variant='bordered'
									items={data || []}
									multiple={false}
									defaultSelectedKeys={new Set([status.id])}
									onSelectionChange={(a: any) => field.onChange(+[...a][0])}
								>
									{(item: any) => (
										<SelectItem key={item.id}>{item.name}</SelectItem>
									)}
								</Select>
							)}
						/>
						<Checkbox {...register('notification')}>
							Отправить уведомления
						</Checkbox>
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
