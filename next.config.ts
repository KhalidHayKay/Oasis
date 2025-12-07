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
};

export default nextConfig;
