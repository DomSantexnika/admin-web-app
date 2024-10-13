import { Button } from '@nextui-org/react'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import AttributePickerItem from './attribute-picker-item'

interface Props {
	onChange: (items: Item[]) => void
}

interface Item {
	attributeId?: number
	valueId?: number
}

export default function AttributePicker({ onChange }: Props) {
	const [inputs, setInputs] = useState<Item[]>([])

	return (
		<div className='flex flex-col gap-4'>
			{inputs.map((input, index) => (
				<AttributePickerItem
					onSelect={value => {
						inputs[index] = value
						setInputs([...inputs])
						onChange(inputs)
					}}
					onDeleteClick={() => {
						inputs.splice(index, 1)
						setInputs([...inputs])
						onChange(inputs)
					}}
					key={index}
				/>
			))}
			<div className='flex items-center gap-6'>
				<Button
					type='button'
					startContent={<Plus />}
					onClick={() => {
						inputs.push({})
						setInputs([...inputs])
					}}
				>
					Добавить свойства
				</Button>
			</div>
		</div>
	)
}
