import axios from '@/lib/axios'
import {
	Button,
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
	paymentMethodId: number
}

interface Props {
	payment: any
	stateControl: any
	onSubmit: (data: Inputs) => void
}

export function OrderPaymentEditModal({
	payment,
	stateControl,
	onSubmit,
}: Props) {
	const { handleSubmit, control } = useForm<Inputs>()

	const { data } = useQuery({
		queryKey: ['payment', 'methods'],
		queryFn: async () => {
			const response = await axios.get(`/payment/methods`)
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
					Изменить тип оплату
				</ModalHeader>
				<ModalBody>
					<form className='flex flex-col gap-5' onSubmit={handleSubmit(submit)}>
						<div>
							Текший тип оплаты: <b>{payment.name}</b>
						</div>
						<Controller
							control={control}
							name='paymentMethodId'
							render={({ field }) => (
								<Select
									label='Новый тип оплаты заказа'
									variant='bordered'
									items={data || []}
									multiple={false}
									defaultSelectedKeys={new Set([payment.id])}
									onSelectionChange={(a: any) => field.onChange(+[...a][0])}
								>
									{(item: any) => (
										<SelectItem key={item.id}>{item.name}</SelectItem>
									)}
								</Select>
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
