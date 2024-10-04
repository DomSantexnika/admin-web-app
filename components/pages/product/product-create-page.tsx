'use client'

import { ImagePicker } from '@/components/ui/image-picker'
import axios from '@/lib/axios'
import { Input, Select, SelectItem } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import { Check, X } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

type Inputs = {
	categoryId: number
	brandId: number
	collectionId: number
	article: string
	name: string
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

	const { control } = useForm<Inputs>()

	const [articleIsValid, setArticleIsValid] = useState<
		'nr' | 'valid' | 'invalid'
	>('nr')

	return (
		<div>
			<div className='mb-5'>
				<h3 className='text-xl font-semibold'>Добавить товар</h3>
			</div>
			<div>
				<form className='flex flex-col gap-5'>
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
							name='categoryId'
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
							name='categoryId'
							control={control}
							rules={{
								required: true,
							}}
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
						/>
						<Input variant='bordered' label='Названия' />
						<Input variant='bordered' label='Слуг' />
					</div>
					<div>
						<ImagePicker onChange={a => console.log(a)} />
					</div>
				</form>
			</div>
		</div>
	)
}
