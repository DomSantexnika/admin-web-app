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
	Spinner,
	useDisclosure,
} from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import slug from 'slug'

interface CategoryCreateInputs {
	parentId: number
	name: string
	slug: string
}

interface Props {
	onSubmit: (data: any) => void
}

export const CategoryCreate = ({ onSubmit }: Props) => {
	const categoriesFetch = useQuery({
		queryKey: ['categories-select'],
		queryFn: async () => {
			const response = await axios.get(`/categories`)
			return response.data
		},
	})

	const [loading, setLoading] = useState(false)
	const [slugFieldLoading, setSlugFieldLoading] = useState(false)
	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

	const { control, watch, register, setValue, formState, handleSubmit } =
		useForm<CategoryCreateInputs>()

	const watchNameField = watch('name', '')

	useEffect(() => {
		setValue('slug', slug(watchNameField), { shouldValidate: true })
	}, [setValue, watchNameField])

	const onSubmitFrom: SubmitHandler<CategoryCreateInputs> = payload => {
		setLoading(true)
		axios
			.post('/categories', payload)
			.then(res => {
				toast.success('Категория создан')
				console.log(res)
				onClose()
				categoriesFetch.refetch()
				if (onSubmit) onSubmit(res)
			})
			.catch(err => {
				toast.error('Ошибка при создания категории')
				console.error(err)
			})
			.finally(() => setLoading(false))
	}

	return (
		<div>
			<>
				<Button onPress={onOpen} color='primary'>
					Создать
				</Button>
				<Modal
					isOpen={isOpen}
					onOpenChange={onOpenChange}
					placement='top-center'
				>
					<ModalContent>
						{onClose => (
							<>
								<ModalHeader>Новый категория</ModalHeader>
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
										<Controller
											control={control}
											name='slug'
											rules={{
												required: true,
												validate: async value => {
													if (!value) return 'Слуг обязательно для заполнения'
													setSlugFieldLoading(true)
													const result = await axios
														.get(`/categories/slug/${value}`)
														.catch(err => console.error(err))
													setSlugFieldLoading(false)
													return !result || 'Такой слуг уже существует'
												},
											}}
											render={({ field, fieldState }) => (
												<Input
													endContent={slugFieldLoading && <Spinner size='sm' />}
													errorMessage={fieldState.error?.message}
													isInvalid={!!fieldState.error?.message}
													onChange={field.onChange}
													label='Слуг'
													variant='bordered'
													value={field.value}
												/>
											)}
										/>
										<Controller
											name='parentId'
											control={control}
											render={({ field, fieldState }) => (
												<Select
													label='Родительский категория'
													variant='bordered'
													items={categoriesFetch.data || []}
													multiple={false}
													onSelectionChange={a => field.onChange(+[...a][0])}
													errorMessage={fieldState.error?.message}
												>
													{item => (
														<SelectItem key={item.id}>{item.name}</SelectItem>
													)}
												</Select>
											)}
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
