import { Card } from '@nextui-org/react'
import { PropsWithChildren } from 'react'

interface Props {
	className?: string
	name: string
}

export function OrderPageBlock({
	name,
	children,
	className,
}: PropsWithChildren<Props>) {
	return (
		<Card>
			<div className={`p-3 text-center font-bold  ${className}`}>{name}</div>
			{children}
		</Card>
	)
}
