/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
        FRONEND_URL: process.env.FRONEND_URL,
        BACKEND_URL: process.env.BACKEND_URL,
        EMAILJS_ID: process.env.EMAILJS_ID,
        EMAILJS_SERVICE: process.env.EMAILJS_SERVICE,
        EMAILJS_TEMPLATE: process.env.EMAILJS_TEMPLATE,
        SLIPOK_ENDPOINT:process.env.SLIPOK_ENDPOINT,
        SLIPOK_KEY:process.env.SLIPOK_KEY,
        EXAMPLE_GG:process.env.EXAMPLE_GG,
        MAIN_GG:process.env.MAIN_GG
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'drive.google.com',
                pathname: '/**',
            }
        ],
    },
};

export default nextConfig;
