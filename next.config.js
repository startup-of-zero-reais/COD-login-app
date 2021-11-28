const path = require('path');
/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    sassOptions: {
        includePaths: [
            path.join(__dirname, 'src', 'presentation', 'styles'),
            path.join(__dirname, 'src', 'presentation', 'styles', 'components'),
            path.join(__dirname, 'src', 'presentation', 'styles', 'pages'),
            path.join(__dirname, 'src', 'presentation', 'styles', 'shared'),
        ],
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
