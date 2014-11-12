define({
	router: {
		base: '/',
		modulesContainer: '#modules',
		routes: [{
			route: ':module',
			defaults: {
				module: 'checker'
			}
		}],
		modules: [{
			name: 'checker',
			path: 'modules/checker/checker'
		},{
			name: 'intro',
			path: 'modules/intro/intro'
		},{
			name: 'fun',
			path: 'modules/fun/fun'
		},{
			name: 'products',
			path: 'modules/products/products'
		}]
	}
});
