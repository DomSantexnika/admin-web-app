import { Star, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import 'react-photo-view/dist/react-photo-view.css'
import { ImageInput } from './image-input'

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

	const getMainIndex = () => {
		return items.findIndex(obj => {
			return obj.isMain
		})
	}

	const setItemsSync = (items: Item[]) => {
		items.sort((a, b) => {
			return a.isMain ? -1 : 1
		})
		setItems(items)
		onChange(items)
	}

	const setMainImage = (index: number) => {
		const mainIndex = getMainIndex()

		const newArray = [...items]

		if (newArray[mainIndex]) {
			newArray[mainIndex].isMain = false
		}

		newArray[index].isMain = true

		setItemsSync(newArray)
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

		if (prevArray.length <= 0) {
			newArray[0].isMain = true
		}

		setItemsSync(newArray)
	}

	return (
		<div>
			<div className='grid grid-cols-6 gap-4 max-w-[90%]'>
				<PhotoProvider>
					{items.map((item, index) => {
						return (
							<div
								key={item.src}
								className={`bg-white aspect-square relative ${
									item.isMain && 'col-span-2 row-span-2'
								}`}
							>
								<div className='flex w-full justify-between absolute top-0 right-0'>
									{!item.isMain && (
										<div className='flex w-7 h-7 bg-black text-foreground cursor-pointer'>
											<Star
												size={20}
												className='m-auto'
												onClick={() => {
													setMainImage(index)
												}}
											/>
										</div>
									)}

									<div
										className='flex w-7 h-7 bg-red-500 text-foreground cursor-pointer z-10 ml-auto'
										onClick={() => {
											items.splice(index, 1)
											if (items.length) {
												setMainImage(0)
											}
											setItemsSync([...items])
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
								{item.isMain && (
									<div className='absolute text-sm bottom-0 w-full bg-primary p-2'>
										Главная картинка
									</div>
								)}
							</div>
						)
					})}
				</PhotoProvider>
				<ImageInput onChange={onFileInputChange} />
			</div>
		</div>
	)
}
