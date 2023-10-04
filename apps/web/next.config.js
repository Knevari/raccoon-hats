module.exports = {
  reactStrictMode: true,
  transpilePackages: ["ui"],
  images: { domains: ["res.cloudinary.com"] },
  experimental: {
    forceSwcTransforms: true,
  },
};
