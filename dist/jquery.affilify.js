/*
 *  jquery-affilify - v0.0.1
 *  A jquery plugin to replace links with affiliate links on the fly. Support for Amazon, Affilinet, Zanox.
 *  https://github.com/j7nn7k/affilifyt
 *
 *  Made by Jannik Weyrich
 *  Under MIT License
 */
// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ($, window, document, undefined) {

    "use strict";

    // undefined is used here as the undefined global variable in ECMAScript 3 is
    // mutable (ie. it can be changed by someone else). undefined isn't really being
    // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
    // can no longer be modified.

    // window and document are passed through as local variable rather than global
    // as this (slightly) quickens the resolution process and can be more efficiently
    // minified (especially when both are regularly referenced in your plugin).

    // Create the defaults once
    var pluginName = "affilify",
        defaults = {
            zanoxPublisherId: ""
        };

    // The actual plugin constructor
    function Plugin(element, options) {
        this.element = element;
        this.$el = $(element);
        this.originalUrl = this.$el.attr("href") || "";
        this.originalDomain = this.extractDomain(this.originalUrl);
        this.affiliateUrl = "";
        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    // Avoid Plugin.prototype conflicts
    $.extend(Plugin.prototype, {
        init: function () {
            this.$el.click(function (e) {
                if (this.shouldReplaceLink()) {
                    e.preventDefault();
                    if (this.isZanox()) {
                        this.makeZanox();
                    }
                }
            });
        },
        shouldReplaceLink: function () {
            return (this.$el.attr("data-noaffiliatereplace") === undefined);
        },
        extractDomain: function () {
            var domain;
            var protocol;
            //find & remove protocol (http, ftp, etc.) and get domain
            if (this.originalUrl.indexOf("://") > -1) {
                protocol = this.originalUrl.split("://")[0] + "://";
                domain = this.originalUrl.split("/")[2];
            } else {
                domain = this.originalUrl.split("/")[0];
            }
            //find & remove port number
            domain = domain.split(":")[0];

            return protocol + domain;
        },
        makeZanox: function () {
            this.affiliateUrl = "https://ad.zanox.com/ppc/?" + this.settings.zanoxPublisherId + "&ulp=[[" + this.originalUrl + "?utm_source=zanox&utm_campaign=deeplinkzx_de&affil=zanox]]";
        },
        isZanox: function () {
            return this.originalDomain.indexOf("myprotein") > -1 || this.originalDomain.indexOf("vaola.de") > -1;
        }

    });

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, options));
            }
        });
    };

})(jQuery, window, document);
