import axios from '@/lib/axios'

class ImageService {
	async create(file: any): Promise<Record<string, any>> {
		const formData = new FormData()
		formData.append('file', file)

		return new Promise((resolve, reject) => {
			axios
				.post('/media/images', formData, {
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				})
				.then(res => resolve(res.data))
				.catch(reject)
		})
	}
}

export const imageService = new ImageService()
