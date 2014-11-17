define(
    [
        'canjs',
        'core/products'
    ],
    function (can, products) {

        var AppState = can.Map.extend({
            is18Conf: false,
            products: products
        }),
        appState = new AppState();

        window['appState'] = appState;

        return appState;
    }
);
