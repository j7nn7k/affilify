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

    QUnit.test("should validate data-noaffiliatereplace", function (assert) {
        expect(1);

        var fixture = $("<a href='http://example.com/' data-noaffiliatereplace>test</a>");

        $testCanvas.append(fixture);

        fixture.affilify();
        var instance = fixture.data("plugin_affilify");

        assert.equal(instance.shouldReplaceLink(), false);

    });

    QUnit.test("should validate not existing data-noaffiliatereplace", function (assert) {
        expect(1);

        var fixture = $("<a href='http://example.com/'>test</a>");

        $testCanvas.append(fixture);

        fixture.affilify();
        var instance = fixture.data("plugin_affilify");

        assert.equal(instance.shouldReplaceLink(), true);

    });

    QUnit.test("should validate not zanox link for http://example.com/", function (assert) {
        expect(1);

        var fixture = $("<a href='http://example.com/'>test</a>");

        $testCanvas.append(fixture);

        fixture.affilify();
        var instance = fixture.data("plugin_affilify");

        assert.equal(instance.isZanox(), false);
    });

    QUnit.test("should extract domain", function (assert) {
        expect(1);

        var fixture = $("<a href='http://www.vaola.de/s/?f=3&kindergroesse=74&preis=36-40&q=nike'>test</a>");

        $testCanvas.append(fixture);

        fixture.affilify();
        var instance = fixture.data("plugin_affilify");

        assert.equal(instance.extractDomain(), "http://www.vaola.de");
    });

    QUnit.test("should validate not zanox link for existing affiliate link", function (assert) {
        expect(1);

        var fixture = $("<a href='https://ad.zanox.com/ppc/?36434335C584445997&ulp=[[http://de.myprotein.com/home.dept?utm_source=zanox&utm_campaign=deeplinkzx_de&affil=zanox]]'>test</a>");

        $testCanvas.append(fixture);

        fixture.affilify();
        var instance = fixture.data("plugin_affilify");

        assert.equal(instance.isZanox(), false);
    });

    QUnit.test("should validate zanox link for myprotein", function (assert) {
        expect(1);

        var fixture = $("<a href='http://myprotein.com/'>test</a>");
        $testCanvas.append(fixture);

        fixture.affilify();
        var instance = fixture.data("plugin_affilify");

        assert.equal(instance.isZanox(), true);
    });

    QUnit.test("should validate zanox link for vaola", function (assert) {
        expect(1);

        var fixture = $("<a href='http://www.vaola.de/s/?f=3&kindergroesse=74&preis=36-40&q=nike'>test</a>");
        $testCanvas.append(fixture);

        fixture.affilify();
        var instance = fixture.data("plugin_affilify");

        assert.equal(instance.isZanox(), true);
    });

    QUnit.test("should not make zanox link", function (assert) {
        expect(1);

        var fixture = $("<a href='http://de.test.com/home.dept'>test</a>");

        $testCanvas.append(fixture);

        fixture.affilify({zanoxPublisherId: "36434335C584445997" });
        var instance = fixture.data("plugin_affilify");

        assert.equal(instance.affiliateUrl, "http://de.test.com/home.dept");

    });

    QUnit.test("should validate not amazon link for http://example.com/", function (assert) {
        expect(1);

        var fixture = $("<a href='http://example.com/'>test</a>");

        $testCanvas.append(fixture);

        fixture.affilify();
        var instance = fixture.data("plugin_affilify");

        assert.equal(instance.isAmazon(), false);
    });

    QUnit.test("should validate not amazon link for http://amazon.de/", function (assert) {
        expect(1);

        var fixture = $("<a href='http://amazon.de/'>test</a>");

        $testCanvas.append(fixture);

        fixture.affilify();
        var instance = fixture.data("plugin_affilify");

        assert.equal(instance.isAmazon(), true);
    });

    QUnit.test("should make empty amazon link", function (assert) {
        expect(1);

        var fixture = $("<a href='http://www.amazon.de/jQuery-kurz-gut-Andreas-Vdovkin/dp/3897215772/ref=sr_1_6?ie=UTF8&qid=1452556958&sr=8-6&keywords=jquery'>test</a>");

        $testCanvas.append(fixture);

        fixture.affilify({zanoxPublisherId: "36434335C584445997" });
        fixture.trigger("click");
        var instance = fixture.data("plugin_affilify");

        assert.equal(instance.affiliateUrl, "http://www.amazon.de/jQuery-kurz-gut-Andreas-Vdovkin/dp/3897215772/ref=sr_1_6?ie=UTF8&qid=1452556958&sr=8-6&keywords=jquery&tag=");
    });

    QUnit.test("should make amazon link", function (assert) {
        expect(1);

        var fixture = $("<a href='http://www.amazon.de/jQuery-kurz-gut-Andreas-Vdovkin/dp/3897215772/ref=sr_1_6?ie=UTF8&qid=1452556958&sr=8-6&keywords=jquery'>test</a>");

        $testCanvas.append(fixture);

        fixture.affilify({zanoxPublisherId: "36434335C584445997", amazonPublisherId: "36434335C584445997" });
        fixture.trigger("click");
        var instance = fixture.data("plugin_affilify");

        assert.equal(instance.affiliateUrl, "http://www.amazon.de/jQuery-kurz-gut-Andreas-Vdovkin/dp/3897215772/ref=sr_1_6?ie=UTF8&qid=1452556958&sr=8-6&keywords=jquery&tag=36434335C584445997");
    });

    QUnit.test("should update amazon link", function (assert) {
        expect(1);

        var fixture = $("<a href='http://www.amazon.de/jQuery-kurz-gut-Andreas-Vdovkin/dp/3897215772/ref=sr_1_6?ie=UTF8&qid=1452556958&sr=8-6&keywords=jquery&tag=333'>test</a>");

        $testCanvas.append(fixture);

        fixture.affilify({zanoxPublisherId: "36434335C584445997", amazonPublisherId: "999" });
        fixture.trigger("click");
        var instance = fixture.data("plugin_affilify");

        assert.equal(instance.affiliateUrl, "http://www.amazon.de/jQuery-kurz-gut-Andreas-Vdovkin/dp/3897215772/ref=sr_1_6?ie=UTF8&qid=1452556958&sr=8-6&keywords=jquery&tag=999");
    });

    QUnit.test("should make zanox link", function (assert) {
        expect(1);

        var fixture = $("<a href='http://de.myprotein.com/home.dept'>test</a>");

        $testCanvas.append(fixture);

        fixture.affilify({zanoxPublisherId: "36434335C584445997" });
        fixture.trigger("click");
        var instance = fixture.data("plugin_affilify");

        assert.equal(instance.affiliateUrl, "https://ad.zanox.com/ppc/?36434335C584445997&ulp=[[http://de.myprotein.com/home.dept?utm_source=zanox&utm_campaign=deeplinkzx_de&affil=zanox]]");
    });

    QUnit.test("should not make zanox link for existing affiliate link", function (assert) {
        expect(1);

        var fixture = $("<a href='https://ad.zanox.com/ppc/?36434335C584445997&ulp=[[http://de.myprotein.com/home.dept?utm_source=zanox&utm_campaign=deeplinkzx_de&affil=zanox]]'>test</a>");

        $testCanvas.append(fixture);

        fixture.affilify({zanoxPublisherId: "36434335C584445997" });
        fixture.trigger("click");
        var instance = fixture.data("plugin_affilify");

        assert.equal(instance.affiliateUrl, "https://ad.zanox.com/ppc/?36434335C584445997&ulp=[[http://de.myprotein.com/home.dept?utm_source=zanox&utm_campaign=deeplinkzx_de&affil=zanox]]");
    });

}(jQuery, QUnit));
