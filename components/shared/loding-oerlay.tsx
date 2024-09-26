import { Spinner } from '@nextui-org/react'

export function LoadingOverlay() {
	return (
		<div className='fixed flex top-0 left-0 w-full h-full bg-black/80'>
			<Spinner size='lg' className='m-auto' />
		</div>
	)
}
