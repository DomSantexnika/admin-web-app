import axios from '@/lib/axios'
import { Autocomplete, AutocompleteItem } from '@nextui-org/react'
import { useAsyncList } from '@react-stately/data'
import Image from 'next/image'
import { useState } from 'react'

interface Props {
	onSelect: (value: string) => void
}

export default function ProductPicker({ onSelect }: Props) {
	const [selectedItem, setSelectedItem] = useState()

	let list = useAsyncList({
		async load({ signal, filterText }) {
			if (filterText) {
				try {
					let res = await axios.get(`/products/id/${filterText}`)
					return {
						items: [res.data],
					}
				} catch (err) {}
			}

			return {
				items: [],
			}
		},
	})

	return (
		<div>
			<Autocomplete
				inputValue={list.filterText}
				isLoading={list.isLoading}
				items={list.items}
				label='Выбрать товар'
				placeholder='Введите ID товара'
				variant='bordered'
				onInputChange={list.setFilterText}
				onSelectionChange={(value: any) => {
					const item = JSON.parse(value)
					setSelectedItem(item)
					onSelect(item.id)
				}}
			>
				{item => (
					<AutocompleteItem key={JSON.stringify(item)}>
						<div className='flex items-center gap-4'>
							<Image
								className='object-contain bg-white'
								src={item.image.location}
								width={50}
								height={50}
								alt=''
							/>
							<div>
								<div className='font-bold mb-3'>{item.name}</div>
								<div className='flex justify-between'>
									<div>{item.price} руб.</div>
									<div>{item.stock} шт.</div>
								</div>
							</div>
						</div>
					</AutocompleteItem>
				)}
			</Autocomplete>
			{selectedItem && (
				<div className='flex items-center gap-4 my- w-full'>
					<Image
						className='object-contain bg-white'
						src={selectedItem.image.location}
						width={50}
						height={50}
						alt=''
					/>
					<div className='w-full'>
						<div className='font-bold mb-3'>{selectedItem.name}</div>
						<div className='flex justify-between'>
							<div>{selectedItem.price} руб.</div>
							<div>{selectedItem.stock} шт.</div>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}
