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
    env: {
        USERS_API_BASE: process.env.USERS_API_BASE,
        LOCAL_API_BASE: process.env.LOCAL_API_BASE,
        X_API_KEY: process.env.X_API_KEY,
        APPLICATION: process.env.APPLICATION,
    }
}
