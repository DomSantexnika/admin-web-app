import { Card, CardBody, CardHeader } from '@nextui-org/react'
import { SearchDbReIndexButton } from './search-db/reindex-button'

export default function SettingsPage() {
	return (
		<div className='my-10 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4'>
			<h3 className='text-xl font-semibold'>Настройки</h3>
			<div className='flex justify-between flex-wrap gap-4 items-center'>
				<div className='flex flex-row gap-3.5 flex-wrap'></div>
			</div>

			<div className='max-w-[95rem] mx-auto w-full grid grid-cols-3'>
				<Card>
					<CardHeader className='text-lg'>Search DB</CardHeader>
					<CardBody className='flex flex-col gap-4'>
						<SearchDbReIndexButton />
					</CardBody>
				</Card>
			</div>
		</div>
	)
}
