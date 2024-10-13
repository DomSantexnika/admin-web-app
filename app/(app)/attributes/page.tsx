'use client'

import axios from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'
import AttributeTable from './attribute-table'
import { AttributeCreateModal } from './modals/attribute-create-modal'
import { AttributeGroupCreateModal } from './modals/attribute-group-create-modal'
import { AttributeValueCreateModal } from './modals/attribute-value-create-modal'

export default function AttributesPage() {
	const { data, refetch } = useQuery({
		queryKey: ['attributes'],
		queryFn: () => axios.get('/attributes'),
	})

	return (
		<div className='my-10 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4'>
			<h3 className='text-xl font-semibold'>Атрибуты</h3>
			<div className='flex justify-between flex-wrap gap-4 items-center'>
				<div className='flex flex-row gap-3.5 flex-wrap'>
					<AttributeGroupCreateModal onSubmit={() => {}} />
					<AttributeCreateModal onSubmit={refetch} />
					<AttributeValueCreateModal onSubmit={() => {}} />
				</div>
			</div>

			<div className='max-w-[95rem] mx-auto w-full'>
				<AttributeTable data={data?.data} />
			</div>
		</div>
	)
}
