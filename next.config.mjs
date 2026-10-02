import mdx from "@next/mdx";

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {},
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  transpilePackages: ["next-mdx-remote"],
  // Cache le badge "N" de Next.js en bas à gauche (visible seulement en développement)
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.google.com",
        pathname: "**",
      },
    ],
  },
  sassOptions: {
    compiler: "modern",
    silenceDeprecations: ["legacy-js-api"],
  },
  // Builds Unity WebGL compressés en Brotli : le navigateur les décompresse grâce à ces en-têtes
  async headers() {
    const unity = (ext, type) => ({
      source: `/games/:game/:file(.*\\.${ext}\\.br)`,
      headers: [
        { key: "Content-Encoding", value: "br" },
        { key: "Content-Type", value: type },
        { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
      ],
    });
    return [
      unity("wasm", "application/wasm"),
      unity("js", "application/javascript"),
      unity("data", "application/octet-stream"),
    ];
  },
};

export default withMDX(nextConfig);
