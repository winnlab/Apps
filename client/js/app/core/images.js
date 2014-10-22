define(['lodash'], function() {

    var arr = [
        'd',
        'i',
        'iu',
        'shch',
        'w',
        'y'
    ];

    return _.map(arr, function (el) {
        return el + '.png'
    })
});
