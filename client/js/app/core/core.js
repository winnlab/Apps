require.config({
    baseUrl: '/js/lib',
    urlArgs: "v=0.0.0",
    paths: {
        app: '../app',
        lib: '../app/lib',
        core: '../app/core',
        modules: '../app/modules',
        router: '../app/router',
        can: 'canjs/amd/can/',
        canjs: 'canjs/amd/can',
        jquery: 'jquery/dist/jquery',
        lodash: 'lodash/dist/lodash'
    },
    map: {
        '*': {
            'css': 'require-css/css'
        }
    },
    shim: {
        'jquery': {
            exports: '$'
        },
        'lodash': {
            exports: '_'
        },
        'canjs': {
            deps: [
                'jquery',
                'can/route/pushstate',
                'can/map/define',
                'can/map/delegate',
                'can/map/sort',
                'can/list/promise',
                'can/construct/super'
            ]
        },
        'core': {
            deps: [
                'lib/preloader',
                'lib/viewport'
            ]
        }

    },
    waitSeconds: 15
});

require(
    [
        'core/appState',
        'core/config',
        'router/router',
        'lib/viewport/viewport',
        'css!/css/all.css'
    ],
    function (appState, config, Router, Viewport) {
        appState.attr('router', new Router('body', config.router))
        appState.attr('viewport', new Viewport('body'))
    }
);
