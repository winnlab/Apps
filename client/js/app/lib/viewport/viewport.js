define(
    [
        'canjs',
        'core/appState',
        'lodash'
    ],
    function (can, appState, _) {

        var monitors = [
            1024,
            1152,
            1280,
            1366,
            1400,
            1440,
            1536,
            1600,
            1680,
            1980,
            2000
        ];

        return can.Control.extend({

            init: function () {

            }

        });

    }
);
