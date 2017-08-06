console.log("raven logger starting")
let params = {};
if( Meteor.isClient )
    params.client = Meteor.settings.public.RAVEN_PUBLIC_URL;
if( Meteor.isServer )
    params.server = process.env.RAVEN_PRIVATE_URL;
RavenLogger.initialize(params, {
    trackUser: true
});
if ( Meteor.isClient )
    window.addEventListener('unhandledrejection', (err)  => {
        RavenLogger.log("unhandledRejection", err);
    });