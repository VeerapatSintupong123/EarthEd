/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
        FRONEND_URL: process.env.FRONEND_URL,
        BACKEND_URL: process.env.BACKEND_URL,
        EMAILJS_ID: process.env.EMAILJS_ID,
        EMAILJS_SERVICE: process.env.EMAILJS_SERVICE,
        EMAILJS_TEMPLATE: process.env.EMAILJS_TEMPLATE
    },
    images: {
        domains: ['drive.google.com'],
    },
};

export default nextConfig;
