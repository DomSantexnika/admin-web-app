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
	value: string
	entry: string
	floor: string
	flat: string
}

interface Props {
	address: Inputs & {
		city: {
			name: string
		}
	}
	stateControl: any
	onSubmit: (data: Inputs) => void
}

export function OrderAddressEditModal({
	address,
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
					Изменить адрес доставки
				</ModalHeader>
				<ModalBody>
					<form className='flex flex-col gap-5' onSubmit={handleSubmit(submit)}>
						<div>
							Город доставки: <b>{address.city.name}</b>
						</div>
						<Input
							label='Адрес'
							type='text'
							variant='bordered'
							{...register('value', {
								required: true,
								value: address.value,
							})}
						/>
						<div className='grid grid-cols-3 gap-2'>
							<Input
								label='Подъезд'
								type='number'
								variant='bordered'
								{...register('entry', {
									value: address.entry,
								})}
							/>
							<Input
								label='Этаж'
								type='number'
								variant='bordered'
								{...register('floor', {
									value: address.floor,
								})}
							/>
							<Input
								label='Кв'
								type='number'
								variant='bordered'
								{...register('flat', {
									value: address.flat,
								})}
							/>
						</div>

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
