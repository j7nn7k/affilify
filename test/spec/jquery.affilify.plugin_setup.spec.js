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

	QUnit.test("is inside jQuery library", function ( assert ) {
		assert.equal(typeof $.fn.affilify, "function", "has function inside jquery.fn");
		assert.equal(typeof $fixture.affilify, "function", "another way to test it");
	});

	QUnit.test("returns jQuery functions after called (chaining)", function ( assert ) {
		assert.equal(typeof $fixture.affilify().on, "function", "'on' function must exist after plugin call");
	});

	QUnit.test("caches plugin instance", function ( assert ) {
		$fixture.affilify();
		assert.ok($fixture.data("plugin_affilify"), "has cached it into a jQuery data");
	});

	QUnit.test("enable custom config", function ( assert ) {
		$fixture.affilify({
            zanoxPublisherId: "",
			foo: "bar"
		});

		var pluginData = $fixture.data("plugin_affilify");

		assert.deepEqual(pluginData.settings, {
            zanoxPublisherId: "",
			foo: "bar"
		}, "extend plugin settings");

	});

}(jQuery, QUnit));
