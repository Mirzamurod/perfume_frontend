import withPWA from 'next-pwa'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: { BACKEND_URL: 'http://localhost:5000/api/' },
  webpack: (config, { isServer, dev }) => {
    if (dev) {
      config.watchOptions = {
        ignored: /sw\.js$/,
      }
    }
    return config
  },
  // env: { BACKEND_URL: 'http://206.189.109.20:9090/api/' },
  // webpack: (config, { isServer }) => {
  //   if (isServer) {
  //     config.optimization.splitChunks = false
  //   }
  //   return config
  // },
}

export default withPWA({ dest: 'public' })(nextConfig)
