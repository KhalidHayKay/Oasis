import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	transpilePackages: ['lucide-react'],
	images: {
		domains: ['res.cloudinary.com'],
	},
};

export default nextConfig;
