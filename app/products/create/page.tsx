import { ProductCreatePage } from '@/components/pages/product/product-create-page'

export default async function ProductCreate() {
	return (
		<div className='my-10 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4'>
			<div className='max-w-[95rem] mx-auto w-full'>
				<ProductCreatePage />
			</div>
		</div>
	)
}
