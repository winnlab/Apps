define(
    [
        'canjs',
        'core/products'
    ],
    function (can, products) {

        var AppState = can.Map.extend({
            is18Conf: false,
            is18Show: true,
            products: products
        }),
        appState = new AppState();

        window['appState'] = appState;

        return appState;
    }
);
