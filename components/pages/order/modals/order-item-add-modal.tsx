import ProductPicker from '@/components/ui/product-picker'
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
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

interface Props {
	openRef: any
	onSubmit: (data: Inputs) => void
}

type Inputs = {
	productId: number
	quantity?: number
	price?: number
}

export function OrderItemAddModal({ openRef, onSubmit }: Props) {
	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
	const { register, handleSubmit, control } = useForm<Inputs>()

	const submit: SubmitHandler<Inputs> = data => {
		onClose()
		onSubmit({
			productId: +data.productId,
			quantity: data?.quantity ? +data.quantity : undefined,
			price: data?.price ? +data.price : undefined,
		})
	}

	openRef.current = onOpen

	return (
		<Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='top-center'>
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
