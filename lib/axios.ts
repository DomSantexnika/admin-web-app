import axios from 'axios'

const axiosNew = axios.create({
	baseURL: 'http://localhost:8080',
	withCredentials: true,
})

export default axiosNew
