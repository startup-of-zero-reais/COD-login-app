const path = require('path');
/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src', 'styles')],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: true
      }
    ]
  }
}
