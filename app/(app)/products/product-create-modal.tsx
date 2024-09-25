'use client'

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

export const ProductCreateModal = () => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure()

	return (
		<div>
			<>
				<Button onPress={onOpen} color='primary'>
					Создать
				</Button>
				<Modal
					isOpen={isOpen}
					onOpenChange={onOpenChange}
					placement='top-center'
				>
					<ModalContent>
						{onClose => (
							<>
								<ModalHeader className='flex flex-col gap-1'>
									Новый товар
								</ModalHeader>
								<ModalBody>
									<Input label='Названия' variant='bordered' />
									<Input label='Слуг' variant='bordered' />
								</ModalBody>
								<ModalFooter>
									<Button color='danger' variant='flat' onClick={onClose}>
										Закрыть
									</Button>
									<Button color='primary' onPress={onClose}>
										Создать
									</Button>
								</ModalFooter>
							</>
						)}
					</ModalContent>
				</Modal>
			</>
		</div>
	)
}
