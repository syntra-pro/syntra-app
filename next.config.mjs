/** @type {import('next').NextConfig} */
import dotenv from 'dotenv';
dotenv.config();

const nextConfig = {
  reactStrictMode: false,

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
  // Enable dynamic import of 'ws' package
  experimental: {
    esmExternals: 'loose',
  },
  env: {
    PINATA_API_KEY: process.env.PINATA_API_KEY,
    PINATA_SECRET: process.env.PINATA_SECRET,
    PINATA_JWT: process.env.PINATA_JWT,
    PINATA_GATEWAY: process.env.PINATA_GATEWAY,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_DB_URL: process.env.FIREBASE_DB_URL,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET_CLIENT: process.env.FIREBASE_STORAGE_BUCKET_CLIENT,
    FIREBASE_MESSAGE_SENDER_ID: process.env.FIREBASE_MESSAGE_SENDER_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    FIREBASE_EMAIL: process.env.FIREBASE_EMAIL,
    FIREBASE_ADMIN_PK: process.env.FIREBASE_ADMIN_PK,
  },
};

export default nextConfig;
