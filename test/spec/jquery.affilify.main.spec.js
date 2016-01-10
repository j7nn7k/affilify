(function ($, QUnit) {
	"use strict";

	var $testCanvas = $("#testCanvas");
	var $fixture = null;

	QUnit.module("jQuery Affilify", {
		beforeEach: function () {
			$fixture = $("<div/>");

			$testCanvas.append($fixture);
		},
		afterEach: function () {
			$fixture.remove();
		}
	});

	QUnit.test("has hello() working as expected", function ( assert ) {
        expect(1);

        $fixture.affilify();
        var instance = $fixture.data("plugin_affilify");

		assert.equal(instance.hello(), "hello");

	});

}(jQuery, QUnit));
