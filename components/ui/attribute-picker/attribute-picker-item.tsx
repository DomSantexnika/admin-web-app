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
				onSelectionChange={(a: any) => {
					setAttributeId(+[...a][0])
				}}
				disabled={isLoading}
				isLoading={isLoading}
				size='sm'
			>
				{(item: any) =>
					item.attributes.length && (
						<SelectSection showDivider title={item.name}>
							{item.attributes.map((item: any) => (
								<SelectItem key={item.id}>{item.name}</SelectItem>
							))}
						</SelectSection>
					)
				}
			</Select>
			<Select
				label='Значения'
				items={values}
				onSelectionChange={(a: any) => {
					const id = +[...a][0]
					setValueId(id)
					onSelect({ attributeId: attributeId!, valueId: id })
				}}
				disabled={!values.length || valuesSelectLoading}
				isLoading={valuesSelectLoading}
				size='sm'
			>
				{(item: any) => <SelectItem key={item.id}>{item.value}</SelectItem>}
			</Select>
			<Button color='danger' onClick={onDeleteClick}>
				<Trash2 size={16} />
			</Button>
		</div>
	)
}
