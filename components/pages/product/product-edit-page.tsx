'use client'

import { LoadingOverlay } from '@/components/shared/loding-oerlay'
import { ImagePicker, ImagePickerItem } from '@/components/ui/image-picker'
import axios from '@/lib/axios'
import { Button, Input } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

export type ProductEditInputs = {
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
}

interface Props {
	id: number
}

export function ProductEditPage({ id }: Props) {
	const productFetch = useQuery({
		queryKey: ['products', id],
		queryFn: async () => {
			const response = await axios.get(`/products/id/${id}`)
			return response.data
		},
	})

	const { control, register, handleSubmit, formState } =
		useForm<ProductEditInputs>()

	const [isLoading, setIsLoading] = useState(false)
	const [deleteImages, setDeleteImage] = useState<ImagePickerItem[]>([])

	if (productFetch.isLoading) {
		return <LoadingOverlay />
	}

	const onSubmit: SubmitHandler<ProductEditInputs> = async data =>
		console.log(data)

	return (
		<div>
			<div className='mb-5'>
				<h3 className='text-xl font-semibold'>Добавить товар</h3>
			</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='lg:flex gap-5'>
					<div className='lg:w-[50%]'>
						<section className='flex flex-col gap-5 border-b-1 border-default pb-5 mb-5'>
							<Input
								label='Категория'
								value={productFetch.data.category.name}
								readOnly
								disabled
							/>
							<Input
								label='Производитель'
								value={productFetch.data.brand.name}
								readOnly
								disabled
							/>
							<Input label='Коллекция' value='--' readOnly disabled />
						</section>

						<section className='flex flex-col gap-5 border-b-1 border-default pb-5 mb-5'>
							<Input
								label='Названия'
								value={productFetch.data.name}
								readOnly
								disabled
							/>
							<Input
								label='Артикул'
								value={productFetch.data.article}
								readOnly
								disabled
							/>
							<Input
								label='Слуг'
								value={productFetch.data.slug}
								readOnly
								disabled
							/>
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
										value: productFetch.data.price,
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
										value: productFetch.data.oldPrice,
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
										value: productFetch.data.cost,
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
										value: productFetch.data.stock,
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
										value: productFetch.data.bonus,
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
										value: productFetch.data.width,
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
										value: productFetch.data.height,
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
										value: productFetch.data.length,
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
											value: productFetch.data.depth,
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
											value: productFetch.data.weight,
										})}
										errorMessage={formState.errors.weight?.message}
									/>
								</div>
							</div>
						</section>
					</div>
					<div className='lg:w-[50%]'>
						<Controller
							name='images'
							control={control}
							render={({ field }) => (
								<ImagePicker
									onChange={a => field.onChange(Array.from(a, b => b))}
									defaultValue={[
										{
											id: 0,
											imageId: productFetch.data.imageId,
											src: productFetch.data.image.location,
											isMain: true,
											isServerMain: true,
										},
										...Array.from(
											productFetch.data.images,
											(i: Record<string, any>) => {
												return {
													id: i.id,
													imageId: i.image.id,
													src: i.image.location,
													isMain: false,
													isServerMain: false,
												}
											}
										),
									]}
									onDelete={(item: ImagePickerItem) => {
										setDeleteImage([...deleteImages, item])
									}}
								/>
							)}
						/>
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
