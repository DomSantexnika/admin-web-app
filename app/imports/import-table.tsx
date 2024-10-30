import { time } from '@/lib/time'
import {
	Progress,
	Skeleton,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from '@nextui-org/react'

type Props = {
	data: any[]
}

const ImportType = {
	PRODUCT: 'Товары',
}

export default function ImportTable({ data }: Props) {
	return (
		<Table>
			<TableHeader>
				<TableColumn>ID</TableColumn>
				<TableColumn>Статус</TableColumn>
				<TableColumn>Добавлено</TableColumn>
				<TableColumn>Ошибка</TableColumn>
				<TableColumn>Тип</TableColumn>
				<TableColumn>Формат</TableColumn>
				<TableColumn>Создан</TableColumn>
			</TableHeader>
			<TableBody
				emptyContent={
					<div className='flex flex-col gap-3'>
						{new Array(6).fill(null).map((a, b) => (
							<Skeleton key={b} className='w-full h-16' />
						))}
					</div>
				}
			>
				{data &&
					data.map(item => (
						<TableRow key={item.id}>
							<TableCell>{item.id}</TableCell>
							<TableCell>
								<div className='relative'>
									<Progress
										size='lg'
										aria-label='Loading...'
										value={item.created + item.error}
										maxValue={item.total}
										className='max-w-md'
										valueLabel={item.created + item.error}
									/>
									<div className='absolute top-0 w-full text-center left-[50%] translate-x-[-50%] font-bold text-sm'>
										{item.created + item.error} / {item.total}
									</div>
								</div>
							</TableCell>
							<TableCell>{item.created}</TableCell>
							<TableCell>{item.error}</TableCell>
							<TableCell>Товары</TableCell>
							<TableCell>{item.format}</TableCell>
							<TableCell>{time(item.createdAt).calendar()}</TableCell>
						</TableRow>
					))}
			</TableBody>
		</Table>
	)
}
