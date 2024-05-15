/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
        FRONEND_URL: process.env.FRONEND_URL,
        BACKEND_URL: process.env.BACKEND_URL
    }
};

export default nextConfig;
