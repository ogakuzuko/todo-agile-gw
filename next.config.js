/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  i18n: { locales: ['ja'], defaultLocale: 'ja' },
  typescript: { ignoreDevErrors: true },
  eslint: { ignoreDuringBuilds: true },
  pageExtensions: ['page.tsx', 'page.ts'],
  poweredByHeader: false,
}

module.exports = nextConfig
