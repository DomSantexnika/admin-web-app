import axios from 'axios'

const axiosNew = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT || 'http://localhost:8080',
	withCredentials: true,
})

export default axiosNew
