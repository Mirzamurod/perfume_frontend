/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: { BACKEND_URL: 'http://localhost:5000/api/' },
}

export default nextConfig
