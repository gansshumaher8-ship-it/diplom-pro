/** @type {import('next').NextConfig} */
const nextConfig = {
  // Игнорируем ошибки TypeScript при сборке
  typescript: {
    ignoreBuildErrors: true,
  },
  // Игнорируем ошибки линтера (ESLint) при сборке
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig