/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env:{
    NEXT_PUBLIC_BACKEND_URL:"http://localhost:4000",
    NEXT_PUBLIC_GITHUB_CLIENT_ID:"Ov23ligFWZ1kkUyPLPmf"
  }
}

module.exports = nextConfig
