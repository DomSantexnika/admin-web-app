import axios from '@/lib/axios'
import { Button, Select, SelectItem, SelectSection } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import { Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

interface Props {
	onSelect: (value: { attributeId: number; valueId: number }) => void
	onDeleteClick: () => void
}

export default function AttributePickerItem({
	onSelect,
	onDeleteClick,
}: Props) {
	const [attributeId, setAttributeId] = useState<number | null>(null)
	const [valueId, setValueId] = useState<number | null>(null)
	const [values, setValues] = useState([])
	const [valuesSelectLoading, setValuesSelectLoading] = useState(false)

	useEffect(() => {
		if (attributeId) {
			setValuesSelectLoading(true)

			axios
				.get(`/attributes/${attributeId}/values`)
				.then(response => {
					setValues(response.data)
				})
				.catch(err => {
					toast.error(err.message)
					onDeleteClick()
				})
				.finally(() => setValuesSelectLoading(false))
		}
	}, [attributeId, onDeleteClick])

	const { data, isLoading } = useQuery({
		queryKey: ['attributes', 'select'],
		queryFn: async () => {
			const response = await axios.get(`/attributes/select`)
			return response.data
		},
	})

	return (
		<div className='flex gap-4 items-center'>
			<Select
				label='Атрибут'
				items={data || []}
				onSelectionChange={set => {
					setAttributeId(+[...set][0])
				}}
				disabled={isLoading}
				isLoading={isLoading}
				size='sm'
			>
				{item =>
					item.attributes.length && (
						<SelectSection showDivider title={item.name}>
							{item.attributes.map(i => (
								<SelectItem key={i.id}>{i.name}</SelectItem>
							))}
						</SelectSection>
					)
				}
			</Select>
			<Select
				label='Значения'
				items={values}
				onSelectionChange={set => {
					const id = +[...set][0]
					setValueId(id)
					onSelect({ attributeId: attributeId!, valueId: id })
				}}
				disabled={!values.length || valuesSelectLoading}
				isLoading={valuesSelectLoading}
				size='sm'
			>
				{i => <SelectItem key={i.id}>{i.value}</SelectItem>}
			</Select>
			<Button color='danger' onClick={onDeleteClick}>
				<Trash2 size={16} />
			</Button>
		</div>
	)
}
