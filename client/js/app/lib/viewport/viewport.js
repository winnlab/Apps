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

        function setViewWidth (state) {
            var width = (window.innerWidth
                ? window.innerWidth
                : (document.documentElement.clientWidth
                    ? document.documentElement.clientWidth
                    : document.body.offsetWidth));
            if (width < 1224) {
                width = 1224;
            }

            state.attr('width', width);
        }

        function setViewHeight (state) {
            var viewportHeight = (window.innerHeight
                ? window.innerHeight
                : (document.documentElement.clientHeight
                    ? document.documentElement.clientHeight
                    : document.body.offsetHeight));

            if (viewportHeight < 650) {
                viewportHeight = 650
            }

            state.attr('height', viewportHeight);
        }

        return can.Control.extend({

            init: function () {
                this.state = new can.Map({
                    width: 0,
                    height: 0
                });

                setViewWidth(this.state);
                setViewHeight(this.state);
            },

            '{window} resize': function () {
                this.setViewWidth(this.state);
                this.setViewHeight(this.state);
            },

            getViewportWidth: function () {
                return this.state.attr('width');
            },

            getViewportHeight: function () {
                return this.state.attr('height');
            },

            getMonitor: function () {
                var winWidth = this.state.attr('width'),
                    monitor = _.find(monitors, function (m) {
                        return m >= winWidth;
                    });

                return monitor ? monitor : monitors[monitors.length - 1];
            }
        });
    }
);
