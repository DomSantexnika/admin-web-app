'use client'

import { LoadingOverlay } from '@/components/shared/loding-oerlay'
import AttributePicker from '@/components/ui/attribute-picker'
import { ImagePicker, ImagePickerItem } from '@/components/ui/image-picker'
import axios from '@/lib/axios'
import { imageService } from '@/services/image.service'
import { Button, Input, Select, SelectItem, Spinner } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import slug from 'slug'

export type ProductCreateInputs = {
	categoryId: number
	brandId: number
	collectionId: number
	article: string
	name: string
	slug: string
	price: number
	oldPrice: number
	stock: number
	images: ImagePickerItem[]
	cost: number
	bonus: number

	width: number
	height: number
	length: number
	depth: number
	weight: number

	attributes: { attributeId: number; valueId: number }[]
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

	const { control, register, handleSubmit, watch, formState, setValue } =
		useForm<ProductCreateInputs>({
			reValidateMode: 'onBlur',
		})

	const watchNameField = watch('name', '')

	useEffect(() => {
		setValue('slug', slug(watchNameField), { shouldValidate: true })
	}, [setValue, watchNameField])

	const [isLoading, setIsLoading] = useState(false)

	const [articleFieldLoading, setArticleFieldLoading] = useState(false)
	const [slugFieldLoading, setSlugFieldLoading] = useState(false)

	const onSubmit: SubmitHandler<ProductCreateInputs> = async data => {
		setIsLoading(true)

		try {
			const payload = {
				...data,
				imageId: null,
				imageIds: [],
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
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='lg:flex gap-5'>
					<div className='lg:w-[50%]'>
						<section className='flex flex-col gap-5 border-b-1 border-default pb-5 mb-5'>
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
							<div className='grid sm:grid-cols-2 gap-4'>
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
														item.image && (
															<Image
																src={item.image.location}
																width={50}
																height={50}
																alt=''
																className='object-contain bg-white p-2'
															/>
														)
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
											variant={[].length ? 'bordered' : undefined}
											items={[]}
											multiple={false}
											onSelectionChange={a => field.onChange(+[...a][0])}
											errorMessage={fieldState.error?.message}
											disabled
											endContent={<Spinner size='sm' />}
										>
											{item => (
												<SelectItem key={item.id}>{item.name}</SelectItem>
											)}
										</Select>
									)}
								/>
							</div>
						</section>

						<section className='flex flex-col gap-5 border-b-1 border-default pb-5 mb-5'>
							<div className='grid gap-4'>
								<Input
									variant='bordered'
									label='Названия'
									{...register('name', {
										required: true,
									})}
									errorMessage={formState.errors.name?.message}
								/>
								<Input
									endContent={articleFieldLoading && <Spinner size='sm' />}
									variant='bordered'
									label='Артикул'
									{...register('article', {
										required: true,
										validate: async value => {
											if (!value) return 'Артикул обязательно для заполнения'
											setArticleFieldLoading(true)
											const result = await axios
												.get(`/products/article/${value}`)
												.catch(err => console.error(err))
											setArticleFieldLoading(false)
											return !result || 'Такой артикул уже существует'
										},
									})}
									isInvalid={!!formState.errors.article?.message}
									errorMessage={formState.errors.article?.message}
								/>
								<Controller
									control={control}
									name='slug'
									render={({ field, fieldState }) => (
										<Input
											variant='bordered'
											label='Слуг'
											endContent={slugFieldLoading && <Spinner size='sm' />}
											errorMessage={fieldState.error?.message}
											isInvalid={!!fieldState.error?.message}
											value={field.value}
											onChange={field.onChange}
											onBlur={() => {}}
										/>
									)}
									rules={{
										required: true,
										validate: async value => {
											if (!value) return 'Слуг обязательно для заполнения'
											setSlugFieldLoading(true)
											const result = await axios
												.get(`/products/slug/${value}`)
												.catch(err => console.error(err))
											setSlugFieldLoading(false)
											return !result || 'Такой слуг уже существует'
										},
									}}
								/>
							</div>
						</section>

						<section className='flex flex-col gap-5 border-b-1 border-default pb-5 mb-5'>
							<div className='grid md:grid-cols-3 gap-4'>
								<Input
									type='number'
									variant='bordered'
									label='Цена'
									endContent='₽'
									{...register('price', {
										required: true,
										valueAsNumber: true,
										min: 0,
									})}
									errorMessage={formState.errors.price?.message}
								/>
								<Input
									type='number'
									variant='bordered'
									label='Старая цена'
									endContent='₽'
									{...register('oldPrice', {
										valueAsNumber: true,
										min: 0,
									})}
									errorMessage={formState.errors.oldPrice?.message}
								/>
								<Input
									type='number'
									variant='bordered'
									label='Закупочная цена'
									endContent='₽'
									{...register('cost', {
										valueAsNumber: true,
										min: 0,
									})}
									errorMessage={formState.errors.cost?.message}
								/>
							</div>
						</section>

						<section className='flex flex-col gap-5 border-b-1 border-default pb-5 mb-5'>
							<div className='grid md:grid-cols-2 gap-4'>
								<Input
									type='number'
									variant='bordered'
									label='Количество'
									endContent='штук'
									{...register('stock', {
										valueAsNumber: true,
										min: 0,
									})}
									errorMessage={formState.errors.stock?.message}
								/>
								<Input
									type='number'
									variant='bordered'
									label='Бонус'
									{...register('bonus', {
										valueAsNumber: true,
										min: 0,
									})}
									errorMessage={formState.errors.bonus?.message}
								/>
							</div>
						</section>

						<section className='flex flex-col gap-5 border-b-1 border-default pb-5 mb-5'>
							<div className='grid md:grid-cols-3 gap-4'>
								<Input
									type='number'
									variant='bordered'
									label='Ширина'
									endContent='см'
									{...register('width', {
										valueAsNumber: true,
										min: 0,
									})}
									errorMessage={formState.errors.width?.message}
								/>
								<Input
									type='number'
									variant='bordered'
									label='Высота'
									endContent='см'
									{...register('height', {
										valueAsNumber: true,
										min: 0,
									})}
									errorMessage={formState.errors.height?.message}
								/>
								<Input
									type='number'
									variant='bordered'
									label='Длина'
									endContent='см'
									{...register('length', {
										valueAsNumber: true,
										min: 0,
									})}
									errorMessage={formState.errors.length?.message}
								/>
								<div className='col-span-full grid md:grid-cols-2 gap-4'>
									<Input
										type='number'
										variant='bordered'
										label='Глубина'
										endContent='см'
										{...register('depth', {
											valueAsNumber: true,
											min: 0,
										})}
										errorMessage={formState.errors.depth?.message}
									/>
									<Input
										type='number'
										variant='bordered'
										label='Вес'
										endContent='гр'
										{...register('weight', {
											valueAsNumber: true,
											min: 0,
										})}
										errorMessage={formState.errors.weight?.message}
									/>
								</div>
							</div>
						</section>
					</div>
					<div className='lg:w-[50%]'>
						<section className='flex flex-col gap-5 border-b-1 border-default pb-5 mb-5'>
							<Controller
								name='images'
								control={control}
								render={({ field }) => (
									<ImagePicker onChange={a => field.onChange(a)} />
								)}
							/>
						</section>
						<section className='flex flex-col gap-5 border-b-1 border-default pb-5 mb-5'>
							<Controller
								control={control}
								name='attributes'
								render={({ field }) => (
									<AttributePicker onChange={value => field.onChange(value)} />
								)}
							/>
						</section>
					</div>
				</div>
				<div className='text-center mt-6'>
					<Button color='primary' radius='sm' type='submit' className='w-[50%]'>
						Добавить
					</Button>
				</div>
			</form>
			{isLoading && <LoadingOverlay />}
		</div>
	)
}
