import axios from 'axios'

const axiosClassic = axios.create({
	baseURL:
		process.env.SERVER_API_ENDPOINT ||
		process.env.NEXT_PUBLIC_API_ENDPOINT ||
		'http://localhost:8080',
	withCredentials: true,
})

export default axiosClassic
