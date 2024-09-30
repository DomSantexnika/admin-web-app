import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from '@nextui-org/react'
import { SubmitHandler, useForm } from 'react-hook-form'

type Inputs = {
	email: string
	phone: string
	firstName: string
	lastName: string
}

interface Props {
	customer: any
	stateControl: any
	onSubmit: (data: Inputs) => void
}

export function OrderCustomerEditModal({
	customer,
	stateControl,
	onSubmit,
}: Props) {
	const { register, handleSubmit } = useForm<Inputs>()

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
					Изменить покупателя в заказе
				</ModalHeader>
				<ModalBody>
					<form className='flex flex-col gap-5' onSubmit={handleSubmit(submit)}>
						<Input
							label='Эл. почта'
							type='email'
							variant='bordered'
							{...register('email', {
								required: true,
								value: customer.email,
							})}
						/>

						<Input
							label='Телефон'
							type='phone'
							variant='bordered'
							{...register('phone', {
								required: true,
								value: customer.phone,
							})}
						/>

						<Input
							label='Имя'
							type='text'
							variant='bordered'
							placeholder={`${customer.firstName}`}
							{...register('firstName', {
								required: true,
								value: customer.firstName,
							})}
						/>

						<Input
							label='Фамилия'
							type='text'
							variant='bordered'
							{...register('lastName', {
								required: true,
								value: customer.lastName,
							})}
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
