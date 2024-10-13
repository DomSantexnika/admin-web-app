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
	useDisclosure,
} from '@nextui-org/react'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

interface AttributeGroupCreateInputs {
	name: string
}

interface Props {
	onSubmit: (data: any) => void
}

export const AttributeGroupCreateModal = ({ onSubmit }: Props) => {
	const [loading, setLoading] = useState(false)
	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

	const { register, formState, handleSubmit } =
		useForm<AttributeGroupCreateInputs>()

	const onSubmitFrom: SubmitHandler<AttributeGroupCreateInputs> = payload => {
		setLoading(true)

		axios
			.post('/attributes/groups', payload)
			.then(res => {
				toast.success('Группа создан')
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
					Создать группу
				</Button>
				<Modal
					isOpen={isOpen}
					onOpenChange={onOpenChange}
					placement='top-center'
				>
					<ModalContent>
						{onClose => (
							<>
								<ModalHeader>Новый группа</ModalHeader>
								<ModalBody>
									<form
										onSubmit={handleSubmit(onSubmitFrom)}
										className='flex flex-col gap-4'
									>
										<Input
											label='Названия'
											{...register('name', {
												required: true,
											})}
											variant='bordered'
											errorMessage={formState.errors.name?.message}
											isInvalid={!!formState.errors.name?.message}
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
