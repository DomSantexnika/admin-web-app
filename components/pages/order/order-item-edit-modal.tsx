import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from '@nextui-org/react'
import Image from 'next/image'

interface Props {
	item: any
	openRef: any
}

export function OrderItemEditModal({ item, openRef }: Props) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure()

	openRef.current = onOpen

	return (
		<Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='top-center'>
			<ModalContent>
				{onClose => (
					<>
						<ModalHeader className='flex flex-col gap-1'>
							Обновить товар в заказе
						</ModalHeader>
						<ModalBody>
							{item && (
								<>
									<div className='flex gap-4'>
										<Image
											src={item.product.image.location}
											width={64}
											height={64}
											alt=''
											className='flex-shrink-0 object-contain w-16 h-16 bg-white p-1'
										/>
										<div>{item.product.name}</div>
									</div>
									<form>
										<Input
											label='Цена'
											type='number'
											variant='bordered'
											placeholder={`${item.price}`}
										/>
										<Input
											label='Количество'
											type='number'
											variant='bordered'
											placeholder={`${item.quantity}`}
										/>
									</form>
								</>
							)}
						</ModalBody>
						<ModalFooter>
							<Button className='w-full' color='primary' onPress={onClose}>
								Обновить
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	)
}
