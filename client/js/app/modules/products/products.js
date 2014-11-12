define(
    [
        'canjs',
        'core/appState'
    ],
    function (can, appState) {

        return can.Control.extend({

            init: function () {
                var self = this;

                can.view('modules/products/views/index.stache', appState, function (fragment) {
                    self.element.html(fragment);

                    if (self.options.isReady) {
                        self.options.isReady.resolve();
                    }
                });
            }

        });

    }
);
