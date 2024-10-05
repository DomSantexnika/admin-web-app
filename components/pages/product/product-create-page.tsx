'use client'

import { LoadingOverlay } from '@/components/shared/loding-oerlay'
import { ImagePicker } from '@/components/ui/image-picker'
import axios from '@/lib/axios'
import { imageService } from '@/services/image.service'
import { Button, Input, Select, SelectItem } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import { Check, X } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

type Inputs = {
	categoryId: number
	brandId: number
	collectionId: number
	article: string
	name: string
	slug: string
	price: number
	oldPrice: number
	images: { isMain: boolean; file: Blob }[]
}

export function ProductCreatePage() {
	const categoriesFetch = useQuery({
		queryKey: ['categories-select'],
		queryFn: async () => {
			const response = await axios.get(`/categories`)
			return response.data
		},
	})

	const brandsFetch = useQuery({
		queryKey: ['brands-select'],
		queryFn: async () => {
			const response = await axios.get(`/brands`)
			return response.data
		},
	})

	const {
		control,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>()

	const [isLoading, setIsLoading] = useState(false)
	const [articleIsValid, setArticleIsValid] = useState<
		'nr' | 'valid' | 'invalid'
	>('nr')

	const onSubmit: SubmitHandler<Inputs> = async data => {
		setIsLoading(true)

		try {
			const payload = {
				...data,
				imageId: null,
				imageIds: [],
				price: +data.price,
				oldPrice: data.oldPrice ? +data.oldPrice : null,
			}

			for (let i = 0; i < data.images.length; i++) {
				const result = await imageService.create(data.images[i].file)

				if (result) {
					if (data.images[i].isMain) payload.imageId = result.id
					else payload.imageIds.push(result.id)
				}
			}

			delete payload.images

			axios
				.post('/products', payload)
				.then(res => {
					toast.success('Товар создан')
					console.log(res)
				})
				.catch(err => {
					toast.error('Ошибка при создания товара')
					console.error(err)
				})
				.finally(() => setIsLoading(false))
		} catch (err) {
			setIsLoading(false)
		}
	}

	return (
		<div>
			<div className='mb-5'>
				<h3 className='text-xl font-semibold'>Добавить товар</h3>
			</div>
			<div>
				<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
					<div className='grid grid-cols-3 gap-4'>
						<Controller
							name='categoryId'
							control={control}
							rules={{
								required: true,
							}}
							render={({ field, fieldState }) => (
								<Select
									label='Категория'
									variant='bordered'
									items={categoriesFetch.data || []}
									multiple={false}
									onSelectionChange={a => field.onChange(+[...a][0])}
									errorMessage={fieldState.error?.message}
								>
									{item => <SelectItem key={item.id}>{item.name}</SelectItem>}
								</Select>
							)}
						/>
						<Controller
							name='brandId'
							control={control}
							rules={{
								required: true,
							}}
							render={({ field, fieldState }) => (
								<Select
									label='Производитель'
									variant='bordered'
									items={brandsFetch.data || []}
									multiple={false}
									onSelectionChange={a => field.onChange(+[...a][0])}
									errorMessage={fieldState.error?.message}
								>
									{item => (
										<SelectItem
											startContent={
												<Image
													src={item.image.location}
													width={50}
													height={50}
													alt=''
													className='object-contain bg-white p-2'
												/>
											}
											key={item.id}
										>
											{item.name}
										</SelectItem>
									)}
								</Select>
							)}
						/>
						<Controller
							name='collectionId'
							control={control}
							render={({ field, fieldState }) => (
								<Select
									label='Коллекция'
									variant='bordered'
									items={[]}
									multiple={false}
									onSelectionChange={a => field.onChange(+[...a][0])}
									errorMessage={fieldState.error?.message}
									disabled
								>
									{item => <SelectItem key={item.id}>{item.name}</SelectItem>}
								</Select>
							)}
						/>
					</div>
					<div className='grid grid-cols-3 gap-4'>
						<Input
							endContent={
								articleIsValid !== 'nr' ? (
									articleIsValid === 'valid' ? (
										<Check color='green' />
									) : (
										<X color='red' />
									)
								) : null
							}
							variant='bordered'
							label='Артикул'
							{...register('article', {
								required: true,
							})}
							errorMessage={errors.article?.message}
						/>
						<Input
							variant='bordered'
							label='Названия'
							{...register('name', {
								required: true,
							})}
							errorMessage={errors.name?.message}
						/>
						<Input
							variant='bordered'
							label='Слуг'
							{...register('slug')}
							errorMessage={errors.slug?.message}
						/>
					</div>
					<div className='grid grid-cols-3 gap-4'>
						<Input
							type='number'
							variant='bordered'
							label='Цена'
							min={0}
							{...register('price', {
								required: true,
							})}
							errorMessage={errors.price?.message}
						/>
						<Input
							type='number'
							min={0}
							variant='bordered'
							label='Старая цена'
							{...register('oldPrice')}
							errorMessage={errors.oldPrice?.message}
						/>
					</div>
					<div>
						<Controller
							name='images'
							control={control}
							render={({ field }) => (
								<ImagePicker
									onChange={a => field.onChange(Array.from(a, b => b))}
								/>
							)}
						/>
					</div>
					<div>
						<Button color='primary' type='submit'>
							Добавить
						</Button>
					</div>
				</form>
			</div>
			{isLoading && <LoadingOverlay />}
		</div>
	)
}
