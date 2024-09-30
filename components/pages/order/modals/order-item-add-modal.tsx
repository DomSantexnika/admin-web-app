import ProductPicker from '@/components/ui/product-picker'
import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from '@nextui-org/react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

interface Props {
	stateControl: any
	onSubmit: (data: Inputs) => void
}

type Inputs = {
	productId: number
	quantity?: number
	price?: number
}

export function OrderItemAddModal({ stateControl, onSubmit }: Props) {
	const { register, handleSubmit, control } = useForm<Inputs>()

	const submit: SubmitHandler<Inputs> = data => {
		onSubmit({
			productId: +data.productId,
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
					Добавить товар
				</ModalHeader>
				<ModalBody>
					<form className='flex flex-col gap-5' onSubmit={handleSubmit(submit)}>
						<Controller
							name='productId'
							control={control}
							render={({ field, fieldState }) => (
								<ProductPicker onSelect={value => field.onChange(value)} />
							)}
						/>
						<Input
							label='Цена'
							type='number'
							variant='bordered'
							{...register('price')}
						/>
						<Input
							label='Количество'
							type='number'
							variant='bordered'
							{...register('quantity')}
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
