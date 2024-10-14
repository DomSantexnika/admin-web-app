import axios from '@/lib/axios'
import { Button, Select, SelectItem, SelectSection } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import { Trash2 } from 'lucide-react'
import { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { attributePickerContext } from '.'

interface Props {
	onSelect: (value: { attributeId: number; valueId: number }) => void
	onDeleteClick: (attributeId: number | null) => void
	onAttributeSelect: (id: number) => void
}

export default function AttributePickerItem({
	onSelect,
	onDeleteClick,
	onAttributeSelect,
}: Props) {
	const selectedAttributesContext = useContext(attributePickerContext)

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
					onDeleteClick(attributeId)
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
					const id = +[...a][0]
					setAttributeId(+[...a][0])
					onAttributeSelect(id)
				}}
				disabled={isLoading}
				isLoading={isLoading}
				size='sm'
			>
				{(item: any) =>
					item.attributes.length && (
						<SelectSection showDivider title={item.name}>
							{item.attributes.map(
								(item: any) =>
									!selectedAttributesContext.includes(item.id) && (
										<SelectItem key={item.id} value={item.name}>
											{item.name}
										</SelectItem>
									)
							)}
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
			<Button color='danger' onClick={() => onDeleteClick(attributeId)}>
				<Trash2 size={16} />
			</Button>
		</div>
	)
}
