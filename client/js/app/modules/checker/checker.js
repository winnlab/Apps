define(
    [
        'canjs',
        'core/appState'
    ],
    function (can, appState) {

        return can.Control.extend({

            init: function () {
                var self = this;

                if (appState.attr('is18Conf')) {
                    self.redirect();
                }

                can.view('modules/checker/views/index.stache', appState, function (fragment) {
                    self.element.html(fragment);

    				if (self.options.isReady) {
    					self.options.isReady.resolve();
    				}
                });
            },

            '.yes click': function () {
                appState.attr('is18Conf', true);
				this.redirect();
			},

			'.no click': function () {
				appState.attr('is18Conf', false);
			},

            redirect: function () {
                var startRoute = appState.attr('startRoute');

                if (startRoute) {
                    can.route.attr(startRoute, true);
                } else {
                    can.route.attr({
                        // module: 'intro'
                        module: 'products'
                    }, true);
                }

            }

        });

    }
);
