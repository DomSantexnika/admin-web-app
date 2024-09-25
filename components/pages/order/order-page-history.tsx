import axios from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'

interface Props {
	orderId: number
}

export function OrderPageHistory({ orderId }: Props) {
	const { data } = useQuery({
		queryKey: ['order', orderId, 'services'],
		queryFn: async () => {
			const response = await axios.get(`/products/${orderId}/services`)
			return response.data
		},
	})

	// if (!data.length) {
	// 	return <div className='p-4 text-center font-bold'>Услуги не выбрано</div>
	// }

	return (
		<div className='flex flex-col'>
			{new Array(4).fill(null).map((item, index) => (
				<div className='flex py-3 px-4 gap-6' key={index}>
					<div className='font-bold text-primary'>Last Friday at 4:22 PM</div>
					<div>Заказ создан</div>
				</div>
			))}
		</div>
	)
}
