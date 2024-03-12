/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // eslint-disable-next-line
    config.externals.push("@node-rs/argon2", "@node-rs/bcrypt");
    // eslint-disable-next-line
    return config;
  },
};

export default nextConfig;
