import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from '@nextui-org/react'
import Image from 'next/image'
import { SubmitHandler, useForm } from 'react-hook-form'

interface Props {
	item: any
	stateControl: any
	onSubmit: (data: Inputs) => void
}

type Inputs = {
	quantity: number | undefined
	price: number | undefined
}

export function OrderItemEditModal({ item, stateControl, onSubmit }: Props) {
	const { register, handleSubmit } = useForm<Inputs>()

	const submit: SubmitHandler<Inputs> = data => {
		onSubmit({
			quantity: data?.quantity ? +data.quantity : undefined,
			price: data?.price ? +data.price : undefined,
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
					Обновить товар в заказе
				</ModalHeader>
				<ModalBody>
					{item && (
						<>
							<div className='flex gap-4'>
								<Image
									src={item.product.image.location}
									width={64}
									height={64}
									alt=''
									className='flex-shrink-0 object-contain w-16 h-16 bg-white p-1'
								/>
								<div>{item.product.name}</div>
							</div>
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
								<Input
									label='Количество'
									type='number'
									variant='bordered'
									placeholder={`${item.quantity}`}
									max={item.product.stock}
									{...register('quantity')}
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
