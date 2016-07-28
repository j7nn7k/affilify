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
			zanox: {
                publisherId: "",
                programs: [{ domain: ""}]
            },
            amazonPublisherId: "",
			affilinet: {
                publisherId: "",
                programs: [{ siteId: "", domain: ""}]
            }
		};

    // The actual plugin constructor
    function Plugin(element, options) {
        this.element = element;
        this.$el = $(element);
        this.originalUrl = this.$el.attr("href") || "";
        this.originalDomain = this.extractDomain(this.originalUrl);
        this.affiliateUrl = this.originalUrl;
        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        if (this.areSettingsValid()) {
            this.init();
        }
    }

    // Avoid Plugin.prototype conflicts
    $.extend(Plugin.prototype, {
        init: function () {
            var self = this;
            this.$el.click(function (e) {
                if (self.shouldReplaceLink()) {
                    e.preventDefault();
                    if (self.isAmazon()) {
                        self.makeAmazon();
                    } else if (self.isZanox()) {
                        self.makeZanox();
                    } else if (self.isAffilinet()) {
                        self.makeAffilinet();
                    }
                    window.location.href = self.affiliateUrl;
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
            this.affiliateUrl = "https://ad.zanox.com/ppc/?" + this.settings.zanox.publisherId + "&ulp=[[" + this.originalUrl + "?utm_source=zanox&utm_campaign=deeplinkzx_de&affil=zanox]]";
        },
        isZanox: function () {
            //if not configured return
            var self = this;
            var isZanoxPartner = false;
            this.settings.zanox.programs.forEach(function (program) {
                if (!program.domain) {
                    return;
                }
                if (self.originalDomain.indexOf(program.domain) > -1) {
                    isZanoxPartner = true;
                    return;
                }
            });
            return isZanoxPartner;
        },
        isAmazon: function () {
            //if not configured return
            return this.originalDomain.indexOf("amazon") > -1;
        },
        isAffilinet: function () {
            //if not configured return
            var self = this;
            var isAffilinetPartner = false;
            this.settings.affilinet.programs.forEach(function (program) {
                if (!program.domain) {
                    return;
                }
                if (self.originalDomain.indexOf(program.domain) > -1) {
                    isAffilinetPartner = true;
                    return;
                }
            });
            return isAffilinetPartner;
        },
        makeAffilinet: function () {
            var self = this;
            this.settings.affilinet.programs.forEach(function (program) {
                if (self.originalDomain.indexOf(program.domain) > -1) {
                    self.affiliateUrl = "http://partners.webmasterplan.com/click.asp?ref=" + self.settings.affilinet.publisherId + "&site=" + program.siteId + "&type=text&tnb=1&diurl=" + encodeURIComponent(self.originalUrl);
                }
            });
        },
        makeAmazon: function () {

            if (this.originalUrl.indexOf("?tag=") > -1 || this.originalUrl.indexOf("&tag=") > -1) {
                this.affiliateUrl = this.replaceQueryParam(this.originalUrl, "tag", this.settings.amazonPublisherId);
            } else {
                this.affiliateUrl = this.originalUrl + "&tag=" + this.settings.amazonPublisherId;
            }
        },
        replaceQueryParam: function (url, paramName, paramValue) {
            var pattern = new RegExp("\\b(" + paramName + "=).*?(&|$)");
            if (url.search(pattern) >= 0) {
                return url.replace(pattern, "$1" + paramValue + "$2");
            }
            return url + (url.indexOf("?") > 0 ? "&" : "?") + paramName + "=" + paramValue;
        },
        areSettingsValid: function () {
            if (this.settings.affilinet && this.settings.affilinet.programs) {
                if (this.settings.affilinet.programs.constructor !== Array) {
                    throw new Error("The affilinet *programs* property should be an array or left out altogether.");
                }
            }
            return true;
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
