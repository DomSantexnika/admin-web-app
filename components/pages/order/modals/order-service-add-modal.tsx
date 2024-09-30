import axios from '@/lib/axios'
import {
	Button,
	Input,
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

interface Props {
	stateControl: any
	onSubmit: (data: Inputs) => void
}

type Inputs = {
	serviceId: number
	price?: number
}

export function OrderServiceAddModal({ stateControl, onSubmit }: Props) {
	const { register, handleSubmit, control } = useForm<Inputs>()

	const servicesFetch = useQuery({
		queryKey: ['order', 'services'],
		queryFn: async () => {
			const response = await axios.get(`/orders/services`)
			return response.data
		},
	})

	const submit: SubmitHandler<Inputs> = data => {
		onSubmit({
			serviceId: +data.serviceId,
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
					Добавить сервис
				</ModalHeader>
				<ModalBody>
					<form className='flex flex-col gap-5' onSubmit={handleSubmit(submit)}>
						<Controller
							name='serviceId'
							control={control}
							rules={{
								required: true,
							}}
							render={({ field, fieldState }) => (
								<Select
									label='Сервис'
									variant='bordered'
									items={servicesFetch.data || []}
									multiple={false}
									onSelectionChange={a => field.onChange(+[...a][0])}
									errorMessage={fieldState.error?.message}
								>
									{item => <SelectItem key={item.id}>{item.name}</SelectItem>}
								</Select>
							)}
						/>
						<Input
							label='Цена'
							type='number'
							variant='bordered'
							{...register('price')}
						/>
						<Button className='w-full' color='primary' type='submit'>
							Добавить
						</Button>
					</form>
				</ModalBody>
				<ModalFooter></ModalFooter>
			</ModalContent>
		</Modal>
	)
}
