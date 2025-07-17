import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['res.cloudinary.com'],
  },

  env: {
    BASE_URL: "https://mview-portal.mineralview.com",
  },
  
};

export default nextConfig;
