import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const dirname = path.dirname(fileURLToPath(import.meta.url))

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
]

const nextConfig: NextConfig = {
  trailingSlash: true,
  poweredByHeader: false,
  experimental: { globalNotFound: true },
  images: {
    formats: ['image/avif', 'image/webp'],
    localPatterns: [{ pathname: '/api/media/file/**' }, { pathname: '/brand/**' }],
    remotePatterns: [{ protocol: 'https', hostname: '*.public.blob.vercel-storage.com' }],
  },
  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders },
      { source: '/design-preview/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] },
    ]
  },
  async redirects() {
    // Legacy and common alternative addresses from the previous site.
    return [
      { source: '/book', destination: '/silent-screams/', permanent: true },
      { source: '/book/', destination: '/silent-screams/', permanent: true },
      { source: '/privacy', destination: '/privacy-policy/', permanent: true },
      { source: '/privacy/', destination: '/privacy-policy/', permanent: true },
      { source: '/design-preview', destination: '/design-preview/index.html', permanent: false },
      { source: '/design-preview/', destination: '/design-preview/index.html', permanent: false },
    ]
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }
    return webpackConfig
  },
  turbopack: { root: path.resolve(dirname) },
}

const config = withPayload(nextConfig, { devBundleServerPackages: false })

// Payload sends Critical-CH client hints on every route for its admin theme. On public pages that makes
// browsers fetch each page twice (a ~600 ms restart on mobile), so limit those headers to the admin.
const payloadHeaders = config.headers
config.headers = async () =>
  ((await payloadHeaders?.()) || []).map((h) =>
    h.headers.some((x) => x.key === 'Critical-CH') ? { ...h, source: '/admin/:path*' } : h,
  )

export default config
