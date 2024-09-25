import axios from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'

interface Props {
	orderId: number
}

export function OrderPageServices({ orderId }: Props) {
	const { data } = useQuery({
		queryKey: ['order', orderId, 'services'],
		queryFn: async () => {
			const response = await axios.get(`/orders/${orderId}/services`)
			return response.data
		},
	})

	if (!data?.length) {
		return <div className='p-4 text-center font-bold'>Услуги не выбрано</div>
	}

	return (
		<div className='flex gap-2 flex-wrap'>
			{data.map(item => (
				<div key={item.id}>{item.name}</div>
			))}
		</div>
	)
}
