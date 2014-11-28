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

                this.centerIt();
            },

            '{window} resize': 'centerIt',

            centerIt: function () {
                var $productsWrap = this.element.find('.productsWrap'),
                    height = $productsWrap.outerHeight(),
                    wrapHeight = $('#modules').height(),
                    top = (wrapHeight - height) / 2;

                if (top < 0) {
                    top = 0;
                }

                $productsWrap.css('top', top);
            }

        });

    }
);
