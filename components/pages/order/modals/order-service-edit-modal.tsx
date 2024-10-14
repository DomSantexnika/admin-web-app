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

interface Props {
	item: any
	stateControl: any
	onSubmit: (data: Inputs) => void
}

type Inputs = {
	price: number
}

export function OrderServiceEditModal({ item, stateControl, onSubmit }: Props) {
	const { register, handleSubmit } = useForm<Inputs>()

	const submit: SubmitHandler<Inputs> = data => {
		onSubmit({
			price: data?.price ? +data.price : 0,
		})
	}

	return (
		<Modal
			isOpen={stateControl.isOpen}
			onOpenChange={stateControl.onOpenChange}
			placement='top-center'
		>
			<ModalContent>
				<ModalHeader className='flex flex-col gap-1'>
					Обновить сервис в заказе
				</ModalHeader>
				<ModalBody>
					{item && (
						<form
							className='flex flex-col gap-5'
							onSubmit={handleSubmit(submit)}
						>
							<Input
								label='Цена'
								type='number'
								variant='bordered'
								placeholder={`${item.price}`}
								{...register('price')}
							/>
							<Button className='w-full' color='primary' type='submit'>
								Обновить
							</Button>
						</form>
					)}
				</ModalBody>
				<ModalFooter></ModalFooter>
			</ModalContent>
		</Modal>
	)
}
