import { ImagePlus } from 'lucide-react'

interface Props {
	onChange: (a: any) => void
}

export function ImageInput({ onChange }: Props) {
	return (
		<label className='flex aspect-square border-default border-2 rounded-md opacity-90 hover:opacity-100 cursor-pointer p-3'>
			<input
				type='file'
				className='hidden'
				accept='image/png,image/webp,image/jpeg,image/jpg,image/avif'
				multiple
				onChange={onChange}
			/>
			<div className='m-auto flex flex-col items-center'>
				<ImagePlus size='30%' className='mb-2' />
				<span className='font-bold text-center'>Добавить картинку</span>
			</div>
		</label>
	)
}
