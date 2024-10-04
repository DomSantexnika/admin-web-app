import { Button } from '@nextui-org/react'
import { Plus, Star, StarOff, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import 'react-photo-view/dist/react-photo-view.css'

interface Item {
	src: string
	isMain: boolean
	file: Blob
}

interface Props {
	onChange: (a: Item[]) => void
}

export function ImagePicker({ onChange }: Props) {
	const [items, setItems] = useState<Item[]>([])

	let lastMainImageIndex: number | null = null

	const setMainImage = (index: number) => {
		items[lastMainImageIndex || 0].isMain = false
		lastMainImageIndex = index
		items[lastMainImageIndex].isMain = true
		setItems([...items])
	}

	const onFileInputChange = (event: any) => {
		const prevArray = items

		const newArray = [
			...prevArray,
			...Array.from(event.target.files, (i: Blob) => ({
				src: URL.createObjectURL(i),
				isMain: false,
				file: i,
			})),
		]

		if (prevArray.length < 1) {
			lastMainImageIndex = 0
			newArray[lastMainImageIndex].isMain = true
		}

		setItems(newArray)
		onChange(newArray)
	}

	return (
		<div>
			<div className='mb-5 flex gap-4'>
				<Button as='label' startContent={<Plus />}>
					<input
						type='file'
						multiple
						onChange={onFileInputChange}
						className='hidden'
						accept='image/png,image/webp,image/jpeg,image/jpg'
					/>
					Добавить картинку
				</Button>
				{!!items.length && (
					<Button
						onClick={() => {
							if (window.confirm('Вы уверены?')) {
								setItems([])
								onChange([])
							}
						}}
						color='danger'
						startContent={<Trash2 />}
					>
						Очистить
					</Button>
				)}
			</div>
			<div className='grid grid-cols-6 gap-2'>
				<PhotoProvider>
					{items.map((item, index) => {
						return (
							<div key={item.src} className='bg-white aspect-square relative'>
								<div className='flex w-full justify-between absolute top-0 right-0'>
									<div className='flex w-7 h-7 bg-black text-foreground cursor-pointer'>
										{item.isMain ? (
											<Star size={20} className='m-auto' />
										) : (
											<StarOff
												size={20}
												className='m-auto'
												onClick={() => {
													setMainImage(index)
												}}
											/>
										)}
									</div>
									<div
										className='flex w-7 h-7 bg-red-500 text-foreground cursor-pointer z-10'
										onClick={() => {
											items.splice(index, 1)
											setItems([...items])
											onChange(items)
										}}
									>
										<Trash2 size={20} className='m-auto' />
									</div>
								</div>
								<PhotoView src={item.src} key={item.src}>
									<img
										src={item.src}
										className='object-contain w-full h-full p-2 cursor-pointer'
									/>
								</PhotoView>
							</div>
						)
					})}
				</PhotoProvider>
			</div>
		</div>
	)
}
