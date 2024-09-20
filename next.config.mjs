/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'firebasestorage.googleapis.com',
                port: '',
                pathname: '/**', // Ajuste o caminho conforme necessário
            },
        ],
    },
};

export default nextConfig;
