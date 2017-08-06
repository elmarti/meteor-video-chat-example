console.log("raven logger starting")
RavenLogger.initialize({
    client: Meteor.settings.public.RAVEN_PUBLIC_URL,
    server: process.env.RAVEN_PRIVATE_URL
}, {
    trackUser: true
});
