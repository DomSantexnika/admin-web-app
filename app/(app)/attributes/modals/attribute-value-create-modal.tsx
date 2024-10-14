'use client'

import { LoadingOverlay } from '@/components/shared/loding-oerlay'
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
	SelectSection,
	useDisclosure,
} from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

interface AttributeValueCreateInputs {
	attributeId: number
	value: string
}

interface Props {
	onSubmit: (data: any) => void
}

export const AttributeValueCreateModal = ({ onSubmit }: Props) => {
	const [loading, setLoading] = useState(false)
	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

	const groupsFetch = useQuery({
		queryKey: ['attributes', 'select'],
		queryFn: async () => {
			const response = await axios.get(`/attributes/select`)
			return response.data
		},
	})

	const { register, formState, handleSubmit } =
		useForm<AttributeValueCreateInputs>()

	const onSubmitFrom: SubmitHandler<AttributeValueCreateInputs> = payload => {
		setLoading(true)

		axios
			.post(`/attributes/${payload.attributeId}/values`, {
				value: payload.value,
			})
			.then(res => {
				toast.success('Значения атрибута создан')
				console.log(res)
				onClose()
				if (onSubmit) onSubmit(res)
			})
			.catch(err => {
				toast.error(err.message)
				console.error(err)
			})
			.finally(() => setLoading(false))
	}

	return (
		<div>
			<>
				<Button onPress={onOpen} color='primary'>
					Создать значения атрибута
				</Button>
				<Modal
					isOpen={isOpen}
					onOpenChange={onOpenChange}
					placement='top-center'
				>
					<ModalContent>
						{onClose => (
							<>
								<ModalHeader>Новый значения атрибута</ModalHeader>
								<ModalBody>
									<form
										onSubmit={handleSubmit(onSubmitFrom)}
										className='flex flex-col gap-4'
									>
										<Select
											{...register('attributeId', {
												required: true,
												valueAsNumber: true,
											})}
											label='Атрибут'
											items={groupsFetch.data}
										>
											{(item: any) =>
												item.attributes.length && (
													<SelectSection showDivider title={item.name}>
														{item.attributes.map(
															(i: { id: number; name: string }) => (
																<SelectItem key={i.id}>{i.name}</SelectItem>
															)
														)}
													</SelectSection>
												)
											}
										</Select>
										<Input
											label='Значения'
											{...register('value', {
												required: true,
											})}
											variant='bordered'
											errorMessage={formState.errors.value?.message}
											isInvalid={!!formState.errors.value?.message}
										/>
										<Button color='primary' type='submit'>
											Создать
										</Button>
									</form>
									{loading && <LoadingOverlay />}
								</ModalBody>
								<ModalFooter>
									<Button color='danger' variant='flat' onClick={onClose}>
										Закрыть
									</Button>
								</ModalFooter>
							</>
						)}
					</ModalContent>
				</Modal>
			</>
		</div>
	)
}
