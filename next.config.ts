/** @type {import('next').NextConfig} */
const nextConfig: import('next').NextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'drjwgcpjvykvgtvlurts.supabase.co',
                port: '',
                pathname: '/storage/v1/object/public/images/**',
            },
        ],
    },
};

module.exports = nextConfig;

