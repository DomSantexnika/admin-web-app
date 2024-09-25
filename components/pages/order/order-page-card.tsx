interface Props {
	className?: string
	items: {
		name: string
		value: string
		href?: string
	}[]
}

export function OrderPageCard({ items, className }: Props) {
	return (
		<div className={`flex flex-col gap-2 p-4 ${className}`}>
			{items.map((item, index) => (
				<div key={index} className='flex justify-between'>
					<div className='font-bold'>{item.name}</div>
					<div>
						{item.href ? (
							<a href={item.href} target='_blank' className='text-primary-400'>
								{item.value}
							</a>
						) : (
							item.value
						)}
					</div>
				</div>
			))}
		</div>
	)
}
