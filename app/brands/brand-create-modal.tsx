'use client'

import { LoadingOverlay } from '@/components/shared/loding-oerlay'
import { ImageInput } from '@/components/ui/image-input'
import axios from '@/lib/axios'
import { imageService } from '@/services/image.service'
import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Spinner,
	useDisclosure,
} from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import slug from 'slug'

interface BrandCreateInputs {
	name: string
	slug: string
}

interface Props {
	onSubmit: (data: any) => void
}

export const BrandCreateModal = ({ onSubmit }: Props) => {
	const categoriesFetch = useQuery({
		queryKey: ['categories-select'],
		queryFn: async () => {
			const response = await axios.get(`/categories`)
			return response.data
		},
	})

	const [loading, setLoading] = useState(false)
	const [slugFieldLoading, setSlugFieldLoading] = useState(false)
	const [image, setImage] = useState<Record<string, any> | null>(null)
	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

	const { control, watch, register, setValue, formState, handleSubmit } =
		useForm<BrandCreateInputs>()

	const watchNameField = watch('name', '')

	useEffect(() => {
		setValue('slug', slug(watchNameField), { shouldValidate: true })
	}, [setValue, watchNameField])

	const onSubmitFrom: SubmitHandler<BrandCreateInputs> = async payload => {
		setLoading(true)

		let imageId = null

		if (image) {
			const createImageResult = await imageService.create(image.file)
			imageId = createImageResult.id || null
		}

		axios
			.post('/brands', {
				...payload,
				imageId,
			})
			.then(res => {
				toast.success('Бренд создан')
				console.log(res)
				onClose()
				categoriesFetch.refetch()
				if (onSubmit) onSubmit(res)
			})
			.catch(err => {
				toast.error('Ошибка при создания бренда')
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
								<ModalHeader>Новый бренд</ModalHeader>
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
														.get(`/brands/slug/${value}`)
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
										<div className='px-5'>
											{image ? (
												<>
													<img
														className='aspect-square bg-white object-contain p-4'
														src={image.src}
														alt=''
													/>
												</>
											) : (
												<ImageInput
													onChange={a => {
														const file = a.target.files[0]
														setImage({
															file,
															src: URL.createObjectURL(file),
														})
													}}
												/>
											)}
										</div>

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
