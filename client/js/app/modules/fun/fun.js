define(
    [
        'canjs',
        'core/appState',
        'lodash'
    ],
    function (can, appState, _) {

        var indexTimer = null
            timeOut = 500,
            limitChars = 9,
            loadedImgs = [],
            nonCharBtns = [
                8, // backspace
                13, // enter
                17, // ctrl
                27, // esc
                37, // left arrow
                38, // up arrow
                39, // right arrow
                40, // down arrow
                46, // del
                93, // context menu
                112, // F1
                113, // F2
                114, // F3
                115, // F4
                116, // F5
                117, // F6
                118, // F7
                119, // F8
                120, // F9
                121, // F10
                122, // F11
                123, // F12
            ],
            dictionary = {
                'а': 'a',
                'б': 'b',
                'в': 'v',
                'г': 'g',
                'д': 'd',
                'е': 'e',
                'ё': 'e',
                'ж': 'zh',
                'з': 'z',
                'і': 'i',
                'ї': 'ii',
                'и': 'i',
                'й': 'i',
                'к': 'k',
                'л': 'l',
                'м': 'm',
                'н': 'n',
                'о': 'o',
                'п': 'p',
                'р': 'r',
                'с': 's',
                'т': 't',
                'у': 'u',
                'ф': 'f',
                'х': 'kh',
                'ц': 'tc',
                'ч': 'ch',
                'ш': 'sh',
                'щ': 'shch',
                'ъ': 'strong',
                'ы': 'y',
                'ь': 'soft',
                'э': 'e',
                'ю': 'iu',
                'я': 'ia'
            };

        return can.Control.extend({

            init: function () {
                var self = this;

                self.module = new can.Map({
                    chars: limitChars,
                    imgSrc: '/img/' + appState.attr('viewport').getMonitor() + '/',
                    word: [],
                    index: null,
                    img: null
                });

                can.view('modules/fun/views/index.stache', self.module, function (fragment) {
                    self.element.html(fragment);

                    if (self.options.isReady) {
                        self.options.isReady.resolve();
                    }
                });

                self.module.delegate('index', 'set', can.proxy(self.setImage, self));
            },

            ' click': function () {
                $('.is', this.element).focus();
            },

            '.ok click': function (el, ev) {
                ev.stopPropagation();
            },

            '.is keydown': function (el, ev) {
                if ((el.val().length >= limitChars && nonCharBtns.indexOf(ev.keyCode) === -1)) {
                    ev.preventDefault();
                }
            },

            '.is keyup': function (el, ev) {
                var self = this,
                    module = self.module,
                    val = el.val(),
                    chars = module.attr('chars');

                if (chars === 0 && val.length === limitChars) {
                    return false;
                }

                if (val.length > limitChars) {
                    return el.val(val.slice(0, limitChars));
                }

                self.module.attr('chars', limitChars - val.length);

                self.process(val);

            },

            // processing user input
            process: function (val) {
                var self = this,
                    module = self.module,
                    word = module.attr('word'),
                    wordLength = word.attr('length'),
                    index = module.attr('index');

                module.attr('wholeWord', val);

                _.forEach(val, function (char, i) {
                    word.attr(i, self.getImage(char));
                });

                if (val.length && val.length < wordLength && index === word.attr('length') - 1) {
                    module.attr('index', val.length - 1);
                }

                if (val.length) {
                    word.splice(val.length);
                    this.setIndex(index !== null ? index : -1);
                } else {
                    word.replace([]);
                    module.attr('index', null)
                }

            },

            getImage: function (char) {
                var result = dictionary[char.toLowerCase()];

                if ((/^[a-z]$/i).test(char)) {
                    result = char.toLowerCase();
                }

                return result ? result + '.png' : null;
            },

            setIndex: function (index) {
                var module = this.module,
                    word = module.attr('word');

                index += 1;
                if (index > word.length - 1) return false;
                module.attr('index', index);
            },

            setImage: function (ev, index) {
                var module = this.module,
                    imgName = module.attr('word').attr()[index],
                    image,
                    loadedImg;

                if (index === null || imgName === null) {
                    return module.attr('img', null);
                }

                loadedImg = _.find(loadedImgs, {'name': imgName});

                if (loadedImg) {
                    module.attr('img', loadedImg.img);
                } else {
                    var image = new Image();

                    $(image).on('load error', function (ev) {
                        if (ev.type === 'error') {
                            return module.attr('img', null);
                        }
                        var content = ev.target.outerHTML;
                        loadedImgs.push({
                            name: imgName,
                            img: content
                        });
                        module.attr('img', content);
                    });

                    image.src = module.attr('imgSrc') + imgName;
                }
            }

        });

    }
);
