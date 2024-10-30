'use client'

import { LoadingOverlay } from '@/components/shared/loding-oerlay'
import axios from '@/lib/axios'
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
import { useState } from 'react'
import { toast } from 'react-toastify'

interface Props {
	onSubmit: (data: any) => void
}

export const ImportCreateModal = ({ onSubmit }: Props) => {
	const [loading, setLoading] = useState(false)
	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
	const [file, setFile] = useState<Blob | null>(null)

	const onSubmitFrom = async (file: Blob) => {
		const formData = new FormData()
		formData.append('file', file)

		axios
			.post('/imports/products/csv', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
			.then(res => {
				toast.success('Импорт товара началось')
				onClose()
				if (onSubmit) onSubmit(res)
			})
			.catch(err => {
				toast.error('Ошибка при импорта')
				console.error(err)
			})
			.finally(() => setLoading(false))
	}

	return (
		<div>
			<>
				<Button onPress={onOpen} color='primary'>
					Импорт товаров
				</Button>
				<Modal
					isOpen={isOpen}
					onOpenChange={onOpenChange}
					placement='top-center'
				>
					<ModalContent>
						{onClose => (
							<>
								<ModalHeader>Импорт товаров</ModalHeader>
								<ModalBody>
									<form
										onSubmit={event => {
											event.preventDefault()
											if (file) onSubmitFrom(file)
										}}
										className='flex flex-col gap-4'
									>
										<Input
											type='file'
											onChange={event => {
												if (event.target.files && event.target.files[0]) {
													setFile(event.target.files[0])
												} else {
													setFile(null)
												}
											}}
										></Input>
										<Button color='primary' type='submit'>
											Импортировать
										</Button>
									</form>
									{loading && <LoadingOverlay />}
								</ModalBody>
								<ModalFooter>
									<Button
										color='danger'
										variant='flat'
										onClick={onClose}
										disabled={!file}
									>
										Закрыть
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
