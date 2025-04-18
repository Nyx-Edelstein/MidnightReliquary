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
  // Add trailing slash to ensure proper static file paths
  trailingSlash: true,
}

export default nextConfig
