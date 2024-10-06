import { Spinner } from '@nextui-org/react'

interface Props {
	fixed?: boolean
}

export function LoadingOverlay({ fixed = true }: Props) {
	return (
		<div
			className={`${
				fixed ? 'fixed' : 'absolute'
			} flex top-0 left-0 w-full h-full bg-black/80 z-50`}
		>
			<Spinner size='lg' className='m-auto' />
		</div>
	)
}
