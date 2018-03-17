// REQUIREJS CONFIGURATION
requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'assets/js/lib',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        // modules for design uses
             jqueryLib: '../jquery.min',
          bootstrapLib: '../bootstrap',
                appLib: '../app',
         slimScrollLib: '../slimscroll/jquery.slimscroll.min',
          appPluginLib: '../app.plugin',
            jplayerLib: '../jPlayer/jquery.jplayer.min',
        jplayerAdonLib: '../jPlayer/add-on/jplayer.playlist.min',
        jplayerDemoLib: '../jPlayer/demo',
        // modules for handle APIs
            // Azure API
            azureApi: 
            // Spotify API
            SpotifyApi:
        // Firebase module
    }
});

// Start the main app logic.
requirejs(['jquery', 'canvas', 'app/sub'],
function   ($,        canvas,   sub) {
    //jQuery, canvas and the app/sub module are all
    //loaded and can be used here now.
});