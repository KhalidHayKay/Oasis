import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	transpilePackages: ['lucide-react'],
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'res.cloudinary.com',
			},
		],
		minimumCacheTTL: 60,
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],

		dangerouslyAllowSVG: true,
		contentDispositionType: 'attachment',
		unoptimized: true,
	},

	async rewrites() {
		return [
			{
				// This matches any request starting with /api/proxy
				source: '/api/proxy/:path*',
				// This is your actual Render URL
				destination: process.env.NEXT_PUBLIC_API_BASE + '/:path*',
			},
		];
	},
};

export default nextConfig;
