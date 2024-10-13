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
	useDisclosure,
} from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

enum AttributeType {
	SELECT = 'SELECT',
	BOOLEAN = 'BOOLEAN',
	TEXT = 'TEXT',
}

interface AttributeCreateInputs {
	groupId: number
	name: string
	type: AttributeType
}

interface Props {
	onSubmit: (data: any) => void
}

export const AttributeCreateModal = ({ onSubmit }: Props) => {
	const [loading, setLoading] = useState(false)
	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

	const groupsFetch = useQuery({
		queryKey: ['attributes', 'groups', 'select'],
		queryFn: async () => {
			const response = await axios.get(`/attributes/groups`)
			return response.data
		},
	})

	const { register, formState, handleSubmit } = useForm<AttributeCreateInputs>()

	const onSubmitFrom: SubmitHandler<AttributeCreateInputs> = payload => {
		setLoading(true)

		axios
			.post('/attributes', {
				...payload,
				groupId: +payload.groupId,
			})
			.then(res => {
				toast.success('Атрибут создан')
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
					Создать атрибут
				</Button>
				<Modal
					isOpen={isOpen}
					onOpenChange={onOpenChange}
					placement='top-center'
				>
					<ModalContent>
						{onClose => (
							<>
								<ModalHeader>Новый атрибут</ModalHeader>
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
										<Select
											{...register('groupId', {
												required: true,
												valueAsNumber: true,
											})}
											label='Группа'
											items={groupsFetch.data}
										>
											{item => (
												<SelectItem key={item.id}>{item.name}</SelectItem>
											)}
										</Select>
										<Select
											{...register('type', {
												required: true,
											})}
											label='Тип'
										>
											<SelectItem key={AttributeType.SELECT}>
												{AttributeType.SELECT}
											</SelectItem>
											<SelectItem key={AttributeType.TEXT}>
												{AttributeType.TEXT}
											</SelectItem>
											<SelectItem key={AttributeType.BOOLEAN}>
												{AttributeType.BOOLEAN}
											</SelectItem>
										</Select>
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
