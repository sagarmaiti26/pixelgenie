/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
      },
    ],
    // Serve modern formats — browsers that support AVIF/WebP get smaller files
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    // Tree-shake lucide-react so only used icons are bundled
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
