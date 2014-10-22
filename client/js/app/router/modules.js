define(
    [
        'canjs',
        'lodash'
    ],

    function (can, _) {

        return can.Map.extend({
            loaderShown: true,

            modules: [],

            silentInit: function (ev, module, id) {
                this.initModule(module, id, true);
            },

            initModule: function (moduleName, id, silent) {
                var self = this,
                    module = _.find(self.moduleTypes, function (module) {
                        return module.name === moduleName
                    });

                if (!module) {
                    throw new Error("There no such module '" + moduleName + "', please check your configuration file");
                }

                if (self.checkModule(id, silent)) {
                    return;
                }

                if (!silent) {
                    this.showPreloader();
                }

                require([module.path], function (Module) {
                    if (Module) {
                        self.addModule(id);
                        var isReady = can.Deferred();
                        new Module('#' + id, {
                            isReady: isReady
                        });
                        if (!silent) {
                            self.activateModule(id, isReady);
                        }
                    } else {
                        if (module.path) {
                            throw new Error('Please check constructor of ' + module.path + '.js');
                        } else {
                            throw new Error('Please check existing of module "' + module.name + '"');
                        }
                    }
                });

            },

            checkModule: function (id, silent) {
                var module = _.find(this.modules, function(module){
                        return module.id === id;
                    }),
                    exist = !_.isEmpty(module);

                if (exist && !silent) {
                    this.activateModule(id);
                }
                return exist;
            },

            addModule: function (id) {
                this.modules.push({
                    id: id,
                    active: false
                });
            },

            activateModule: function (id, isReady) {
                _.map(this.modules, function (module) {
                    module.attr('active', module.id === id);
                });

                this.hidePreloader(isReady);
            },

            showPreloader: function () {
                if (!this.attr('loaderShown')) {
                    this.attr('loaderShown', true);
                    $('#preloader').show();
                }
            },

            hidePreloader: function (isReady) {
                var self = this,
                    hide = function () {
                        self.attr('loaderShown', false);
                        $('#preloader').hide();
                    };

                if (self.attr('loaderShown')) {
                    if (isReady) {
                        isReady.then(hide());
                    } else {
                        hide();
                    }
                }
            }

        });

    }
)
