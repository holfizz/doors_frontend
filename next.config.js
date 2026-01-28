/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'optimaporte.ru',
				pathname: '/upload/**',
			},
		],
		domains: ['optimaporte.ru'],
	},
}

module.exports = nextConfig
