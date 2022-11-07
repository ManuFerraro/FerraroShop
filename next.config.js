/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images : {
    domains : ['localhost', 'res.cloudinary.com', 'ferraro-shop.vercel.app'] 
  }
}

module.exports = nextConfig
