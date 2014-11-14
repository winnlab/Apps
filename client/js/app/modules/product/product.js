define(
    [
        'canjs',
        'lodash',
        'core/appState'
    ],
    function (can, _, appState) {

        return can.Control.extend({

            init: function () {
                var self = this;

                can.view('modules/product/views/index.stache',
                    self.getProduct( can.route.attr('id') ),
                    function (fragment) {
                        self.element.html(fragment);

                        if (self.options.isReady) {
                            self.options.isReady.resolve();
                        }
                    }
                );
            },

            getProduct: function (link) {
                return _.find(appState.attr('products'), { link: link } );
            },

            '.close click': function () {
                can.route.attr({
                    module: 'products'
                }, true);
            }

        });

    }
);
