module.exports = function (grunt) {

    function getImgRespSizes (exclude2000, proportion) {
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
            1980
        ],
        result = [];
        proportion = proportion || 0.6639526276831976;

        if (!exclude2000) {
            monitors.push(2000);
        }

        for (var i = monitors.length; i--;) {
            result.push({
                width: proportion === 'percent' ? (monitors[i] / 20) + '%' : Math.round((monitors[i] - 15) * proportion),
                name: monitors[i]
            })
        }

        return result;
    }


    // Configure grunt
    grunt.initConfig({
        sprite:{
            all: (function () {
                var target = grunt.option('width');

                return {
                    src: 'client/img/' + target + '/sprites/*',
                    destCSS: 'client/scss/base/sprites/_sprites' + target + '.scss',
                    destImg: 'client/img/' + target + '/sprites.png',
                    algorithm: 'binary-tree',
                    'cssVarMap': function (sprite) {
                        sprite.name = sprite.name + '_' + target;
                    }
                }
            }())
        },
        responsive_images: {
            sprites: {
                options: {
                    // Task-specific options go here.
                    engine: 'im',
                    newFilesOnly: false,
                    sizes: getImgRespSizes(true, 'percent')
                },
                files: [{
                    expand: true,
                    src: ['*'],
                    cwd: 'client/img/2000/sprites',
                    custom_dest: 'client/img/{%= name %}/sprites/'
                }]
            },
            letters: {
                options: {
                    // Task-specific options go here.
                    engine: 'im',
                    newFilesOnly: false,
                    sizes: getImgRespSizes()
                },
                files: [{
                    expand: true,
                    src: ['*'],
                    cwd: 'client/img/letters',
                    custom_dest: 'client/img/{%= name %}/'
                }]
            },
            productsBg: {
                options: {
                    // Task-specific options go here.
                    engine: 'im',
                    newFilesOnly: false,
                    sizes: getImgRespSizes(true, 0.4265)
                },
                files: [{
                    expand: true,
                    src: ['productsBg.png'],
                    cwd: 'client/img/2000',
                    custom_dest: 'client/img/{%= name %}/'
                }]
            },
            classicCan: {
                options: {
                    // Task-specific options go here.
                    engine: 'im',
                    newFilesOnly: false,
                    sizes: getImgRespSizes(false, 1.085862324)
                },
                files: [{
                    expand: true,
                    src: ['classic-can.png'],
                    cwd: 'client/img/product',
                    custom_dest: 'client/img/{%= name %}/'
                }]
            },
            buzinaCan: {
                options: {
                    // Task-specific options go here.
                    engine: 'im',
                    newFilesOnly: false,
                    sizes: getImgRespSizes(false, 0.756476684)
                },
                files: [{
                    expand: true,
                    src: ['buzina-can.png'],
                    cwd: 'client/img/product',
                    custom_dest: 'client/img/{%= name %}/'
                }]
            },
            classicBottle: {
                options: {
                    // Task-specific options go here.
                    engine: 'im',
                    newFilesOnly: false,
                    sizes: getImgRespSizes(false, 0.529237602)
                },
                files: [{
                    expand: true,
                    src: ['classic-bottle.png'],
                    cwd: 'client/img/product',
                    custom_dest: 'client/img/{%= name %}/'
                }]
            },
            buzinaBottle: {
                options: {
                    // Task-specific options go here.
                    engine: 'im',
                    newFilesOnly: false,
                    sizes: getImgRespSizes(false, 0.430051813)
                },
                files: [{
                    expand: true,
                    src: ['buzina-bottle.png'],
                    cwd: 'client/img/product',
                    custom_dest: 'client/img/{%= name %}/'
                }]
            }
        }
    });

    // Load in `grunt-spritesmith`
    grunt.loadNpmTasks('grunt-spritesmith');

    grunt.loadNpmTasks('grunt-responsive-images');
};
