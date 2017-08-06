console.log("raven logger starting")
RavenLogger.initialize({
    client: process.env.RAVEN_PUBLIC_URL,
    server: process.env.RAVEN_PRIVATE_URL
}, {
    trackUser: true
});
RavenLogger.log('Testing error message');