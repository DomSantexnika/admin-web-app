import { Star, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import 'react-photo-view/dist/react-photo-view.css'
import { ImageInput } from './image-input'

export interface ImagePickerItem {
	src: string
	isMain: boolean
	id?: number
	imageId?: number
	isServerMain?: boolean
	file?: Blob
}

interface Props {
	onChange: (items: ImagePickerItem[]) => void
	defaultValue?: ImagePickerItem[]
	onDelete?: (item: ImagePickerItem) => void
	onChangeMain?: (item: ImagePickerItem) => void
}

export function ImagePicker({
	onChange,
	defaultValue,
	onDelete,
	onChangeMain,
}: Props) {
	const [items, setItems] = useState<ImagePickerItem[]>(defaultValue || [])

	const getMainIndex = () => {
		return items.findIndex(obj => {
			return obj.isMain
		})
	}

	const setItemsSync = (items: ImagePickerItem[], sort: boolean = true) => {
		if (sort) {
			items.sort((a, b) => {
				return a.isMain ? -1 : 1
			})
		}

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

		if (onChangeMain) onChangeMain(newArray[index])

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
			setItemsSync(newArray)
		} else {
			setItemsSync(newArray, false)
		}
	}

	const onDeleteClick = (index: number) => {
		const item = items[index]

		items.splice(index, 1)
		if (items.length) {
			setMainImage(0)
		}
		setItemsSync([...items])

		if (onDelete) onDelete(item)
	}

	return (
		<div className='relative'>
			<div className='grid grid-cols-3 gap-2'>
				<PhotoProvider>
					{items.map((item, index) => {
						console.log(item)
						return (
							<div
								key={item.src}
								className={`bg-white aspect-square relative ${
									item.isMain && 'col-span-2 row-span-2 border-5 border-primary'
								}`}
							>
								<div className='flex w-full justify-between absolute top-0 right-0 p-1'>
									{!item.isMain && (
										<div className='flex w-7 h-7 bg-primary text-foreground cursor-pointer rounded-md'>
											<Star
												size={16}
												className='m-auto'
												onClick={() => {
													setMainImage(index)
												}}
											/>
										</div>
									)}

									<div
										className='flex w-7 h-7 bg-red-500 text-foreground cursor-pointer z-10 ml-auto rounded-md'
										onClick={() => onDeleteClick(index)}
									>
										<Trash2 size={16} className='m-auto' />
									</div>
								</div>
								<PhotoView src={item.src} key={item.src}>
									<img
										src={item.src}
										className='object-contain w-full h-full p-2 cursor-pointer'
									/>
								</PhotoView>
								<div
									className={`absolute text-sm bottom-0 w-full p-2 flex justify-between font-bold ${
										item.isMain ? 'bg-primary' : 'bg-default/80'
									}`}
								>
									{item.isMain && <span>Главная картинка</span>}
									{item.imageId ? (
										<span>Идентификатор: {item.imageId}</span>
									) : (
										<span>{(item.file?.size / 1024).toFixed(2) + ' КБ'}</span>
									)}
								</div>
							</div>
						)
					})}
				</PhotoProvider>
				<ImageInput onChange={onFileInputChange} />
			</div>
		</div>
	)
}
