define(
    ['modules/fun/fun'],

    function (Fun) {

        $('#sandbox').append('<div id="fun"/>')

        var fun = new Fun('#fun');

		describe('Fun', function() {

			it('should have property init', function() {
				list.should.have.property('init');
				F('#sandbox p').length.should.eql(1);
			});

			it('should change "p" color', function(done) {
				F('#sandbox p').click(function() {
					F('#sandbox p').css('color').should.eql('rgb(241, 76, 56)');
				});
				F.add(done);
			});

		});
    }
);
