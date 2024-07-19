/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: { BACKEND_URL: 'http://192.168.100.18:5000/api/' },
}

export default nextConfig
