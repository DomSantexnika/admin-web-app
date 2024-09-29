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
	useDisclosure,
} from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

interface Props {
	status: any
	openRef: any
	onSubmit: (data: Inputs) => void
}

type Inputs = {
	statusId: number
	notification: boolean
}

export function OrderStatusEditModal({ status, openRef, onSubmit }: Props) {
	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
	const { register, handleSubmit, control } = useForm<Inputs>()

	const { data } = useQuery({
		queryKey: ['order', 'status'],
		queryFn: async () => {
			const response = await axios.get(`/orders/statuses`)
			return response.data
		},
	})

	const submit: SubmitHandler<Inputs> = data => {
		onClose()
		onSubmit(data)
	}

	openRef.current = onOpen

	return (
		<Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='top-center'>
			<ModalContent>
				<ModalHeader className='flex flex-col gap-1'>
					Изменить заказ
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
									items={data || []}
									multiple={false}
									defaultSelectedKeys={new Set([status.id])}
									onSelectionChange={a => field.onChange(+[...a][0])}
								>
									{item => <SelectItem key={item.id}>{item.name}</SelectItem>}
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
