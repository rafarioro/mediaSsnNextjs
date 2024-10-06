/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'imagessnbackend.onrender.com',
            },
        ],
    },
};

export default nextConfig;
