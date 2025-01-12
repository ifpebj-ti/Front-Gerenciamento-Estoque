// @ts-check

/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ["placehold.co", "encrypted-tbn0.gstatic.com"], // Allow the domain
    dangerouslyAllowSVG: true, // Enable SVG support
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;", // Optional: Restrict SVG usage for security
  },
};

module.exports = nextConfig;
