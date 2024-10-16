/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	basePath: process.env.BASE_PATH || undefined,
	images: {
		formats: ['image/avif', 'image/webp'],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'storage.santexnika-house.ru',
				port: '',
				pathname: '/img/**',
			},
			{
				protocol: 'https',
				hostname: 'static.santehnika-online.ru',
				port: '',
				pathname: '/static/**',
			},
			{
				protocol: 'https',
				hostname: 'storage.bergatrading.ru',
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 's3.timeweb.cloud',
				port: '',
				pathname: '/**',
			},
		],
	},
}

module.exports = nextConfig
