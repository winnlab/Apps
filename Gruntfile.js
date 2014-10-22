module.exports = function (grunt) {

    function getImgRespSizes (sprite) {
        var monitors = [
            1024,
            1152,
            1280,
            1366, // 487
            1400,
            1440,
            1536,
            1600,
            1680,
            1980
        ],
        proportion = sprite ? 0.361 : 0.6639526276831976,
        result = [];

        if (!sprite) {
            monitors.push(2000);
        }

        for (var i = monitors.length; i--;) {
            result.push({
                width: Math.round((monitors[i] - 15) * proportion),
                name: monitors[i]
            })
        }

        return result;
    }


    // Configure grunt
    grunt.initConfig({
        sprite:{
            all: {
                src: 'client/img/sprites/*',
                destImg: 'client/img/2000/sprites.png',
                destCSS: 'client/scss/base/_sprites.scss',
                padding: 4
                // , algorithm: 'binary-tree'
            }
        },
        responsive_images: {
            sprite: {
                options: {
                    // Task-specific options go here.
                    engine: 'im',
                    newFilesOnly: false,
                    sizes: getImgRespSizes(true)
                },
                files: [{
                    expand: true,
                    src: ['sprites.png'],
                    cwd: 'client/img/2000',
                    custom_dest: 'client/img/{%= name %}/'
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
            }
        }
    });

    // Load in `grunt-spritesmith`
    grunt.loadNpmTasks('grunt-spritesmith');

    grunt.loadNpmTasks('grunt-responsive-images');
};