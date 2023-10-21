/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {
        API_BASE_URL: 'https://test.msg91.com',
        GOOGLE_CLIENT_ID: '467164479375-7gh8a9joi6isk7qbfj4tj1p3srqo66m5.apps.googleusercontent.com',
        ZOHO_CLIENT_ID: '1000.TULN05SRMPWS74404W4PL31U0GA46H',
        GITHUB_CLIENT_ID: 'b7432f8d5a708e33b3b0',
        MSAL_CLIENT_ID: '164d09e1-531c-427d-9358-9d1347c74170',
        // REDIRECT_URL: "http://localhost:9999",
        REDIRECT_URL: 'https://web.msg91.com',
        OTP_WIDGET_TOKEN: '33696f6f306b393636323236',
        WIDGET_AUTH_TOKEN: '278060TdDLqSOupgl6533ad44P1',
        WIDGET_SCRIPT: 'https://test.msg91.com/hello-new/assets/otp-provider/otp-provider.js',
        SUCCESS_REDIRECTION_URL: 'https://test.msg91.com/api/nexusRedirection.php?session=:session',
    },
    // Can be safely removed in newer versions of Next.js

    webpack(config) {
        config.resolve.fallback = {
            // if you miss it, all the other options in fallback, specified
            // by next.js will be dropped.
            ...config.resolve.fallback,

            fs: false, // the solution
        };

        return config;
    },
};

module.exports = nextConfig;
