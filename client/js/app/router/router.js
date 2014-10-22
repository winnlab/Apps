define([
	'canjs',
	'core/appState',
	'lodash',
    'router/modules'
],
	function (can, appState, _, Modules) {

		return can.Control.extend({
			defaults: {
				viewpath: 'router/views/',
				langBtn: '.isoLang',
                trackHistory: false
			}
		}, {
			init: function (el, options) {
				this.Modules = new Modules({
					moduleTypes: this.options.modules
				});

				var html = can.view(this.options.viewpath + 'index.stache', {
						modules: this.Modules.attr('modules')
					}),
					lang = appState.attr('lang'),
					self = this;

				$(options.modulesContainer).prepend(html);

				_.each(options.routes, function (route) {
					can.route(route.route, route.defaults ? route.defaults : {});
				});

				if (can.route.bindings.pushstate) {
					can.route.bindings.pushstate.root = (lang ? '/' + lang : '') + '/';
				} else {
					can.route.bindings.hashchange.root = (lang ? '/' + lang : '') + '/';
				}
				can.route.ready();

			},

			'.module click': function (el, ev) {
				ev.preventDefault();

                var href = el.attr('href') ? el.attr('href') : el.attr('data-href');

                if ( href ) {

                    var routeObj = can.route.deparam(href);

                    if (!_.isEmpty(routeObj)) {
                        can.route.attr(routeObj, true);
                    } else {
                        throw new  Error("There now such routing rule for '" + href + "', please check your configuration file");
                    }

                } else {
                    throw new  Error("href parameter is undefined");
                }
			},

			':module route': 'routeChanged',
			':module/:id route': 'routeChanged',

			routeChanged: function(data) {
				this.historyWatcher(data);
				var moduleName = data.module,
					id = moduleName + (data.id ? '-' + data.id : '');

				if (!appState.attr('is18Conf')) {
					appState.attr('startRoute', can.route.attr());
					return can.route.attr({
						module: 'checker'
					}, true);
				}

				this.Modules.initModule(moduleName, id);
			},

			historyWatcher: function (data) {
                if (!this.options.trackHistory) return false
				var location = window.location,
					referrer = location.pathname,
					url;

				if (data.module === 'main') {
					url = '/';
				} else {
					url = '/' + can.route.param(data)
				}

				_gaq.push(['_setReferrerOverride', referrer !== url ? location.origin + referrer : null]);
				_gaq.push(['_trackEvent', 'Window', 'open']);
				_gaq.push(['_trackPageview'], location.origin + url);
			},

			'{langBtn} click': function (el, ev) {
				ev.preventDefault();

				var lang = el.attr('href').replace(/\//, ''),
					currentLink = '/' + can.route.param(can.route.attr());

				document.location.href = (lang ? '/' + lang : '') + currentLink;
			}

		});
	}
);
