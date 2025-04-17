/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enable static exports
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true, // Required for static export
  },
  // Remove the experimental.appDir option as it's no longer needed in Next.js 15
}

export default nextConfig
