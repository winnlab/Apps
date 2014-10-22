define(
    [
        'canjs'
    ],
    function (can) {

        var AppState = can.Map.extend({
            define: {
                // Is 18 years old was confirmed
                is18Conf: {
                    set: function (newVal) {
                        if (newVal) {
                            localStorage.setItem('is18Conf', newVal)
                        }
                        return newVal;
                    },
                    get: function () {
                        return localStorage.getItem('is18Conf');
                    }
                }
            }
        }),
        appState = new AppState();

        window['appState'] = appState;

        return appState;
    }
);
