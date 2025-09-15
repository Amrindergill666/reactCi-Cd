/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const nextConfig = {
    output: 'export',
    basePath: isProd ? '/reactCi-Cd' : '',
  assetPrefix: isProd ? '/reactCi-Cd/' : '',
};

export default nextConfig;
