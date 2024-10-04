'use client'

import { ImagePicker } from '@/components/ui/image-picker'
import axios from '@/lib/axios'
import { Button, Input, Select, SelectItem } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import { Check, X } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

type Inputs = {
	categoryId: number
	brandId: number
	collectionId: number
	article: string
	name: string
	slug: string
	images: Blob[]
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

	const [articleIsValid, setArticleIsValid] = useState<
		'nr' | 'valid' | 'invalid'
	>('nr')

	const onSubmit: SubmitHandler<Inputs> = data => {
		console.log(data)
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
					<div>
						<Controller
							name='images'
							control={control}
							render={({ field }) => (
								<ImagePicker
									onChange={a => field.onChange(Array.from(a, b => b.file))}
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
		</div>
	)
}
