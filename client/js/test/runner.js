require(['/js/app/core/core'], function () {
	require(
		['jquery'],
		function ($) {
			var specs = [];

			specs.push('test/fun/test');

			$(function() {
				require(specs, function () {
					mocha.run();
				});
			});
		}
	);
});
