import { Button } from '@nextui-org/react'
import { Plus, Star, StarOff, X } from 'lucide-react'
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

	const onFileInputChange = (event: any) => {
		const newArray = [
			...items,
			...Array.from(event.target.files, (i: Blob) => ({
				src: URL.createObjectURL(i),
				isMain: false,
				file: i,
			})),
		]

		setItems(newArray)
		onChange(newArray)
	}

	return (
		<div>
			<div className='mb-5'>
				<Button as='label' startContent={<Plus />}>
					<input
						type='file'
						multiple
						onChange={onFileInputChange}
						className='hidden'
					/>
					Добавить картинку
				</Button>
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
											<StarOff size={20} className='m-auto' />
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
										<X size={20} className='m-auto' />
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
