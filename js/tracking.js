var GROUML = GROUML || {};

GROUML.Tracking = (function (window, document) {
    return {
        init: function (code, site_name) {
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

            this.Page.setAccount(code, site_name);
            this.Page.view();
        },
        Page: {
            view: function () {
                ga('send', 'pageview');
            },
            setAccount: function (code, site_name) {
                ga('create', code, site_name);
            }
        },
        Object: {
            add: function () {
                ga('send', 'event', 'object', 'add');
            },
            delete: function () {
                ga('send', 'event', 'object', 'delete');
            },
            editName: function () {
                ga('send', 'event', 'object', 'edit-name');
            },
            drag: function() {
                ga('send', 'event', 'object', 'drag');
            }
        },
        Field: {
            add: function () {
                ga('send', 'event', 'field', 'add');
            },
            delete: function () {
                ga('send', 'event', 'field', 'delete');
            },
            editName: function () {
                ga('send', 'event', 'field', 'edit-name');
            },
            editType: function () {
                ga('send', 'event', 'field', 'edit-type');
            }
        },
        Option: {
            add: function () {
                ga('send', 'event', 'option', 'add');
            },
            delete: function () {
                ga('send', 'event', 'option', 'delete');
            },
            editName: function () {
                ga('send', 'event', 'option', 'edit-name');
            },
            editValue: function () {
                ga('send', 'event', 'option', 'edit-value');
            }
        },
        Generator: {
            changed: function(name) {
                ga('send', 'event', 'option', 'changed', name);
            }
        }
    };
})(window, document);