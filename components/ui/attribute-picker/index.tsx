import { Button } from '@nextui-org/react'
import { Plus } from 'lucide-react'
import { createContext, useState } from 'react'

import AttributePickerItem from './attribute-picker-item'

interface Props {
	onChange: (items: Item[]) => void
}

interface Item {
	attributeId?: number
	valueId?: number
}

export const attributePickerContext = createContext<number[]>([])

export default function AttributePicker({ onChange }: Props) {
	const [inputs, setInputs] = useState<Item[]>([])
	const [selectedAttributeIds, setSelectedAttributeIds] = useState<number[]>([])
	const [canAdd, setCanAdd] = useState(true)

	console.log('Parent', selectedAttributeIds)

	return (
		<attributePickerContext.Provider value={selectedAttributeIds}>
			<div className='flex flex-col gap-4'>
				{inputs.map((input, index) => (
					<AttributePickerItem
						onAttributeSelect={id => {
							selectedAttributeIds.push(id)
							setSelectedAttributeIds([...selectedAttributeIds])
						}}
						onSelect={value => {
							inputs[index] = value
							setInputs([...inputs])
							onChange(inputs)
							setCanAdd(true)
						}}
						onDeleteClick={id => {
							inputs.splice(index, 1)
							setInputs([...inputs])
							onChange(inputs)
							setCanAdd(true)
							if (id) {
								const index = selectedAttributeIds.indexOf(id)

								if (index) {
									selectedAttributeIds.splice(index, 1)
									setSelectedAttributeIds([...selectedAttributeIds])
								}
							}
						}}
						key={index}
					/>
				))}
				{canAdd && (
					<div className='flex items-center gap-6'>
						<Button
							type='button'
							startContent={<Plus />}
							onClick={() => {
								inputs.push({})
								setInputs([...inputs])
								setCanAdd(false)
							}}
						>
							Добавить свойства
						</Button>
					</div>
				)}
			</div>
		</attributePickerContext.Provider>
	)
}
