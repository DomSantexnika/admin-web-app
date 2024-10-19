import { ProductEditPage } from '@/components/pages/product/product-edit-page'

interface Props {
	params: { id: string }
}

export default async function ProductEdit({ params }: Props) {
	return (
		<div className='my-10 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4'>
			<div className='max-w-[95rem] mx-auto w-full'>
				<ProductEditPage id={+params.id} />
			</div>
		</div>
	)
}
