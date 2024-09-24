/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
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
		],
	},
}

module.exports = nextConfig
