define([
	'canjs',
	'lodash'
],
	function (can, _) {
		return can.Map.extend({

			namespace: 'preloader',
            paused: false,
			loaded: 0,
            batch: 4,

			init: function () {
				var self = this;
				self.loadedImages = new Array(self.images.length);
				self.loadImages();
			},

			loadImages: function () {
                var self = this,
                    defs = [];

                self.folder = self.folder || '/uploads/';

				if (self.images.length && self.paused === false) {
                    var ln = self.loaded + self.batch > self.images.length
                        ? self.images.length
                        : self.loaded + self.batch;

                    for (var i = self.loaded; i < ln; i += 1) {
                        imgSrc = self.images[i];
                        var def = can.Deferred();
                        defs.push(def);
                        if (imgSrc) {
                            self.loadImage(imgSrc.indexOf('/') !== -1 ? imgSrc : self.folder + imgSrc, def, i);
                        } else {
                            def.resolve();
                            self.loaded += 1;
                        }
                    }

                    if (defs.length) {
                        can.when.apply(can, defs).then(can.proxy(self.loadImages, self));
                    }

				} else {
					self.callback && self.callback();
                    self.callback = null;
				}

			},

			loadImage: function (imgSrc, def, i) {
				var image = new Image(),
					self = this;

				$(image).on('load.' + this.namespace + ' error.' + this.namespace, function (ev) {
					self.imageIsLoaded(ev, def, i);
                    def.resolve();
				});

				image.src = imgSrc;
			},

			imageIsLoaded: function (ev, def, i) {
                var self = this;
				self.loaded += 1;

				if (self.loaded == self.images.length && self.callback) {
					self.callback();
				}
			},

            pause: function () {
                this.attr('paused', true);
            },

            resume: function () {
                this.attr('paused', false);
                this.loadImages();
            }

		});
	}
);
