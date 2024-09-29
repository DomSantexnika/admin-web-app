import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from '@nextui-org/react'
import { SubmitHandler, useForm } from 'react-hook-form'

interface Props {
	customer: any
	openRef: any
	onSubmit: (data: Inputs) => void
}

type Inputs = {
	email: string
	phone: string
	firstName: string
	lastName: string
}

export function OrderCustomerEditModal({ customer, openRef, onSubmit }: Props) {
	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
	const { register, handleSubmit } = useForm<Inputs>()

	const submit: SubmitHandler<Inputs> = data => {
		onClose()
		onSubmit(data)
	}

	openRef.current = onOpen

	return (
		<Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='top-center'>
			<ModalContent>
				<ModalHeader className='flex flex-col gap-1'>
					Изменить покупателя в заказе
				</ModalHeader>
				<ModalBody>
					{customer && (
						<>
							<form
								className='flex flex-col gap-5'
								onSubmit={handleSubmit(submit)}
							>
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
						</>
					)}
				</ModalBody>
				<ModalFooter></ModalFooter>
			</ModalContent>
		</Modal>
	)
}
